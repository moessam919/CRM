import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    TooltipProps,
} from "recharts";

interface DealData {
    name: string;
    value: number;
    color: string;
}

const data: DealData[] = [
    { name: "مكتمل", value: 37, color: "#5a67d8" },
    { name: "قيد الانتظار", value: 23, color: "#f6ad55" },
    { name: "ملغي", value: 18, color: "#f6ad55" },
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded shadow-md text-sm">
                <p className="font-bold">{label}</p>
                <p>
                    <span className="font-semibold">العدد: </span>
                    {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

const SalesForecastChart = () => {
    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <p className="font-bold md:text-lg text-gray-500 mb-2">
                حالة المبيعات
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div className="">
                    <h4 className="text-2xl font-bold">250.00 ريال</h4>
                    <span className="text-green-500 font-bold text-sm">
                        مبيعات اليوم 8.5%
                    </span>
                </div>
            </div>

            <div className="min-h-[352px]">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="#8884d8">
                            {data.map((entry, index) => (
                                <Bar
                                    key={`bar-${index}`}
                                    dataKey="value"
                                    fill={entry.color}
                                    label={{
                                        position: "top",
                                        fill: "#fff",
                                        fontSize: 12,
                                        fontWeight: "bold",
                                    }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesForecastChart;
