import {scheduleUpdateOnFiber} from './ReactFiberWorkloop'
function render(element,container){
    console.log('element',element)
    const FiberRoot = {
        type:container.nodeName.toLocaleLowerCase(),
        props:{children:element},
        stateNode:container
    }
    //
    scheduleUpdateOnFiber(FiberRoot)
}

export default {render}