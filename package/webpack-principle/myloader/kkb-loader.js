module.exports = function (source){
    console.log('source',this.query)
    
    //return source.replace('login.js','lllllllooooogggiiinnn')
    const info = source.replace('login.js','lllllllooooogggiiinnn')
    this.callback(null,info)
}
