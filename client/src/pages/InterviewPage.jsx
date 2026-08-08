import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";
import { useState, useEffect } from "react";

import { useTheme } from "../context/ThemeContext";
function InterviewPage() {
  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    interviewConfig,
    calculateScore,
  } = useInterview();

  const [answer, setAnswer] = useState("");

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const progress =
    ((currentQuestionIndex + 1) / interviewConfig.totalQuestions) * 100;

  const handleNext = () => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestionIndex] = answer;

    setAnswers(updatedAnswers);

    setAnswer("");

    if (currentQuestionIndex === interviewConfig.totalQuestions - 1) {
      const answeredQuestions = updatedAnswers.filter(
        (answer) => answer && answer.trim() !== "",
      ).length;

      const result = Math.round(
        (answeredQuestions / interviewConfig.totalQuestions) * 100,
      );

      calculateScore(result);

      navigate("/results");

      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center transition-all duration-300 px-6 ${
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
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-cyan-400">{interviewConfig.role}</h2>

            <p className="text-gray-400">{interviewConfig.difficulty}</p>
          </div>

          <div className="text-red-400 text-xl font-bold">⏱ {timeLeft}s</div>
        </div>

        <div className="w-full h-3 bg-white/10 rounded-full mb-8">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <h1 className="text-3xl font-bold mb-8">{currentQuestion?.question}</h1>

        <textarea
          rows="8"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-full rounded-xl p-4 mb-8 border ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-slate-50 border-gray-300"
          }`}
        />

        <button
          onClick={handleNext}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          {currentQuestionIndex === interviewConfig.totalQuestions - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default InterviewPage;
