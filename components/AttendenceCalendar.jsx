// src/components/AttendanceCalendar.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchAttendance, markAttendance } from "../attendanceService";

function AttendanceCalendar({ employeeId }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load attendance on mount
  useEffect(() => {
    async function load() {
      const data = await fetchAttendance(employeeId);
      setAttendanceData(data);
      setLoading(false);
    }
    load();
  }, [employeeId]);

  // Mark attendance today as "Present" (example)
  const markTodayPresent = async () => {
    const today = new Date().toISOString().slice(0, 10);
    await markAttendance(employeeId, today, "Present");
    // Reload attendance after marking
    const data = await fetchAttendance(employeeId);
    setAttendanceData(data);
  };

  const attendanceMap = {};
  attendanceData.forEach(({ date, status }) => {
    attendanceMap[date] = status;
  });

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().slice(0, 10);
      const status = attendanceMap[dateStr];
      if (!status) return null;

      const color =
        status === "Present"
          ? "green"
          : status === "Absent"
          ? "red"
          : status === "Leave"
          ? "orange"
          : "gray";

      return (
        <div
          style={{
            height: 10,
            width: 10,
            borderRadius: "50%",
            backgroundColor: color,
            margin: "0 auto",
            marginTop: 2,
          }}
          title={status}
        />
      );
    }
    return null;
  };

  if (loading) return <div>Loading attendance...</div>;

  return (
    <div>
      <button
        onClick={markTodayPresent}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Mark Today Present
      </button>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default AttendanceCalendar;
