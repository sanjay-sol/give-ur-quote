const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const middleware = require("../middleware/middleware");
const Post = mongoose.model("Post")


router.get('/allposts',middleware, async(req,res)=>{
    try {
        await Post.find()
        .populate("postedBy","_id name")
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err, "error in all posts..");
        })
        
    } catch (error) {
        console.log(err,"Error in creating post..");
        return res.status(400).json({error:"Error while fetching Posts.."})

    }
})


router.post('/createpost',middleware, async(req,res)=>{
    try {
        const {versionid,publicid,format,branch,quote} = req.body;
        if(!quote || !branch){
            return res.status(422).json({message:"Please fill all fields.."})
        }
        // req.user.password = undefined
        const post = new Post({
           versionid,
           publicid,
           format,
           branch,
            quote,
            postedBy:req.user
        })
        post.save().then((result)=>{
            res.json({post:result})
        }).catch(err => {
            console.log(err,"error while saving post to DB");
        return res.status(400).json({message:"Error while Saving Posts.."})

        })

    } catch (error) {
        console.log(error,"Error in creating post..");
        return res.status(400).json({message:"Error while Saving Posts.."})

    }
})

router.get('/myposts',middleware, async(req,res)=>{
    try {
        await Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .then(mypost => {
            res.json({mypost})
        }).catch(err => {
            console.log(err, "Error while fetching My posts");
        })
        
    } catch (error) {
        console.log(error,"Error in Getting my post..");
        return res.status(400).json({error:"Error while fetching MyPosts.."})
    }
})

router.put('/like',middleware,async (req,res)=>{
    try {
       const updated= await Post.findByIdAndUpdate(req.body.postId,{
            $push:{ likes:req.user._id}
        },{new:true})
        res.json(updated);
        // .populate("postedBy","_id name")
        // .then(result=>{
        //    res.json(result)
        //    console.log(result)
        // }).catch(err=>{
        //     res.status(422).json({message:err})
        // })
        
    } catch (err) {
        console.log(err,"Error in Getting my post..");
        return res.status(400).json({error:"Error while fetching MyPosts.."})
    }
})


router.put('/unlike',middleware,async (req,res)=>{
    try {
        const updated= await Post.findByIdAndUpdate(req.body.postId,{
            $pull:{ likes:req.user._id}
        },{new:true})
        res.json(updated);
        
    } catch (err) {
        console.log(err,"Error in Getting my post..");
        return res.status(400).json({error:"Error while fetching MyPosts.."})
    }
})
module.exports = router;