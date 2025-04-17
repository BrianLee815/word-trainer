import { useState } from "react";
import WordStudy from "./components/WordStudy";
import WordQuiz from "./components/WordQuiz";

export default function App() {
  const [mode, setMode] = useState("study");

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("study")}
          className={`px-4 py-2 rounded ${
            mode === "study" ? "bg-blue-700 text-white" : "bg-gray-200"
          }`}
        >
          공부 모드
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`px-4 py-2 rounded ${
            mode === "quiz" ? "bg-purple-700 text-white" : "bg-gray-200"
          }`}
        >
          퀴즈 모드
        </button>
      </div>

      {mode === "study" ? <WordStudy /> : <WordQuiz />}
    </div>
  );
}

