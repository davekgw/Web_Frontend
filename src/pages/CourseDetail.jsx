import { useParams, Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, loading } = useFetch(`/courses/${id}`);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!course) return <p className="p-4">Course tidak ditemukan.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>

      <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded mb-6">
        Level: {course.level}
      </span>

      <h2 className="text-xl font-semibold mt-6 mb-2">Materi Pembelajaran</h2>

      <p className="text-gray-700 leading-relaxed">
        {course.lessons}
      </p>


      <Link
        to={`/quiz/${id}`}
        className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Mulai Quiz
      </Link>
    </div>
  );
}
