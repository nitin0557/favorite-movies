import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface RouteItem {
  path: string;
  label: string;
  children?: RouteItem[];
}

interface SidebarProps {
  routes: RouteItem[];
  occupiedCount: number;
  totalSeats: number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = React.memo(({
  routes,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleNavigate = (path: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleMenu(path);
    } else {
      navigate(path);
      setSidebarOpen(false); // auto close on mobile
    }
  };

  const renderRoutes = (routes: RouteItem[], level = 0) =>
    routes.map((route) => {
      const isActive = location.pathname === route.path;
      const hasChildren: boolean = !!(
        route.children && route.children.length > 0
      );
      const isOpen = openMenus[route.path];

      return (
        <div key={route.path} className="flex flex-col">
          <button
            className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded font-medium text-left transition-all duration-300 w-full
              ${
                isActive
                  ? "bg-gray-200 text-black shadow-lg"
                  : "text-white hover:bg-gray-200 hover:text-black"
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
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black via-gray-800 to-gray-700 shadow-lg p-4 flex flex-col transition-transform duration-300 overflow-y-auto z-30
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
    >
      <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-left">
        Movies Dashboard
      </h2>

      <nav className="space-y-2 flex flex-col">{renderRoutes(routes)}</nav>
    </aside>
  );
})
