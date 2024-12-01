import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { CustomerFilters } from "../../types/customers";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (filters: CustomerFilters) => void;
    initialFilters?: CustomerFilters;
}

const FilterModal: React.FC<FilterModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialFilters = {},
}) => {
    const [filters, setFilters] = useState<CustomerFilters>({
        address: initialFilters.address || "",
        customer_type: initialFilters.customer_type || "",
        min_sales_value: initialFilters.min_sales_value || undefined,
        max_sales_value: initialFilters.max_sales_value || undefined,
        min_sales_count: initialFilters.min_sales_count || undefined,
        max_sales_count: initialFilters.max_sales_count || undefined,
        created_at_after: initialFilters.created_at_after || "",
        created_at_before: initialFilters.created_at_before || "",
        last_invoice_date: initialFilters.last_invoice_date || "",
        no_purchases: initialFilters.no_purchases,
        no_purchases_1_month: initialFilters.no_purchases_1_month,
        no_purchases_2_month: initialFilters.no_purchases_2_month,
        no_purchases_3_month: initialFilters.no_purchases_3_month,
        purchases_within_period_after:
            initialFilters.purchases_within_period_after || "",
        purchases_within_period_before:
            initialFilters.purchases_within_period_before || "",
        min_purchase_value_within_period:
            initialFilters.min_purchase_value_within_period || undefined,
        max_purchase_value_within_period:
            initialFilters.max_purchase_value_within_period || undefined,
        min_invoice_count_within_period:
            initialFilters.min_invoice_count_within_period || undefined,
        max_invoice_count_within_period:
            initialFilters.max_invoice_count_within_period || undefined,
    });
    console.log(filters);
    
    
    const [timeModalOpen, setTimeMoldalOpen] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;

        setFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [name]: type === "checkbox" ? checked : value,
            };

            // Conditional clearing inputs
            if (
                name === "purchases_within_period_after" ||
                name === "purchases_within_period_before" ||
                name === "min_purchase_value_within_period" ||
                name === "max_purchase_value_within_period" ||
                name === "min_invoice_count_within_period" ||
                name === "max_invoice_count_within_period" ||
                name === "no_purchases_1_month" ||
                name === "no_purchases_2_month" ||
                name === "no_purchases_3_month"
            ) {
                updatedFilters.min_sales_value = undefined;
                updatedFilters.max_sales_value = undefined;
                updatedFilters.min_sales_count = undefined;
                updatedFilters.max_sales_count = undefined;
            }

            return updatedFilters;
        });
    };

    const resetFilters = () => {
        const defaultFilters = {
            customer_type: "",
            min_sales_value: undefined,
            max_sales_value: undefined,
            min_sales_count: undefined,
            max_sales_count: undefined,
            created_at_after: "",
            created_at_before: "",
            last_invoice_date: "",
            address: "",
            purchases_within_period_after: "",
            purchases_within_period_before: "",
            min_purchase_value_within_period: undefined,
            max_purchase_value_within_period: undefined,
            min_invoice_count_within_period: undefined,
            max_invoice_count_within_period: undefined,
        };
        onSubmit(defaultFilters);
        onClose();
    };

    const handleSubmit = () => {
        const cleanedFilters: CustomerFilters = Object.fromEntries(
            Object.entries(filters).filter(
                ([, v]) => v !== undefined && v !== ""
            )
        );
        onSubmit(cleanedFilters);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-700">
                        تصفية العملاء
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {/* Customer Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نوع العميل
                        </label>
                        <select
                            name="customer_type"
                            value={filters.customer_type || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        >
                            <option value="">جميع الأنواع</option>
                            <option value="b2b">شركات</option>
                            <option value="b2c">أفراد</option>
                        </select>
                    </div>

                    {/* address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            عنوان العميل
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="أدخل عنوان العميل"
                            value={filters.address || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        />
                    </div>

                    {/* Sales Value */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الحد الأدنى لقيمة المشتريات
                            </label>
                            <input
                                type="number"
                                name="min_sales_value"
                                placeholder="الحد الأدنى"
                                value={filters.min_sales_value || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الحد الأقصى لقيمة المشتريات
                            </label>
                            <input
                                type="number"
                                name="max_sales_value"
                                placeholder="الحد الأقصى"
                                value={filters.max_sales_value || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            />
                        </div>
                    </div>

                    {/* Sales Count */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الحد الأدنى لعدد عمليات الشراء
                            </label>
                            <input
                                type="number"
                                name="min_sales_count"
                                placeholder="الحد الأدنى"
                                value={filters.min_sales_count || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                الحد الأقصى لعدد عمليات الشراء
                            </label>
                            <input
                                type="number"
                                name="max_sales_count"
                                placeholder="الحد الأقصى"
                                value={filters.max_sales_count || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                تاريخ اضافة العميل من
                            </label>
                            <input
                                type="date"
                                name="created_at_after"
                                value={filters.created_at_after || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                تاريخ اضافة العميل إلى
                            </label>
                            <input
                                type="date"
                                name="created_at_before"
                                value={filters.created_at_before || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                            />
                        </div>
                    </div>

                    {/* Last Invoice Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تاريخ آخر عملية شراء
                        </label>
                        <input
                            type="date"
                            name="last_invoice_date"
                            value={filters.last_invoice_date || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                        />
                    </div>

                    {/* No Purchases */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="no_purchases"
                                checked={filters.no_purchases || false}
                                onChange={handleInputChange}
                                className="ml-2 rounded focus:outline-none"
                            />
                            <span className="text-sm text-gray-700">
                                العملاء الذين لم يشتروا
                            </span>
                        </label>
                    </div>

                    <div>
                        <div
                            className="flex items-center gap-2 cursor-pointer w-fit font-bold text-gray-500 mb-4"
                            onClick={() => setTimeMoldalOpen(!timeModalOpen)}
                        >
                            <h2 className="text-xl">تصفية عن طريق مدة معينة</h2>
                            <ChevronDown
                                size={25}
                                className={
                                    timeModalOpen
                                        ? "rotate-180 duration-200"
                                        : ""
                                }
                            />
                        </div>

                        {timeModalOpen && (
                            <div className="flex flex-col gap-4">
                                {/* Purchases Within Period */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            تاريخ بدء الشراء
                                        </label>
                                        <input
                                            type="date"
                                            name="purchases_within_period_after"
                                            value={
                                                filters.purchases_within_period_after ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            تاريخ انتهاء الشراء
                                        </label>
                                        <input
                                            type="date"
                                            name="purchases_within_period_before"
                                            value={
                                                filters.purchases_within_period_before ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                                        />
                                    </div>
                                </div>

                                {/* Purchase Value Within Period */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            الحد الأدنى لقيمة المشتريات خلال
                                            الفترة
                                        </label>
                                        <input
                                            type="number"
                                            name="min_purchase_value_within_period"
                                            value={
                                                filters.min_purchase_value_within_period ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            الحد الأقصى لقيمة المشتريات خلال
                                            الفترة
                                        </label>
                                        <input
                                            type="number"
                                            name="max_purchase_value_within_period"
                                            value={
                                                filters.max_purchase_value_within_period ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                                        />
                                    </div>
                                </div>

                                {/* Invoice Count Within Period */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            الحد الأدنى لعدد الفواتير خلال
                                            الفترة
                                        </label>
                                        <input
                                            type="number"
                                            name="min_invoice_count_within_period"
                                            value={
                                                filters.min_invoice_count_within_period ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            الحد الأقصى لعدد الفواتير خلال
                                            الفترة
                                        </label>
                                        <input
                                            type="number"
                                            name="max_invoice_count_within_period"
                                            value={
                                                filters.max_invoice_count_within_period ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 duration-100"
                                        />
                                    </div>
                                </div>

                                {/* No Purchases for 1 Month */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="no_purchases_1_month"
                                            checked={
                                                filters.no_purchases_1_month ||
                                                false
                                            }
                                            onChange={handleInputChange}
                                            className="ml-2 rounded focus:outline-none"
                                        />
                                        <span className="text-sm text-gray-700">
                                            العملاء الذين لم يشتروا منذ شهر
                                        </span>
                                    </label>
                                </div>

                                {/* No Purchases for 2 Month */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="no_purchases_2_month"
                                            checked={
                                                filters.no_purchases_2_month ||
                                                false
                                            }
                                            onChange={handleInputChange}
                                            className="ml-2 rounded focus:outline-none"
                                        />
                                        <span className="text-sm text-gray-700">
                                            العملاء الذين لم يشتروا منذ شهرين
                                        </span>
                                    </label>
                                </div>

                                {/* No Purchases for 3 Month */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="no_purchases_3_month"
                                            checked={
                                                filters.no_purchases_3_month ||
                                                false
                                            }
                                            onChange={handleInputChange}
                                            className="ml-2 rounded focus:outline-none"
                                        />
                                        <span className="text-sm text-gray-700">
                                            العملاء الذين لم يشتروا منذ ثلاث
                                            اشهر
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 ">
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 border hover:bg-gray-500 hover:text-white rounded-md duration-150"
                        >
                            تطبيق التصفية
                        </button>
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 border hover:bg-gray-300 rounded-md duration-150"
                        >
                            إعادة ضبط التصفية
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
