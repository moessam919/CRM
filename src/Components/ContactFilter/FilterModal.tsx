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
        name: initialFilters.name || "",
        email: initialFilters.email || "",
        phone: initialFilters.phone || "",
        address: initialFilters.address || "",
        customer_type: initialFilters.customer_type || "",
        min_sales_value: initialFilters.min_sales_value || undefined,
        max_sales_value: initialFilters.max_sales_value || undefined,
        min_sales_count: initialFilters.min_sales_count || undefined,
        max_sales_count: initialFilters.max_sales_count || undefined,
        created_at_after: initialFilters.created_at_after || "",
        created_at_before: initialFilters.created_at_before || "",
        last_invoice_date: initialFilters.last_invoice_date || "",
        no_purchases: initialFilters.no_purchases || false,
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
        setFilters({
            name: "",
            email: "",
            phone: "",
            address: "",
            customer_type: "",
            min_sales_value: undefined,
            max_sales_value: undefined,
            min_sales_count: undefined,
            max_sales_count: undefined,
            created_at_after: "",
            created_at_before: "",
            last_invoice_date: "",
            no_purchases: false,
        });
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
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-700">
                        Filter Customers
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Search by name"
                            value={filters.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Search by email"
                            value={filters.email || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Search by phone number"
                            value={filters.phone || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Type
                        </label>
                        <select
                            name="customer_type"
                            value={filters.customer_type || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                        >
                            <option value="">All Types</option>
                            <option value="b2b">B2B</option>
                            <option value="b2c">B2C</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Min Sales Value
                            </label>
                            <input
                                type="number"
                                name="min_sales_value"
                                placeholder="Minimum sales"
                                value={filters.min_sales_value || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Sales Value
                            </label>
                            <input
                                type="number"
                                name="max_sales_value"
                                placeholder="Maximum sales"
                                value={filters.max_sales_value || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created After
                            </label>
                            <input
                                type="date"
                                name="created_at_after"
                                value={filters.created_at_after || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created Before
                            </label>
                            <input
                                type="date"
                                name="created_at_before"
                                value={filters.created_at_before || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="no_purchases"
                                checked={filters.no_purchases || false}
                                onChange={handleInputChange}
                                className="mr-2 rounded text-green-600 focus:ring-green-300"
                            />
                            <span className="text-sm text-gray-700">
                                Customers with No Purchases
                            </span>
                        </label>
                    </div>

                    <div className="flex justify-between space-x-4 pt-4">
                        <button
                            onClick={resetFilters}
                            className="flex-1 p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Reset Filters
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
