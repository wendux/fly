# Ajax-hook

key words: ajax hook, hook ajax,  XMLHttpRequest hook, hook XMLHttpRequest.

## Description

Hook Javascript global XMLHttpRequest  object。 And change the action of default AJAX  request and response . 

## How to use

1. include the script file "wendu.ajaxhook.js"

   ```html
   <script src="wendu.ajaxhook.js"></script>
   ```

2. hook the callbacks and functions you want by call 

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
       open:function(arg){
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



## API

### hookAjax(ob)

- ob; type is Object
- return value: original XMLHttpRequest

### unHookAjax()

- unhook Ajax 

## Changing the action of default AJAX 

All hook functions return value is boolean, if true, the ajax  will be interrupted ,false or undefined are not . for example:

```javascript

hookAjax({
  open:function(arg){
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

The arguments of all callbacks such as onreadystatechange、onload, are the current XMLHttpRequest instance. The arguments of all functions, such as open、send，are supplied with a Array.



**BY THE WAY** :  welcome starring my another project [Neat.js](https://github.com/wendux/Neat)  ! 😄。