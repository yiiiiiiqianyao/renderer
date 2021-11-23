import { loadImage } from '../../utils/texture';

import Color, { IColor } from '../object/Color';
import Material from '../object/Material';
import { IScene } from '../scene';
import * as glUtils from '../../utils/gl';

export interface IMaterial {
  program: WebGLProgram;

  color: IColor | null;
  transparent: boolean;
  opacity: number;
  map?: any;
  texture?: WebGLTexture | null;
  imgLoading: boolean;

  init(gl: WebGLRenderingContext, scene: IScene): void;
  on(type: string, fn: (oprions: any) => void): void;

  getVShader: () => string;
  getFShader: () => string;

  destroy: () => void;
}
interface IBasicMaterialProps {
  transparent?: boolean;
  opacity?: number;
  color?: string;
  map?: string;
  image?: HTMLImageElement;
}

export default class BasicMaterial extends Material {
  public program: WebGLProgram;

  public color: IColor | null;
  public opacity: number = 1.0;
  public transparent: boolean = false;
  public map: string | undefined;
  public image: HTMLImageElement;

  public texture: WebGLTexture | null;
  public imgLoading: boolean = false;
  public scene: IScene;

  constructor(props: IBasicMaterialProps) {
    super();
    props.color !== undefined && (this.color = new Color(props.color));
    props.opacity !== undefined && (this.opacity = props.opacity);
    props.transparent !== undefined && (this.transparent = props.transparent);

    this.map = props.map;
  }

  async init(gl: WebGLRenderingContext, scene: IScene) {
    this.gl = gl;
    this.scene = scene;
    this.program = glUtils.createProgram(
      gl,
      this.getVShader(),
      this.getFShader(),
    );
    if (this.map) {
      let { succeed, img } = (await loadImage(this.map)) as {
        succeed: boolean;
        img: HTMLImageElement;
      };
      if (succeed) {
        this.image = img;
        this.initTexture();
      }
    }
  }

  initTexture() {
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
    // add minimap
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    console.log('emit');
    this.emit('loadImage', {
      texture: this.texture,
      img: this.image,
    });
  }

  getVShader() {
    return `
    uniform mat4 u_projMatrix;
    uniform mat4 u_viewMatrix;
    uniform mat4 u_modelMatrix;

    attribute vec4 a_Position;
    attribute vec2 a_TextCoord;
    varying vec2 v_uv;
    void main(){
        v_uv = a_TextCoord;

        gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;
   
    }
`;
  }

  getFShader() {
    let firstLine = 'precision mediump float;\n';
    let gl_FragColorLine = 'gl_FragColor = vec4(u_color, u_opacity);\n';

    let unifromLines = ['uniform float u_opacity;\n', 'uniform vec3 u_color;'];

    if (this.map) {
      this.imgLoading = true;
      unifromLines.push('uniform sampler2D u_Sampler;\n');

      this.on('loadImage', ({ texture, img }) => {
        this.gl.useProgram(this.program);
        // TODO: cache texture
        this.texture = texture;

        this.gl.activeTexture(this.gl.TEXTURE0); // 激活0号纹理单元
        this.texture && this.gl.bindTexture(this.gl.TEXTURE_2D, texture); // 绑定纹理单元

        var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
        this.gl.uniform1i(u_Sampler, 0);

        this.imgLoading = false;

        this.scene?.renderScene();
      });
      gl_FragColorLine = 'gl_FragColor = texture2D(u_Sampler, v_uv);\n';
    }
    // TODO: 拼装 shader
    const shader =
      firstLine +
      unifromLines.join('') +
      `
      varying vec2 v_uv;
      void main(){
        ${gl_FragColorLine}
        gl_FragColor.a *= u_opacity;
      }
      `;
    return shader;
  }

  destroy() {
    this.abort();
    if (this.texture) {
      this.gl.deleteTexture(this.texture);
      this.texture = null;
    }
  }
}
