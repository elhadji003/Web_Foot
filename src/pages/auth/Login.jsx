import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../backend/features/auth/authAPI";
import { setCredentials } from "../../backend/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // On utilise 'isLoading' fourni par RTK Query qui est plus précis pour les requêtes API
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));

      if (res.user.role === "super-admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboardUser");
      }
    } catch (error) {
      console.log("Erreur", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Admin
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Adresse Email
            </label>
            <input
              type="email"
              placeholder="nom@exemple.com"
              {...register("email", {
                required: "L'adresse email est obligatoire",
              })}
              className={`w-full p-3 border rounded-xl shadow-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20
                ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 bg-red-50/30"
                    : "border-slate-200 focus:border-blue-500 bg-slate-50/50 focus:bg-white"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Le mot de passe est obligatoire",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              className={`w-full p-3 border rounded-xl shadow-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20
                ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 bg-red-50/30"
                    : "border-slate-200 focus:border-blue-500 bg-slate-50/50 focus:bg-white"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {/* Optionnel: Lien mot de passe oublié */}
          <div className="flex items-center justify-end text-sm">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>

          {/* BOUTON SOUUMISSION */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 disabled:opacity-70 disabled:pointer-events-none mt-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                {/* Petit spinner SVG */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
