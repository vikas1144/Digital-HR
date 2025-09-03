import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = { title: jobTitle, description: jobDesc };

    // Get existing jobs from localStorage or default to empty array
    const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Add the new job to the list
    existingJobs.push(newJob);

    // Save back to localStorage
    localStorage.setItem('jobs', JSON.stringify(existingJobs));

    // Redirect to Jobs page
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Post a Job</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Job Description</label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
