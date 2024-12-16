import { SalesReport } from "../../../store/Campaigns/type/CampaignType";

interface TopSellingProductsProps {
    salesReport: SalesReport | null;
}

const TopSellingProducts = ({ salesReport }: TopSellingProductsProps) => {
    if (!salesReport || !salesReport.sales_performance.top_selling_products) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">لا توجد بيانات متاحة</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                    المنتجات الأكثر مبيعاً
                </h2>
            </div>
            <ul className="space-y-3">
                {salesReport.sales_performance.top_selling_products.map(
                    (product, index) => (
                        <li
                            key={index}
                            className="flex flex-col md:flex-row justify-between items-center 
                                       bg-white border border-gray-100 
                                       rounded-lg px-4 py-3 
                                       transition-all duration-200 
                                       hover:shadow-sm hover:border-gray-200">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <span className="text-gray-500 font-medium">
                                    {index + 1}.
                                </span>
                                <span className="text-gray-800 font-semibold">
                                    {product.product__arabic_name}
                                </span>
                            </div>
                            <span className="text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-md">
                                {product.total_quantity} قطعة
                            </span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default TopSellingProducts;
