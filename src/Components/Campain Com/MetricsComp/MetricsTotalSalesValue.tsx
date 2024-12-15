import { Activity, ArrowUp, ArrowDown } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
  selectedCampaign: selectedCampaign;
}
const MetricsTotalSalesValue = ({ selectedCampaign }: ISelectedCampaign) => {
  const achievementPercentage = Math.min(
    parseFloat(selectedCampaign.analysis.total_sales?.achievement_percentage || "0"),
    100
  );

  return (
    <>
      {selectedCampaign.metrics.find((m) => m.name === "total_sales") && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-gray-600" />
            <span className="font-medium">إجمالي المبيعات</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
                <p className="text-xl font-semibold">المستهدف : </p>
                <p className="text-2xl font-bold">
                    {selectedCampaign.metrics
                    .find((m) => m.name === "total_sales")
                    ?.value.toLocaleString()}

                    <span className="text-sm text-gray-600 mr-1">
                    {selectedCampaign.metrics.find(
                        (m) => m.name === "total_sales"
                    )?.type === "integer"
                        ? "ريال"
                        : "%"}
                    </span>
                </p>
            </div>
            <div className="flex flex-col items-center">
                <span
                    className={`mr-1 text-3xl font-bold ${
                    achievementPercentage < 50
                        ? "text-red-500"
                        : achievementPercentage < 80
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                >
                    {selectedCampaign.analysis.total_sales?.achievement_percentage}%
                </span>
                <div className="relative w-full h-1 mt-1 bg-gray-200">
                    <div className={`absolute top-0 left-0 h-full animate-pulse ${
                        achievementPercentage < 50
                            ? "bg-red-200"
                            : achievementPercentage < 80
                            ? "bg-yellow-200"
                            : "bg-green-200"
                        }`} style={{ width: `${achievementPercentage}%` }}></div>
                    <div className={`absolute top-0 left-0 h-full ${
                        achievementPercentage < 50
                            ? "bg-red-500"
                            : achievementPercentage < 80
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`} style={{ width: `${achievementPercentage}%`,
                          maxWidth: "100%" }}></div>
                </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 bg-white p-2 md:p-4 rounded-md">
            <div className="flex flex-col">
              <div className="p-2 md:px-8">
                <p className="font-medium"> الفترة السابقة:</p>
                <span className="text-gray-600 font-bold text-xl">
                  {selectedCampaign.analysis.total_sales.previous.toLocaleString()}{" "}
                  ريال
                </span>
              </div>
              <div className="p-2 md:px-8">
                <p className="font-medium">المبيعات الحالية:</p>
                <span className="text-gray-600 font-bold text-2xl">
                  {selectedCampaign.analysis.total_sales.current.toLocaleString()}{" "}
                  ريال
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">

              <div className={`flex items-center ${
                parseFloat(selectedCampaign.analysis.total_sales.change) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}>
                {parseFloat(selectedCampaign.analysis.total_sales.change) > 0 ? (
                  <ArrowUp className="w-5 h-5 ml-1" />
                ) : (
                  <ArrowDown className="w-5 h-5 ml-1" />
                )}
                <span className="text-xl font-semibold">
                  {parseFloat(selectedCampaign.analysis.total_sales.change).toLocaleString()}{" "}
                  ريال  ( {selectedCampaign.analysis.total_sales.percentage_change} % )
                </span>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default MetricsTotalSalesValue;
