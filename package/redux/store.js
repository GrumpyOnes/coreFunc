//import {createStore, applyMiddleware, combineReducers} from "redux";
import {createStore,applyMiddleware} from "./core";
// import {createStore, applyMiddleware} from "../kredux/";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import promise from "redux-promise";

import isPromise from "is-promise";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

// 创建一个数据仓库
const store = createStore(
   countReducer,
  // combineReducers({count: countReducer}),
  applyMiddleware(promise, thunk, logger)
);

export default store;

// dispatch一次，执行了所有的中间件函数和store.dispatch

function logger({getState, dispatch}) {
  return (next) => (action) => {
    console.log("logger next", next); //sy-log
    console.log("---------------------------"); //sy-log
    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    console.log(action.type + "执行了！"); //sy-log

    // dispatch
    const returnvalue = next(action);

    const nextState = getState();
    console.log("next state", nextState); //sy-log

    console.log("---------------------------"); //sy-log

    return returnvalue;
  };
}
//中间件 接受对action的控制权 方法内对拿到的action进行判断 如果action为function
//则执行该function 得到 dispatch({type: "ADD", payload: 1});
function thunk({getState, dispatch}) {
  return (next) => (action) => {
    console.log("thunk next", next); //sy-log
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    return next(action);
  };
}

function promise({dispatch}) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
