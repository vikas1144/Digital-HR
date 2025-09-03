import React from 'react';
import { BarChart4, CheckCircle, Users, CalendarClock } from 'lucide-react';

const benefitsData = [
  {
    title: 'Automated Payroll Management',
    icon: CheckCircle,
    description: 'Streamline salary processing with accuracy and compliance.'
  },
  {
    title: 'Advanced Employee Analytics',
    icon: BarChart4,
    description: 'Gain deep insights into employee performance and trends.'
  },
  {
    title: 'Smart Recruitment Tools',
    icon: Users,
    description: 'Efficiently source, track, and hire top talent.'
  },
  {
    title: 'Seamless Leave Tracking',
    icon: CalendarClock,
    description: 'Simplify leave requests, approvals, and balances.'
  }
];

function Benefits() {
  return (
    
    <section className="py-24 px-6 bg-white text-center">
    
      <h2 className="text-4xl font-bold text-blue-900 mb-16">Key Benefits</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {benefitsData.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div
              key={idx}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-500"
            >
              <Icon className="text-blue-600 mb-6 mx-auto" size={40} />
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">{benefit.title}</h3>
              <p className="text-blue-700 text-base leading-relaxed">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Benefits;