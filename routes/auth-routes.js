const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const fileUpload = require("../config/cloudinary");

router.post("/signup", async (req, res) => {
  const { email, password, name, role } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Fill in all the fields" });
    return;
  }

  //check for password strength
  // const myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (myRegex.test(password) === false) {
  //   res.status(400).json({ message: "Password is too weak" });
  //   return;
  // }

  //check if email already exists
  const user = await User.findOne({ email });
  if (user !== null) {
    res.status(400).json({ message: "Username already exists" });
    return;
  };

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    role: "student",
  });
  res.status(200).json(newUser);
});

router.post("/beteacher", async (req, res) => {
  const { email, password, name, description, role, } = req.body;

  if (email === "" || password === "" || name === "" || description === "") {
    res.status(400).json({ message: "Fill in all the fields" });
    return;
  }

  //check for password strength
  // const myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (myRegex.test(password) === false) {
  //   res.status(400).json({ message: "Password is too weak" });
  //   return;
  // }

  //check if email already exists
  const user = await User.findOne({ email });
  if (user !== null) {
    res.status(400).json({ message: "Username already exists" });
    return;
  };

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    description,
    role: "teacher",
  });
  res.status(200).json(newUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).json({ message: "Fill in all the fields" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid login" });
    return;
  }

  //Check for password
  if (bcrypt.compareSync(password, user.password)) {
    //Passwords match

    //Initializing the session with the current user
    req.session.currentUser = user;
    res.status(200).json(user);
  } else {
    //Passwords don't match
    res.status(401).json({ message: "Invalid login" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "user logged out" });
});

router.get("/loggedin", (req, res) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
    return;
  } else {
    res.status(200).json({});
  }
});


router.put("/profile/:id", async (req, res) => {
  try {
    const { description, name, imageUrl } = req.body;
    console.log(description, name, imageUrl);
    await User.findByIdAndUpdate(req.params.id, {
      description,
      name,
      imageUrl
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

router.put("/account-settings/:id", async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    await User.findByIdAndUpdate(req.params.id, {
      email,
      password: hashedPassword,
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});
router.get("/profile", async (req, res) => {
  const currentUser = await User.findById(req.session.currentUser._id);
  res.status(200).json(currentUser);
});

module.exports = router;
