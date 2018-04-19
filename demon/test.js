/**
 * Created by du on 16/12/10.
 */
//var fly = require("../index")

var qs = require('qs');
import fly from "../index"
fly.get("../package.json", {aa: 8, bb: 9, tt: {xx: 5}}).then((d) => {
    console.log("get result:", d)
}).catch((e) => console.log("error", e))

fly.post("../package.json", {aa: 8, bb: 9, tt: {xx: 5}}).then((d) => {
    console.log("post result:", d)
}).catch((e) => console.log("error", e))

fly.request("../package.json", {hh: 5}, {
    method: "post"
}).then(d => {
    console.log("ajax result:", d)
})


//send data in the application/x-www-form-urlencoded format
fly.get("",qs.stringify({aa: 8, bb: 9, tt: {xx: 5}})).then((d)=>{

})
fly.post("../package.json", qs.stringify({aa: 8, bb: 9, tt: {xx: 5}})).then((d) => {

})
