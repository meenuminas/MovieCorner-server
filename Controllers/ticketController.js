//import model
const jwt=require('jsonwebtoken');
const tickets = require('../Model/ticketModel');

//ticket booking
exports.createTicket = async (req, res, next) => {
    try {
        // Extract user ID from decoded JWT payload
        const userId = req.payload.userId;
 
        // Destructure request body
        const { bookingDate, seatNo, movie, title } = req.body;
 
        // Check if the seat is already booked for the given movie and date
        const existingTicket = await tickets.findOne({ bookingDate: new Date(bookingDate), seatNo, movie });
 
        if (existingTicket) {
            // If the seat is already booked for the given movie, send an alert
            return res.status(404).json({ message: "This seat is already booked for this movie. Please select another seat." });
        }
 
        // Calculate the total cost based on the number of seats and ticket price
        const ticketPrice = 150; // Assuming the ticket price is 150 Rs
        const totalCost = ticketPrice * seatNo.length;

        // Create new ticket instance
        const newTicket = new tickets({
            bookingDate: new Date(bookingDate),
            seatNo,
            movie,
            userId, // Assign the extracted userId here
            title,
            totalCost
        });
 

            const savedTicket = await newTicket.save();
 
            // Respond with the saved ticket
            res.status(200).json(savedTicket);
    
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: 'Ticket creation failed', error: err });
    }
 };
 
//get user booked tickets


// Controller function to handle getting user's booked movies
exports.getUserBookmovies = async (req, res) => {
    try {
        // Extract user ID from JWT payload
        const {userId} = req.payload;

        // Query the database for tickets belonging to the user
        const userBookMovie = await tickets.find({ userId });

        // Return the list of user's booked movies
        res.status(200).json(userBookMovie);
    } catch (err) {
        // Log the error for debugging purposes
        console.error(err);

        // Return an appropriate error response to the client
        res.status(500).json({ error: 'Internal server error' });
    }
};

//to delete ticket
exports.removeTicket=async(req,res)=>{
   console.log("Inside rmove ticket");
   const {pid}=req.params
   try{
      const ticketDetails=await tickets.findByIdAndDelete({_id:pid})
      res.status(200).json(ticketDetails)
   }catch(err){
      console.log(err);
   }
}




