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

var _Color = _interopRequireDefault(require('../object/Color'));

var _BasicMaterial = _interopRequireDefault(
  require('../material/BasicMaterial'),
);

var _math = require('../../utils/math');

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

var Plane = /*#__PURE__*/ (function(_Group) {
  _inherits(Plane, _Group);

  var _super = _createSuper(Plane);

  function Plane(props) {
    var _this;

    _classCallCheck(this, Plane);

    _this = _super.call(this, props);
    _this.type = 'PlaneMesh';
    _this.scene = void 0;
    _this.camera = void 0;
    _this.color = void 0;
    _this.material = new _BasicMaterial.default({});
    _this.width = 1;
    _this.height = 1;
    _this.imgLoading = false;
    _this.shaderUnifroms = void 0;
    _this.shaderAttributes = void 0;
    _this.program = void 0;
    _this.texture = void 0;
    props.material !== undefined && (_this.material = props.material);
    props.width !== undefined && (_this.width = props.width);
    props.height !== undefined && (_this.height = props.height); // 当前对象的 shader 变量参数列表

    _this.shaderUnifroms = [];
    _this.shaderAttributes = [];
    return _this;
  }

  _createClass(Plane, [
    {
      key: 'init',
      value: function init(gl, camera) {
        var _this$material;

        this.gl = gl;
        this.camera = camera;
        this.cameraDistance = (0, _math.distance)(
          camera.position,
          this.position,
        );
        this.material.init(this.gl);
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
        this.color = new _Color.default(
          this === null || this === void 0
            ? void 0
            : (_this$material = this.material) === null ||
              _this$material === void 0
            ? void 0
            : _this$material.color,
        );
        this.setUnifroms();
        this.shaderAttributes.push(
          glUtils.bindAttriBuffer(
            this.gl,
            'a_Position',
            rectVertices,
            2,
            this.program,
          ),
        );
        this.shaderAttributes.push(
          glUtils.bindAttriBuffer(
            this.gl,
            'a_TextCoord',
            rectUvs,
            2,
            this.program,
          ),
        );
        this.gl.useProgram(null);
      },
      /**
       * @param camera
       */
    },
    {
      key: 'setCamera',
      value: function setCamera(camera) {
        this.camera = camera;
      },
      /**
       * 设置当前着色器的 uniform 变量
       */
    },
    {
      key: 'setUnifroms',
      value: function setUnifroms() {
        var _this$material2, _this$material3;

        this.projMatrix = this.camera.getPerspectiveMatrix();
        glUtils.bindUnifrom(
          this.gl,
          'u_projMatrix',
          this.projMatrix,
          this.program,
          'mat4',
        );
        this.viewMatrix = this.camera.getViewMatrix();
        glUtils.bindUnifrom(
          this.gl,
          'u_viewMatrix',
          this.viewMatrix,
          this.program,
          'mat4',
        );
        glUtils.bindUnifrom(
          this.gl,
          'u_modelMatrix',
          this.modelMatrix,
          this.program,
          'mat4',
        );
        glUtils.bindUnifrom(
          this.gl,
          'u_opacity',
          (this === null || this === void 0
            ? void 0
            : (_this$material2 = this.material) === null ||
              _this$material2 === void 0
            ? void 0
            : _this$material2.opacity) !== undefined
            ? this === null || this === void 0
              ? void 0
              : (_this$material3 = this.material) === null ||
                _this$material3 === void 0
              ? void 0
              : _this$material3.opacity
            : 1.0,
          this.program,
          'float',
        );
        glUtils.bindUnifrom(
          this.gl,
          'u_color',
          this.color.getRGB(),
          this.program,
          'vec3',
        ); // uniformName, data, vec
      },
      /**
       * 更新 shader 的 attribute/uniform 变量的值
       */
    },
    {
      key: 'updateAttributeUnifroms',
      value: function updateAttributeUnifroms() {
        var _this2 = this;

        // reBindBuffer
        this.shaderAttributes.map(function(_ref) {
          var buffer = _ref.buffer,
            attr = _ref.attr,
            count = _ref.count;

          _this2.gl.bindBuffer(_this2.gl.ARRAY_BUFFER, buffer); // 将缓冲区对象绑定到目标

          _this2.gl.vertexAttribPointer(
            attr,
            count,
            _this2.gl.FLOAT,
            false,
            0,
            0,
          );

          _this2.gl.bindBuffer(_this2.gl.ARRAY_BUFFER, null);
        }); // reBindUnifrom

        this.setUnifroms(); // TODO: 每次渲染的时候重新为纹理分配纹理空间

        if (this.texture) {
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
          var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
          this.gl.uniform1i(u_Sampler, 0);
        }
      },
      /**
       * 存储当前网格对象的 unifrom 变量
       */
    },
    {
      key: 'addShaderUnifroms',
      value: function addShaderUnifroms(uniformName, data, vec) {
        this.shaderUnifroms.push({
          uniformName: uniformName,
          data: data,
          vec: vec,
        });
      },
      /**
       * 绘制当前的网格对象
       */
    },
    {
      key: 'draw',
      value: function draw(camera) {
        // TODO: 在纹理加载过程中或相机不存在时不渲染
        if (this.imgLoading || !camera) return; // TODO:  切换程序对象

        this.gl.useProgram(this.program); // TODO: reset camera

        this.setCamera(camera); // update unifrom

        this.updateAttributeUnifroms();
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
        var _this$material4,
          _this3 = this;

        var firstLine = 'precision mediump float;\n';
        var gl_FragColorLine = 'gl_FragColor = vec4(u_color, u_opacity);\n';
        var unifromLines = [
          'uniform float u_opacity;\n',
          'uniform vec3 u_color;',
        ];

        if (
          this === null || this === void 0
            ? void 0
            : (_this$material4 = this.material) === null ||
              _this$material4 === void 0
            ? void 0
            : _this$material4.map
        ) {
          var _this$material5;

          this.imgLoading = true;
          unifromLines.push('uniform sampler2D u_Sampler;\n'); // @ts-ignore

          (_this$material5 = this.material) === null ||
          _this$material5 === void 0
            ? void 0
            : _this$material5.on('loadImage', function(_ref2) {
                var texture = _ref2.texture,
                  img = _ref2.img;

                _this3.gl.useProgram(_this3.program); // TODO: cache texture

                _this3.texture = texture;

                _this3.gl.activeTexture(_this3.gl.TEXTURE0); // 激活0号纹理单元

                _this3.material.texture &&
                  _this3.gl.bindTexture(_this3.gl.TEXTURE_2D, texture); // 绑定纹理单元

                var u_Sampler = _this3.gl.getUniformLocation(
                  _this3.program,
                  'u_Sampler',
                );

                _this3.gl.uniform1i(u_Sampler, 0);

                _this3.imgLoading = false;
                _this3.scene && _this3.scene.renderScene();
              });
          gl_FragColorLine = 'gl_FragColor = texture2D(u_Sampler, v_uv);\n';
        } // TODO: 拼装 shader

        var shader =
          firstLine +
          unifromLines.join('') +
          '\n      varying vec2 v_uv;\n      void main(){\n        '.concat(
            gl_FragColorLine,
            '\n        gl_FragColor.a *= u_opacity;\n      }\n      ',
          );
        return shader;
      },
    },
  ]);

  return Plane;
})(_group.default);

exports.default = Plane;
