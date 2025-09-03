import React, { useEffect, useRef, useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase"; // make sure firebase.js exports `app`

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

export default function ContactUs() {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  // Firestore instance
  const db = getFirestore(app);

  useEffect(() => {
    const handler = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchors.forEach((a) => a.addEventListener("click", handler));
    return () => anchors.forEach((a) => a.removeEventListener("click", handler));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      company: formRef.current.company.value,
      service: formRef.current.service.value,
      message: formRef.current.message.value,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contactMessages"), formData);
      formRef.current.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Something went wrong while sending your message.");
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
              DH
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold">TalentMesh</h1>
              <p className="text-xs text-gray-500">People-first HR automation</p>
            </div>
          </div>
          <nav>
            <a href="#contact" className="text-sm px-4 py-2 hover:text-indigo-600">
              Contact
            </a>
            <a href="#team" className="text-sm px-4 py-2 hover:text-indigo-600">
              Team
            </a>
            <a href="#locations" className="text-sm px-4 py-2 hover:text-indigo-600">
              Locations
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / Form */}
      <main className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <section>
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-3xl font-bold mb-3">Let's build better HR together</h2>
            <p className="text-gray-600 mb-6">
              Book a demo or send us a message and our consultants will reach out within one
              business day.
            </p>

            <form id="contactForm" ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-600 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                    placeholder="Enter FullName"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-gray-600 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-gray-600 mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                >
                  <option value="">Select a service</option>
                  <option value="recruitment">Recruitment Automation</option>
                  <option value="onboarding">Digital Onboarding</option>
                  <option value="analytics">HR Analytics</option>
                  <option value="learning">Learning Platform</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-600 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  placeholder="Tell us about your HR challenges..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>

              <div
                id="successMessage"
                role="status"
                aria-live="polite"
                className={`${
                  showSuccess ? "block" : "hidden"
                } mt-4 p-3 rounded bg-green-50 border border-green-200 text-green-800`}
              >
                Thank you — your message has been sent.
              </div>
            </form>
          </div>
        </section>

        {/* Right column */}
        <aside>
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded bg-indigo-50 text-indigo-600">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Head Office</h4>
                  <p className="text-gray-600">Bengaluru, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded bg-indigo-50 text-indigo-600">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded bg-indigo-50 text-indigo-600">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">contact@TalentMesh.com</p>
                </div>
              </div>
            </div>
          </div>

          <div id="team" className="bg-gradient-to-r from-indigo-100 to-pink-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Connect With Our Team</h3>
            <p className="mb-4 text-black">
              Our HR consultants are ready to discuss your digital transformation journey
            </p>

            <div className="flex space-x-4 overflow-x-auto pb-2">
              {[img1, img2, img3, img4].map((src, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden shadow transform hover:scale-105 transition"
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="img"
                  aria-label={`team-${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
