import {
    Users,
    UserPlus,
    Repeat,
} from "lucide-react"; // Replace with desired Lucide icons
import { SalesReport } from "../../../store/Campaigns/type/CampaignType";

interface SalesBoxesProps {
    salesReport: SalesReport | null;
}

const CustomersBehavior = ({ salesReport }: SalesBoxesProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">
                        عملاء قامو بعمليات شراء
                    </h3>
                    <div className="text-gray-500">
                        <Users size={20} /> {/* Updated Icon */}
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.customers_behaviour.total_customers
                            ? `${Number(salesReport.customers_behaviour.total_customers)}`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">
                        عملاء قامو بعملية شراء لأول مرة
                    </h3>
                    <div className="text-gray-500">
                        <UserPlus size={20} /> {/* Updated Icon */}
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.customers_behaviour.first_time_customers
                            ? `${Number(salesReport.customers_behaviour.first_time_customers)}`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">
                        عملاء قامو بأكثر من عملية شراء أثناء فترة الحملة
                    </h3>
                    <div className="text-gray-500">
                        <Repeat size={20} /> {/* Updated Icon */}
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.customers_behaviour.repeat_customers
                            ? `${Number(salesReport.customers_behaviour.repeat_customers)}`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomersBehavior;
