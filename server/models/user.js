const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dgo3xjjvb/image/upload/v1680847852/vn5eotb9zbv1e9dgzbtj.jpg"
    }
})

mongoose.model("User",userSchema)
