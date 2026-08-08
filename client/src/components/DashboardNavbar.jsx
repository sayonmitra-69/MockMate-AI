import { FaBell, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

function DashboardNavbar({ setIsOpen }) {
  const navigate = useNavigate();

  const { darkMode } = useTheme();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden w-12 h-12 rounded-xl bg-cyan-500 text-white flex items-center justify-center"
          >
            <FaBars />
          </button>

          <div>
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Good Evening, Sayon 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Ready to improve your interview skills today?
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => navigate("/interview/setup")}
          whileHover={{
            scale: 1.05,
            y: -3,
            boxShadow: "0px 0px 25px rgba(6,182,212,0.5)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
        >
          Start New Interview
        </motion.button>
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`w-12 h-12 rounded-xl border flex items-center justify-center
          ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200 shadow-md"
          }`}
        >
          <FaBell />
        </button>

        <div
          className={`flex items-center gap-3 rounded-xl px-4 py-2 border
          ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200 shadow-md"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white">
            S
          </div>

          <div>
            <h4 className="font-semibold">Sayon Mitra</h4>

            <p className="text-xs text-gray-500">Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
