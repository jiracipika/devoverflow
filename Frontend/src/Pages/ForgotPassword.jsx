import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import validator from "validator"


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error(`Please Enter Email`, {
                autoClose: 3000
            });
            return
        }
        if (!validator.isEmail(email)) {
            toast.error(`Invalid Email`, {
                autoClose: 3000
            });
            return;
        }

        else{
            console.log("Sending Email....")
            //Send Email
            // https://jsonplaceholder.typicode.com/posts
            // http://localhost:5173/api/ForgotPassword
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                email: email,
            });
            // If the email was sent successfully, navigate
            if (response.data.success === false) {
                toast.error(response.data.message, {
                    autoClose: 5000,
                });
            } else {
                alert("Email Sent");
                navigate(`/thankyoupassword?email=${encodeURIComponent(email)}`);

            }
            
        }
        
    }
    
    return (
        <section className='w-full h-fit bg-[#0F1117]'>
            <ToastContainer />
            <section className='sign-in min-h-screen max-h-fit flex justify-center w-full p-6 flex-col items-center'>
                <form className='bg-[#151821] w-[90%] h-4/5 flex flex-col gap-3 max-w-[450px] mt-5 pt-[50px] pb-[70px] px-[60px] rounded-[20px] left-2/4 top-2/4'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-white'>logo</h1>
                            <h1 className="text-white font-medium text-2xl ">Password Reset</h1>
                            <p className='text-sm text-[#858EAD]'>Please Enter the Email you would like to send instructions to.</p>
                        </div>
                    </div>
                    <div className='input-group'>
                        <div className='flex items-center mx-0 my-[15px]'>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='bg-[#212734] text-[#858EAD] rounded-md w-full px-[15px] py-[18px] border-0 outline-none placeholder-#858EAD'/>
                        </div>
                    </div>
                    <div className='w-full '>
                    <button onClick={handleSubmit} className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-sm basis-[48%] h-10 w-full rounded-md text-white font-medium border-0 outline-none' type="button">Continue</button>
                    </div>
                    <div className='flex gap-3 flex-col justify-center mx-0 my-[15px] rounded-[3px]'>
                         <Link to={"/signin"} className='self-center text-[#FF7000]'>Back to Sign In</Link>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default ForgotPassword