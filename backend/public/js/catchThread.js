$(document).ready(function() {
    /* global moment */
  
    // catchContainer holds all of our posts
    var catchContainer = $(".catch-container");
    var catchCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlecatchDelete);
    $(document).on("click", "button.edit", handleCatchEdit);
    // Variable to hold our posts
    var thread;
  
    // The code below handles the case where we want to get blog thread for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getThread(userId);
    }
    // If there's no userId we just get all thread as usual
    else {
      getThread();
    }
  
  
    // This function grabs thread from the database and updates the view
    function getThread(user) {
      userId = user || "";
      if (userId) {
        userId = "/?user_id=" + userId;
      }
      $.get("/api/thread" + userId, function(data) {
        console.log("Thread", data);
        thread = data;
        if (!thread || !thread.length) {
          displayEmpty(user);
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete thread
    function deleteCatch(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/thread/" + id
      })
        .then(function() {
          getThread(catchCategorySelect.val());
        });
    }
  
    // InitializeRows handles appending all of our constructed post HTML inside catchContainer
    function initializeRows() {
      catchContainer.empty();
      var threadToAdd = [];
      for (var i = 0; i < thread.length; i++) {
        threadToAdd.push(createNewRow(thread[i]));
      }
      catchContainer.append(threadToAdd);
    }
  
    // This function constructs a thread's HTML
    function createNewRow(thread) {
      var formattedDate = new Date(thread.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newThreadCard = $("<div>");
      newThreadCard.addClass("card");
      var newThreadCardHeading = $("<div>");
      newThreadCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newThreadTitle = $("<h2>");
      var newThreadDate = $("<small>");
      var newThreadUser = $("<h5>");
      newThreadUser.text("Written by: " + thread.User.name);
      newThreadUser.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newThreadCardBody = $("<div>");
      newThreadCardBody.addClass("card-body");
      var newThreadBody = $("<p>");
      newThreadTitle.text(thread.title + " ");
      newThreadBody.text(thread.body);
      newThreadDate.text(formattedDate);
      newThreadTitle.append(newThreadDate);
      newThreadCardHeading.append(deleteBtn);
      newThreadCardHeading.append(editBtn);
      newThreadCardHeading.append(newThreadTitle);
      newThreadCardHeading.append(newThreadUser);
      newThreadCardBody.append(newThreadBody);
      newThreadCard.append(newThreadCardHeading);
      newThreadCard.append(newThreadCardBody);
      newThreadCard.data("thread", thread);
      return newThreadCard;
    }
  
    // This function figures out which thread we want to delete and then calls deleteCatch
    function handlecatchDelete() {
      var currentThread = $(this)
        .parent()
        .parent()
        .data("thread");
      deleteCatch(currentThread.id);
    }
  
    // This function figures out which thread we want to edit and takes it to the appropriate url
    function handleCatchEdit() {
      var currentThread = $(this)
        .parent()
        .parent()
        .data("thread");
      window.location.href = "/cms?thread_id=" + currentThread.id;
    }
  
    // This function displays a message when there are no thread
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for User #" + id;
      }
      catchContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No thread yet" + partial + ", navigate <a href='/cms" + query +
      "'>here</a> in order to get started.");
      catchContainer.append(messageH2);
    }
  
    // public folder
app.use(express.static("./public"));
app.get("/images", (req, res) => {
  db.File.find({}).then((dbFiles) => {
    console.log(dbFiles);
    res.render("images", { files: dbFiles });
  });
});
app.get("/", (req, res) => res.render("index"));
app.post("/upload2", upload, (req, res) => {
  console.log(req.file);
  let filePath = "/uploads/" + req.file.filename;
  db.File.create({ url: filePath }).then((dbFile) => res.json(dbFile));
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("index", {
          msg: "Error: No File Selected",
        });
      } else {
        res.render("index", {
          msg: "File Uploaded",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

  });