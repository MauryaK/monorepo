import { BaseApi } from "./baseApi";
import { RegisterUserInput, LoginUserInput, AuthResponse, StandardApiResponse } from "@erp/shared-types";

export const authApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterUserInput>({
            query: (credentials) => ({
                url: '/users/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<AuthResponse, LoginUserInput>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation<StandardApiResponse, void>({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
})


export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;