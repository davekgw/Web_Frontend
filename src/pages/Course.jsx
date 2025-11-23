import useFetch from "../utils/useFetch";
import CourseCard from "../components/CourseCard";

export default function Course() {
  const { data: courses, loading } = useFetch("/courses");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {courses.map((c) => (
        <CourseCard key={c.id} id={c.id} title={c.title} description={c.description} />
      ))}
    </div>
  );
}
