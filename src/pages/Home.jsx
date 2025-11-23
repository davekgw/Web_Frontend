import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-8 py-12">

      {/* HERO SECTION */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Selamat Datang di <span className="text-blue-600">StudyBuddy</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          Platform belajar interaktif untuk siapa saja. Akses course, quiz, dan berbagai fitur pembelajaran dalam satu aplikasi.
          <p>Platform ini dibuat untuk memenuhi tugas Final Project Mata Kuliah Web Front-End.</p>
        </p>

        <button
          onClick={() => navigate("/course")}
          className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition"
        >
          🚀 Mulai Belajar
        </button>
      </section>

      {/* FITUR */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fitur Utama</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-3">📚 Course</h3>
            <p className="text-gray-600">Materi pembelajaran tersusun rapi dari level dasar hingga mahir.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-3">📝 Quiz</h3>
            <p className="text-gray-600">Tes pemahamanmu dengan quiz interaktif di setiap course.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-3">💬 Diskusi</h3>
            <p className="text-gray-600">Tanya jawab dan diskusi dengan teman belajar.</p>
          </div>

        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Course Terpopuler</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition">
            <h4 className="text-xl font-semibold">HTML & CSS Dasar</h4>
            <p className="text-gray-600 text-sm mt-2">Fundamental pembuatan website modern.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition">
            <h4 className="text-xl font-semibold">JavaScript Fundamental</h4>
            <p className="text-gray-600 text-sm mt-2">Pelajari dasar pemrograman JavaScript secara praktis.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition">
            <h4 className="text-xl font-semibold">React Pemula</h4>
            <p className="text-gray-600 text-sm mt-2">Membangun aplikasi modern dengan React.</p>
          </div>

        </div>
      </section>
    </div>
  );
}
