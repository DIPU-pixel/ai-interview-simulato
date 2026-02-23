import { useState } from "react";
import { analyzeImage } from "../service/api";

const ImageAnalyzer = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setPreview(base64);

      // remove data:image/...;base64,
      const pureBase64 = base64.split(",")[1];
      setBase64Image(pureBase64);
    };

    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!base64Image) return;

    setLoading(true);
    const response = await analyzeImage(base64Image);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        AI Image Analyzer
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="rounded-lg mb-4 max-h-60"
        />
      )}

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {result && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">AI Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;