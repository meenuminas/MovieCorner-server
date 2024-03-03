const mongoose=require('mongoose')

const ticketSchema=new mongoose.Schema({
    bookingDate:{
        type: Date,
        required: true
      },
      seatNo: {
        type: [Number], // Assuming seat numbers are integers
        required: true,
        
      },
      movie: {
        type:String,
        required:true
      },
      userId: {
        type:String,
        required: true,
      },
      title:{
        type:String,
        required: true,
      },
      totalCost:{
        type:Number
     
      }
})
const tickets = mongoose.model("tickets",ticketSchema)

module.exports=tickets