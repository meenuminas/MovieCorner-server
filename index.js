//loads .env file contents into process.env
require('dotenv').config()
//import express and store
const express=require('express')
//import cors
const cors=require('cors')
const router = require('./Routes/router')
//connection with a connection.js
require('./DB/connect')
//express server
const mbServer=express()

//use cors in server
mbServer.use(cors())
//json parse
mbServer.use(express.json())
//import router
mbServer.use(router)
//available file/folder from server to other apps
mbServer.use('/uploads',express.static('./uploads'))

//host the server
const PORT=3000
//to host mbServer :localhost:3000
mbServer.listen(PORT,()=>{
    console.log(`Movie Booking Server Started at port:${PORT}`);
})

//to resolve get http request to http://localhost:3000
mbServer.get('/',(req,res)=>{
    res.send("<h1 style=color:purple>Movie Booking Server Started..and waiting for client request</h1>")
})