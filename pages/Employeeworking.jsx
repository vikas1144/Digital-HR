import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import LeaveManagement from "../components/Emoloyewsection/LeaveManagement";
import AttendanceTracking from "../components/Emoloyewsection/AttendanceTracking";
import DocumentManagement from "../components/Emoloyewsection/DocumentManagement";
import SalaryAdministration from "../components/Emoloyewsection/SalaryAdministration";
import ProfilePage from "../components/Emoloyewsection/ProfilePage";

const Employeeworking = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Session Expired!");
    navigate("/"); // Redirect to Hero page
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          <img src={logo} alt="Logo" className="h-12 mx-auto" />
        </div>
        <nav className="flex-1 p-4 space-y-3 text-sm">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "profile", label: "My Profile" },
            { id: "leave", label: "Leave Management" },
            { id: "attendance", label: "Attendance Tracking" },
            { id: "documents", label: "Document Management" },
            { id: "salary", label: "Salary Administration" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`block w-full text-left py-2 px-4 rounded ${
                activeSection === item.id ? "bg-purple-700" : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 text-xs text-gray-400 border-t border-gray-700">
          Need Support? <br /> 1 Day Response Time
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top bar with logout */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {activeSection === "dashboard" && (
          <>
            <div className="bg-purple-600 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold">Welcome Back,</h2>
              <p className="text-xl font-semibold">Employee</p>
              <p className="text-sm mt-2">
                Here’s your employee dashboard where you can manage your details and stay updated.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div
                className="bg-gray-800 p-4 rounded flex items-center space-x-3 hover:bg-gray-700 cursor-pointer"
                onClick={() => setActiveSection("profile")}
              >
                <span className="text-xl">👤</span>
                <span>My Profile</span>
              </div>
              <div
                onClick={() => setActiveSection("leave")}
                className="bg-gray-800 p-4 rounded flex items-center space-x-3 hover:bg-gray-700 cursor-pointer"
              >
                <span className="text-xl">🗓️</span>
                <span>Request Leave</span>
              </div>
              <div
                onClick={() => setActiveSection("attendance")}
                className="bg-gray-800 p-4 rounded flex items-center space-x-3 hover:bg-gray-700 cursor-pointer"
              >
                <span className="text-xl">📆</span>
                <span>Attendance</span>
              </div>
              <div
                onClick={() => setActiveSection("documents")}
                className="bg-gray-800 p-4 rounded flex items-center space-x-3 hover:bg-gray-700 cursor-pointer"
              >
                <span className="text-xl">📁</span>
                <span>Documents</span>
              </div>
            </div>
          </>
        )}

        {activeSection === "profile" && <ProfilePage />}
        {activeSection === "leave" && <LeaveManagement />}
        {activeSection === "attendance" && <AttendanceTracking />}
        {activeSection === "documents" && <DocumentManagement />}
        {activeSection === "salary" && <SalaryAdministration />}
      </main>
    </div>
  );
};

export default Employeeworking;
