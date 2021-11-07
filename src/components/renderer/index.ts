import Color, { IColor } from '../object/Color';
import { getCanvas, setCanvas } from '../utils/dom';

interface IRender {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  wrap: HTMLElement;
  renderPixelWidth: number;
  renderPixelHeight: number;
}

interface IRenderProps {
  wrap: string | HTMLElement | HTMLCanvasElement;
  clearColor: any;
}

export default class Renderer implements IRender {
  public gl: WebGLRenderingContext;
  public wrap: HTMLElement;
  public clearColor: IColor;
  public canvas: HTMLCanvasElement;
  public renderPixelWidth: number;
  public renderPixelHeight: number;

  constructor(props: IRenderProps) {
    this.clearColor = new Color(props.clearColor);

    this.initRenderContext(props.wrap);
    this.renderPixelSize();
  }

  initRenderContext(wrap: string | HTMLElement) {
    if (typeof wrap === 'string') {
      this.wrap = document.getElementById('wrap') as HTMLElement;
      let { clientWidth, clientHeight } = this.wrap;
      this.canvas = getCanvas(clientWidth, clientHeight);
    } else if (wrap instanceof HTMLCanvasElement) {
      this.wrap = wrap.parentNode as HTMLElement;
      this.canvas = wrap;
    } else {
      this.wrap = wrap;
      let { clientWidth, clientHeight } = this.wrap;
      this.canvas = getCanvas(clientWidth, clientHeight);
    }

    this.wrap.appendChild(this.canvas);
    this.gl = this.canvas.getContext('webgl') as WebGLRenderingContext;

    this.initGLParams(this.gl);
  }

  initGLParams(gl: WebGLRenderingContext) {
    let c = this.clearColor.getRGBA();
    gl.clearColor(c[0], c[1], c[2], c[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST); // 开启深度检测
    gl.clear(gl.DEPTH_BUFFER_BIT); // 清除深度缓存

    gl.enable(gl.BLEND); // 开启混合
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // 指定混合函数

    gl.enable(gl.CULL_FACE); // 开启背面剔除
    gl.disable(gl.CULL_FACE); // 关闭背面剔除
  }

  renderPixelSize() {
    let { clientWidth, clientHeight } = this.canvas;
    this.renderPixelWidth = clientWidth;
    this.renderPixelHeight = clientHeight;
  }

  resize() {
    let { clientWidth, clientHeight } = this.wrap;
    setCanvas(this.canvas, clientWidth, clientHeight);
    this.renderPixelSize();

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }
}
