import React from 'react';
import { Briefcase, CalendarCheck, Lock, UserPlus, CheckCircle } from 'lucide-react';

const ModuleCard = ({ icon: Icon, title, subtitle, description, points }) => (
  <div className="bg-white border border-blue-200 rounded-xl shadow-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full max-w-3xl">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-blue-100 text-blue-600 p-4 rounded-xl shadow-sm">
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-blue-900">{title}</h3>
        <p className="text-sm text-blue-500">{subtitle}</p>
      </div>
    </div>
    <p className="text-blue-700 mb-4">{description}</p>
    <ul className="space-y-2 text-blue-800">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <CheckCircle size={20} className="mt-0.5 text-blue-600" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

function Modules() {
  return (
    <section id="modules" className="bg-gradient-to-br from-white to-blue-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">Core Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-stretch">
          <ModuleCard
            icon={Briefcase}
            title="Job Seekers Management"
            subtitle="Connect talent with opportunities"
            description="Comprehensive talent acquisition platform connecting job seekers with competitive career opportunities across industries."
            points={[
              'Advanced Job Search & Filtering',
              'One-Click Application System',
              'Career Profile Management',
              'Real-time Application Tracking',
            ]}
          />
          <ModuleCard
            icon={CalendarCheck}
            title="Dynamic Events Management"
            subtitle="Intelligent event management"
            description="Smart event management ecosystem with real-time updates, automated notifications, and comprehensive participation tracking."
            points={[
              'Smart Event Creation & Scheduling',
              'Real-time Participation Tracking',
              'Automated Notifications',
              'Interactive Event Dashboard',
            ]}
          />
          <ModuleCard
            icon={Lock}
            title="Employee Authentication & Login"
            subtitle="Secure access management for all employees"
            description="Advanced authentication system with multi-layer security ensuring safe employee access with personalized credentials."
            points={[
              'Unique Employee Login ID Generation',
              'Advanced Password Protection',
              'Role-based Access Control',
              'Two-Factor Authentication',
            ]}
          />
          <ModuleCard
            icon={UserPlus}
            title="Employee Registration"
            subtitle="Streamlined onboarding process"
            description="Intelligent registration system with automated workflows for seamless employee onboarding and credential management."
            points={[
              'Instant Employee Onboarding',
              'Automated ID & Password Generation',
              'Digital Document Management',
              'Smart Profile Creation',
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default Modules;
