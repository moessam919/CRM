import { Users } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
    selectedCampaign: selectedCampaign;
}
const MetricsCustomerRegistration = ({
    selectedCampaign,
}: ISelectedCampaign) => {
    return (
        <>
            {selectedCampaign.metrics.find(
                (m) => m.name === "customer_registration"
            ) && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">تسجيل العملاء</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {
                            selectedCampaign.metrics.find(
                                (m) => m.name === "customer_registration"
                            )?.value
                        }
                        <span className="text-sm text-gray-600 mr-1">
                            {selectedCampaign.metrics.find(
                                (m) => m.name === "customer_registration"
                            )?.type === "integer"
                                ? "مسجل"
                                : "%"}
                        </span>
                    </div>
                    <div className="flex items-center justify-around mt-4 bg-white p-2 md:px-4 rounded-md text-center">
                        <div className="">
                            <p className="font-medium">الحالي:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.customer_registration.current.toLocaleString()}{" "}
                                مسجل
                            </span>
                        </div>
                        <div className="border-l-2 border-r-2 p-2 md:px-8 border-gray-300">
                            <p className="font-medium">السابق:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.customer_registration.previous.toLocaleString()}{" "}
                                مسجل
                            </span>
                        </div>
                        <div>
                            <p className="font-medium">الهدف:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.customer_registration.target.toLocaleString()}{" "}
                                مسجل
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row justify-between mt-2">
                        <div className="mb-2 md:mb-0">
                            <span className="font-medium">التغيير:</span>
                            <span className="text-gray-600 mr-1">
                                {selectedCampaign.analysis.customer_registration.change.toLocaleString()}{" "}
                                مسجل (+
                                {
                                    selectedCampaign.analysis
                                        .customer_registration.percentage_change
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
                                            .customer_registration
                                            ?.achievement_percentage || "0"
                                    ) < 50
                                        ? "text-red-500"
                                        : parseFloat(
                                                selectedCampaign.analysis
                                                    .customer_registration
                                                    ?.achievement_percentage ||
                                                    "0"
                                            ) < 80
                                          ? "text-yellow-500"
                                          : "text-green-500"
                                }`}>
                                {
                                    selectedCampaign.analysis
                                        .customer_registration
                                        ?.achievement_percentage
                                }
                                %
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MetricsCustomerRegistration;
