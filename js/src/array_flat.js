function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce(
    (pre, cur) =>
      Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
    []
  );
}
// 能用迭代的思路去实现吗 ?
function flatter1(arr) {
  if (!arr.length) return;
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
console.log(flatter1([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
