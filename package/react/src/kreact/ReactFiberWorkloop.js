import { isStr,isFn, isStringOrNumber ,Update, updateNode} from "./util";
import {updateHostComponent,updateFunctionComponent,updateFragmentComponent} from './ReactFiberReconciler'
import { scheduleCallback, shouldYield } from "./scheduler";
//wip work in progress 当前正在工作中的
let wipRoot = null;
//下一个fiber节点
let nextUnitOfWork = null;

export function scheduleUpdateOnFiber(fiber){
    fiber.alternate = {...fiber}
    wipRoot = fiber;
    nextUnitOfWork = fiber;
    //
    scheduleCallback(workLoop)
}

function performUnitOfWork(wip){
    //1.更新wip  
    const {type} = wip
    if(isStringOrNumber(type)){
        //原生标签
        updateHostComponent(wip)
    }else if(isFn(type)){
        updateFunctionComponent(wip)
    }else{
        //暂不处理fragment
        updateFragmentComponent(wip)
    }

    //2.返回下一个更新的任务 深度优先
    if(wip.child){
        return wip.child
    }
    let next = wip
    while(next){
        if(next.sibling){
            return next.sibling;
        }
        next = next.return;
    }
    return null
    

}
/** 这是通过 requestIdleCallback 执行的代码
function workLoop(IdleDeadline){
    while(nextUnitOfWork && IdleDeadline.timeRemaining()>0){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot){
        commitRoot()
    }
}
requestIdleCallback(workLoop);
*/

/**
 * 这是通过scheuler执行的代码
*/
function workLoop(){
    while(nextUnitOfWork && !shouldYield()){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot){
        commitRoot()
    }
}


//生成fiber后需要提交代码

function commitRoot(){
    isFn(wipRoot.type) ?commitWorker(wipRoot):commitWorker(wipRoot.child)
 //commitWorker(wipRoot.child)
 wipRoot = null;
}
function commitWorker(wip){
    if(!wip){
        return;
    }
    //1.提交自己
    const {flags,stateNode} = wip;
    //fiber可能没有dom节点 比如函数组件类组件

    let parentNode = getParentNode(wip.return)//父dom
    if(stateNode){
        parentNode.appendChild(stateNode)
    }
    if(flags & Update && stateNode){
        updateNode(stateNode,wip.alternate.props,wip.props)
    }
    
    //2.子节点
    commitWorker(wip.child)
    //3.兄弟
    commitWorker(wip.sibling)
}

function getParentNode(fiber){
    while(fiber){
        if(fiber.stateNode){
            return fiber.stateNode
        }
        fiber = fiber.return;
    }
}