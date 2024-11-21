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


const SalesOverview = () => {
    const [sortType, setSortType] = useState<string>("W1");

    const handleSort = (type: string) => {
        setSortType(type);
    };

    // Filter data based on `sortType`
    const getFilteredData = () => {
        switch (sortType) {
            case "1D":
                return data
            case "W1":
                return data
            case "WY":
                return data;
            default:
                return data;
        }
    };

    const {data} = useAppSelector((state) => state.SalesChart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actGetChartData("week"));
    }, [dispatch]);

    console.log(data);
    

    return (
        <div className="p-5 bg-white rounded-md shadow-md">
            <p className="font-bold md:text-lg text-gray-500 mb-2">
                نظرة عامة على المبيعات
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div className="">
                    <h4 className="text-2xl font-bold">250.00 ريال</h4>
                    <span className="text-green-500 font-bold text-sm">
                        مبيعات اليوم 8.5%
                    </span>
                </div>
                <div className="flex gap-2 items-center justify-end mb-4">
                    <button
                        onClick={() => handleSort("1D")}
                        className="btn px-2 py-1 border border-gray-500 hover:bg-gray-500 hover:text-white duration-200 rounded"
                    >
                        1D
                    </button>
                    <button
                        onClick={() => handleSort("W1")}
                        className="btn px-2 py-1 border border-gray-500 hover:bg-gray-500 hover:text-white duration-200 rounded"
                    >
                        W1
                    </button>
                    <button
                        onClick={() => handleSort("WY")}
                        className="btn px-2 py-1 border border-gray-500 hover:bg-gray-500 hover:text-white duration-200 rounded"
                    >
                        WY
                    </button>
                </div>
            </div>
            <div className="h-[344px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={getFilteredData()}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="uv"
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
