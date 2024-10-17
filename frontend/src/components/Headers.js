import React, { useContext, useState } from 'react'
import Logo from './logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../pages/login.css';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context'; 

const Headers = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:'include'
    })
    const data = await fetchData.json()
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if(data.error){
      toast.error(data.message)
    }
  }
  
    const handleSearch = (e) =>{
      const { value } = e.target
      setSearch(value)
      if(value){
        navigate(`/search?q=${value}`)
      }else{
        navigate("/search")
      }
    }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='f-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
              <Link to="/">
                <Logo w={90} h={50}/>
              </Link>
            </div>
            <div className='hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-1'>
              <input type="text" placeholder='Search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
              <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                <GrSearch />
                </div>
            </div>

            <div className='flex items-center gap-7'>
             <div className='relative group flex justify-center'>
              {
                user?._id &&(
                    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=> setMenuDisplay(preve =>!preve)}>
                      {
                        user?.profilePic ? (
                         <img src={user?.profilePic} alt={user?.name} className='w-10 h-10 rounded-full'/>
                          ):(
                          <FaRegCircleUser />
                        )
                      }
                    </div>
                )
              }

                
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                      <nav>
                       {
                        user?.role === ROLE.ADMIN && (
                          <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> setMenuDisplay(preve =>!preve)} style={{ textDecoration: 'none' }}>Admin Panel</Link>
                        )
                       }
                       <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> setMenuDisplay(preve =>!preve)} style={{ textDecoration: 'none' }}>Order</Link>
                      </nav>
               </div>
                    )
                  }
                 
             </div>
             
              {
                user?._id && (
                  <Link to={"/cart"} style={{ textDecoration: 'none' }} className='text-2xl relative'>
                      <span><FaShoppingCart /></span>
                      <div className='bg-red-600 text-white p-1 rounded-full  flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-xs'>{context?.cartProductCount}</p>
                      </div>
                  </Link>      
                )
              }
              

              <div>
                {
                  user?._id ? (
                    <button onClick={handleLogout} className='prime none px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800 login'>Logout</button>
                  ):
                  (
                    <Link to={"/login"} className='prime none px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800 login' style={{ textDecoration: 'none' }}>Login</Link>
                  )
                }
              </div>
            </div>
        </div>
    </header>
  )
}

export default Headers
