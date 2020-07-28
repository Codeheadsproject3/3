// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting catch thread
  app.get("/api/thread", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Post.findAll({
      // where: {UserId: req.query.user_id},
      where: query,
      include: [db.User]
    }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/thread/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Catch.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // POST route for saving a new post
  app.post("/api/thread", function(req, res) {
    db.Catch.create(req.body).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // DELETE route for deleting thread
  app.delete("/api/thread/:id", function(req, res) {
    db.Catch.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // PUT route for updating thread
  app.put("/api/thread", function(req, res) {
    db.Catch.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });
};