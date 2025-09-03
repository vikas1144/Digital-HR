import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

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
            {employees.map((emp, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{emp.fullName}</td>
                <td className="py-2 px-4">{emp.email}</td>
                <td className="py-2 px-4">{emp.jobRole}</td>
                <td className="py-2 px-4">
                  <a
                    href={emp.resumeUrl}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
                <td className="py-2 px-4">
                  {new Date(emp.joinedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDirectory;
