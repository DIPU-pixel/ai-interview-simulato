interface Props {
  question: string;
}

const QuestionPanel = ({ question }: Props) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        Question
      </h2>

      {question ? (
        <p className="text-gray-300">{question}</p>
      ) : (
        <p className="text-gray-500">
          Start the interview to see your question.
        </p>
      )}
    </div>
  );
};

export default QuestionPanel;
