import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMessage } from "../store/SendBulkMessage/act/actSendMessage";
import MessageList from "../Components/Messages/MessageList";

interface FilterOption {
    value: string;
    type: string;
}

const Messages = () => {
    const { messages, loading } = useAppSelector((state) => state.Message);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Filters and states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("الكل");
    const [selectedDate, setSelectedDate] = useState("");
    const [showFilterMenu, setShowFilterMenu] = useState(false);


    useEffect(() => {
        dispatch(getMessage());
    }, [dispatch]);

    const filterOptions: FilterOption[] = [
        { value: "الكل", type: "all" },
        { value: "واتساب", type: "whatsapp" },
        { value: "البريد الإلكتروني", type: "email" },
        { value: "رسائل نصية", type: "text" },
    ];


    // Handle filter type selection
    const handleSelectType = (filter: FilterOption) => {
        setSelectedType(filter.value);
        setShowFilterMenu(false);
    };

    // Filter messages
    const filteredMessages = messages.filter((message) => {
        const matchesTitle = message.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCustomer = message.recipients.some((recipient) =>
            recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesType =
            selectedType === "الكل" ||
            message.type ===
                filterOptions.find((option) => option.value === selectedType)
                    ?.type;
        const matchesDate =
            !selectedDate || message.sent_at.startsWith(selectedDate);

        return matchesTitle || (matchesCustomer && matchesType && matchesDate);
    });

    return (
        <div className="bg-gray-200 rounded-md p-6">
            <div className="w-full md:mx-auto p-3 md:p-6 bg-white rounded-lg shadow-sm">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4">
                        <h1 className="md:text-2xl font-semibold mb-2 text-center md:text-start">
                            رسائل العملاء
                        </h1>
                        <p className="text-sm md:text-base text-gray-500">
                            إدارة وتتبع جميع رسائل العملاء
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate("/contacts")}
                            className="px-4 py-2 border border-gray-500 hover:text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            رسالة جديدة
                        </button>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search by title or customer name */}
                    <div className="flex-1 relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="البحث في الرسائل..."
                            className="w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 duration-150"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter by type */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-10 py-3 border rounded-lg hover:bg-gray-50 w-full md:w-auto justify-center"
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                        >
                            {selectedType}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showFilterMenu && (
                            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                {filterOptions.map((filter) => (
                                    <button
                                        key={filter.type}
                                        className="w-full text-right px-4 py-2 hover:bg-gray-50"
                                        onClick={() => handleSelectType(filter)}
                                    >
                                        {filter.value}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filter by date */}
                    <div>
                        <input
                            type="date"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 duration-150"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-3 min-h-[520px] max-h-[520px] overflow-auto">
                    <MessageList
                        messages={filteredMessages}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Messages;
