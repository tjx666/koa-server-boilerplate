# 开发指南

## extends(扩展)

所有的扩展模块放在 app/extends 文件夹下面，导出的都是接受两个参数 server, options 两个参数的函数。扩展模块目的在于为 server 或者 ctx 提供功能扩展，不像中间件每次都需要执行中间件函数，扩展模块都是在服务器启动时加载一次。
