import React, { useState } from "react";
import { db } from "../firebase"; // import your firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // optional loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Call backend API to get sentiment
      const sentimentResponse = await fetch("http://localhost:5000/api/sentiment", {


        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: form.message }),
      });

      if (!sentimentResponse.ok) {
        throw new Error("Sentiment analysis failed");
      }

      const { sentiment } = await sentimentResponse.json();

      // 2. Save feedback + sentiment to Firestore
      await addDoc(collection(db, "feedback"), {
        name: form.name,
        email: form.email,
        message: form.message,
        sentiment, // save sentiment here
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error adding feedback:", err);
      setError(err.message || "Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">We Value Your Feedback</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {submitted ? (
          <div className="text-green-400 font-medium">Thank you for your feedback!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              } text-white font-semibold py-2 rounded`}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;
