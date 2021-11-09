export declare function createProgram(gl: any, vshader: any, fshader: any): any;
export declare function loadShader(
  gl: WebGLRenderingContext,
  type: any,
  source: any,
): WebGLShader | null;
export declare function bindAttriBuffer(
  gl: WebGLRenderingContext,
  attrName: string,
  vertices: any,
  count: any,
  program: any,
): {
  buffer: WebGLBuffer | null;
  attr: number;
  count: any;
};
export declare function bindAttriIndicesBuffer(
  gl: WebGLRenderingContext,
  indices: Uint8Array,
): WebGLBuffer;
export declare function bindUnifrom(
  gl: any,
  unifromName: any,
  data: any,
  program: any,
  vec: any,
): any;
export declare function setUnifrom(
  gl: any,
  location: any,
  data: any,
  vec: any,
): void;
export declare function initFramebuffer(
  gl: any,
): {
  FRAMEBUFFER: any;
  OFFER_SCREEN_WIDTH: number;
  OFFER_SCREEN_HEIGHT: number;
};
