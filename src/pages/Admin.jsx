import { useEffect, useState } from "react";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // QUIZ INPUT
  const [quizData, setQuizData] = useState({
    courseId: "",
    question: "",
    options: "",
    answer: ""
  });

  // GET DATA
  const loadData = () => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));

    fetch("http://localhost:5000/quiz")
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // ADD COURSE
  const addCourse = () => {
    const newCourse = { title, description };
    fetch("http://localhost:5000/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    }).then(loadData);
  };

  // DELETE COURSE + ALL QUIZ RELATED
  const deleteCourse = async (id) => {
    const ok = confirm("Yakin ingin menghapus course dan quiz terkait?");
    if (!ok) return;

    // 1. Hapus course
    await fetch(`http://localhost:5000/courses/${id}`, {
      method: "DELETE",
    });

    // 2. Ambil semua quiz berdasarkan courseId
    const res = await fetch(`http://localhost:5000/quiz?courseId=${id}`);
    const quizList = await res.json();

    // 3. Hapus semua quiz terkait
    for (const q of quizList) {
      await fetch(`http://localhost:5000/quiz/${q.id}`, {
        method: "DELETE",
      });
    }

    loadData();
  };

  // EDIT COURSE
  const startEdit = (course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setDescription(course.description);
  };

  const saveEdit = () => {
    fetch(`http://localhost:5000/courses/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    }).then(loadData);

    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  // ADD QUIZ
  const addQuiz = () => {
    const payload = {
      courseId: Number(quizData.courseId),
      question: quizData.question,
      options: quizData.options.split(","),
      answer: Number(quizData.answer)
    };

    fetch("http://localhost:5000/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(loadData);

    setQuizData({
      courseId: "",
      question: "",
      options: "",
      answer: ""
    });
  };

  // DELETE QUIZ
  const deleteQuiz = (id) => {
    fetch(`http://localhost:5000/quiz/${id}`, {
      method: "DELETE",
    }).then(loadData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {/* COURSE FORM */}
      <div className="p-4 bg-gray-100 rounded mb-6">
        <h3 className="font-semibold text-lg mb-2">{editingId ? "Edit Course" : "Tambah Course"}</h3>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Judul Course"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {editingId ? (
          <button
            onClick={saveEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Simpan Perubahan
          </button>
        ) : (
          <button
            onClick={addCourse}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Tambah Course
          </button>
        )}
      </div>

      {/* COURSE LIST */}
      <h3 className="text-xl font-semibold mb-3">Daftar Course</h3>

      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center mb-3"
        >
          <div>
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startEdit(course)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteCourse(course.id)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}

      {/* QUIZ MANAGEMENT */}
      <div className="mt-10 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-4">Tambah Quiz</h3>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Course ID"
          value={quizData.courseId}
          onChange={(e) => setQuizData({ ...quizData, courseId: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Pertanyaan"
          value={quizData.question}
          onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Options (pisahkan dengan koma)"
          value={quizData.options}
          onChange={(e) => setQuizData({ ...quizData, options: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Index Jawaban Benar (0/1/2/...)"
          value={quizData.answer}
          onChange={(e) => setQuizData({ ...quizData, answer: e.target.value })}
        />

        <button
          onClick={addQuiz}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tambah Quiz
        </button>
      </div>

      {/* QUIZ LIST */}
      <h3 className="text-xl font-semibold mt-8 mb-3">Daftar Quiz</h3>

      {quizzes.map((q) => (
        <div key={q.id} className="bg-white p-4 border rounded flex justify-between mb-3">
          <div>
            <p className="font-semibold">{q.question}</p>
            <p className="text-gray-600 text-sm">Course ID: {q.courseId}</p>
          </div>

          <button
            onClick={() => deleteQuiz(q.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}
