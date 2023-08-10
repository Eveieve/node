const http = require("http");
const fs = require("fs");
// In node, we manually create a local server to listen for requests and respond to them
// creating a server
// store this in a 'server' const in case you wanna you use it for future like in web sockets

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("Content-Type", "text/html");

  // send an html file
  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

// listening to the 3000 for the localhost for requests
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
