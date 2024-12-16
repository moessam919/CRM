import {
    Handshake,
    ShoppingBag,
    DollarSign,
    BarChart,
    Package,
} from "lucide-react"; // Replace these with the desired Lucide icons
import { SalesReport } from "../../../store/Campaigns/type/CampaignType";

interface SalesBoxesProps {
    salesReport: SalesReport | null;
}

const SalesBoxes = ({ salesReport }: SalesBoxesProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5">
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">
                        إجمالي قيمة المبيعات
                    </h3>
                    <div className="text-gray-500">
                        <Handshake size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.sales_performance.total_sales_value
                            ? `${Number(salesReport.sales_performance.total_sales_value).toFixed(2).toLocaleString()} ريال`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">عدد الفواتير</h3>
                    <div className="text-gray-500">
                        <ShoppingBag size={23} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.sales_performance.invoices_count
                            ? Number(
                                  salesReport.sales_performance.invoices_count
                              ).toLocaleString()
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">
                        متوسط قيمة المعاملة
                    </h3>
                    <div className="text-gray-500">
                        <DollarSign size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.sales_performance
                            .average_transaction_value
                            ? `${Number(salesReport.sales_performance.average_transaction_value).toFixed(2).toLocaleString()} ريال`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">حجم المبيعات</h3>
                    <div className="text-gray-500">
                        <BarChart size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.sales_performance.sales_volume
                            ? `${Number(salesReport.sales_performance.sales_volume).toFixed(2).toLocaleString()} ريال`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h3 className="text-gray-500 font-bold">
                        المنتجات المباعة
                    </h3>
                    <div className="text-gray-500">
                        <Package size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesReport?.sales_performance.products_sold
                            ? `${Number(salesReport.sales_performance.products_sold)}`
                            : "لا يوجد"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SalesBoxes;
