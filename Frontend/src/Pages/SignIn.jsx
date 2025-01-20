import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const signin = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const signInClick = () =>{
        if (email == "" || pass == "") {
            console.log("Empty Inputs")
            return
        }

        try {
            const response = axios.post('https://6ecc-72-138-28-18.ngrok-free.app/api/auth/login', {
                email: email,
                password: pass,
            });

            console.log('Login successful:', response);
            alert('Login successful!');
        } catch (error){
            console.error('Error during login:', error.response ? error.response.data : error.message);
            alert('Login failed. Please try again.');
        }

    }

    return (
        <section className='bg-[#0F1117] min-h-screen max-h-fit flex justify-center w-full p-6 flex-col items-center'>
            <form className='bg-[#151821] w-[90%] h-4/5 max-w-[450px] text-center mt-5 pt-[50px] pb-[70px] px-[60px] rounded-[20px] left-2/4 top-2/4'>
                <h1 className="text-[#FFFFFF] text-center font-bold text-4xl italic">Sign In</h1>
                <div class='input-group'>
                    <div className='bg-[#212734] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='bg-transparent text-[#858EAD] w-full px-[15px] py-[18px] border-0 outline-none placeholder-#858EAD'/>
                    </div>
                    <div className='bg-[#212734] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" className='bg-transparent text-[#858EAD] w-full px-[15px] py-[18px] border-0 outline-none placeholder-#858EAD'/>
                    </div>
                    <p className='text-[16px] text-[#FFFFFF]'>Don't have an account? <Link className='font-[bold] text-[#FF7000] text-[16px] text-decoration-line: underline' to={"/Signup"}>Sign Up</Link> Here.</p>
                </div>
                <div className='w-full mt-10;'>
                    <button onClick={signInClick} className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-xl basis-[48%] h-10 w-6/12 bg-[#21C7E7] rounded-[20px] border-0 outline-none' type="button" id="signInBtn">Sign In</button>
                </div>
            </form>
        </section>
    )

    
}

export default signin