"use client"

import { useState, useRef } from "react"
import ResumePreview from "./ResumePreview"

const ResumeMaker = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    objective: "",
    education: { degree: "", institution: "", startDate: "", endDate: "", percentage: "" },
    experience: { company: "", role: "", startDate: "", endDate: "", description: "" },
    skills: "",
    project: { title: "", description: "", technologies: "", link: "" },
    certification: { title: "", issuer: "", date: "" },
    languages: "",
    hobbies: "",
  })

  const handleChange = (e, section, field) => {
    if (section && field) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: e.target.value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const previewRef = useRef(null)

  const handlePrint = () => {
    if (previewRef.current) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print {
                  body { margin: 0; }
                  .print\\:shadow-none { box-shadow: none !important; }
                }
              </style>
            </head>
            <body>
              ${previewRef.current.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
      }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Resume Builder</h2>
          <div className="space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="github"
                    placeholder="GitHub URL"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="portfolio"
                  placeholder="Portfolio URL"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Career Objective */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Career Objective</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  name="objective"
                  placeholder="Write your career objective..."
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Degree"
                    onChange={(e) => handleChange(e, "education", "degree")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Institution"
                    onChange={(e) => handleChange(e, "education", "institution")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Start Date"
                    onChange={(e) => handleChange(e, "education", "startDate")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="End Date"
                    onChange={(e) => handleChange(e, "education", "endDate")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Percentage/CGPA</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Percentage/CGPA"
                  onChange={(e) => handleChange(e, "education", "percentage")}
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Work Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company"
                    onChange={(e) => handleChange(e, "experience", "company")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Role"
                    onChange={(e) => handleChange(e, "experience", "role")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Start Date"
                    onChange={(e) => handleChange(e, "experience", "startDate")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="End Date"
                    onChange={(e) => handleChange(e, "experience", "endDate")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  placeholder="Job description and achievements"
                  onChange={(e) => handleChange(e, "experience", "description")}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Skills</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="skills"
                  placeholder="Comma separated skills"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Project Title"
                    onChange={(e) => handleChange(e, "project", "title")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Technologies Used"
                    onChange={(e) => handleChange(e, "project", "technologies")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  placeholder="Project description"
                  onChange={(e) => handleChange(e, "project", "description")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project URL"
                  onChange={(e) => handleChange(e, "project", "link")}
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Certification Title"
                    onChange={(e) => handleChange(e, "certification", "title")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Issuing Organization"
                    onChange={(e) => handleChange(e, "certification", "issuer")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Issue Date"
                  onChange={(e) => handleChange(e, "certification", "date")}
                />
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Languages</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="languages"
                  placeholder="Languages Known"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Hobbies */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600 border-b border-gray-200 pb-2">Hobbies</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="hobbies"
                  placeholder="Your hobbies and interests"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ResumePreview ref={previewRef} formData={formData} />
          <button
            onClick={handlePrint}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeMaker
