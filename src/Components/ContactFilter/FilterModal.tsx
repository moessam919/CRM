import React, { useState } from "react";
import { X } from "lucide-react";
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
        customer_type: initialFilters.customer_type || "",
        min_sales_value: initialFilters.min_sales_value || undefined,
        max_sales_value: initialFilters.max_sales_value || undefined,
        min_sales_count: initialFilters.min_sales_count || undefined,
        max_sales_count: initialFilters.max_sales_count || undefined,
        created_at_after: initialFilters.created_at_after || "",
        created_at_before: initialFilters.created_at_before || "",
        last_invoice_date: initialFilters.last_invoice_date || "",
        no_purchases: initialFilters.no_purchases || false,
        no_purchases_last_month:
            initialFilters.no_purchases_last_month || false,
        address: initialFilters.address || "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value === ""
                      ? undefined
                      : value,
        }));
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
            no_purchases: false,
            no_purchases_last_month: false,
            address: "",
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
            <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl">
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

                    {/* No Purchases last month */}
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="no_purchases_last_month"
                                checked={
                                    filters.no_purchases_last_month || false
                                }
                                onChange={handleInputChange}
                                className="ml-2 rounded focus:outline-none"
                            />
                            <span className="text-sm text-gray-700">
                                العملاء الذين لم يشتروا خلال هذا الشهر
                            </span>
                        </label>
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

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 ">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 border hover:bg-gray-300 rounded-md duration-150"
                        >
                            إعادة ضبط التصفية
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 border hover:bg-gray-500 hover:text-white rounded-md duration-150"
                        >
                            تطبيق التصفية
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
