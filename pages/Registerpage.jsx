// src/pages/Registerpage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase"; // Ensure firebase.js exports { auth, db }
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Registerpage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // 1️⃣ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2️⃣ Save extra details to Firestore
      await addDoc(collection(db, "registrations"), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        newsletter: formData.newsletter,
        createdAt: serverTimestamp(),
      });

      alert("Registration successful!");
      navigate("/afterlogin"); // Go to login page
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-blue-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-blue-300 rounded px-3 py-2 outline-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-blue-700 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-blue-300 rounded px-3 py-2 outline-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-blue-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-blue-300 rounded px-3 py-2 outline-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-blue-700 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border border-blue-300 rounded px-3 py-2 outline-blue-500"
                required
              />
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <label htmlFor="newsletter" className="text-sm text-blue-700">
                Subscribe to our newsletter
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all duration-200 font-semibold"
            >
              Register
            </button>

            {/* Link to Login */}
            <p className="text-sm text-center mt-4 text-blue-700">
              Already have an account?{" "}
              <Link to="/afterlogin" className="text-blue-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center p-4 bg-blue-200">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="register"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
