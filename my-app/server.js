const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json())

//route for insert data
app.post('/signup',(req, res) => {
    let data = {name: req.body.userName, password: req.body.password};
    console.log (data); // create database user
   
});
app.post('/login',(req, res) => {
    let data = {name: req.body.userName, password: req.body.password};
    console.log (data); // find database user copmpare password if correct send back to frontend saying login is successful
    res.end();
})
app.post('/catch',(req, res) => {
    let data = {location: req.body.location, weight: req.body.weight, length: req.body.length, bait: req.body.bait, time: req.body.time, date: req.body.date, fish: req.body.fish, temperature: req.body.temperature, weathercondition: req.body.weathercondition};
    console.log (data); // post catch
   
});

  
app.listen(PORT, () => {

    console.log('App running on port $(3030)');

});

