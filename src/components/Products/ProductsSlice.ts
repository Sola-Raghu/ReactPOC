import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../CreateApi/productApi";

export interface Product {
    id: number;
    name: string;
    price: number;
}
interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: []
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts(state, action: PayloadAction<Product[]>) {
            state.products = [...state.products, ...action.payload];
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    },
});

const productsStore = configureStore({
    reducer: {
        products: productsSlice.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware)
})

export const { addProducts, addProduct, removeProduct } = productsSlice.actions;

export const selectProducts =  (state: ProductsState) => state.products;

export type AppState = ReturnType<typeof productsStore.getState>;
export type RootDispatch = typeof productsStore.dispatch;
export default productsStore;