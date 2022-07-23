import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { RootStore } from '../store';
import { HttpException } from './HttpException';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootStore).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithErrorHandler = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        if (result.error.data && result.error.data) {
            // TODO: LOGOUT HERE
        }
    }

    return result;
};

export const baseApi = createApi({
    baseQuery: baseQueryWithErrorHandler,
    endpoints: (builder) => ({})
});
