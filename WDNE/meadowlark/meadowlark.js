const express = require("express");

const app = express();

// add static middleware
app.use(express.static(__dirname + "/public"));

// array of fortune cookies 
const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];
// set up handlebars view engine
// Creates a view engine and configures Express to use it by default
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// specify the port we want our app to run on
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", {fortune: randomFortune});
});

// 404 catch-all handler(middleware)
app.use((req, res, next) => {
  res.status(404);
  res.render("404");
});

// 500 error handler (middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Cntrl-C to terminate"
  );
});
