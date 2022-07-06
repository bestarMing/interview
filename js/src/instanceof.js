// 手写 instanceof 操作符实现;
function myInstanceof(left, right) {
  while (true) {
    if (left === null) {
      return false;
    }
    if (left.__proto__ === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

function test(name) {
  this.name = name;
}
test.prototype.say = function() {
  console.log(`hello,${this.name}`);
};
const obj = {
  name: "koba"
};
const ming = new test("ming");
console.log(ming.say());
console.log(myInstanceof(ming, test));
console.log(myInstanceof(test, Function));
console.log(myInstanceof(test, Object));
console.log(myInstanceof(test, obj));
console.log(myInstanceof(obj, test));

// console.log(myInstanceof(test, null));
// console.log(ming instanceof test);
