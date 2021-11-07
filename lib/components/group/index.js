'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _glMatrix = require('gl-matrix');

var _math = require('../../utils/math');

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

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

var Group = /*#__PURE__*/ (function() {
  function Group(props) {
    _classCallCheck(this, Group);

    this.uuid = void 0;
    this.gl = void 0;
    this.projMatrix = void 0;
    this.viewMatrix = void 0;
    this.modelMatrix = void 0;
    this.position = void 0;
    this.cameraDistance = void 0;
    this.uuid = (0, _math.generateUUID)();
    this.gl = props.gl;
    this.position = (props === null || props === void 0
      ? void 0
      : props.position) || [0, 0, 0];
    this.rotation = (props === null || props === void 0
      ? void 0
      : props.rotation) || [0, 0, 0];
    this.scale = (props === null || props === void 0
      ? void 0
      : props.scale) || [1, 1, 1]; // 存储子对象

    this.childrens = [];
    this.setMeshMatrixs();
    this.modelMatrix = this.initModelMatrix();
  }
  /**
   * 设置网格的矩阵
   */

  _createClass(Group, [
    {
      key: 'setMeshMatrixs',
      value: function setMeshMatrixs() {
        this.setTranslete(this.position);
        this.setRotate();
        this.setScaleMatrix();
      },
      /**
       * 设置移动
       * @param {*} position
       */
    },
    {
      key: 'setTranslete',
      value: function setTranslete(position) {
        this.translateMatrix = _glMatrix.mat4.create();

        _glMatrix.mat4.translate(
          this.translateMatrix,
          this.translateMatrix,
          position,
        );

        if (this.rotateMatrix && this.scaleMatrix) {
          this.updateModelMatrix();
        }
      },
      /**
       * 设置旋转矩阵
       */
    },
    {
      key: 'setRotate',
      value: function setRotate(rotation) {
        if (rotation) {
          this.rotation = _toConsumableArray(rotation);
        }

        this.rotateMatrix = _glMatrix.mat4.create();

        _glMatrix.mat4.rotate(
          this.rotateMatrix,
          this.rotateMatrix,
          this.rotation[0],
          _glMatrix.vec3.fromValues(1, 0, 0),
        );

        _glMatrix.mat4.rotate(
          this.rotateMatrix,
          this.rotateMatrix,
          this.rotation[1],
          _glMatrix.vec3.fromValues(0, 1, 0),
        );

        _glMatrix.mat4.rotate(
          this.rotateMatrix,
          this.rotateMatrix,
          this.rotation[2],
          _glMatrix.vec3.fromValues(0, 0, 1),
        );

        if (this.translateMatrix && this.scaleMatrix) {
          this.updateModelMatrix();
        }
      },
      /**
       * 设置缩放矩阵
       */
    },
    {
      key: 'setScaleMatrix',
      value: function setScaleMatrix() {
        this.scaleMatrix = _glMatrix.mat4.create();
      },
      /**
       * 初始化模型矩阵
       * @returns
       */
    },
    {
      key: 'initModelMatrix',
      value: function initModelMatrix() {
        return _glMatrix.mat4.multiply(
          _glMatrix.mat4.create(),
          this.scaleMatrix,
          _glMatrix.mat4.multiply(
            _glMatrix.mat4.create(),
            this.translateMatrix,
            this.rotateMatrix,
          ),
        );
      },
      /**
       * 更新模型网格本身的模型矩阵、同时应用父级的模型矩阵
       */
    },
    {
      key: 'updateModelMatrix',
      value: function updateModelMatrix() {
        var _this$parent;

        _glMatrix.mat4.multiply(
          this.modelMatrix,
          this.scaleMatrix,
          _glMatrix.mat4.multiply(
            _glMatrix.mat4.create(),
            this.translateMatrix,
            this.rotateMatrix,
          ),
        );

        var parentMatrix =
          (this === null || this === void 0
            ? void 0
            : (_this$parent = this.parent) === null || _this$parent === void 0
            ? void 0
            : _this$parent.modelMatrix) || _glMatrix.mat4.create();

        _glMatrix.mat4.multiply(
          this.modelMatrix,
          parentMatrix,
          this.modelMatrix,
        ); // 更新子节点的矩阵

        this.childrens.map(function(child) {
          return child.updateModelMatrix();
        });
      },
      /**
       * 设置网格绕轴旋转
       * @param {*} rotateValues
       */
    },
    {
      key: 'rotate',
      value: function rotate(rotateValues) {
        // 更新网格本身记录的旋转角度
        this.rotation[0] += rotateValues[0];
        this.rotation[1] += rotateValues[1];
        this.rotation[2] += rotateValues[2]; // 更新旋转矩阵

        _glMatrix.mat4.rotateX(
          this.rotateMatrix,
          this.rotateMatrix,
          rotateValues[0],
        );

        _glMatrix.mat4.rotateY(
          this.rotateMatrix,
          this.rotateMatrix,
          rotateValues[1],
        );

        _glMatrix.mat4.rotateZ(
          this.rotateMatrix,
          this.rotateMatrix,
          rotateValues[2],
        ); // 更新模型矩阵

        this.updateModelMatrix();
      },
      /**
       * 增加子对象
       * @param {*} mesh
       */
    },
    {
      key: 'add',
      value: function add(mesh) {
        // TODO: 判断当前对象的子节点中不存在 mesh
        if (!this.hasChildren(mesh)) {
          mesh.parent && mesh.parent.remove(mesh);
          mesh.setParent(this);
          this.childrens.push(mesh);
        }
      },
      /**
       * 判断当前对象的子节点中是否存在对象 object
       * @param {*} object
       * @returns
       */
    },
    {
      key: 'hasChildren',
      value: function hasChildren(object) {
        if (object.uuid) {
          return (
            this.childrens.filter(function(child) {
              return child.uuid === object.uuid;
            }).length > 0
          );
        }

        return false;
      },
      /**
       * 设置 parent 节点
       * @param {*} parent | undefined
       */
    },
    {
      key: 'setParent',
      value: function setParent(parent) {
        this.parent = parent;
      },
      /**
       * 移除子对象
       * @param {*} uuid
       */
    },
    {
      key: 'remove',
      value: function remove(uuid) {
        this.childrens = this.childrens.filter(function(child) {
          if (child.uuid === uuid) {
            child.setParent(undefined);
          }

          return child.uuid !== uuid;
        });
      },
    },
  ]);

  return Group;
})();

exports.default = Group;
