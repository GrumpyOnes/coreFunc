const webpack = require('webpack')
const config = require('./webpack.config.js')

const compiler = webpack(config)

Object.keys(compiler.hooks).forEach((hookName)=>{
    //同步钩子用tap
    //异步钩子用tapasync
    compiler.hooks[hookName].tap("事件名称",()=>{
        console.log(`run-------->${hookName}`)
    })
})

compiler.run()

/**
 * 
 * 
 * run-------->beforeRun
run-------->run
run-------->normalModuleFactory
run-------->contextModuleFactory
run-------->beforeCompile
run-------->compile
run-------->thisCompilation
run-------->compilation
run-------->make
run-------->normalModuleFactory
run-------->contextModuleFactory
run-------->beforeCompile
run-------->compilation
run-------->afterCompile



run-------->afterCompile
run-------->shouldEmit
run-------->emit
run-------->assetEmitted
run-------->assetEmitted
run-------->assetEmitted
run-------->assetEmitted
run-------->afterEmit
run-------->done
*/