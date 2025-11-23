import { useEffect, useState } from "react";

export default function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        // tampilkan hanya user yang role-nya admin
        const admins = data
          .filter((u) => u.role === "admin") // <<< Filter admin
          .map((u) => ({
            name: u.name,
            email: u.email,
          }));

        setMembers(admins);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{m.name}</h3>
            <p className="text-gray-500">{m.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
