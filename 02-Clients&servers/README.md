# node

## Status Codes

- Status codes describe the type of response sent to the browser
- 200 - OK
- 301 - Resource moved
- 404 - Not found
- 500 - Internal server error

- 100 Range - informational responses
- 200 Range - success codes
- 300 Range - codes for redirects
- 400 Range - user or client error codes
- 500 Range - server error codes

# 5. NPM

- dependecies: all packages we install locally to this project

# 6. Express Apps

- Express is a framework that helps us manage routing, server-side logic, requests, responses in a much elegant way.

# 7. View Engines

(template engine)

## EJS 

# 8. Middleware 

- Any code which runs (on the server) between getting a request and sending a response

- app.use(func)
- app.use('./', func) 

- app.use(func)

- The order of middleware is very important 

## Middleware examples 

- Logger middleware to log details of every request 
- Authentication check middleware for protected routes 
- Middleware to parse JSON data from requests 
- Return 404 pages 
