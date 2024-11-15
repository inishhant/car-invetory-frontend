// components/Layout/SidebarLayout.js

import { useRouter } from "next/router";
import Sidebar from "../Sidebar";

export default function SidebarLayout({
  isCollapsed,
  setIsCollapsed,
  children,
}) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/" && router.pathname !== "/login" && router.pathname !== "/register" ? (
        <div className="flex">
          {/* Sidebar Component */}
          <Sidebar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />

          {/* Main Content Area */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed ? "ml-20" : "ml-64"
            } w-full`}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="flex">
          <div
            className={`transition-all duration-300 ease-in-out ${"ml-0"} w-full`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
