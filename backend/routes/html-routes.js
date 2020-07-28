// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/catch.html"));
  });

  // cms route loads builder.html
  app.get("/builder", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/builder.html"));
  });

  // blog route loads catch.html
  app.get("/catch", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/catch.html"));
  });

  // authors route loads user-manager.html
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  });

};