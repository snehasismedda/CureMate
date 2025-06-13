import React from 'react'
import { assets } from '../assets/assets'
import { Clock, UserCheck, HeartPulse } from 'lucide-react'

const About = () => {
  return (
    <div className="px-4 md:px-16 py-10 text-gray-700">
      
      {/* About Us Title */}
      <div className="text-center text-3xl font-bold tracking-wide text-primary">
        <p>About <span className="text-gray-800">Prescripto</span></p>
        <div className="mt-2 h-1 w-20 mx-auto bg-primary rounded-full"></div>
      </div>

      {/* Main About Section */}
      <div className="mt-12 flex flex-col md:flex-row gap-10 items-center">
        <img
          src={assets.about_image}
          alt="About Prescripto"
          className="w-full md:max-w-md rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-6 md:w-2/3 text-base text-gray-600 leading-relaxed">
          <p>
            <strong className="text-gray-800">Prescripto</strong> is your
            intelligent health partner—streamlining appointment scheduling,
            healthcare access, and medical record management. We believe in
            placing the power of seamless healthcare directly into your hands.
          </p>
          <p>
            Our platform is built with cutting-edge technology, delivering a
            secure, intuitive, and scalable solution for both patients and
            providers. Whether it’s your first consultation or routine care
            management, Prescripto ensures your journey is frictionless and
            informed.
          </p>
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Our Vision</h3>
            <p>
              We envision a future where healthcare is proactive, personalized,
              and universally accessible. By bridging the digital divide in
              healthcare, Prescripto empowers users to take control of their
              wellness journey.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20 text-center text-2xl font-semibold text-primary">
        Why <span className="text-gray-800">Choose Us</span>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-8 shadow-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer flex flex-col items-center text-center gap-4">
          <Clock size={32} />
          <h4 className="font-semibold text-lg">Efficient Scheduling</h4>
          <p>Book appointments seamlessly, anytime, without the hassle of queues or calls.</p>
        </div>
        <div className="border rounded-xl p-8 shadow-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer flex flex-col items-center text-center gap-4">
          <UserCheck size={32} />
          <h4 className="font-semibold text-lg">Trusted Network</h4>
          <p>Connect with verified healthcare professionals, clinics, and hospitals near you.</p>
        </div>
        <div className="border rounded-xl p-8 shadow-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer flex flex-col items-center text-center gap-4">
          <HeartPulse size={32} />
          <h4 className="font-semibold text-lg">Personalized Care</h4>
          <p>Receive intelligent health suggestions, follow-ups, and reminders tailored to you.</p>
        </div>
      </div>
    </div>
  )
}

export default About
