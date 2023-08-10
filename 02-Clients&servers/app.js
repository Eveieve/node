const express = require("express");

// express app
const app = express();

// set up listening for requests
app.listen(3000); // returns an instance of a server

// root of the domain
app.get("/", (req, res) => {
  //res.send("<p>home page</p>"); // instead of res.write..res.end..
  res.sendFile("./views/index.html", { root: __dirname }); // the root should be 02-Clients&servers
});

app.get("/about", (req, res) => {
  // not an ideal way! we want to send a whole html file
  //res.send("<p>about page</p>");
  res.sendFile("./views/about.html", { root: __dirname }); // the root should be 02-Clients&servers
});
