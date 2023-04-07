const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const middleware = require("../middleware/middleware");
const Post = mongoose.model("Post")
const User = mongoose.model("User")

/*****************  ALL POSTS  ********************************************  */

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

/*****************  CREATE POST  ********************************************  */

router.post('/createpost',middleware, async(req,res)=>{
    try {
        const {url,pic,branch,quote} = req.body;
        // const exist = Post.find()
        if(!quote || !branch){
            return res.status(422).json({message:"Please fill all fields.."})
        }
        // if(exist){
        //     // return res.status(422).json({message:"Quote Already exist.."})
        //     console.log(exist.quote);

        // }
        // req.user.password = undefined
        const post = new Post({
           url,
           pic,
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

/*****************  MY POSTS  ********************************************  */

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

/***************** LIKES  ********************************************  */

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

/*****************  UNLIKE  ********************************************  */

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

/*****************  COMMENT  ********************************************  */

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

/*****************  ANONYMOUS COMMENTS  ********************************************  */

router.put('/pcomment',middleware,async (req,res)=>{
    try {
        const comment = {
            text:req.body.text,
            postedBy:req.user._id
        }
       const updated= await Post.findByIdAndUpdate(req.body.postId,{
            $push:{pcomments:comment}
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
        console.log(err,"Error in pcomments..");
        return res.status(400).json({error:"Error in pcomments.."})
    }
})

/*****************  DELETE POST  ********************************************  */

router.delete('/deletepost/:postId',middleware,async(req,res)=>{
    try {

       
       await Post.findByIdAndDelete({_id:req.params.postId})

        
    } catch (error) {
        console.log(error,"Error in Getting my post..");
        return res.status(400).json({error:"Error while deleting Posts.."})
    }
})

/*****************  DELETE COMMENT  ********************************************  */

router.delete('/deletecomment/:id/:commentId',middleware,async(req,res)=>{
    try {
        const updated= await Post.findByIdAndUpdate(req.params.id,{
            $pull:{ comments:{_id:req.params.commentId}}
        },{new:true})
        .populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")
        res.json(updated);
        
//        await Post.findByIdAndDelete({_id:req.params.commentId})
//        .catch(err=> console.log(err))
//    console.log(req.params.commentId);
        
    } catch (error) {
        console.log(error,"Error in del comments..");
        return res.status(400).json({error:"Error while deleting comment.."})
    }
})

/*****************  UPDATE PROFILE  ********************************************  */

router.put('/updateprofile/:id',async(req,res)=>{
    
    
    try {
        const { pic} = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {pic: pic},
        {new: true}, // "new: true" or "returnOriginal: false"
      );
      res.status(200).json(updatedUser);
  } catch (error) {
    res.status(422).json({error:"error in update prof"});

  }
})

/*****************  MY PROFILE  ********************************************  */

router.get('/myprofile/:id',middleware,async(req,res)=>{
    try {
      const userdetails =  await User.findById(req.params.id)
        // .populate("postedBy","_id name")
        // .populate("comments.postedBy","_id name")
        // .then(userdetails => {
        //     res.json({userdetails})
        // })
        res.send(userdetails)
    } catch (error) {
        console.log(error,"Error in creating post..");
        return res.status(400).json({error:"Error while fetching myprofile.."})

    }
})

module.exports = router;