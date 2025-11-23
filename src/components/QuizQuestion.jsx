import { useState } from "react";

export default function QuizQuestion({ q, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleClick = (index) => {
    if (selected !== null) return; // biar tidak bisa klik 2x

    setSelected(index);
    const correct = index === q.answer;
    setIsCorrect(correct);

    onAnswer(correct); // kirim ke parent
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="font-bold mb-2">{q.question}</h2>

      {q.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`block w-full p-2 mt-2 border rounded
            ${selected === null ? "hover:bg-gray-200" : ""}

            ${selected === i && isCorrect === true ? "bg-green-300" : ""}
            ${selected === i && isCorrect === false ? "bg-red-300" : ""}
          `}
          disabled={selected !== null}
        >
          {opt}
        </button>
      ))}

      {selected !== null && (
        <p className={`mt-2 font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "Jawaban benar!" : "Jawaban salah!"}
        </p>
      )}
    </div>
  );
}
