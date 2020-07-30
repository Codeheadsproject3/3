var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new FileSchema object
// This is similar to a Sequelize model
var FileSchema = new Schema({
  // `title` must be of type String
  url: String,
 
});

// This creates our model from the above schema, using mongoose's model method
var File = mongoose.model("File", FileSchema);

// Export the File model
module.exports = File;