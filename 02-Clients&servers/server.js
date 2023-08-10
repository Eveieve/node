const http = require("http");
const fs = require("fs");
// In node, we manually create a local server to listen for requests and respond to them
// creating a server
// store this in a 'server' const in case you wanna you use it for future like in web sockets

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("Content-Type", "text/html");

  let path = "./views/"; // html files are inside html folder , always begine with ./views
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200; // if everything is okay
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200; // if everything is okay
      break;
    case "/about-me": // this page has been removed!
      // no need for 'path'
      res.statusCode = 301; // the resource has been permanently removed
      res.setHeader("Location", "/about"); // redirect to /about
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404; // the resource doesn't exist
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //res.write(data);
      // since we're using it once, we can pass the data directly to the end method
      res.end(data);
    }
  });
});

// listening to the 3000 for the localhost for requests
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
