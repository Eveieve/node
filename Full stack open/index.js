const http = require('http') // import built-in web server module 

// const app = http.createServer( (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain'})
//   response.end('Hello World')
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`server running on port ${PORT}`)

let notes = [
  {
    id:1,
    content: 'this is a hardcoded list of noes in JSON format',
    important: true
  }, 
  {
    id:2, 
    content: 'browser can execute only in javascript',
    important: false
  },
  {
    id:3, 
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const app = http.createServer((request, response) => {
  response.writeHead(200, {'Content-type': 'appplication/json'})
  response.end(JSON.stringify(notes));
})

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)