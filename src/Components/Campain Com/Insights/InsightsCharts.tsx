import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { SalesReport } from "../../../store/Campaigns/type/CampaignType";

interface InsightsChartsProps {
    salesReport: SalesReport | null;
}

const COLORS = ["#5a67d8", "#82ca9d"];

const CUSTOMER_TYPE_TRANSLATIONS = {
    b2b: "شركات",
    b2c: "افراد",
};

const InsightsCharts = ({ salesReport }: InsightsChartsProps) => {
    // If salesReport is null, return null or a placeholder
    if (!salesReport) return null;

    // Prepare data for the pie chart with Arabic names
    const customerTypesData =
        salesReport.customers_behaviour.customer_types.map((type) => ({
            name: CUSTOMER_TYPE_TRANSLATIONS[
                type.customer_type as keyof typeof CUSTOMER_TYPE_TRANSLATIONS
            ],
            value: type.total_value,
        }));

    return (
        <div className="bg-white p-5 rounded-md shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
                أنواع العملاء حسب القيمة الإجمالية للمبيعات
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={customerTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        startAngle={360} // Start top-middle
                        endAngle={0} // End bottom-middle
                        innerRadius={60} // Hollow center
                        outerRadius={80} // Radius size
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={5}>
                        {customerTypesData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [
                            `${Number(value).toLocaleString()} ر.س`,
                            "القيمة الإجمالية للمبيعات",
                        ]}
                    />
                    <Legend formatter={(value) => ` ${value}`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InsightsCharts;
