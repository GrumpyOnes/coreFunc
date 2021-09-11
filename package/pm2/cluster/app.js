const http = require('http')
const server = http.createServer((request,response)=>{
    Math.random() > 0.5? a():'ok'  //制造一个错误

    response.end('heeeello')
})

//如果是主模块
if(!module.parent){
    server.listen(3000)
}else{
    module.exports = server
}
