import { ChartColumn, ChartPie, TrendingUp } from "lucide-react";

const StatusCopmain = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        حالة الحملات
                    </h3>
                    <div className="text-gray-500">
                        <ChartPie />
                    </div>
                </div>

                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-green-500"></span>
                        <h2 className="font-bold text-gray-500">نشط</h2>
                    </div>

                    <p className="font-bold p-2">2</p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                        <h2 className="font-bold text-gray-500">مسودة</h2>
                    </div>

                    <p className="font-bold p-2">2</p>
                </div>

                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                        <h2 className="font-bold text-gray-500">
                            قيد الانتظار
                        </h2>
                    </div>

                    <p className="font-bold p-2">4</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        نظرة عامة على التقدم
                    </h3>
                    <div className="text-gray-500">
                        <ChartColumn />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-4xl font-bold ">25.0%</p>
                    <p className=" text-gray-500 mt-1">متوسط تقدم الحملة</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div
                            className="bg-gray-600 h-2.5 rounded-full"
                            style={{ width: "25%" }}></div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-md hover:translate-y-1 duration-200">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl text-gray-500 font-bold">
                        نظرة عامة على الحملات
                    </h3>
                    <div className="text-gray-500">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="mt-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-gray-500 font-bold">
                                حملات قادمة
                            </h2>
                            <p className="text-gray-500 font-bold">0</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-gray-600 h-2.5 rounded-full"
                                style={{ width: "55%" }}></div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-gray-500 font-bold">
                                حملات نشطة
                            </h2>
                            <p className="text-gray-500 font-bold">0</p>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-gray-600 h-2.5 rounded-full"
                                style={{ width: "33%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusCopmain;
