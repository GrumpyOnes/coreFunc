//TODO 科里化 
module.exports = (app) => ({
    'get /' :app.$ctrl.home.index,
    'get /detail':app.$ctrl.home.detail
})