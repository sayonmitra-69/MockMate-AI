import { GoogleGenAI } from "@google/genai";

export const generateQuestions = async (req, res) => {
  try {
    console.log("Gemini Key:", process.env.GEMINI_API_KEY);
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { role, difficulty, totalQuestions } = req.body;

    const prompt = `
                  Generate ${totalQuestions} interview questions.

                    Role: ${role}
                    Difficulty: ${difficulty}

                    Return ONLY valid JSON.
[
  {
    "question": "..."
  }
]
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(text);

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

export const evaluateInterview = async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { role, difficulty, questions, answers } = req.body;

    const prompt = `
You are a Senior Technical Interviewer.

Evaluate this interview.

Role:
${role}

Difficulty:
${difficulty}

Questions:
${JSON.stringify(questions)}

Candidate Answers:
${JSON.stringify(answers)}

Return ONLY valid JSON.

{
  "overallScore":85,

  "feedback":[
    {
      "question":"",

      "answer":"",

      "score":85,

      "feedback":""
    }
  ],

  "strengths":[
    ""
  ],

  "improvements":[
    ""
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(text);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Evaluation failed",
      error: error.message,
    });
  }
};
