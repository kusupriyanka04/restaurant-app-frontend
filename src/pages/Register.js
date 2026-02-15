import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-zomato">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 rounded focus:outline-zomato"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded focus:outline-zomato"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded focus:outline-zomato"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-zomato text-white py-2 rounded hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
}

// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
//       setMessage(res.data.message);
//       navigate('/login');
//     } catch (err) {
//       setMessage(err.response.data.error);
//     }
//   };

//   return (
//     <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
