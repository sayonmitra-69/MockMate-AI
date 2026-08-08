import { useTheme } from "../context/ThemeContext";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function LandingPage() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer />
    </div>
  );
}

export default LandingPage;
