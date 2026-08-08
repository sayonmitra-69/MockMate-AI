import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

function InterviewSetupPage() {
  const navigate = useNavigate();

  const { interviewConfig, setInterviewConfig, generateQuestions } =
    useInterview();

  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);

    const success = await generateQuestions();

    setLoading(false);

    if (success) {
      navigate("/interview");
    } else {
      alert(
        "Unable to generate interview questions. Please try again in a few seconds.",
      );
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-950 to-black text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <div
        className={`p-10 rounded-3xl w-full max-w-xl border ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <h1 className="text-4xl font-bold mb-8">Create Interview</h1>

        <select
          value={interviewConfig.role}
          onChange={(e) =>
            setInterviewConfig({
              ...interviewConfig,
              role: e.target.value,
            })
          }
          className={`w-full p-4 rounded-xl border outline-none transition-all duration-300 mb-5 ${
            darkMode
              ? "bg-white/5 border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-black"
          }`}
        >
          <option>Frontend Developer</option>

          <option>Backend Developer</option>

          <option>Full Stack Developer</option>

          <option>React Developer</option>
        </select>

        <select
          value={interviewConfig.difficulty}
          onChange={(e) =>
            setInterviewConfig({
              ...interviewConfig,
              difficulty: e.target.value,
            })
          }
          className={`w-full p-4 rounded-xl border outline-none transition-all duration-300 mb-5 ${
            darkMode
              ? "bg-white/5 border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-black"
          }`}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={interviewConfig.totalQuestions}
          onChange={(e) =>
            setInterviewConfig({
              ...interviewConfig,
              totalQuestions: Number(e.target.value),
            })
          }
          className={`w-full p-4 rounded-xl border outline-none transition-all duration-300 mb-8 ${
            darkMode
              ? "bg-white/5 border-white/10 text-white"
              : "bg-gray-50 border-gray-300 text-black"
          }`}
        >
          <option value={5}>5 Questions</option>

          <option value={10}>10 Questions</option>
        </select>

        <button
          onClick={handleStart}
          className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:scale-[1.02] hover:shadow-xl"
          }`}
          disabled={loading}
        >
          {loading
            ? "🤖 AI is preparing your interview......"
            : "Start Interview"}
        </button>
      </div>
    </div>
  );
}

export default InterviewSetupPage;
