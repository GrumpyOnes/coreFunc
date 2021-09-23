const {resolve,join} = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const minicssplugin = require('mini-css-extract-plugin')
const glob = require('glob')

//glob : yarn add glob -D
const setMPA = ()=>{
    const entry={};
    const htmlwebpackplugins=[];
    //查询页面 入口模块 路径 以及相应hrml模块
    //提取页面入口的名称用于entry的chunkname
    //所有的页面入口模块和相应的html模板都要放在一个目录下
    const entryPath =  glob.sync(join(__dirname,'./src/*/index.js'))
    const entrynames= entryPath.map((itm)=>{
        //\w+
        const entryname = itm.match(/src\/(.*)\/index\.js$/)[1]
        return entryname
    })
    console.log('entryPath',entrynames);
    entrynames.forEach(itm=>{
         entry[itm] = `./src/${itm}/index.js`;
         htmlwebpackplugins.push(new htmlwebpackplugin({
            template:`./src/${itm}/index.html`,
            filename:`${itm}/index.html`,
            chunks:[itm]
         }) )
    })
    return {entry,htmlwebpackplugins}
}

const {entry,htmlwebpackplugins} = setMPA();

module.exports = {
    //index:modules=[index.js,a.js]=[chunk,cnunk]=chunks
    entry,
    output:{
        //生成资源存放的位置 必须是绝对路径
        path:resolve(__dirname,'mpa-build'),
        //生成资源的名字
        filename:"[name]/index.js"
    },
    mode:"development",//none production development
    plugins:[
        new CleanWebpackPlugin(),
        ...htmlwebpackplugins,
        new minicssplugin({
            filename:'css/[name].css'
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
