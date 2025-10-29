import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authApi";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!agree) {
        setError("You must agree to the terms.");
        return;
      }

      try {
        const res = await loginUser(email, password);

        if (res && res.token) {
          login(res.token, res.role); // ✅ store in context

          if (res.role === "Admin") {
            navigate("/home");
          } else {
            navigate("/dashboard");
          }
        } else {
          setError(res?.message || "Invalid credentials");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    },
    [agree, email, password, login, navigate]
  );

  return (
    <div className="relative flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 bg-customLight dark:bg-customDark dark:text-white">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-blue-500">
          Welcome Back
        </h2>
        <p className="text-gray-500 mb-6">Sign Up For Free</p>

        {/* 👉 Hints Section */}
        <div className="mb-4 text-sm text-gray-600 dark:text-red-500">
          <p>
            <strong>User:</strong> nitin@example.com / <strong>nitin123</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-blue-500"
          />

          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            I agree to all Terms, Privacy Policy and fees
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Get Started
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex flex-col space-y-3">
          <button className="w-full border border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-100 transition">
            Sign in with Google
          </button>
          <button className="w-full border border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-100 transition">
            Sign in with Facebook
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df"
          alt="login-banner"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
