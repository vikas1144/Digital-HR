import React, { useState } from "react";
import EmployeeDirectory from "./EmployeeDirectory";

// import AddEditEmployee from "./AddEditEmployee"; // If you want more tabs later

const EmployeeSection = () => {
  const [tab, setTab] = useState("directory");

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("directory")}
          className={`px-4 py-2 rounded ${
            tab === "directory" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Employee Directory
        </button>
        {/* More tabs like Add/Edit can go here */}
      </div>

      {tab === "directory" && <EmployeeDirectory />}
      {/* {tab === "addedit" && <AddEditEmployee />} */}
    </div>
  );
};

export default EmployeeSection;
