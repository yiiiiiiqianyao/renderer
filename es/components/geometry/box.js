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

// @ts-nocheck
import * as glUtils from '../../utils/gl';
import Group from '../group';
import { distance } from '../../utils/math';

var Box = /*#__PURE__*/ (function(_Group) {
  _inherits(Box, _Group);

  var _super = _createSuper(Box);

  function Box(props) {
    var _this;

    _classCallCheck(this, Box);

    _this = _super.call(this, props);
    _this.type = 'CubeMesh';
    _this.shaderAttributes = void 0;
    _this.indices = void 0;
    _this.indicesBuffer = void 0;
    props.material !== undefined && (_this.material = props.material);
    _this.width = 1;
    _this.height = 0.5; // 当前对象的 shader 变量参数列表

    _this.shaderUnifroms = [];
    _this.shaderAttributes = [];
    return _this;
  }

  _createClass(Box, [
    {
      key: 'init',
      value: function init(gl, camera) {
        var _this$material;

        this.gl = gl;
        this.camera = camera;
        this.cameraDistance = distance(camera.position, this.position);
        (_this$material = this.material) === null || _this$material === void 0
          ? void 0
          : _this$material.init(this.gl);
        this.program = glUtils.createProgram(
          this.gl,
          this.getCubeVSHADER(),
          this.getCubeFSHADER(),
        );
        this.gl.useProgram(this.program); // 创建一个立方体
        //    v6----- v5
        //   /|      /|
        //  v1------v0|
        //  | |     | |
        //  | |v7---|-|v4
        //  |/      |/
        //  v2------v3

        var cubeVertices = new Float32Array([
          1.0,
          1.0,
          1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          -1.0,
          1.0,
          -1.0,
          -1.0,
          -1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          -1.0,
          -1.0,
          1.0,
          -1.0,
          -1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          -1.0,
          1.0,
          -1.0,
          1.0,
          -1.0,
          -1.0,
          1.0,
          -1.0,
          -1.0,
          -1.0,
          1.0,
          -1.0,
          -1.0,
          -1.0,
          1.0,
          1.0,
          -1.0,
          1.0,
          -1.0,
          -1.0,
          -1.0,
          -1.0,
          -1.0,
          -1.0,
          1.0, // v2
        ]);
        var cubeColors = new Float32Array([
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0, // v2
        ]); // let FSIZE = cubeVertices.BYTES_PER_ELEMENT;

        this.indices = new Uint8Array([
          0,
          1,
          2,
          0,
          2,
          3,
          6,
          5,
          4,
          6,
          4,
          7,
          8,
          9,
          10,
          8,
          10,
          11,
          12,
          13,
          14,
          12,
          14,
          15,
          16,
          17,
          18,
          16,
          18,
          19,
          20,
          21,
          22,
          20,
          22,
          23,
        ]);
        this.setUnifroms();
        this.shaderAttributes.push(
          glUtils.bindAttriBuffer(
            this.gl,
            'a_Position',
            cubeVertices,
            3,
            this.program,
          ),
        );
        this.shaderAttributes.push(
          glUtils.bindAttriBuffer(
            this.gl,
            'a_Color',
            cubeColors,
            3,
            this.program,
          ),
        );
        this.indicesBuffer = glUtils.bindAttriIndicesBuffer(
          this.gl,
          this.indices,
        );
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
       * 更新 shader 的 attribute/uniform 变量的值
       */
    },
    {
      key: 'updateAttributeUnifroms',
      value: function updateAttributeUnifroms() {
        var _this2 = this;

        //  reBindIndices
        if (this.indices && this.indicesBuffer) {
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            this.indices,
            this.gl.STATIC_DRAW,
          );
        } // reBindBuffer

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
      value:
        /**
         * 存储当前网格对象的 unifrom 变量
         * @param {*} location
         * @param {*} type
         * @param {*} currentDataLocation
         */
        function addShaderUnifroms(location, type, currentDataLocation, vec) {
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
      value: function draw(camera) {
        // TODO:  切换程序对象
        this.gl.useProgram(this.program); // TODO: reset camera

        this.setCamera(camera); // update unifrom

        this.updateAttributeUnifroms(); // this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        this.gl.drawElements(
          this.gl.TRIANGLES,
          this.indices.length,
          this.gl.UNSIGNED_BYTE,
          0,
        );
      },
      /**
       * 返回顶点着色器代码
       * @returns
       */
    },
    {
      key: 'getCubeVSHADER',
      value: function getCubeVSHADER() {
        return '\n            uniform mat4 u_projMatrix;\n            uniform mat4 u_viewMatrix;\n            uniform mat4 u_modelMatrix;\n\n            attribute vec4 a_Position;\n            attribute vec4 a_Color;\n\n            varying vec4 v_Color;\n            void main(){\n                v_Color = a_Color;\n\n                gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;\n           \n            }\n        ';
      },
      /**
       * 返回片元着色器代码
       * @returns
       */
    },
    {
      key: 'getCubeFSHADER',
      value: function getCubeFSHADER() {
        return '\n            #ifdef GL_ES\n            precision mediump float;\n            #endif\n            varying vec4 v_Color;\n            void main(){\n                gl_FragColor = v_Color;\n                // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n            }\n        ';
      },
    },
  ]);

  return Box;
})(Group);

export { Box as default };
