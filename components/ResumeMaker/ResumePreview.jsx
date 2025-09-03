import { forwardRef } from "react"

const ResumePreview = forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} className="bg-white p-8 shadow-lg max-w-4xl mx-auto text-black print:shadow-none">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.fullName || "Your Name"}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          {formData.email && <div>Email: {formData.email}</div>}
          {formData.phone && <div>Phone: {formData.phone}</div>}
          {formData.address && <div>Address: {formData.address}</div>}
          <div className="flex justify-center gap-4 mt-2">
            {formData.linkedin && <span>LinkedIn: {formData.linkedin}</span>}
            {formData.github && <span>GitHub: {formData.github}</span>}
            {formData.portfolio && <span>Portfolio: {formData.portfolio}</span>}
          </div>
        </div>
      </div>

      {/* Career Objective */}
      {formData.objective && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Career Objective</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{formData.objective}</p>
        </div>
      )}

      {/* Education */}
      {(formData.education.degree || formData.education.institution) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Education</h2>
          <div className="text-sm">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="font-semibold">{formData.education.degree}</div>
                <div className="text-gray-600">{formData.education.institution}</div>
              </div>
              <div className="text-gray-600">
                {formData.education.startDate} - {formData.education.endDate}
              </div>
            </div>
            {formData.education.percentage && (
              <div className="text-gray-600">Grade: {formData.education.percentage}</div>
            )}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {(formData.experience.company || formData.experience.role) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
          <div className="text-sm">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="font-semibold">{formData.experience.role}</div>
                <div className="text-gray-600">{formData.experience.company}</div>
              </div>
              <div className="text-gray-600">
                {formData.experience.startDate} - {formData.experience.endDate}
              </div>
            </div>
            {formData.experience.description && (
              <p className="text-gray-700 mt-2 leading-relaxed">{formData.experience.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="text-sm text-gray-700">
            {formData.skills.split(",").map((skill, index) => (
              <span key={index} className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-2">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {(formData.project.title || formData.project.description) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Projects</h2>
          <div className="text-sm">
            <div className="font-semibold mb-1">{formData.project.title}</div>
            {formData.project.technologies && (
              <div className="text-gray-600 mb-2">Technologies: {formData.project.technologies}</div>
            )}
            {formData.project.description && (
              <p className="text-gray-700 mb-2 leading-relaxed">{formData.project.description}</p>
            )}
            {formData.project.link && <div className="text-blue-600">Link: {formData.project.link}</div>}
          </div>
        </div>
      )}

      {/* Certifications */}
      {(formData.certification.title || formData.certification.issuer) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Certifications</h2>
          <div className="text-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{formData.certification.title}</div>
                <div className="text-gray-600">{formData.certification.issuer}</div>
              </div>
              <div className="text-gray-600">{formData.certification.date}</div>
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      {formData.languages && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">Languages</h2>
          <p className="text-sm text-gray-700">{formData.languages}</p>
        </div>
      )}

      {/* Hobbies */}
      {formData.hobbies && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Hobbies & Interests
          </h2>
          <p className="text-sm text-gray-700">{formData.hobbies}</p>
        </div>
      )}
    </div>
  )
})

ResumePreview.displayName = "ResumePreview"

export default ResumePreview
