import { useState, useEffect } from "react"
import React from 'react'
import {useLocation, Link} from "react-router-dom"
import {Sidebar} from "flowbite-react"
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { HiDocumentText } from "react-icons/hi";
import {useSelector} from 'react-redux'

export default function DashSidebar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [tab, setTab] = useState("")
  const {currentUser} = useSelector(state => state.user)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
    // console.log(tabFromUrl);
  }, [location.search])

  const handleSignout = async() => {
    try {
      const res = await fetch('/api/user/signout',{
        method:'POST'
      })
      const data =await res.json()
      if (!res.ok) {
        console.log(data.message);
      }
      else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
   <Sidebar className="w-full md:w-56">
    <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to='/dashboard?tab=profile'>

          <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'
          as='div'>
          Profile
          </Sidebar.Item>
          </Link>
          {
            currentUser.isAdmin && (
              <Link to='/dashboard?tab=posts'>
          <Sidebar.Item
          active = {tab === 'posts'}
          icon= {HiDocumentText}
          as='div'
          >
            Posts
          </Sidebar.Item>
          </Link>
            )
          }
          <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
          Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}
