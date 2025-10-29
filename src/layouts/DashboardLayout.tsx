import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Sidebar} from "../components/Sidebar";

interface DashboardLayoutProps {
  occupiedCount: number;
  totalSeats: number;
  children: React.ReactNode;
}


interface RouteItem {
  path: string;
  label: string;
  children?: RouteItem[];
}

export default function DashboardLayout({
  occupiedCount,
  totalSeats,
  children,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const routes: RouteItem[] = [
    { path: "/home", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
     { path: "/favorites", label: "Favorites" },

    { path: "/movieslist", label: "Movies List" },

    {
      path: "/settings",
      label: "Settings",
      children: [
        { path: "/settings/profile", label: "Profile" },
        { path: "/settings/preferences", label: "Preferences" },
      ],
    },
  ];

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleNavigate = (path: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleMenu(path);
    } else {
      navigate(path);
      setSidebarOpen(false);
    }
  };

  const renderRoutes = (routes: RouteItem[], level = 0) =>
    routes.map((route) => {
      const isActive = location.pathname === route.path;
      const hasChildren = !!(route.children && route.children.length > 0);
      const isOpen = openMenus[route.path];

      return (
        <div key={route.path} className="flex flex-col">
          <button
            className={`flex justify-between items-center cursor-pointer px-4 py-2 rounded font-medium text-left transition-all duration-300 w-full
              ${
                isActive
                  ? "bg-gray-200 text-black shadow"
                  : "text-white hover:bg-gray-700 hover:text-white"
              }
              ${level > 0 ? "ml-4" : ""}
            `}
            onClick={() => handleNavigate(route.path, hasChildren)}
          >
            <span>{route.label}</span>
            {hasChildren && (
              <span
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            )}
          </button>

          {hasChildren && isOpen && (
            <div className="flex flex-col ml-4 mt-1 space-y-1">
              {renderRoutes(route.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        routes={routes}
        occupiedCount={occupiedCount}
        totalSeats={totalSeats}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black text-white flex items-center justify-between px-4 py-3 shadow">
        <h2 className="text-lg font-bold">Bus Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-y-auto mt-12 md:mt-0">
        {children}
      </main>
    </div>
  );
}
