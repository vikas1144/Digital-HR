import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const dummyData = [
  { id: 1, name: "John Doe", date: "2025-08-06", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "Present" },
  { id: 2, name: "Jane Smith", date: "2025-08-06", checkIn: "09:15 AM", checkOut: "05:00 PM", status: "Present" },
  { id: 3, name: "Mark Lee", date: "2025-08-06", checkIn: "--", checkOut: "--", status: "Absent" },
  { id: 4, name: "Mary Ann", date: "2025-08-06", checkIn: "08:45 AM", checkOut: "04:50 PM", status: "Present" },
];

function AttendanceTracking() {
  const [data, setData] = useState(dummyData);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    const present = data.filter((d) => d.status === "Present").length;
    const absent = data.length - present;
    setPresentCount(present);
    setAbsentCount(absent);
  }, [data]);

  const chartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance Overview",
        data: [presentCount, absentCount],
        backgroundColor: ["#10B981", "#EF4444"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Attendance Tracking</h1>

      {/* Attendance Chart */}
      <div className="mb-8 max-w-md">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>

      {/* Table View */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-purple-700 text-left text-sm uppercase">
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Check-In</th>
              <th className="px-4 py-3">Check-Out</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id} className="border-t border-gray-700 text-sm hover:bg-gray-700 transition">
                <td className="px-4 py-2">{record.name}</td>
                <td className="px-4 py-2">{record.date}</td>
                <td className="px-4 py-2">{record.checkIn}</td>
                <td className="px-4 py-2">{record.checkOut}</td>
                <td className={`px-4 py-2 font-semibold ${record.status === "Present" ? "text-green-400" : "text-red-400"}`}>
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTracking;
