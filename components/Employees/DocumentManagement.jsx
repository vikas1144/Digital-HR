import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyDocuments = [
  { id: 1, employee: "John Doe", type: "Resume", uploadedOn: "2025-08-05" },
  { id: 2, employee: "Jane Smith", type: "ID Proof", uploadedOn: "2025-08-03" },
  { id: 3, employee: "Mark Lee", type: "Offer Letter", uploadedOn: "2025-08-01" },
];

function DocumentManagement() {
  const [documents, setDocuments] = useState(dummyDocuments);

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // Dummy logic for uploading
    alert("Document uploaded successfully (simulation)");
  };

  const data = {
    labels: documents.map((doc) => doc.employee),
    datasets: [
      {
        label: "Documents Uploaded",
        data: documents.map(() => 1),
        backgroundColor: "#8b5cf6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Documents Uploaded by Employees" },
    },
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Document Management</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-10">
        <Bar data={data} options={options} />
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-purple-700 text-left text-sm uppercase">
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Document Type</th>
              <th className="px-4 py-3">Uploaded On</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="border-t border-gray-700 text-sm hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2">{doc.employee}</td>
                <td className="px-4 py-2">{doc.type}</td>
                <td className="px-4 py-2">{doc.uploadedOn}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-400 hover:underline mr-3">View</button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>
        <form className="space-y-4 bg-gray-800 p-4 rounded" onSubmit={handleUpload}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Employee Name"
              className="p-2 rounded bg-gray-700 text-white w-full md:w-1/3"
              required
            />
            <input
              type="text"
              placeholder="Document Type"
              className="p-2 rounded bg-gray-700 text-white w-full md:w-1/3"
              required
            />
            <input
              type="file"
              className="p-2 bg-gray-700 text-white w-full md:w-1/3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
          >
            Upload Document
          </button>
        </form>
      </div>
    </div>
  );
}

export default DocumentManagement;