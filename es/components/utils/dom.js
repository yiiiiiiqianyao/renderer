export var getCanvas = function getCanvas(width, height) {
  var canvas = document.createElement('canvas');
  setCanvas(canvas, width, height);
  return canvas;
};
export var setCanvas = function setCanvas(canvas, width, height) {
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
};
