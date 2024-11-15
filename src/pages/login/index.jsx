import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from 'next/link'



export default function Login (){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { login } = useUser();
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchUserData = async (token) => {
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        const data = await res.json();
        login(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("cars_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUserData(accessToken);
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("cars_token", data.access);
      setAccessToken(data.access); // Trigger useEffect to fetch user data
      router.push("/dashboard");
    } else {
      const data = await response.json();
      setError(data.detail || "Login failed");
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
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-500 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/register" className="flex justify-end">
            <p className="text-indigo-500 hover:text-indigo-700">New User?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
