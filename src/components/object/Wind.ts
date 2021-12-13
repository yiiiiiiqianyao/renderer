import Group from '../group';
import { IScene } from '../scene';
import { ICamera } from '@/utils/camera';
import { IMesh } from './Mesh';
import { IGeometry } from '../geometry/geometry';
import * as glUtils from '../../utils/gl';

import {
  drawVert,
  drawFrag,
  updateVert,
  updateFrag,
  screenVert,
  screenFrag,
  fullScreenVert,
  fullScreenFrag,
} from './windShader';

const defaultRampColors = {
  0.0: '#3288bd',
  0.1: '#66c2a5',
  0.2: '#abdda4',
  0.3: '#e6f598',
  0.4: '#fee08b',
  0.5: '#fdae61',
  0.6: '#f46d43',
  1.0: '#d53e4f',
};

function getColorRamp(colors: any) {
  var canvas = document.createElement('canvas') as HTMLCanvasElement;
  var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = 256;
  canvas.height = 1;

  var gradient = ctx.createLinearGradient(0, 0, 256, 0);
  for (var stop in colors) {
    gradient.addColorStop(+stop, colors[stop]);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 1);

  return new Uint8Array(ctx.getImageData(0, 0, 256, 1).data);
}

function bindAttribute(
  gl: WebGLRenderingContext,
  buffer: any,
  attribute: any,
  numComponents: any,
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
}

function bindFramebuffer(
  gl: WebGLRenderingContext,
  framebuffer: any,
  texture: any,
) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  if (texture) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
  }
}

export default class Wind extends Group implements IMesh {
  public geometry: IGeometry;
  public camera: ICamera;

  public drawProgram: WebGLProgram;
  public screenProgram: WebGLProgram;
  public fullScreenProgram: WebGLProgram;
  public updateProgram: WebGLProgram;

  public fadeOpacity: number;
  public speedFactor: number;
  public dropRate: number;
  public dropRateBump: number;
  public _numParticles: number;
  public particleStateResolution: number;

  public quadBuffer: WebGLBuffer | null;
  public uvBuffer: WebGLBuffer | null;
  public particleIndexBuffer: WebGLBuffer | null;

  public framebuffer: WebGLFramebuffer | null;

  public colorRampTexture: WebGLTexture | null;

  public backgroundTexture: WebGLTexture | null;
  public screenTexture: WebGLTexture | null;
  public particleStateTexture0: WebGLTexture | null;
  public particleStateTexture1: WebGLTexture | null;

  public windData: any;
  public windTexture: WebGLTexture | null;

  public shaderAttributes: any[];
  public vertices: any;

  public emptyPixels: Uint8Array;

  public width: number = 512;
  public height: number = 512;

  public material: any;
  public planeprogram: WebGLProgram;

  constructor(props: any) {
    super(props);
    // 当前对象的 shader 变量参数列表
    this.shaderAttributes = [];

    this.vertices = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

    this.geometry = props.geometry;
    this.material = props.material;
  }

  init(gl: WebGLRenderingContext, camera: ICamera, scene: IScene) {
    this.gl = gl;
    this.camera = camera;

    this.fadeOpacity = 0.996; // how fast the particle trails fade on each frame
    this.speedFactor = 0.25; // how fast the particles move
    this.dropRate = 0.003; // how often the particles move to a random place
    this.dropRateBump = 0.01; // drop rate increase relative to individual particle speed

    this.drawProgram = glUtils.createProgram(gl, drawVert, drawFrag);
    // this.setUnifroms(this.drawProgram);

    this.screenProgram = glUtils.createProgram(gl, screenVert, screenFrag);
    // this.setUnifroms(this.screenProgram);

    this.fullScreenProgram = glUtils.createProgram(
      gl,
      fullScreenVert,
      fullScreenFrag,
    );
    // this.setUnifroms(this.fullScreenProgram);

    this.updateProgram = glUtils.createProgram(gl, updateVert, updateFrag);
    // this.setUnifroms(this.updateProgram);

    this.quadBuffer = glUtils.createBuffer(
      gl,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
    );

    this.uvBuffer = glUtils.createBuffer(
      gl,
      new Float32Array([0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0]),
    );

    this.framebuffer = gl.createFramebuffer();
    this.colorRampTexture = glUtils.createTexture(
      this.gl,
      this.gl.LINEAR,
      getColorRamp(defaultRampColors),
      16,
      16,
    );

    this.emptyPixels = new Uint8Array(this.width * this.height * 4);

    // screen textures to hold the drawn screen for the previous and the current frame

    this.backgroundTexture = glUtils.createTexture(
      gl,
      gl.NEAREST,
      this.emptyPixels,
      this.width,
      this.height,
    );
    this.screenTexture = glUtils.createTexture(
      gl,
      gl.NEAREST,
      this.emptyPixels,
      this.width,
      this.height,
    );

    var numParticles = 65536; // params number

    // we create a square texture where each pixel will hold a particle position encoded as RGBA
    var particleRes = (this.particleStateResolution = Math.ceil(
      Math.sqrt(numParticles),
    ));
    // particleRes size
    this._numParticles = particleRes * particleRes;

    var particleState = new Uint8Array(this._numParticles * 4);
    for (var i = 0; i < particleState.length; i++) {
      particleState[i] = Math.floor(Math.random() * 256); // randomize the initial particle positions
    }
    // textures to hold the particle state for the current and the next frame
    this.particleStateTexture0 = glUtils.createTexture(
      gl,
      gl.NEAREST,
      particleState,
      particleRes,
      particleRes,
    );
    this.particleStateTexture1 = glUtils.createTexture(
      gl,
      gl.NEAREST,
      particleState,
      particleRes,
      particleRes,
    );
    // createTexture(gl, filter, data, width, height)

    var particleIndices = new Float32Array(this._numParticles);
    for (var i$1 = 0; i$1 < this._numParticles; i$1++) {
      particleIndices[i$1] = i$1;
    }
    this.particleIndexBuffer = glUtils.createBuffer(gl, particleIndices);
  }

  reload() {
    let gl = this.gl;
    this.colorRampTexture = glUtils.createTexture(
      this.gl,
      this.gl.LINEAR,
      getColorRamp(defaultRampColors),
      16,
      16,
    );

    this.emptyPixels = new Uint8Array(this.width * this.height * 4);
    // screen textures to hold the drawn screen for the previous and the current frame
    this.backgroundTexture = glUtils.createTexture(
      gl,
      gl.NEAREST,
      this.emptyPixels,
      this.width,
      this.height,
    );
    this.screenTexture = glUtils.createTexture(
      gl,
      gl.NEAREST,
      this.emptyPixels,
      this.width,
      this.height,
    );
  }

  setUnifroms(program: WebGLProgram) {
    this.gl.useProgram(program);

    this.projMatrix = this.camera.getPerspectiveMatrix();
    glUtils.bindUnifrom(
      this.gl,
      'u_projMatrix',
      this.projMatrix,
      program,
      'mat4',
    );

    this.viewMatrix = this.camera.getViewMatrix();
    glUtils.bindUnifrom(
      this.gl,
      'u_viewMatrix',
      this.viewMatrix,
      program,
      'mat4',
    );

    glUtils.bindUnifrom(
      this.gl,
      'u_modelMatrix',
      this.modelMatrix,
      program,
      'mat4',
    );
  }

  setWind(windData: any) {
    this.windData = windData;
    this.windTexture = glUtils.createDataTexture(
      this.gl,
      this.gl.LINEAR,
      windData.image,
    );
  }

  setCamera(camera: ICamera) {
    this.camera = camera;
  }

  draw(camera: ICamera) {
    // TODO: reset camera
    this.setCamera(camera);

    var gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);

    glUtils.bindTexture(gl, this.windTexture, 0);
    glUtils.bindTexture(gl, this.particleStateTexture0, 1);

    this.drawScreen(); // draw Particles into framebuffer
    this.updateParticles();

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.STENCIL_TEST);
  }

  drawScreen() {
    var gl = this.gl;
    // draw the screen into a temporary framebuffer to retain it as the background on the next frame
    bindFramebuffer(gl, this.framebuffer, this.screenTexture);
    gl.viewport(0, 0, this.width, this.height);
    // gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // this.drawTexture(this.backgroundTexture, this.fadeOpacity); // draw empty texture into screen - clear
    this.drawFullTexture(this.backgroundTexture, this.fadeOpacity);
    this.drawParticles();

    bindFramebuffer(gl, null, null);
    gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    // // enable blending to support drawing on top of an existing background (e.g. a map)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.drawTexture(this.screenTexture, 1.0);
    gl.disable(gl.BLEND);

    // save the current screen as the background for the next frame
    var temp = this.backgroundTexture;
    this.backgroundTexture = this.screenTexture;
    this.screenTexture = temp;
  }

  drawFullTexture(texture: any, opacity: number) {
    var gl = this.gl;
    var program = this.fullScreenProgram as any;
    gl.useProgram(program);

    bindAttribute(gl, this.quadBuffer, program.a_pos, 2);

    glUtils.bindTexture(gl, texture, 2);
    gl.uniform1i(program.u_screen, 2);
    gl.uniform1f(program.u_opacity, opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawTexture(texture: any, opacity: number) {
    var gl = this.gl;
    var program = this.screenProgram as any;
    gl.useProgram(program);
    this.setUnifroms(program);

    bindAttribute(gl, this.quadBuffer, program.a_pos, 2);

    glUtils.bindTexture(gl, texture, 2);
    gl.uniform1i(program.u_screen, 2);
    gl.uniform1f(program.u_opacity, opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawParticles() {
    var gl = this.gl;
    var program = this.drawProgram as any;
    gl.useProgram(program);

    bindAttribute(gl, this.particleIndexBuffer, program.a_index, 1);
    glUtils.bindTexture(gl, this.colorRampTexture, 2);

    gl.uniform1i(program.u_wind, 0);
    gl.uniform1i(program.u_particles, 1);
    gl.uniform1i(program.u_color_ramp, 2);

    gl.uniform1f(program.u_particles_res, this.particleStateResolution);
    gl.uniform2f(program.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(program.u_wind_max, this.windData.uMax, this.windData.vMax);

    gl.drawArrays(gl.POINTS, 0, this._numParticles);
  }

  updateParticles() {
    var gl = this.gl;
    bindFramebuffer(gl, this.framebuffer, this.particleStateTexture1);
    gl.viewport(
      0,
      0,
      this.particleStateResolution,
      this.particleStateResolution,
    );

    var program = this.updateProgram as any;
    gl.useProgram(program);
    this.setUnifroms(program);

    bindAttribute(gl, this.quadBuffer, program.a_pos, 2);

    gl.uniform1i(program.u_wind, 0);
    gl.uniform1i(program.u_particles, 1);

    gl.uniform1f(program.u_rand_seed, Math.random());
    gl.uniform2f(program.u_wind_res, this.windData.width, this.windData.height);
    gl.uniform2f(program.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(program.u_wind_max, this.windData.uMax, this.windData.vMax);
    gl.uniform1f(program.u_speed_factor, this.speedFactor);
    gl.uniform1f(program.u_drop_rate, this.dropRate);
    gl.uniform1f(program.u_drop_rate_bump, this.dropRateBump);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // swap the particle state textures so the new one becomes the current one
    var temp = this.particleStateTexture0;
    this.particleStateTexture0 = this.particleStateTexture1;
    this.particleStateTexture1 = temp;

    bindFramebuffer(gl, null, null);
  }
}
