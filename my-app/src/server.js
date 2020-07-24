const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

const app = express();
const connection = mysql.createConnection({
host: 'localhost',
port: 3000,
user: 'root',
password: 'your_password',
database: 'authentication_db'
});

connection.connect(err => {
  if(err) return err;
  
  app.use(cors());
  });
  

//route for insert data
app.post('/',(req, res) => {
    let data = {name: req.body.username, password: req.body.password};
    let sql = "INSERT INTO user SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  








app.listen(PORT, () => {

    console.log('App running on port $(3000)');

});

module.exports=connection;

});