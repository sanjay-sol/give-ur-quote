const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const middleware = require("../middleware/middleware");
const Post = mongoose.model("Post")
const User = mongoose.model("User")


router.get('/user/:id',async(req,res)=>{
    try {
       const updated = await User.findById(req.params.id)
       return res.json(updated)
        // .catch(err=>res.send(err,"err in getting user deatisls"))
        
    } catch (error) {
        console.log(error,"Error in getting user details..");
        return res.status(400).json({error:"Error while deleting comment.."})  
    }
})

module.exports = router;