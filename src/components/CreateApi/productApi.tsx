import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../Products/ProductsSlice";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://683e8ddd1cd60dca33dc1a55.mockapi.io/endpoint"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[],void>({
            query: () => ({
                url: "product",
                method: 'GET',
            }),
        }),
        addProduct: builder.mutation<void,Product>({
            query: (newProduct) => ({
                url: "product",
                method: 'POST',
                body: newProduct,
            }),
        }),
    }),
})

export const {useGetProductsQuery,useAddProductMutation} = productApi