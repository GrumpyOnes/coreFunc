const koa = require('koa')
const {initRouter,initContoller,initService} = require('./kkb-loader')

class kkb {
    constructor(conf){
        this.$app = new koa(conf)
        this.$service = initService()
        this.$ctrl = initContoller(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }
    start(port){
        this.$app.listen(port,()=>{
            console.log('kkb start at',port)
        })
    }
}

module.exports=kkb

//model和mysql连接待实现