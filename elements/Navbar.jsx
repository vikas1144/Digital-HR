import React, { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  PhoneCall,
  Linkedin,
  Instagram,
  Facebook,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase"; // Make sure this is correct

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <footer className="bg-black text-white py-6 px-4 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 md:space-x-10">
        
        {/* Left: Address */}
        <div className="flex items-start space-x-2 text-sm">
          <MapPin className="text-orange-500 mt-1" size={18} />
          <p className="text-gray-300">
            Talent Mesh, 16192 Coastal Highway, 19958, Sussex, INDIA
          </p>
        </div>

        {/* Right: Contact Info + Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Contact info is always visible */}
          <div className="hidden md:flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="text-orange-500" size={18} />
              <span className="text-gray-300">xxxxxxxxxxx@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneCall className="text-orange-500" size={18} />
              <span className="text-gray-300">+xx xxxxxxxx</span>
            </div>

            {/* Social icons */}
            <div className="flex space-x-3 ml-4">
              <a href="#" className="text-orange-500 hover:text-white">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-orange-500 hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-orange-500 hover:text-white">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Menu Button */}
          <button
            className="text-orange-500 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-4 top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col w-48 p-4 space-y-2 z-50">
           <Link
            to="/"
            className="text-white hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/register"
            className="text-white hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/jobs"
            className="text-white hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            View Jobs
          </Link>
          <Link
            to="/admin"
            className="text-white hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Admin Login
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          
         

          {/* Show Login or Logout depending on auth state */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-white hover:text-orange-500 text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Employee Login
            </Link>
          )}
        </div>
      )}
    </footer>
  );
}

export default Navbar;
