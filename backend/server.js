var express = require("express");
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// PUBLIC STATIC FOLDER
app.use(express.static("public"));

//ROUTE TO USER SIGNUP
app.post('/signup',(req, res) => {
  let data = {name: req.body.userName, password: req.body.password};
  console.log (data); 
  
  // create database user
db.User.create(data).then((createdUserRecord, err) => {
  if (err) {
      res.json("signup failed")
      return;
  }
  res.json({record: createdUserRecord, status: 200});
})
});

app.post('/catch',(req, res) => {
  let data = {location: req.body.location, weight: req.body.weight, length: req.body.length, bait: req.body.bait, time: req.body.time, date: req.body.date, fish: req.body.fish, temperature: req.body.temperature, weathercondition: req.body.weathercondition, UserId: req.body.userId};
  console.log (data); // create catch table
 db.Catch.create(data).then(function(dbcatch){ 
   console.log(dbcatch)
   res.json(dbcatch)
 })
});

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

// Static directory to be served
// app.use(express.static("app/public";


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

