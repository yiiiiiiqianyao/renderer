'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'BasicMaterial', {
  enumerable: true,
  get: function get() {
    return _BasicMaterial.default;
  },
});
Object.defineProperty(exports, 'Camera', {
  enumerable: true,
  get: function get() {
    return _camera.default;
  },
});
Object.defineProperty(exports, 'Color', {
  enumerable: true,
  get: function get() {
    return _Color.default;
  },
});
Object.defineProperty(exports, 'GrayPass', {
  enumerable: true,
  get: function get() {
    return _gray.default;
  },
});
Object.defineProperty(exports, 'Plane', {
  enumerable: true,
  get: function get() {
    return _plane.default;
  },
});
Object.defineProperty(exports, 'Renderer', {
  enumerable: true,
  get: function get() {
    return _renderer.default;
  },
});
Object.defineProperty(exports, 'Scene', {
  enumerable: true,
  get: function get() {
    return _scene.default;
  },
});

var _scene = _interopRequireDefault(require('./components/scene'));

var _plane = _interopRequireDefault(require('./components/plane'));

var _camera = _interopRequireDefault(require('./utils/camera'));

var _renderer = _interopRequireDefault(require('./components/renderer'));

var _BasicMaterial = _interopRequireDefault(
  require('./components/material/BasicMaterial'),
);

var _Color = _interopRequireDefault(require('./components/object/Color'));

var _gray = _interopRequireDefault(require('./components/pass/gray'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
