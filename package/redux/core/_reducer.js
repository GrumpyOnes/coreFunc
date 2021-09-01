//1.reducer
let sum =0;
const arr=[1,2,3,4]
const reducer = (preSum,curr) =>preSum+curr;
console.log('sum',arr.reduce(reducer,5))

//2.
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

// 顺序执行f123,f1k
// 1.
// f1("omg");
// f2("omg");
// f3("omg");

//2.
//f3(f2(f1("omg")));

//3.
let res = compose(f1,f2,f3)("omg");
console.log("res", res); //sy-log

function compose(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }

  if (funs.length === 1) {
    return funs[0];
  }

  return funs.reduce((a, b) => (...args) => a(b(...args)));
}

// function(sum,curr){
//     return function(val){
//         return sum(curr(val))
//     }
// }
console.log('---------------------------')

const mf1=(next) =>(arg)=>{
  console.log("mf1", arg);
  const n = next(arg);
  console.log("mf1 end", arg);
  return n
}
const mf2=(next) =>(arg)=>{
  console.log("mf2", arg);
  const n = next(arg);
  console.log("mf2 end", arg);
  return n
}
const mf3=(next) =>(arg)=>{
  console.log("mf3", arg);
  const n = next(arg);
  console.log("mf3 end", arg);
  return n
}

const xx = (arg)=>{
  console.log('this is xx',arg)
}
compose(mf1,mf2,mf3)(xx)(5)
/**
mf1 5
mf2 5
mf3 5
this is xx 5
mf3 end 5
mf2 end 5
mf1 end 5
*/