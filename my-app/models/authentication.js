// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.


// // Creates a "Character" model that matches up with DB
// var Authentication = sequelize.define("authentication", {
//   // the routeName gets saved as a string
//   username: Sequelize.STRING,
//   // the name of the character (a string)
//   password: Sequelize.STRING,

// }, {
//   // disable the modification of tablenames; By default, sequelize will automatically
//   // transform all passed model names (first parameter of define) into plural.
//   // if you don't want that, set the following
//   freezeTableName: true
// });

// // Syncs with DB
// Authentication.sync();

// // Makes the Character Model available for other files (will also create a table)
// module.exports = Authentication;