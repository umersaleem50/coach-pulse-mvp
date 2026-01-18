import { Route, BrowserRouter as Router, Routes } from "react-router";

import AuthRoutes from "./routes/auth-routes";

import AppLayout from "./app-layout";
import SettingsLayout from "./features/settings/settings-layout";
import ProfileSettingsPage from "./pages/profile-settings-page";
import Subscriptions from "./pages/Subscriptions";
import AppProviders from "./shared/Providers/AppProviders";

import Exercises from "./pages/exercises";
import Projects from "./pages/projects";
import AuthProvider from "./shared/Providers/AuthProvider";

function App() {
  return (
    <AppProviders>
      <Router>
        <AuthRoutes />

        <Routes>
          {/* <Route path="/role" element={<SelectRolePage />} /> */}
          <Route
            element={
              <AuthProvider>
                <AppLayout />
              </AuthProvider>
            }
          >
            <Route path="projects" element={<Projects />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="exercises" element={<Exercises />} />
            {/* <Route path="invites" element={<InviteApprovals />} /> */}

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
