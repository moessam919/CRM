import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, Search } from "lucide-react";
import {
    addSelectedProduct,
    Product,
    removeSelectedProduct,
} from "../../store/MatricsProducts/ProductsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actGetProducts } from "../../store/MatricsProducts/act/actGetProducts";

interface MultiSelectProductProps {
    onProductsSelect?: (products: Product[]) => void;
}

const MultiSelectProducts: React.FC<MultiSelectProductProps> = ({
    onProductsSelect,
}) => {
    const dispatch = useAppDispatch();
    const { products, selectedProducts, loading, error } = useAppSelector(
        (state) => state.products
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Memoize the searchProducts function
    const searchProducts = useCallback(() => {
        if (searchTerm.trim()) {
            dispatch(actGetProducts(searchTerm));
        }
    }, [searchTerm, dispatch]);

    // Debounce search to reduce API calls
    useEffect(() => {
        const timeoutId = setTimeout(searchProducts, 500);
        return () => clearTimeout(timeoutId);
    }, [searchProducts]);

    // Memoize the selectedProducts array to compare with the previous value
    const memoizedSelectedProducts = useMemo(
        () => selectedProducts,
        [selectedProducts]
    );

    // Call the onProductsSelect callback only when the selectedProducts array changes
    useEffect(() => {
        if (!isEqual(memoizedSelectedProducts, selectedProducts)) {
            onProductsSelect?.(selectedProducts);
        }
    }, [onProductsSelect, memoizedSelectedProducts, selectedProducts]);

    const handleProductSelect = (product: Product) => {
        dispatch(addSelectedProduct(product));
        setSearchTerm("");
        setIsDropdownOpen(false);
        onProductsSelect?.([...selectedProducts, product]);
    };

    const handleProductRemove = (productId: number) => {
        dispatch(removeSelectedProduct(productId));
        const updatedProducts = selectedProducts.filter(
            (p) => p.id !== productId
        );
        onProductsSelect?.(updatedProducts);
    };

    const filteredProducts = products.filter(
        (product) =>
            !selectedProducts.some(
                (selectedProduct) => selectedProduct.id === product.id
            )
    );

    const isEqual = <T,>(arr1: T[], arr2: T[]) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    return (
        <div className="relative w-full">
            {/* Selected Products */}
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center  bg-gray-100 px-2 py-1 rounded-md text-sm">
                        {product.arabic_name}
                        <button
                            onClick={() => handleProductRemove(product.id)}
                            className="ml-2 text-red-500 hover:text-red-700">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Search Input */}
            <div className="relative">
                <div className="flex items-center border rounded-md">
                    <Search
                        className="absolute left-3 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="ابحث عن منتج"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="w-full px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Dropdown */}
                {isDropdownOpen && searchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {loading ? (
                            <div className="px-4 py-2 text-gray-500">
                                جار التحميل...
                            </div>
                        ) : error ? (
                            <div className="px-4 py-2 text-red-500">
                                {error}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => {
                                        handleProductSelect(product);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    {product.arabic_name} ({product.ref_number})
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">
                                لم يتم العثور على منتجات
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelectProducts;
