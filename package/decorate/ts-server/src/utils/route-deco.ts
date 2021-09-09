import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import * as glob from 'glob'

const router = new KoaRouter()
//引用透明 methode工厂
const createMethod =   router => (method:'get'|'post'|'delete'|'put')=>
 (path:string)=>{
    return (target,property)=>{
        //注册路由
        router[method](path,target[property])
    }
}

const method = createMethod(router)

export const get = method('get')
export const post = method('post')

export const load = (folder:string):KoaRouter=>{
    const extname='.{js,ts}'
    glob.sync(require('path').join(folder,`./**/*${extname}`))
    .forEach(item=>require(item))
    return router
}


