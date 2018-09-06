# Changelog

### **v0.6.1** (Sep 6, 2018)

+ 添加“params”配置项：
 - 可以设置公共的的get参数：fly.config.params={token:"xxxx"}
 - 非Get请求也可以设置Url params
 - Get请求的话会合并data和“params”

- 在非浏览器环境下，响应头中有多个"set-cookie"字段时，headers["set-cookie"]值为数组类型(之前为字符串)

### **v0.5.4** (Apr 20, 2018)

+ Adding `lock/unlock` API for interceptors and fly propotype.
+ update typings file for typescript
+ delete ~~`await`~~ that added in v0.5.2.

