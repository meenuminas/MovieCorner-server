const mongoose=require('mongoose')

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    starrer:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    movieImg:{
        type:String,
        required:true
    },
    isBooked: {
        type: Boolean,
        default: false
      }
    
})

const movies = mongoose.model("movies",movieSchema)

module.exports=movies