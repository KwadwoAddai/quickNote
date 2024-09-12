require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.DBCON)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database connection Error", err));

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Note = mongoose.model("Note", noteSchema);

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => console.log("Server running on Port 5000"));
