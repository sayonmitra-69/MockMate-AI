import { FaHome, FaHistory, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const { darkMode } = useTheme();
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      label: "History",
      icon: <FaHistory />,
      path: "/history",
    },
    {
      label: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen w-72
          z-50
          transform transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${
            darkMode
              ? "bg-black/80 border-r border-white/10 text-white"
              : "bg-white border-r border-gray-200 text-black shadow-xl"
          }
        `}
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-10">
            MockMate AI
          </h1>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{
                    x: 8,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : darkMode
                        ? "hover:bg-white/5 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.icon}

                  <span>{item.label}</span>
                </motion.div>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="
  w-full
  mt-6
  py-3
  rounded-xl
  bg-red-500/10
  border
  border-red-500/20
  text-red-500
  hover:bg-red-500
  hover:text-white
  transition-all
  duration-300
  "
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
