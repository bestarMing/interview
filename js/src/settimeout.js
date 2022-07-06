// 题目描述: setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
function mySettimeout(fn, t) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(interval, t);
  }
  interval();
  return {
    cancel: () => {
      clearTimeout(timer);
    }
  };
}
// let a = mySettimeout(() => {
//   console.log(111);
// }, 1000);
// let b = mySettimeout(() => {
//   console.log(222);
// }, 1000);

// 扩展：我们能反过来使用 setinterval 模拟实现 settimeout 吗？
const mySetTimeout = (fn, time) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, time);
};
mySetTimeout(() => {
  console.log(1);
}, 1000);
