import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeDirectory from "../components/Employees/EmployeeDirectory";
import LeaveManagement from "../components/Employees/LeaveManagement";
import AttendanceTracking from "../components/Employees/AttendanceTracking";
import DocumentManagement from "../components/Employees/DocumentManagement";
import SalaryAdministration from "../components/Employees/SalaryAdministration";
import ReportAnalytics from "../components/Employees/ReportAnalytics";
import logo from "../assets/logo.jpg";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import SentimentChart from "../components/SentimentChart";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [applicants, setApplicants] = useState([]);
  const [decisions, setDecisions] = useState({});

  useEffect(() => {
    const storedApplicants = localStorage.getItem("applicants");
    const storedDecisions = localStorage.getItem("applicantDecisions");
    console.log("Loaded applicants from localStorage:", storedApplicants);

    if (storedApplicants) setApplicants(JSON.parse(storedApplicants));
    if (storedDecisions) setDecisions(JSON.parse(storedDecisions));
  }, []);

  const saveDecisions = (updatedDecisions) => {
    localStorage.setItem("applicantDecisions", JSON.stringify(updatedDecisions));
  };

  const handleDecision = async (applicant, decision) => {
    try {
      if (decision === "approved") {
        const sanitizedEmail = applicant.email.replace(/\./g, "_");
        const employeeRef = doc(collection(db, "employees"), sanitizedEmail);
        await setDoc(employeeRef, {
          fullName: applicant.name,
          email: applicant.email,
          phone: applicant.phone,
          jobRole: applicant.profile || "Not provided",
          resume: applicant.resume,
          joinedDate: Timestamp.fromDate(new Date()),
        });
      }
      const endpoint = decision === "approved" ? "approve" : "reject";
      const response = await fetch(`http://localhost:5000/api/applicants/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: applicant.name, email: applicant.email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Email failed");

      const updated = { ...decisions, [applicant.email]: decision };
      setDecisions(updated);
      saveDecisions(updated);
      alert(`Applicant ${decision}`);
    } catch (err) {
      console.error("Error:", err.message || err);
      alert(`Failed: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Session expired");
    navigate("/");
  };

  const totalApplicants = applicants.length;
  const totalApproved = Object.values(decisions).filter((d) => d === "approved").length;
  const totalRejected = Object.values(decisions).filter((d) => d === "rejected").length;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          <img src={logo} alt="Logo" className="w-full object-contain" />
        </div>
        <nav className="flex-1 p-4 space-y-3 text-sm">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "employees", label: "Employees" },
            { id: "leave", label: "Leave Management" },
            { id: "attendance", label: "Attendance Tracking" },
            { id: "documents", label: "Document Management" },
            { id: "salary", label: "Salary Administration" },
            { id: "reports", label: "Reports & Analytics" },
            { id: "applicants", label: "Interviewee" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`block w-full text-left py-2 px-4 rounded transition-colors duration-300 ${
                activeSection === item.id ? "bg-purple-700 font-semibold" : "hover:bg-gray-700"
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
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* Logout Button Top-Right */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
        >
          Logout
        </button>

        {activeSection === "dashboard" && (
          <>
            <h1 className="text-4xl font-extrabold mb-8 text-purple-400">
              Dashboard Overview
            </h1>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h2 className="text-lg font-semibold text-gray-300">Total Applicants</h2>
                <p className="mt-2 text-3xl font-bold text-white">{totalApplicants}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h2 className="text-lg font-semibold text-gray-300">Approved Applicants</h2>
                <p className="mt-2 text-3xl font-bold text-green-400">{totalApproved}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h2 className="text-lg font-semibold text-gray-300">Rejected Applicants</h2>
                <p className="mt-2 text-3xl font-bold text-red-400">{totalRejected}</p>
              </div>
            </div>

            {/* Sentiment Analysis Chart */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center text-purple-300">
                Sentiment Analysis
              </h2>
              <SentimentChart />
            </div>
          </>
        )}

        {activeSection === "employees" && <EmployeeDirectory />}
        {activeSection === "leave" && <LeaveManagement />}
        {activeSection === "attendance" && <AttendanceTracking />}
        {activeSection === "documents" && <DocumentManagement />}
        {activeSection === "salary" && <SalaryAdministration />}
        {activeSection === "reports" && <ReportAnalytics />}

        {activeSection === "applicants" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Job Applicants</h2>
            {applicants.length === 0 ? (
              <p className="text-gray-400">No applications submitted yet.</p>
            ) : (
              <div className="overflow-x-auto rounded border border-gray-700 shadow-md">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Phone</th>
                      <th className="py-2 px-4">Profile</th>
                      <th className="py-2 px-4">Resume</th>
                      <th className="py-2 px-4">Actions</th>
                      <th className="py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((applicant, index) => {
                      const decision = decisions[applicant.email];
                      return (
                        <tr key={index} className="border-t border-gray-600">
                          <td className="py-2 px-4">{applicant.name}</td>
                          <td className="py-2 px-4">{applicant.email}</td>
                          <td className="py-2 px-4">{applicant.phone}</td>
                          <td className="py-2 px-4">{applicant.profile}</td>
                          <td className="py-2 px-4">
                            {applicant.resume?.name ? (
                              <a
                                href={applicant.resume.content}
                                download={applicant.resume.name}
                                className="text-blue-400 underline"
                              >
                                Download
                              </a>
                            ) : (
                              "No Resume"
                            )}
                          </td>
                          <td className="py-2 px-4 space-x-2">
                            {!decision || decision === "rejected" ? (
                              <button
                                onClick={() => handleDecision(applicant, "approved")}
                                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                                disabled={!!decision}
                              >
                                Approve
                              </button>
                            ) : null}
                            {!decision || decision === "approved" ? (
                              <button
                                onClick={() => handleDecision(applicant, "rejected")}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                                disabled={!!decision}
                              >
                                Reject
                              </button>
                            ) : null}
                          </td>
                          <td className="py-2 px-4 capitalize text-sm text-gray-300">
                            {decision || "Pending"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;
