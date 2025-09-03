import React from 'react';

function Outcomes() {
  const outcomes = [
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/DIGITAL-ANALYTICS-E-COMMERCE-2.gif',
      label: 'Digital, Analytics, and E-commerce',
    },
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/FINANCE.gif',
      label: 'Finance',
    },
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/INFORMATION-TECHNOLOGY.gif',
      label: 'Information Technology',
    },
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/RISK-AND-AUDIT.gif',
      label: 'Risk and Audit',
    },
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/SALES-MARKETING.gif',
      label: 'Sales & Marketing',
    },
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/PROCUREMENT-SUPPLY-CHAIN.gif',
      label: 'Procurement & Supply Chain',
    },
    {
      icon: 'https://kezanconsulting.com/wp-content/uploads/2024/08/HR-MARKETING.gif',
      label: 'Human Resources',
    },
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white py-16 px-4">
      <div className="text-center max-w-6xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What Makes Our Application Deliver Outstanding Outcomes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {outcomes.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <img
                src={item.icon}
                alt={item.label}
                title={item.label}
                width={80}
                height={80}
                className="object-contain"
              />
              <p className="text-base font-medium text-gray-700 text-center px-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Outcomes;
