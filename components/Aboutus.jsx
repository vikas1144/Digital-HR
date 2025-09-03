import React from 'react';
import CountUp from 'react-countup';
import slider from '../assets/slider.jpg'
import group from '../assets/group.jpg'

const Aboutus = () => {
  return (
    <>
      {/* ABOUT US HEADER */}
      <section className="bg-black text-center py-12 px-6">
        <h5 className="text-gray-400 text-lg mb-2 animate-fade">Our Story</h5>
        <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-up">About Us</h2>
        <div className="w-12 h-1 bg-red-600 mx-auto mt-4 animate-grow"></div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6 animate-fade-up delay-200">
          Welcome to our company! We are committed to delivering the best services to our customers and building lasting relationships.
          Our team is dedicated to innovation and excellence in everything we do.
        </p>
      </section>

      {/* COMPANY STORY */}
      <section className="max-w-screen-xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase text-red-600 text-xs font-semibold mb-2 animate-fade">Trusted by Industry Leaders</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-up">
            Powering HR for <br /> Top Global Organizations
          </h2>
          <p className="text-gray-600 leading-relaxed animate-fade-up delay-200">
            Digital HR is trusted by leading enterprises and forward-thinking businesses around the world
            to transform the way they manage people, processes, and performance. Our robust, paperless HR platform
            enables companies to streamline recruitment, automate employee management, and maintain accurate records effortlessly.
            <br /><br />
            With advanced analytics, real-time data access, and seamless integration capabilities, we help organizations stay ahead in a competitive market.
          </p>
        </div>
        <div className="hidden md:block animate-fade-up">
          <img
            src={slider}
            alt="HR Digital Platform"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
          {[
            {
              title: "Workforce Planning",
              text: "Strategically manage and allocate human resources with precision...",
              icon: "bi bi-bar-chart-line"
            },
            {
              title: "HR Cost Optimization",
              text: "Reduce overhead and improve ROI through smart automation...",
              icon: "bi bi-currency-dollar"
            },
            {
              title: "Performance Analytics",
              text: "Gain actionable insights into employee performance...",
              icon: "bi bi-graph-up"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-up"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white mx-auto mb-4">
                <i className={item.icon}></i>
              </div>
              <h5 className="font-bold text-gray-800 mb-3">{item.title}</h5>
              <p className="text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISION & VALUES */}
      <section className="max-w-screen-xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img src={group} alt="Team" className="rounded-lg shadow-lg animate-fade-up" />
        </div>
        <div>
          <p className="uppercase text-red-600 mb-2 tracking-widest text-sm animate-fade">Driving digital transformation in HR</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-up">Our Vision and Values</h2>
          <ul className="space-y-4">
            {[
              {
                title: "Efficiency through Automation",
                text: "Streamlining HR processes with smart, paperless workflows to save time and resources."
              },
              {
                title: "Transparency and Accountability",
                text: "Providing clear, accessible information to employees and management at every level."
              },
              {
                title: "Scalable and Future-Ready",
                text: "Adapting to the growing needs of organizations with flexible and innovative solutions."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-4 animate-fade-up">
                <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
                    <circle cx="10" cy="10" r="8" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-800">{item.title}</strong>
                  <p className="text-gray-500">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EXPERTISE PROGRESS BARS */}
      <section className="max-w-screen-xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-6">Our Expertise</h4>
          {[
            { label: "Employee Data Management", value: 100 },
            { label: "Recruitment Automation", value: 90 },
            { label: "Performance Tracking", value: 80 },
            { label: "Analytics & Reporting", value: 80 }
          ].map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-800">{item.label}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full animate-progress"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="uppercase text-red-600 text-sm mb-2 tracking-widest">Delivering next-gen HR solutions</p>
          <h2 className="text-3xl font-bold text-gray-900">
            We specialize in creating intelligent, automated, and secure HR systems that streamline workflows, improve decision-making, and empower organizations to focus on people, not paperwork.
          </h2>
        </div>
      </section>

      {/* STATS WITH COUNTUP */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: 5000, label: "EMPLOYEE PROFILES MANAGED" },
            { number: 2500, label: "JOBS POSTED THIS YEAR" },
            { number: 1200, label: "SUCCESSFUL HIRINGS" },
            { number: 98, label: "DATA ACCURACY RATE", suffix: "%" }
          ].map((item, index) => (
            <div key={index} className="animate-fade-up">
              <h2 className="text-4xl font-bold text-gray-900">
                <CountUp end={item.number} duration={2.5} suffix={item.suffix || ""} />
              </h2>
              <p className="text-red-600 font-semibold text-sm mt-2">{item.label}</p>
              <div className="w-12 h-1 bg-red-600 mx-auto mt-2"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Aboutus;
