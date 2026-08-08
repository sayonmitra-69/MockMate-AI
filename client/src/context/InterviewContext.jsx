import { createContext, useContext, useState } from "react";
import API from "../api/api";
const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [interviewConfig, setInterviewConfig] = useState({
    role: "Frontend Developer",
    difficulty: "Easy",
    totalQuestions: 5,
  });

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const generateQuestions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/gemini/generate-questions",
        interviewConfig,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setQuestions(response.data);
      setAnswers([]);
      setCurrentQuestionIndex(0);
      setScore(0);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const calculateScore = (result) => {
    setScore(result);
  };

  const resetInterview = () => {
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewConfig,
        setInterviewConfig,

        questions,
        setQuestions,

        answers,
        setAnswers,

        score,
        setScore,

        currentQuestionIndex,
        setCurrentQuestionIndex,

        generateQuestions,
        calculateScore,
        resetInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export const useInterview = () => useContext(InterviewContext);
