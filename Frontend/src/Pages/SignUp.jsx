import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import validator from "validator"
import axios from 'axios'

const signUp = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('')
    const [name, setName] = useState('');

    const confirmName = () => {
        if (name == "") {
            console.log("Please enter your name");
            return false
        }
        else if (name.length < 3) {
            console.log("Name is too short");
            return false
        }
        else {
            console.log("Valid Name");
            return true
        }
    }

    const validateEmail = () =>{
        if (!validator.isEmail(email)) {
            console.log("Invalid Email")
            return false
        }
        else {
            console.log("Valid Email")
            return true
        }
    }

    const confirmPasswords = () => {
        if (pass == "") {
            console.log("Please Enter Password")
            return false
        }
        else if (pass != confirmPass){
            console.log("Password does not match")
            return false
        }
        else {
            console.log("Password does match")
            return true
        }
    }

    const registerClick = () => {

        if (confirmName() == false || validateEmail() == false || confirmPasswords() == false) {
            console.log("Form validation Failed");
            return;
        }
    
        try {
            const response = axios.post('https://5b1f-72-138-28-18.ngrok-free.app/api/user/register', {
                name: name,
                email: email,
                password: pass,
            });
    
            console.log('Registration successful:', response.data);
            alert('Registration successful!');
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
            alert('Registration failed. Please try again.');
        }
    }


    return (
        <section className='bg-[#25438B] min-h-screen max-h-fit flex justify-center w-full p-6 flex-col items-center'>
            <form className='bg-[#FAF7F8] w-[90%] h-4/5 max-w-[450px] text-center mt-5 pt-[50px] pb-[70px] px-[60px] rounded-[20px] left-2/4 top-2/4'>
                <h1 className="text-center font-bold text-4xl italic">Sign Up</h1>
                <div class='input-group'>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input value={name} name="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input id="UsernameInput" type="text" placeholder="Username" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <div className='bg-[#b1b2b5] flex items-center mx-0 my-[15px] rounded-[3px]'>
                        <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" className='bg-transparent w-full px-[15px] py-[18px] border-0 outline-none placeholder-black'/>
                    </div>
                    <p className='text-[16px]'>Already Signed Up? <Link className='font-[bold] text-[black] text-[16px] text-decoration-line: underline' to={"/signin"}>Sign In</Link> Here.</p>
                </div>
                <div class="btn-field" className='w-full mt-10;'>
                    <button onClick={registerClick}  className='text-xl basis-[48%] h-10 w-6/12 bg-[#21C7E7] rounded-[20px] border-0 outline-none' type="button" id="signUpBtn">Sign Up</button>
                </div>
            </form>
        </section>
    )
}

export default signUp