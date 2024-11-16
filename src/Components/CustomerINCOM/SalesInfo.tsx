import { Database } from "lucide-react";

const SalesInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2  gap-2">
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">جميع الطلبات</h3>
                    <div className="text-gray-500">
                        <Database size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">84.00 ريال</p>
                    <span className="text-green-500 text-xs font-bold">
                        +20% من الشهر السابق
                    </span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">عدد الطلبات</h3>
                    <div className="text-gray-500">
                        <Database size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">84</p>
                    <span className="text-green-500 text-xs font-bold">
                        +20% من الشهر السابق
                    </span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">اخر عملية شراء</h3>
                    <div className="text-gray-500">
                        <Database size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">200.00 ريال</p>
                    <span className="text-green-500 text-xs font-bold">
                        +20% من الشهر السابق
                    </span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">
                        قيمة طلبات هذا شهر
                    </h3>
                    <div className="text-gray-500">
                        <Database size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">84.00 ريال</p>
                    <span className="text-green-500 text-xs font-bold">
                        +20% من الشهر السابق
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SalesInfo;
