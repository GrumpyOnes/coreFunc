const {resolve}= require('path')
module.exports={
    //入口
    entry:"./src/index.js",
    output:{
    //生成资源存放位置 必须是绝对路径
    path:resolve(__dirname,'./build'),
    //生成的资源叫什么
    filename:"index.js"
    },
    mode:"development"
}