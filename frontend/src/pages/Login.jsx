import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendUrl}/api/user/${state === 'Sign Up' ? 'register' : 'login'}`;
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left panel */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 text-white items-center justify-center p-10 relative">
        <div className="z-10 text-left space-y-4 max-w-md">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">Welcome Back!</h1>
          <p className="text-sm opacity-80">Book appointments and manage your health with ease.</p>
          <div className="absolute bottom-8 left-10 text-xs opacity-40">© CureMate, 2025</div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-0"></div>
      </div>

      {/* Right panel */}
      <form onSubmit={onSubmitHandler} className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
          <p className="text-sm text-gray-500 mb-6">
            {state === 'Sign Up' ? 'Join CureMate to start managing your care' : 'Welcome back to CureMate'}
          </p>

          {state === 'Sign Up' && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <div className="flex items-center mt-1 border px-3 py-2 rounded-md bg-gray-100">
                <FiUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <div className="flex items-center mt-1 border px-3 py-2 rounded-md bg-gray-100">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="flex items-center mt-1 border px-3 py-2 rounded-md bg-gray-100">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold text-sm transition-all"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>

          <a
            href={
              import.meta.env.MODE === 'production'
                ? 'https://curemate-admin.vercel.app/'
                : 'http://localhost:5174/'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-3 bg-red-100 hover:bg-red-200 text-red-700 text-center py-2 rounded-md font-medium text-sm transition-all"
          >
            Login as Admin
          </a>


          <p className="text-center text-sm text-gray-500 mt-4">
            {state === 'Sign Up' ? 'Already have an account?' : 'New here?'}{' '}
            <span
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            >
              {state === 'Sign Up' ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
