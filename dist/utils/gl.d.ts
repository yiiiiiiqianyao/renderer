export declare function createProgram(gl: any, vshader: any, fshader: any): any;
export declare function loadShader(gl: any, type: any, source: any): any;
export declare function bindAttriBuffer(
  gl: any,
  attrName: any,
  vertices: any,
  count: any,
  program: any,
): {
  buffer: any;
  attr: any;
  count: any;
};
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
