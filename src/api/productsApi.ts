import { baseApi } from './baseApi';

interface AddProductImagePayload {
    id: string;
    image: File;
}

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/product',
                method: 'GET'
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Product' as const, id: _id })),
                        { type: 'Product', id: 'LIST' }
                    ]
                    : ['Product']
        }),
        getProductsByCategory: builder.query<IProduct[], { id: string, sort: string | undefined }>({
            query: ({ id, sort }) => {
                let url = '/product/category/' + id;
                if (sort) {
                    const searchParams = new URLSearchParams();
                    const [field, order] = sort.split("_");
                    searchParams.append("sortBy", field);
                    searchParams.append("order", order);
                    url += "?" + searchParams.toString();
                }
                return {
                    url,
                    method: "GET"
                }
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Product' as const, id: _id }))
                    ]
                    : ['Product']
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
            invalidatesTags: (result) => (result ? [{ type: 'Product', id: 'LIST' }] : ['Product'])
        }),
        removeProduct: builder.mutation<IProduct, string>({
            query: (id) => ({
                url: '/product/' + id,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => (result ? [{ type: 'Product', id: arg }] : [])
        }),
        updateProduct: builder.mutation<IProduct, IUpdateProduct>({
            query: (product) => ({
                url: '/product/' + product._id,
                method: 'PUT',
                body: { ...product, _id: undefined }
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: 'Product', id: result._id }] : ['Product']
        }),
        addProductImage: builder.mutation<IUploadImageResponse, AddProductImagePayload>({
            query: ({ id, image }) => {
                const form = new FormData();
                form.append('image', image);
                return {
                    url: `/product/${id}/image`,
                    method: 'POST',
                    body: form
                };
            },
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: 'Product', id: arg.id }] : ['Product']
        }),
        removeProductImage: builder.mutation({
            query: ({ imageId, productId }: { imageId: string; productId: string }) => ({
                url: `/product/${productId}/image/${imageId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: 'Product', id: arg.productId }] : ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useUpdateProductMutation,
    useCreateProductMutation,
    useRemoveProductImageMutation,
    useAddProductImageMutation,
    useLazyGetProductQuery,
    useRemoveProductMutation,
    useGetProductsByCategoryQuery
} = productApi;
