import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) return;

    setUser(stored);

    // Jika admin → ambil data admin dari daftar users
    if (stored.role === "admin") {
      fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((users) => {
          const findAdmin = users.find((u) => u.username === stored.username);
          setAdminData(findAdmin);
        });
    }
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <div className="bg-white p-4 shadow rounded-xl">
        
        {/* USER BIASA */}
        {user.role === "user" && (
          <>
            <p className="text-gray-700 text-lg font-semibold">Guest</p>
          </>
        )}

        {/* ADMIN */}
        {user.role === "admin" && adminData && (
          <>
            <p className="text-gray-700">Nama: {adminData.name}</p>
            <p className="text-gray-700">Role: {adminData.tugas}</p>
            <p className="text-gray-700">Email: {adminData.email}</p>
          </>
        )}
      </div>
    </div>
  );
}
