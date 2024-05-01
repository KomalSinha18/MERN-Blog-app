import React from 'react'
import {Footer} from "flowbite-react"
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function FooterCom() {
  return (
   <Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Komal's</span>
            Blog
        </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid sm:grid-cols-3'>
           <div>
           <Footer.Title title='About'/>
            <Footer.LinkGroup col>
                <Footer.Link 
                href='https://www.100jsprojects.com'
                target='_blank'
                rel='noopener noreferrer'
                >
                    100 JS Projects
                </Footer.Link>
                <Footer.Link 
                href='/about'
                target='_blank'
                rel='noopener noreferrer'
                >
                    Komal's Blog
                </Footer.Link>
            </Footer.LinkGroup>
           </div>
           <div>
           <Footer.Title title='follow us'/>
            <Footer.LinkGroup col>
                <Footer.Link 
                href='https://github.com/komalsinha18'
                target='_blank'
                rel='noopener noreferrer'
                >
                    Github
                </Footer.Link>
                <Footer.Link 
                href='#'
                >
                    Discord
                </Footer.Link>
            </Footer.LinkGroup>
           </div>
           <div>
           <Footer.Title title='Legal'/>
            <Footer.LinkGroup col>
                <Footer.Link 
                href='#'
                >
                    Privacy Policy
                </Footer.Link>
                <Footer.Link 
                href='#'
                >
                    Terms & condition
                </Footer.Link>
            </Footer.LinkGroup>
           </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <Footer.Copyright href='#' by="Komal's blog" year={new Date().getFullYear()}/>
            <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='#' icon={FaFacebook}/>
                <Footer.Icon href='#' icon={FaInstagram}/>
                <Footer.Icon href='https://github.com/komalsinha18' icon={FaTwitter}/>
                <Footer.Icon href='#' icon={FaGithub}/>
                

            </div>
        </div>
    </div>
   </Footer>
  )
}
