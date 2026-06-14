import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { ENDPOINTS } from "../../../services/endpoints";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user"],

  endpoints: (builder) => ({
    // Endpoint pour récupérer tous les utilisateurs (avec gestion de la page et recherche)
    allUser: builder.query({
      query: ({ page = 1, search = "" } = {}) => {
        let url = `${ENDPOINTS.user.list}?page=${page}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ENDPOINTS.user.delete}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

// RTK Query génère automatiquement ce hook basé sur le nom du endpoint
export const { useAllUserQuery, useDeleteUserMutation } = userApi;
