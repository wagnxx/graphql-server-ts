const path = require('path');
import { buildSchema, NonEmptyArray } from 'type-graphql';
// import { ApolloServer,PubSub } from 'apollo-server-express';
import { ApolloServer,PubSub } from 'apollo-server-koa';
// import express from 'express'
import Koa from 'koa'
import Application from 'koa';

// 获取匹配所有resolver的路径
function getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
  return [path.resolve(__dirname, 'resolvers/*.ts')];
}

// 通过buildSchema方法来生成graphql schema
export async function getSchema() {
  return buildSchema({
    resolvers: getResolvers(),
  });
}

const pubsub = new PubSub();

export async function integrateGraphql(
  // app: express.Application,
  app:Application,
  httpServer
) {
  const server = new ApolloServer({
    schema: await getSchema(),
    // subscriptions:{
    //   path:'/sub'
    // },
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    } as any,
    introspection: true,
    context: (ctx) => ctx,
    // subscriptions: "/graphql",
  });
  server.applyMiddleware({ app, cors: true,path:'/graphql' });
  server.installSubscriptionHandlers(httpServer)
  return server;
}
