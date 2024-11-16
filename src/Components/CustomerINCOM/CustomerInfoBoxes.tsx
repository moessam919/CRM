import { CreditCard, Mail, Notebook, Phone, User } from "lucide-react";
import SalesInfo from "./SalesInfo";

const CustomerInfoBoxes = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {/* Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 col-span-1 md:col-span-2 xl:col-span-2 hover:translate-y-1 duration-200">
                <h1 className="md:text-2xl font-bold mb-4">بيانات العميل</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <User className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">اسم العميل</p>
                    </div>
                    <div className="flex gap-2">
                        <Mail className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">
                            البريد الالكتروني
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Phone className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">رقم الهاتف</p>
                    </div>
                    <div className="flex gap-2">
                        <CreditCard className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">
                            اجمالي قيمة الطلبات :
                        </p>
                        <span className="font-bold">200 ريال</span>
                    </div>
                    <div className="flex gap-2">
                        <Notebook className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">
                            اخر عملية شراء :
                        </p>
                        <span className="text-green-500 font-bold">
                            10 أيام من اليوم
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-span-1 md:col-span-2 xl:col-span-3">
                <SalesInfo />
            </div>
        </div>
    );
};

export default CustomerInfoBoxes;
