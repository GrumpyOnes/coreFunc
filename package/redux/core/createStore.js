export default function createStore(reducer,enhancer){
    if(enhancer){
        //加强dispatch 
        //执行dispatch的时候，执行所有中间件和store.dispatch
        return enhancer(createStore)(reducer)
        

    }
    let currentState
    let currentListeners = [];
    function getState(){
        return currentState
    }

    function dispatch(action){
        currentState = reducer(currentState,action)
        currentListeners.forEach((listener)=>listener())
    }
//订阅取消订阅
    function subscribe(listener){
        currentListeners.push(listener)
        return () => {
            const index = currentListeners.indexOf(listener);
            currentListeners.splice(index, 1);
          };
    }
dispatch({type:'ererererere'})
    return {
        getState,
        dispatch,
        subscribe
    }
}