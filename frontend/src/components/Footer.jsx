import React from 'react'
import { assets } from '../assets/assets' // Ensure logo or other assets exist

function Footer() {
  return (
    <footer className="bg-white text-black px-6 md:px-10 lg:px-20 py-10 mt-20 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between gap-10 pb-8">

        {/* Logo & Intro */}
        <div className="md:w-1/3">
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Your trusted partner in digital healthcare. Book appointments and connect with top doctors effortlessly.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>Email: support@curemate.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Address: Chandigarh, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 text-center text-xs text-gray-500 border-t pt-4">
        &copy; {new Date().getFullYear()} HealthCare Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
