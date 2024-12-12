import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetChartData } from "../store/SalesChartData/act/actGetSalesChartData";

// Define types
type TimeRange = "day" | "week" | "month" | "year";

const SalesOverview = () => {
    const [sortType, setSortType] = useState<TimeRange>("week");
    const { data } = useAppSelector((state) => state.SalesChart);

    const dispatch = useAppDispatch();

    // Fetch data whenever sortType changes
    useEffect(() => {
        dispatch(actGetChartData(sortType));
    }, [sortType, dispatch]);

    const handleSort = (type: TimeRange) => {
        setSortType(type);
    };

    // Helper function to determine button style
    const getButtonStyle = (type: TimeRange): string => {
        return `px-2 py-1 border border-gray-500 rounded ${
            sortType === type
                ? "bg-gray-500 text-white"
                : "hover:bg-gray-500 hover:text-white"
        } duration-200`;
    };

    // Get period label based on sortType
    const getPeriodLabel = () => {
        switch (sortType) {
            case "day":
                return "اليوم";
            case "week":
                return "الأسبوع";
            case "month":
                return "الشهر";
            case "year":
                return "السنة";
            default:
                return "";
        }
    };

    return (
        <div className="p-5 bg-white rounded-md shadow-md">
            <p className="font-bold md:text-lg text-gray-500 mb-2">
                نظرة عامة على المبيعات
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div className="">
                    <h4 className="text-2xl font-bold">
                        {data?.total_sales ?? 0} ريال
                    </h4>
                    <span className="text-green-500 font-bold text-sm">
                        مبيعات {getPeriodLabel()}
                    </span>
                </div>
                <div className="flex gap-2 items-center justify-end mb-4">
                    <button
                        onClick={() => handleSort("day")}
                        className={getButtonStyle("day")}>
                        يوم
                    </button>
                    <button
                        onClick={() => handleSort("week")}
                        className={getButtonStyle("week")}>
                        أسبوع
                    </button>
                    <button
                        onClick={() => handleSort("month")}
                        className={getButtonStyle("month")}>
                        شهر
                    </button>
                    <button
                        onClick={() => handleSort("year")}
                        className={getButtonStyle("year")}>
                        سنة
                    </button>
                </div>
            </div>
            <div className="h-[344px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data?.chart_data ?? []}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesOverview;
