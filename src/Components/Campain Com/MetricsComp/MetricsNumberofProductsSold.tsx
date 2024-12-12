import { Package2 } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
    selectedCampaign: selectedCampaign;
}
const MetricsNumberofProductsSold = ({
    selectedCampaign,
}: ISelectedCampaign) => {
    return (
        <>
            {selectedCampaign.metrics.find(
                (m) => m.name === "number_of_products_sold"
            ) && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <Package2 className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">
                            عدد المنتجات المباعة
                        </span>
                    </div>
                    <div className="text-2xl font-bold">
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "number_of_products_sold"
                        )?.value || 0}
                        <span className="text-sm text-gray-600 mr-1">
                            {selectedCampaign.metrics.find(
                                (m) => m.name === "number_of_products_sold"
                            )?.type === "integer"
                                ? "ريال"
                                : "%"}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default MetricsNumberofProductsSold;
