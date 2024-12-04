import { createSlice } from "@reduxjs/toolkit";
import { actGetProductCategories } from "./act/actGetProductCategories";

export interface ProductCategory {
    id: number;
    arabic_name: string;
    english_name: string;
    number: string;
    level: string;
}

interface ProductCategoryState {
    categories: ProductCategory[];
    selectedCategories: ProductCategory[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: null | string;
}

const initialState: ProductCategoryState = {
    categories: [],
    selectedCategories: [],
    loading: "idle",
    error: null,
};

const ProductCategorySlice = createSlice({
    name: "productCategory",
    initialState,
    reducers: {
        addSelectedCategory: (state, action) => {
            const category = action.payload;
            if (!state.selectedCategories.some((c) => c.id === category.id)) {
                state.selectedCategories.push(category);
            }
        },
        removeSelectedCategory: (state, action) => {
            state.selectedCategories = state.selectedCategories.filter(
                (category) => category.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetProductCategories.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actGetProductCategories.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.categories = action.payload;
            })
            .addCase(actGetProductCategories.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
                state.categories = [];
            });
    },
});

export const { addSelectedCategory, removeSelectedCategory } =
    ProductCategorySlice.actions;

export default ProductCategorySlice.reducer;
