import Sidebar from "../components/Sidebar";

import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import API from "../api/api";

import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const { darkMode } = useTheme();
  useEffect(() => {
    fetchProfileData();
  }, []);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/interviews/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      setTotalInterviews(data.length);

      if (data.length > 0) {
        const scores = data.map((item) => item.score);

        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

        setAverageScore(Math.round(avg));

        setBestScore(Math.max(...scores));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const level = Math.floor(totalInterviews / 3) + 1;
  const xpProgress = Math.min((averageScore / 100) * 100, 100);

  const rank =
    averageScore >= 90
      ? "Platinum"
      : averageScore >= 80
        ? "Gold"
        : averageScore >= 70
          ? "Silver"
          : "Bronze";

  const achievements = [];

  if (averageScore >= 90)
    achievements.push({
      text: "👑 Top Performer",
      color: "bg-purple-500/10 border-purple-500/20",
    });

  if (bestScore >= 80)
    achievements.push({
      text: "⭐ Scored Above 80%",
      color: "bg-blue-500/10 border-blue-500/20",
    });

  if (totalInterviews >= 5)
    achievements.push({
      text: "🚀 Consistent Learner",
      color: "bg-yellow-500/10 border-yellow-500/20",
    });

  if (bestScore === 100)
    achievements.push({
      text: "💎 Perfect Score",
      color: "bg-purple-500/10 border-purple-500/20",
    });

  if (totalInterviews >= 10)
    achievements.push({
      text: "🔥 Interview Veteran",
      color: "bg-red-500/10 border-red-500/20",
    });
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-950 to-black text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-3xl p-8 border ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          {/* Profile Header */}

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">{user?.name}</h1>

              <p className="text-gray-400 mt-2">{user?.role || "Candidate"}</p>

              <p className="text-yellow-400 mt-2 font-semibold">
                {rank} Candidate
              </p>
              <p className="text-cyan-400 mt-2 font-semibold">Level {level}</p>
            </div>
          </motion.div>

          {/* XP Progress */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className={`mt-10 rounded-2xl p-6 ${
              darkMode ? "bg-white/5" : "bg-slate-100"
            }`}
          >
            <div className="flex justify-between mb-3">
              <span>XP Progress</span>

              <span>{averageScore}% XP</span>
            </div>

            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className="h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </motion.div>

          {/* Stats */}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-8">
            {[
              {
                label: "Interviews",
                value: totalInterviews,
              },
              {
                label: "Average Score",
                value: `${averageScore}%`,
              },
              {
                label: "Best Score",
                value: `${bestScore}%`,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                }}
                className={`rounded-2xl p-6 ${
                  darkMode
                    ? "bg-white/5"
                    : "bg-slate-100 border border-gray-200"
                }`}
              >
                <p className="text-gray-400">{item.label}</p>

                <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
              </motion.div>
            ))}
          </div>
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className={`rounded-2xl p-6 mt-6 ${
              darkMode ? "bg-white/5" : "bg-slate-100 border border-gray-200"
            }`}
          >
            <p className="text-gray-400">Achievements Unlocked</p>

            <h2 className="text-4xl font-bold mt-2">{achievements.length}</h2>
          </motion.div>

          {/* Achievements */}

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">Achievements</h2>

            {achievements.length === 0 ? (
              <div
                className={`rounded-2xl p-6 ${
                  darkMode
                    ? "bg-white/5"
                    : "bg-slate-100 border border-gray-200"
                }`}
              >
                Complete interviews to unlock achievements.
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.03,
                    }}
                    className={`rounded-xl p-4 border ${achievement.color}`}
                  >
                    {achievement.text}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default ProfilePage;
