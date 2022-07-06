// 防抖
function debounce(fn, delay, immediate = false) {
  // 1.定义一个定时器，保存上一次的定时器
  let timer = null;
  //控制第一次立即执行
  let isInvoke = false;

  // 2.真正执行的函数
  const _debounce = function(...args) {
    //取消上一次的定时器
    if (timer) clearTimeout(timer);
    //判断是否需要立即执行函数
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      //   延迟执行
      timer = setTimeout(() => {
        fn.apply(this, args);
        isInvoke = false;
        timer = null;
      }, delay);
    }
  };

  //封装取消功能
  _debounce.cancel = function() {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };
  return _debounce;
}
