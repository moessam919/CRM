import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { sendMessage } from "../../store/SendBulkMessage/act/actSendMessage";
import ReactQuill from "react-quill";
import { ICustomers } from "../../types/customers";
import toast from "react-hot-toast";
import ReactHtmlParser from "html-react-parser"; // Importing the HTML parser

interface MessagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    customers: ICustomers[];
}

const MessagePopup: React.FC<MessagePopupProps> = ({
    isOpen,
    onClose,
    customers,
}) => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const handleSend = () => {
        setLoading(true);
        const recipients = customers.map((customer) => customer.id);

        // Strip HTML tags to get plain text
        const plainTextMessage = stripHtmlTags(message);

        // Send the plain text message
        const messageData = {
            type: "whatsapp",
            content: plainTextMessage,
            recipients: recipients,
        };

        dispatch(sendMessage(messageData));
        setLoading(false);
        onClose();

        toast.success("!تم أرسال الرسالة بنجاح");
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
                    إرسال رسالة عبر ال SMS
                </h2>
                {customers.length === 1 ? (
                    <p className="mb-2">إلى: {customers[0].name}</p>
                ) : (
                    <p className="mb-2">إلى عدد {customers.length} من عملاء</p>
                )}
                <ReactQuill
                    value={message}
                    onChange={setMessage}
                    className="w-full mb-4"
                    placeholder="اكتب الرسالة هنا..."
                    modules={modules}
                />

                <div className="message-preview mt-4">
                    <h3 className="font-semibold text-lg">معاينة الرسالة</h3>
                    <div className="preview-content text-gray-600">
                        {ReactHtmlParser(message)} {/* Parse and render HTML */}
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

export default MessagePopup;
