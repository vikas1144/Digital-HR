import React from 'react';
import image from '../assets/image.png';

function Recruitment() {
  return (
    <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] my-12 overflow-hidden">
      {/* Background Image as full cover */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between h-full px-6 sm:px-8 md:px-12 lg:px-20 text-white">
        {/* Left text */}
        <div className="flex-1 max-w-3xl space-y-4
                        text-center font-bold
                        md:text-left md:font-normal">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug md:leading-tight">
            TalentMesh Report: The Current Campus Hiring Trends 2025
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto md:mx-0">
            Talent Mesh supports college campus freshers to get placed in top companies with an online training program.
          </p>
        </div>

        {/* Optional right content space or leave empty */}
        <div className="flex-1 hidden md:block" />
      </div>
    </section>
  );
}

export default Recruitment;
