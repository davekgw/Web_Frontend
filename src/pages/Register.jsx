import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Cek username sudah ada atau belum
    const res = await fetch("http://localhost:5000/users?username=" + username);
    const exist = await res.json();

    if (exist.length > 0) {
      alert("Username sudah dipakai!");
      return;
    }

    // Tambahkan user baru (role = user)
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        role: "user",
      }),
    });

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-64">
            <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-blue-600 text-white p-2 rounded">
                Register
            </button>
            <p className="text-sm text-gray-600 text-center">
                Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 underline">
                Login di sini
            </Link>
            </p>
        </form>
        </div>
    </div>
    );
}
