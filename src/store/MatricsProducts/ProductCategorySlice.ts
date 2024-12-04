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
    loading: boolean;
    error: null | string;
}

const initialState: ProductCategoryState = {
    categories: [],
    selectedCategories: [],
    loading: false,
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
        clearSelectedCategories: (state) => {
            state.selectedCategories = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetProductCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(actGetProductCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.data;
            })
            .addCase(actGetProductCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addSelectedCategory, removeSelectedCategory, clearSelectedCategories } =
    ProductCategorySlice.actions;

export default ProductCategorySlice.reducer;
