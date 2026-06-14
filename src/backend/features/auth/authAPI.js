import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { ENDPOINTS } from "../../../services/endpoints";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    // 🔐 Login
    login: builder.mutation({
      query: (credentials) => ({
        url: ENDPOINTS.auth.login,
        method: "POST",
        body: credentials,
      }),
    }),

    // 📝 Register
    register: builder.mutation({
      query: (userData) => ({
        url: ENDPOINTS.auth.register,
        method: "POST",
        body: userData,
      }),
    }),

    // 🚪 Logout
    logout: builder.mutation({
      query: (refreshToken) => ({
        url: ENDPOINTS.auth.logout,
        method: "POST",
        body: { refresh: refreshToken },
      }),
    }),

    // 👤 Profile
    getProfile: builder.query({
      query: () => ({
        url: ENDPOINTS.auth.profile,
        method: "GET",
      }),
    }),
  }),
});

// ✅ Hooks auto-générés
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
