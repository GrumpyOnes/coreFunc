const {resolve} = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const minicssplugin = require('mini-css-extract-plugin')
module.exports = {
    //index:modules=[index.js,a.js]=[chunk,cnunk]=chunks
    entry:{index:'./src/index.js',login:'./src/login.js'},
    output:{
        //生成资源存放的位置 必须是绝对路径
        path:resolve(__dirname,'build'),
        //生成资源的名字
        filename:"[name].js"
    },
    mode:"development",//none production development
    plugins:[
        new CleanWebpackPlugin(),
        new htmlwebpackplugin({
           template:'./public/index.html',
           filename:'index.html',
           chunks:["index"]
        }),
        new minicssplugin({
            filename:'index.css'
        }),
        new htmlwebpackplugin({
            template:'./public/login.html',
            filename:'login.html',
            chunks:["login"]
        }),
        
    ],
    module:{
        rules:[{
            test:/\.css$/,
            use:[minicssplugin.loader,'css-loader']
        }]
    }
}
