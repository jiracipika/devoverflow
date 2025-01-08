import React from 'react'
import { Link } from 'react-router-dom'

const signin = () => {
    return (
        <section className='bg-[#25438B] h-fit w-full p-6 flex-col items-center'>
            <form className='bg-[#FAF7F8] w-[90%] h-4/5 max-w-[450px] absolute -translate-x-2/4 -translate-y-2/4  text-center mt-5 pt-[50px] pb-[70px] px-[60px] rounded-[20px] left-2/4 top-2/4'>
                <h1 className="text-center font-bold text-4xl italic">Sign In</h1>
                <div class='input-group'>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input type="email" placeholder="Email" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input type="password" placeholder="Password" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <p className='text-[16px]'>Don't have an account? <Link className='font-[bold] text-[black] text-[16px] text-decoration-line: underline' to={"/Signup"}>Sign Up</Link> Here.</p>
                </div>
                <div class="btn-field" className='w-full mt-10;'>
                    <button className='text-xl basis-[48%] h-10 w-6/12 bg-[#21C7E7] rounded-[20px] border-0 outline-none' type="button" id="signInBtn">Sign In</button>
                </div>
            </form>
        </section>
    )
}

export default signin