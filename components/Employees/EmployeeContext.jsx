import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'HR',
      role: 'HR Manager',
      attendance: 96,
      performance: 8.5,
      leaves: 3,
      salary: 50000,
      documents: ['Resume.pdf'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'IT',
      role: 'Software Engineer',
      attendance: 92,
      performance: 9.1,
      leaves: 1,
      salary: 70000,
      documents: ['Portfolio.pdf'],
    },
    {
      id: 3,
      name: 'David Brown',
      email: 'david@example.com',
      department: 'Finance',
      role: 'Accountant',
      attendance: 88,
      performance: 7.2,
      leaves: 5,
      salary: 45000,
      documents: ['Certificates.pdf'],
    },
  ]);

  // Add employee
  const addEmployee = (employee) => {
    const newEmployee = { ...employee, id: Date.now() };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  // Update employee
  const updateEmployee = (updatedEmp) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    );
  };

  // Delete employee
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
