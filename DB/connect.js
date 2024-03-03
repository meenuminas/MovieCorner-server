const mongoose=require('mongoose')
//load .env file
const connectionString=process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb Atlas Connected");
}).catch((reason)=>{
    console.log(reason);
    console.log("Mongodb connection failed");
})