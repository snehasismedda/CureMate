import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const endpoint =
        state === 'Admin' ? '/api/admin/login' : '/api/doctor/login'
      const { data } = await axios.post(backendUrl + endpoint, {
        email,
        password,
      })

      if (data.success) {
        if (state === 'Admin') {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        }
        toast.success(`${state} login successful`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F7FA] to-[#C3CFE2] px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl space-y-6"
      >
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              state === 'Admin'
                ? 'bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setState('Admin')}
          >
            Admin
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              state === 'Doctor'
                ? 'bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setState('Doctor')}
          >
            Doctor
          </button>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800">
          {state} Login
        </h2>

        <div>
          <label className="block text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Switch to{' '}
          <span
            onClick={() =>
              setState((prev) => (prev === 'Admin' ? 'Doctor' : 'Admin'))
            }
            className="text-blue-500 underline cursor-pointer"
          >
            {state === 'Admin' ? 'Doctor Login' : 'Admin Login'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
