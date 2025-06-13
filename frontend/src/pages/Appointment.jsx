import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()
                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime
                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }
        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 rounded-2xl shadow-lg">
                    <img className="w-full rounded-xl shadow-md" src={docInfo.image} alt="Doctor" />
                </div>


                <div className='col-span-2 bg-white rounded-xl shadow-lg p-6'>
                    <h2 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>{docInfo.name}<img className='w-5' src={assets.verified_icon} alt="Verified" /></h2>
                    <p className='mt-1 text-sm text-gray-500'>{docInfo.degree} - {docInfo.speciality} <span className='ml-2 px-2 py-1 text-xs border rounded-full'>{docInfo.experience}</span></p>

                    <div className='mt-4'>
                        <p className='font-medium text-gray-700 flex items-center gap-1'>About <img className='w-3' src={assets.info_icon} alt="Info" /></p>
                        <p className='text-gray-600 mt-1 text-sm'>{docInfo.about}</p>
                    </div>

                    <div className='mt-4 text-gray-700 font-medium'>
                        Appointment fee: <span className='text-black'>{currencySymbol}{docInfo.fees}</span>
                    </div>
                </div>
            </div>

            <div className='mt-12'>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>Book a Slot</h3>
                <div className='flex space-x-4 overflow-x-auto py-2'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <button key={index} onClick={() => setSlotIndex(index)} className={`min-w-[60px] px-4 py-3 rounded-lg text-center text-sm font-medium ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <div>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</div>
                            <div>{item[0] && item[0].datetime.getDate()}</div>
                        </button>
                    ))}
                </div>

                <div className='flex flex-wrap gap-3 mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <button key={index} onClick={() => setSlotTime(item.time)} className={`px-5 py-2 rounded-full text-sm ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-300 text-gray-600'}`}>
                            {item.time.toLowerCase()}
                        </button>
                    ))}
                </div>

                <div className='mt-6'>
                    <button onClick={bookAppointment} className='bg-primary hover:bg-blue-600 transition-all duration-300 text-white px-6 py-3 rounded-full text-sm font-medium'>Book Appointment</button>
                </div>
            </div>

            <div className='mt-16'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment
