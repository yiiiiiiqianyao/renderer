import { IColor } from '../object/Color';
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
  gl: WebGLRenderingContext;
  wrap: HTMLElement;
  clearColor: IColor;
  canvas: HTMLCanvasElement;
  renderPixelWidth: number;
  renderPixelHeight: number;
  constructor(props: IRenderProps);
  initRenderContext(wrap: string | HTMLElement): void;
  initGLParams(gl: WebGLRenderingContext): void;
  renderPixelSize(): void;
  resize(): void;
}
export {};
