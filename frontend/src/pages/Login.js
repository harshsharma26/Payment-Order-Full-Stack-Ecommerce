import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import '../pages/login.css';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

function Login() {
    const [showPassword,setShowPassword] = useState(false)
    
    const [data,setData] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const { fetchUserDetails,fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {  // Changed uri to url
                method: SummaryApi.signIn.method,
                credentials:'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const dataApi = await dataResponse.json();
    
            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate("/")
                fetchUserDetails()
                fetchUserAddToCart()
            } else if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } catch (error) {
            toast.error("An error occurred during sign-in");
            console.error("Sign-in error:", error);
        }
    };
    

console.log("Data Login",data)
    return (
    <section id="login">
        <div className='mx-auto container p-4'>
            <div className='bg-white p-4 py-5 w-full max-w-md mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt='login icons'/>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email:</label>
                        <div className='bg-slate-200 p-2'>
                            <input type='email'name="email" value={data.email} onChange={handleOnChange} placeholder='Enter Email' className='w-full f-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <div className='bg-slate-200 p-2 flex'>
                            <input type={showPassword ? "text":"password"} name="password" value={data.password} onChange={handleOnChange} placeholder='Enter Password' className='w-full f-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                            <span>
                                {
                                    showPassword ? 
                                    ( <FaEye />)
                                    :
                                    
                                    (<FaEyeSlash />)
                                    
                                }
                               
                                
                            </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className="block w-fit ml-auto  hover:text-red-500">Forgot Password</Link>

                    </div>
                    <button className='bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-4 primary'>Don't have account? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700'>Sign Up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login
