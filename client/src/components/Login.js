import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UilUser, UilLockAlt } from '@iconscout/react-unicons'
import axios from 'axios'



const Login = ({ setLoginUser }) => {

    // console.log("client setLoginUser", setLoginUser);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            let res = await axios.post('http://localhost:5000/login', formData)

            if (res.data) {
                //console.log("res.data.data", res.data.data);
                setLoginUser(res.data.data)

                let msg = res.data.message
                alert(msg)
                navigate('/')
            }

        } catch (error) {
            //console.log("error.response.data", error.response.data);
            let msg = error.response.data.message
            alert(msg)
            //console.log('Signup Failed', error.response.data);
        }
    }



    return (
        <div className="login-wrapper bg-gray-100 w-auto h-screen flex justify-center items-center">
            <div className="login-container w-[60%] max-w-[500px] bg-white shadow-2xl shadow-gray-300 rounded-lg ">
                {/* ===== heading ==== */}
                <div className='heading flex flex-col justify-center items-center p-4'>
                    <h1 className='text-2xl font-semibold '>
                        Log In
                    </h1>
                </div>
                <hr />

                {/* ==== submit data form ===== */}
                <div className="form-container">
                    <form action="submit" onSubmit={handleSubmit} className=' flex flex-col justify-center items-center p-4 '>

                        <div className='email flex w-full border border-gray-300 p-2 m-2 rounded-lg  '>
                            <input type="mail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='Email'
                                className='outline-none w-full'
                            />
                            <UilUser className='text-gray-500' />
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

                        <div className="btn w-full flex flex-col items-center justify-center pt-6">
                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold text-2xl' onClick={handleSubmit}>
                                Log In
                            </button>

                            <Link to='/signup'>
                                <p className='text-gray-400 text-sm p-3 cursor-pointer hover:underline'>Create an account ? <span className='text-black'> Sign Up </span></p>
                            </Link>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login