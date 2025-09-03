import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './elements/Navbar';
import Footer from './components/Footer';

import Benefits from './components/Benefits';
import Modules from './components/Modules';
import CTA from './components/CTA';
import Records from './components/Records';
import Recruitment from './components/Recruitment';
import Outcomes from './components/Outcomes';

import Testimonial from './components/Testimonial';

 
import Registerpage from './pages/Registerpage';
import Home from './components/Hero';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Admin from './pages/Admin';
import PostJob from './pages/Postjob';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeDirectory from './components/Employees/EmployeeDirectory';
import Employeeworking from './pages/Employeeworking';
import ContactUs from './elements/ContactUs';
import AfterLogin from './pages/AfterLogin';

import Aboutus from './components/Aboutus';
import ResumeMaker from './components/ResumeMaker/ResumeMaker';
//import { ResumeBuilder } from './components/resume-builder';
//import { ResumePreview } from './components/resume-preview';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/post-job" element={<PostJob />} />
         <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/dashboard" element={<Employeeworking />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<Aboutus />} />
           <Route path="/afterlogin" element={<AfterLogin />} />
            <Route path="/resume" element={<ResumeMaker />} />

      </Routes>
      <Footer/>
      {/* These can also be part of <Home /> if only shown there */}
      </>   
    
  );
}
export default App;
