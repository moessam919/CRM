import { DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
    selectedCampaign: selectedCampaign;
}
const MetricsAverageTransactionValue = ({
    selectedCampaign,
}: ISelectedCampaign) => {
    const defaultAnalysis = {
        current: "0.00",
        previous: "0.00",
        target: "0.00",
        change: "0.00",
        percentage_change: "0.00",
        achievement_percentage: "0.00",
    };

    const analysisData =
        (selectedCampaign.analysis?.average_transaction_value &&
            selectedCampaign.analysis?.average_transaction_value) ||
        defaultAnalysis;

    return (
        <>
            {selectedCampaign.metrics.find(
                (m) => m.name === "average_transaction_value"
            ) && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">متوسط قيمة المعاملة</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {
                            selectedCampaign.metrics.find(
                                (m) => m.name === "average_transaction_value"
                            )?.value
                        }
                        <span className="text-sm text-gray-600 mr-1">
                            {selectedCampaign.metrics.find(
                                (m) => m.name === "average_transaction_value"
                            )?.type === "integer"
                                ? "ريال"
                                : "%"}
                        </span>
                    </div>
                    <div className="flex items-center justify-around mt-4 bg-white p-2 md:p-4 rounded-md">
                        <div className="flex flex-col">
                            <div className="p-2 md:px-8">
                                <p className="font-medium">الحالي:</p>
                                <span className="text-gray-600 font-bold text-xl">
                                    {analysisData.current.toLocaleString()} ريال
                                </span>
                            </div>
                            <div className="p-2 md:px-8">
                                <p className="font-medium">السابق:</p>
                                <span className="text-gray-600 font-bold text-xl">
                                    {analysisData.previous.toLocaleString()} ريال
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className={`flex items-center ${
                                parseFloat(analysisData.change) > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}>
                                {parseFloat(analysisData.change) > 0 ? (
                                    <ArrowUp className="w-5 h-5 ml-1" />
                                ) : (
                                    <ArrowDown className="w-5 h-5 ml-1" />
                                )}
                                <span className="text-xl font-semibold">
                                    {parseFloat(analysisData.change).toLocaleString()} ريال  ( {analysisData.percentage_change} % )
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <p className="text-xl font-semibold">المستهدف : </p>
                            <p className="text-2xl font-bold">
                                {selectedCampaign.metrics.find((m) => m.name === "average_transaction_value")?.value.toLocaleString()}
                                <span className="text-sm text-gray-600 mr-1">
                                    {selectedCampaign.metrics.find((m) => m.name === "average_transaction_value")?.type === "integer" ? "ريال" : "%"}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className={`mr-1 text-3xl font-bold ${
                                parseFloat(analysisData?.achievement_percentage || "0") < 50
                                    ? "text-red-500"
                                    : parseFloat(analysisData?.achievement_percentage || "0") < 80
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}>
                                {analysisData?.achievement_percentage}%
                            </span>
                            <div className="relative w-full h-1 mt-1 bg-gray-200">
                                <div className={`absolute top-0 left-0 h-full animate-pulse ${
                                    parseFloat(analysisData?.achievement_percentage || "0") < 50
                                        ? "bg-red-200"
                                        : parseFloat(analysisData?.achievement_percentage || "0") < 80
                                        ? "bg-yellow-200"
                                        : "bg-green-200"
                                    }`} style={{ width: `${analysisData?.achievement_percentage}%` }}></div>
                                <div className={`absolute top-0 left-0 h-full ${
                                    parseFloat(analysisData?.achievement_percentage || "0") < 50
                                        ? "bg-red-500"
                                        : parseFloat(analysisData?.achievement_percentage || "0") < 80
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`} style={{ width: `${analysisData?.achievement_percentage}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MetricsAverageTransactionValue;
