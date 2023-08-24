const express = require("express");

// express app
const app = express();

// register view engine
// app.set lets you configure some application settings
// one of those settings is view engines
// ejs is used to create our templates
app.set("view engine", "ejs");
//app.set('views', 'myviews'); // express will look in 'myviews' folder

// set up listening for requests
app.listen(3000); // returns an instance of a server

app.use((req, res) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
})

// root of the domain
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render();
});
// redirecting with express
app.get("/about-us", (req, res) => {
  res.redirect("/about", { title: "About" }); // redirect to /about page!
});

// This is a middleware
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
