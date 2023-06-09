const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    url:{
        type: String,
    },
    pic:{
        type: String,
    },
    branch:{
        type: String,
        
    },
     quote:{
        type: String,
        required: true,
    },
    likes:[{type: ObjectId , ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    pcomments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
},{
    timestamps: true
})

mongoose.model("Post" , postSchema)