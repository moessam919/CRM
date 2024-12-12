import { BarChart3 } from "lucide-react";
import { selectedCampaign } from "../../../store/Campaigns/type/CampaignType";

interface ISelectedCampaign {
    selectedCampaign: selectedCampaign;
}
const MetricsSalesofSpecificProducts = ({
    selectedCampaign,
}: ISelectedCampaign) => {
    return (
        <>
            {selectedCampaign.metrics.find(
                (m) => m.name === "sales_of_specific_products"
            ) && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">مبيعات منتجات محددة</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {
                            selectedCampaign.metrics.find(
                                (m) => m.name === "sales_of_specific_products"
                            )?.value
                        }
                        <span className="text-sm text-gray-600 mr-1">
                            {selectedCampaign.metrics.find(
                                (m) => m.name === "sales_of_specific_products"
                            )?.type === "integer"
                                ? "ريال"
                                : "%"}
                        </span>
                    </div>
                    <div className="flex items-center justify-around mt-4 bg-white p-2 md:px-4 rounded-md text-center">
                        <div className="">
                            <p className="font-medium">الحالي:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.sales_of_specific_products.current.toLocaleString()}{" "}
                                ريال
                            </span>
                        </div>
                        <div className="border-l-2 border-r-2 p-2 md:px-8 border-gray-300">
                            <p className="font-medium">السابق:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.sales_of_specific_products.previous.toLocaleString()}{" "}
                                ريال
                            </span>
                        </div>
                        <div>
                            <p className="font-medium">الهدف:</p>
                            <span className="text-gray-600 font-bold">
                                {selectedCampaign.analysis.sales_of_specific_products.target.toLocaleString()}{" "}
                                ريال
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center flex-col md:flex-row justify-between mt-2">
                        <div className="mb-2 md:mb-0">
                            <span className="font-medium">التغيير:</span>
                            <span className="text-gray-600 mr-1">
                                {selectedCampaign.analysis.sales_of_specific_products.change.toLocaleString()}{" "}
                                ريال (+
                                {
                                    selectedCampaign.analysis
                                        .sales_of_specific_products
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
                                            .sales_of_specific_products
                                            ?.achievement_percentage || "0"
                                    ) < 50
                                        ? "text-red-500"
                                        : parseFloat(
                                                selectedCampaign.analysis
                                                    .sales_of_specific_products
                                                    ?.achievement_percentage ||
                                                    "0"
                                            ) < 80
                                          ? "text-yellow-500"
                                          : "text-green-500"
                                }`}>
                                {
                                    selectedCampaign.analysis
                                        .sales_of_specific_products
                                        ?.achievement_percentage
                                }
                                %
                            </span>
                        </div>
                    </div>
                    {selectedCampaign.metrics.find(
                        (m) => m.name === "sales_of_specific_products"
                    )?.additional_fields.products && (
                        <div className="mt-4">
                            <div className="text-sm font-medium mb-1">
                                المنتجات:
                            </div>
                            <div className="space-y-2">
                                {selectedCampaign.metrics
                                    .find(
                                        (m) =>
                                            m.name ===
                                            "sales_of_specific_products"
                                    )
                                    ?.additional_fields.products?.map(
                                        (product) => (
                                            <div
                                                key={product.id}
                                                className="bg-white p-2 rounded text-sm">
                                                <div className="font-medium">
                                                    {product.arabic_name}
                                                </div>
                                                <div className="flex justify-between text-gray-600 mt-1">
                                                    <span>
                                                        SKU: {product.sku}
                                                    </span>
                                                    <span>
                                                        السعر:{" "}
                                                        {product.selling_price}{" "}
                                                        ريال
                                                    </span>
                                                </div>
                                            </div>
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

export default MetricsSalesofSpecificProducts;
