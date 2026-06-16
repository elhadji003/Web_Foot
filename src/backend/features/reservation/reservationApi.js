import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery"; // Ton utilitaire avec tokens JWT
import { ENDPOINTS } from "../../../services/endpoints";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reservation"], // Permet le rafraîchissement automatique après une action

  endpoints: (builder) => ({
    // 1. GET - Récupérer toutes les réservations (Paginées via ton ViewSet)
    getReservations: builder.query({
      query: (params) => ({
        url: ENDPOINTS.reservation.list,
        method: "GET",
        params: params, // Pour passer des filtres optionnels (?page=1, ?search=...)
      }),
      providesTags: ["Reservation"],
    }),

    // 2. GET BY ID - Récupérer les détails d'une réservation spécifique
    getReservationDetail: builder.query({
      query: (id) => ({
        url: ENDPOINTS.reservation.detail(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Reservation", id }],
    }),

    // 3. POST - Créer une nouvelle réservation
    createReservation: builder.mutation({
      query: (newReservation) => ({
        url: ENDPOINTS.reservation.create,
        method: "POST",
        body: newReservation,
      }),
      invalidatesTags: ["Reservation"],
    }),

    // 4. PATCH/PUT - Modifier le statut d'une réservation (ex: Valider, Annuler)
    updateReservation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.reservation.update(id),
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Reservation"],
    }),

    // 5. DELETE - Supprimer une réservation
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: ENDPOINTS.reservation.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useGetReservationDetailQuery,
  useCreateReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = reservationApi;
