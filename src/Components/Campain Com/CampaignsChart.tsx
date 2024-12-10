import { useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actGetCampaignChartData } from "../../store/Campaigns/act/CampaignActions";
import { ChartDataPoint } from "../../store/Campaigns/type/CampaignType";

// Define types
type TimeRange = "day" | "week" | "month" | "year";

// Assuming ICampaignsChartData is the interface for the response
const CampaignsChart = ({ id }: { id: string | undefined }) => {
    const [sortType, setSortType] = useState<TimeRange>("week");

    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.campaigns);

    useEffect(() => {
        if (id) {
            dispatch(actGetCampaignChartData({ id, period: sortType }));
        }
    }, [dispatch, id, sortType]);

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
    // const getPeriodLabel = () => {
    //     switch (sortType) {
    //         case "day":
    //             return "اليوم";
    //         case "week":
    //             return "الأسبوع";
    //         case "month":
    //             return "الشهر";
    //         case "year":
    //             return "السنة";
    //         default:
    //             return "";
    //     }
    // };

    // Format data for the chart
    const formattedData =
        Array.isArray(data) && data.length > 0
            ? data.map((point: ChartDataPoint) => ({
                  date: point.date,
                  total_sales: parseFloat(point.metrics.total_sales || "NaN"),
                  sales_of_category: parseFloat(
                      point.metrics.sales_of_category || "NaN"
                  ),
                  sales_of_specific_products: parseFloat(
                      point.metrics.sales_of_specific_products || "NaN"
                  ),
                  customer_registration: parseFloat(
                      point.metrics.customer_registration || "NaN"
                  ),
              }))
            : []; // Fallback to an empty array if 'data' is not an array

    // Determine which metrics are present in the data
    const renderTotalSalesLine = formattedData.some(
        (point) => !isNaN(point.total_sales)
    );
    const renderSalesOfCategoryLine = formattedData.some(
        (point) => !isNaN(point.sales_of_category)
    );
    const renderSalesOfSpecificProductsLine = formattedData.some(
        (point) => !isNaN(point.sales_of_specific_products)
    );
    const renderCustomerRegistrationLine = formattedData.some(
        (point) => !isNaN(point.customer_registration)
    );

    return (
        <div className="p-5 bg-white rounded-md shadow-md overflow-auto min-h-[495px] max-h-[495px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div className="">
                    {/* <span className="text-green-500 font-bold text-sm">
                        مبيعات {getPeriodLabel()}
                    </span> */}
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
                    <LineChart
                        data={formattedData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />

                        {/* Line chart lines with their respective styles */}
                        {renderTotalSalesLine && (
                            <Line
                                type="monotone"
                                dataKey="total_sales"
                                stroke="#8884d8"
                                name="مبيعات الكل"
                                dot={false} // Optionally, remove dots if not needed
                            />
                        )}
                        {renderSalesOfCategoryLine && (
                            <Line
                                type="monotone"
                                dataKey="sales_of_category"
                                stroke="#82ca9d"
                                name="مبيعات من الفئات"
                                dot={false} // Optionally, remove dots if not needed
                            />
                        )}
                        {renderSalesOfSpecificProductsLine && (
                            <Line
                                type="monotone"
                                dataKey="sales_of_specific_products"
                                stroke="#ffc658"
                                name="مبيعات من المنتجات المحددة"
                                dot={false} // Optionally, remove dots if not needed
                            />
                        )}
                        {renderCustomerRegistrationLine && (
                            <Line
                                type="monotone"
                                dataKey="customer_registration"
                                stroke="#ff7300"
                                name="تسجيل العملاء"
                                dot={false} // Optionally, remove dots if not needed
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>{" "}
            </div>
        </div>
    );
};

export default CampaignsChart;
