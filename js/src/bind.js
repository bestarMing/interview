// Function.prototype.hcbind = function(thisArg, ...argArray) {
//   // 1.获取真实需要调用的函数
//   let fn = this;
//   //2.绑定this
//   thisArg =
//     thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
//   //3.将函数放在thisArg中进行调用

//   function proxyFn(...args) {
//     thisArg.fn = fn;
//     //对两个传入的参数进行合并
//     let finalArgs = [...argArray, ...args];
//     let result = thisArg.fn(...finalArgs);
//     delete thisArg.fn;
//     return result;
//   }
//   return proxyFn;
// };
Function.prototype.hcbind = function(thisArg, ...argArray) {
  let fn = this;
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  function proxyFn(...args) {
    thisArg.fn = fn;
    let finalArgs = [...argArray, ...args];
    let result = thisArg.fn(...finalArgs);
    delete thisArg.fn;
    return result;
  }
  return proxyFn;
};
function foo() {
  console.log("foo被执行", this);
  return 20;
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4);
}

// 系统的bind使用
var bar = foo.bind("abc");
bar();

var newSum = sum.bind("aaa", 10, 20, 30, 40);
newSum();

var newSum = sum.bind("aaa");
newSum(10, 20, 30, 40);

var newSum = sum.bind("aaa", 10);
newSum(20, 30, 40);

// 使用自己定义的bind
var bar = foo.hcbind("abc");
var result = bar();
console.log(result);

var newSum = sum.hcbind("abc", 10, 20);
var result = newSum(30, 40);
