import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='px-4 md:px-10 py-12 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-800 mb-2'>Find Your Specialist</h2>
          <p className='text-gray-500 text-base'>Choose from a range of medical experts and easily book your appointment.</p>
        </div>

        <div className='flex flex-wrap justify-center gap-3 mb-10'>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, idx) => (
            <button
              key={idx}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${speciality === spec ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:shadow-lg transition duration-300' key={index}>
              <img className='w-full h-70 object-cover bg-blue-100' src={item.image} alt="doctor" />
              <div className='p-4 space-y-1'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : "text-gray-400"}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-400"}`}></span>
                  <p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-gray-900 text-lg font-semibold'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
