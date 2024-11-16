import { useState } from "react";
import { CustomerData } from "../CustomersCallTable";
import ReactQuill from "react-quill"; // Import Quill editor
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface MessagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    customers: CustomerData[];
}

const EmailPopup: React.FC<MessagePopupProps> = ({
    isOpen,
    onClose,
    customers,
}) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSend = () => {
        setLoading(true);
        setTimeout(() => {
            console.log(
                "Sending message:",
                message,
                "to customers:",
                customers
            );
            setLoading(false);
            onClose();
        }, 1000);
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

export default EmailPopup;
