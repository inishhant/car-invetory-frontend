import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/utils/api";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/", formData);
      router.push("/login"); // Redirect to login on success
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br bg-gray-900">
      <div className="bg-gray-700 px-10 py-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          CarInventory
        </h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-white mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-500 text-black"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-500 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/login">
            <p className="text-indigo-500 hover:text-indigo-700">Already have an account? Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
