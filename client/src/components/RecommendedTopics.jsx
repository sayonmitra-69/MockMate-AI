import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
function RecommendedTopics() {
  const { darkMode } = useTheme();
  const topics = [
    "JavaScript Closures",
    "Event Loop",
    "React Performance",
    "System Design Basics",
    "REST APIs",
  ];

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className={`rounded-2xl p-6 border
${
  darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
}`}
    >
      <h2 className="text-2xl font-bold mb-6">Recommended Topics</h2>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <motion.span
            whileHover={{
              scale: 1.08,
              y: -2,
            }}
            key={topic}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
          >
            {topic}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default RecommendedTopics;
