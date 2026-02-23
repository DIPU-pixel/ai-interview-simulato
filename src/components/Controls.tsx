interface Props {
  topic: string;
  setTopic: (value: string) => void;
  onStart: () => void;
  onReset: () => void;
}

const Controls = ({ topic, setTopic, onStart, onReset }: Props) => {
  return (
    <div className="flex gap-4 mb-8">
      <select
        className="bg-gray-800 p-3 rounded-lg flex-1"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      >
        <option>React</option>
        <option>JavaScript</option>
        <option>DSA</option>
      </select>

      <button
        onClick={onStart}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        Start
      </button>

      <button
        onClick={onReset}
        className="bg-gray-700 px-6 py-3 rounded-lg"
      >
        Reset
      </button>
    </div>
  );
};

export default Controls;
