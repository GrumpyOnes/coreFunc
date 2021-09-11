var cluster = require('cluster')
var os = require('os')
var numCPUs = os.cpus().length;//cpu数
numCPUs=2
var process = require('process')//进程

var workers = {}
if(cluster.isMaster){
    //主进程 管理
    //复制一个进程
    cluster.on('exit', (worker, code, signal) => {
        console.log('工作进程 %d 关闭 (%s). 重启中...',
            worker.process.pid, signal || code);
        delete workers[worker.process.pid]
        worker = cluster.fork()
        workers[worker.process.pid] = worker
    });

    console.log('numCPUs:', numCPUs)
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        console.log('init ... pid', worker.process.pid)
        workers[worker.process.pid] = worker;
    }

    process.on('SIGTERM', function () {
        for (var pid in workers) {
            process.kill(pid);
        }
        process.exit(0);
    });
    
}else{
    //附属进程 worker
    var app = require('./app');
    app.listen(3000);
}
//比如在iterm中中断了服务



require('./test')