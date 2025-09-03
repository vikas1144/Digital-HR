import React from 'react';

function SalaryAdministration() {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Salary Administration</h1>

      {/* Action buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold">
          Generate Payslips
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold">
          Upload Salary Sheet
        </button>
      </div>

      {/* Salary Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Base Salary</th>
              <th className="px-4 py-3 text-left">Bonus</th>
              <th className="px-4 py-3 text-left">Deductions</th>
              <th className="px-4 py-3 text-left">Net Pay</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Sample Row */}
            <tr className="border-t border-gray-700">
              <td className="px-4 py-3">Vikas kashyap</td>
              <td className="px-4 py-3">IT</td>
              <td className="px-4 py-3">₹60,000</td>
              <td className="px-4 py-3">₹5,000</td>
              <td className="px-4 py-3">₹2,000</td>
              <td className="px-4 py-3">₹63,000</td>
              <td className="px-4 py-3">
                <button className="text-blue-400 hover:underline">Download</button>
              </td>
            </tr>

            <tr className="border-t border-gray-700">
              <td className="px-4 py-3">Ayushi</td>
              <td className="px-4 py-3">UI/UX Designer</td>
              <td className="px-4 py-3">₹55,000</td>
              <td className="px-4 py-3">₹4,000</td>
              <td className="px-4 py-3">₹2,000</td>
              <td className="px-4 py-3">₹57,000</td>
              <td className="px-4 py-3">
                <button className="text-blue-400 hover:underline">Download</button>
              </td>
            </tr>

            <tr className="border-t border-gray-700">
              <td className="px-4 py-3">Naveen</td>
              <td className="px-4 py-3">IT</td>
              <td className="px-4 py-3">₹60,000</td>
              <td className="px-4 py-3">₹5,000</td>
              <td className="px-4 py-3">₹2,000</td>
              <td className="px-4 py-3">₹63,000</td>
              <td className="px-4 py-3">
                <button className="text-blue-400 hover:underline">Download</button>
              </td>
            </tr>

            <tr className="border-t border-gray-700">
              <td className="px-4 py-3">Aakash</td>
              <td className="px-4 py-3">S/W Tester</td>
              <td className="px-4 py-3">₹50,000</td>
              <td className="px-4 py-3">₹7,000</td>
              <td className="px-4 py-3">₹2,000</td>
              <td className="px-4 py-3">₹55,000</td>
              <td className="px-4 py-3">
                <button className="text-blue-400 hover:underline">Download</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalaryAdministration;
