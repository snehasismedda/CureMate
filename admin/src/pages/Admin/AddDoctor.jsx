import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) return toast.error('Image Not Selected')

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: { aToken }
            })

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="w-full px-4 md:px-10 py-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Doctor</h2>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img
                            className="w-24 h-24 object-cover rounded-full border-2 border-dashed border-gray-300"
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="Doctor Upload"
                        />
                    </label>
                    <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
                    <p className="text-gray-500">Click to upload doctor's picture</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} required className="input" type="text" placeholder="Doctor's Name" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} required className="input" type="email" placeholder="Email Address" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} required className="input" type="password" placeholder="Set Password" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Experience</label>
                            <select value={experience} onChange={e => setExperience(e.target.value)} className="input">
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year{(i + 1) > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Fees (₹)</label>
                            <input value={fees} onChange={e => setFees(e.target.value)} required className="input" type="number" placeholder="Doctor's Fees" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Speciality</label>
                            <select value={speciality} onChange={e => setSpeciality(e.target.value)} className="input">
                                {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Degree</label>
                            <input value={degree} onChange={e => setDegree(e.target.value)} required className="input" type="text" placeholder="Medical Degree" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Address</label>
                            <input value={address1} onChange={e => setAddress1(e.target.value)} required className="input mb-2" type="text" placeholder="Address Line 1" />
                            <input value={address2} onChange={e => setAddress2(e.target.value)} required className="input" type="text" placeholder="Address Line 2" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">About Doctor</label>
                    <textarea
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                        rows={5}
                        placeholder="Write a short bio..."
                        className="w-full border rounded-md px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-2 text-white rounded-full font-semibold shadow-md">
                        Add Doctor
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor