'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _Color = _interopRequireDefault(require('../object/Color'));

var _dom = require('../utils/dom');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var Renderer = /*#__PURE__*/ (function() {
  function Renderer(props) {
    _classCallCheck(this, Renderer);

    this.gl = void 0;
    this.wrap = void 0;
    this.clearColor = void 0;
    this.canvas = void 0;
    this.renderPixelWidth = void 0;
    this.renderPixelHeight = void 0;
    this.clearColor = new _Color.default(props.clearColor);
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
          this.canvas = (0, _dom.getCanvas)(clientWidth, clientHeight);
        } else if (wrap instanceof HTMLCanvasElement) {
          this.wrap = wrap.parentNode;
          this.canvas = wrap;
        } else {
          this.wrap = wrap;
          var _this$wrap2 = this.wrap,
            _clientWidth = _this$wrap2.clientWidth,
            _clientHeight = _this$wrap2.clientHeight;
          this.canvas = (0, _dom.getCanvas)(_clientWidth, _clientHeight);
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
        (0, _dom.setCanvas)(this.canvas, clientWidth, clientHeight);
        this.renderPixelSize();
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      },
    },
  ]);

  return Renderer;
})();

exports.default = Renderer;
