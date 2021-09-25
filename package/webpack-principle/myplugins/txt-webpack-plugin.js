//插件结构 类
//必须有apply函数

class TxtWebpackPlugin {
    constructor(options){
        console.log(`-------------->txt-webpack-plugin`)
    }
    apply(compiler){
        //compiler.hooks
        //emit 修改资源文件的最后一步 eg 异步
        compiler.hooks.emit.tapAsync("TxtWebpackPlugin",(compilation,callback)=>{
            //compilation
            //console.log('********************compilation:',compilation.assets)
            const content = `这是一个测试的资源模块`
            compilation.assets["test.txt"] = {
                source:function(){
                    return content;
                },
                size:function(){
                    //只是打包信息栏显示的尺寸
                    return content.length
                }
            }
            callback()
        })
    }
}

module.exports = TxtWebpackPlugin