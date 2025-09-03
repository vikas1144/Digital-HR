import React, { useEffect, useState } from 'react';

const staticJobs = [
  {
    title: 'Sr. Java Backend Engineer',
    company: 'Technology Experts',
    type: 'Full Time',
    location: 'Ahmedabad, India',
    description:
      'We are seeking a Senior Java Backend Engineer with experience in Spring Boot and microservices. Responsibilities include designing scalable APIs, optimizing performance, and collaborating with cross-functional teams.',
  },
  {
    title: 'Product Owner',
    company: 'Technology Experts',
    type: 'Full Time',
    location: 'Abu Dhabi, UAE',
    description:
      'You will define product vision, collaborate with stakeholders, and prioritize product features to maximize business value. Prior experience in agile environments preferred.',
  },
  {
    title: 'Java Backend Engineer',
    company: 'Technology Experts',
    type: 'Full Time',
    location: 'Ahmedabad, India',
    description:
      'You will develop and maintain Java-based backend systems, ensuring high performance and scalability.',
  },
  {
    title: 'Frontend Developer',
    company: 'CodeCrafters Inc.',
    type: 'Part Time',
    location: 'Bangalore, India',
    description:
      'Create stunning and responsive user interfaces using React. Collaborate with designers and backend teams.',
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Labs',
    type: 'Remote',
    location: 'New York, USA',
    description:
      'Design engaging and intuitive user experiences for web and mobile apps. Experience with Figma or Adobe XD preferred.',
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudNet Solutions',
    type: 'Full Time',
    location: 'Pune, India',
    description:
      'Manage CI/CD pipelines, cloud infrastructure, and ensure system availability. AWS/GCP knowledge is a plus.',
  },
  {
    title: 'Project Manager',
    company: 'GlobalTech',
    type: 'Contract',
    location: 'London, UK',
    description:
      'Oversee software projects from concept to delivery. Strong communication and leadership skills required.',
  },
  {
    title: 'QA Analyst',
    company: 'Testify Co.',
    type: 'Full Time',
    location: 'Hyderabad, India',
    description:
      'Design and execute test plans, track bugs, and ensure high-quality product delivery. Manual + Automation experience preferred.',
  },
  {
    title: 'AI/ML Researcher',
    company: 'Neural Networks Inc.',
    type: 'Remote',
    location: 'Berlin, Germany',
    description:
      'Conduct cutting-edge research in AI/ML. Publish papers and implement state-of-the-art models.',
  },
  {
    title: 'Technical Writer',
    company: 'Docsify',
    type: 'Freelance',
    location: 'Chennai, India',
    description:
      'Create and maintain documentation for software products. Clear and concise writing style essential.',
  },
];

function Jobs() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('jobs')) || [];
    setPostedJobs(stored);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedJobs = postedJobs.filter((_, idx) => idx !== indexToDelete);
    setPostedJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const handleApply = (job) => {
    setCurrentJob(job);
    setShowModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setApplicantData((prev) => ({
        ...prev,
        resume: {
          name: file.name,
          content: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitApplication = () => {
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];

    const newApplicant = {
      ...applicantData,
      jobTitle: currentJob.title,
      jobCompany: currentJob.company || 'Admin Posted Job',
    };

    localStorage.setItem('applicants', JSON.stringify([...applicants, newApplicant]));

    setApplicantData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
    });
    setShowModal(false);
    alert('Application submitted successfully!');
  };

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-black text-white py-16 px-8">
        <h1 className="text-6xl font-bold">Jobs</h1>
        <div className="mt-2 w-12 h-1 bg-orange-500" />
      </div>

      {/* Job Cards */}
      <div className="bg-white py-10 px-4 md:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static Jobs */}
          {staticJobs.map((job, index) => (
            <div
              key={`static-${index}`}
              className="border rounded-md p-6 hover:shadow-md transition"
            >
              <h2 className="font-bold text-xl mb-2">{job.title}</h2>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-700">{job.type}</p>
              <p className="text-gray-700">{job.location}</p>

              <button
                onClick={() => toggleDetails(index)}
                className="text-sm text-blue-600 mt-2 hover:underline"
              >
                {expandedIndex === index ? 'Hide Details ↑' : 'More Details ↓'}
              </button>

              {expandedIndex === index && (
                <p className="mt-2 text-gray-800">{job.description}</p>
              )}

              <button
                onClick={() => handleApply(job)}
                className="mt-3 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          ))}

          {/* Posted Jobs */}
          {postedJobs.map((job, index) => (
            <div
              key={`posted-${index}`}
              className="border rounded-md p-6 bg-blue-50 hover:shadow-md transition relative"
            >
              <h2 className="font-bold text-xl mb-2">{job.title}</h2>
              <p className="text-gray-700 font-medium">Posted by Admin</p>
              <p className="text-gray-700">{job.type || 'Full Time'}</p>
              <p className="text-gray-700">{job.location || 'N/A'}</p>

              <button
                onClick={() => toggleDetails(index + 100)}
                className="text-sm text-blue-600 mt-2 hover:underline"
              >
                {expandedIndex === index + 100 ? 'Hide Details ↑' : 'More Details ↓'}
              </button>

              {expandedIndex === index + 100 && (
                <p className="mt-2 text-gray-800">{job.description}</p>
              )}

              <button
                onClick={() => handleDelete(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => handleApply(job)}
                className="mt-3 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Apply for {currentJob?.title}</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={applicantData.name}
              onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
              className="w-full border px-4 py-2 rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={applicantData.email}
              onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
              className="w-full border px-4 py-2 rounded-md mb-3"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={applicantData.phone}
              onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
              className="w-full border px-4 py-2 rounded-md mb-3"
            />



              <div className="flex items-center gap-3 mb-3">
  {/* Upload Resume Button */}
  <label
    htmlFor="resumeUpload"
    className="text-black px-4 py-2 rounded-md cursor-pointer inline-block border border-black"
  >
    Upload Resume
  </label>
  <input
    id="resumeUpload"
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={handleFileUpload}
    className="hidden"
  />

  {/* Create Resume Button */}
  <button
    onClick={() => window.location.href = '/resume'} // Change this route if your Resume Maker is different
    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
  >
    Create Resume
  </button>
</div>





            <textarea
              placeholder="Cover Letter (Optional)"
              value={applicantData.coverLetter}
              onChange={(e) => setApplicantData({ ...applicantData, coverLetter: e.target.value })}
              className="w-full border px-4 py-2 rounded-md mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
