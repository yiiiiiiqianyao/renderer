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

//@ts-nocheck
import { mat4 } from 'gl-matrix';
import { ViewPort } from './viewport'; // 简单的相机

var Camera = /*#__PURE__*/ (function() {
  function Camera(props) {
    _classCallCheck(this, Camera);

    this.position = void 0;
    this.aspect = void 0;
    this.fov = (props === null || props === void 0 ? void 0 : props.fov) || 40;
    this.aspect =
      (props === null || props === void 0 ? void 0 : props.aspect) || 1; // this.aspect =  1;

    this.near =
      (props === null || props === void 0 ? void 0 : props.near) || 0.01;
    this.far = (props === null || props === void 0 ? void 0 : props.far) || 100;
    this.position = (props === null || props === void 0
      ? void 0
      : props.position) || [1, 1, 1];
    this.target = (props === null || props === void 0
      ? void 0
      : props.target) || [0, 0, 0];
    this.up = (props === null || props === void 0 ? void 0 : props.up) || [
      0,
      1,
      0,
    ];
    this.viewPort = new ViewPort({
      eye: this.position,
      target: this.target,
      up: this.up,
    }); // 初始化透视矩阵

    this.initPerspectiveMatrix();
  }
  /**
   * 初始化透视矩阵
   */

  _createClass(Camera, [
    {
      key: 'initPerspectiveMatrix',
      value: function initPerspectiveMatrix() {
        this.perspectiveMatrix = mat4.create();
        mat4.perspective(
          this.perspectiveMatrix,
          (this.fov * Math.PI) / 180,
          this.aspect,
          this.near,
          this.far,
        );
      },
    },
    {
      key: 'resize',
      value: function resize(width, height) {
        this.aspect = width / height; // console.log('this.aspect', this.aspect)

        this.updatePerspectiveMatrix();
      },
      /**
       * 更新透视矩阵
       */
    },
    {
      key: 'updatePerspectiveMatrix',
      value: function updatePerspectiveMatrix() {
        this.initPerspectiveMatrix();
      },
    },
    {
      key: 'getPerspectiveMatrix',
      value: function getPerspectiveMatrix() {
        return this.perspectiveMatrix;
      },
    },
    {
      key: 'getViewMatrix',
      value: function getViewMatrix() {
        return this.viewPort.getViewMatrix();
      },
    },
  ]);

  return Camera;
})();

export { Camera as default };
