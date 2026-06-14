import { createSlice } from "@reduxjs/toolkit";

// 🔄 On récupère ce qui est potentiellement stocké pour initialiser le store
const storedUser = localStorage.getItem("user");
const storedAccess = localStorage.getItem("access");
const storedRefresh = localStorage.getItem("refresh");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedAccess || null,
  refreshToken: storedRefresh || null,
  role: storedUser ? JSON.parse(storedUser)?.role || null : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
      state.role = payload.user?.role || null;

      // 💾 Sauvegarde dans le localStorage
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
    },

    setTokens: (state, { payload }) => {
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;

      // 💾 Mise à jour des tokens
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;

      // 🗑️ Nettoyage du localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});

export const { setCredentials, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
