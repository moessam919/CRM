import React from "react";

type Lead = {
    id: number;
    createdDate: string;
    name: string;
    phone: string;
    status: string;
};

type LeadDetailsModalProps = {
    lead: Lead;
    onClose: () => void;
};

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
    lead,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 shadow-md z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-right">
                <h2 className="text-xl font-semibold mb-4">تفاصيل العميل</h2>
                <p>
                    <strong>تاريخ الإنشاء:</strong> {lead.createdDate}
                </p>
                <p>
                    <strong>الاسم:</strong> {lead.name}
                </p>
                <p>
                    <strong>الهاتف:</strong> {lead.phone}
                </p>
                <p>
                    <strong>الحالة:</strong> {lead.status}
                </p>
                <button
                    className="mt-4 w-full border border-gray-500 hover:bg-gray-800   hover:text-white py-2 rounded duration-200"
                    onClick={onClose}
                >
                    إغلاق
                </button>
            </div>
        </div>
    );
};

export default LeadDetailsModal;
