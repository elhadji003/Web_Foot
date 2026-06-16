import React from "react";
import LayoutAdmin from "./LayoutAdmin";
import LayoutUser from "./LayoutUser";
import { useSelector } from "react-redux";

export default function Layout() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>{user.role === "super-admin" ? <LayoutAdmin /> : <LayoutUser />}</div>
  );
}
