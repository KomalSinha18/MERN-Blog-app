import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun} from "react-icons/fa";
import {useSelector} from "react-redux"
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  
  // const location = useLocation();
  const path = useLocation().pathname
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Komal's</span>
            Blog
        </Link>
        <form >
            <TextInput 
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    />
                    </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
            </Button>
            <div className='flex gap-2 md:order-2'>
              <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaSun/> : <FaMoon/>}
              </Button>
              {
              currentUser ? (
                <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                  alt='user'
                  img={currentUser.profilePicture}
                  rounded
                  />
                }
                >
                  <Dropdown.Header>
                    <span className='block text-sm' >@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate' >@{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to='/dashboard?tab=profile'>
                    <Dropdown.Item>
                      Profile
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Divider/>
                  <Dropdown.Item>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown>
              )
              :
              ( 
              <Link to='/sign-in'>
              <Button gradientDuoTone='purpleToBlue' outline>
              Sign in
              </Button>
              </Link>
              )
             
              } 
              <Navbar.Toggle/>
            </div>
              <Navbar.Collapse >
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/projects">Projects</NavLink>
              </Navbar.Collapse>
    </Navbar>
  )
}
