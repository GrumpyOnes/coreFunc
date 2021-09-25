const {resolve} = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const minicssplugin = require('mini-css-extract-plugin')
const MyTxtPlugins = require("./myplugins/txt-webpack-plugin")
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
        new MyTxtPlugins({}),
        new minicssplugin({
            filename:'css/[name].css'
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
            use:[{loader:minicssplugin.loader,
                
                },'css-loader','postcss-loader','kkb-less-loader']
        },{
            test:/\.js$/,
            use:[{
                loader:"babel-loader",
                //配置可以移到。babelrc
                // options:{
                //     //presets:["@babel/preset-env"]
                //     presets:[["@babel/preset-env",{
                //         targets:{
                //             //设置目标浏览器集合
                //             chrome:"67"
                //         },
                //         corejs:2,
                //         useBuiltIns:'entry'//配置按需加载
                //     }]]
                // }
            },{
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
        },{
            test:/\.(png|gif|jpe?g|webp)$/,
                // use:{
                //     loader:"file-loader",
                //     options:{
                //         name:"[name].[ext]", //"image/[name].[ext]"
                //         outputPath:'images',
                //         publicPath:"../images"//图片资源的引入位置
                //     }
                // }
                use:{
                        loader:"url-loader",
                        options:{
                            name:"[name].[ext]", //"image/[name].[ext]"
                            outputPath:'images',
                            publicPath:"../images",//图片资源的引入位置
                            limit:3*1024,//11kb以下转为base 64

                        }
                    }
        }]
    }
}
