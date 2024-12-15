import { BarChart3  , ArrowUp , ArrowDown} from "lucide-react";
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
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <p className="text-xl font-semibold">المستهدف : </p>
                            <p className="text-2xl font-bold">
                                {selectedCampaign.metrics.find((m) => m.name === "sales_of_specific_products")?.value.toLocaleString()}
                                <span className="text-sm text-gray-600 mr-1">
                                    {selectedCampaign.metrics.find((m) => m.name === "sales_of_specific_products")?.type === "integer" ? "ريال" : "%"}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className={`mr-1 text-3xl font-bold ${
                                parseFloat(selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage || "0") < 50
                                    ? "text-red-500"
                                    : parseFloat(selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage || "0") < 80
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}>
                                {selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage}%
                            </span>
                            <div className="relative w-full h-1 mt-1 bg-gray-200">
                                <div className={`absolute top-0 left-0 h-full animate-pulse ${
                                    parseFloat(selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage || "0") < 50
                                        ? "bg-red-200"
                                        : parseFloat(selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage || "0") < 80
                                        ? "bg-yellow-200"
                                        : "bg-green-200"
                                    }`} style={{ width: `${selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage}%` , maxWidth:"100%" }}></div>
                                <div className={`absolute top-0 left-0 h-full ${
                                    parseFloat(selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage || "0") < 50
                                        ? "bg-red-500"
                                        : parseFloat(selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage || "0") < 80
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`} style={{ width: `${selectedCampaign.analysis.sales_of_specific_products?.achievement_percentage}%` , maxWidth:"100%" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex  justify-between mt-4 bg-white p-2 md:p-4 rounded-md">
                        <div className="flex flex-col">
                            <div className="p-2 md:px-8">
                                <p className="font-medium">الفترة السابقة:</p>
                                <span className="text-gray-600 font-bold text-xl">
                                    {selectedCampaign.analysis.sales_of_specific_products.previous.toLocaleString()}{" "}
                                    ريال
                                </span>
                            </div>
                            <div className="p-2 md:px-8">
                                <p className="font-medium">الفترة الحالية:</p>
                                <span className="text-gray-600 font-bold text-xl">
                                    {selectedCampaign.analysis.sales_of_specific_products.current.toLocaleString()}{" "}
                                    ريال
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className={`flex items-center ${
                                parseFloat(selectedCampaign.analysis.sales_of_specific_products.change) > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}>
                                {parseFloat(selectedCampaign.analysis.sales_of_specific_products.change) > 0 ? (
                                    <ArrowUp className="w-5 h-5 ml-1" />
                                ) : (
                                    <ArrowDown className="w-5 h-5 ml-1" />
                                )}
                                <span className="text-xl font-semibold">
                                    {parseFloat(selectedCampaign.analysis.sales_of_specific_products.change).toLocaleString()}{" "}
                                    ريال  ( {selectedCampaign.analysis.sales_of_specific_products.percentage_change} % )
                                </span>
                            </div>
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
