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
            filename:'[name].css'
        }),
        new htmlwebpackplugin({
            template:'./public/login.html',
            filename:'login.html',
            chunks:["login"]
        }),
        
    ],
    resolveLoader:{
        modules:['./node_modules','./myloader']
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['kkb-style-loader','kkb-css-loader','postcss-loader']
        },{
            test:/\.less$/,
            use:[minicssplugin.loader,'css-loader','postcss-loader','kkb-less-loader']
        },{
            test:/\.js$/,
            use:[{
                loader:'kkb-loader-async',
                options:{
                    name:'hihihihi'
                }
            },{
                loader:resolve(__dirname,'./myloader/kkb-loader.js'),
                options:{
                    name:'hihihihi'
                }
            }]
        }]
    }
}
