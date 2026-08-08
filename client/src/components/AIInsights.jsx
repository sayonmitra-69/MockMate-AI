import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function AIInsights({ averageScore, bestScore, totalInterviews }) {
  const { darkMode } = useTheme();

  const insights = [];

  if (totalInterviews === 0) {
    insights.push("Complete your first interview to receive AI insights.");
  } else {
    if (bestScore >= 80) {
      insights.push("Strong interview performance detected.");
    }

    if (averageScore < 60) {
      insights.push("Practice more frequently to improve confidence.");
    }

    if (averageScore >= 70) {
      insights.push("Good consistency across interviews.");
    }

    if (totalInterviews >= 5) {
      insights.push("You're building a strong interview habit.");
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className={`rounded-2xl p-6 border ${
        darkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-200 shadow-lg"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">AI Insights</h2>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.03,
            }}
            className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <div className="flex items-center gap-3">
              <span>🤖</span>
              <span>{item}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default AIInsights;
