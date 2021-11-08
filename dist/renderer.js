(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.renderer = {})));
})(this, function(exports) {
  'use strict';

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
          asyncGeneratorStep(
            gen,
            resolve,
            reject,
            _next,
            _throw,
            'next',
            value,
          );
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
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === 'object' || typeof call === 'function')) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError(
        'Derived constructors may only return object or undefined',
      );
    }

    return _assertThisInitialized(self);
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

  function _toConsumableArray(arr) {
    return (
      _arrayWithoutHoles(arr) ||
      _iterableToArray(arr) ||
      _unsupportedIterableToArray(arr) ||
      _nonIterableSpread()
    );
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (
      (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
      iter['@@iterator'] != null
    )
      return Array.from(iter);
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot)
    Math.hypot = function() {
      var y = 0,
        i = arguments.length;

      while (i--) {
        y += arguments[i] * arguments[i];
      }

      return Math.sqrt(y);
    };

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function multiply(out, a, b) {
    var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {mat4} out
   */

  function translate(out, a, v) {
    var x = v[0],
      y = v[1],
      z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */

  function rotate(out, a, rad, axis) {
    var x = axis[0],
      y = axis[1],
      z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication

    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication

    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication

    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspectiveNO(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
      nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Alias for {@link mat4.perspectiveNO}
   * @function
   */

  var perspective = perspectiveNO;
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (
      Math.abs(eyex - centerx) < EPSILON &&
      Math.abs(eyey - centery) < EPSILON &&
      Math.abs(eyez - centerz) < EPSILON
    ) {
      return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$1() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = (function() {
    var vec = create$1();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  })();

  var generateUUID = (function() {
    var lut = [];

    for (var i = 0; i < 256; i++) {
      lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }

    return function generateUUID() {
      var d0 = (Math.random() * 0xffffffff) | 0;
      var d1 = (Math.random() * 0xffffffff) | 0;
      var d2 = (Math.random() * 0xffffffff) | 0;
      var d3 = (Math.random() * 0xffffffff) | 0;
      var uuid =
        lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] +
        '-' +
        lut[d1 & 0xff] +
        lut[(d1 >> 8) & 0xff] +
        '-' +
        lut[((d1 >> 16) & 0x0f) | 0x40] +
        lut[(d1 >> 24) & 0xff] +
        '-' +
        lut[(d2 & 0x3f) | 0x80] +
        lut[(d2 >> 8) & 0xff] +
        '-' +
        lut[(d2 >> 16) & 0xff] +
        lut[(d2 >> 24) & 0xff] +
        lut[d3 & 0xff] +
        lut[(d3 >> 8) & 0xff] +
        lut[(d3 >> 16) & 0xff] +
        lut[(d3 >> 24) & 0xff]; // .toUpperCase() here flattens concatenated strings to save heap memory space.

      return uuid.toUpperCase();
    };
  })();
  function isPowerOfTwo(value) {
    return (value & (value - 1)) === 0 && value !== 0;
  }
  function floorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  }
  function distance(point1, point2) {
    var r1 = Math.pow(point1[0] - point2[0], 2);
    var r2 = Math.pow(point1[1] - point2[1], 2);
    var r3 = Math.pow(point1[2] - point2[2], 2);
    return Math.sqrt(r1 + r2 + r3);
  }

  var Group = /*#__PURE__*/ (function() {
    function Group(props) {
      _classCallCheck(this, Group);

      this.uuid = void 0;
      this.gl = void 0;
      this.projMatrix = void 0;
      this.viewMatrix = void 0;
      this.modelMatrix = void 0;
      this.program = void 0;
      this.position = void 0;
      this.cameraDistance = void 0;
      this.uuid = generateUUID();
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
          this.translateMatrix = create();
          translate(this.translateMatrix, this.translateMatrix, position);

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

          this.rotateMatrix = create();
          rotate(
            this.rotateMatrix,
            this.rotateMatrix,
            this.rotation[0],
            fromValues(1, 0, 0),
          );
          rotate(
            this.rotateMatrix,
            this.rotateMatrix,
            this.rotation[1],
            fromValues(0, 1, 0),
          );
          rotate(
            this.rotateMatrix,
            this.rotateMatrix,
            this.rotation[2],
            fromValues(0, 0, 1),
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
          this.scaleMatrix = create();
        },
        /**
         * 初始化模型矩阵
         * @returns
         */
      },
      {
        key: 'initModelMatrix',
        value: function initModelMatrix() {
          return multiply(
            create(),
            this.scaleMatrix,
            multiply(create(), this.translateMatrix, this.rotateMatrix),
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

          multiply(
            this.modelMatrix,
            this.scaleMatrix,
            multiply(create(), this.translateMatrix, this.rotateMatrix),
          );
          var parentMatrix =
            (this === null || this === void 0
              ? void 0
              : (_this$parent = this.parent) === null || _this$parent === void 0
              ? void 0
              : _this$parent.modelMatrix) || create();
          multiply(this.modelMatrix, parentMatrix, this.modelMatrix); // 更新子节点的矩阵

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

          rotateX(this.rotateMatrix, this.rotateMatrix, rotateValues[0]);
          rotateY(this.rotateMatrix, this.rotateMatrix, rotateValues[1]);
          rotateZ(this.rotateMatrix, this.rotateMatrix, rotateValues[2]); // 更新模型矩阵

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

            mesh.cameraDistance = distance(
              mesh.position,
              _this2.camera.position,
            );

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
              this.gl.clear(
                this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT,
              );

              if (i === 0) {
                // 将场景内容绘制到 pass framebuffer
                this.drawElements();
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

  /**
   * 视图
   */

  var ViewPort = /*#__PURE__*/ (function() {
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
      this.viewMatrix = create();
      this.initViewMatrix();
    }

    _createClass(ViewPort, [
      {
        key: 'initViewMatrix',
        value: function initViewMatrix() {
          lookAt(this.viewMatrix, this.eye, this.target, this.up);
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

  var Camera = /*#__PURE__*/ (function() {
    function Camera(props) {
      _classCallCheck(this, Camera);

      this.position = void 0;
      this.aspect = void 0;
      this.fov =
        (props === null || props === void 0 ? void 0 : props.fov) || 40;
      this.aspect =
        (props === null || props === void 0 ? void 0 : props.aspect) || 1; // this.aspect =  1;

      this.near =
        (props === null || props === void 0 ? void 0 : props.near) || 0.01;
      this.far =
        (props === null || props === void 0 ? void 0 : props.far) || 100;
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
          this.perspectiveMatrix = create();
          perspective(
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

  var Color = /*#__PURE__*/ (function() {
    function Color(props) {
      _classCallCheck(this, Color);

      this.type = 'Color';
      this.r = 1;
      this.g = 1;
      this.b = 1;
      this.a = 1;

      if (typeof props === 'string') {
        this.handleStringColor(props);
      } else if (props instanceof Array) {
        this.r = props[0];
        this.g = props[1];
        this.b = props[2];
        this.a = props[3];
      } else if (Color.isColor(props)) {
        this.r = props.r;
        this.g = props.g;
        this.b = props.b;
        this.a = props.a;
      }
    }

    _createClass(Color, [
      {
        key: 'handleStringColor',
        value: function handleStringColor(str) {
          if (str.startsWith('#')) {
            this.handle16Color(str);
          } else {
            switch (str) {
              case 'red':
                this.r = 1;
                this.g = 0;
                this.b = 0;
                this.a = 1;
                break;

              case 'yellow':
                this.r = 1;
                this.g = 1;
                this.b = 0;
                this.a = 1;
                break;

              case 'blue':
                this.r = 0;
                this.g = 0;
                this.b = 1;
                this.a = 1;
                break;

              case 'green':
                this.r = 0;
                this.g = 1;
                this.b = 0;
                this.a = 1;
                break;

              case 'white':
                this.r = 1;
                this.g = 1;
                this.b = 1;
                this.a = 1;
                break;

              case 'black':
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 1;
                break;
            }
          }
        },
      },
      {
        key: 'handle16Color',
        value: function handle16Color() {
          this.r = 1;
          this.g = 1;
          this.b = 1;
          this.a = 1;
        },
      },
      {
        key: 'getRGBA',
        value: function getRGBA() {
          return [this.r, this.g, this.b, this.a];
        },
      },
      {
        key: 'getRGB',
        value: function getRGB() {
          return [this.r, this.g, this.b];
        },
      },
    ]);

    return Color;
  })();

  Color.isColor = function(object) {
    if (object && object.type && object.type === 'Color') {
      return true;
    } else {
      return false;
    }
  };

  var getCanvas = function getCanvas(width, height) {
    var canvas = document.createElement('canvas');
    setCanvas(canvas, width, height);
    return canvas;
  };
  var setCanvas = function setCanvas(canvas, width, height) {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  };

  var Renderer = /*#__PURE__*/ (function() {
    function Renderer(props) {
      _classCallCheck(this, Renderer);

      this.gl = void 0;
      this.wrap = void 0;
      this.clearColor = void 0;
      this.canvas = void 0;
      this.renderPixelWidth = void 0;
      this.renderPixelHeight = void 0;
      this.clearColor = new Color(props.clearColor);
      this.initRenderContext(props.wrap);
      this.renderPixelSize();
    }

    _createClass(Renderer, [
      {
        key: 'initRenderContext',
        value: function initRenderContext(wrap) {
          if (typeof wrap === 'string') {
            this.wrap = document.getElementById('wrap');
            var _this$wrap = this.wrap,
              clientWidth = _this$wrap.clientWidth,
              clientHeight = _this$wrap.clientHeight;
            this.canvas = getCanvas(clientWidth, clientHeight);
          } else if (wrap instanceof HTMLCanvasElement) {
            this.wrap = wrap.parentNode;
            this.canvas = wrap;
          } else {
            this.wrap = wrap;
            var _this$wrap2 = this.wrap,
              _clientWidth = _this$wrap2.clientWidth,
              _clientHeight = _this$wrap2.clientHeight;
            this.canvas = getCanvas(_clientWidth, _clientHeight);
          }

          this.wrap.appendChild(this.canvas);
          this.gl = this.canvas.getContext('webgl');
          this.initGLParams(this.gl);
        },
      },
      {
        key: 'initGLParams',
        value: function initGLParams(gl) {
          var c = this.clearColor.getRGBA();
          gl.clearColor(c[0], c[1], c[2], c[3]);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.enable(gl.DEPTH_TEST); // 开启深度检测

          gl.clear(gl.DEPTH_BUFFER_BIT); // 清除深度缓存

          gl.enable(gl.BLEND); // 开启混合

          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // 指定混合函数

          gl.enable(gl.CULL_FACE); // 开启背面剔除

          gl.disable(gl.CULL_FACE); // 关闭背面剔除
        },
      },
      {
        key: 'renderPixelSize',
        value: function renderPixelSize() {
          var _this$canvas = this.canvas,
            clientWidth = _this$canvas.clientWidth,
            clientHeight = _this$canvas.clientHeight;
          this.renderPixelWidth = clientWidth;
          this.renderPixelHeight = clientHeight;
        },
      },
      {
        key: 'resize',
        value: function resize() {
          var _this$wrap3 = this.wrap,
            clientWidth = _this$wrap3.clientWidth,
            clientHeight = _this$wrap3.clientHeight;
          setCanvas(this.canvas, clientWidth, clientHeight);
          this.renderPixelSize();
          this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        },
      },
    ]);

    return Renderer;
  })();

  // @ts-nocheck
  var useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';
  function isPowerOfTwo$1(image) {
    return isPowerOfTwo(image.width) && isPowerOfTwo(image.height);
  }
  function createCanvas(width, height) {
    // Use OffscreenCanvas when available. Specially needed in web workers
    return useOffscreenCanvas
      ? new OffscreenCanvas(width, height)
      : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
  }
  function resizeImage(image) {
    var width = floorPowerOfTwo(image.width);

    var height = floorPowerOfTwo(image.height);

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
        if (!isPowerOfTwo$1(img)) {
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

  var Material = /*#__PURE__*/ (function() {
    function Material() {
      _classCallCheck(this, Material);

      this.listeners = void 0;
      this.gl = void 0;
      this.program = void 0;
      this.listeners = {};
    }

    _createClass(Material, [
      {
        key: 'on',
        value: function on(name, fn) {
          if (!this.listeners[name]) {
            this.listeners[name] = [];
          }

          this.listeners[name].push(fn);
        },
      },
      {
        key: 'emit',
        value: function emit(name, val) {
          if (this.listeners[name]) {
            this.listeners[name].map(function(fn) {
              fn(val);
            });
          }
        },
      },
      {
        key: 'off',
        value: function off(name, fn) {
          if (this.listeners[name]) {
            if (fn) {
              var index = this.listeners[name].indexOf(fn);

              if (index > -1) {
                this.listeners[name].splice(index, 1);
              }
            } else {
              this.listeners[name].length = 0; //设长度为0比obj[name] = []更优，因为如果是空数组则又开辟了一个新空间，设长度为0则不必开辟新空间
            }
          }
        },
      },
    ]);

    return Material;
  })();

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
      _this.color = new Color(props.color);
      props.opacity !== undefined && (_this.opacity = props.opacity);
      props.transparent !== undefined &&
        (_this.transparent = props.transparent);
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
                        return loadImage(this.map);

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
  })(Material);

  // @ts-nocheck
  function createProgram(gl, vshader, fshader) {
    // Create shader object
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader); // 创建顶点着色器对象

    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader); // 创建片元着色器对象

    if (!vertexShader || !fragmentShader) {
      return null;
    } // Create a program object

    var program = gl.createProgram(); // 创建程序对象

    if (!program) {
      return null;
    } // Attach the shader objects

    gl.attachShader(program, vertexShader); // 绑定着色器对象

    gl.attachShader(program, fragmentShader); // Link the program object

    gl.linkProgram(program); // 链接着色器对象
    // Check the result of linking

    var linked = gl.getProgramParameter(program, gl.LINK_STATUS); // 判断着色器对象是否链接成功

    if (!linked) {
      var error = gl.getProgramInfoLog(program);
      console.log('Failed to link program: ' + error);
      gl.deleteProgram(program);
      gl.deleteShader(fragmentShader);
      gl.deleteShader(vertexShader);
      return null;
    }

    return program;
  }
  function loadShader(gl, type, source) {
    // Create shader object
    var shader = gl.createShader(type); // 生成着色器对象

    if (shader == null) {
      console.log('unable to create shader');
      return null;
    } // Set the shader program

    gl.shaderSource(shader, source); // 载入着色器
    // Compile the shader

    gl.compileShader(shader); // 编译着色器代码
    // Check the result of compilation

    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // 判断着色器对象是否生成成功
    // gl.SHADER_TYPE、gl.DELETE_STATUS、gl.COMPILE_STATUS

    if (!compiled) {
      var error = gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
  function bindAttriBuffer(gl, attrName, vertices, count, program) {
    var buffer = gl.createBuffer();

    if (!buffer) {
      console.log('failed create vertex buffer');
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 将缓冲区对象绑定到目标

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 向缓冲区对象中写入数据

    var attr = gl.getAttribLocation(program, attrName);
    gl.vertexAttribPointer(attr, count, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attr);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return {
      buffer: buffer,
      attr: attr,
      count: count,
    };
  }
  function bindAttriIndicesBuffer(gl, indices) {
    var buffer = gl.createBuffer();

    if (!buffer) {
      console.log('failed create vertex buffer');
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return buffer;
  }
  function bindUnifrom(gl, unifromName, data, program, vec) {
    var uniform = gl.getUniformLocation(program, unifromName);

    if (uniform < 0) {
      console.log('无法获取 uniform 变量的存储位置');
    }

    setUnifrom(gl, uniform, data, vec);
    return uniform;
  }
  function setUnifrom(gl, location, data, vec) {
    switch (vec) {
      case 'float':
        gl.uniform1f(location, data);
        break;

      case 'vec2':
        gl.uniform2fv(location, data);
        break;

      case 'vec3':
        gl.uniform3fv(location, data);
        break;

      case 'vec4':
        gl.uniform4fv(location, data);
        break;

      case 'bool':
        gl.uniform1i(location, data); // 1 - true    0 - false

        break;

      case 'sampler2d':
        break;

      case 'mat4':
        gl.uniformMatrix4fv(location, false, data);
        break;
    }
  }
  function initFramebuffer(gl) {
    var drawingBufferWidth = gl.drawingBufferWidth,
      drawingBufferHeight = gl.drawingBufferHeight; // floorPowerOfTwo(OFFER_SCREEN_WIDTH)
    // console.log(floorPowerOfTwo(OFFER_SCREEN_WIDTH), floorPowerOfTwo(OFFER_SCREEN_HEIGHT))

    var OFFER_SCREEN_WIDTH = floorPowerOfTwo(drawingBufferWidth);
    var OFFER_SCREEN_HEIGHT = floorPowerOfTwo(drawingBufferHeight);
    var FRAMEBUFFER = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, FRAMEBUFFER);
    var depthbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthbuffer);
    gl.renderbufferStorage(
      gl.RENDERBUFFER,
      gl.DEPTH_COMPONENT16,
      OFFER_SCREEN_WIDTH,
      OFFER_SCREEN_HEIGHT,
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      depthbuffer,
    );
    var texture = gl.createTexture();
    FRAMEBUFFER.texture = texture;
    FRAMEBUFFER.width = OFFER_SCREEN_WIDTH;
    FRAMEBUFFER.height = OFFER_SCREEN_HEIGHT;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      OFFER_SCREEN_WIDTH,
      OFFER_SCREEN_HEIGHT,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return {
      FRAMEBUFFER: FRAMEBUFFER,
      OFFER_SCREEN_WIDTH: OFFER_SCREEN_WIDTH,
      OFFER_SCREEN_HEIGHT: OFFER_SCREEN_HEIGHT,
    };
  }

  var Geometry = /*#__PURE__*/ (function(_Group) {
    _inherits(Geometry, _Group);

    var _super = _createSuper(Geometry);

    function Geometry(props) {
      var _this;

      _classCallCheck(this, Geometry);

      _this = _super.call(this, props);
      _this.indices = void 0;
      _this.indicesBuffer = void 0;
      _this.vertices = void 0;
      _this.colors = void 0;
      _this.uvs = void 0;
      return _this;
    }

    return Geometry;
  })(Group);

  /**
   * 存储一些计算网格顶点相关的计算方法
   */
  function initPlaneGeometryVertices(width, height) {
    return new Float32Array([
      -width / 2,
      height / 2,
      -width / 2,
      -height / 2,
      width / 2,
      height / 2,
      width / 2,
      -height / 2, //右下角
    ]);
  }
  function initPlaneGeometryUvs() {
    return new Float32Array([
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
  } // 创建一个立方体
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  function initBoxGeometryVertices() {
    return new Float32Array([
      // 设置顶点和颜色
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
  }
  function initBoxGeometryColors() {
    return new Float32Array([
      // 设置顶点和颜色
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
    ]);
  }
  function initBoxGeometryIndices() {
    return new Uint8Array([
      //顶点索引
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
  }

  var PlaneGeometry = /*#__PURE__*/ (function(_Geometry) {
    _inherits(PlaneGeometry, _Geometry);

    var _super = _createSuper(PlaneGeometry);

    function PlaneGeometry(props) {
      var _this;

      _classCallCheck(this, PlaneGeometry);

      _this = _super.call(this, props);
      _this.type = 'PlaneMesh';
      _this.scene = void 0;
      _this.camera = void 0;
      _this.color = void 0;
      _this.material = new BasicMaterial({});
      _this.width = 1;
      _this.height = 1;
      _this.imgLoading = false;
      _this.shaderAttributes = void 0;
      _this.texture = void 0;
      props.material !== undefined && (_this.material = props.material);
      props.width !== undefined && (_this.width = props.width);
      props.height !== undefined && (_this.height = props.height); // 当前对象的 shader 变量参数列表

      _this.shaderAttributes = [];
      return _this;
    }

    _createClass(PlaneGeometry, [
      {
        key: 'init',
        value: function init(gl, camera) {
          var _this$material;

          this.gl = gl;
          this.camera = camera;
          this.cameraDistance = distance(camera.position, this.position);
          this.material.init(this.gl);
          this.program = createProgram(
            this.gl,
            this.getRectVSHADER(),
            this.getRectFSHADER(),
          );
          this.gl.useProgram(this.program);
          this.vertices = initPlaneGeometryVertices(this.width, this.height);
          this.uvs = initPlaneGeometryUvs();
          this.color = new Color(
            this === null || this === void 0
              ? void 0
              : (_this$material = this.material) === null ||
                _this$material === void 0
              ? void 0
              : _this$material.color,
          );
          this.setUnifroms();
          this.shaderAttributes.push(
            bindAttriBuffer(
              this.gl,
              'a_Position',
              this.vertices,
              2,
              this.program,
            ),
          );
          this.shaderAttributes.push(
            bindAttriBuffer(this.gl, 'a_TextCoord', this.uvs, 2, this.program),
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
          bindUnifrom(
            this.gl,
            'u_projMatrix',
            this.projMatrix,
            this.program,
            'mat4',
          );
          this.viewMatrix = this.camera.getViewMatrix();
          bindUnifrom(
            this.gl,
            'u_viewMatrix',
            this.viewMatrix,
            this.program,
            'mat4',
          );
          bindUnifrom(
            this.gl,
            'u_modelMatrix',
            this.modelMatrix,
            this.program,
            'mat4',
          );
          bindUnifrom(
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
          bindUnifrom(
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
            var u_Sampler = this.gl.getUniformLocation(
              this.program,
              'u_Sampler',
            );
            this.gl.uniform1i(u_Sampler, 0);
          }
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
            (_this$material4 = this.material) === null ||
            _this$material4 === void 0
              ? void 0
              : _this$material4.map
          ) {
            this.imgLoading = true;
            unifromLines.push('uniform sampler2D u_Sampler;\n');
            this.material.on('loadImage', function(_ref2) {
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

    return PlaneGeometry;
  })(Geometry);

  var BoxGeometry = /*#__PURE__*/ (function(_Geometry) {
    _inherits(BoxGeometry, _Geometry);

    var _super = _createSuper(BoxGeometry);

    function BoxGeometry(props) {
      var _this;

      _classCallCheck(this, BoxGeometry);

      _this = _super.call(this, props);
      _this.type = 'CubeMesh';
      _this.material = new BasicMaterial({});
      _this.shaderAttributes = void 0;
      _this.indices = void 0;
      _this.indicesBuffer = void 0;
      props.material !== undefined && (_this.material = props.material); // 当前对象的 shader 变量参数列表

      _this.shaderAttributes = [];
      return _this;
    }

    _createClass(BoxGeometry, [
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
          this.program = createProgram(
            this.gl,
            this.getCubeVSHADER(),
            this.getCubeFSHADER(),
          );
          this.gl.useProgram(this.program);
          this.vertices = initBoxGeometryVertices();
          this.colors = initBoxGeometryColors();
          this.indices = initBoxGeometryIndices();
          this.setUnifroms();
          this.shaderAttributes.push(
            bindAttriBuffer(
              this.gl,
              'a_Position',
              this.vertices,
              3,
              this.program,
            ),
          );
          this.shaderAttributes.push(
            bindAttriBuffer(this.gl, 'a_Color', this.colors, 3, this.program),
          );
          this.indicesBuffer = bindAttriIndicesBuffer(this.gl, this.indices);
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
          bindUnifrom(
            this.gl,
            'u_projMatrix',
            this.projMatrix,
            this.program,
            'mat4',
          );
          this.viewMatrix = this.camera.getViewMatrix();
          bindUnifrom(
            this.gl,
            'u_viewMatrix',
            this.viewMatrix,
            this.program,
            'mat4',
          );
          bindUnifrom(
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
            this.gl.bindBuffer(
              this.gl.ELEMENT_ARRAY_BUFFER,
              this.indicesBuffer,
            );
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
            var u_Sampler = this.gl.getUniformLocation(
              this.program,
              'u_Sampler',
            );
            this.gl.uniform1i(u_Sampler, 0);
          }
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

    return BoxGeometry;
  })(Geometry);

  var Mesh = /*#__PURE__*/ (function(_Group) {
    _inherits(Mesh, _Group);

    var _super = _createSuper(Mesh);

    function Mesh(props) {
      var _this;

      _classCallCheck(this, Mesh);

      _this = _super.call(this, props);
      _this.scene = void 0;
      _this.camera = void 0;
      _this.imgLoading = false;
      _this.texture = void 0;
      _this.material = new BasicMaterial({});
      _this.geometry = void 0;
      _this.shaderAttributes = [];
      _this.color = void 0;
      console.log(props);
      props.material !== undefined && (_this.material = props.material);
      _this.geometry = props.geometry;
      return _this;
    }

    _createClass(Mesh, [
      {
        key: 'init',
        value: function init(gl, camera) {
          var _this$material;

          this.gl = gl;
          this.camera = camera;
          this.cameraDistance = distance(camera.position, this.position);
          this.material.init(this.gl);
          this.program = createProgram(
            this.gl,
            this.getRectVSHADER(),
            this.getRectFSHADER(),
          );
          this.gl.useProgram(this.program);
          var vertices = this.geometry.vertices;
          var uvs = this.geometry.uvs;
          this.color = new Color(
            this === null || this === void 0
              ? void 0
              : (_this$material = this.material) === null ||
                _this$material === void 0
              ? void 0
              : _this$material.color,
          );
          this.setUnifroms();
          this.shaderAttributes.push(
            bindAttriBuffer(this.gl, 'a_Position', vertices, 2, this.program),
          );
          this.shaderAttributes.push(
            bindAttriBuffer(this.gl, 'a_TextCoord', uvs, 2, this.program),
          );
          this.gl.useProgram(null);
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
          bindUnifrom(
            this.gl,
            'u_projMatrix',
            this.projMatrix,
            this.program,
            'mat4',
          );
          this.viewMatrix = this.camera.getViewMatrix();
          bindUnifrom(
            this.gl,
            'u_viewMatrix',
            this.viewMatrix,
            this.program,
            'mat4',
          );
          bindUnifrom(
            this.gl,
            'u_modelMatrix',
            this.modelMatrix,
            this.program,
            'mat4',
          );
          bindUnifrom(
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
          bindUnifrom(
            this.gl,
            'u_color',
            this.color.getRGB(),
            this.program,
            'vec3',
          ); // uniformName, data, vec
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
            _this2 = this;

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
              : _this$material5.on('loadImage', function(_ref) {
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

                  _this2.imgLoading = false;
                  _this2.scene && _this2.scene.renderScene();
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

    return Mesh;
  })(Group);

  var GrayPass = /*#__PURE__*/ (function() {
    function GrayPass(props) {
      _classCallCheck(this, GrayPass);

      this.gl = void 0;
      this.shaderAttributes = [];
    }

    _createClass(GrayPass, [
      {
        key: 'init',
        value: function init(gl) {
          this.gl = gl;

          var _glUtils$initFramebuf = initFramebuffer(this.gl),
            FRAMEBUFFER = _glUtils$initFramebuf.FRAMEBUFFER;

          this.framebuffer = FRAMEBUFFER;
          this.v =
            '\n            attribute vec4 a_Position;\n            attribute vec2 a_TextCoord;\n            varying vec2 v_TexCoord;\n\n            void main(){\n                gl_Position = a_Position;\n                v_TexCoord = a_TextCoord;\n            }\n        ';
          this.f =
            '\n            precision mediump float;\n\n            uniform sampler2D u_Sampler;\n            varying vec2 v_TexCoord;\n\n            void main(){\n                // https://www.cnblogs.com/zhangjiansheng/p/6925722.html\n                // Gray = (R*38 + G*75 + B*15) >> 7\n                // Gray = R*0.299 + G*0.587 + B*0.114\n                vec4 screenPixels = texture2D(u_Sampler, v_TexCoord);\n\n                float R = screenPixels.r;\n                float G = screenPixels.g;\n                float B = screenPixels.b;\n                float gray = R*0.299 + G*0.587 + B*0.114;\n            \n                gl_FragColor = vec4(vec3(gray), 1.0);\n            }';
          this.rectVertices = new Float32Array([
            // 将纹理 st/uv 映射到顶点坐标
            -1.0,
            1.0,
            -1.0,
            -1.0,
            1.0,
            1.0,
            1.0,
            -1.0, //右下角
          ]);
          this.rectUvs = new Float32Array([
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
          this.program = createProgram(this.gl, this.v, this.f);
          this.gl.useProgram(this.program);

          var _glUtils$bindAttriBuf = bindAttriBuffer(
              this.gl,
              'a_Position',
              this.rectVertices,
              2,
              this.program,
            ),
            posBuffer = _glUtils$bindAttriBuf.buffer,
            pAttr = _glUtils$bindAttriBuf.attr,
            posCount = _glUtils$bindAttriBuf.count;

          this.posBuffer = posBuffer;
          this.pAttr = pAttr;
          this.posCount = posCount;

          var _glUtils$bindAttriBuf2 = bindAttriBuffer(
              this.gl,
              'a_TextCoord',
              this.rectUvs,
              2,
              this.program,
            ),
            texBuffer = _glUtils$bindAttriBuf2.buffer,
            texCount = _glUtils$bindAttriBuf2.count;

          this.texBuffer = texBuffer;
          this.texCount = texCount;
          this.gl.activeTexture(this.gl.TEXTURE0); // 激活0号纹理单元

          var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
          this.gl.uniform1i(u_Sampler, 0);
        },
      },
      {
        key: 'drawPass',
        value: function drawPass() {
          this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
          this.gl.useProgram(this.program);
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.posBuffer); // 将缓冲区对象绑定到目标

          this.gl.vertexAttribPointer(
            this.pAttr,
            this.posCount,
            this.gl.FLOAT,
            false,
            0,
            0,
          );
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.framebuffer.texture);
          this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
          this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        },
      },
    ]);

    return GrayPass;
  })();

  exports.BasicMaterial = BasicMaterial;
  exports.BoxGeometry = BoxGeometry;
  exports.Camera = Camera;
  exports.Color = Color;
  exports.GrayPass = GrayPass;
  exports.Mesh = Mesh;
  exports.PlaneGeometry = PlaneGeometry;
  exports.Renderer = Renderer;
  exports.Scene = Scene;

  Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=renderer.js.map
