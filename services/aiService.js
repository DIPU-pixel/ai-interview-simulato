const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getQuestion(topic) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Generate one ${topic} interview question for a frontend developer. Return only the question.`,
      },
    ],
  });

  return response.choices[0].message.content;
}


async function evaluateAnswer(question, answer) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `
You are a senior frontend interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return JSON only in this format:

{
  "score": number,
  "strengths": "text",
  "weaknesses": "text",
  "idealAnswer": "text"
}
        `,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}




module.exports = { getQuestion,evaluateAnswer };
