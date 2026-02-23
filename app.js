const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



const { getQuestion, evaluateAnswer } = require("./services/aiService");

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/interview/question", async (req, res) => {
  try {
    const { topic } = req.body;
    const question = await getQuestion(topic);
    res.json({ question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

app.post("/api/interview/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const feedback = await evaluateAnswer(question, answer);

    res.json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Evaluation error" });
  }
});

app.post("/api/interview/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      answer: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

app.post("/api/ai/image", async (req, res) => {
  try {
    const { image } = req.body;

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-large",
      {
        inputs: image,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      caption: response.data[0]?.generated_text || "No description generated",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Image AI error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
