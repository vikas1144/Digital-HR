import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "employees"), orderBy("joinedDate", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const empList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Normalize data fields if necessary
          const fullName = data.fullName || data.fullname || "N/A";
          const email = data.email || "N/A";
          const jobRole = data.jobRole || data.jobrole || "N/A";

          // Handle joinedDate safely
          let joinedDate = "N/A";
          if (data.joinedDate?.toDate) {
            joinedDate = data.joinedDate.toDate().toLocaleDateString();
          } else if (data.joinedDate) {
            // If it's a timestamp in milliseconds or ISO string
            const dateObj = new Date(data.joinedDate);
            if (!isNaN(dateObj)) joinedDate = dateObj.toLocaleDateString();
          }

          // Resume handling
          const resume = data.resume && typeof data.resume === "object" ? data.resume : null;

          empList.push({
            id: doc.id,
            fullName,
            email,
            jobRole,
            joinedDate,
            resume,
          });
        });

        console.log("Fetched Employees:", empList);
        setEmployees(empList);
      },
      (error) => {
        console.error("Error fetching employees:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Employee Directory</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="py-2 px-4 text-left">Full Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Job Role</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="py-2 px-4 text-blue-900">{emp.fullName}</td>
                  <td className="py-2 px-4 text-blue-900">{emp.email}</td>
                  <td className="py-2 px-4 text-blue-900">{emp.jobRole}</td>
                  <td className="py-2 px-4 text-blue-900">
                    {emp.resume?.content ? (
                      <a
                        href={emp.resume.content}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td className="py-2 px-4 text-blue-900">{emp.joinedDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
