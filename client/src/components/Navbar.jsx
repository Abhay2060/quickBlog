import React from 'react'
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const {navigate, isAdmin} = useAppContext()

  return (
    // The main container remains responsive
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
        <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
        
        {/* Wrapper for the buttons */}
        <div className='flex items-center gap-4 sm:gap-6'>
            
            {/* New Sign In Button */}
            <button 
                onClick={()=>navigate('/signup')} 
                className='rounded-full text-sm cursor-pointer text-primary border border-primary px-6 sm:px-10 py-2 sm:py-2.5 hover:bg-primary/10 transition-colors duration-300'
            >
                Sign In
            </button>

            {/* Existing Login Button (changed navigate to /login) */}
            <button 
                onClick={()=>navigate('/admin')} 
                className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 sm:px-10 py-2 sm:py-2.5'
            >
                {isAdmin ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} className='w-3' alt="arrow" />
            </button>
        </div>
    </div>
  )
}

export default Navbar