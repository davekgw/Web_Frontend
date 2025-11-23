// CourseCard.jsx
import { Link } from "react-router-dom";

export default function CourseCard({ id, title, description }) {
  return (
    <Link to={`/course/${id}`}>
      <div className="p-4 bg-white rounded shadow hover:scale-105 transition cursor-pointer">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
