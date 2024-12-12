import { Boxes } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
    selectedCampaign: selectedCampaign;
}
const MetricsSalesofCategory = ({ selectedCampaign }: ISelectedCampaign) => {
    return (
        <>
            {selectedCampaign.metrics.find(
                (m) => m.name === "sales_of_category"
            ) && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <Boxes className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">مبيعات الفئة</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {selectedCampaign.metrics
                            .find((m) => m.name === "sales_of_category")
                            ?.value}
                        <span className="text-sm text-gray-600 mr-1">
                            {selectedCampaign.metrics.find(
                                (m) => m.name === "sales_of_category"
                            )?.type === "integer"
                                ? "ريال"
                                : "%"}
                        </span>
                    </div>
                    <div className="flex items-center justify-around mt-4 bg-white p-2 md:px-4 rounded-md text-center">
                        <div className="">
                            <p className="font-medium">الحالي:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.sales_of_category.current.toLocaleString()}{" "}
                                ريال
                            </span>
                        </div>
                        <div className="border-l-2 border-r-2 p-2 md:px-8 border-gray-300">
                            <p className="font-medium">السابق:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.sales_of_category.previous.toLocaleString()}{" "}
                                ريال
                            </span>
                        </div>
                        <div>
                            <p className="font-medium">الهدف:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.sales_of_category.target.toLocaleString()}{" "}
                                ريال
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row justify-between mt-2">
                        <div className="mb-2 md:mb-0">
                            <span className="font-medium">التغيير:</span>
                            <span className="text-gray-600 mr-1">
                                {selectedCampaign.analysis.sales_of_category.change.toLocaleString()}{" "}
                                ريال (+
                                {
                                    selectedCampaign.analysis.sales_of_category
                                        .percentage_change
                                }
                                %)
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">نسبة التحقيق:</span>
                            <span
                                className={`mr-1 ${
                                    parseFloat(
                                        selectedCampaign.analysis
                                            .sales_of_category
                                            ?.achievement_percentage || "0"
                                    ) < 50
                                        ? "text-red-500"
                                        : parseFloat(
                                                selectedCampaign.analysis
                                                    .sales_of_category
                                                    ?.achievement_percentage ||
                                                    "0"
                                            ) < 80
                                          ? "text-yellow-500"
                                          : "text-green-500"
                                }`}>
                                {
                                    selectedCampaign.analysis.sales_of_category
                                        ?.achievement_percentage
                                }
                                %
                            </span>
                        </div>
                    </div>
                    {selectedCampaign.metrics.find(
                        (m) => m.name === "sales_of_category"
                    )?.additional_fields.categories && (
                        <div className="mt-4">
                            <div className="text-sm font-medium mb-1">
                                الفئات:
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {selectedCampaign.metrics
                                    .find((m) => m.name === "sales_of_category")
                                    ?.additional_fields.categories?.map(
                                        (category) => (
                                            <span
                                                key={category.id}
                                                className="text-sm bg-white px-2 py-1 rounded">
                                                {category.arabic_name}
                                            </span>
                                        )
                                    )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MetricsSalesofCategory;
