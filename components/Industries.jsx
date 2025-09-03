import React from 'react';

// Image imports
import img1 from '../assets/1.jpg';
import img2 from '../assets/two.jpg';
import img3 from '../assets/two.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';

const industriesData = [
  { id: '01', title: 'IT & ITES', image: img1 },
  { id: '02', title: 'BFSI', image: img2 },
  { id: '03', title: 'Healthcare', image: img3 },
  { id: '04', title: 'Manufacturing', image: img4 },
  { id: '05', title: 'Oil & Gas', image: img5 },
  { id: '06', title: 'Retail & CPG', image: img6 },
  { id: '07', title: 'Engineering & Utilities', image: img7 },
  { id: '08', title: 'Pharma & Life Sciences', image: img8 },
];

function Industries() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10">Industries We Cover</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {industriesData.map((industry) => (
          <div
            key={industry.id}
            className="relative h-60 rounded-md overflow-hidden bg-cover bg-center group shadow-sm"
            style={{ backgroundImage: `url(${industry.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />

            {/* Content */}
            <div className="absolute bottom-5 left-5 text-white z-10 flex flex-col gap-1">
              <p className="text-sm opacity-80">{industry.id}</p>
              <h3 className="text-lg font-semibold underline underline-offset-4">{industry.title}</h3>
              <a
                href="#"
                className="text-sm font-bold text-red-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300"
              >
                Learn More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Industries;
