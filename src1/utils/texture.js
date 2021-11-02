import * as _Math from './math';

const useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';

export function textureNeedsPowerOfTwo(texture) {
  // if ( capabilities.isWebGL2 ) return false;
  // return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
  //     ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );
}

export function isPowerOfTwo(image) {
  return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);
}

export function createCanvas(width, height) {
  // Use OffscreenCanvas when available. Specially needed in web workers

  return useOffscreenCanvas
    ? new OffscreenCanvas(width, height)
    : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
}

export function resizeImage(image) {
  var width = _Math.floorPowerOfTwo(image.width);
  var height = _Math.floorPowerOfTwo(image.height);

  var canvas = createCanvas(width, height);
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

export function loadImage(imgSrc) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = imgSrc;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!isPowerOfTwo(img)) {
        resolve({
          succeed: true,
          img: resizeImage(img),
        });
      } else {
        resolve({
          succeed: true,
          img,
        });
      }
    };
    img.onerror = err => {
      reject({
        succeed: false,
        img,
      });
    };
  });
}
