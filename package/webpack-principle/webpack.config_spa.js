const {resolve} = require('path')
module.exports = {
    entry:'./src/index.js',
    output:{
        //生成资源存放的位置 必须是绝对路径
        path:resolve(__dirname,'build'),
        //生成资源的名字
        filename:"index.js"
    },
    mode:"development",//none production development
}