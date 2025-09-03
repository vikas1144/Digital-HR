import React from 'react';
import {
  Bar,
  Line,
  Doughnut,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function ReportAnalytics() {
  // Sample data
  const totalEmployees = 1250;
  const monthlyAttendance = '96%';
  const salaryProcessed = '₹1.2 Cr';
  const leavesTaken = 320;

  const departmentStats = {
    'IT Department': 520,
    'HR Department': 130,
    Operations: 340,
    'Sales & Marketing': 260,
  };

  const employeePerformance = {
    labels: ['John', 'Alice', 'Bob', 'Priya', 'Ahmed'],
    datasets: [
      {
        label: 'Performance Score',
        data: [85, 92, 78, 88, 91],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 5,
      },
    ],
  };

  const attendanceTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [93, 95, 97, 94, 96, 98],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const salaryBreakdown = {
    labels: ['Processed', 'Pending'],
    datasets: [
      {
        data: [92, 8],
        backgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen space-y-8">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Employees" value={totalEmployees} />
        <Card title="Monthly Attendance" value={monthlyAttendance} />
        <Card title="Salary Processed" value={salaryProcessed} />
        <Card title="Leaves Taken" value={leavesTaken} />
      </div>

      {/* Department Breakdown */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Department-wise Breakdown</h2>
        <ul className="space-y-3 text-sm">
          {Object.entries(departmentStats).map(([dept, count]) => (
            <li key={dept} className="flex justify-between border-b border-gray-700 pb-2">
              <span>{dept}</span>
              <span>{count} Employees</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Employee Performance</h2>
          <Bar data={employeePerformance} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Attendance Trends</h2>
          <Line data={attendanceTrends} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Salary Breakdown</h2>
          <Doughnut data={salaryBreakdown} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-sm text-gray-400">{title}</h2>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default ReportAnalytics;
