import {
    ChartLine,
    CheckCheck,
    Database,
    HandCoins,
    PersonStanding,
} from "lucide-react";
import { ISalesReport } from "../types/salesreport";

interface DetailsBoxesProps {
    salesreport: ISalesReport;
}

const DetailsBoxes = ({ salesreport }: DetailsBoxesProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">جميع الطلبات</h3>
                    <div className="text-gray-500">
                        <Database size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesreport?.total_sales
                            ? `${Number(salesreport.total_sales).toFixed(2).toLocaleString()} ريال`
                            : "لا يوجد"}
                    </p>
                    {/* <span className="text-green-500 text-xs font-bold">
                        +20% من الشهر السابق
                    </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className="text-gray-500 font-bold">عدد العملاء</h3>
                    <div className="text-gray-500">
                        <PersonStanding size={23} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesreport?.customers_count
                            ? Number(
                                  salesreport.customers_count
                              ).toLocaleString()
                            : "لا يوجد"}
                    </p>
                    {/* <span className="text-green-500 text-xs font-bold">
                        +12% من الشهر السابق
                    </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className=" text-gray-500 font-bold">
                        المبيعات الاسبوعية
                    </h3>
                    <div className="text-gray-500">
                        <HandCoins size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesreport?.sales_last_7_days
                            ? `${Number(salesreport.sales_last_7_days).toFixed(2).toLocaleString()} ريال`
                            : "لا يوجد"}
                    </p>
                    {/* <span className="text-green-500 text-xs font-bold">
                        +25% من الشهر السابق
                    </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className="text-gray-500 font-bold">
                        المبيعات الشهرية
                    </h3>
                    <div className="text-gray-500">
                        <ChartLine size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesreport?.sales_current_month
                            ? `${Number(salesreport.sales_current_month).toFixed(2).toLocaleString()} ريال`
                            : "لا يوجد"}
                    </p>
                    {/* <span className="text-green-500 text-xs font-bold">
                        +10% من الشهر السابق
                    </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className="text-gray-500 font-bold">الحملات النشطة</h3>
                    <div className="text-gray-500">
                        <CheckCheck size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">
                        {salesreport?.sales_current_month
                            ? `${Number(salesreport.active_campaigns)}`
                            : "لا يوجد"}
                    </p>
                    {/* <span className="text-green-500 text-xs font-bold">
                        +10% من الشهر السابق
                    </span> */}
                </div>
            </div>
        </div>
    );
};

export default DetailsBoxes;
