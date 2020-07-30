const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
var db = require("./models");

// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: "./my-app/public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// CHECK FILE TYPE
function checkFileType(file, cb) {
  // ALLOWED FILE EXTENSIONS
  const filetypes = /jpeg|jpg|png|gif/;

  // CHECK FILE EXT.
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // CHECK MIME
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only images: jpeg, jpg, gif & png !");
  }
}

//init app
const app = express();

mongoose.connect("mongodb://localhost/imageDB", { useNewUrlParser: true });

//EJS
app.set("view engine", "ejs");

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

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
