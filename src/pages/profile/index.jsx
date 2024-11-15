import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Import icons for better UI

export default function Profile (){
  const { user, login } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("cars_token");
    const res = await fetch("http://localhost:8000/api/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      login(data); // Assuming login updates the user context
      setUsername(data.username);
      setEmail(data.email);
    } else {
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("cars_token");

    const dataToUpdate = {
      username,
      email,
      ...(newPassword && { password: newPassword }),
    };

    try {
      const res = await fetch("http://localhost:8000/api/update-profile/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (res.ok) {
        const data = await res.json();
        login(data); // Update user context
        setSuccess("Profile updated successfully!");
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while updating the profile");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br bg-gray-900">
      <div className="bg-gray-800 px-8 py-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Profile
        </h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-500 text-center">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              <FaUser className="inline mr-2 text-indigo-500" />
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-4 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              <FaEnvelope className="inline mr-2 text-indigo-500" />
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              <FaLock className="inline mr-2 text-indigo-500" />
              New Password (optional)
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-6 flex justify-between">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};