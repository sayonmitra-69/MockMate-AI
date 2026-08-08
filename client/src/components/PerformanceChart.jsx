import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

function PerformanceChart({ history = [] }) {
  const { darkMode } = useTheme();

  const chartData = history
    .slice()
    .reverse()
    .map((item, index) => ({
      interview: `#${index + 1}`,
      score: item.score,
    }));

  if (chartData.length < 2) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`rounded-3xl p-8 border ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200 shadow-lg"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">Performance Trend</h2>

        <div className="h-[200px] flex items-center justify-center text-center">
          <div>
            <p className="text-6xl mb-3">📈</p>

            <p className="text-gray-400">
              Complete more interviews to unlock analytics
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-3xl p-8 border ${
        darkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-200 shadow-lg"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">Performance Trend</h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            <XAxis dataKey="interview" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#06b6d4"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default PerformanceChart;
