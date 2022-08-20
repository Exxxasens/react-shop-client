import { baseApi } from './baseApi';

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateCategory: builder.mutation<ICategory, ICategory>({
            query: (category) => ({
                url: '/category/' + category._id,
                method: 'PUT',
                body: { ...category, _id: undefined }
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: 'Category', id: result._id }] : ['Category']
        }),
        removeCategory: builder.mutation<ICategory, string>({
            query: (id) => ({
                url: '/category/' + id,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: 'Category', id: result._id }] : ['Category']
        }),
        createCategory: builder.mutation<ICategory, Omit<ICategory, '_id'>>({
            query: (body) => ({
                url: '/category',
                method: 'POST',
                body
            }),
            invalidatesTags: (result) =>
                result ? [{ type: 'Category', id: 'LIST' }] : ['Category']
        }),
        getCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: '/category',
                method: 'GET'
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({ type: 'Category' as const, id: _id })),
                          { type: 'Category', id: 'LIST' }
                      ]
                    : ['Category']
        })
    })
});

export const {
    useUpdateCategoryMutation,
    useRemoveCategoryMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation
} = categoriesApi;
