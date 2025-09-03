import React, { useState } from "react";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ type: "", from: "", to: "", reason: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      ...form,
      id: Date.now(),
      status: "Pending",
    };
    setLeaves([...leaves, newLeave]);
    setForm({ type: "", from: "", to: "", reason: "" });
  };

  const handleApprove = (id) => {
    setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: "Approved" } : leave));
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Leave Management</h2>

      {/* Leave Request Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded mb-8 shadow-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-semibold">Leave Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select</option>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Vacation">Vacation</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">From</label>
            <input
              type="date"
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">To</label>
            <input
              type="date"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Reason</label>
          <textarea
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold"
        >
          Request Leave
        </button>
      </form>

      {/* Leave Requests Table */}
      <div className="bg-gray-800 p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Leave Requests</h3>
        {leaves.length === 0 ? (
          <p className="text-gray-400">No leave requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-300">
                  <th className="py-2">Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-gray-700">
                    <td className="py-2">{leave.type}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.reason}</td>
                    <td
                      className={`font-bold ${
                        leave.status === "Approved"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td>
                      {leave.status === "Pending" && (
                        <button
                          onClick={() => handleApprove(leave.id)}
                          className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;
