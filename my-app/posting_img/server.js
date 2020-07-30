var express = require('express');
var mongoose = require('mongoose');

var PORT = 3000;

// MODELS
var db = require("./models");

// Initialize express
var app = express();
// PARSE REQUEST BODY PARSER
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// PUBLIC STATIC FOLDER
app.use(express.static("public"));

// CONNECT TO MONGODB
mongoose.connect("mongodb://localhost/imageDB", { useNewUrlParser: true });

// When the server starts, create and save a new User document to the db
db.User.create({ name: "" })
  .then(function(dbUser) {
    console.log(dbUser);
  })
  .catch(function(err) {
    console.log(err.message);
  });

  // Routes

// Route for retrieving all files from the db
app.get("/file", function(req, res) {
    // Find all Files
    db.File.find({})
      .then(function(dbFile) {
        // If all Files are successfully found, send them back to the client
        res.json(dbFile);
      })
      .catch(function(err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
  });

  // Route for saving a new File to the db and associating it with a User
app.post("/submit", function(req, res) {
    // Create a new File in the db
    db.File.create(req.body)
      .then(function(dbFile) {
        // If a File was created successfully, find one User (there's only one) and push the new File's _id to the User's `Files` array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.User.findOneAndUpdate({}, { $push: { files: dbFile._id } }, { new: true });
      })
      .then(function(dbUser) {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  
//   POPULATING DB

  // Route to get all User's and populate them with their files
  app.get("/populateduser", function(req, res) {
    // Find all users
    db.User.find({})
      // Specify that we want to populate the retrieved users with any associated files
      .populate("files")
      .then(function(dbUser) {
        // If able to successfully find and associate all Users and Files, send them back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  
  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });