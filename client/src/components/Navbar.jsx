import { FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        MockMate AI
      </h1>

      <div className="hidden md:flex gap-8">
        <a href="#features">Features</a>

        <a href="#how">How It Works</a>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-gray-700"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button className="bg-cyan-500 px-4 py-2 rounded-lg">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
