//For browser entry
var Fly= require("./dist/npm/fly")
let fly= new Fly;
//For typeScript
fly.default=fly;
module.exports = fly;
