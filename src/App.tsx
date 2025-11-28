import { Route, BrowserRouter as Router, Routes } from "react-router";

import AuthRoutes from "./routes/auth-routes";

import AppLayout from "./app-layout";
import ProfileSettingsPage from "./pages/profile-settings-page";
import SettingsLayout from "./features/settings/settings-layout";
import AllProjects from "./pages/all-projects";
import AppProviders from "./shared/Providers/AppProviders";
import AuthProvider from "./shared/Providers/AuthProvider";

function App() {
  return (
    <AppProviders>
      <Router>
        <AuthRoutes />

        <Routes>
          {/* <Route path="/role" element={<SelectRolePage />} /> */}
          <Route element={<AppLayout />}>
            <Route
              path="projects"
              element={
                <AuthProvider>
                  <AllProjects />
                </AuthProvider>
              }
            />

            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<ProfileSettingsPage />} />
              <Route path="profile" element={<ProfileSettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
