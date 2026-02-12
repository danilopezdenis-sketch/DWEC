const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/albumes", require("./album/album.routes"));
app.use("/artistas", require("./artista/artista.routes"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
