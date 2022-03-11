const Koa =require('koa')
const app = new Koa()

const session = require('koa-session')
app.keys = ['this is secret'];//用来对cookie进行签名

//config
const SESSION_CONFIG = {
    key:'kurt-session',
    maxAge:24*60*60*1000,
    httpOnly:true,//仅服务器修改
    signed:true
}

app.use(session(SESSION_CONFIG,app))

app.use(ctx=>{
    if (ctx.path === '/favicon.ico') return;

    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = 'Now Count is '+ n;
})

app.listen(4000,()=>{
    console.log('server @ 4000')
})