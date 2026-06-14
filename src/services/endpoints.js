const API_BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  BASE: `${API_BASE_URL}/api`,

  // 🔐 Authentification
  auth: {
    login: "/users/login/",
    register: "/users/register/",
    logout: "/users/logout/",
    refresh: "/users/token/refresh/",
    profile: "/users/profile/",
  },

  // 👥 Utilisateurs
  user: {
    list: "/users/list/",
    delete: "/users/delete/",
  },

  // 🚪 Salles (Gérées via ViewSet Django)
  salle: {
    list: "/salles/", // GET
    create: "/salles/", // POST
    detail: (id) => `/salles/${id}/`, // GET (Détail)
    update: (id) => `/salles/${id}/`, // PUT ou PATCH
    delete: (id) => `/salles/${id}/`, // DELETE
  },

  // 🕒 Créneaux (Gérés via ViewSet Django)
  creneau: {
    list: "/creneaux/",
    create: "/creneaux/",
    detail: (id) => `/creneaux/${id}/`,
    update: (id) => `/creneaux/${id}/`,
    delete: (id) => `/creneaux/${id}/`,
  },

  // 📅 Réservations (Gérées via ViewSet Django)
  reservation: {
    list: "/reservations/",
    create: "/reservations/",
    detail: (id) => `/reservations/${id}/`,
    update: (id) => `/reservations/${id}/`,
    delete: (id) => `/reservations/${id}/`,
  },

  // 🔔 Notifications (Gérées via ViewSet Django)
  notification: {
    list: "/notifications/",
    detail: (id) => `/notifications/${id}/`,
    update: (id) => `/notifications/${id}/`, // Utile pour marquer comme "lu" (PATCH)
    delete: (id) => `/notifications/${id}/`,
  },
};
