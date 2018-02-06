//For browser entry
var Fly= require("./dist/npm/fly")
var fly= new Fly;
//For typeScript
fly.default=fly;
module.exports = fly;
