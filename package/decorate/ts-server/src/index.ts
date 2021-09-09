/**
 * npm i koa koa-static koa-body koa-router @type/koa @types/koa-body @types/koa-router -s
*/
import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as Router from 'koa-router';
import {resolve} from 'path'
import * as Users from './routes/user'
import {load} from './utils/route-deco'
const app = new Koa()
app.use(
    bodify({
        multipart:true,
        strict:false
    })
)
const router = load(resolve(__dirname,'./routes'))
app.use(router.routes())
// const router= new Router()
// router.get('/abc',ctx=>{
//     ctx.body='abccc'
// })
// app.use(router.routes())

app.listen(3000 ,() => {
    console.log('服务器启动成功。。')
})

