# 开发指南

## config(配置)
所有的配置文件放置在 config 文件夹下面，每个配置文件应该导出的属性包括:

1. name 配置名
2. default 默认配置
3. test 测试配置
4. producation 生产配置

config/override.js 这个模块用于方便的覆盖其它配置文件中的配置。在该模块中导出的配置将会覆盖同名的配置模块的配置。例如在 override.js 通过 exports.logger 导出的配置对象会覆盖 logger.js 模块导出的配置。


## extend(扩展)

**模块目的在于为 server 或者 ctx 提供功能扩展**。

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

你可以通过 server.logger 或者 ctx.logger 来访问不同的日志对象。

前者是项目级别的日志器，后者是 context 级别的日志器。

日志输出在 logs 文件夹下面，文件名位 xxxError.log 的日志文件表示只记录了 ERROR 级别的日志的。

