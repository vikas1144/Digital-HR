import React from 'react'
import CountUp from 'react-countup'

function Records() {
  const metrics = [
    { id: "01", value: 24000, label: "SUCCESSFUL PLACEMENTS" },
    { id: "02", value: 300, label: "SPECIALIST RECRUITERS" },
    { id: "03", value: 100, label: "CLIENTS" },
    { id: "04", value: 15, label: "YEARS OF LEGACY" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex justify-center items-center">
      <div className="container px-4 md:px-6 text-center max-w-7xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-16">
          Recruitment Solutions Across Industries and Functions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex flex-col items-center p-4">
              <span className="text-gray-500 text-sm font-medium mb-1">{metric.id}</span>
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">
                <CountUp end={metric.value} duration={2} separator="," />+
              </h3>
              <p className="text-base font-semibold text-gray-700 uppercase tracking-widest mb-3">
                {metric.label}
              </p>
              <div className="w-20 h-1 bg-orange-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Records

