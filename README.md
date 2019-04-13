# 开发指南

## config(配置)
所有的配置文件放置在 config 文件夹下面，每个配置文件应该导出的属性包括:

1. name 配置名
2. default 默认配置
3. test 测试配置
4. producation 生产配置

config/override.js 这个模块用于方便的覆盖其它配置文件中的配置。在该模块中导出的配置将会覆盖同名的配置模块的配置。

例如在 override.js 通过 exports.logger 导出的配置对象会覆盖 logger.js 模块导出的配置。

## middleware(中间件)

所有的中间件模块导出都为一个接受 options 参数的函数。

目前集成的中间件有：

1. historyFallbackApi 适用于作为 spa 的服务器时使用
2. restify 用于处理 restful api，如果 path 前缀是 api 或者是options 中指定的其它前缀，则可以在路由中使用 ctx.rest。如果其它中间件抛出错误将自动以 restful 风格处理错误。即返回 { error: errorName, message: errorMessage } 形式的的 data。


## extend(扩展)

**extend 目的在于为 server 或者 context 提供功能扩展**。context 是所有中间件的 ctx 参数的原型。

所有的扩展模块放在 app/extend 文件夹下面。

每个扩展模块导出的都是接受两个参数 server, options 两个参数的函数。

扩展不像中间件每次都需要执行中间件函数，扩展模块都是在服务器启动时加载一次。

目前集成的 extend:

1. configuration 使得其它扩展或者中间件可以直接通过 server.configuration 来访问项目的所有配置
2. logger 在 server 和 context 上分别绑定对应的 logger
3. mongodb  在 context 上绑定 models
4. redis 在 context 上绑定 redis
5. vadilator 在 context 上绑定 validator 

## log(日志)

你可以通过 `server.logger` 或者 `ctx.logger` 来访问不同的日志对象。

前者是项目级别的日志器，后者是 context 级别的日志器。

日志文件存放在 logs 文件夹下面，文件名位 xxxError.log 的日志文件表示只记录了 ERROR 级别的日志。

