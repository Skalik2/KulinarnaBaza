import React from "react";
import { useUser } from "./hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./ui/Spinner";

export default function ProtectedRoute() {
  const { data, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return data ? <Outlet /> : <Navigate to="/login" />;
}
