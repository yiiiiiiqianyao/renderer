import Material from './Material';
import { loadImage } from '../../utils/texture';

import Color, { IColor } from '../object/Color';

export interface IBasicMaterial {
  color: IColor;
  transparent: boolean;
  opacity: number;
  map?: any;
  texture?: WebGLTexture | null;

  init(gl: WebGLRenderingContext): void;
}
interface IBasicMaterialProps {
  transparent?: boolean;
  opacity?: number;
  color?: string;
  map?: any;
  image?: HTMLImageElement;
}

export default class BasicMaterial extends Material {
  public color: IColor;
  public opacity: number = 1.0;
  public transparent: boolean = false;
  public map: any;
  public image: HTMLImageElement;

  public gl: WebGLRenderingContext;
  public texture: WebGLTexture | null;

  constructor(props: IBasicMaterialProps) {
    super();
    this.color = new Color(props.color);
    props.opacity !== undefined && (this.opacity = props.opacity);
    props.transparent !== undefined && (this.transparent = props.transparent);

    this.map = props?.map || undefined;
  }

  async init(gl: WebGLRenderingContext) {
    this.gl = gl;
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

    this.emit('loadImage', {
      texture: this.texture,
      img: this.image,
    });
  }

  destroy() {}
}
