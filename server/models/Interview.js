import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  question: String,
  answer: String,
  score: Number,
  feedback: String,
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    questions: [
      {
        type: String,
      },
    ],

    answers: [
      {
        type: String,
      },
    ],

    feedback: [feedbackSchema],

    strengths: [
      {
        type: String,
      },
    ],

    improvements: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Interview", interviewSchema);
