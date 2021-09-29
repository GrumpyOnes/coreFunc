const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {dirname,join} = require('path')
const {transformFromAst} = require('@babel/core')
class Webpack {
    constructor(option){
        //console.log(option)
        this.entry = option.entry;
        this.output = option.output;
        this.modules=[];
    }

    run(){
        const moduleInfo = this.parse(this.entry) //拿到入口的依赖信息
        //console.log('moduleInfo',moduleInfo)
        this.modules.push(moduleInfo)
        for(let i=0;i<this.modules.length;i++){
            const dependencies= this.modules[i].dependencies;
            if(dependencies){
                for(let j in dependencies){
                    this.modules.push(this.parse(dependencies[j]))
                }
            }
        }
        //console.log(this.modules)
        /*获得如下的结构 依赖图谱[{
            modulePath: 'src/a.js',
            dependencies: {},
            code: `"use strict";\n\nconsole.log('a');`
        },]*/
        //转换为对象
        const obj ={};
        this.modules.forEach(itm=>{
            obj[itm.modulePath] = {
                dependencies:itm.dependencies,
                code:itm.code
            }
        })
        //console.log('obj',obj)
        this.bundle(obj)
    }

    bundle(obj){
        //创建bundle文件 自执行函数
        const dpdMap=JSON.stringify(obj)
        const content = 
        
        `(function(modulesInfo){
            //webpackbootstrap
            function require(modulePath){
                function fixPath(relativePath) {
                    return require(modulesInfo[modulePath].dependencies[relativePath]);
                }
                let exports = {};
                //？为什么再次套一层函数：需要做替换 code中的require替换成全的

            
                (function(require, exports, code){
                    eval(code)
                  })(fixPath,exports,modulesInfo[modulePath].code);

                return exports;
            }

            require('${this.entry}')


        })(${dpdMap})`




        const bundlePath = join(this.output.path,this.output.filename)
        
        fs.writeFileSync(bundlePath,content,'utf-8')
    }

    parse(modulePath){
         // ./src/index.js   
        //分析编译模块
        //分析该模块是否有依赖
        //编译该模块
        const content = fs.readFileSync(modulePath,"utf-8")
        //parser 将content->ast
        const ast = parser.parse(content,{
            sourceType:"module"
        })
        //console.log('asssst',ast.program.body)
        const dependencies = {}
        traverse(ast,{
            ImportDeclaration({node}){
                //获取import的vaule  ./a.js
                //console.log(node.source.value)
                //通过dirname 除了路径和入口的关系 得到src/a.js
                const fullPath = join(dirname(modulePath),node.source.value)
                //console.log(fullPath)
                dependencies[node.source.value] = fullPath;
                //console.log(dependencies);
            }
        })


        //通过transformFromAst将代码转化为低版本的代码
        const {code} = transformFromAst(ast,null,{
            presets:['@babel/preset-env']
        })
        //dependencies.code=code;
        //
        return {
            modulePath,
            dependencies,
            code
        }
        

    }
}

module.exports = Webpack

//@babel/parser code =>ast 抽象语法树
/**
 * 
*/
// @babel/traverse 
//{join,dirname}path
//__dirname 返回绝对路径