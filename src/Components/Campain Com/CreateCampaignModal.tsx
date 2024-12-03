import { useState } from "react";
import { Plus, Trash, ArrowDown } from "lucide-react";

interface Metric {
    id: number;
    name: string;
    type: string;
    targetValue: string;
    isOpen: boolean;
}

interface CreateCampaignModalProps {
    onClose: () => void;
}

const CreateCampaignModal = ({ onClose }: CreateCampaignModalProps) => {
    const [metrics, setMetrics] = useState<Metric[]>([
        {
            id: Date.now(),
            name: "",
            type: "Integer",
            targetValue: "",
            isOpen: false,
        },
    ]);

    const addMetric = () => {
        setMetrics([
            ...metrics,
            {
                id: Date.now(),
                name: "",
                type: "Integer",
                targetValue: "",
                isOpen: false,
            },
        ]);
    };

    const metricOptions = [
        { value: "total_sales_value", label: "إجمالي قيمة المبيعات" },
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
        value: Metric[K]
    ) => {
        setMetrics(
            metrics.map((metric) =>
                metric.id === id ? { ...metric, [field]: value } : metric
            )
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* The modal container */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">إنشاء حملة جديدة</h2>
                    {/* Close button */}
                    <button
                        className="text-gray-60 hover:text-red-600 duration-150"
                        onClick={onClose}>
                        ✕
                    </button>
                </div>

                <form>
                    {/* Campaign Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            اسم الحملة
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Campaign Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            الوصف
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            rows={4}></textarea>
                    </div>

                    {/* Start and End Dates */}
                    <div className="mb-6 flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">
                                تاريخ البداية
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">
                                تاريخ النهاية
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                                className="mt-4 p-4 border rounded-lg bg-gray-50 relative">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-gray-700 mb-2">
                                            اسم الهدف
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeMetric(metric.id)
                                            }
                                            className=" text-gray-600 hover:text-red-800">
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                    {/* Replace select with custom dropdown */}
                                    <div className="relative">
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
                                    <div className="flex-1">
                                        <label className="block text-gray-700 mb-2">
                                            النوع
                                        </label>
                                        <select
                                            value={metric.type}
                                            onChange={(e) =>
                                                updateMetric(
                                                    metric.id,
                                                    "type",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                                            <option value="Integer">رقم</option>
                                            <option value="Decimal">
                                                نسبة مئوية
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 mb-2">
                                            الهدف
                                        </label>
                                        <input
                                            type="text"
                                            value={metric.targetValue}
                                            onChange={(e) =>
                                                updateMetric(
                                                    metric.id,
                                                    "targetValue",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 border rounded-md hover:bg-gray-400"
                            onClick={onClose}>
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border hover:text-white rounded-md hover:bg-gray-600 duration-150">
                            إنشاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaignModal;
