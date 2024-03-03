const users=require('../Model/userModel')
const jwt=require('jsonwebtoken')
const tickets=require('../Model/ticketModel')
//register
exports.register=async(req,res)=>{
    console.log("inside register api");
    const{username,email,password}=req.body
    console.log(username,email,password);
    try{
        const existingUser=await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("Account already exist..please login")
        }else{
            //add user to collection
    const newUser=new users({
        username,email,password,profile:""
    })
    await newUser.save()
    res.status(200).json(newUser)
        }
    }catch(err){
       res.status(401).json(err)
    }
   
}

//userlogin
exports.userlogin=async(req,res)=>{
    console.log("inside userlogin api");
    const{email,password}=req.body
    console.log(email,password);
    try{
        const existingUser=await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            //exist user allow login
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRETKEY)
            res.status(200).json({existingUser,token})
        }else{
           res.status(404).json("Invalid Email/Password")
    
        }
}  catch(err){
    res.status(401).json(err)
}
}

// //to get the booked movies
// exports.getBookingOfuser=async(req,res,next)=>{

// const id=req.params.id;
// try{
//     const userMovie=await tickets.find({user:id})
   
//         //     // Extract movie IDs from booked tickets
//         //   const bookedMovieIds = userMovie.map(ticket => ticket.movie);
//           res.status(200).json(userMovie)
// }catch(err){
//     res.status(401).json(err)
// }

// }