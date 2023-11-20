const express = require("express");
const mongo = require("mongodb");


// initializing app
const app = express();


const MongoClient = mongo.MongoClient;



// Listening routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});




const PORT = 5500;
const DB_URL = `mongodb+srv://twitter_admin:CQXrLHuJ7riqCxTZ@cluster0.hfahong.mongodb.net/?retryWrites=true&w=majority`; // place the db url here 

// starting server
app.listen(PORT, (err) => {
  console.log(`Server is running on port:${PORT}`);


// db 
MongoClient.connect(DB_URL, (err, db)=> {
  if (err) console.log(err);
 else  console.log("Database created!");

});



  });
