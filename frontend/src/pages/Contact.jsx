import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <section className="px-4 md:px-20 py-16 bg-gray-50 text-gray-700">
      <div className="text-center text-3xl font-bold tracking-wide mb-12">
        <h2>
          Get in <span className="text-indigo-600">Touch</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">We’re here to answer any questions you may have.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start max-w-6xl mx-auto">
        <img
          src={assets.contact_image}
          alt="Contact"
          className="w-full md:max-w-md rounded-xl shadow-md object-cover"
        />

        <div className="flex flex-col gap-6 text-sm md:text-base bg-white p-6 rounded-2xl shadow-lg w-full">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Head Office</h3>
            <p className="text-gray-600 leading-relaxed">
              2nd Floor, Innov8 Tower<br />
              Huda City Centre, Sector 44<br />
              Gurugram, Haryana, India - 122003
            </p>
          </div>

          <div>
            <p className="text-gray-600 leading-relaxed">
              Phone: +91 98101 23456<br />
              Email: support@curemate.in
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Careers at curemate</h3>
            <p className="text-gray-600 leading-relaxed">
              Join our vibrant team and help shape the future of healthcare innovation.
            </p>
          </div>

          <button className="mt-4 w-max border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition duration-300">
            Explore Careers
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
