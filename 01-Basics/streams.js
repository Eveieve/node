const fs = require("fs"); // require fs module

// tell node where we are reading the data from
const readStream = fs.createReadStream("./docs/blog3.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./docs/blog4.txt");

// 'on' is the eventListener, listening to 'data' event
// listening to 'data' event on readStream

// every time we get a new piece of data from readStream,
// take that data and write the NEW CHUNK
// and write the new chunk there
// readStream.on("data", (chunk) => {
//   console.log("----NEW CHUNK-----");
//   console.log(chunk);
//   writeStream.write("\n NEW CHUNK \n");
//   writeStream.write(chunk);
// });

// Piping!! doing the same thing as above but much shorter
readStream.pipe(writeStream);
