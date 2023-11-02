const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const bookRoutes = require("./LibraryAPI/Controllers/LibraryController.js");
const { sequelize } = require("./Database/startBase.js");

sequelize.sync().then(() => {
  console.log("Database synchronization successful");
});

dotenv.config();
const app = express();

const configPath = "./config/default.json";

try {
  app.use("", bookRoutes);
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  const port = config.port;

  app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie: ${port}`);
  });
} catch (err) {
  console.error(`Błąd w pobieraniu pliku konfiguracyjnego: ${err.message}`);
  process.exit(1);
}
