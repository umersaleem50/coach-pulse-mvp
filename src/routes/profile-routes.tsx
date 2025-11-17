import SettingsPage from "@/pages/settings-page";
import React from "react";
import { Route, Routes } from "react-router";

function ProfileRoutes() {
  return (
    <Route path="profile">
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  );
}

export default ProfileRoutes;
