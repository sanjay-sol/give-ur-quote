const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const middleware = require("../middleware/middleware");
const Post = mongoose.model("Post")


router.get('/allposts',middleware, async(req,res)=>{
    try {
        await Post.find()
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
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
        .populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")
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
        .populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")
        res.json(updated);
        
    } catch (err) {
        console.log(err,"Error in Getting my post..");
        return res.status(400).json({error:"Error while fetching MyPosts.."})
    }
})


router.put('/comment',middleware,async (req,res)=>{
    try {
        const comment = {
            text:req.body.text,
            postedBy:req.user._id
        }
       const updated= await Post.findByIdAndUpdate(req.body.postId,{
            $push:{comments:comment}
        },{new:true})
        .populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")
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

router.delete('/deletepost/:postId',middleware,async(req,res)=>{
    try {

        // await Post.findOne({_id:req.params.postId})
        // .populate("postedBy","_id")
        // .then((err,post)=>{
        //     if(err || !post){
        //         return res.status(400).json({err:"Error while deleteing Posts.."})  
        //     }
        //     if(postedBy._id.toString() === req.user._id.toString()){
        //         post.remove()
        //         .then(updated=> res.json(updated) )
        //         .catch(err=> console.log(err,"errron in "))
        //     }
        // })
       await Post.findByIdAndDelete({_id:req.params.postId})
    //    await Post.find()
    //     .populate("postedBy","_id name")
    //     .populate("comments.postedBy","_id name")
    //     .then(posts => {
    //         console.log({posts})
    //     })
    //     .catch(err => {
    //         console.log(err, "error in deleting posts..");
    //     })
    //     .populate("postedBy","_id")
    //     await Post.find()
    //     .populate("postedBy","_id name")
    //     .populate("comments.postedBy","_id name")
    //     .then(posts => {
    //         res.json(posts)
    //     })
    //     .then(console.log(posts))
    //    await updated.remove();
    //     if(postedBy._id.toString() === req.user._id.toString()){
    //         Post.remove()
    //         .then(res.json(updated))
    //         .catch(err=>{
    //             console.log(err,"error in delete post");
    //         })
    //     }
        
    } catch (error) {
        console.log(error,"Error in Getting my post..");
        return res.status(400).json({error:"Error while deleting Posts.."})
    }
})
module.exports = router;