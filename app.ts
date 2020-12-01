import 'reflect-metadata';
import * as http from 'http';
import { integrateGraphql } from './graphql/index';
// express server

import * as express from 'express';

// const expressServer = express();

// const httpServer = http.createServer(expressServer);
// integrateGraphql(expressServer, httpServer).then((graphServer) => {
//   httpServer.listen(9000, () => {
//     console.log('koa server is running on 9000 port');
//   });
// });

import * as Koa from 'koa';
const koaApp = new Koa();

const koaSever = koaApp.listen(9000, () =>
  console.log('koa server is running on 9000')
);
// const httpServer = http.createServer();
// const netServer = net.createServer()
// koaApp.use(ctx =>{
//   const {req,res} = ctx;
//   http.createServer(ctx);
// })

const httpServer = koaSever;

integrateGraphql(koaApp, httpServer).then((grserver) => {

  console.log('graphql server is bound success!!');
  koaApp.use(async (ctx, next) => {
    if (ctx.url.includes('/testkoa')) {
      ctx.body = 'you are greate !!!';
    } else {
      next();
    }
  });
});


/**
 * note:http.createServer 的参数需要一个 httpserver
 * express 和 koa 是完全不同的类型框架
 * 
 * 1. express实例可以直接传入  http.createServer(expressServer) 
 * 
 * 2. koa不可以,koaApp.listen 返回 httpserver, 传入即可
 * 
 * httpserver 主要是给 server.installSubscriptionHandlers(httpServer) 用,用来订阅后台推送
 * 
 * 
 * 
 * 
 * 
 * 
 */