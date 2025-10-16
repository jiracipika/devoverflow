import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com'
import validator from "validator"

const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        email: "",
    })
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault();

        if (formData.email === "") {
            toast.error(`Please Enter Email`, {
                autoClose: 3000
            });
            return
        }

        else {
            emailjs
            .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, e.target, import.meta.env.VITE_PUBLIC_KEY)
            .then((result) => {
                alert(`Email Sent! Please Check Your Inbox`);
                setFormData({ email: "" })
                navigate(`/thankyoupassword`);
            }).catch(() => toast.error("Oops! Something went wrong. Please try again.", {
                autoClose: 3000
            }))
        }
    }
    return (
        <section className='w-full h-fit bg-[#0F1117]'>
            <ToastContainer />
            <section className='sign-in min-h-screen max-h-fit flex justify-center w-full p-6 flex-col items-center'>
                <form onSubmit={handleSubmit} className='bg-[#151821] w-[90%] h-4/5 flex flex-col gap-3 max-w-[450px] mt-5 pt-[50px] pb-[70px] px-[60px] rounded-[20px] left-2/4 top-2/4' id="forgot-password-form">
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-white'>logo</h1>
                            <h1 className="text-white font-medium text-2xl ">Password Reset</h1>
                            <p className='text-sm text-[#858EAD]'>Please Enter the Email you would like to send instructions to.</p>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex items-center mx-0 my-[15px]'>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                placeholder="example@gmail.com" 
                                className='bg-[#212734] text-[#858EAD] rounded-md w-full px-[15px] py-[18px] border-0 outline-none placeholder-#858EAD'
                            />
                        </div>
                    </div>
                    <div className='w-full '>
                    <button className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-sm basis-[48%] h-10 w-full rounded-md text-white font-medium border-0 outline-none' type="submit" >Continue</button>
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