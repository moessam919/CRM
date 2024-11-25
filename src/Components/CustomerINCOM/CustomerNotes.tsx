import { useState } from "react";
import AddNoteTab from "./AddNoteTab";
import ProductTable from "./ProductTable";
import NotesHistory from "./NotesHistory";
import { ICustomer } from "../../types/customer";
import MessageHistory from "./MessageHistory";

interface CustomerNotesProps {
    customer: ICustomer | null;
}

const CustomerNotes: React.FC<CustomerNotesProps> = ({ customer }) => {
    const [activeTab, setActiveTab] = useState("addNote");

    const renderContent = () => {
        switch (activeTab) {
            case "addNote":
                return <AddNoteTab customer={customer} />;
            case "noteHistory":
                return <NotesHistory customer={customer} />;
            case "messageHistory":
                return <MessageHistory />;
            case "other":
                return <ProductTable customer={customer} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 hover:translate-y-1 duration-200">
            <div className="flex border-b mb-2">
                <button
                    className={`w-1/3 p-2 text-center ${
                        activeTab === "addNote"
                            ? "border-b-2 border-gray-500"
                            : ""
                    }`}
                    onClick={() => setActiveTab("addNote")}
                >
                    اضافة ملاحظة
                </button>
                <button
                    className={`w-1/3 p-2 text-center ${
                        activeTab === "noteHistory"
                            ? "border-b-2 border-gray-500"
                            : ""
                    }`}
                    onClick={() => setActiveTab("noteHistory")}
                >
                    سجل الملاحظات
                </button>
                <button
                    className={`w-1/3 p-2 text-center ${
                        activeTab === "messageHistory"
                            ? "border-b-2 border-gray-500"
                            : ""
                    }`}
                    onClick={() => setActiveTab("messageHistory")}
                >
                    سجل الرسائل
                </button>
                <button
                    className={`w-1/3 p-2 text-center ${
                        activeTab === "other"
                            ? "border-b-2 border-gray-500"
                            : ""
                    }`}
                    onClick={() => setActiveTab("other")}
                >
                    سجل المنتجات
                </button>
            </div>

            <div className="max-h-[348px] overflow-auto">{renderContent()}</div>
        </div>
    );
};

export default CustomerNotes;
