var dragging = false;

const retrieveHidden = () => dragging ? '' : 'display:none;';

let log = (...msg) => {
  console.log(...msg);
};

let draggableMixin = (data, options = {}) => {
  return Object.assign({
    draggable: true,
    ondragstart: e => {
      log(e);
      e.dataTransfer.setData('text', data);
      e.target.style.opacity = "0.6";
      dragging = true;
    },
    onmouseenter: e => dragging = true,
    onmouseleave: e => dragging = false,
    ondragend: e => {
      log(e);
      dragging = false;
      e.target.style.opacity = "1.0"
    }
  }, options);
};

let dropzoneMixin = (options) => {
  let res = Object.assign({
    style: retrieveHidden() + (options.style ? options.style : ''),
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