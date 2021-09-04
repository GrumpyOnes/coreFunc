module.exports =app=>({
    index:async ctx=>{
        const name= await app.$service.user.getName()
        app.ctx.body='首页 @ctrl'+name
    
    },
    detail:async ctx=>{
        app.ctx.body='详情 @ctrl'
    }
})