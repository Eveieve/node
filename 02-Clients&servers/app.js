const express = require("express");

// express app
const app = express();

// set up listening for requests
app.listen(3000); // returns an instance of a server

// root of the domain
app.get("/", (req, res) => {
  res.send("<p>home page</p>"); // instead of res.write..res.end..
});
