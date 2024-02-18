const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  //process.exit();
  console.log(req.url);
});

// listen for incoming request
server.listen(3000);
