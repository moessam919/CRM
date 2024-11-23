import { BookUser, Briefcase, Mail, Phone, User } from "lucide-react";
import SalesInfo from "./SalesInfo";
import { ICustomer } from "../../types/customer";

interface ICustomerInfo {
    customer: ICustomer | null;
}

const CustomerInfoBoxes = ({ customer }: ICustomerInfo) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {/* Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 col-span-1 md:col-span-2 xl:col-span-2 hover:translate-y-1 duration-200">
                <h1 className="md:text-2xl font-bold mb-4">بيانات العميل</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <User className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">
                            {customer?.name ?? "لا يوجد"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Mail className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">
                            {customer?.email_address ?? "لا يوجد"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Phone className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">
                            {customer?.phone_number ?? "لا يوجد"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Briefcase className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">نوع العميل :</p>
                        <span className="font-bold">
                            {customer?.customer_type
                                ? customer.customer_type === "b2b"
                                    ? "شركات"
                                    : "افراد"
                                : "لا يوجد"}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <BookUser className="font-bold text-gray-500" />
                        <p className="font-bold text-gray-500">العنوان :</p>
                        <span className="text-green-500 font-bold">
                            {customer?.billing_address ?? "لا يوجد"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-span-1 md:col-span-2 xl:col-span-3">
                <SalesInfo customer={customer} />
            </div>
        </div>
    );
};

export default CustomerInfoBoxes;
