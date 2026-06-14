// store/api/salleApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { ENDPOINTS } from "../../../services/endpoints";

export const salleApi = createApi({
  reducerPath: "salleApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Salle"],
  endpoints: (builder) => ({
    // GET /api/salles/
    getSalles: builder.query({
      query: () => ENDPOINTS.salle.list,
      providesTags: ["Salle"],
    }),

    getSalleById: builder.query({
      query: (id) => `${ENDPOINTS.salle.detail}/${id}`,
      providesTags: ["Salle"],
    }),

    // POST /api/salles/
    createSalle: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.salle.create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Salle"],
    }),

    // Update
    updateSalle: builder.mutation({
      // On déstructure l'objet pour isoler l'id et le reste des données (body)
      query: ({ id, ...body }) => ({
        // On appelle la fonction update en lui passant l'id
        url: ENDPOINTS.salle.update(id),
        method: "PATCH", // Tu peux mettre "PUT" si ton ViewSet Django n'accepte pas PATCH
        body: body,
      }),
      invalidatesTags: ["Salle"], // Vérifie bien si ton tag a une majuscule ou non dans ton code
    }),
  }),
});

export const {
  useGetSallesQuery,
  useGetSalleByIdQuery,
  useCreateSalleMutation,
  useUpdateSalleMutation,
} = salleApi;
