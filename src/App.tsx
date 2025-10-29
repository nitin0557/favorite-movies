import React, { Suspense, lazy, useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./components/AppLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import MoviesList from "./pages/MoviesList";
import Favorites from "./pages/Favorites";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

function AppRoutes({
  toggleTheme,
  mode,
}: {
  toggleTheme: () => void;
  mode: "light" | "dark";
}) {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
            <Login />
          </AppLayout>
        }
      />

      <Route
        path="/home"
        element={
          <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
            <Home />
          </AppLayout>
        }
      />

      <Route
        path="/favorites"
        element={
          <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
            <Favorites />
          </AppLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
            <Dashboard />
          </AppLayout>
        }
      />

      <Route
        path="/movieslist"
        element={
          <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
            <MoviesList />
          </AppLayout>
        }
      />

      <Route
        path="/settings/profile"
        element={
          <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
            <Profile />
          </AppLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#9c27b0" },
        },
      }),
    [mode]
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <AppRoutes toggleTheme={toggleTheme} mode={mode} />
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
