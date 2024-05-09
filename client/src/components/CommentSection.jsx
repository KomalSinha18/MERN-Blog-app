import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Comment from './Comment'

export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    // console.log(comments);
    console.log(comments.length);
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (comment.length> 200) {
            return
        }
        try {
            const res = await fetch('/api/comment/create',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content:comment,
                    postId,
                    userId:currentUser._id})
            })
            const data = await res.json()
            console.log(data);
            if (res.ok) {
                setComment('')
                setCommentError(null)
                setComments(data,...comments)
            }
            if (!res.ok) {
                setCommentError(data.message)
                return
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }
    useEffect(() => {
     const getComments = async() => {
try {
    const res = await fetch(`/api/comment/getPostComments/${postId}`)
    const data = await res.json()
    console.log(data);
    if (res.ok) {
        setComments(data?.comments)
    }
} catch (error) {
    console.log(error.message);
}
     }
     getComments()
    }, [postId])
    
    const handleLike = async (commentId) => {
        try {
          if (!currentUser) {
            navigate('/sign-in');
            return;
          }
          const res = await fetch(`/api/comment/likeComment/${commentId}`, {
            method: 'PUT',
          });
          if (res.ok) {
            const data = await res.json();
            console.log(data)
            setComments(
              comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: data.comment.likes,
                      numberOfLikes: data.comment.likes.length,
                    }
                  : comment
              )
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      const handleEdit = async (comment, editedContent) => {
        setComments(
          comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
          )
        );
      };

  return (
    <div className='max-w-2xl mx-auto w-full'>
        {
            currentUser ?
            (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img className='h-5 w-5  object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                    <Link to={'/dashboard?tab=profile'} className='text-sm text-cyan-600 hover:underline'>
                     @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link to={'/sign-in'} className='text-blue-500 hover:underline'>
                    Sign In
                    </Link>
                </div>
            )
        }
        {
            currentUser && (
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea placeholder='Add a comment...'
                    rows='3'
                    maxLength='200'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                            Submit
                        </Button>
                    </div>
              {
                commentError && (
                    <Alert color='failure' className='mt-5'>
                    {commentError}
                </Alert>
                )
              }
                </form>
            )
        }
        {
            comments.length === 0 ? (
                <p className='text-sm my-5'>No Comments yet!</p>
            ) : (
                <>
                <div className="text-sm my-5 flex items-center gap-1">
                    <p>Comments</p>
                    <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                        <p>{comments.length}</p>
                    </div>
                </div>
                    
                {comments.map((comment,index) => (
           <Comment key={index} comment={comment} onLike={handleLike} onEdit={handleEdit} />
          ))}
                </>

            )
        }
    </div>
  )
}
