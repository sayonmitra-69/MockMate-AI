import Interview from "../models/Interview.js";

export const saveInterview = async (req, res) => {
  try {
    const {
      role,
      difficulty,
      overallScore,
      totalQuestions,
      questions,
      answers,
      feedback,
      strengths,
      improvements,
    } = req.body;

    const interview = await Interview.create({
      user: req.user.id,

      role,
      difficulty,

      overallScore,

      totalQuestions,

      questions,

      answers,

      feedback,

      strengths,

      improvements,
    });

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
