class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  deepend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect();
    });
  }
}
//监听
let activeEffect = null;
function watchEffect(effect) {
  //收集依赖
  activeEffect = effect;
  //收集第一次也要执行
  effect();

  activeEffect = null;
}

//创建一个数据结构管理依赖
const targetMap = new WeakMap();
function getDep(target, key) {
  // 1.根据对象(target)取出对应的Map对象
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  //2取出具体的的dep对象
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

//vue3对raw进行数据劫持
function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.deepend();
      return target[key];
    },
    set(target, key, newValue) {
      const dep = getDep(target, key);
      target[key] = newValue;
      dep.notify();
    }
  });
}

const proxy = reactive({ name: "123" });
proxy.name = "321";

// 测试代码
const info = reactive({ counter: 100, name: "why" });
const foo = reactive({ height: 1.88 });

// watchEffect1
watchEffect(function() {
  console.log("effect1:", info.counter * 2, info.name);
});

// watchEffect2
watchEffect(function() {
  console.log("effect2:", info.counter * info.counter);
});

// watchEffect3
watchEffect(function() {
  console.log("effect3:", info.counter + 10, info.name);
});

watchEffect(function() {
  console.log("effect4:", foo.height);
});

info.counter++;
info.name = "why";

foo.height = 2;
