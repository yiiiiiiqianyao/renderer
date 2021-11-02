// import { DataConfig, setDataConfig } from './config_1';

export const initGL = function(id: string) {
  let wrap = document.getElementById(id);
  if (wrap) {
    let { clientWidth, clientHeight } = wrap;
    let canvas = document.createElement('canvas');
    let width = clientWidth * window.devicePixelRatio;
    let height = clientHeight * window.devicePixelRatio;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${clientWidth}px`;
    canvas.style.height = `${clientHeight}px`;
    wrap.appendChild(canvas);

    let ctx = canvas.getContext('2d');
    ctx?.fillRect(0, 0, width, height);
  }
};
