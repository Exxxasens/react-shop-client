import { baseApi } from './baseApi';

export const propertiesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProperties: builder.mutation<IProperty[], void>({
            query: () => ({
                url: '/property',
                method: 'GET'
            })
        }),
        removeProperty: builder.mutation<IProperty, string>({
            query: (id) => ({
                url: '/property/' + id,
                method: 'DETETE'
            })
        }),
        createProperty: builder.mutation<IProperty, Omit<IProperty, '_id'>>({
            query: (body) => ({
                url: '/property',
                method: 'POST',
                body
            })
        })
    })
});

export const { useGetPropertiesMutation, useCreatePropertyMutation, useRemovePropertyMutation } =
    propertiesApi;
