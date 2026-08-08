import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";

import PerformanceChart from "../components/PerformanceChart";
import AIInsights from "../components/AIInsights";
import RecentInterviews from "../components/RecentInterviews";
import SkillBreakdown from "../components/SkillBreakdown";
import RecommendedTopics from "../components/RecommendedTopics";

import { useEffect, useState } from "react";
import API from "../api/api";
import { useTheme } from "../context/ThemeContext";

import { motion } from "framer-motion";

function DashboardPage() {
  const [history, setHistory] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [totalInterviews, setTotalInterviews] = useState(0);

  const { darkMode } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/interviews/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      setHistory(data);

      setTotalInterviews(data.length);

      if (data.length > 0) {
        const scores = data.map((item) => item.score);

        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

        setAverageScore(Math.round(avg));

        setBestScore(Math.max(...scores));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-950 to-black text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <DashboardNavbar setIsOpen={setIsOpen} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`rounded-2xl p-6 transition-all duration-300
${
  darkMode
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-gray-200 shadow-lg"
}`}
          >
            <p className="text-gray-400">Average Score</p>

            <h2 className="text-4xl font-bold mt-2">{averageScore}%</h2>
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`rounded-2xl p-6 transition-all duration-300
${
  darkMode
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-gray-200 shadow-lg"
}`}
          >
            <p className="text-gray-400">Total Interviews</p>

            <h2 className="text-4xl font-bold mt-2">{totalInterviews}</h2>
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`rounded-2xl p-6 transition-all duration-300
${
  darkMode
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-gray-200 shadow-lg"
}`}
          >
            <p className="text-gray-400">Best Score</p>

            <h2 className="text-4xl font-bold mt-2">{bestScore}%</h2>
          </motion.div>
        </motion.div>

        <PerformanceChart history={history} />

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Insights</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            <AIInsights
              averageScore={averageScore}
              bestScore={bestScore}
              totalInterviews={totalInterviews}
            />
            <RecentInterviews history={history} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Learning Progress</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            <SkillBreakdown />
            <RecommendedTopics />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
