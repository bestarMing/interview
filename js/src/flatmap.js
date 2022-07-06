// 先map再flat
// let myFlatMap = function(fn) {
//   let target = this;
//   return target.map(i => fn(i)).flat();
// };

const myFlatMap = function(fn) {
  // 这里的this只的是arr 因为函数是arr.myFlatMap调用的
  const target = this;
  return target.map(x => fn(x)).flat();
};

Array.prototype.myFlatMap = myFlatMap;
let arr = ["it's Sunny in", "", "California"];
let arr1 = arr.map(x => x.split(" "));
let arr2 = arr.flatMap(x => x.split(" "));
let arr3 = arr.myFlatMap(x => x.split(" "));
console.log(arr1); // [["it's","Sunny","in"],[""],["California"]]
console.log(arr2); // ["it's","Sunny","in", "", "California"]
console.log(arr3); // ["it's","Sunny","in", "", "California"]
