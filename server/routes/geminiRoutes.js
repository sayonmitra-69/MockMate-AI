import express from "express";

import {
  generateQuestions,
  evaluateInterview,
} from "../controllers/geminiController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);

router.post("/evaluate", protect, evaluateInterview);

export default router;
