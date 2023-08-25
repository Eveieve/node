# How to run Node.js script from the command line 

The usual way to run a Node.js program is to run the globally available `node` command (once you install Node.js) and pass the name of the file you want to execute. 

If your main Node.js application file is `app.js` you can call it by typing:
```js
node app.js
```
Above, you're explicitly telling the shell to run your script with `node`. You can also embed this information into your JavaScript file with a 'shebang' line. The 'shebang' is the first line in the file. It tells the OS which interpreter to use for running the script. Below is the first line of JavaScript:
```js
#!/user/bin/node
```
Above, you're explicitly giving the absolute path of interpreter. Not all operating systems have `node` in the bin folder, but all should have `env`. You can tell the OS to run `env` with node as a parameter: 
```js
#!/user/bin/env node 
// your code 
```

To use a shebang, your file should have executable permission. You can give `app.js` the executable permission by running:

```js
chmod u+x app.js
```

While running the command, make sure you're in the same directory which contains the `app.js` file. 

## Pass string as argument to `node` instead of file path 

To execute a string as argument you can use `-e`, `--eval "script"`. Evaluate the following argument as JavaScript. The modules which are predefined in the REPL can also be used in script. 

On Windows, using cmd.exe a single quote will not correctly because it only recognizes double `"` for quoting. In Powershell or Git bash, both `'` and `"` are usable. 

## Restart the application automatically 

he node command has to be re-executed in bash whenever there is a change in the application. To restart the application automatically, use the nodemon module.

Install the nodemon module globally to system path:

```js
npm i -g nodemon
```
You can also install nodemon as a development dependency:
```js
npm i --save-dev nodemon
```
This local installation of nodemon can be run by calling it from within npm script such as npm start or using npx nodemon. 

Run the application using the `nodemon` command followed by the application's file name:
```js
nodemon app.js
```

# How to read environment variables from Node.js 

The `process` core module of Node.js provides the `env` property which hosts all the environment variables that were set at the moment the process was started. 

Below code runs `app.js` and set `USER_ID` and `USER_KEY`. 

```js
USER_ID = 239482 USER_KEY=foobar node app.js
```
That will pass the user USER_ID as 239482 and the USER_KEY as foobar. This is suitable for testing, however for production, you will probably be configuring some bash scripts to export variables.

> Note: `process` does not require a "require", it's automatically available. 

This is how you access the `USER_ID` and `USER_KEY` environment variables, which you set in above code. 

```js
process.env.USER_ID ; // "239482"
process.env.USER_KEY; // "foobar"
```

You can access any custom environment variable you set in the same way. 

If you have multiple environment variables in your node project, you can also create an `.env` file in the root directory of your project, and then use the dotenv package to load them during runtime. 

```js
# .env file 
USER_ID="239482"
USER_KEY="foobar"
NODE_ENV="development"
```

In your JS file, 

```js
require('dotenv').config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"
```

> You can also run your js file with `node -r dotenv/config index.js` if you don't want to import the package in your code 

# Making HTTP requests with Node.js 

## Perform a GET request

There are many ways to perform an HTTP GET request in Node.js, depending on the abstraction level you want to use. 

The simplest way to perform an HTTP request using Node.js is to use the Axios library. 

```js
const axios = require('axios');

axios
  .get('https://example.com/todos')
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  })
```

However, Axios requires the use of a 3rd party library. 

A GET request is possible just using the Node.js standard modules, although it's more verbose than the option above: 

```js
const https = require('https')

const options = {
  hostname 'example.com', 
  port: 443, 
  path: '/todos', 
  method: 'GET', 
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
})

req.end();
```

## Perform a POST request 

Similar to making an HTTP GET request, you can use the Axios library to perform a POST request:

```js
const axios = require('axios');

axios.
  .post('https://whatever.com/todos', {
    todo: 'buy banana', 
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  })
  ```

Alternatively, use Node.js standard modules:

```js
const https = require('https');

const data = JSON.stringify({
  todo: 'Buy the milk', 
});

const options = {
  hostname: 'whatever.com', 
  port: 443, 
  path: './todos', 
  method: 'POST', 
  headers: {
    'Content-type': 'application/json', 
    'Content-Length': data.length
  },
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
})

req.write(data);
req.end();
```
## PUT and DELETE 

PUT and DELETE requests use the same POST request format - you just need to change the `options.method` value to the appropriate method. 


The asynchronous API is used with a callback:
```js
const fs = require('fs');

fs.rename('before.json', 'after.json', err => {
  if (err) {
    return console.error(err);
  }
  // done 

})
```
A synchronous API can be used like this, with a try/catch block to handle errors: 
```js
const fs = require('fs');

try {
  fs.renameSync('before.json', 'after.json');
} catch (err) {
  console.error(err);
}
```

The key difference here is that the execution of your script will block in the second example, until the file operation succeeded. 

You can use promise-based API provided by `fs/promises` module to avoid using callback-based API, which may cause callback hell. 

```js
// Read a file and change its  content and read 
// it again using callback-based API 
const fs = require('fs');

const fileName = 'Users/joe/text.txt';
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  const content = 'Some content!';
  fs.writeFile(fileName, content, err2 => {
    if (err2) {
      console.log(err2);
      return;
    }
    console.log('wrote some content');

    fs.readFile(fileName, 'utf8', (err3, data3) => {
      if (err3) {
        console.log(err3);
        return;
      }
      console.log(data3);
    })
  })
})
```
The callback-based API may rise a callback hell when there are too many nested callbacks. We can simply use promised-based API to avoid it:

```js
// Read a file and change its content 
// read it again using promise-based API 

const fs = require('fs/promises');

async function example() {
  const fileName = '/Users/joe/test.txt';
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log(data);
    const content = 'some content';
    await fs.writeFile(fileName, content);
    console.log('wrote some content');
    const newData = await fs.readFile(fileName, 'utf8');
    console.log(newData);

  } catch (err) {
    console.log(err);
  }
}
example();
```
----
# Installing a package locally/globally in with npm 

**local packages** are installed in the directory where you run `npm install <package-name>`, and they are put in the `node_modules` folder under this directory 

**global packages** are all put in a single place in your system (exactly where depends on your setup), regardless of where you run `npm install -g <package-name>` 

In your code you can only require local packages:
```js
require('package-name');
```

In general, all packages should be installed locally. 

This makes sure you can have dozens of applications in your computer, all running a different version of each package if needed. 

Updating a global package would make all your projects use the new release, and as you can imagine this might cause nightmares in terms of maintenance, as some packages might break compatibility with further dependencies, and so on. 

All projects have their own local version of a package. This might sound like a waste of resources, it's minimal compared to the possible negative consequences. 

A package should be installed globally when it provides an executable command that you run from the shell (cLI), and it's reused across projects. 

You can also install executable commands locally and run them using npx, but some packages are just better installed globally. 

Examples of popular global packages: 
- npm 
- vue-cli
- grunt-cli
- mocha
- react-native-cli
- gatsby-cli
- forever
- nodemon

You can see packages installed globally on your system by: 
```js
npm list -g --depth 0
```

# How to read environment variables from Node.js

