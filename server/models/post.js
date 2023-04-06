const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    versionid:{
        type: String,
    },
    publicid:{
        type: String,
    },
    format:{
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
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
},{
    timestamps: true
})

mongoose.model("Post" , postSchema)