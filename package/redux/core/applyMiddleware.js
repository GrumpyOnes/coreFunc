export default function applyMiddleware(...middlewares) {
    return createStore => reducer=>{
        const store=createStore(reducer)
        let dispatch = store.dispatch

        //todo 加强dispatch

        //对状态仓库的控制权
        const midApi={
            getState:store.getState,
            dispatch:action=>dispatch(action)
        }
        const chain = middlewares.map((middleware)=>middleware(midApi))
        
        dispatch = compose(...chain)(store.dispatch)
        return {...store,dispatch}
    }
}

function compose(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }

  if (funs.length === 1) {
    return funs[0];
  }

  return funs.reduce((a, b) => (...args) => a(b(...args)));
}
