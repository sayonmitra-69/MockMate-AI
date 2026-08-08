import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import API from "../api/api";

function ResultsPage() {
  const navigate = useNavigate();

  const { score, answers, interviewConfig } = useInterview();

  const { darkMode } = useTheme();
  const [saving, setSaving] = useState(false);
  const handleSaveInterview = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await API.post(
        "/interviews/save",
        {
          role: interviewConfig.role,
          difficulty: interviewConfig.difficulty,
          score,
          totalQuestions: interviewConfig.totalQuestions,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Interview saved successfully!");

      navigate("/history");
    } catch (error) {
      console.error(error);

      alert("Failed to save interview");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-6 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-950 to-black text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-4xl p-10 rounded-3xl border ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <h1 className="text-5xl font-bold mb-8">Interview Results</h1>

        <h2 className="text-7xl font-bold text-cyan-400 mb-8">{score}%</h2>

        <div className="space-y-4 mb-8">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 ${
                darkMode ? "bg-white/5" : "bg-slate-100"
              }`}
            >
              <h3 className="font-bold">Question {index + 1}</h3>

              <p className="text-gray-400">{answer || "No Answer Submitted"}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveInterview}
          disabled={saving}
          className="
          px-6
          py-3
          rounded-xl
          bg-gradient-to-r
        from-cyan-500
        to-blue-600"
        >
          {saving ? "Saving..." : "Save & View History"}
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
