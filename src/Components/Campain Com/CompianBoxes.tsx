import { CalendarFold, Target, TrendingUp, Users } from "lucide-react";

const CompianBoxes = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        الحملات النشطة
                    </h3>
                    <div className="text-gray-500">
                        <TrendingUp />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-3xl font-bold mb-1">5</p>
                    {/* <span className="text-green-500 text-xs font-bold">
                +20% من الشهر السابق
            </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        إجمالي الإيرادات
                    </h3>
                    <div className="text-gray-500">
                        <Target />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-3xl font-bold mb-1">2500 ريال </p>
                    {/* <span className="text-green-500 text-xs font-bold">
                +20% من الشهر السابق
            </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        العملاء الجدد
                    </h3>
                    <div className="text-gray-500">
                        <Users />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-3xl font-bold mb-1">265</p>
                    {/* <span className="text-green-500 text-xs font-bold">
                +20% من الشهر السابق
            </span> */}
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        حملات هذا الشهر
                    </h3>
                    <div className="text-gray-500">
                        <CalendarFold />
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-3xl font-bold mb-1">9</p>
                    {/* <span className="text-green-500 text-xs font-bold">
                +20% من الشهر السابق
            </span> */}
                </div>
            </div>
        </div>
    );
};

export default CompianBoxes;
