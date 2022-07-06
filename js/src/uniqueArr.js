function uniqueArr(arr) {
  return [...new Set(arr)];
}
let a = [1, 1, 1, 2, 3, 3, 4];
console.log(uniqueArr(a));
