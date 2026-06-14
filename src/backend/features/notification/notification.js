// store/api/notificationApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { ENDPOINTS } from "../../../services/endpoints";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    // GET /api/notifications/
    getNotifications: builder.query({
      query: () => ENDPOINTS.notification.list,
      providesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
