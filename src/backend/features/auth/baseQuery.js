import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../../services/endpoints";
import { logout, setTokens } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: ENDPOINTS.BASE,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // 🔥 token expiré
  if (result.error?.status === 401) {
    const refreshToken = api.getState().auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    // 🔄 refresh
    const refreshResult = await baseQuery(
      {
        url: ENDPOINTS.auth.refresh,
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data?.access) {
      api.dispatch(
        setTokens({
          access: refreshResult.data.access,
          refresh: refreshResult.data.refresh || refreshToken,
        }),
      );

      // 🔁 retry requête initiale
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
