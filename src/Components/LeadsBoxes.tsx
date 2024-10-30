import { Ban, CheckCheck, Clock, Database } from "lucide-react";

const LeadsBoxes = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-gray-500 font-bold">جميع الطلبات</h3>
                    <div className="text-gray-500">
                        <Database size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">500</p>
                    <span className="text-green-500 text-xs font-bold">
                        +20% من الشهر السابق
                    </span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className="text-gray-500 font-bold">
                        إجمالي الطلبات المكتملة
                    </h3>
                    <div className="text-gray-500">
                        <CheckCheck size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">478</p>
                    <span className="text-green-500 text-xs font-bold">
                        +25% من الشهر السابق
                    </span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className="text-gray-500 font-bold">
                        إجمالي الطلبات الجاري شحنها
                    </h3>
                    <div className="text-gray-500">
                        <Clock size={23} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">12</p>
                    <span className="text-green-500 text-xs font-bold">
                        +12% من الشهر السابق
                    </span>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2 w-full ">
                    <h3 className="text-gray-500 font-bold">
                        إجمالي الطلبات الملغية
                    </h3>
                    <div className="text-gray-500">
                        <Ban size={20} />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-2xl font-bold mb-1">10</p>
                    <span className="text-green-500 text-xs font-bold">
                        +10% من الشهر السابق
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LeadsBoxes;
