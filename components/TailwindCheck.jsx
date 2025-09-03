// src/components/TailwindCheck.jsx
import React from 'react';

function TailwindCheck() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Tailwind is Working 🎉</h1>
        <p className="text-gray-600">If you see this styled box, your Tailwind setup is correct.</p>
      </div>
    </div>
  );
}

export default TailwindCheck;
