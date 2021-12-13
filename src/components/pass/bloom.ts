// @ts-nocheck
import * as glUtils from '../../utils/gl';

export interface IPass {
  init(gl: WebGLRenderingContext): void;
  drawPass(): void;
}

export default class BloomPass implements IPass {
  private gl: WebGLRenderingContext;
  constructor(props) {
    this.shaderAttributes = [];
  }

  init(gl: WebGLRenderingContext) {
    this.gl = gl;
    const { FRAMEBUFFER } = glUtils.initFramebuffer(this.gl);
    this.framebuffer = FRAMEBUFFER;

    this.v = `
            attribute vec4 a_Position;
            attribute vec2 a_TextCoord;
            varying vec2 v_TexCoord;

            void main(){
                gl_Position = a_Position;
                v_TexCoord = a_TextCoord;
            }
        `;
    this.f = `
            precision mediump float;

            uniform sampler2D u_Sampler;
            varying vec2 v_TexCoord;

            void main(){
                // https://www.cnblogs.com/zhangjiansheng/p/6925722.html
                // Gray = (R*38 + G*75 + B*15) >> 7
                // Gray = R*0.299 + G*0.587 + B*0.114
                vec4 screenPixels = texture2D(u_Sampler, v_TexCoord);

                float R = screenPixels.r;
                float G = screenPixels.g;
                float B = screenPixels.b;
                float gray = R*0.299 + G*0.587 + B*0.114;
            
                gl_FragColor = vec4(vec3(gray), 1.0);
                gl_FragColor = screenPixels;

                // Y = 0.299R + 0.587G + 0.114B // 亮度提取

                float h = 2.0/512.0;
                vec2 vUv = v_TexCoord;
                vec4 color11 = texture2D( u_Sampler, vec2( vUv.x - 1.0 * h, vUv.y + 1.0 * h) );
                vec4 color12 = texture2D( u_Sampler, vec2( vUv.x - 0.0 * h, vUv.y + 1.0 * h) );
                vec4 color13 = texture2D( u_Sampler, vec2( vUv.x + 1.0 * h, vUv.y + 1.0 * h) );

                vec4 color21 = texture2D( u_Sampler, vec2( vUv.x - 1.0 * h, vUv.y) );
                vec4 color22 = texture2D( u_Sampler, vec2( vUv.x , vUv.y) );
                vec4 color23 = texture2D( u_Sampler, vec2( vUv.x + 1.0 * h, vUv.y) );

                vec4 color31 = texture2D( u_Sampler, vec2( vUv.x - 1.0 * h, vUv.y-1.0*h) );
                vec4 color32 = texture2D( u_Sampler, vec2( vUv.x - 0.0 * h, vUv.y-1.0*h) );
                vec4 color33 = texture2D( u_Sampler, vec2( vUv.x + 1.0 * h, vUv.y-1.0*h) );
 
                vec4 bloomPixels = (
                  1.0*color11 + 
                  1.0*color12 + 
                  1.0*color13 + 
                  1.0*color21 + 
                  1.0*color21 + 
                  2.0*color22 + 
                  1.0*color23 + 
                  1.0*color31 + 
                  1.0*color32 + 
                  1.0*color33
                  )/10.0;

                gl_FragColor = bloomPixels * 1. + screenPixels * 1.0;

                // float texelOffset = 1.0/300.0;
                // float weight[5];
                // weight[0] = 0.22;
                // weight[1] = 0.19;
                // weight[2] = 0.12;
                // weight[3] = 0.08;
                // weight[4] = 0.01;
                // vec4 color=texture2D(u_Sampler,v_TexCoord)*weight[0];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y + texelOffset * 0.0))*weight[0];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y - texelOffset * 0.0))*weight[0];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x + texelOffset * 1.0, v_TexCoord.y))*weight[1];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x - texelOffset * 1.0, v_TexCoord.y))*weight[1];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y + texelOffset * 1.0))*weight[1];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y - texelOffset * 1.0))*weight[1];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x + texelOffset * 2.0, v_TexCoord.y))*weight[2];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x - texelOffset * 2.0, v_TexCoord.y))*weight[2];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y + texelOffset * 2.0))*weight[2];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y - texelOffset * 2.0))*weight[2];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x + texelOffset * 3.0, v_TexCoord.y))*weight[3];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x - texelOffset * 3.0, v_TexCoord.y))*weight[3];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y + texelOffset * 3.0))*weight[3];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y - texelOffset * 3.0))*weight[3];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x + texelOffset * 4.0, v_TexCoord.y))*weight[4];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x - texelOffset * 4.0, v_TexCoord.y))*weight[4];

                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y + texelOffset * 4.0))*weight[4];
                // // color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y - texelOffset * 4.0))*weight[4];
               

                // for(int i = 1; i < 5; i++)
                // {
                //   float index = float(i);
                //   color += texture2D(u_Sampler, vec2(v_TexCoord.x + texelOffset * index*0.0, v_TexCoord.y))*weight[i];
                //   color += texture2D(u_Sampler, vec2(v_TexCoord.x - texelOffset * index*0.0, v_TexCoord.y))*weight[i];
                 
                //   color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y + texelOffset * index))*weight[i];
                //   color += texture2D(u_Sampler, vec2(v_TexCoord.x, v_TexCoord.y - texelOffset * index))*weight[i];
                // }

                // gl_FragColor = color/1.0;

                

                // gl_FragColor = screenPixels;
                
            }`;

    this.rectVertices = new Float32Array([
      // 将纹理 st/uv 映射到顶点坐标
      -1.0,
      1.0, //左上角
      -1.0,
      -1.0, //左下角
      1.0,
      1.0, //右上角
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
    let {
      buffer: posBuffer,
      attr: pAttr,
      count: posCount,
    } = glUtils.bindAttriBuffer(
      this.gl,
      'a_Position',
      this.rectVertices,
      2,
      this.program,
    );
    this.posBuffer = posBuffer;
    this.pAttr = pAttr;
    this.posCount = posCount;

    let {
      buffer: texBuffer,
      attr: tAttr,
      count: texCount,
    } = glUtils.bindAttriBuffer(
      this.gl,
      'a_TextCoord',
      this.rectUvs,
      2,
      this.program,
    );

    this.texBuffer = texBuffer;
    this.texCount = texCount;

    this.gl.activeTexture(this.gl.TEXTURE0); // 激活0号纹理单元
    let u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
    this.gl.uniform1i(u_Sampler, 0);
  }

  drawPass() {
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
  }
}
