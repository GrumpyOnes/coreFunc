const {getSearchParams} = require('./util')
module.exports = {
    async init(ctx, next) {
        
        const model = ctx.app.$model[ctx.params.list]
        if (model) {
            ctx.list = model
            await next()
        } else {
            ctx.body = 'no this model'
        }
    },

    async list(ctx) {
        const searches = getSearchParams(ctx.search||'')
        ctx.body = await ctx.list.find({...searches})
    },
    async get(ctx) {
        
        //拿到url后拆分 出search信息 
        ctx.body = await ctx.list.findOne({ _id: ctx.params.id })

    },
    async create(ctx) {
        const res = await ctx.list.create(ctx.request.body)
        ctx.body = res
    },
    async update(ctx) {
        const res = await ctx.list.updateOne({ _id: ctx.params.id }, ctx.request.body)
        ctx.body = res
    },
    async del(ctx) {
        const res = await ctx.list.deleteOne({ _id: ctx.params.id })
        ctx.body = res
    },
    async page(ctx) {
        console.log('page...', ctx.params.page)
        ctx.body = await ctx.list.find({})/*  */
    },
}

