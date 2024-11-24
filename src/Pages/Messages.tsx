import { useState } from "react";
import {
    Search,
    Filter,
    Mail,
    Users,
    Clock,
    Trash2,
    ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const [selectedFilter, setSelectedFilter] = useState("الكل");
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const messages = [
        {
            id: 1,
            title: "مرحباً بك في خدمتنا الجديدة",
            recipients: 12,
            sender: "محمود احمد",
            date: "2024-03-15",
            preview:
                "نرحب بكم في خدمتنا الجديدة. نود إخباركم بأحدث التحديثات والمميزات...",
        },
        {
            id: 2,
            title: "تحديث مهم بخصوص الخدمات",
            recipients: 45,
            sender: "محمد علي",
            date: "2024-03-14",
            preview:
                "نود إبلاغكم بالتحديثات الجديدة التي تمت إضافتها إلى نظامنا...",
        },
        {
            id: 3,
            title: "دعوة لحضور الاجتماع السنوي",
            recipients: 156,
            sender: "سارة محمد",
            date: "2024-03-13",
            preview: "يسرنا دعوتكم لحضور الاجتماع السنوي الذي سيقام في...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
        {
            id: 4,
            title: "عرض خاص لعملائنا المميزين",
            recipients: 89,
            sender: "أحمد خالد",
            date: "2024-03-12",
            preview: "نقدم لكم عرضاً خاصاً وحصرياً لعملائنا المميزين...",
        },
    ];

    const filters = ["الكل", "الشركات", "الافراد"];
    const navigate = useNavigate();

    return (
        <div className="bg-gray-200  rounded-md p-6">
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">
                            رسائل العملاء
                        </h1>
                        <p className="text-gray-500">
                            إدارة وتتبع جميع رسائل العملاء
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate("/contacts")}
                            className="px-4 py-2 border border-gray-500  hover:text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            رسالة جديدة
                        </button>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="البحث في الرسائل..."
                            className="w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 duration-150"
                        />
                    </div>
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-4 py-3 border rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center"
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                        >
                            <Filter className="h-4 w-4" />
                            {selectedFilter}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showFilterMenu && (
                            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        className="w-full text-right px-4 py-2 hover:bg-gray-50"
                                        onClick={() => {
                                            setSelectedFilter(filter);
                                            setShowFilterMenu(false);
                                        }}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-3  min-h-[530px] max-h-[530px] overflow-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150"
                        >
                            <div className="flex items-start gap-4 flex-1">
                                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-lg">
                                            {message.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-2 line-clamp-1">
                                        {message.preview}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4 ml-1" />
                                            {message.recipients} مستلم
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4 ml-1" />
                                            {message.date}
                                        </div>
                                        <span>{message.sender}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-150">
                                    <Trash2 className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
