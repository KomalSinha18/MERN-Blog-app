import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { Button, Spinner } from 'flowbite-react'

export default function PostPages() {
    const {postSlug} = useParams() 
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)
console.log(post);
useEffect(() => {
//  console.log(postSlug);
const fetchPost  = async() => {
    try {
        setloading(true)
        const res =  await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data= await res.json()
        if (!res.ok) {
          setError(true)
          setloading(false)
          return
        }
        else{
          setPost(data.posts[0])
          setloading(false)
          setError(false)

        }
    } catch (error) {
        setError(true)
        setloading(false)
    }
}
fetchPost()
}, [postSlug])

if(loading) return (
  <div className='flex justify-center items-center min-h-screen'>
  <Spinner size='xl'/>
  </div>
)
  return (
   <main className='p-3 flex flex-col  max-w-6xl min-h-screen mx-auto'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>{post && post.category}</Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b  border-slate-500 mx-auto w-full max-2xl: text-xs'>
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className='italic'>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div dangerouslySetInnerHTML={{__html: post && post.content}} className='p-3 max-w-2xl mx-auto w-full post-content'>1
        </div>
   </main>
  )
}
