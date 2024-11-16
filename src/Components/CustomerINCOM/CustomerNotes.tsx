import { useState } from "react";
import AddNoteTab from "./AddNoteTab";
import ProductTable from "./ProductTable";
import NotesHistory from "./NotesHistory";

const CustomerNotes = () => {
    const [activeTab, setActiveTab] = useState("addNote");

    const renderContent = () => {
        switch (activeTab) {
            case "addNote":
                return <AddNoteTab />;
            case "noteHistory":
                return <NotesHistory />;
            case "other":
                return <ProductTable />;
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
