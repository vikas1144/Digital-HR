'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import Recruitment from './Recruitment';
import Records from './Records';
import Outcomes from './Outcomes';
import Testimonial from './Testimonial';
import Feedback from './Feedback';
import logo from '../assets/logo.jpg';
import Industries from './Industries';
import { auth } from '../firebase'; // ✅ Firebase Auth
import { onAuthStateChanged } from 'firebase/auth'; // ✅ Realtime listener

// Image Slides
const slides = [
  { src: "https://www.shutterstock.com/image-photo/human-resource-management-effective-recruitment-260nw-2347415197.jpg", alt: "Experts in Digital HR Solutions" },
  { src: "https://img.freepik.com/premium-photo/welcome-hands-handshake-closeup-by-hr-man-office-interview-business-meeting-recruitment-hr-management-data-exchanges-development-customer-service-crm-human-resource-hrm_228338-1307.jpg?semt=ais_hybrid&w=740&q=80", alt: "Revolutionizing Workplace Efficiency" },
  { src: "https://media.istockphoto.com/id/1342606468/photo/human-and-technology-concept-human-resources-communication-network.jpg?s=612x612&w=0&k=20&c=GOwu-xcfir2nH7YxdmhG04QgWwfXW4VOq4BwVC2V-ps=", alt: "Streamlined Hiring & Onboarding" },
];

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { delayChildren: 0.3, staggerChildren: 0.3, duration: 0.6 },
  },
};

const item = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

function Hero() {
  const { isAdminLoggedIn } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

  // ✅ Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const localFlag = localStorage.getItem('isRegistered') === 'true';
      setIsRegistered(localFlag || !!user);
    });

    return () => unsubscribe();
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <>
      {/* Fullscreen Hero Section */}
      <section className="relative w-full h-screen max-h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out 
              ${index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Top Navigation */}
        <div className="absolute top-6 left-0 right-0 z-30 px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Hidden on mobile, show on md and up */}
          <div className="hidden md:flex space-x-4 text-white font-semibold items-center">
            <Link to="/login" className="hover:text-blue-300 transition-colors duration-200">
              Employee Login
            </Link>
            <Link to="/jobs" className="hover:text-blue-300 transition-colors duration-200">
              View Jobs
            </Link>

            {!isAdminLoggedIn ? (
              <>
                <Link to="/admin" className="hover:text-blue-300 transition-colors duration-200">
                  Admin Login
                </Link>
                <Link to="/contact" className="hover:text-blue-300 transition-colors duration-200">
                  Contact Us
                </Link>
              </>
            ) : (
              <>
                <Link to="/post-job" className="hover:text-green-300 transition-colors duration-200">
                  Post Job
                </Link>
                <Link to="/admin" className="hover:text-blue-300 transition-colors duration-200">
                  Admin Login
                </Link>
                <Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">
                  Contact Us
                </Link>
                
              </>
            )}
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 max-w-5xl mx-auto text-center px-4 flex flex-col items-center justify-center h-full"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl font-bold mb-6 text-white drop-shadow-lg"
          >
            Experience the Future of Digital HR.
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl text-white mb-10 max-w-3xl"
          >
            Streamline processes, enhance efficiency, and revolutionize your
            workplace with our cutting-edge paperless digital platform.
          </motion.p>
          <motion.div
            variants={item}
            className="flex items-center gap-4 mb-14"
          >
            {/* ✅ Only show if not registered */}
            {!isRegistered && (
              <Link to="/register">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg">
                  Register
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <Records />
      <Recruitment />
      <Outcomes />
      <Industries />
      <Testimonial />
      <Feedback />
    </>
  );
}

export default Hero;
