export const getCanvas = function(width: number, height: number) {
  const canvas = document.createElement('canvas');
  setCanvas(canvas, width, height);
  return canvas;
};

export const setCanvas = function(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
};
