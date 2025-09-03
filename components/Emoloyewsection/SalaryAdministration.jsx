import React, { useEffect, useState } from "react";
import axios from "axios";

function SalaryAdministration() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rough salary history for Current Employee only
  const roughSalaryHistory = [
    {
      id: "sal006",
      employeeName: "Current Employee",
      month: "July 2025",
      amount: 30000,
      status: "Paid",
    },
    {
      id: "sal007",
      employeeName: "Current Employee",
      month: "June 2025",
      amount: 30000,
      status: "Paid",
    },
  ];

  useEffect(() => {
    axios
      .get("/api/salaries")
      .then((response) => {
        let data = response.data;
        let salariesArray = [];

        if (Array.isArray(data)) {
          salariesArray = data;
        } else if (Array.isArray(data.salaries)) {
          salariesArray = data.salaries;
        } else {
          console.error("Unexpected response format:", data);
        }

        // Filter only current employee salaries from fetched data
        const currentEmployeeSalaries = salariesArray.filter(
          (sal) => sal.employeeName === "Current Employee"
        );

        // Current employee salary record to add
        const currentEmployeeNewSalary = {
          id: "new-001",
          employeeName: "Current Employee",
          month: "August 2025",
          amount: 30000,
          status: "Pending",
        };

        // Combine rough history, fetched filtered data, and new salary
        const combinedSalaries = [
          ...roughSalaryHistory,
          ...currentEmployeeSalaries,
          currentEmployeeNewSalary,
        ];

        setSalaries(combinedSalaries);
      })
      .catch((error) => {
        console.error("Error fetching salary data:", error);

        // If fetch fails, show rough history + current salary only
        setSalaries([
          ...roughSalaryHistory,
          {
            id: "new-001",
            employeeName: "Current Employee",
            month: "August 2025",
            amount: 30000,
            status: "Pending",
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <div className="p-6 text-black">Loading salary data...</div>;
  }

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl text-white font-bold mb-4">Salary Administration</h2>
      <div className="overflow-x-auto">
        {salaries.length === 0 ? (
          <p className="text-black">No salary records found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md text-black">
            <thead>
              <tr className="bg-gray-100 text-black text-left">
                <th className="py-2 px-4 border-b">Employee</th>
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary, index) => (
                <tr key={salary.id || index} className="text-black">
                  <td className="py-2 px-4 border-b">{salary.employeeName}</td>
                  <td className="py-2 px-4 border-b">{salary.month}</td>
                  <td className="py-2 px-4 border-b">{formatCurrency(salary.amount)}</td>
                  <td
                    className={`py-2 px-4 border-b font-medium ${
                      salary.status === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {salary.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SalaryAdministration;
