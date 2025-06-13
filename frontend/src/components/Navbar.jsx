import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <header className='shadow-md bg-white sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center'>
        <img onClick={() => navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt='Logo' />

        <nav className='hidden md:flex items-center gap-6 text-gray-700 font-medium'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : ''}>HOME</NavLink>
          <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : ''}>ALL DOCTORS</NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary' : ''}>ABOUT</NavLink>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary' : ''}>CONTACT</NavLink>
        </nav>

        <div className='flex items-center gap-4'>
          {
            token && userData ? (
              <div className='relative group cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <img className='w-9 h-9 rounded-full border' src={userData.image} alt='User' />
                  <img className='w-3' src={assets.dropdown_icon} alt='Dropdown' />
                </div>
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 space-y-2 text-sm text-gray-600 hidden group-hover:block'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className='bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hidden md:block'>Create account</button>
            )
          }
          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt='Menu' />
        </div>
      </div>

      {/* ---- Mobile Menu ---- */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex justify-between items-center px-5 py-4 border-b'>
          <img src={assets.logo} className='w-36' alt='Logo' />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt='Close' />
        </div>
        <ul className='flex flex-col px-6 py-4 gap-4 font-medium text-gray-700 text-base'>
          <NavLink onClick={() => setShowMenu(false)} to='/'>HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors'>ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact'>CONTACT</NavLink>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
