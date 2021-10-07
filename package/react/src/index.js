 //import React, {Component,useState,useReducer} from "react";
 //import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
import {useReducer} from './kreact/react'
// import Component from "./kreact/Component";
import "./index.css";

//链表 数组 fiber.memorized(hook0)
function FunctionComponent(props) {
  //const [count,setCount] = useState(0)
  const [count2,setCount2] = useReducer((x)=>x+1,0)
  return (
    <div className="border">
      <p>{count2}</p>
      <button
        onClick={() => {
          
          setCount2(count2+1)
        }}>
        click
      </button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>百度</h1>
    <a href="https://www.baidu.com/">baidu</a>
    <FunctionComponent name="FunctionComponent" />

  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本节点
// 函数组件
// 类组件
// Fragment
