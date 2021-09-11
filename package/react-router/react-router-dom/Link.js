import {useContext} from "react";
import RouterContext from "./RouterContext";

export default function Link({to, children}) {
  const context = useContext(RouterContext);
  const handle = (e) => {
    e.preventDefault();
    // 命令
    context.history.push(to);
  };
  return (
    <a href={to} onClick={handle}>
      {children}
    </a>
  );
}
