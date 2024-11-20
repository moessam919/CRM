import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actGetCustomerNote } from "../../store/Customer/act/actGetCustomer";
import { useEffect } from "react";
import { NotebookPen } from "lucide-react"; // Import icons from Lucide
import { ICustomer } from "../../types/customer";

interface CustomerNotesProps {
    customer: ICustomer | null;
}

const NotesHistory: React.FC<CustomerNotesProps> = ({ customer }) => {
    const { customerNote } = useAppSelector((state) => state.cutsomerNote);
    const dispatch = useAppDispatch();

    const id = customer?.id;

    useEffect(() => {
        if (id) {
            dispatch(actGetCustomerNote(id));
        }
    }, [dispatch, id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="pt-4 px-6 bg-white rounded-lg shadow-lg md:min-h-[348px]">
            <h2 className="text-xl font-bold mb-4">سجل الملاحظات</h2>
            {customerNote && customerNote.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {customerNote.map((note) => (
                        <div
                            key={note.id}
                            className="bg-gray-100 rounded-lg shadow p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
                        >
                            <div className="text-green-600">
                                <NotebookPen />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">
                                    {formatDate(note.created_at)}
                                </div>
                                <div className="flex mb-1">
                                    <span className="text-gray-500">
                                        المستخدم:
                                    </span>
                                    <p className="font-bold text-gray-700 mr-1">
                                        {note.created_by.username ||
                                            "عميل مجهول"}
                                    </p>
                                </div>
                                <div className="text-gray-700 break-words">
                                    {note.note}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-2xl text-gray-500 py-10">
                    لا يوجد ملاحظات
                </div>
            )}
        </div>
    );
};

export default NotesHistory;
