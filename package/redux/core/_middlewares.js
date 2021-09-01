//middleware举例

//
function logger({getState,dispatch}){
    return next=>action=>{
        console.log('---------')
        const prevState = getState()
        console.log('prevState',prevState)

        const returnvalue = next(action);

        const nextState = getState()
        console.log('nextState',nextState)
        console.log('---------')
        return returnvalue
    }
}

function thunk({getState,dispatch}){
    return (next) => (action) => {
            console.log("thunk next", next); //sy-log
            if (typeof action === "function") {
              return action(dispatch, getState);
            }
        
            return next(action);
          };
}

/**
 * applyMiddleware(promise, thunk, logger)
 * 即
 * func = promise(thunk(logger(dispatch)))
 * 当func(action)时
 * 先执行
*/
