import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // your firebase config file
import { collection, addDoc, getDocs } from "firebase/firestore";

// List of predefined holidays
const predefinedHolidays = [
  { title: "New Year", date: "2025-01-01" },
  { title: "Republic Day", date: "2025-01-26" },
  { title: "Independence Day", date: "2025-08-15" },
  { title: "Gandhi Jayanti", date: "2025-10-02" },
];

function LeaveManagement() {
  const [leaveEvents, setLeaveEvents] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("Sick");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [monthlyHolidayCount, setMonthlyHolidayCount] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("2025-08"); // Default: August 2025
  const leaveCollectionRef = collection(db, "leaveEvents");

  // Load leave events from Firestore on component mount
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const querySnapshot = await getDocs(leaveCollectionRef);
        const leaves = [];
        querySnapshot.forEach((doc) => {
          leaves.push(doc.data());
        });
        setLeaveEvents(leaves);
      } catch (error) {
        console.error("Error fetching leave events from Firestore:", error);
      }
    };

    fetchLeaves();
  }, []);

  // Count holidays per month
  useEffect(() => {
    const countByMonth = {};
    predefinedHolidays.forEach((holiday) => {
      const month = holiday.date.slice(0, 7);
      countByMonth[month] = (countByMonth[month] || 0) + 1;
    });
    setMonthlyHolidayCount(countByMonth);
  }, []);

  // Submit leave form and save to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const events = [];

    while (from <= to) {
      const isoDate = from.toISOString().split("T")[0];
      events.push({
        title: `${employeeName} - ${leaveType}`,
        date: isoDate,
      });
      from.setDate(from.getDate() + 1);
    }

    try {
      // Save each leave event to Firestore
      for (const event of events) {
        await addDoc(leaveCollectionRef, event);
      }
      // Update local state after successful save
      setLeaveEvents((prev) => [...prev, ...events]);
      setEmployeeName("");
      setLeaveType("Sick");
      setFromDate("");
      setToDate("");
    } catch (error) {
      console.error("Error saving leave events:", error);
    }
  };

  // Render calendar grid
  const renderCalendar = () => {
    const [year, month] = selectedMonth.split("-");
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const calendar = [];
    let day = 1;

    for (let week = 0; week < 6; week++) {
      const row = [];
      for (let d = 0; d < 7; d++) {
        if (week === 0 && d < startDayOfWeek) {
          row.push(<td key={d}></td>);
        } else if (day > daysInMonth) {
          row.push(<td key={d}></td>);
        } else {
          const currentDate = `${selectedMonth}-${String(day).padStart(2, "0")}`;

          const holiday = predefinedHolidays.find((h) => h.date === currentDate);
          const leave = leaveEvents.find((l) => l.date === currentDate);

          row.push(
            <td
              key={d}
              className={`border p-2 h-24 align-top text-black ${
                holiday ? "bg-red-100 text-red-700 font-semibold" : ""
              } ${leave ? "bg-blue-100" : ""}`}
            >
              <div className="text-sm font-medium">{day}</div>
              {holiday && <div className="text-xs">{holiday.title}</div>}
              {leave && <div className="text-xs text-blue-700">{leave.title}</div>}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={week}>{row}</tr>);
    }

    return calendar;
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl text-white font-bold mb-4">Leave Management</h2>

      {/* Leave Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 text-black">
        <h3 className="text-lg font-semibold mb-2">Request Leave</h3>
        <input
          type="text"
          placeholder="Employee Name"
          className="border p-2 w-full mb-2 text-black"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
        <select
          className="border p-2 w-full mb-2 text-black"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="Sick">Sick</option>
          <option value="Casual">Casual</option>
          <option value="Earned">Earned</option>
        </select>
        <div className="flex gap-4">
          <input
            type="date"
            className="border p-2 w-full text-black"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
          <input
            type="date"
            className="border p-2 w-full text-black"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
        >
          Submit Leave
        </button>
      </form>

      {/* Monthly Holiday Summary */}
      <div className="bg-white shadow p-4 rounded mb-6 text-black">
        <h3 className="text-lg font-semibold mb-2">Monthly Holiday Count</h3>
        <ul className="list-disc ml-6">
          {Object.entries(monthlyHolidayCount).map(([month, count]) => (
            <li key={month}>
              {month}: <span className="font-semibold">{count}</span> Holidays
            </li>
          ))}
        </ul>
      </div>

      {/* Custom Calendar */}
      <div className="bg-white shadow p-4 rounded text-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Calendar</h3>
          <input
            type="month"
            className="border p-2 text-black"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-black">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th key={day} className="p-2 border text-sm font-medium">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveManagement;
