import { useState, useEffect } from "react";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

export default function Sidebar({ setIsCollapsed }) {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [isCollapsedLocal, setIsCollapsedLocal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleCollapse = () => {
    const newCollapseState = !isCollapsedLocal;
    setIsCollapsedLocal(newCollapseState);
    setIsCollapsed(newCollapseState); // Pass the collapse state to the parent
  };

  useEffect(() => {
    if (!user || !user.username) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    console.log("user: ", user);
  }, [user, router, user?.username]);

  return (
    <>
      {!isLoading && (
        <div
          className={`fixed h-full bg-gray-800 text-white p-4 transition-width duration-300 ${
            isCollapsedLocal ? "w-20" : "w-64"
          } flex flex-col`}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div
              className={`text-center ${isCollapsedLocal ? "hidden" : "block"}`}
            >
              <Link href="/" passHref><h2 className="text-4xl font-semibold text-gray-300">Welcome</h2></Link>
              <h3 className="flex flex-row text-m font-bold text-white">
                {user?.username}
              </h3>
            </div>
            <button onClick={toggleCollapse} className="text-white">
              {isCollapsedLocal ? (
                <FiChevronRight size={24} />
              ) : (
                <FiChevronLeft size={24} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 flex-1">
            <Link href="/" passHref>
              <div className="flex items-center text-lg hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiHome size={isCollapsedLocal ? 24 : 20} className="mr-3" />
                {!isCollapsedLocal && <span>Home</span>}
              </div>
            </Link>
            <Link href="/dashboard" passHref>
              <div className="flex items-center text-lg hover:bg-gray-700 p-2 rounded cursor-pointer">
                <MdDashboard size={isCollapsedLocal ? 24 : 20} className="mr-3" />
                {!isCollapsedLocal && <span>Dashboard</span>}
              </div>
            </Link>
            <Link href="/profile" passHref>
              <div className="flex items-center text-lg hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiUser size={isCollapsedLocal ? 24 : 20} className="mr-3" />
                {!isCollapsedLocal && <span>My Profile</span>}
              </div>
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center text-lg hover:bg-red-700 p-2 rounded w-full"
            >
              <FiLogOut size={isCollapsedLocal ? 24 : 20} className="mr-3" />
              {!isCollapsedLocal && <span>Logout</span>}
            </button>
          </div>
        </div>
      )}
      {isLoading && <h1>Loading...</h1>}
    </>
  );
}
