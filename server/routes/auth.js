const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const middleware = require("../middleware/middleware");



router.get("/", (req, res) => {
  res.send("Hello");
});


/*****************  SIGN UP  ********************************************  */

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password , pic} = req.body;

    const exist = await User.findOne({ email });
    const exist1 = await User.findOne({ name });

    if (!name || !email || !password) {
      return res.status(422).json({ message: "Please fill all fields" });
    }
    if (exist1) {
        return res.status(400).json({ message: "Name already exist" });
      }
    if (exist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    if (isNaN(email[0])) {
        return res.status(422).json({ message: "Please use clg mail" });
      }
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password must be > 5 chars long.." });
    }

    //     const d = new Date();
    // let year = d.getFullYear();
    //     console.log(year-(parseInt('2000')+(parseInt(email[0])+ parseInt(email[1]))));
   

    let user = new User({
        name,
      email,
      password,
      pic
    });
    await user.save();
    res.status(200).json({ message: "Registerd Successfully !!" });
  } catch (error) {
    console.log("error in register", error);
    return res.status(400).json({error:"Unable to add User"});
  }
   
  
});

/*****************  SIGN IN ********************************************  */

router.post("/signin", async(req,res) => {
    try {
        const { email, password } = req.body;
        const exist = await User.findOne({ email });
        if (!exist) {
          return res.status(400).json({message:"No user with this Email.."});
        }
        if(exist.password !== password){
          return res.status(400).json({message:"Invalid Password..!"});
        }

          const token = jwt.sign({_id:exist._id},process.env.JWT_SECRET)
   
          res.json({token,_id:exist._id,email:exist.email,name:exist.name,pic:exist.pic})

    } catch (error) {
        console.log("error in register", error);
        return res.status(400).json({error:"Unable to Sign in..."}); 
    }
})

module.exports = router;
