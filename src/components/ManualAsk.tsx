import { useState } from "react";
import { askAI } from "../service/api";

const ManualAsk = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const result = await askAI(prompt);
    setResponse(result);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        Ask AI Anything
      </h2>

      <textarea
        className="w-full bg-gray-700 p-4 rounded-lg"
        rows={4}
        placeholder="Type your question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="mt-4 bg-blue-600 px-6 py-2 rounded-lg"
      >
        Ask AI
      </button>

      {response && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
};

export default ManualAsk;
