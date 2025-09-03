import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function normalizeToYMD(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  try {
    const d = new Date(value);
    if (!isNaN(d)) return d.toISOString().split("T")[0];
  } catch (e) {}
  const match = value.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

const EMPLOYEE_ID = "EMP-001"; // Make dynamic later if needed

export default function AttendanceTracking() {
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const todayStr = normalizeToYMD(new Date());

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "attendanceRecords");
        const snapshot = await getDocs(colRef);

        const records = {};
        let present = 0;
        let allDates = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.employeeId === EMPLOYEE_ID) {
            allDates.push(data.date);
            if (data.status === "Present") {
              records[data.date] = true;
              present++;
            }
          }
        });

        setAttendanceRecords(records);
        setPresentCount(present);

        // Absent count calculation (past dates only)
        const pastDates = allDates.filter((d) => d < todayStr);
        const uniquePastDates = [...new Set(pastDates)];
        const absent = uniquePastDates.length - present;
        setAbsentCount(absent >= 0 ? absent : 0);
      } catch (err) {
        console.error("Error loading attendance:", err);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, []);

  const canMarkToday = (date) => {
    const dateStr = normalizeToYMD(date);
    return dateStr === todayStr;
  };

  const onDateChange = async (date) => {
    const dateStr = normalizeToYMD(date);
    setSelectedDate(date);

    if (!canMarkToday(date)) return; // Only allow today

    // If already marked as present for today, block
    if (attendanceRecords[dateStr]) {
      alert("Attendance for today is already marked!");
      return;
    }

    const docId = `${EMPLOYEE_ID}_${dateStr}`;
    const docRef = doc(db, "attendanceRecords", docId);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        alert("Attendance for today is already marked!");
        return;
      }

      await setDoc(docRef, {
        employeeId: EMPLOYEE_ID,
        date: dateStr,
        status: "Present",
      });

      setAttendanceRecords((prev) => ({ ...prev, [dateStr]: true }));
      setPresentCount((c) => c + 1);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = normalizeToYMD(date);

      if (dateStr > todayStr) return "bg-gray-300 text-gray-700 rounded-full"; // future dates
      if (attendanceRecords[dateStr]) return "bg-green-500 text-white rounded-full"; // present
      if (dateStr < todayStr) return "bg-red-400 text-white rounded-full"; // absent
    }
    return null;
  };

  if (loading) return <div className="p-6 text-gray-700">Loading attendance...</div>;

  return (
    <div className="p-6 text-gray-800 max-w-md mx-auto">
      <h2 className="text-2xl text-white font-bold mb-4">Attendance Tracking</h2>

      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
        <p><strong>Present Days:</strong> {presentCount}</p>
        <p><strong>Absent Days:</strong> {absentCount}</p>
      </div>

      <Calendar
        onClickDay={onDateChange}
        tileClassName={tileClassName}
        value={selectedDate}
      />

      {selectedDate && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Date: {selectedDate.toDateString()}</h3>
          <p>
            Status: {attendanceRecords[normalizeToYMD(selectedDate)] ? (
              <span className="text-green-600 font-bold">Present</span>
            ) : (
              <span className="text-red-600 font-bold">Absent</span>
            )}
          </p>
          {!canMarkToday(selectedDate) && (
            <p className="text-gray-500 mt-2">Only today's date can be marked present.</p>
          )}
          {canMarkToday(selectedDate) && !attendanceRecords[todayStr] && (
            <p className="text-blue-500 mt-2">Click today to mark present (once only).</p>
          )}
          {canMarkToday(selectedDate) && attendanceRecords[todayStr] && (
            <p className="text-green-500 mt-2">Attendance for today is already marked.</p>
          )}
        </div>
      )}
    </div>
  );
}
