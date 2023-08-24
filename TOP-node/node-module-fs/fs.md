
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
# Installing a package locally in with npm 

