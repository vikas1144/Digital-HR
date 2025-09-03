import React, { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const baseSalary = 50000;

  // Approve applicant → Add to employees & salary records
  const approveEmployee = (employeeData) => {
    const newEmployee = {
      id: employees.length + 1,
      ...employeeData,
      joinedDate: new Date().toISOString(),
      baseSalary,
    };
    setEmployees([...employees, newEmployee]);
    setSalaries([
      ...salaries,
      { employeeId: newEmployee.id, employeeName: newEmployee.fullName, month: "August 2025", amount: baseSalary, status: "Pending" }
    ]);
  };

  // Mark attendance
  const markAttendance = (employeeId, status) => {
    const record = {
      id: attendance.length + 1,
      employeeId,
      employeeName: employees.find(e => e.id === employeeId)?.fullName || "",
      date: new Date().toLocaleDateString(),
      status,
    };
    setAttendance([...attendance, record]);
  };

  // Deduct salary for leave
  const deductSalaryForLeave = (employeeId, days) => {
    setSalaries(prev =>
      prev.map(s =>
        s.employeeId === employeeId
          ? { ...s, amount: s.amount - (s.amount / 30) * days }
          : s
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        salaries,
        attendance,
        approveEmployee,
        markAttendance,
        deductSalaryForLeave,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
