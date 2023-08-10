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

// redirecting with express
app.get("/about-us", (req, res) => {
  res.redirect("/about"); // redirect to /about page!
});

// 404 page
// to create middleware and fire middleware functions
// use this function for every single request regardless of the url
// use() is gonna for every request coming in, but only if..
// run the entire file, if no matches => carry on, get to the bottom => fire this callback

// MUST GO AT THE BOTTOM!
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
