
export function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader); // 根据说着色器代码构建程序对象
    if (!program) {
      console.log('Failed to create program');
      return false;
    }
  
    gl.useProgram(program); // 上下文对象绑定程序对象 
    gl.program = program; // 绑定程序对象的引用
  
    return true;
  }

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
    let buffer = gl.createBuffer()
    if(!buffer) {
        console.log("failed create vertex buffer")
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer) // 将缓冲区对象绑定到目标
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW) // 向缓冲区对象中写入数据

    let attr = gl.getAttribLocation(program, attrName);
    gl.vertexAttribPointer(attr, count, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attr);
    return { buffer, attr }
}

export function bindUnifrom4fv(gl, unifromName, data, program) {
  let uniform4f = gl.getUniformLocation(program, unifromName);
  if (uniform4f < 0) {
      console.log("无法获取矩阵变量的存储位置");
  }
  gl.uniformMatrix4fv(uniform4f, false, data);
  return uniform4f
}

export function setUnifrom4fv(gl, location, data) {
  gl.uniformMatrix4fv(location, false, data);
}
