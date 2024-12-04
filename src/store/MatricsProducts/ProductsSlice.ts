import { createSlice } from "@reduxjs/toolkit";
import { actGetProducts } from "./act/actGetProducts";

export interface Product {
    id: number;
    ref_number: string;
    sku: string;
    arabic_name: string;
    english_name: string;
    product_type: string;
    purchase_price: string;
    selling_price: string;
    tax_type: {
        id: number;
        name: string;
        percentage: string;
    };
    last_purchase_price: number;
    average_cost: number;
}

interface ProductState {
    products: Product[];
    selectedProducts: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    selectedProducts: [],
    loading: false,
    error: null,
};

const ProductsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addSelectedProduct: (state, action) => {
            const product = action.payload;
            if (!state.selectedProducts.some((p) => p.id === product.id)) {
                state.selectedProducts.push(product);
            }
        },
        removeSelectedProduct: (state, action) => {
            state.selectedProducts = state.selectedProducts.filter(
                (product) => product.id !== action.payload
            );
        },
        clearSelectedProducts: (state) => {
            state.selectedProducts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(actGetProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            .addCase(actGetProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addSelectedProduct, removeSelectedProduct, clearSelectedProducts } =
    ProductsSlice.actions;

export default ProductsSlice.reducer;
