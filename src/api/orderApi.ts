import { baseApi } from './baseApi';

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<IOrder, ICreateOrder>({
            query: (order) => ({
                url: '/order',
                method: 'POST',
                body: order
            })
        }),
        getOrders: builder.query<IOrder[], void>({
            query: () => ({
                url: '/order',
                method: 'GET'
            })
        }),
        getOrder: builder.query<IOrder, string>({
            query: (id: string) => ({
                url: `/order/${id}`,
                method: 'GET'
            })
        })
    })
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery } = orderApi;
