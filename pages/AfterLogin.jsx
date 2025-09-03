// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // firebase.js should export `app`

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/"); // Redirect straight to Hero section
    } catch (error) {
      console.error("Login error:", error.code);
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMsg("No account found with this email. Please register first.");
          break;
        case "auth/wrong-password":
          setErrorMsg("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Invalid email format.");
          break;
        default:
          setErrorMsg("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link to Register */}
        <p className="text-sm text-center mt-4 text-blue-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
