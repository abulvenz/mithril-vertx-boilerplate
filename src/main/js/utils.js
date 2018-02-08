var isFunction = (fn) => {
  return fn && typeof fn === 'function';
};
var isArray = (obj) => {
  return obj && Array.isArray(obj);
};
var isString = (obj) => {
  return obj && typeof obj === 'string';
};
var propList = obj => {
  let p = [];
  if (isString(obj))
    return p;
  for (var q in obj)
    p.push(q);
  return p;
};
var traverse = (obj, fn) => {
  propList(obj).forEach(prop => {
    fn(obj, prop);
    return !isString(obj[prop]) &&
      traverse(obj[prop], fn);
  });
};
var copy = obj => {
  let result = JSON.parse(JSON.stringify(obj));
  return result;
};
var event = (vnode, fn) => {
  return (ev) => {
    fn(vnode, ev);
  };
};
var toMap = (array, keyProp, valueProp) => {
  var result = {};
  array.map(elem => result[elem[keyProp]] = valueProp ? elem[valueProp] : elem);
  return result;
};
var safe = (fn) => {
  return fn || (() => {});
};

const pluck = (arr, key) => arr.map(c => c[key]);
const first = arr => arr[0];

export default {
  first,
  pluck,
  propList,
  isArray,
  isString,
  isFunction,
  traverse,
  copy,
  event,
  toMap,
  safe
};
