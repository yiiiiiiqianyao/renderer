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

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {}),
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

import Group from '../group';
import { distance } from '@/utils/math';

var Scene = /*#__PURE__*/ (function(_Group) {
  _inherits(Scene, _Group);

  var _super = _createSuper(Scene);

  function Scene(props) {
    var _this;

    _classCallCheck(this, Scene);

    _this = _super.call(this, props);
    _this.type = 'Scene';
    _this.gl = void 0;
    _this.camera = void 0;
    _this.passList = void 0;
    _this.children = [];
    _this.renderer = props.renderer;
    _this.gl = _this.renderer.gl;
    _this.camera = props.camera; // pass manager - for now

    _this.passList = [];
    return _this;
  }
  /**
   * 增加子对象
   * @param {*} mesh
   */

  _createClass(Scene, [
    {
      key: 'add',
      value: function add(mesh) {
        mesh.init(this.gl, this.camera); // TODO: 判断当前对象的子节点中不存在 mesh

        if (!this.hasChildren(mesh)) {
          mesh.parent && mesh.parent.remove(mesh);
          mesh.setParent(this);
          this.children.push(mesh); // 复写 add 方法

          mesh.scene = this;
        }
      },
    },
    {
      key: 'setCamera',
      value: function setCamera(camera) {
        this.camera = camera;
      },
    },
    {
      key: 'setRenderer',
      value: function setRenderer() {},
      /**
       * 增加后处理 pass
       * @param {*} pass
       */
    },
    {
      key: 'addPass',
      value: function addPass(pass) {
        pass.init(this.gl);
        this.passList.push(pass);
      },
      /**
       * 绘制场景中所有的对象
       */
    },
    {
      key: 'drawElements',
      value: function drawElements() {
        var _this2 = this;

        // 绘制透明物体 - 简单的透明绘制排序
        var unTransparentMeshes = []; // 不透明 mesh

        var transparentMeshes = []; // 透明 mesh

        this.children.forEach(function(mesh) {
          var _mesh$material;

          mesh.cameraDistance = distance(mesh.position, _this2.camera.position);

          if (
            mesh === null || mesh === void 0
              ? void 0
              : (_mesh$material = mesh.material) === null ||
                _mesh$material === void 0
              ? void 0
              : _mesh$material.transparent
          ) {
            transparentMeshes.push(mesh);
          } else {
            unTransparentMeshes.push(mesh);
          }
        });
        unTransparentMeshes.sort(function(a, b) {
          return a.cameraDistance - b.cameraDistance;
        });
        unTransparentMeshes.map(function(mesh) {
          return mesh.draw(_this2.camera);
        });
        this.gl.depthMask(false);
        transparentMeshes.map(function(mesh) {
          return mesh.draw(_this2.camera);
        });
        this.gl.depthMask(true);
      },
    },
    {
      key: 'renderScene',
      value: function renderScene() {
        if (this.passList.length > 0) {
          for (var i = 0; i < this.passList.length; i++) {
            var pass = this.passList[i];
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, pass.framebuffer);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            if (i === 0) {
              // 将场景内容绘制到 pass framebuffer
              this.drawElements();
            } else {
              // 将场景内容会到链接的 pass framebuffer
              // Tip: 还未完善
            } // 将 pass 中的结果绘制到 default framebuffer

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            pass.drawPass();
          }
        } else {
          this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
          this.drawElements();
        }
      },
    },
  ]);

  return Scene;
})(Group);

export { Scene as default };
