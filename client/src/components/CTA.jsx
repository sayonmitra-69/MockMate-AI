import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="max-w-5xl mx-auto px-8 py-24">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-5xl font-bold mb-4">
          Ready to Ace Your Next Interview?
        </h2>

        <p className="mb-8 text-lg">
          Practice smarter with AI-powered mock interviews.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => navigate("/signup")}
          className="bg-white text-black px-8 py-4 rounded-xl font-semibold"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}

export default CTA;
