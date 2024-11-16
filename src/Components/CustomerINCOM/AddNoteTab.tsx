import { useState } from "react";

const AddNoteTab: React.FC = () => {
    const [communicationType, setCommunicationType] = useState("whatsapp");
    const [note, setNote] = useState("");

    return (
        <div className="pt-[1.6rem] md:px-4 space-y-4">
            {/* Select Box */}
            <div className="flex flex-col">
                <label
                    htmlFor="communicationType"
                    className="text-gray-700 font-medium mb-2"
                >
                    طريقة التواصل
                </label>
                <select
                    id="communicationType"
                    value={communicationType}
                    onChange={(e) => setCommunicationType(e.target.value)}
                    className="border rounded-lg md:w-[30%] focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100 p-3"
                >
                    <option value="phone">الهاتف</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">الريد الالكتروني</option>
                    <option value="sms">SMS</option>
                </select>
            </div>

            {/* Note Input */}
            <div className="flex flex-col">
                <label
                    htmlFor="note"
                    className="text-gray-700 font-medium mb-2"
                >
                    كتابة ملاحظة
                </label>
                <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="قم باضافة ملاحظاتك هنا"
                    className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={() =>
                        alert(`Note saved: ${note} via ${communicationType}`)
                    }
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 duration-150"
                >
                    اضافة الملاحظة
                </button>
            </div>
        </div>
    );
};

export default AddNoteTab;
