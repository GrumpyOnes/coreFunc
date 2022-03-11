const Koa =require('koa')
const app = new Koa()

const session = require('koa-session')
//redis
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost')
const wrapper = require('co-redis') //promise化
const client = wrapper(redisClient)


app.keys = ['this is secret'];//用来对cookie进行签名

//config
const SESSION_CONFIG = {
    key:'kurt-session',
    signed:true,
    store:redis({client})
}

app.use(session(SESSION_CONFIG,app))
app.use(async (ctx,next)=>{
    const kys= await client.keys('*')
    kys.forEach(async key=>console.log(await client.get(key)))
    await next()
})

app.use(ctx=>{
    if (ctx.path === '/favicon.ico') return;

    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = 'Now Count is '+ n;
})

app.listen(4000,()=>{
    console.log('server @ 4000')
})