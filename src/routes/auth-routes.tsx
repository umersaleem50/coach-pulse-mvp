import AuthLayout from "@/features/auth/auth-layout";
import { Route, Routes } from "react-router";
import LoginPage from "../pages/login-page";

import SignupPage from "@/pages/signup-page";
import RecoverPasswordPage from "@/pages/recover-password-page";

function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />} path="auth">
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignupPage />} path="signup" />
        <Route element={<RecoverPasswordPage />} path="recover-password" />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;
