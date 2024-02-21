import handlers from "./lib/handlers";
import fortune from "./lib/fortune";
import express, { static as staticExpress } from "express";

const app = express();

// add static middleware
app.use(staticExpress(__dirname + "/public"));

// set up handlebars view engine
// Creates a view engine and configures Express to use it by default
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// specify the port we want our app to run on
app.set("port", process.env.PORT || 3000);

app.get("/", handlers.home);

// app.get("/", (req, res) => {
//   res.render("home");
// });

app.get("/about", handlers.about);
// app.get("/about", (req, res) => {
//   const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
//   res.render("about", { fortune: randomFortune });
// });

// 404 catch-all handler(middleware)
// app.use((req, res, next) => {
//   res.status(404);
//   res.render("404");
// });
app.use(handlers.notFound);

// 500 error handler (middleware)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500);
//   res.render("500");
// });
app.use(handlers.serverError);

app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Cntrl-C to terminate"
  );
});
