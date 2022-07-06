Function.prototype.hccall = function(thisArg, ...args) {
  let fn = this;
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  thisArg.fn = fn;
  let resulr = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
};
function foo() {
  console.log("foo函数被执行", this);
}

function sum(num1, num2) {
  console.log("sum函数被执行", this, num1, num2);
  return num1 + num2;
}

// 系统的函数的call方法
foo.call(undefined);
var result = sum.call({}, 20, 30);
// console.log("系统调用的结果:", result)

// 自己实现的函数的hccall方法
// 默认进行隐式绑定
// foo.hccall({ name: "why" });
// foo.hccall(undefined);
var result = sum.hccall("abc", 20, 30);
console.log("hccall的调用:", result);

// var num = {name: "why"}
// console.log(Object(num))
