import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actCreateCustomerNote } from "../../store/Customer/act/actGetCustomer";
import { ICustomer } from "../../types/customer";

interface AddNoteTabProps {
    customer: ICustomer | null;
}

const AddNoteTab: React.FC<AddNoteTabProps> = ({ customer }) => {
    const [note, setNote] = useState("");
    const { loading, error } = useAppSelector(
        (state) => state.createCustomerNote
    );
    const dispatch = useAppDispatch();

    const id = customer?.id;
    const handleAddNote = () => {
        if (!note.trim()) {
            return;
        }

        dispatch(actCreateCustomerNote({ id, note }))
            .unwrap()
            .then(() => {
                setNote("");
            });
    };

    const errorMessage = error
        ? typeof error === "string"
            ? error
            : (error as { message: string }).message ||
              "هناك خطأ في ارسال الملاحظة الرجاء المحاولة في وقت لاحق."
        : null;

    return (
        <div className="pt-2 md:px-4 space-y-4 md:min-h-[348px]">
            {/* Note Input */}
            <div className="flex flex-col">
                <label
                    htmlFor="note"
                    className="text-gray-700 font-medium text-xl mb-2"
                >
                    كتابة ملاحظة
                </label>
                <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="قم باضافة ملاحظاتك هنا"
                    className="col-span-8 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                    rows={errorMessage ? 7 : 8}
                ></textarea>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleAddNote}
                    disabled={loading === "pending"}
                    className={`px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md ${
                        loading === "pending"
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-600"
                    } duration-150`}
                >
                    {loading === "pending"
                        ? "جاري الإضافة..."
                        : "اضافة الملاحظة"}
                </button>
            </div>
        </div>
    );
};

export default AddNoteTab;
