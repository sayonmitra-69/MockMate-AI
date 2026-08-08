import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto min-h-[85vh] flex flex-col lg:flex-row items-center justify-between px-8">
      <div className="max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Land Your Dream Job With{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Interview Practice
        </motion.h1>

        <p
          className={`text-lg mt-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Generate interview questions, receive AI feedback, track performance
          and improve your confidence.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0px 0px 25px rgba(6,182,212,0.5)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate("/signup")}
            className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className={`px-6 py-3 rounded-xl border ${
              darkMode ? "border-gray-700" : "border-gray-300 shadow-md"
            }`}
          >
            Watch Demo
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        className={`rounded-2xl p-6 w-full max-w-md mt-12 lg:mt-0 border ${
          darkMode
            ? "bg-[#111111] border-gray-800"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">Frontend Interview</h3>

        <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          What is useEffect in React?
        </p>

        <div
          className={`rounded-lg p-4 mb-4 ${
            darkMode ? "bg-[#1a1a1a]" : "bg-green-50"
          }`}
        >
          <p className="text-green-500">Score: 8/10</p>
        </div>

        <p
          className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}
        >
          AI Feedback: Great answer. Mention dependency arrays for a stronger
          explanation.
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;
