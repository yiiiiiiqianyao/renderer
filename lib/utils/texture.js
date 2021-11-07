'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createCanvas = createCanvas;
exports.isPowerOfTwo = isPowerOfTwo;
exports.loadImage = loadImage;
exports.resizeImage = resizeImage;
exports.textureNeedsPowerOfTwo = textureNeedsPowerOfTwo;

var _Math = _interopRequireWildcard(require('./math'));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop,
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

// @ts-nocheck
var useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';

function textureNeedsPowerOfTwo(texture) {
  // if ( capabilities.isWebGL2 ) return false;
  // return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
  //     ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );
}

function isPowerOfTwo(image) {
  return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);
}

function createCanvas(width, height) {
  // Use OffscreenCanvas when available. Specially needed in web workers
  return useOffscreenCanvas
    ? new OffscreenCanvas(width, height)
    : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
}

function resizeImage(image) {
  var width = _Math.floorPowerOfTwo(image.width);

  var height = _Math.floorPowerOfTwo(image.height);

  var canvas = createCanvas(width, height);
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

function loadImage(imgSrc) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.src = imgSrc;
    img.crossOrigin = 'anonymous';

    img.onload = function() {
      if (!isPowerOfTwo(img)) {
        resolve({
          succeed: true,
          img: resizeImage(img),
        });
      } else {
        resolve({
          succeed: true,
          img: img,
        });
      }
    };

    img.onerror = function(err) {
      reject({
        succeed: false,
        img: img,
      });
    };
  });
}
