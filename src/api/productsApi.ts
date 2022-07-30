import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/product',
                method: 'GET'
            }),
            providesTags: (result, error, arg) =>
                result ? [...result].map(({ _id }) => ({ type: 'Product', id: _id })) : ['Product']
        }),
        getProduct: builder.query<IProduct, string>({
            query: (id: string) => ({
                url: '/product/' + id,
                method: 'GET'
            }),
            providesTags: (result, error, arg) =>
                result ? [{ type: 'Product', id: result._id }] : ['Product']
        }),
        createProduct: builder.mutation<IProduct, Partial<IUpdateProduct>>({
            query: (product) => ({
                url: '/product',
                method: 'POST',
                body: product
            }),
            invalidatesTags: (result) =>
                result ? [{ type: 'Product', id: result._id }] : ['Product']
        }),
        updateProduct: builder.mutation<IProduct, IUpdateProduct>({
            query: (product) => ({
                url: '/product/' + product._id,
                method: 'PUT',
                body: { ...product, _id: undefined }
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: 'Product', id: result._id }] : ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useUpdateProductMutation,
    useCreateProductMutation
} = productApi;