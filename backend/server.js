var express = require("express");
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


// Static directory to be served
// app.use(express.static("app/public";


db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

