import { useState } from "react";

interface Props {
  answer: string;
  setAnswer: (value: string) => void;
  onSubmit: () => void;
}

const AnswerSection = ({
  answer,
  setAnswer,
  onSubmit,
}: Props) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswer(transcript);
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        Your Answer
      </h2>

      <textarea
        className="w-full bg-gray-700 p-4 rounded-lg"
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="flex gap-4 mt-4 items-center">
        <button
          onClick={onSubmit}
          className="bg-green-600 px-6 py-2 rounded-lg"
        >
          Submit
        </button>

        {!isListening ? (
          <button
            onClick={startListening}
            className="bg-purple-600 px-6 py-2 rounded-lg"
          >
            🎤 Record
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="bg-red-600 px-6 py-2 rounded-lg"
          >
            ⛔ Stop
          </button>
        )}

        {isListening && (
          <span className="text-red-400 animate-pulse">
            ● Recording...
          </span>
        )}
      </div>
    </div>
  );
};

export default AnswerSection;
