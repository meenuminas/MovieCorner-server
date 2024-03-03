//import model
const movies=require('../Model/movieModel')

//add movies
exports.addMovies=async(req,res)=>{
    console.log("INside add movies api");
    const username=req.payload
    const {title,description,releaseDate,starrer,genre,language}=req.body
    const movieImg=req.file.filename
   console.log(title,description,releaseDate,starrer,genre,language,movieImg,username);
   try{
   const existingMovie=await movies.findOne({title})
   if(existingMovie){
    res.status(406).json("This movie is already exist!!please upload another movie..")
   }else{
    //add movie
    const newMovie=new movies({
        title,description,releaseDate,starrer,genre,language,movieImg
    })
   await newMovie.save()
   res.status(200).json(newMovie)
   }
   }catch(err){
  res.status(401).json(err)
   }
   
}

//get home movie
exports.getHomeMovie=async(req,res)=>{
    try{
        const homeMovies=await movies.find().limit(3)
        res.status(200).json(homeMovies)
    }catch(err){
        res.status(401).json(err)
    }
}

//get all movie
exports.getAllMovie=async(req,res)=>{
    const searchKey=req.query.search
    const query={
        title:{
      $regex:searchKey,$options:"i"     
        }
    }
    try{
        const allMovies=await movies.find(query)
        res.status(200).json(allMovies)
    }catch(err){
        res.status(401).json(err)
    }
}

/////get adminprofile movie
// exports.getAdminMovie=async(req,res)=>{
//     const adminUsername=req.payload
//     try{
//         const adminMovies=await movies.find({adminUsername})
//         res.status(200).json(adminMovies)
//     }catch(err){
//         res.status(401).json(err)
//     }
// }
exports.getAdminMovie=async(req,res)=>{
  
    try{
        const adminMovies=await movies.find()
        res.status(200).json(adminMovies)
    }catch(err){
        res.status(401).json(err)
    }
}





//get movie when clicking book now
// exports.getBookMovie=async(req,res)=>{
//     const movieId=req.params.movieId;
//     try{
//         const bookMovies=await movies.findById({movieId})
//         if (!bookMovies) {
//             return res.status(404).json({ error: 'Movie not found' });
//         }
//         res.status(200).json(bookMovies)
//     }catch(err){
//         res.status(401).json(err)
//     }
// }

//remove movies fromadded movies
exports.removeMovie=async(req,res)=>{
    console.log("inside remove movie");
    const {pid}=req.params
    try{
        const movieDetails=await movies.findByIdAndDelete({_id:pid})
        res.status(200).json(movieDetails)
    }catch(err){
        res.status(401).json(err)
    }
}

//edit movei
exports.editMovie=async(req,res)=>{
    console.log("Inside edit movie");
    const{mid}=req.params
    const userId=req.payload
    const {title,description,releaseDate,starrer,genre,language,movieImg}=req.body
    const uploadImg=req.file?req.file.filename:movieImg
    try{
   const updatedMovie=await movies.findByIdAndUpdate({_id:mid},
    {title,description,releaseDate,starrer,genre,language,movieImg:uploadImg,userId
    },{new:true})
    await updatedMovie.save()
    res.status(200).json(updatedMovie)
    }catch(err){
res.status(401).json(err)
    }
}