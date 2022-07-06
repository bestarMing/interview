class EventBus {
  constructor() {
    this.eventBus = {};
  }
  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({
      eventCallback,
      thisArg
    });
  }
  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName];
    const newhandlers = [...handlers];
    for (let i = 0; i < newhandlers.length; i++) {
      const handle = newhandlers[i];
      if (handle.eventCallback == eventCallback) {
        const index = handlers.indexOf(handle);
        handlers.splice(index, 1);
      }
    }
  }
  emit(eventName, ...ployload) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach(handle => {
      handle.eventCallback.apply(handle.thisArg, ployload);
    });
  }
}
const eventBus = new EventBus();

// main.js
eventBus.on(
  "abc",
  function() {
    console.log("监听abc1", this);
  },
  { name: "why" }
);

const handleCallback = function() {
  console.log("监听abc2", this);
};
eventBus.on("abc", handleCallback, { name: "why" });

// utils.js
eventBus.emit("abc", 123);

// 移除监听
eventBus.off("abc", handleCallback);
eventBus.emit("abc", 123);
