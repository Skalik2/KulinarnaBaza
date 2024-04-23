import React from "react";
import Navigation from "./nav/Navigation";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <Navigation />
      AppLayout
      <Outlet />
    </div>
  );
}
