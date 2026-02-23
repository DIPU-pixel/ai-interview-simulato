interface Props {
  feedback: any;
}

const FeedbackPanel = ({ feedback }: Props) => {
  if (!feedback) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          AI Feedback
        </h2>
        <p className="text-gray-500">
          Submit your answer to see evaluation.
        </p>
      </div>
    );
  }

  const scoreColor =
    feedback.score >= 7
      ? "bg-green-600"
      : feedback.score >= 4
      ? "bg-yellow-500"
      : "bg-red-600";

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold">AI Feedback</h2>

      {/* Score Badge */}
      <div className="flex items-center gap-4">
        <span className="text-gray-400">Score:</span>
        <span
          className={`px-4 py-2 rounded-full text-white font-bold ${scoreColor}`}
        >
          {feedback.score}/10
        </span>
      </div>

      {/* Strengths */}
      <div className="bg-green-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-green-400 mb-2">
          Strengths
        </h3>
        <p className="text-gray-300">{feedback.strengths}</p>
      </div>

      {/* Weaknesses */}
      <div className="bg-red-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-red-400 mb-2">
          Weaknesses
        </h3>
        <p className="text-gray-300">{feedback.weaknesses}</p>
      </div>

      {/* Ideal Answer */}
      <div className="bg-blue-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-400 mb-2">
          Ideal Answer
        </h3>
        <p className="text-gray-300">{feedback.idealAnswer}</p>
      </div>
    </div>
  );
};

export default FeedbackPanel;
