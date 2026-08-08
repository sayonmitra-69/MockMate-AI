import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function RecentInterviews({ history }) {
  const { darkMode } = useTheme();

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
      <h2 className="text-2xl font-bold mb-6">Recent Interviews</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No interviews completed yet.</p>
      ) : (
        <div className="space-y-4">
          {history.slice(0, 5).map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
              }}
              className={`flex justify-between items-center p-4 rounded-xl ${
                darkMode ? "bg-white/5" : "bg-slate-100"
              }`}
            >
              <div>
                <p className="font-semibold">{item.role}</p>

                <p className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`font-bold ${
                  item.score >= 80
                    ? "text-green-500"
                    : item.score >= 60
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {item.score}%
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default RecentInterviews;
