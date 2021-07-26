const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({message: "unauthorized"});
    res.redirect("/login");
  }
}



//Get all projects
router.get("/projects", async (req, res) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
    console.log("here here here");
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Create project
router.post("/projects", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Project.create({
      title,
      description,
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Delete project
router.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: `id ${req.params.id} was deleted` });
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Get project by id
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

//Update project
router.put("/projects/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    res.status(200).json(`id ${req.params.id} was updated`);
  } catch (e) {
    res.status(500).json({ message: `error occurred ${e}` });
  }
});

module.exports = router;
