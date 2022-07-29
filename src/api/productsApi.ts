import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/product',
                method: 'GET'
            })
        }),
        getProduct: builder.query<IProduct, string>({
            query: (id: string) => ({
                url: '/product/' + id,
                method: 'GET'
            })
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product: IProduct) => ({
                url: '/product/' + product._id,
                method: 'PUT',
                body: { ...product, _id: undefined, __v: undefined }
            })
        })
    })
});

export const { useGetProductsQuery, useGetProductQuery, useUpdateProductMutation } = productApi;
