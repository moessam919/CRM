import React, { useState } from "react";
import { ICustomers } from "../../types/customers";

interface EditCustomerPopupProps {
    isOpen: boolean;
    onClose: () => void;
    customer: ICustomers;
    onSave: (updatedCustomer: ICustomers) => void;
}

const EditCustomerPopup: React.FC<EditCustomerPopupProps> = ({
    isOpen,
    onClose,
    customer,
    onSave,
}) => {
    const [name, setName] = useState(customer.name);
    const [phoneNumber, setPhoneNumber] = useState(customer.phone_number);
    const [email, setEmail] = useState(customer.email_address);

    const handleSave = () => {
        const updatedCustomer = {
            ...customer,
            name,
            phone_number: phoneNumber,
            email_address: email,
        };
        onSave(updatedCustomer);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-xl font-bold mb-4">تعديل العميل</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        الاسم:
                    </label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        رقم الهاتف:
                    </label>
                    <input
                        type="tel"
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(Number(e.target.value))}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        البريد الإلكتروني:
                    </label>
                    <input
                        type="email"
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border hover:bg-gray-300 rounded-md duration-150"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 border hover:bg-gray-500 hover:text-white rounded-md duration-150"
                    >
                        حفظ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCustomerPopup;
