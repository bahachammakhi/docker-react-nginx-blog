const lib = require("./localdatastore.js");
var l = new lib.LocalDataStore("j");
l.add("email", "data");
console.log(l.getAll());
