- 核心方法
```
 import {createBrowserHistory} from "history";
 this.history = createBrowserHistory();

 //通过context传递histroy listen监听locaiton变化

 this.uslisten = histroy.listen(location=>{

 })
 //取消监听
 this.uslisten()

 React.Children.forEach(this.props.children,(child)=>{
     //相当于forEach 用于switch遍历
 })

 ```
 route中 children component render 优先级
 <context.provider value={a:1}>
  <context.provider value={a:3}>
    //取到的是3
  </context.provider>
 </context.provider>