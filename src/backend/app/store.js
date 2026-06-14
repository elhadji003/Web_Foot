import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authAPI";
import { userApi } from "../features/user/userAPI";
import { creneauApi } from "../features/creneau/creneauApi";
import { notificationApi } from "../features/notification/notification";
import { reservationApi } from "../features/reservation/reservationApi";
import { salleApi } from "../features/salle/salleApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [creneauApi.reducerPath]: creneauApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [salleApi.reducerPath]: salleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      creneauApi.middleware,
      notificationApi.middleware,
      reservationApi.middleware,
      salleApi.middleware,
    ),
});

// 2. Activation des listeners pour le refetch automatique (focus, reconnexion)
setupListeners(store.dispatch);
