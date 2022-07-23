import { baseApi } from './baseApi';

interface LoginResponse {
    user: IUser;
    token: string;
}

export const authApi = baseApi.injectEndpoints({
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
        })
    })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
