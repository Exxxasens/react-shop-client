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
            query: (body: LoginSchema) => ({
                url: '/user/login',
                method: 'POST',
                body
            })
        }),
        register: builder.mutation<IUser, RegisterSchema>({
            query: (body: RegisterSchema) => ({
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
            query: (body: UpdatePasswordSchema) => ({
                url: '/user/password',
                method: 'PUT',
                body
            })
        })
    })
});

export const {
    useGetUserMutation,
    useLoginMutation,
    useRegisterMutation,
    useUpdatePasswordMutation
} = userApi;
