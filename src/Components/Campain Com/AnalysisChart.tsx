import {
    Legend,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
} from "recharts";
import { selectedCampaign } from "../../store/Campaigns/type/CampaignType";

interface IAnalysisChart {
    analaysis: selectedCampaign;
}

const AnalysisChart = (analaysis: IAnalysisChart) => {
    const analaysischart = analaysis.analaysis;

    const chartData = [
        {
            name: "",
            uv: 100,
            pv: 100,

            fill: "#0000",
        },
        {
            name: "إجمالي المبيعات",
            uv: parseFloat(
                analaysischart?.analysis?.total_sales?.achievement_percentage ||
                    "0"
            ),
            pv: 100,

            fill: "#5a67d8",
        },
        {
            name: "مبيعات فئة",
            uv: parseFloat(
                analaysischart?.analysis?.sales_of_category
                    ?.achievement_percentage || "0"
            ),
            pv: 100,
            fill: "#f6ad55",
        },
        {
            name: "مبيعات منتج",
            uv: parseFloat(
                analaysischart?.analysis?.sales_of_specific_products
                    ?.achievement_percentage || "0"
            ),
            pv: 100,

            fill: "#82ca9d",
        },
        {
            name: "تسجيلات العملاء",
            uv: parseFloat(
                analaysischart?.analysis?.customer_registration
                    ?.achievement_percentage || "0"
            ),
            pv: 100,

            fill: "#ff7300",
        },
    ].filter((data) => !isNaN(data.uv) && data.uv > 0);

    const style = {
        top: "50%",
        right: -10,
        transform: "translate(0, -50%)",
        lineHeight: "24px",
    };

    return (
        <div className="p-5 bg-white rounded-md shadow-md">
            <h3 className="text-center mb-4">نسب الإنجاز</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="80%"
                    barSize={15}
                    data={chartData}>
                    <RadialBar
                        label={{ position: "insideStart", fill: "#fff" }}
                        background
                        dataKey="uv"
                    />
                    <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalysisChart;
