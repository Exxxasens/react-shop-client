import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<IUser, void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            })
        })
    })
});

export const { useGetUserMutation } = userApi;
