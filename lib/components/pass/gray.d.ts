export interface IPass {
  init(gl: WebGLRenderingContext): void;
  drawPass(): void;
}
export default class GrayPass implements IPass {
  private gl;
  constructor(props: any);
  init(gl: WebGLRenderingContext): void;
  drawPass(): void;
}
