//替代原生方法 requestIdleCallback

let expirationTime=0;
const threshold=5;

const timerQueue=[]
const taskQueue=[]

export function scheduleCallback(callback){
    const newTask={callback}
    taskQueue.push(newTask)
    schedule(flushWork)

}
//执行任务
function flushWork(){
    expirationTime = getCurrentTime()+threshold
    let currentTask = taskQueue[0]
    while(currentTask && !shouldYield()){
        const {callback} = currentTask
        callback()
        taskQueue.shift()
        currentTask = taskQueue[0]
    }
}
export function schedule(callback){
    timerQueue.push(callback)
    postMessage()
}

//messageChannel
const postMessage = ()=>{
    const {port1,port2} = new MessageChannel()
    port1.onmessage=()=>{
        //把timerquer的任务取出来执行一遍
        let tem = timerQueue.splice(0,timerQueue.length)
        tem.forEach((c)=>c())
    }
    port2.postMessage(null)
}

export function shouldYield(){
    return getCurrentTime()>=expirationTime
}

export function getCurrentTime(){
    return performance.now()
}