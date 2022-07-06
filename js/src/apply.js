Function.prototype.hcapply = function(thisArg, argArray) {
  let fn = this;
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  // ||操作符返回第一个真值 没有真值返回最后的数
  argArray = argArray || [];
  thisArg.fn = fn;
  let result = thisArg.fn(...argArray);
  delete thisArg.fn;
  return result;
};
function sum(num1, num2) {
  console.log("sum被调用", this, num1, num2);
  return num1 + num2;
}

function foo(num) {
  return num;
}

function bar() {
  console.log("bar函数被执行", this);
}

// 系统调用
// var result = sum.apply("abc", [20]);
// console.log(result);

// 自己实现的调用
var result = sum.hcapply("abc1", [20, 30]);
console.log(result);

var result2 = foo.hcapply("abc", [20]);
console.log(result2);

// edge case
bar.hcapply(0);
