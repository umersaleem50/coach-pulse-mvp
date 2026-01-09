import { useAuth } from "@/features/auth/hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "../components/ui/spinner";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/auth/login");
    },
    [isAuthenticated, navigate, isLoading]
  );

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return isAuthenticated ? children : null;
}

export default AuthProvider;
