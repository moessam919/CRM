import { useEffect } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actGetCampaignChartData } from "../../store/Campaigns/act/CampaignActions";
import { ChartDataPoint } from "../../store/Campaigns/type/CampaignType";

// Define types

// Assuming ICampaignsChartData is the interface for the response
const CampaignsChart = ({ id }: { id: string | undefined }) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.campaigns);

    useEffect(() => {
        if (id) {
            dispatch(actGetCampaignChartData({ id }));
        }
    }, [dispatch, id]);

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
            : [];

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
        <div className="p-5 bg-white rounded-md shadow-md overflow-auto min-h-[344px] max-h-[390px]">
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
                        <YAxis textAnchor="start"/>
                        <Tooltip />
                        <Legend />
                        {renderTotalSalesLine && (
                            <Line
                                type="monotone"
                                dataKey="total_sales"
                                stroke="#8884d8"
                                name="إجمالي المبيعات"
                                dot={false}
                                strokeWidth={2}
                            />
                        )}
                        {renderSalesOfCategoryLine && (
                            <Line
                                type="monotone"
                                dataKey="sales_of_category"
                                stroke="#82ca9d"
                                name="مبيعات من الفئات"
                                dot={false}
                                strokeWidth={2}
                            />
                        )}
                        {renderSalesOfSpecificProductsLine && (
                            <Line
                                type="monotone"
                                dataKey="sales_of_specific_products"
                                stroke="#ffc658"
                                name="مبيعات من المنتجات المحددة"
                                dot={false}
                                strokeWidth={2}
                            />
                        )}
                        {renderCustomerRegistrationLine && (
                            <Line
                                type="monotone"
                                dataKey="customer_registration"
                                stroke="#ff7300"
                                name="تسجيل العملاء"
                                dot={false}
                                strokeWidth={2}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>{" "}
            </div>
        </div>
    );
};

export default CampaignsChart;
