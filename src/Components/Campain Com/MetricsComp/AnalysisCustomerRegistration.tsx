import { Users } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
    selectedCampaign: selectedCampaign;
}
const AnalysisCustomerRegistration = ({
    selectedCampaign,
}: ISelectedCampaign) => {
    return (
        <>
            {selectedCampaign?.analysis?.customer_registration && (
                <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 text-gray-600 mb-4 font-bold">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span>تسجيل العملاء</span>
                    </div>
                    <div className="text-xl font-bold mb-1">
                        <span className="text-gray-600">المستهدف: </span>
                        {
                            selectedCampaign.analysis.customer_registration
                                ?.target
                        }{" "}
                        تسجيل
                    </div>
                    <div className="text-xl text-gray-600 font-bold">
                        <span>نسبة التحقيق :</span>{" "}
                        <span
                            className={` ${
                                parseFloat(
                                    selectedCampaign.analysis
                                        .customer_registration
                                        ?.achievement_percentage || "0"
                                ) < 50
                                    ? "text-red-500"
                                    : parseFloat(
                                            selectedCampaign.analysis
                                                .customer_registration
                                                ?.achievement_percentage || "0"
                                        ) < 80
                                      ? "text-yellow-500"
                                      : "text-green-500"
                            }`}>
                            {
                                selectedCampaign.analysis.customer_registration
                                    ?.achievement_percentage
                            }
                            %
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnalysisCustomerRegistration;
