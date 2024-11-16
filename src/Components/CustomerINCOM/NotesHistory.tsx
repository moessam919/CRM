import React from "react";
import { Phone, MessageCircle, Mail, MessageSquareMore } from "lucide-react"; // Import icons from Lucide

interface Note {
    id: number;
    contactMethod: "whatsapp" | "email" | "sms" | "phone";
    timestamp: string;
    note: string;
    customerName?: string;
}

const NotesHistory: React.FC = () => {
    const notes: Note[] = [
        {
            id: 1,
            contactMethod: "whatsapp",
            timestamp: "2024-11-16 14:35",
            note: "تم التواصل مع العميل عبر الواتساب بخصوص العرض الخاص.",
            customerName: "أحمد محمد",
        },
        {
            id: 2,
            contactMethod: "email",
            timestamp: "2024-11-15 10:20",
            note: "تم إرسال بريد إلكتروني لتأكيد الطلب.",
            customerName: "سارة علي",
        },
        {
            id: 3,
            contactMethod: "sms",
            timestamp: "2024-11-14 08:50",
            note: "تم إرسال رسالة نصية لتذكير العميل بالدفع.",
        },
        {
            id: 4,
            contactMethod: "phone", // Added phone method
            timestamp: "2024-11-12 09:15",
            note: "تم الاتصال بالعميل لتأكيد الموعد.",
            customerName: "علي أحمد",
        },
    ];

    const renderIcon = (method: "whatsapp" | "email" | "sms" | "phone") => {
        switch (method) {
            case "whatsapp":
                return <MessageCircle className="text-green-500 text-2xl" />;
            case "email":
                return <Mail className="text-blue-500 text-2xl" />;
            case "sms":
                return (
                    <MessageSquareMore className="text-purple-500 text-2xl" />
                );
            case "phone":
                return <Phone className="text-gray-500 text-2xl" />;
            default:
                return null;
        }
    };

    return (
        <div className="pt-4 px-6 bg-white rounded-lg shadow-lg min-h-[442px]">
            <h2 className="text-xl font-bold mb-4">سجل الملاحظات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-gray-100 rounded-lg shadow p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
                    >
                        <div>{renderIcon(note.contactMethod)}</div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">
                                {note.timestamp}
                            </div>
                            <div className="font-bold text-gray-800 mb-1">
                                {note.customerName || "عميل مجهول"}
                            </div>
                            <div className="text-gray-700">{note.note}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesHistory;
