//构建ts环境 npm i typescript ts-node-dev tslint @types/node -D
//"experimentalDecorators": true,

/**
 * 装饰器 装饰器模式
 * 
 * eg 1.
*/
// class Log{
//     print(msg) {
//         console.log(msg)
//     }
// }
// const createDec=str => (target,property)=>{
//     const old = target.prototype[property]
//     target.prototype[property] = msg=>{
//         msg = `${str}${msg}${str}`
//         old(msg)
//     }
// }
// const log = new Log()
// createDec('!!!')(Log,'print')
// log.print('hihihi')


/**
 * anotation 注解风格的装饰器
 * eg2
 * 
 * descriptor 属性描述符
*/
const  createDec = (str) => (target,property,descriptor)=>{
    var old= descriptor.value
    console.log('descriptor',descriptor)
    descriptor.value = msg => {
        msg=`${str}${msg}${str}`
        old.apply(null,[msg])
    }
}
class Log{
    @createDec('====')
    print(msg) {
        console.log(msg)
    }
}

const log = new Log()
log.print('hihihi')

/***
 *通过 yarn start_index 测试
*/