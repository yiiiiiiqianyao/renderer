// @ts-nocheck

import { floorPowerOfTwo } from '../utils/math';
export function createProgram(gl, vshader, fshader) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader); // 创建顶点着色器对象
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader); // 创建片元着色器对象
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram(); // 创建程序对象
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader); // 绑定着色器对象
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program); // 链接着色器对象

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS); // 判断着色器对象是否链接成功
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

export function loadShader(gl, type, source) {
  // Create shader object
  var shader = gl.createShader(type); // 生成着色器对象
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source); // 载入着色器

  // Compile the shader
  gl.compileShader(shader); // 编译着色器代码

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // 判断着色器对象是否生成成功
  // gl.SHADER_TYPE、gl.DELETE_STATUS、gl.COMPILE_STATUS
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function bindAttriBuffer(gl, attrName, vertices, count, program) {
  let buffer = gl.createBuffer();
  if (!buffer) {
    console.log('failed create vertex buffer');
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 将缓冲区对象绑定到目标
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 向缓冲区对象中写入数据

  let attr = gl.getAttribLocation(program, attrName);
  gl.vertexAttribPointer(attr, count, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attr);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return { buffer, attr, count };
}

export function bindUnifrom4fv(gl, unifromName, data, program) {
  let uniform4f = gl.getUniformLocation(program, unifromName);
  if (uniform4f < 0) {
    console.log('无法获取矩阵变量的存储位置');
  }
  gl.uniformMatrix4fv(uniform4f, false, data);
  return uniform4f;
}

export function setUnifrom4fv(gl, location, data) {
  gl.uniformMatrix4fv(location, false, data);
}

export function initFramebuffer(gl) {
  const { drawingBufferWidth, drawingBufferHeight } = gl;
  // floorPowerOfTwo(OFFER_SCREEN_WIDTH)
  // console.log(floorPowerOfTwo(OFFER_SCREEN_WIDTH), floorPowerOfTwo(OFFER_SCREEN_HEIGHT))
  const OFFER_SCREEN_WIDTH = floorPowerOfTwo(drawingBufferWidth);
  const OFFER_SCREEN_HEIGHT = floorPowerOfTwo(drawingBufferHeight);

  const FRAMEBUFFER = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, FRAMEBUFFER);
  var depthbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthbuffer);
  gl.renderbufferStorage(
    gl.RENDERBUFFER,
    gl.DEPTH_COMPONENT16,
    OFFER_SCREEN_WIDTH,
    OFFER_SCREEN_HEIGHT,
  );
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER,
    gl.DEPTH_ATTACHMENT,
    gl.RENDERBUFFER,
    depthbuffer,
  );

  const texture = gl.createTexture();
  FRAMEBUFFER.texture = texture;
  FRAMEBUFFER.width = OFFER_SCREEN_WIDTH;
  FRAMEBUFFER.height = OFFER_SCREEN_HEIGHT;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    OFFER_SCREEN_WIDTH,
    OFFER_SCREEN_HEIGHT,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  );
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  );
  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return { FRAMEBUFFER, OFFER_SCREEN_WIDTH, OFFER_SCREEN_HEIGHT };
}
