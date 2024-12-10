import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actgetCampaignById } from "../../store/Campaigns/act/CampaignActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    Calendar,
    BarChart,
    LineChart,
    PieChart,
    TrendingUp,
    ArrowLeft,
    Package2,
    FileText,
    DollarSign,
    Users,
    Boxes,
    BarChart3,
    Activity,
} from "lucide-react";
import CampaignsChart from "./CampaignsChart";

const CampaignInfo = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { selectedCampaign, loading } = useAppSelector(
        (state) => state.campaigns
    );
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            dispatch(actgetCampaignById(Number(id)));
        }
    }, [dispatch, id]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading === "pending") {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid border-opacity-50"></div>
            </div>
        );
    }

    if (!selectedCampaign) return null;

    return (
        <div className="p-6 space-y-6 bg-gray-200 rounded-md">
            {/* Campaign Header */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col items-center md:items-start">
                        <h1 className="text-2xl font-bold">
                            {selectedCampaign.name}
                        </h1>

                        <p>{selectedCampaign?.description}</p>
                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {formatDate(selectedCampaign.start_date)} -{" "}
                                {formatDate(selectedCampaign.end_date)}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>
                                معدل النجاح:{" "}
                                {selectedCampaign.average_success_rate}%
                            </span>
                        </div>
                    </div>

                    {/* <div className="flex  ">
                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                            <Clock className="w-4 h-4" />
                            <span>
                                {formatDate(selectedCampaign.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <User className="w-4 h-4" />
                            <span>
                                تم إنشاؤها بواسطة: {selectedCampaign.created_by}
                            </span>
                        </div>
                    </div> */}
                    <div className="flex flex-col items-center md:items-end gap-2 mt-5 md:mt-0">
                        <div
                            className="flex justify-end items-center gap-2 md:mb-6 text-gray-600 cursor-pointer"
                            onClick={() => navigate("/campaign")}>
                            <span className="">العودة إلى الحملات</span>
                            <ArrowLeft className="h-5 w-5" />
                        </div>
                        <span
                            className={`px-3 py-1 rounded-md ${
                                selectedCampaign.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}>
                            {selectedCampaign.status === "active"
                                ? "نشط"
                                : "غير نشط"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {/* Metrics Cards */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        مقاييس الحملة
                    </h2>
                    <div className="space-y-4 min-h-[200px] max-h-[250px] overflow-auto">
                        {/* Number of Products Sold */}
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
                                        (m) =>
                                            m.name === "number_of_products_sold"
                                    )?.value || 0}
                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) =>
                                                m.name ===
                                                "number_of_products_sold"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Invoices Count */}
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "invoices_count"
                        ) && (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium">
                                        عدد الفواتير
                                    </span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {selectedCampaign.metrics.find(
                                        (m) => m.name === "invoices_count"
                                    )?.value || 0}

                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) => m.name === "invoices_count"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Average Transaction Value */}
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "average_transaction_value"
                        ) && (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <DollarSign className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium">
                                        متوسط قيمة المعاملة
                                    </span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {selectedCampaign.metrics.find(
                                        (m) =>
                                            m.name ===
                                            "average_transaction_value"
                                    )?.value || 0}
                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) =>
                                                m.name ===
                                                "average_transaction_value"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Customer Registration */}
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "customer_registration"
                        ) && (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span className="font-medium">
                                        تسجيل العملاء
                                    </span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {selectedCampaign.metrics.find(
                                        (m) =>
                                            m.name === "customer_registration"
                                    )?.value || 0}
                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) =>
                                                m.name ===
                                                "customer_registration"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Sales of Category */}
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "sales_of_category"
                        ) && (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Boxes className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium">
                                        مبيعات الفئة
                                    </span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {selectedCampaign.metrics.find(
                                        (m) => m.name === "sales_of_category"
                                    )?.value || 0}
                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) =>
                                                m.name === "sales_of_category"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                                {selectedCampaign.metrics.find(
                                    (m) => m.name === "sales_of_category"
                                )?.additional_fields.categories && (
                                    <div className="mt-2">
                                        <div className="text-sm font-medium mb-1">
                                            الفئات:
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {selectedCampaign.metrics
                                                .find(
                                                    (m) =>
                                                        m.name ===
                                                        "sales_of_category"
                                                )
                                                ?.additional_fields.categories?.map(
                                                    (category) => (
                                                        <span
                                                            key={category.id}
                                                            className="text-sm bg-white px-2 py-1 rounded">
                                                            {
                                                                category.arabic_name
                                                            }
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sales of Specific Products */}
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "sales_of_specific_products"
                        ) && (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <BarChart3 className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium">
                                        مبيعات منتجات محددة
                                    </span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {selectedCampaign.metrics.find(
                                        (m) =>
                                            m.name ===
                                            "sales_of_specific_products"
                                    )?.value || 0}

                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) =>
                                                m.name ===
                                                "sales_of_specific_products"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                                {selectedCampaign.metrics.find(
                                    (m) =>
                                        m.name === "sales_of_specific_products"
                                )?.additional_fields.products && (
                                    <div className="mt-2">
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
                                                                {
                                                                    product.arabic_name
                                                                }
                                                            </div>
                                                            <div className="flex justify-between text-gray-600 mt-1">
                                                                <span>
                                                                    SKU:{" "}
                                                                    {
                                                                        product.sku
                                                                    }
                                                                </span>
                                                                <span>
                                                                    السعر: $
                                                                    {
                                                                        product.selling_price
                                                                    }
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

                        {/* Total Sales Value */}
                        {selectedCampaign.metrics.find(
                            (m) => m.name === "total_sales_value"
                        ) && (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium">
                                        إجمالي قيمة المبيعات
                                    </span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {selectedCampaign.metrics.find(
                                        (m) => m.name === "total_sales_value"
                                    )?.value || 0}
                                    <span className="text-sm text-gray-600 mr-1">
                                        {selectedCampaign.metrics.find(
                                            (m) =>
                                                m.name === "total_sales_value"
                                        )?.type === "integer"
                                            ? "ريال"
                                            : "%"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Total Sales */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-4">تحليلات الحملة</h1>
                    <div className="overflow-auto min-h-[200px] max-h-[250px]  space-y-4">
                        {/* Total Sales */}
                        {selectedCampaign.analysis.total_sales && (
                            <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                                <div className="flex items-center gap-2 text-gray-600 mb-2 font-bold">
                                    <BarChart className="w-4 h-4" />
                                    <span>إجمالي المبيعات</span>
                                </div>
                                <div className="text-2xl font-bold">
                                    $
                                    {
                                        selectedCampaign.analysis.total_sales
                                            ?.current
                                    }
                                </div>
                                <div className="text-green-500 text-sm">
                                    ↑{" "}
                                    {
                                        selectedCampaign.analysis.total_sales
                                            ?.percentage_change
                                    }
                                    % نسبة الإنجاز
                                </div>
                            </div>
                        )}

                        {/* Category Sales */}
                        {selectedCampaign.analysis.sales_of_category && (
                            <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                                <div className="flex items-center gap-2 text-gray-600 mb-2 font-bold">
                                    <PieChart className="w-4 h-4" />
                                    <span>مبيعات الفئة</span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {
                                        selectedCampaign.analysis
                                            .sales_of_category
                                            ?.percentage_change
                                    }
                                    %
                                </div>
                                <div className="text-green-500 text-sm">
                                    ↑{" "}
                                    {
                                        selectedCampaign.analysis
                                            .sales_of_category
                                            ?.percentage_change
                                    }
                                    % نسبة الإنجاز
                                </div>
                            </div>
                        )}

                        {/* Product Sales */}
                        {selectedCampaign.analysis
                            .sales_of_specific_products && (
                            <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                                <div className="flex items-center gap-2 text-gray-600 mb-2 font-bold">
                                    <LineChart className="w-4 h-4" />
                                    <span>مبيعات المنتجات</span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {
                                        selectedCampaign.analysis
                                            .sales_of_specific_products?.current
                                    }
                                </div>
                                <div className="text-green-500 text-sm">
                                    ↑{" "}
                                    {
                                        selectedCampaign.analysis
                                            .sales_of_specific_products
                                            ?.percentage_change
                                    }
                                    % نسبة الإنجاز
                                </div>
                            </div>
                        )}

                        {/* Total Sales */}
                        {selectedCampaign.analysis.customer_registration && (
                            <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                                <div className="flex items-center gap-2 text-gray-600 mb-2 font-bold">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span>تسجيل العملاء</span>
                                </div>
                                <div className="text-2xl font-bold">
                                    {
                                        selectedCampaign.analysis
                                            .customer_registration?.current
                                    }
                                </div>
                                <div className="text-green-500 text-sm">
                                    ↑{" "}
                                    {
                                        selectedCampaign.analysis
                                            .customer_registration
                                            ?.percentage_change
                                    }
                                    % نسبة الإنجاز
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* comparison periods_ nalysis */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-4">مقارنات الفترات</h1>
                    <div className="overflow-auto min-h-[400px] max-h-[400px] space-y-4">
                        {selectedCampaign.comparison_periods_analysis.map(
                            (period, index) => (
                                <div key={index} className=" p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2 font-bold">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>{period.period_name}</span>
                                    </div>

                                    {/* Customer Registration Comparison */}
                                    {period.comparison
                                        .customer_registration && (
                                        <div className="mb-2 bg-gray-100 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    عدد العملاء السابق
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .customer_registration
                                                            .previous
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    عدد العملاء احالي
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .customer_registration
                                                            .current
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">
                                                    نسبة التغيير
                                                </span>
                                                <span
                                                    className={`font-medium ${parseFloat(period.comparison.customer_registration.percentage_change) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {
                                                        period.comparison
                                                            .customer_registration
                                                            .achievement_percentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Sales of Category Comparison */}
                                    {period.comparison.sales_of_category && (
                                        <div className="mb-2 bg-gray-100 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    مبيعات الفئة السابقة
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .sales_of_category
                                                            .previous
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    مبيعات الفئة الحالية
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .sales_of_category
                                                            .current
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">
                                                    نسبة التغيير
                                                </span>
                                                <span
                                                    className={`font-medium ${parseFloat(period.comparison.sales_of_category.achievement_percentage) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {
                                                        period.comparison
                                                            .sales_of_category
                                                            .achievement_percentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Sales of Specific Products Comparison */}
                                    {period.comparison
                                        .sales_of_specific_products && (
                                        <div className="mb-2 bg-gray-100 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    مبيعات المنتجات السابقة
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .sales_of_specific_products
                                                            .previous
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    مبيعات المنتجات الحالية
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .sales_of_specific_products
                                                            .current
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">
                                                    نسبة التغيير
                                                </span>
                                                <span
                                                    className={`font-medium ${parseFloat(period.comparison.sales_of_specific_products.achievement_percentage) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {
                                                        period.comparison
                                                            .sales_of_specific_products
                                                            .achievement_percentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Total Sales Comparison */}
                                    {period.comparison.total_sales && (
                                        <div className="mb-2 bg-gray-100 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    المبيعات السابقة
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .total_sales
                                                            .previous
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    المبيعات الحالية
                                                </span>
                                                <div className="text-sm font-medium">
                                                    {
                                                        period.comparison
                                                            .total_sales.current
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">
                                                    نسبة التغيير
                                                </span>
                                                <span
                                                    className={`font-medium ${parseFloat(period.comparison.total_sales.achievement_percentage) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {
                                                        period.comparison
                                                            .total_sales
                                                            .achievement_percentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div>
                    <CampaignsChart id={id} />
                </div>
            </div>
            {/* Period Comparisons */}
        </div>
    );
};

export default CampaignInfo;
