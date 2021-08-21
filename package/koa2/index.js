/**
 * compose函数 将多个use中间件合成一个
*/
function compose(middlewares){
    return function(){
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if(!fn){
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next(){
                    return dispatch(i + 1)
                })
            )
        }
    }
}

async function fn1(next){
    console.log('fn1')
    await next()
    console.log('end fn1')
}

async function fn2(next){
    console.log('fn2')
    await delay()
    await next()
    console.log('end fn2')
}

function fn3(next){
    console.log('fn3')
}

function delay(){
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(),2000)
    })
}

const middlewares = [fn1,fn2,fn3]
const finalFn = compose(middlewares)
finalFn()

/**
 * 一种get set的调用方式
 *  vue2：defineProperty
 *  vue3：proxy
*/
const myObj = {
    info:{name : 'kurt',desc:'i am a guitarplayer'},
    get name(){
        return this.info.name
    },
    set name(val){
        console.log('new name is '+ val)
        this.info.name = val + '!!!'
    }
}

console.log(myObj.name)
myObj.name = 'malicious'
console.log(myObj.name)