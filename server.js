require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8781;
app.listen(PORT, () => {
  console.log("Server run at ", PORT);
});
