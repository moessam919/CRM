import { useState } from "react";
import { Plus, Trash, ArrowDown } from "lucide-react";
import MultiSelectProducts from "./MultiSelectProductProps";
import MultiSelectProductCategories from "./MultiSelectProductCategories";
import { ProductCategory } from "../../store/MatricsProducts/ProductCategorySlice";
import { useDispatch } from "react-redux";
import { createCampaign } from "../../store/MatricsProducts/act/CampaignActions";
import { AppDispatch } from "../../store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Metric {
    id: number;
    name: string;
    type: string;
    targetValue: string;
    selectedProducts?: number[];
    isOpen: boolean;
    isOpenType: boolean;
    selectedCategories?: number[];
    isOpenProduct?: boolean;
    isOpenCategory?: boolean;
}

const CreateCampaignModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [campaignName, setCampaignName] = useState("");
    const [campaignDescription, setCampaignDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [metrics, setMetrics] = useState<Metric[]>([
        {
            id: Date.now(),
            name: "",
            type: "integer",
            targetValue: "",
            selectedProducts: [],
            isOpen: false,
            isOpenType: false,
            selectedCategories: [],
            isOpenProduct: false,
            isOpenCategory: false,
        },
    ]);

    const addMetric = () => {
        setMetrics([
            ...metrics,
            {
                id: Date.now(),
                name: "",
                type: "integer",
                targetValue: "",
                selectedProducts: [],
                isOpen: false,
                isOpenType: false,
                selectedCategories: [],
                isOpenProduct: false,
                isOpenCategory: false,
            },
        ]);
    };

    const metricOptions = [
        { value: "total_sales", label: "إجمالي قيمة المبيعات" },
        { value: "sales_of_specific_products", label: "مبيعات منتجات محددة" },
        { value: "sales_of_category", label: "مبيعات الفئة" },
        { value: "customer_registration", label: "تسجيل العملاء" },
        { value: "average_transaction_value", label: "متوسط قيمة المعاملة" },
        { value: "invoices_count", label: "عدد الفواتير" },
        { value: "number_of_products_sold", label: "عدد المنتجات المباعة" },
    ];

    const removeMetric = (id: number) => {
        setMetrics(metrics.filter((metric) => metric.id !== id));
    };

    const updateMetric = <K extends keyof Metric>(
        id: number,
        field: K,
        value: K extends "selectedProducts" ? number[] : Metric[K]
    ) => {
        setMetrics((prevMetrics) =>
            prevMetrics.map((metric) =>
                metric.id === id ? { ...metric, [field]: value } : metric
            )
        );
    };

    const handleTargetValueChange = (
        metricId: number,
        value: string,
        type: string
    ) => {
        // Remove any non-numeric characters except decimal point
        const numericValue = value.replace(/[^\d.]/g, "");

        // For percentage, ensure value is between 0 and 100
        if (type === "percentage") {
            const number = parseFloat(numericValue);
            if (!isNaN(number)) {
                if (number > 100) {
                    updateMetric(metricId, "targetValue", "100");
                    return;
                }
            }
        }

        // Ensure only one decimal point
        const parts = numericValue.split(".");
        if (parts.length > 2) {
            return;
        }

        // Update the value
        updateMetric(metricId, "targetValue", numericValue);
    };

    // periods
    const [periods, setPeriods] = useState<
        { startDate: string; endDate: string }[]
    >([{ startDate: "", endDate: "" }]);

    const isMetricsValid = () => {
        return metrics.every((metric) => {
            // Check if name is selected
            if (!metric.name) return false;

            // Check if target value is provided and valid
            if (!metric.targetValue) return false;

            return true;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Additional validation check
        if (!isMetricsValid()) {
            toast.error("الرجاء ملء اهداف الحملة");
            return;
        }

        // Transform metrics to required format
        const transformedMetrics = metrics.map((metric) => ({
            name: metric.name,
            type: metric.type.toLowerCase(),
            value: metric.targetValue,
            additional_fields: {
                ...(metric.selectedProducts &&
                    metric.selectedProducts.length > 0 && {
                        products: metric.selectedProducts,
                    }),
                ...(metric.selectedCategories &&
                    metric.selectedCategories.length > 0 && {
                        categories: metric.selectedCategories,
                    }),
            },
        }));

        // Transform periods to match the API format
        const transformedPeriods = periods
            .filter((period) => period.startDate && period.endDate)
            .map((period) => ({
                start_date: `${period.startDate} 00:00:00`,
                end_date: `${period.endDate} 23:59:59`,
            }));

        // Prepare the payload
        const payload = {
            name: campaignName,
            description: campaignDescription,
            start_date: `${startDate} 00:00:00`,
            end_date: `${endDate} 23:59:59`,
            metrics: transformedMetrics,
            ...(transformedPeriods.length > 0 && {
                comparison_periods: transformedPeriods,
            }),
        };

        try {
            const result = await dispatch(createCampaign(payload)).unwrap();
            if (result) {
                toast.success("تم اضافة الحملة بنجاح!");
                // Reset all form data
                setCampaignName("");
                setCampaignDescription("");
                setStartDate("");
                setEndDate("");
                setMetrics([
                    {
                        id: Date.now(),
                        name: "",
                        type: "integer",
                        targetValue: "",
                        selectedProducts: [],
                        isOpen: false,
                        isOpenType: false,
                        selectedCategories: [],
                        isOpenProduct: false,
                        isOpenCategory: false,
                    },
                ]);
                setPeriods([{ startDate: "", endDate: "" }]);
                navigate("/campaign");
            }
        } catch (error) {
            console.error("Error creating campaign:", error);
            toast.error(`حدث خطأ في انشاء الحملة: ${error}`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-[795px] rounded-md p-6">
            {/* The modal container */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">إنشاء حملة جديدة</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Campaign Name */}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            اسم الحملة
                        </label>
                        <input
                            type="text"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        />
                    </div>

                    {/* Campaign Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            الوصف
                        </label>
                        <textarea
                            value={campaignDescription}
                            onChange={(e) =>
                                setCampaignDescription(e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                            maxLength={250}
                        />
                        <div className="text-right text-sm text-gray-500">
                            {250 - campaignDescription.length} حرف متبقي
                        </div>
                    </div>
                    {/* Campaign Dates */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">
                                تاريخ البداية
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">
                                تاريخ النهاية
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Metrics Section */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-gray-700 text-xl">
                                اهداف الحملة
                            </label>
                            <button
                                type="button"
                                onClick={addMetric}
                                className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 duration-150 flex items-center gap-1">
                                إضافة هدف
                                <Plus size={20} />
                            </button>
                        </div>
                        {metrics.map((metric) => (
                            <div
                                key={metric.id}
                                className="mt-4 p-4 border rounded-lg bg-gray-50 relative grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="">
                                    <div className="relative">
                                        <label className="block text-gray-700 mb-2">
                                            اسم الهدف
                                        </label>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 w-full justify-between"
                                            onClick={() =>
                                                updateMetric(
                                                    metric.id,
                                                    "isOpen",
                                                    !metric.isOpen
                                                )
                                            }>
                                            <span>
                                                {metric.name
                                                    ? metricOptions.find(
                                                          (option) =>
                                                              option.value ===
                                                              metric.name
                                                      )?.label
                                                    : "اختر اسم الهدف"}
                                            </span>
                                            <ArrowDown
                                                className={`w-4 h-4 transform transition-transform ${
                                                    metric.isOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>
                                        {metric.isOpen && (
                                            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                                {metricOptions.map((option) => (
                                                    <div
                                                        key={option.value}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => {
                                                            updateMetric(
                                                                metric.id,
                                                                "name",
                                                                option.value
                                                            );
                                                            updateMetric(
                                                                metric.id,
                                                                "isOpen",
                                                                false
                                                            );
                                                        }}>
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="hidden">
                                        <label className="block text-gray-700 mb-2">
                                            النوع
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 w-full justify-between"
                                                onClick={() =>
                                                    updateMetric(
                                                        metric.id,
                                                        "isOpenType",
                                                        !metric.isOpenType
                                                    )
                                                }>
                                                <span>
                                                    {metric.type === "integer"
                                                        ? "رقم"
                                                        : "نسبة مئوية"}
                                                </span>
                                                <ArrowDown
                                                    className={`w-4 h-4 transform transition-transform ${
                                                        metric.isOpenType
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </button>
                                            {metric.isOpenType && (
                                                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                                    {[
                                                        {
                                                            value: "integer",
                                                            label: "رقم",
                                                        },
                                                        {
                                                            value: "percentage",
                                                            label: "نسبة مئوية",
                                                        },
                                                    ].map((option) => (
                                                        <div
                                                            key={option.value}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                updateMetric(
                                                                    metric.id,
                                                                    "type",
                                                                    option.value
                                                                );
                                                                updateMetric(
                                                                    metric.id,
                                                                    "isOpenType",
                                                                    false
                                                                );
                                                            }}>
                                                            {option.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 mb-2">
                                            الهدف
                                        </label>
                                        <input
                                            type="text"
                                            value={metric.targetValue}
                                            onChange={(e) =>
                                                handleTargetValueChange(
                                                    metric.id,
                                                    e.target.value,
                                                    metric.type
                                                )
                                            }
                                            step={
                                                metric.type === "percentage"
                                                    ? "0.01"
                                                    : "1"
                                            }
                                            min="0"
                                            max={
                                                metric.type === "percentage"
                                                    ? "100"
                                                    : undefined
                                            }
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center absolute left-4 top-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeMetric(metric.id)
                                            }
                                            className=" text-gray-600 hover:text-red-800">
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Conditionally Render Product or Category Select */}
                                {metric.name ===
                                    "sales_of_specific_products" && (
                                    <div className="mb-4 col-span-2">
                                        <label className="block text-gray-700 mb-2">
                                            اختر المنتج
                                        </label>
                                        <MultiSelectProducts
                                            onProductsSelect={(
                                                selectedProducts
                                            ) => {
                                                // Update the metric with the selected product IDs
                                                const productIds =
                                                    selectedProducts.map(
                                                        (product) => product.id
                                                    );
                                                updateMetric(
                                                    metric.id,
                                                    "selectedProducts",
                                                    productIds
                                                );
                                            }}
                                        />
                                    </div>
                                )}

                                {metric.name === "sales_of_category" && (
                                    <div className="mb-4 col-span-2">
                                        <label className="block text-gray-700 mb-2">
                                            اختر الفئة
                                        </label>
                                        <MultiSelectProductCategories
                                            onCategoriesSelect={(
                                                categories: ProductCategory[]
                                            ) => {
                                                updateMetric(
                                                    metric.id,
                                                    "selectedCategories",
                                                    categories.map(
                                                        (cat) => cat.id
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* data  */}

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="px-6 py-2 border hover:text-white rounded-md hover:bg-gray-600 duration-150">
                            إنشاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaignModal;
