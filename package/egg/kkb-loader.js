const fs=require('fs')
const path = require('path')
const Router = require('koa-router')

function loader(dir,cb){
    const url = path.resolve(__dirname,dir)
    const files=fs.readdirSync(url)
    files.forEach(filename=>{
        filename = filename.replace('.js','')
        const file= require(url+'/'+filename)
        cb(filename,file)
    })
}

function initRouter(app){
    const router = new Router()
    loader('routes',(filename,routes)=>{
        routes = typeof routes === 'function' ? routes(app) : routes

        const prefix = filename==='index'?'':`/${filename}`

        Object.keys(routes).forEach(key=>{
            const [method,path] = key.split(' ')
            console.log('正在映射地址',`${method.toUpperCase()} ${prefix}${path}`)
            router[method](prefix+path,
                async ctx=>{
                    app.ctx = ctx
                    await routes[key](app)
                })
            //router.get('/user/',async ctx=> ctx.body='用户详细页'})
        })
    })
    return router
    
}

function initContoller(app){
    const contollers = {}
    loader('controller',(filename,controller)=>{
     contollers[filename] = controller(app);
    })
    return contollers 
}

function initService(){
    const services = {}
    loader('service',(filename,service)=>{
        services[filename] = service;
    })
    return services
}
module.exports = {initRouter,initContoller,initService}