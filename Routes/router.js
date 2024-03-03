//import express
const express=require('express')
//import usercontroller
const userController=require('../Controllers/userController')
//import admin
const adminController=require('../Controllers/adminController')
//import moviecontrolleer
const moviesController=require('../Controllers/moviesController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
//import ticket comtrooler
const ticketController=require('../Controllers/ticketController')
//setup routes for express
const router=new express.Router

//register api
router.post('/register',userController.register)

//userlogin api
router.post('/userlogin',userController.userlogin)

//adminlogin api
router.post('/adminlogin',adminController.adminlogin)

//add movies api router specific middleware
router.post('/add-movie',jwtMiddleware,multerConfig.single('movieImg'),moviesController.addMovies)

//get home movies api router specific middleware                                  
router.get('/get-homemovie',moviesController.getHomeMovie)

//get all movies api router specific middleware
router.get('/get-allmovie',jwtMiddleware,moviesController.getAllMovie)

//get admin movies api router specific middleware
router.get('/get-adminmovie',jwtMiddleware,moviesController.getAdminMovie)

//get booking movie details
// router.get('/get-bookmovie/:movieId',jwtMiddleware,moviesController.getBookMovie)


///remove movie
router.delete('/remove-movie/:pid',jwtMiddleware,moviesController.removeMovie)

///create tickets
router.post('/tickets',jwtMiddleware,ticketController.createTicket)

//get user bookmovie
router.get('/get-user-movie',jwtMiddleware,ticketController.getUserBookmovies)

//remove ticket

//get user bookmovie
router.delete('/remove-ticket/:pid',jwtMiddleware,ticketController.removeTicket)
//edited update movies
router.put('/movie/edit/:mid',jwtMiddleware,multerConfig.single('movieImg'),moviesController.editMovie)
//export router
module.exports=router