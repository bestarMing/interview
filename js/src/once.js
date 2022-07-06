const f = () => {
  console.log("call");
  return 3;
};
const once = fn => {
  let revoke = false;
  let result;
  return (...args) => {
    if (revoke) return result;
    revoke = true;
    return (result = fn(...args));
  };
};

const ache = once(f);
ache();
ache();
ache();
ache();
