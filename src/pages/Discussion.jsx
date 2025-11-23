import { useState } from "react";
import useFetch from "../utils/useFetch";
import { api } from "../api/api";
import CommentItem from "../components/CommentItem";

export default function Discussion() {
  const { data: comments, loading } = useFetch("/discussion");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const addComment = async () => {
    await api.post("/discussion", { name, comment });
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Diskusi</h1>

      {comments.map((c) => (
        <CommentItem key={c.id} {...c} />
      ))}

      <div className="mt-4 p-4 bg-white shadow rounded">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Nama"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Komentar..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={addComment}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kirim
        </button>
      </div>
    </>
  );
}
