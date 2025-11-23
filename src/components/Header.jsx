import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const base = "px-2";
  const active = "text-blue-600 font-semibold";
  const inactive = "text-gray-700";

  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold text-blue-600">StudyBuddy</h1>

      <nav className="flex gap-4">
        <NavLink to="/" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Home</NavLink>
        <NavLink to="/course" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Course</NavLink>
        <NavLink to="/quiz" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Quiz</NavLink>
        <NavLink to="/discussion" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Discussion</NavLink>
        <NavLink to="/profile" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Profile</NavLink>
        <NavLink to="/team" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Team</NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Admin</NavLink>
        )}

        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </nav>
    </header>
  );
}
