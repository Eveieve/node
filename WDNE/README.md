# Web Development with Node and Express

## Unit Testing 

### Mocking 

- Code that tries to do too much or assumes a lot of dependencies is harder to test than focused code that assumes few or no dependencies. 

- Whenever you have a dependency, you have sth that needs to be mocked (simulated) for effective testing. 
= The routes we currently have are pretty difficult to test b/c they assume three dependencies on Express: they assume we have an Express app(so we can have `app.get`), as well as request and response objects. 
- It's easy to eliminate the dependencies on the Express app itself (the request and response objects are harder). 
- If you're not using much functionality from the response object (only using the `render` method), it will be easy to mock it. 
  
### Refactoring the Application for Testability

- To make the app more testable, extract the actual route handlers to their own library. Create a file `lib/handlers.js`. 
```js
import { getFortune } from "./fortune";

export function home(req, res) {
  return res.render("home");
}

export function about(req, res) {
  return res.render("about", { fortune: getFortune() });
}

export function notFound(req, res) {
  res.render("404");
}

export function serverError(err, req, res, next) {
  res.render("500");
}
```
Now, rewrite `meadowlark.js` app file to use these handlers. 
```js
// typically at the top of the file

import handlers from "./lib/handlers"

app.get('/', handlers.home)
app.get('/about', handlers.about)
// custom 404 page
app.use(handlers.notFound)
// custom 500 page
app.use(handlers.serverError)
```
It is easier to test those handlers: they are just functions that take request objects and response objects. We need to verify that we're using those objects correctly. 
>> Q. what is 'any' when I hover over a function?

### Writing our first test 

## Continuous Integration 

- CI is a QA concept.
- CI runs some or all of your tests every time you contribute code to a source code repository (you can control which branches this applies to). 
- If all of the tests pass, nothing usually happens (depending on how CI is configured). 
- If there are failures, depending on how you configure your CI, the entire team gets an email saying that you "broke the build". 
  
- Travis CI for Node projects. 
- It's a hosted solution (saves you from having to set up your own CI server). It offers integration support if you use GitHub. 
- CircleCI is also an option. 

# Chapter 6. The Request and Response objects 

- Building a web server with Express starts with a request object and ends with a response object. These two originate in Node and are extended by Express. 

## The Parts of a URL 
![alt text](Readme_img/image.png)

**Protocol**
Determines how the request will be transmitted. 
- ***http, https, file, ftp***

**Host**
- The host identifies the server. 
- Servers on your computer: localhost
- Local networks may be identified simply by one word or by numeric IP address. 
- On the internet, the host will end in a top-level domain (TLD) like ***.com*** or ***.net***
- There may be ***subdomains***, which prefix the hostname. 
- `www` is a common subdomain, though it can be anything. They are optional. 

**Port**
- Each server has a collection of numbered ports. 
- Some port numbers are special, like 80 and 443. 
- If you omit the port, port 80 is assumed for HTTP and 443 for HTTPS. 
- If you aren't using 80 or 443, you should use a port number greater than 1023. 
- 3000, 8080, 8088 are common. 
- Only 1 server can be associated with a given port. 

**Path**
- The path is generally the first of the URL that your app cares about. 
- It should be used to uniquely identify pages or other resources in your app. 

**Querystring**
- An optional collection of name/value pairs. 
- Starts with a question mark, and name/value pairs are separated by `&`. Both names & values should be URL encoded. JS provides a built-in function to do that:`encodeURIComponent`. e.g.) Spaces will be replaced with plus signs(+). Other special characters will be replaced with numeric character references. 
- Sometimes referred to as the 'search string' or 'search'. 

**Fragment**
- The fragment (or 'hash') is not passed to the server at all. It is strictly for use by the browser. 
- Some single-page applications use the fragment to control application navigation. 
- Originally, its sole purpose was to cause the browser to display a specific part of the document, marked by an anchor tag (`<a id = "chapter06">). 
  
## HTTP Request Methods 

- The HTTP protocol defines a collection of 'request methods' (HTTP verbs) that a client uses to communicate with a server. 
- GET and POST are the most common. 
  
- When you type a URL into a browser (or click a link), the browser issues an HTTP GET request to the server. 
- The important information passed to the server is `URL` path and `querystring`. 
- `method & path & querystring` is what your app uses to determine how to respond. 

- For a website, most of your pages respond to `GET` requests. 
- `POST` requests are reserved for sending information back to the server (e.g form processing). It's common for `POST` requests to respond with the same HTML as the corresponding `GET` request after the server has processed any information included in the request (like a form). 
- Browsers will primarily use the `GET` and `POST` methods when communicating with your server. 
- Ajax requests may use any HTTP verb. e.g) HTTP method `DELETE` is useful for API call that deletes things. 

- With Node & Express, you are fully in charge of what methods you respond to. 
- In Express, you'll usually be writing handlers for specific methods. 
  > Q. Handlers? 

## Request Headers 

- Your browser sends a lot of 'invisible' information every time you visit a website in addition to the URL. 
- What language it prefers to receive the page in. 
- `User agent` (the browser, operating system, and hardware) and other bits of information. 
- All this is sent as a request header, which is available to you through the request object's `headers` property. 
- You can create a simple Express route to display that information. 
```js
app.get("/headers", (req, res) => {
  res.type("text/plain");

  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );

  res.send(headers.join("\n"));
});
```
## Response Headers 

- The browser sends request headers.
- The server responds back with information that is not necessarily rendered by the browser.
  
  Metadata & server information. 

  `Content-Type` header - tells the browser what kind of content is being transmitted. (HTML, an image, CSS, JavaScript, etc.)

  The browser respects the `Content-Type` header regardless of what the URL path is. Paths are abstract, and the browser uses `Content-Type` to determine how to render content. 

- Response headers contain info about the server. What type of server it is and sometimes details about the OS. 
  
  Downside is it gives hackers a starting point to compromise your site. 

- `app.disable('x-powered-by')
  
## Internet Media Types 

`Content-Type` is critically important. 
`Internet media type` or `MIME type`. 

## Request Body 

## The Request Object

`req.route` Information about the currently matched route. 

`req.cookies/req.signedCookies` Objects containing cookie values passed from the client. 

`req.headers` The request headers received from the client. This is an object whose keys 

## Getting more information 

`lib/application.js` The main Express interface. If you want to understand how middleware is linked in or how views are rendered, this is the place to look. 

`lib/express.js` A relatively short file that primarily provides the `createApplication` function (the default export of this file), which creates an Express application instance. 

`lib/request.js` Extends Node's `http.IncomingMessage` object to provide a robust request object. For information about all the request object properties and methods, this is where to look. 

`lib/response.js` Extends Node's `http.ServerResponse` object to provide the response object. For information about response object properties and methods, this is where to look. 

`lib/router/route.js` Provides basic routing support. 

## Boiling it down 

### Rendering content 

When you're rendering content, you'll be using `res.render` most often, which renders views within layouts, providing maximum value. Occasionally, you may want to write a quick test page, so you might use `res.send` if you just want a test page. You may use `req.query` to get querystring values, `req.session` to get session values, or `req.cookies/req.signedCookies` to get cookies. 

Example 6-1. Basic usage
```js
//basic usage 
app.get('/about', (req,res) => {
  res.render('about')
})
```

Example 6-2. Response codes other than 200 
```js
app.get('/error', (req,res) => {
  res.status(500)
  res.render('error')
})
// or on one line.. 

app.get('/error', (req,res) => {
  res.status(500).render('error'))
})
```

Example 6-3. Passing a context to a view, including querystring, cookie, and session values 

```js
app.get('/greeting', (req,res) => {
  res.render('greeting', {
    message: 'Hello esteemed programmer!', 
    style: req.query.style, 
    userid: req.cookies.userid, 
    username: req.session.username
  })
})
```

Example 6-4. Rendering a view without a layout 

```js
// the following layout doesn't have a layout file, so 
// views/no-layout.handlers must include all necessary HTML 

app.get('/no-layout', (req,res) => {
  res.render('no-layout', {layout: null})
})
```

Example 6-5. Rendering a view with a custom layout 

```js
// the layout file views/layouts/custom.handlebars will be used 
app.get('/custom-layout', (req.res) => {
  res.render('custom-layout', {layout: 'custom'})
})
```

Example 6-6. Rendering plain text ouput 

```js
app.get('/text', (req,res) => {
  res.type('text/plain')
  res.send('this is a test')
})
```
Example 6-7. Adding an error handler

```js
// this should appear AFTER all of your routes 
// note that even if you don't need the 'next' function, 
// it must be included for Express to recognize this as an error handler 

app.use((err, req, res, next) => {
  console.error("** SERVER ERROR: " + err.message)

  res.status(500).render('09-error', {
    message: "you shouldn't have clicked that!"})
  })
})
```
