
import * as Koa from 'koa'
import {get,post} from '../utils/route-deco'

const users = [{name:'tomm'}]
export default class User{
    @get('/users')
    public list (ctx){
        ctx.body= {ok:1,users}
    }
    @post('/users',{middlewares:[
        async function validation(ctx,next){
            //用户必须
            const name = ctx.request.body.name
            if(!name){
                throw 'please input user name'
            }
            await next()
        }
    ]})
    public add(ctx) {
        users.push(ctx.request.body)
        ctx.body={ok:1}
    }
}
