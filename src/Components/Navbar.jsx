import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 justify-center text-indigo-700 font-bold text-lg'>
        <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/paste">
            AllPaste
        </NavLink>

    </div>
  )
}
