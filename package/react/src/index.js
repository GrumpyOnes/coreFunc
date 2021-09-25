 //import React, {Component} from "react";
 //import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
      <button
        onClick={() => {
          console.log("omg"); //sy-log
        }}>
        click
      </button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="FunctionComponent" />

    <>
      <h1>omg</h1>
      <h2>omg</h2>
    </>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本节点
// 函数组件
// 类组件
// Fragment