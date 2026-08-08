import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const features = [
  "AI Question Generator",
  "AI Answer Evaluation",
  "Performance Analytics",
  "Interview History",
  "Resume Analysis",
  "Learning Roadmaps",
];

function Features() {
  const { darkMode } = useTheme();

  return (
    <section id="features" className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-4xl font-bold text-center mb-16">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className={`p-8 rounded-2xl border ${
              darkMode
                ? "bg-[#111111] border-gray-800"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <h3 className="text-xl font-semibold">{feature}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
