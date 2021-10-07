import { isStr,isArray,updateNode, isStringOrNumber,Update } from "./util"
import {createFiber} from './createFiber'
import {renderWithHooks} from './hooks'
export function updateHostComponent(wip){
    if(!wip.stateNode){
        wip.stateNode = document.createElement(wip.type)
        //创建节点后 处理属性值
        updateNode(wip.stateNode,{},wip.props)
    }

    reconcileChildren(wip,wip.props.children)
    //console.log('my wip,',wip)
}
export function updateFunctionComponent(wip){
    renderWithHooks(wip)
    const children = wip.type(wip.props)

    reconcileChildren(wip,children)
}
export function updateFragmentComponent(wip){
    reconcileChildren(wip,wip.props.children)
}
function reconcileChildren(returnFiber,children){
    if(isStringOrNumber(children)){
        return;
    }
    let previseNewFiber = null

    let oldFiber = returnFiber.alternate?.child
    const newChildren = isArray(children)?children:[children]
    for(let i =0;i< newChildren.length;i++){
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild,returnFiber)
        const same = sameNode(newFiber,oldFiber)
        if(same){
            Object.assign(newFiber,{
                alternate:oldFiber,
                stateNode:oldFiber.stateNode,
                flags:Update
            })
        }
        if(oldFiber){
            oldFiber = oldFiber.sibling
        }
        if(previseNewFiber===null){
            returnFiber.child = newFiber;
        }else{
            previseNewFiber.sibling = newFiber
        }
        previseNewFiber = newFiber
    }
}

//判断节点是否可以复用
function sameNode(a,b){
    return !!(a&& b && a.key=== b.key && a.type===b.type)
}
//两个虚拟dom三种操作： 删除 替换 新增
//reactDom.render forceupdate setState

//scheduler 调度工具 

//performance.now 获取客户端时间
//
