import React, { useState, useEffect } from 'react'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = ({ loginUser, setLoginUser }) => {

    console.log('welcomepage', loginUser);

    const [loanAmount, setLoanAmount] = useState(0)
    const [term, setTerm] = useState(0)
    const [userLoanObj, setUserLoanObj] = useState({})

    //console.log("userloanObj", userLoanObj);

    const handleLogout = (e) => {
        setLoginUser({})
    }

    const handleApplyLoan = async (e) => {
        e.preventDefault()
        // console.log("loginUser===>", loginUser);
        let { firstName, lastName, email, password } = loginUser
        let loanObj = { firstName, lastName, email, password, loanAmount, term }
        // console.log(loanObj);


        try {
            let res = await axios.post('https://techdome-solution.vercel.app/createloan', loanObj)

            if (res.data) {
                // console.log("res.data", res.data);
                setUserLoanObj(res.data.data)

                let msg = res.data.message
                toast.success(msg)
                // alert(msg)
            }

        } catch (error) {
            // console.log("error.response.data", error.response.data);
            let msg = error.response.data.message
            toast.error(msg)
            // alert(msg)
            //console.log('Signup Failed', error.response.data);
        }


    }

    useEffect(() => {
        let name = loginUser.firstName +" "+ loginUser.lastName
        toast.success(`welcome ${name}`);
    }, []);

    

    const handleLoanPayment = async (e) => {
        e.preventDefault()

        try {

            //console.log("handeloanpayment");
            let res = await axios.put('https://techdome-solution.vercel.app/loanpayment', userLoanObj)

            if (res.data) {
                //console.log("res.data", res.data.data);
                setUserLoanObj(res.data.data)

                

                let msg = res.data.message
                toast.success(msg)
                // alert(msg)
            }

        } catch (error) {
            // console.log("error.response.data", error.response.data);
            let msg = error.response.data.message
            toast.error(msg)
            // alert(msg)
            console.log('Loan Payment Failed', error.response.data);
        }

    }




    return (

        <div class="wel-wrapper">
            <div class="wel-container p-14 ">

                {/* --------- toast container -----  */}
                <ToastContainer />

                {/* ----- welcome Heading -----  */}

                <div class="heading space-y-3 flex justify-between ">
                    <div>
                        <h1 class="font-serif font-extrabold text-3xl text-gray-800">
                            Hi, {loginUser.firstName} !👋
                        </h1>
                        <h3 class='text-lg text-gray-500'>
                            Lets help to get Your Loan
                        </h3>
                    </div>
                    <div class="group relative pr-[10%]">
                        <button class="bg-blue-500 text-white p-2 rounded-lg hover:scale-105 " onClick={handleLogout}>
                            <UilSignOutAlt />
                        </button>
                        <p class="absolute  hidden text-gray-700 justify-center items-center  group-hover:block">
                            Logout
                        </p>
                    </div>
                </div>

                {/* ======= Loan Amount =======  */}
                <div class="loaninput-con pt-10 space-y-4 ">

                    <h1 className='text-xl font-bold'>
                        How Much You Need
                    </h1>
                    <p class="dis text-gray-500">
                        Take loan by just one click. write the amount of loan and click the button
                    </p>
                    <div class="loaninput flex flex-col  shadow-md shadow-gray-300 rounded-md p-14 m-28 space-y-4 " >
                        <div className='flex justify-between'>
                            <label htmlFor='amount' className='text-gray-700 min-w-[100px]' >Amount</label>
                            <input
                                type="Number"
                                id='amount'
                                className='pl-[30%] lg:pl-[50%] outline-none'
                                placeholder='EG:$10000 '
                                onChange={(e) => { setLoanAmount(e.target.value) }}
                            />
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                            <label htmlFor='term' className='text-gray-700 min-w-[100px] ' >Term of use</label>
                            <input
                                type="Number"
                                id='term'
                                className='pl-[30%] lg:pl-[50%] outline-none'
                                placeholder='EG:3 Months'
                                onChange={(e) => setTerm(e.target.value)}
                            />
                        </div>
                        <hr />
                        <div className='flex justify-between text-gray-700 min-w-[100px]'>
                            <h1 className='min-w-[100px] '>Status</h1>
                            <h1 class=" pr-[12%] lg:pr-[13%] text-gray-400">INITIATE</h1>
                        </div>
                        <hr className=' pb-8' />


                        <button
                            onClick={handleApplyLoan}
                            className='bg-blue-500 hover:bg-blue-600 text-white p-4 rounded text-lg'
                        >
                            Apply For Loan
                        </button>

                    </div>
                </div>


                {/* ========== Loan Amount RePayment =====  */}

                <div class="Payment-con pt-10 space-y-4 ">
                    <h1 className='text-xl font-bold'>
                        Do Payment
                    </h1>
                    <p class="dis text-gray-500">
                        Your loan Amount according to your term. Make Payment on Time
                    </p>
                    <div class="payment flex flex-col  shadow-md shadow-gray-300 rounded-md p-14 m-28 space-y-4 " >

                        <div className='loan-amount flex justify-between text-gray-700 min-w-[100px]'>
                            <h1 className='font-semibold text-xl min-w-[120px]'>Loan Amount</h1>
                            <h1 className='font-semibold text-xl '>{userLoanObj?.status}</h1>
                            <h1 class="font-semibold text-xl text-gray-400 pr-[13%]">${userLoanObj?.loanAmount}</h1>
                        </div>
                        <hr />


                        {/* <div className='rest-amount flex justify-between text-gray-700 min-w-[100px]'>
                            <h1 className='min-w-[120px]'>Rest Amount</h1>
                            <h1 class=" text-gray-400 pr-[13%]">$700</h1>
                        </div>
                        <hr /> */}

                        {
                            userLoanObj?.repayments?.map((obj, i) => (
                                <div key={i}>
                                    <div className='flex justify-between text-gray-700 min-w-[100px] pb-4'>
                                        <h1 className='min-w-[120px]'>{obj.date}</h1>
                                        <h1 className=''>{obj.status}</h1>
                                        <h1 class=" text-gray-600 pr-[13%]">{obj.amount}</h1>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        }


                        <button className='bg-blue-500 hover:bg-blue-600 text-white p-4 rounded text-lg' onClick={handleLoanPayment}>
                            Make Payment
                        </button>

                    </div>


                </div>


            </div>
            <div class="h-screen"></div>
        </div>
    )
}

export default Welcome