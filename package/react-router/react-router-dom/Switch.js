import React, {Component} from "react";
import {matchPath} from "react-router-dom";
import RouterContext from "./RouterContext";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = context.location;
          let match; //标记是否匹配
          let element; //标记匹配到的元素

          React.Children.forEach(this.props.children, (child) => {
            //
            if (match == null && React.isValidElement(child)) {
              // 匹配
              element = child;
              match = child.props.path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, {computedMatch: match})
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
