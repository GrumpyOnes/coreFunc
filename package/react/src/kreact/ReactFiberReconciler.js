import { isStr,isArray,updateNode } from "./util"
import {createFiber} from './createFiber'
export function updateHostComponent(wip){
    if(!wip.stateNode){
        wip.stateNode = document.createElement(wip.type)
        //创建节点后 处理属性值
        updateNode(wip.stateNode,wip.props)
    }

    reconcileChildren(wip,wip.props.children)
    //console.log('my wip,',wip)
}
export function updateFunctionComponent(wip){
    const children = wip.type(wip.props)

    reconcileChildren(wip,children)
}
export function updateFragmentComponent(wip){
    reconcileChildren(wip,wip.props.children)
}
function reconcileChildren(returnFiber,children){
    if(isStr(children)){
        return;
    }
    let previseNewFiber = null
    const newChildren = isArray(children)?children:[children]
    for(let i =0;i< newChildren.length;i++){
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild,returnFiber)
        if(i===0){
            returnFiber.child = newFiber;
        }else{
            previseNewFiber.sibling = newFiber
        }
        previseNewFiber = newFiber
    }
}