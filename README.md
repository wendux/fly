# Ajax-hook

key words: ajax hook, hook ajax,  XMLHttpRequest hook, hook XMLHttpRequest.

中文文档:[http://www.jianshu.com/p/9b634f1c9615](http://www.jianshu.com/p/9b634f1c9615)
## Description

Hook Javascript global XMLHttpRequest  object。 And change the  default AJAX   request and response .

## How to use

1. include the script file "wendu.ajaxhook.js"

   ```html
   <script src="wendu.ajaxhook.js"></script>
   ```

2. hook the callbacks and functions you want .

   ```javascript
   hookAjax({
       //hook callbacks
       onreadystatechange:function(xhr){
           console.log("onreadystatechange called: %O",xhr)
       },
       onload:function(xhr){
           console.log("onload called: %O",xhr)
       },
       //hook function
       open:function(arg,xhr){
        console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2])
       }
   })
   ```

 Now, it worked! we use jQuery ajax  to test .

```javascript
// get current page source code 
$.get().done(function(d){
    console.log(d.substr(0,30)+"...")
})
```

The result :

```
> open called: method:GET,url:http://localhost:63342/Ajax-hook/demo.html,async:true
> onload called: XMLHttpRequest
> <!DOCTYPE html>
  <html>
  <head l...
```

**See the demo "demo.html" for more details.**

## API

### hookAjax(ob)

- ob; type is Object
- return value: original XMLHttpRequest

### unHookAjax()

- unhook Ajax 

## Changing the default Ajax behavior

The return value type of all hook-functions is boolean, if true, the ajax  will be interrupted ,false or undefined are not . for example:

```javascript

hookAjax({
  open:function(arg,xhr){
    if(arg[0]=="GET"){
      console.log("Request was aborted! method must be post! ")
      return true;
    }
  } 
 })
```

Changing the "responseText"

```javascript
hookAjax({
   onload:function(xhr){
    console.log("onload called: %O",xhr)
    xhr.responseText="hook!"+xhr.responseText;
   }
 })
```

Result:

```
hook!<!DOCTYPE html>
<html>
<h...
```



## Notice

 All callbacks such as onreadystatechange、onload and son on, the first argument is current XMLHttpRequest instance. All functions, such as open, send and so on, the first parameter is an array of the original parameters, the second parameter is the current origin XMLHttpRequest instance.



**BY THE WAY** :  welcome starring my another project [Neat.js](https://github.com/wendux/Neat)  ! 😄。