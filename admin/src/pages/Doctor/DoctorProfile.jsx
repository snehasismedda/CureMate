import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) getProfileData()
    }, [dToken])

    return profileData && (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <img className="rounded-2xl shadow-md w-full object-cover" src={profileData.image} alt="Doctor" />
                </div>
                <div className="col-span-2 bg-white shadow-lg rounded-2xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800">{profileData.name}</h2>
                            <p className="text-gray-500 mt-1">{profileData.degree} - {profileData.speciality}</p>
                        </div>
                        <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full shadow-sm">{profileData.experience}</span>
                    </div>

                    <div className="mt-6">
                        <label className="text-sm font-medium text-gray-700">About</label>
                        <div className="mt-1 text-gray-600">
                            {
                                isEdit
                                    ? <textarea rows={6} className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-primary" value={profileData.about} onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} />
                                    : <p className="mt-1 text-sm leading-relaxed">{profileData.about}</p>
                            }
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="text-sm font-medium text-gray-700">Appointment Fee</label>
                        <p className="text-gray-800 mt-1">
                            {currency} {
                                isEdit
                                    ? <input type="number" className="border border-gray-300 p-1 rounded-md text-sm" value={profileData.fees} onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} />
                                    : profileData.fees
                            }
                        </p>
                    </div>

                    <div className="mt-6">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <div className="text-sm text-gray-600 space-y-1 mt-1">
                            <div>
                                {isEdit
                                    ? <input type='text' className="w-full border p-1 rounded-md" value={profileData.address.line1} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                                    : <p>{profileData.address.line1}</p>}
                            </div>
                            <div>
                                {isEdit
                                    ? <input type='text' className="w-full border p-1 rounded-md" value={profileData.address.line2} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                                    : <p>{profileData.address.line2}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        <input id="available" type="checkbox" checked={profileData.available} onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} className="form-checkbox h-4 w-4 text-primary" />
                        <label htmlFor="available" className="text-sm text-gray-700">Available for consultation</label>
                    </div>

                    <div className="mt-6">
                        {
                            isEdit
                                ? <button onClick={updateProfile} className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-primary/90 transition-all">Save Changes</button>
                                : <button onClick={() => setIsEdit(true)} className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-all">Edit Profile</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
