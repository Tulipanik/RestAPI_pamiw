import "dotenv/config";
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Siema");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
