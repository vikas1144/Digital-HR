// src/attendanceService.js
import { db } from "./firebase";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function markAttendance(employeeId, date, status) {
  const docId = `${employeeId}_${date}`;
  await setDoc(doc(db, "attendance", docId), {
    employeeId,
    date,
    status,
  });
}

export async function fetchAttendance(employeeId) {
  const attendanceRef = collection(db, "attendance");
  const q = query(attendanceRef, where("employeeId", "==", employeeId));
  const snapshot = await getDocs(q);

  const data = [];
  snapshot.forEach(doc => data.push(doc.data()));
  return data;
}
