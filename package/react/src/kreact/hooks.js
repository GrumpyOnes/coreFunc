import { scheduleUpdateOnFiber } from "./ReactFiberWorkloop"

let currentlyRenderingFiber = null
let workInProgressHook = null
export function renderWithHooks(wip){
    currentlyRenderingFiber = wip
    
    currentlyRenderingFiber.memorizedState = null
    workInProgressHook = null
}
function updateWorkInProgressHook(){
    let hook
    let current = currentlyRenderingFiber.alternate
    if(current){
        //更新
        currentlyRenderingFiber.memorizedState = current.memorizedState

        if(workInProgressHook){
          hook = workInProgressHook = workInProgressHook.next
        }else{
            hook = workInProgressHook = current.memorizedState
        }

    }else{
        //初次渲染
        hook = {
            memorizedState:null,
            next:null,
        }
        if(workInProgressHook){
            workInProgressHook = workInProgressHook.next = hook
        }else{
            //headhook
            workInProgressHook= currentlyRenderingFiber.memorizedState=hook
        }

    }
    return hook
}

// hook={
//     memorizedState:null; //状态值
//     next:null //下一个hook
// }
export function useReducer(reducer,initalState){
    const hook= updateWorkInProgressHook()
    if(!currentlyRenderingFiber.alternate){
        //初次渲染
        hook.memorizedState = initalState
    }
    const dispatch = ()=>{
        console.log('omg...')
        hook.memorizedState=reducer(hook.memorizedState)
        scheduleUpdateOnFiber(currentlyRenderingFiber)
    }
    return [hook.memorizedState,dispatch]
}