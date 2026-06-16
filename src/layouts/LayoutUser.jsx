import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../backend/features/auth/authAPI";
import { logout } from "../backend/features/auth/authSlice";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function LayoutUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logOut, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Error", error);
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-800 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          handleLogout={handleLogout}
          isLoading={isLoading}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
