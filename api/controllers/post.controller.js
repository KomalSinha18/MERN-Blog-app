import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const create  = async(req,res ,next) =>{
    console.log(req.user);
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create post'))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/, '-')
    const newPost =new Post({
        ...req.body,
        slug,
        userId: req.user.id
    })
    try {
       const savedPost = await newPost.save() 
       res.status(201).json({
        success:true,
        message: 'saved post',
        savedPost
       })
    } catch (error) {
        next(error)
    }
}