function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// @ts-nocheck
import { mat4 } from 'gl-matrix';
/**
 * 视图
 */

export var ViewPort = /*#__PURE__*/ (function() {
  function ViewPort(props) {
    _classCallCheck(this, ViewPort);

    this.eye = (props === null || props === void 0 ? void 0 : props.eye) || [
      1,
      1,
      1,
    ];
    this.target = (props === null || props === void 0
      ? void 0
      : props.target) || [0, 0, 0];
    this.up = (props === null || props === void 0 ? void 0 : props.up) || [
      0,
      1,
      0,
    ];
    this.viewMatrix = mat4.create();
    this.initViewMatrix();
  }

  _createClass(ViewPort, [
    {
      key: 'initViewMatrix',
      value: function initViewMatrix() {
        mat4.lookAt(this.viewMatrix, this.eye, this.target, this.up);
      },
    },
    {
      key: 'getViewMatrix',
      value: function getViewMatrix() {
        return this.viewMatrix;
      },
    },
  ]);

  return ViewPort;
})();
