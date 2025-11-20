import express from "express";

const app = express();
let port = 5001;

app.get("/api/notes", (req, res) => {
  res.send("5 notes");
});

app.listen(port, () => {
  console.log("Server started on PORT:", port);
});
