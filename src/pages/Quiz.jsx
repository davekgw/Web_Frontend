import useFetch from "../utils/useFetch";
import QuizQuestion from "../components/QuizQuestion";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Quiz() {
  const { title } = useParams();
  const { data: quiz, loading } = useFetch("/quiz");
  const [score, setScore] = useState(0);

  if (loading) return <p>Loading...</p>;

  const filteredQuiz = quiz.filter((q) => q.course === title);

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };


  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quiz: {title}</h1>

      {filteredQuiz.map((q) => (
        <QuizQuestion key={q.id} q={q} onAnswer={checkAnswer} />
      ))}

      <p className="mt-4 font-bold text-lg">Score: {score}</p>
    </>
  );
}
