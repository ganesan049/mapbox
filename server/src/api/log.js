const { Router } = require("express");
const LogEntry = require("../models/LogEntry");

const { API_KEY } = process.env;
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
  // console.log(req.body);
});

router.post("/", async (req, res, next) => {
  // console.log(process.env[API_KEY], API_KEY);
  try {
    if (req.get("X-API-KEY") !== process.env.API_KEY) {
      throw new Error("unauthorized");
    }
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
  console.log(req.body);
});

module.exports = router;
