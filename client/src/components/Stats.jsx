import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const stats = [
  {
    value: "10K+",
    label: "Questions Generated",
  },
  {
    value: "5K+",
    label: "Mock Interviews",
  },
  {
    value: "95%",
    label: "Success Rate",
  },
  {
    value: "24/7",
    label: "AI Assistance",
  },
];

function Stats() {
  const { darkMode } = useTheme();

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className={`rounded-2xl p-8 text-center border
            ${
              darkMode
                ? "bg-[#111111] border-gray-800"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <h2 className="text-4xl font-bold text-cyan-400">{stat.value}</h2>

            <p
              className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
