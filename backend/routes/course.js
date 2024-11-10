import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will get a list of all the courses.
router.get("/", async (req, res) => {
  let collection = await db.collection("courses");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will get a single course by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("courses");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will create a new course.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      desc: req.body.desc,
      img: req.body.img,
      modules: req.body.modules,
      hours: req.body.hours,
      title: req.body.title,
    };
    let collection = await db.collection("courses");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

export default router;