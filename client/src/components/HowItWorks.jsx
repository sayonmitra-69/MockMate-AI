import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function HowItWorks() {
  const { darkMode } = useTheme();

  const steps = [
    "Select your role and difficulty level.",
    "Practice AI-generated interview questions.",
    "Receive feedback and track progress.",
  ];

  return (
    <section id="how" className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
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
            <h3 className="text-2xl font-bold mb-4">{index + 1}</h3>

            <p>{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
