import React, {Component} from "react";
import {matchPath} from "react-router-dom";
import RouterContext from "./RouterContext";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {path, children, component, render, computedMatch} = this.props;
          const {location} = context;
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match; // location.pathname === path;
          const props = {...context, match};
          // return match ? React.createElement(component) : null;

          // match: children component render null
          // no match: children(function) null
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
