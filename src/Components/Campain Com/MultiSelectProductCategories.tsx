import React, { useEffect, useState, useCallback } from "react";
import { ArrowDown, X } from "lucide-react";
import {
    addSelectedCategory,
    removeSelectedCategory,
    ProductCategory,
} from "../../store/MatricsProducts/ProductCategorySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actGetProductCategories } from "../../store/MatricsProducts/act/actGetProductCategories";

interface Props {
    onCategoriesSelect?: (categories: ProductCategory[]) => void;
}

const MultiSelectProductCategories: React.FC<Props> = ({
    onCategoriesSelect,
}) => {
    const dispatch = useAppDispatch();
    const { categories, selectedCategories, loading, error } = useAppSelector(
        (state) => state.productCategories
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(actGetProductCategories());
    }, [dispatch]);

    const handleSelect = useCallback(
        (category: ProductCategory) => {
            dispatch(addSelectedCategory(category));
            onCategoriesSelect?.([...selectedCategories, category]);
            setIsOpen(false);
        },
        [dispatch, onCategoriesSelect, selectedCategories]
    );

    const handleRemove = useCallback(
        (id: number) => {
            dispatch(removeSelectedCategory(id));
            const updated = selectedCategories.filter((cat) => cat.id !== id);
            onCategoriesSelect?.(updated);
        },
        [dispatch, onCategoriesSelect, selectedCategories]
    );

    const availableCategories = categories.filter(
        (cat) => !selectedCategories.some((selected) => selected.id === cat.id)
    );

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategories.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm">
                        {cat.arabic_name}
                        <button
                            onClick={() => handleRemove(cat.id)}
                            className="ml-2 text-red-500 hover:text-red-700">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center gap-2 justify-between w-full px-4 py-2 text-right border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <span>اختر الفئات</span>
                    <ArrowDown className={`w-4 h-4 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {loading === "pending" ? (
                            <div className="px-4 py-2 text-gray-500">
                                جار التحميل...
                            </div>
                        ) : error ? (
                            <div className="px-4 py-2 text-red-500">
                                {error}
                            </div>
                        ) : availableCategories.length > 0 ? (
                            availableCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    onClick={() => handleSelect(cat)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-right">
                                    {cat.arabic_name}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">
                                لا توجد فئات متاحة
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(MultiSelectProductCategories);
