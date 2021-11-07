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

var glUtils = _interopRequireWildcard(require('../../utils/gl'));

var _group = _interopRequireDefault(require('../group'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var Cube = /*#__PURE__*/ (function(_Group) {
  _inherits(Cube, _Group);

  var _super = _createSuper(Cube);

  function Cube(props) {
    var _this;

    _classCallCheck(this, Cube);

    _this = _super.call(this, props);
    _this.type = 'CubeMesh';
    _this.camera = props === null || props === void 0 ? void 0 : props.camera;
    _this.material =
      props === null || props === void 0 ? void 0 : props.material;
    _this.width = 1;
    _this.height = 0.5; // 当前对象的 shader 变量参数列表

    _this.shaderUnifroms = [];

    _this.init();

    return _this;
  }

  _createClass(Cube, [
    {
      key: 'init',
      value: function init() {
        this.program = glUtils.createProgram(
          this.gl,
          this.getRectVSHADER(),
          this.getRectFSHADER(),
        );
        this.gl.useProgram(this.program);
        var rectVertices = new Float32Array([
          // 将纹理 st/uv 映射到顶点坐标
          -this.width / 2,
          this.height / 2,
          -this.width / 2,
          -this.height / 2,
          this.width / 2,
          this.height / 2,
          this.width / 2,
          -this.height / 2, //右下角
        ]);
        var rectUvs = new Float32Array([
          // rect uvs
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          1.0,
          1.0,
          0.0,
        ]);
        var FSIZE = rectVertices.BYTES_PER_ELEMENT;
        this.setMatrixs();

        var _glUtils$bindAttriBuf = glUtils.bindAttriBuffer(
            this.gl,
            'a_Position',
            rectVertices,
            2,
            this.program,
          ),
          a_PositionLocation = _glUtils$bindAttriBuf.attr;

        var _glUtils$bindAttriBuf2 = glUtils.bindAttriBuffer(
            this.gl,
            'a_TextCoord',
            rectUvs,
            2,
            this.program,
          ),
          a_TextCoordLocation = _glUtils$bindAttriBuf2.attr;

        this.draw();
      },
      /**
       * 设置当前网格的矩阵、同时将矩阵传递给着色器
       */
    },
    {
      key: 'setMatrixs',
      value: function setMatrixs() {
        this.projMatrix = this.camera.getPerspectiveMatrix();
        var u_projMatrixLocaion = glUtils.bindUnifrom(
          this.gl,
          'u_projMatrix',
          this.projMatrix,
          this.program,
          'mat4',
        );
        this.viewMatrix = this.camera.getViewMatrix();
        var u_viewMatrixLocation = glUtils.bindUnifrom(
          this.gl,
          'u_viewMatrix',
          this.viewMatrix,
          this.program,
          'mat4',
        );
        var u_modelMatrixLocation = glUtils.bindUnifrom(
          this.gl,
          'u_modelMatrix',
          this.modelMatrix,
          this.program,
          'mat4',
        );
      },
      /**
       * 更新 shader 的 uniform 变量的值
       */
    },
    {
      key: 'updateShaderUnifroms',
      value: function updateShaderUnifroms() {
        // this.shaderUnifroms.map(({ location, currentDataLocation, vec }) => {
        //   glUtils.setUnifrom(this.gl, location, currentDataLocation, vec);
        // });
        // TODO: 每次渲染的时候重新为纹理分配纹理空间
        if (this.texture) {
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
          var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
          this.gl.uniform1i(u_Sampler, 0);
        }
      },
      /**
       * 存储当前网格对象的 unifrom 变量
       * @param {*} location
       * @param {*} type
       * @param {*} currentDataLocation
       */
    },
    {
      key: 'addShaderUnifroms',
      value: function addShaderUnifroms(
        location,
        type,
        currentDataLocation,
        vec,
      ) {
        this.shaderUnifroms.push({
          location: location,
          type: type,
          currentDataLocation: currentDataLocation,
          vec: vec,
        });
      },
      /**
       * 绘制当前的网格对象
       */
    },
    {
      key: 'draw',
      value: function draw() {
        this.gl.useProgram(this.program);
        this.updateShaderUnifroms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      },
      /**
       * 返回顶点着色器代码
       * @returns
       */
    },
    {
      key: 'getRectVSHADER',
      value: function getRectVSHADER() {
        return '\n            uniform mat4 u_projMatrix;\n            uniform mat4 u_viewMatrix;\n            uniform mat4 u_modelMatrix;\n\n            attribute vec4 a_Position;\n            attribute vec2 a_TextCoord;\n            varying vec2 v_uv;\n            void main(){\n                v_uv = a_TextCoord;\n\n                gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;\n           \n            }\n        ';
      },
      /**
       * 返回片元着色器代码
       * @returns
       */
    },
    {
      key: 'getRectFSHADER',
      value: function getRectFSHADER() {
        var _this$material,
          _this2 = this;

        var firstLine = 'precision mediump float;\n';
        var gl_FragColorLine = 'gl_FragColor = vec4(v_uv, 1.0, 1.0);\n';
        var unifromLines = [];

        if (
          this === null || this === void 0
            ? void 0
            : (_this$material = this.material) === null ||
              _this$material === void 0
            ? void 0
            : _this$material.map
        ) {
          var _this$material2;

          (_this$material2 = this.material) === null ||
          _this$material2 === void 0
            ? void 0
            : _this$material2.on('loadImage', function(_ref) {
                var texture = _ref.texture,
                  img = _ref.img;

                _this2.gl.useProgram(_this2.program); // TODO: cache texture

                _this2.texture = texture;

                _this2.gl.activeTexture(_this2.gl.TEXTURE0); // 激活0号纹理单元

                _this2.material.texture &&
                  _this2.gl.bindTexture(_this2.gl.TEXTURE_2D, texture); // 绑定纹理单元

                var u_Sampler = _this2.gl.getUniformLocation(
                  _this2.program,
                  'u_Sampler',
                );

                _this2.gl.uniform1i(u_Sampler, 0);

                _this2.draw();
              });
          gl_FragColorLine = 'gl_FragColor = texture2D(u_Sampler, v_uv);\n';
        }

        var shader =
          firstLine +
          unifromLines.join('') +
          '\n            uniform sampler2D u_Sampler;\n            varying vec2 v_uv;\n            void main(){\n                ' +
          gl_FragColorLine +
          '\n            }\n        ';
        return shader;
      },
    },
  ]);

  return Cube;
})(_group.default);

exports.default = Cube;
