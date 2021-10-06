import { isStr,isFn } from "./util";
import {updateHostComponent,updateFunctionComponent,updateFragmentComponent} from './ReactFiberReconciler'
//wip work in progress 当前正在工作中的
let wipRoot = null;
//下一个fiber节点
let nextUnitOfWork = null;

export function scheduleUpdateOnFiber(fiber){
    wipRoot = fiber;
    nextUnitOfWork = fiber;
}

function performUnitOfWork(wip){
    //1.更新wip  
    const {type} = wip
    if(isStr(type)){
        //原生标签
        updateHostComponent(wip)
    }else if(isFn(type)){
        updateFunctionComponent(wip)
    }else{
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

function workLoop(IdleDeadline){
    while(nextUnitOfWork && IdleDeadline.timeRemaining()>0){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if(!nextUnitOfWork && wipRoot){
        commitRoot()
    }
}
requestIdleCallback(workLoop);
//生成fiber后需要提交代码

function commitRoot(){
 commitWorker(wipRoot.child)
 wipRoot = null;
}
function commitWorker(wip){
    if(!wip){
        return;
    }
    //1.提交自己
    const {stateNode} = wip;
    //fiber可能没有dom节点 比如函数组件类组件

    let parentNode = getParentNode(wip.return)//父dom
    if(stateNode){
        parentNode.appendChild(stateNode)
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