import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return `${dateArray[0]} ${months[Number(dateArray[1])] || ''} ${dateArray[2]}`
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    return (
        <div className='px-4 sm:px-8 py-10'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-6 border-b pb-2'>My Appointments</h2>
            <div className='grid gap-6'>
                {appointments.map((item, index) => (
                    <div key={index} className='bg-white rounded-xl shadow-md p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[150px_1fr_200px] gap-6 items-start border'>

                        {/* Doctor Image */}
                        <div>
                            <img className='w-full h-36 object-cover rounded-lg border bg-gradient-to-tr from-blue-100 to-indigo-100' src={item.docData.image} alt="" />
                        </div>

                        {/* Appointment Details */}
                        <div className='text-sm text-gray-700 space-y-2'>
                            <p className='text-lg font-bold text-gray-800'>{item.docData.name}</p>
                            <p className='text-gray-500'>{item.docData.speciality}</p>
                            <div>
                                <p className='font-medium text-gray-600'>Address:</p>
                                <p>{item.docData.address.line1}</p>
                                <p>{item.docData.address.line2}</p>
                            </div>
                            <p className='text-gray-600'>
                                <span className='font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className='flex flex-col gap-2'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='w-full py-2 border rounded-md text-gray-600 hover:bg-blue-500 hover:text-white transition-all'>
                                    Pay Online
                                </button>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <button onClick={() => appointmentRazorpay(item._id)} className='w-full py-2 border rounded-md bg-gray-50 hover:bg-blue-600 transition-all flex items-center justify-center'>
                                    <img className='h-6' src={assets.razorpay_logo} alt="Pay with Razorpay" />
                                </button>
                            )}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <span className='w-full py-2 border rounded-md text-green-600 bg-green-50 text-center'>Paid</span>
                            )}
                            {item.isCompleted && (
                                <span className='w-full py-2 border border-green-500 rounded-md text-green-600 text-center'>Completed</span>
                            )}
                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='w-full py-2 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all'>
                                    Cancel Appointment
                                </button>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <span className='w-full py-2 border border-red-400 rounded-md text-red-500 text-center'>Appointment Cancelled</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
