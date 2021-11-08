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
import * as glUtils from '../../utils/gl';

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

        var _glUtils$initFramebuf = glUtils.initFramebuffer(this.gl),
          FRAMEBUFFER = _glUtils$initFramebuf.FRAMEBUFFER,
          OFFER_SCREEN_WIDTH = _glUtils$initFramebuf.OFFER_SCREEN_WIDTH,
          OFFER_SCREEN_HEIGHT = _glUtils$initFramebuf.OFFER_SCREEN_HEIGHT;

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
        this.program = glUtils.createProgram(this.gl, this.v, this.f);
        this.gl.useProgram(this.program);

        var _glUtils$bindAttriBuf = glUtils.bindAttriBuffer(
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

        var _glUtils$bindAttriBuf2 = glUtils.bindAttriBuffer(
            this.gl,
            'a_TextCoord',
            this.rectUvs,
            2,
            this.program,
          ),
          texBuffer = _glUtils$bindAttriBuf2.buffer,
          tAttr = _glUtils$bindAttriBuf2.attr,
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

export { GrayPass as default };
