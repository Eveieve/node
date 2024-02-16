const http = require("http");

const fs = require("fs");

function serveStaticFiles(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;

  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Error");
    } else {
      res.writeHead(responseCode, {
        "Content-Type": contentType,
      });
      res.end(data);
    }
  });
}

http
  .createServer((req, res) => {
    // normalize url by removing querystring,
    // optional trailing slash, and making it lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
      case "":
        serveStaticFiles(res, '/public/home.html', 'text/html');
        break;
        // res.writeHead(200, { "Content-type": "text.plain" });
        // res.end("Homepage");
        // break;
      case "/about":
        serveStaticFiles(res, '/public/about.html', text/html);
        break;
        // res.writeHead(200, { "Content-type": "text/plain" });
        // res.end("About");
        // break;
      default:
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end("Not found");
        break;
    }
  })
  .listen(3000);

console.log("server started on localhost:3000; press cntrl-c to terminate");
