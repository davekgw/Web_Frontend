import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:5000/users?username=${username}&password=${password}`
    );
    const user = await res.json();

    if (user.length === 0) {
      alert("Username atau password salah!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user[0]));

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-64">
            <input
            type="text"
            required
            placeholder="Username"
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type="password"
            required
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Login
            </button>

            <p className="text-sm text-gray-600 text-center">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-600 underline">
                    Daftar di sini
                </Link>
            </p>
            <p className="text-sm text-gray-600 text-center">
                <Link to="/forgot" className="text-blue-600 underline">
                    Lupa Kata Sandi?
                </Link>
            </p>

        </form>
        </div>
    </div>
    );
}
