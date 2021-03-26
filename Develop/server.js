// Dependencies

const express = require("express");
const path = require("path");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 8888;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("*", (req, res) => {
  res.send("hello!");
});
let notes;
(async function getNotes() {
  const data = await fs.promises.readFile("./db/db.json", "utf8");
  notes = JSON.parse(data);
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "notes.html"))
);

app.get("/api/notes", async (req, res) => {
  res.json(notes);
});
app.listen(PORT, () => console.log("Listening on port: " + PORT));
