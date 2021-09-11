import {Component} from "react";
import RouterContext from "./RouterContext";

export default class Redirect extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {history} = context;
          const {to} = this.props;
          return (
            <LifeCycle
              onMount={() => {
                history.push(to);
              }}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return null;
  }
}
