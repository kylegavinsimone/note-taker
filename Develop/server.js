const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 8888;
let notes;
(async function getNotes() {
  const data = await fs.promises.readFile("./DB/db.json", "utf8");
  notes = JSON.parse(data);
})();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop", "public", "notes.html"))
);
app.get("/api/notes", async (req, res) => {
  res.json(notes);
});
app.post("/api/notes", async (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote); //making new note//
  const file = await fs.promises.writeFile(
    "./db/db.json",
    JSON.stringify(notes)
  );
  res.status(200).json(file); //this is the code for good if working//
});
app.put("/api/notes", async (req, res) => {
  const updatedNote = req.body;
  notes[updatedNote.id] = updatedNote;
  const file = await fs.promises.writeFile(
    "./db/db.json",
    JSON.stringify(notes)
  );
  res.status(200).json(file);
});
app.listen(PORT, () => console.log("Listening on port: " + PORT)); //should show us that it is working on the port we chose//
