import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return userData ? (
    <div className="max-w-3xl mx-auto px-6 py-10 rounded-3xl bg-gradient-to-br from-white to-indigo-50 shadow-2xl border border-indigo-100 mt-6">
      {/* Profile Avatar */}
      <div className="flex flex-col items-center relative">
        <label htmlFor="profileImage" className="relative group cursor-pointer">
          <div className="w-36 h-36 rounded-full bg-white border-[6px] border-indigo-100 shadow-xl overflow-hidden flex items-center justify-center transition-transform transform hover:scale-105">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEdit && (
            <div className="absolute bottom-2 right-2 bg-indigo-500 p-2 rounded-full shadow-lg">
              <img src={assets.upload_icon} className="w-5 h-5" alt="Upload" />
            </div>
          )}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="text-2xl font-bold mt-4 border-b border-indigo-400 bg-transparent focus:outline-none text-center text-indigo-600"
          />
        ) : (
          <h1 className="text-3xl font-semibold mt-4 text-indigo-700">{userData.name}</h1>
        )}
      </div>

      {/* Section: Contact Information */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-bold text-indigo-600 border-b border-indigo-200 pb-1">📞 Contact Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
          <p className="font-semibold">Email</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-semibold">Phone</p>
          {isEdit ? (
            <input
              type="tel"
              className="px-2 py-1 rounded-md border border-indigo-200 focus:outline-none bg-white"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="font-semibold">Address</p>
          {isEdit ? (
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Line 1"
                value={userData.address.line1}
                onChange={(e) => setUserData((d) => ({ ...d, address: { ...d.address, line1: e.target.value } }))}
                className="w-full px-2 py-1 rounded-md border border-indigo-200 bg-white"
              />
              <input
                type="text"
                placeholder="Line 2"
                value={userData.address.line2}
                onChange={(e) => setUserData((d) => ({ ...d, address: { ...d.address, line2: e.target.value } }))}
                className="w-full px-2 py-1 rounded-md border border-indigo-200 bg-white"
              />
            </div>
          ) : (
            <p>{userData.address.line1}, {userData.address.line2}</p>
          )}
        </div>
      </section>

      {/* Section: Basic Info */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-bold text-indigo-600 border-b border-indigo-200 pb-1">👤 Basic Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
          <p className="font-semibold">Gender</p>
          {isEdit ? (
            <select
              className="px-2 py-1 rounded-md border border-indigo-200 bg-white"
              value={userData.gender}
              onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-semibold">Birthday</p>
          {isEdit ? (
            <input
              type="date"
              className="px-2 py-1 rounded-md border border-indigo-200 bg-white"
              value={userData.dob}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </section>

      {/* Save/Edit Button */}
      <div className="mt-10 text-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 text-white font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border-2 border-indigo-500 text-indigo-600 font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
