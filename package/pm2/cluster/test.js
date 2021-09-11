const request = require('request') //模拟请求
setInterval(()=>{
    request('http://localhost:3000',function(err,res,body){
        console.log('body',body)
    })
},1000)