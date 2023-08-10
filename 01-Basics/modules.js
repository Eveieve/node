const { people, ages } = require("./people");
// automatically runs the 'people' file

//console.log(xyz); // empty object
// console.log(people); // people is not defined

console.log(people, ages);

const os = require("os"); // built in node itself

console.log(os.platform(), os.homedir()); // an object with info about operating system
