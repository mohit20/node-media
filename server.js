const express = require("express");
const fs = require("fs");
const app = express();
var bodyParser = require('body-parser');
const http = require('http').createServer(app);
require('dotenv').config();
request = require('request')
app.use(bodyParser.json())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
const cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

require("./app/routes/upload.routes")(app);
require("./app/routes/stream.routes")(app);

const PORT = process.env.SERVER_PORT || 8000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
