import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { sendMessage } from "../../store/SendBulkMessage/act/actSendMessage";
import { ICustomers } from "../../types/customers";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import ReactHtmlParser from "html-react-parser";

interface MessagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    customers: ICustomers[];
}

const BulkEmailPopup: React.FC<MessagePopupProps> = ({
    isOpen,
    onClose,
    customers,
}) => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ title: "", message: "" }); // Validation errors

    if (!isOpen) return null;

    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const validateFields = () => {
        let hasError = false;
        const newErrors = { title: "", message: "" };

        if (!title.trim()) {
            newErrors.title = "يرجى إدخال عنوان الرسالة";
            hasError = true;
        }
        if (!stripHtmlTags(message).trim()) {
            newErrors.message = "يرجى إدخال نص الرسالة";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleSend = () => {
        if (!validateFields()) return;

        setLoading(true);
        const recipients = customers.map((customer) => customer.id);
        const plainTextMessage = stripHtmlTags(message);
        const messageData = {
            type: "email",
            title: title,
            content: plainTextMessage,
            recipients: recipients,
        };
        dispatch(sendMessage(messageData));
        setLoading(false);
        onClose();
        toast.success("!تم أرسال الرسالة بنجاح");
        setTitle("");
        setMessage("");
        setErrors({ title: "", message: "" });
    };

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ align: [] }],
            ["image"],
        ],
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg  shadow-lg w-[350px] md:w-[500px] xl:w-[600px]">
                <h2 className="text-lg font-bold mb-4">
                    إرسال رسالة عبر الEmail
                </h2>
                <p className="mb-2">الي الحميع</p>

                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full px-3 py-2 border-2 rounded-md ${
                            errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="عنوان الرسالة..."
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <ReactQuill
                        value={message}
                        onChange={setMessage}
                        className={`w-full ${
                            errors.message
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="اكتب الرسالة هنا..."
                        modules={modules}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message}
                        </p>
                    )}
                </div>

                <div className="message-preview mt-4">
                    <h3 className="font-semibold text-lg">معاينة الرسالة</h3>
                    <div className="preview-content text-gray-600">
                        <p className="font-bold">{title}</p>
                        {ReactHtmlParser(message)}
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border hover:bg-gray-300 rounded-md duration-150"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 border hover:bg-gray-500 hover:text-white rounded-md duration-150"
                        disabled={loading}
                    >
                        {loading ? "جارٍ الإرسال..." : "إرسال"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkEmailPopup;
