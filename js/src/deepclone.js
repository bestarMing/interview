// 实现深拷贝难点就是对类型的判断以及处理各种边界条件
function isObjcet(value) {
  let valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

//map解决循环引入问题
function deepClone(originValue, map = new WeakMap()) {
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }
  if (typeof originValue === "function") {
    return originValue;
  }
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }
  if (!isObjcet(originValue)) {
    return originValue;
  }
  //map存一份循环引用
  if (map.has(originValue)) {
    return map.get(originValue);
  }
  //判断传入的是数组还是对象
  const newObject = Array.isArray(originValue) ? [] : {};
  map.set(originValue, newObject);
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map);
  }
  //对symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const key in symbolKeys) {
    newObject[key] = deepClone(originValue[key]);
  }
  return newObject;
}

// 测试代码
let s1 = Symbol("aaa");
let s2 = Symbol("bbb");

const obj = {
  name: "why",
  age: 18,
  friend: {
    name: "james",
    address: {
      city: "广州"
    }
  },
  // 数组类型
  hobbies: ["abc", "cba", "nba"],
  // 函数类型
  foo: function(m, n) {
    console.log("foo function");
    console.log("100代码逻辑");
    return 123;
  },
  // Symbol作为key和value
  [s1]: "abc",
  s2: s2,
  // Set/Map
  set: new Set(["aaa", "bbb", "ccc"]),
  map: new Map([["aaa", "abc"], ["bbb", "cba"]])
};

obj.info = obj;

const newObj = deepClone(obj);
console.log(newObj === obj);

obj.friend.name = "kobe";
obj.friend.address.city = "成都";
console.log(newObj);
console.log(newObj.s2 === obj.s2);

console.log(newObj.info.info.info);
