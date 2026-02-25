import axios from "axios";

const API_BASE = "https://ai-interview-simulato.onrender.com/api/interview";

export const getQuestion = async (topic: string) => {
  const res = await axios.post(`${API_BASE}/question`, { topic });
  return res.data.question;
};

export const evaluateAnswer = async (
  question: string,
  answer: string
) => {
  const res = await axios.post(`${API_BASE}/evaluate`, {
    question,
    answer,
  });
  return res.data.feedback;
};

export const askAI = async (prompt: string) => {
  const res = await axios.post(`${API_BASE}/ask`, {
    prompt,
  });
  return res.data.answer;
};

export const analyzeImage = async (base64Image: string) => {
  const res = await axios.post(
    "https://ai-interview-simulato.onrender.com/api/ai/image",
    {
      image: base64Image,
    }
  );

  return res.data.caption;
};