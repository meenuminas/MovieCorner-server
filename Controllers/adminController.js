const jwt=require('jsonwebtoken');
const movies = require('../Model/movieModel');
//adminlogin

exports.adminlogin = async (req, res) => {
    console.log("Inside adminlogin API");
    const { username, password } = req.body;
    console.log(username, password);

    try {
    // Retrieve admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Compare provided username and password with environment variables
    if (username !== adminUsername || password !== adminPassword) {
       
          return res.status(401).json({ error: 'Invalid credentials' });
    
    }

    // Generate JWT token
    const token = jwt.sign({ username: adminUsername }, process.env.JWT_SECRETKEY);

    res.status(200).json({ token,username });
    } catch (err) {
     res.status(401).json(err);
    }
}

