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
exports.default = void 0;

var _texture = require('../../utils/texture');

var _Color = _interopRequireDefault(require('../object/Color'));

var _Material2 = _interopRequireDefault(require('../object/Material'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
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

var BasicMaterial = /*#__PURE__*/ (function(_Material) {
  _inherits(BasicMaterial, _Material);

  var _super = _createSuper(BasicMaterial);

  function BasicMaterial(props) {
    var _this;

    _classCallCheck(this, BasicMaterial);

    _this = _super.call(this);
    _this.color = void 0;
    _this.opacity = 1.0;
    _this.transparent = false;
    _this.map = void 0;
    _this.image = void 0;
    _this.texture = void 0;
    _this.color = new _Color.default(props.color);
    props.opacity !== undefined && (_this.opacity = props.opacity);
    props.transparent !== undefined && (_this.transparent = props.transparent);
    _this.map =
      (props === null || props === void 0 ? void 0 : props.map) || undefined;
    return _this;
  }

  _createClass(BasicMaterial, [
    {
      key: 'init',
      value: (function() {
        var _init = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee(gl) {
            var _yield$loadImage, succeed, img;

            return regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      this.gl = gl;

                      if (!this.map) {
                        _context.next = 8;
                        break;
                      }

                      _context.next = 4;
                      return (0, _texture.loadImage)(this.map);

                    case 4:
                      _yield$loadImage = _context.sent;
                      succeed = _yield$loadImage.succeed;
                      img = _yield$loadImage.img;

                      if (succeed) {
                        this.image = img;
                        this.initTexture();
                      }

                    case 8:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
            );
          }),
        );

        function init(_x) {
          return _init.apply(this, arguments);
        }

        return init;
      })(),
    },
    {
      key: 'initTexture',
      value: function initTexture() {
        this.texture = this.gl.createTexture();
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1); // 对纹理图像进行 Y 轴反转 - 点精灵不需要翻转

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          this.gl.LINEAR,
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          this.gl.REPEAT,
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          this.gl.CLAMP_TO_EDGE,
        );
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.RGBA,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          this.image,
        );
        this.emit('loadImage', {
          texture: this.texture,
          img: this.image,
        });
      },
    },
    {
      key: 'destroy',
      value: function destroy() {},
    },
  ]);

  return BasicMaterial;
})(_Material2.default);

exports.default = BasicMaterial;
