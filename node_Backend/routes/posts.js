const express = require('express');
const Post = require('../models/Post');


const router = express.Router();

router.get('/sayhello',async(req,res) => {
    res.status(200).json('hello')
})


router.post('/addPost' , async(req,res) => {
    const {title,content,createdBy} = req.body;
    try {
        const newPost = new Post({title,content,createdBy});
        await newPost.save();
        res.status(200).json(newPost);
        
    } catch (error) {

        res.status(500).json('Unable to save');
        
    }
})

router.get('/allPosts',async(req,res) => {
    try {
        const allPosts = await Post.find().populate('comment')
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json("unable to get post");
    }
})



//instgram -> URL-> API -> reel;instgram.com/reel/share/reelId


// frontend -> backend
// cll the API -> backend ->

//API will have request -> UI
//response -> backend

module.exports = router;