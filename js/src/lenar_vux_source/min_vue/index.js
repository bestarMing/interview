function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;
      let oldVnode = null;
      watchEffect(function() {
        if (!isMounted) {
          oldVnode = rootComponent.render();
          mount(oldVnode, container);
          isMounted = true;
        } else {
          const newVNode = rootComponent.render();
          patch(oldVnode, newVNode);
          oldVnode = newVNode;
        }
      });
    }
  };
}
