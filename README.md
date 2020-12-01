# graphql-server-ts


### 该案例是在原来项目中配置 type-graphql的subscription时 无法链接 ws,通过该eg来单独探究这个问题

1. 先是用koa,中途在httpserver的部分遇到问题,就暂停,改用express,很顺利,没有任何问题;

2. express完成了想办法解决koa的问题,仔细查看 koa 和 garaphql的 源码发现,只要传入一个 httpserver 即可,而 koa的listen值就是httpServer.到此问题就搞定