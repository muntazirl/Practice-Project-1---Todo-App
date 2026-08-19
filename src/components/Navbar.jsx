import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between items-center bg-violet-500 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-lg md:text-xl mx-4 md:mx-10'>&lt;<span>DoneKart</span>/&gt;</span>
        </div>
        <ul className='flex justify-between gap-5 md:gap-10 mx-4 md:mx-10'>
            <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-100'>My Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
