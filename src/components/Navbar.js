import { Link } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <div className="bg-zomato text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Foodie</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">
          Menu
        </Link>
        <Link to="/login" className="hover:text-gray-200">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-200">
          Register
        </Link>
        {token && role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}
      </div>
    </div>
  );
}
