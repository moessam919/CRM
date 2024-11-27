import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { ICustomers } from "../../types/customers";
import { actEditCustomers } from "../../store/Customers/act/actGetCustomers";
import toast from "react-hot-toast";

interface EditCustomerPopupProps {
    isOpen: boolean;
    onClose: () => void;
    customer: ICustomers;
}

const EditCustomerPopup: React.FC<EditCustomerPopupProps> = ({
    isOpen,
    onClose,
    customer,
}) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState(customer.name);
    const [phoneNumber, setPhoneNumber] = useState(customer.phone_number);
    const [email, setEmail] = useState(customer.email_address);
    const [address, setAddress] = useState(customer.billing_address);
    const [phoneError, setPhoneError] = useState<string>("");

    const phoneRegex = /^05\d{8}$/;

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhoneNumber(value);

        // Validate phone number format
        if (!phoneRegex.test(value)) {
            setPhoneError("يرجى إدخال رقم جوال صحيح يبدأ بـ 05");
        } else {
            setPhoneError("");
        }
    };

    const handleSave = () => {
        if (phoneError) return;

        const updatedCustomer = {
            ...customer,
            name,
            phone_number: phoneNumber,
            email_address: email,
            billing_address: address,
        };
        dispatch(actEditCustomers({ id: customer.id, updatedCustomer }));
        toast.success("تم تحديث بيانات العميل بنجاح!");

        onClose();
    };

    const isFormValid = phoneRegex.test(phoneNumber) && !phoneError;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
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
                        رقم الجوال:
                    </label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                    />
                    {phoneError && (
                        <p className="text-red-500 text-sm mt-1">
                            {phoneError}
                        </p>
                    )}
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
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        العنوان:
                    </label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                        disabled={!isFormValid}
                    >
                        حفظ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCustomerPopup;
