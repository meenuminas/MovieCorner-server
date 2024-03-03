const jwt=require('jsonwebtoken')

//middleware func
const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt Middlewar!!");
    try{
        const token=req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token){
       const jwtResponse= jwt.verify(token,process.env.JWT_SECRETKEY)
        console.log("Decoded JWT Payload:",jwtResponse);
        req.payload=jwtResponse
        console.log(req.payload);
        next()
    }else{
        res.status(406).json("Please provide token!!")
    }
  
    }catch{
        res.status(401).json("Access Denied..Please Login!!")
    }
}

module.exports=jwtMiddleware