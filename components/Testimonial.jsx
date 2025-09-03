import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "Senior Marketing Manager",
    image:
      "https://kezanconsulting.com/wp-content/uploads/2021/02/portrait05-150x150.jpg",
    message:
      "TalentMesh has been instrumental in advancing my career to the international stage. Their personalized approach and deep understanding of global job markets helped me secure a pivotal role in a leading multinational corporation. I am grateful for their expertise and commitment to my professional growth."
  },
  {
    name: "Priya Patel",
    position: "HR Specialist",
    image:
      "https://kezanconsulting.com/wp-content/uploads/2024/09/female-150x150.jpg",
    message:
      "Working with TalentMesh was a game-changer for me. They provided exceptional support in navigating the complexities of international job placements. Their team’s dedication and thorough guidance made my transition seamless and successful. Highly recommended!"
  },
  {
    name: "Animesh Singh",
    position: "Business Development Executive",
    image:
      "https://kezanconsulting.com/wp-content/uploads/2020/10/P3-150x150.jpg",
    message:
      "TalentMesh exceeded my expectations with their international job placement services. Their professional network and tailored approach helped me find a role that perfectly aligns with my career goals. I couldn’t have asked for a better partner in my job search."
  },
  {
    name: "Ritika Yadav",
    position: "Project Manager",
    image:
      "https://kezanconsulting.com/wp-content/uploads/2021/02/img-001-150x150.jpg",
    message:
      "I had a fantastic experience with Kezan Inc. Their team is highly skilled and knowledgeable about the international job market. They provided invaluable support throughout the entire process, from job search to relocation. Thanks to them, I’m now thriving in a role I love."
  }
];

function Testimonial() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 2000); // Change slide every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4 mx-auto">
            <button onClick={handlePrev} aria-label="Previous">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={handleNext} aria-label="Next">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 md:p-10">
          <div className="text-[120px] text-white -mt-16 -mb-20 leading-none text-center">
            “
          </div>
          <p className="text-xl leading-relaxed mb-8">
            {testimonials[index].message}
          </p>
          <div className="flex items-center space-x-4">
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">
                {testimonials[index].name}
              </h4>
              <p className="text-sm font-medium">{testimonials[index].position}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
