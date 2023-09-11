import React, { useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { UilUser, UilEnvelope, UilLockAlt } from '@iconscout/react-unicons'
import axios from 'axios'




const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',

    })

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            let res = await axios.post('http://localhost:5000/signup', formData)

            //console.log(res.data);

            if (res.data) {
                let msg = res.data.message
                alert(msg)
                navigate('/login')

            }

        } catch (error) {

            let msg = error.response.data.message
            alert(msg)
            //console.log('Signup Failed', error.response.data);
        }
    }



    return (
        <div className="signup-wrapper bg-gray-100 w-auto h-screen flex justify-center items-center">
            <div className="signup-container w-[60%] max-w-[500px]  bg-white shadow-2xl shadow-gray-300 rounded-lg ">
                {/* ===== heading ==== */}
                <div className='heading flex flex-col justify-center items-center p-4'>
                    <h1 className='text-2xl font-semibold '>
                        Create a new account
                    </h1>
                    <p className='text-gray-400'>It's quick and easy.</p>
                </div>
                <hr />

                {/* ==== submit data form ===== */}
                <div className="form-container">
                    <form action="submit" onSubmit={handleSubmit} className=' flex flex-col justify-center items-center p-4 '>

                        <div className='fname flex w-full border border-gray-300 p-2 m-2 rounded-lg '>
                            <input
                                type="text"
                                name="firstName"
                                placeholder='First Name'
                                value={formData.firstName}
                                onChange={handleChange}
                                className='outline-none w-full'
                                required
                            />
                            <UilUser className='text-gray-500' />


                        </div>

                        <div className='lname flex w-full border border-gray-300 p-2 m-2 rounded-lg '>
                            <input type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required placeholder='Last Name'
                                className='outline-none w-full'
                            />
                            <UilUser className='text-gray-500' />
                        </div>

                        <div className='email flex w-full border border-gray-300 p-2 m-2 rounded-lg  '>
                            <input type="mail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='Email'
                                className='outline-none w-full'
                            />
                            <UilEnvelope className='text-gray-500' />
                        </div>

                        <div className='password flex w-full border border-gray-300 p-2 m-2 rounded-lg  '>
                            <input type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='Password'
                                className='outline-none w-full'
                            />
                            <UilLockAlt className="text-gray-500" />
                        </div>

                        <div className='con-password flex w-full border border-gray-300 p-2 m-2 rounded-lg  '>
                            <input type="text"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='Confirm Password'
                                className='outline-none w-full'
                            />
                            <UilLockAlt className="text-gray-500" />
                        </div>

                        <div className="btn w-full flex flex-col items-center justify-center pt-6">
                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded w-[40%] hover:bg-blue-600 '>
                                Sign Up
                            </button>

                            <Link to='/login'>
                                <p className='text-gray-400 text-sm p-3 cursor-pointer hover:underline'>Already have an account ? <span className='text-black'> Log In </span></p>
                            </Link>

                        </div>


                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup