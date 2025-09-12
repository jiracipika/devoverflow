import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import validator from "validator"
import axios from 'axios'

const ThankYouPassword = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    const resend = async (e) =>{
        
        e.preventDefault();
        if (!validator.isEmail(email)) {
            alert("Invalid Email")
            return;
        }
        else{
            console.log("Sending Email....")
            //Send Email
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                    from: "defoverflow@gmail.com",
                    to: email,
                    subject: "Reset Password Link",
                    message: "Here's Link to Reset Password Here"
            });
                // If the email was sent successfully, navigate
                alert('Email Sent Successfully')

            } catch (error) {
                console.error('Email send failed:', error);
                alert('Email send failed:', error);
            }
        }
    }
    return (
    <section className='w-full h-fit bg-[#0F1117]'>
            <section className='sign-in min-h-screen max-h-fit flex justify-center w-full p-6 flex-col items-center'>
                <form className='bg-[#151821] w-[90%] h-4/5 flex flex-col gap-3 max-w-[450px] mt-5 pt-[50px] pb-[70px] px-[60px] rounded-[20px] left-2/4 top-2/4'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className="text-white font-medium text-2xl ">Thank You</h1>
                            <p className='text-sm text-[#858EAD]'>An email containing a link to reset the password has been sent. Please follow the instructions.</p>
                        </div>
                    </div>
                    <div className='flex gap-3 flex-col justify-center mx-0 my-[15px] rounded-[3px]'>
                        <Link to={"/signin"}><button className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-sm basis-[48%] h-10 w-full rounded-md text-white font-medium border-0 outline-none' type="button">Back To Login</button></Link>
                        <p onClick={resend} className='self-center text-[#FF7000] cursor-pointer '>Send Again</p>
                    </div>
                </form>
            </section>
        </section>
  )
}

export default ThankYouPassword