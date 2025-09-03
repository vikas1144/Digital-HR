import React from 'react';
import { Linkedin, Instagram, Facebook, ArrowRight, Mail } from 'lucide-react';
import logo from '../assets/logo.jpg'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8 lg:px-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 */}
        <div className="flex flex-col">
          <img
            src={logo}
            alt="Kezan Inc. Logo"
            className="mb-10 ml-2 h-20 object-contain"
          />
          <div className="flex gap-4 mb-8">
            <a href="https://www.linkedin.com/company/kezan-inc" className="bg-orange-500 hover:bg-orange-400 rounded-full p-2">
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a href="https://www.instagram.com/kezanconsulting/?igsh=MW96eWtzem9xam" className="bg-orange-500 hover:bg-orange-400 rounded-full p-2">
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a href="https://www.facebook.com/kezanconsulting" className="bg-orange-500 hover:bg-orange-400 rounded-full p-2">
              <Facebook className="w-5 h-5 text-white" />
            </a>
          </div>
          <h3 className="text-xl font-bold mb-2">INDIA</h3>
          <p className="text-sm text-gray-300">
            TalentMesh, 201009 Adhyatmik Nagar Ghaziabad, INDIA
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Contract Staffing</a></li>
            <li><a href="#" className="hover:text-white">Digital Hiring</a></li>
            <li><a href="#" className="hover:text-white">Permanent Hiring</a></li>
            <li><a href="#" className="hover:text-white">Recruitment Process Outsourcing</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Our Links</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <ArrowRight className="text-orange-500 w-4 h-4" />
              <a href="home" className="hover:text-white">Home</a>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="text-orange-500 w-4 h-4" />
              <a href="#" className="hover:text-white">Career</a>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="text-orange-500 w-4 h-4" />
              <a href="about" className="hover:text-white">About Us</a>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="text-orange-500 w-4 h-4" />
              <a href="#" className="hover:text-white">Blog</a>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="text-orange-500 w-4 h-4" />
              <a href="contact" className="hover:text-white">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Corporate Headquarters</h3>
          <p className="text-sm text-gray-300 mb-4">
            2E/223, IMS incubation center ,IMS ENGINEERING COLLEGE Ghaziabad
          </p>
          <p className="font-bold text-sm text-white mb-1"> 2nd Address</p>
          <p className="text-sm text-gray-300 mb-4">
            2E/223, IMS incubation center ,IMS ENGINEERING COLLEGE Ghaziabad
          </p>
          <div className="mb-2 flex items-center gap-2 text-gray-300 hover:text-white">
            <Mail className="w-4 h-4 text-orange-500" />
            <a href="mailto:vikaskashyap0762156@gmail.com">xxxxxxxxxx@gmail.com</a>
          </div>
          <div className="mb-4 flex items-center gap-2 text-gray-300 hover:text-white">
            <Mail className="w-4 h-4 text-orange-500" />
            <a href="mailto:usa@kezanconsulting.com">xxxxxxxx.com</a>
          </div>
          <p className="text-sm text-gray-300">+xx xxxxxxxxxx</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-sm text-gray-500">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Mumbai</h3>
          <p>
            TalentMesh, Block A, Shivsagar Estate, Dr. Annie Besant Road, Worli, Mumbai
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Gurgaon</h3>
          <p>
            TalentMesh, Space Creattors heights, land mark (3rd floor), Sector- 67 Gurgaon
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Noida</h3>
          <p>
            TalentMesh, Logix City Centre, 7th Floor, Plot No. BW-58, Sector 32, Noida
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TalentMesh. All rights reserved.
      </div>
    </footer>
  );
}

