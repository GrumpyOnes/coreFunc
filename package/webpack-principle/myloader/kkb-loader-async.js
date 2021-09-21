//异步 
module.exports = function (source){
    console.log('source',this.query)
    
    //return source.replace('login.js','lllllllooooogggiiinnn')
    var callback = this.async()
    setTimeout(()=>{
        const info = source.replace('lllllllooooogggiiinnn','lllllllooooogggiiinnn.tttttttt')
        callback(null,info)
    },1000);
}