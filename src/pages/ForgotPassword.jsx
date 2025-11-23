import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPass, setNewPass] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleCheckUser = async (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      alert("Username tidak boleh kosong!");
      return;
    }

    const res = await fetch(`http://localhost:5000/users?username=${username}`);
    const user = await res.json();

    if (user.length === 0) {
      alert("Username tidak ditemukan!");
      return;
    }

    setStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPass.trim() === "") {
      alert("Password baru tidak boleh kosong!");
      return;
    }

    const res = await fetch(`http://localhost:5000/users?username=${username}`);
    const user = await res.json();
    const userData = user[0];

    await fetch(`http://localhost:5000/users/${userData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPass }),
    });

    alert("Password berhasil diubah!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 border rounded-lg shadow-md bg-white w-72">
        <h2 className="text-xl font-bold mb-4 text-center">Lupa Kata Sandi</h2>

        {step === 1 && (
          <form onSubmit={handleCheckUser} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Masukkan Username"
              className="border p-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <button className="bg-blue-600 text-white p-2 rounded">
              Lanjut
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Password Baru"
              className="border p-2 rounded"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />

            <button className="bg-green-600 text-white p-2 rounded">
              Simpan Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
