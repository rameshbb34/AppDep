const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

mongoose.connect(
  "mongodb+srv://rameshrock34:rameshdb@cluster0.rqlkmxm.mongodb.net/Ramesh?retryWrites=true&w=majority"
);

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

let userSchema = new mongoose.Schema({
  fn: String,
  ln: String,
  email: String,
  password: String,
  age: Number,
  contact: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  // console.log(req.body);
  // let hashedPassword = await bcrypt.hash(req.body.password, 10);
  // let newUser = new User({
  //   fn: req.body.fn,
  //   ln: req.body.ln,
  //   email: req.body.email,
  //   password: hashedPassword,
  //   age: req.body.age,
  //   contact: req.body.contact,
  //   profilePic: req.file.path,
  // });
  console.log("signup data");
  // await newUser.save();
  // console.log("received signup data");
  // res.json(["account created successfully"]);
});

app.put("/editprofile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);

  try {
    await User.updateMany(
      { _id: req.body.id },
      {
        fn: req.body.fn,
        ln: req.body.ln,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        contact: req.body.contact,
        profilePic: req.file.path,
      }
    );

    res.json({ status: "success", msg: "Profile Updated Successfully" });
  } catch (err) {
    res.json(err);
  }
  // let newUser = new User({
  //   fn: req.body.fn,
  //   ln: req.body.ln,
  //   email: req.body.email,
  //   password: req.body.password,
  //   age: req.body.age,
  //   contact: req.body.contact,
  //   profilePic: req.file.path,
  // });

  // await newUser.save();
  // console.log("received signup data");
  // res.json(["account created successfully"]);
});

app.delete("/deleteuser", async (req, res) => {
  try {
    await User.deleteMany({ _id: req.query.id });
    res.json({ status: "success", msg: "Accounted Deleted Successfully" });
  } catch (err) {
    res.json(err);
  }
});

app.post("/validateLogin", upload.none(), async (req, res) => {
  let results = await User.find().and({ email: req.body.email });
  console.log(results);

  if (results.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      results[0].password
    );

    if (isPasswordCorrect == true) {
      let encryptedCredentials = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "RAM"
      );

      let userDetails = results[0];
      console.log(userDetails);

      res.json({
        status: "succes",
        isLoggedIn: true,
        details: userDetails,
        token: encryptedCredentials,
      });
    } else {
      res.json({
        status: "failure",
        isLoggedIn: false,
        msg: "Invalid Password",
      });
    }
  } else {
    res.json({ status: "failure", isLoggedIn: false, msg: "Invalid Email" });
  }
});

app.post("/validateToken", upload.none(), async (req, res) => {
  let decryptedCredentials = jwt.verify(req.body.token, "RAM");

  console.log(decryptedCredentials);

  let results = await User.find().and({ email: decryptedCredentials.email });
  console.log(results);

  if (results.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      decryptedCredentials.password,
      results[0].password
    );

    if (isPasswordCorrect == true) {
      let encryptedCredentials = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "RAM"
      );

      let userDetails = results[0];
      console.log(userDetails);

      res.json({
        status: "succes",
        isLoggedIn: true,
        details: userDetails,
        token: encryptedCredentials,
      });
    } else {
      res.json({
        status: "failure",
        isLoggedIn: false,
        msg: "Invalid Password",
      });
    }
  } else {
    res.json({ status: "failure", isLoggedIn: false, msg: "Invalid Email" });
  }
});

app.listen(2323, () => {
  console.log("listening to port 2323");
});
