import { useState } from "react";
import Header from "./components/Header";
import Controls from "./components/Controls";
import QuestionPanel from "./components/QuestionPanel";
import FeedbackPanel from "./components/FeedbackPanel";
import AnswerSection from "./components/AnswerSection";
import ManualAsk from "./components/ManualAsk";
import { getQuestion, evaluateAnswer } from "./service/api";
import ImageAnalyzer from "./components/ImageAnalyzer";

interface Feedback {
  score: number;
  strengths: string;
  weaknesses: string;
  idealAnswer: string;
}

function App() {
  const [topic, setTopic] = useState("React");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [mode, setMode] = useState<"interview" | "ask" | "image">("interview");

  const startInterview = async () => {
    const q = await getQuestion(topic);
    setQuestion(q);
    setAnswer("");
    setFeedback(null);
  };

  const resetInterview = () => {
    setQuestion("");
    setAnswer("");
    setFeedback(null);
  };

  const submitAnswer = async () => {
    const f = await evaluateAnswer(question, answer);
    setFeedback(f);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Header />

        {/* Mode Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("interview")}
            className={`px-4 py-2 rounded ${
              mode === "interview" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Interview Mode
          </button>

          <button
            onClick={() => setMode("ask")}
            className={`px-4 py-2 rounded ${
              mode === "ask" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Ask AI
          </button>
          <button
            onClick={() => setMode("image")}
            className={`px-4 py-2 rounded ${
              mode === "image" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Image AI
          </button>
        </div>

        {/* Conditional Rendering */}
        {mode === "ask" && <ManualAsk />}
        {mode === "image" && <ImageAnalyzer />}

        {mode === "interview" && (
          <>
            <Controls
              topic={topic}
              setTopic={setTopic}
              onStart={startInterview}
              onReset={resetInterview}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <QuestionPanel question={question} />
              <FeedbackPanel feedback={feedback} />
            </div>

            {question && (
              <AnswerSection
                answer={answer}
                setAnswer={setAnswer}
                onSubmit={submitAnswer}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
