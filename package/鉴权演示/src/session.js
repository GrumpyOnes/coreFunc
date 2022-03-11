const http = require('http')

const session={}; //模拟服务端存储
const SID = 'thisIsSid'
http.createServer((req,res)=>{
    if (req.url === '/favicon.ico') {
        return
    }
    //查找cookie是否存在
    const cookie = req.headers.cookie;
    console.log('*******  cookie  ********');
    console.log(cookie)
    if(cookie && cookie.indexOf(SID)>-1){
        //cookie中存在sid
        const pattern = new RegExp(`${SID}=([^;]+);?\s*`) 
        const mysid = pattern.exec(cookie)[1]
        console.log('******* session *******')
        console.log(session)

        res.end('Welcome Back,'+session?.[mysid]?.['name']);
       
        
        
    }else{
        const _sid = (Math.random()*100000000000).toFixed();
        // 省略登陆等过程
        // set cookie
        const _name = 'John Lennon'
        res.setHeader('Set-Cookie',`${SID}=${_sid};`)
        session[_sid] = {name:_name};
        res.end('Nice 2 meet U,'+_name + '.');

    }
    
    
}).listen(4000)
