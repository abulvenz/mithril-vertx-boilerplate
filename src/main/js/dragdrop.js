let log = (...msg) => {
  //console.log(...msg);
};

let draggableMixin = (data, options = {}) => {
  return Object.assign({
    draggable: true,
    ondragstart: e => {
      log(e);
      e.dataTransfer.setData('text', data)
      e.target.style.opacity = "0.6"
    },
    ondragend: e => {
      log(e);
      e.target.style.opacity = "1.0"
    }
  }, options);
};

let dropzoneMixin = (options) => {
  let res = Object.assign({
    ondragover: e => {
      e.preventDefault();
      log('dragover', e);
    },
    ondragenter: e => {
      e.preventDefault();
      log('dragenter', e)
    },
    ondrop: e => {
      e.preventDefault();
      log('drop', e);
      res.dropped(e.dataTransfer.getData('text'));
    }
  }, options);
  return res;
};

export default {
  drag: draggableMixin,
  drop: dropzoneMixin
}
