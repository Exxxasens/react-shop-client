import { baseApi } from './baseApi';

interface LoginResponse {
    user: IUser;
    token: string;
}

interface UpdatePasswordBody {
    password: string;
    newPassword: string;
}

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginSchema>({
            query: (body) => ({
                url: '/user/login',
                method: 'POST',
                body
            })
        }),
        register: builder.mutation<IUser, RegisterSchema>({
            query: (body) => ({
                url: '/user/register',
                method: 'POST',
                body
            })
        }),
        getUser: builder.mutation<IUser, void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            })
        }),
        updatePassword: builder.mutation<IUser, UpdatePasswordBody>({
            query: (body) => ({
                url: '/user/password',
                method: 'PUT',
                body
            })
        }),
        addAddress: builder.mutation<IAddress, Omit<IAddress, '_id'>>({
            query: (body) => ({
                url: '/user/address',
                method: 'POST',
                body
            })
        }),
        getAddress: builder.mutation<IAddress[], void>({
            query: () => ({
                url: '/user/address',
                method: 'GET'
            })
        }),
        removeAddress: builder.mutation<IAddress, string>({
            query: (id: string) => ({
                url: '/user/address/' + id,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetUserMutation,
    useLoginMutation,
    useRegisterMutation,
    useUpdatePasswordMutation,
    useAddAddressMutation,
    useRemoveAddressMutation,
    useGetAddressMutation
} = userApi;
