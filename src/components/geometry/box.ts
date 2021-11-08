// @ts-nocheck
import * as glUtils from '../../utils/gl';
import Group from '../group';
import { distance } from '../../utils/math';
import { ICamera } from '../../utils/camera';
export default class Box extends Group {
  public type: string = 'CubeMesh';
  public shaderAttributes: any[];
  public indices: Uint8Array | null;
  public indicesBuffer: WebGLBuffer | null;
  constructor(props) {
    super(props);

    props.material !== undefined && (this.material = props.material);

    this.width = 1;
    this.height = 0.5;

    // 当前对象的 shader 变量参数列表
    this.shaderUnifroms = [];
    this.shaderAttributes = [];
  }

  init(gl: WebGLRenderingContext, camera: ICamera) {
    console.log('init');
    this.gl = gl;
    this.camera = camera;

    this.cameraDistance = distance(camera.position, this.position);
    this.material?.init(this.gl);

    this.program = glUtils.createProgram(
      this.gl,
      this.getCubeVSHADER(),
      this.getCubeFSHADER(),
    );
    this.gl.useProgram(this.program);

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    let cubeVertices = new Float32Array([
      // 设置顶点和颜色
      1.0,
      1.0,
      1.0, // v0 front
      -1.0,
      1.0,
      1.0, // v1
      -1.0,
      -1.0,
      1.0, // v2
      1.0,
      -1.0,
      1.0, // v3

      1.0,
      -1.0,
      -1.0, // v4 back
      1.0,
      1.0,
      -1.0, // v5
      -1.0,
      1.0,
      -1.0, // v6
      -1.0,
      -1.0,
      -1.0, // v7

      1.0,
      1.0,
      -1.0, // v8 right
      1.0,
      1.0,
      1.0, // v9
      1.0,
      -1.0,
      1.0, // v10
      1.0,
      -1.0,
      -1.0, // v11

      -1.0,
      1.0,
      -1.0, // v12 top
      -1.0,
      1.0,
      1.0, // v3
      1.0,
      1.0,
      1.0, // v14
      1.0,
      1.0,
      -1.0, // v15

      1.0,
      -1.0,
      1.0, // v16 down
      -1.0,
      -1.0,
      1.0, // v17
      -1.0,
      -1.0,
      -1.0, // v18
      1.0,
      -1.0,
      -1.0, // v19

      -1.0,
      1.0,
      1.0, // v1 left
      -1.0,
      1.0,
      -1.0, // v6
      -1.0,
      -1.0,
      -1.0, // v7
      -1.0,
      -1.0,
      1.0, // v2
    ]);

    let cubeColors = new Float32Array([
      // 设置顶点和颜色
      1.0,
      1.0,
      1.0, // v0 front
      1.0,
      1.0,
      1.0, // v1
      1.0,
      1.0,
      1.0, // v2
      1.0,
      1.0,
      1.0, // v3

      0.0,
      1.0,
      1.0, // v4 back
      0.0,
      1.0,
      1.0, // v5
      0.0,
      1.0,
      1.0, // v6
      0.0,
      1.0,
      1.0, // v7

      1.0,
      1.0,
      0.0, // v8 right
      1.0,
      1.0,
      0.0, // v9
      1.0,
      1.0,
      0.0, // v10
      1.0,
      1.0,
      0.0, // v11

      1.0,
      0.0,
      0.0, // v12 top
      1.0,
      0.0,
      0.0, // v3
      1.0,
      0.0,
      0.0, // v14
      1.0,
      0.0,
      0.0, // v15

      0.0,
      1.0,
      0.0, // v16 down
      0.0,
      1.0,
      0.0, // v17
      0.0,
      1.0,
      0.0, // v18
      0.0,
      1.0,
      0.0, // v19

      0.0,
      0.0,
      1.0, // v1 left
      0.0,
      0.0,
      1.0, // v6
      0.0,
      0.0,
      1.0, // v7
      0.0,
      0.0,
      1.0, // v2
    ]);

    // let FSIZE = cubeVertices.BYTES_PER_ELEMENT;

    this.indices = new Uint8Array([
      //顶点索引
      0,
      1,
      2,
      0,
      2,
      3, // 前

      6,
      5,
      4,
      6,
      4,
      7, // 后

      8,
      9,
      10,
      8,
      10,
      11,

      12,
      13,
      14,
      12,
      14,
      15,

      16,
      17,
      18,
      16,
      18,
      19,

      20,
      21,
      22,
      20,
      22,
      23,
    ]);

    this.setUnifroms();

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(
        this.gl,
        'a_Position',
        cubeVertices,
        3,
        this.program,
      ),
    );

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(this.gl, 'a_Color', cubeColors, 3, this.program),
    );

    this.indicesBuffer = glUtils.bindAttriIndicesBuffer(this.gl, this.indices);
  }

  /**
   * @param camera
   */
  setCamera(camera: ICamera) {
    this.camera = camera;
  }

  /**
   * 设置当前着色器的 uniform 变量
   */
  setUnifroms() {
    this.projMatrix = this.camera.getPerspectiveMatrix();
    let u_projMatrixLocaion = glUtils.bindUnifrom(
      this.gl,
      'u_projMatrix',
      this.projMatrix,
      this.program,
      'mat4',
    );

    this.viewMatrix = this.camera.getViewMatrix();
    let u_viewMatrixLocation = glUtils.bindUnifrom(
      this.gl,
      'u_viewMatrix',
      this.viewMatrix,
      this.program,
      'mat4',
    );

    let u_modelMatrixLocation = glUtils.bindUnifrom(
      this.gl,
      'u_modelMatrix',
      this.modelMatrix,
      this.program,
      'mat4',
    );
  }

  /**
   * 更新 shader 的 attribute/uniform 变量的值
   */
  updateAttributeUnifroms() {
    //  reBindIndices
    if (this.indices && this.indicesBuffer) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
      this.gl.bufferData(
        this.gl.ELEMENT_ARRAY_BUFFER,
        this.indices,
        this.gl.STATIC_DRAW,
      );
    }

    // reBindBuffer
    this.shaderAttributes.map(({ buffer, attr, count }) => {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer); // 将缓冲区对象绑定到目标
      this.gl.vertexAttribPointer(attr, count, this.gl.FLOAT, false, 0, 0);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    });

    // reBindUnifrom
    this.setUnifroms();

    // TODO: 每次渲染的时候重新为纹理分配纹理空间
    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
      this.gl.uniform1i(u_Sampler, 0);
    }
  }

  /**
   * 存储当前网格对象的 unifrom 变量
   */
  addShaderUnifroms(uniformName: string, data: any, vec: string) {
    this.shaderUnifroms.push({ uniformName, data, vec });
  }

  /**
   * 存储当前网格对象的 unifrom 变量
   * @param {*} location
   * @param {*} type
   * @param {*} currentDataLocation
   */
  addShaderUnifroms(location, type, currentDataLocation, vec) {
    this.shaderUnifroms.push({
      location,
      type,
      currentDataLocation,
      vec,
    });
  }

  /**
   * 绘制当前的网格对象
   */
  draw(camera: ICamera) {
    // TODO:  切换程序对象
    this.gl.useProgram(this.program);

    // TODO: reset camera
    this.setCamera(camera);

    // update unifrom
    this.updateAttributeUnifroms();

    // this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.indices.length,
      this.gl.UNSIGNED_BYTE,
      0,
    );
  }

  /**
   * 返回顶点着色器代码
   * @returns
   */
  getCubeVSHADER() {
    return `
            uniform mat4 u_projMatrix;
            uniform mat4 u_viewMatrix;
            uniform mat4 u_modelMatrix;

            attribute vec4 a_Position;
            attribute vec4 a_Color;

            varying vec4 v_Color;
            void main(){
                v_Color = a_Color;

                gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;
           
            }
        `;
  }

  /**
   * 返回片元着色器代码
   * @returns
   */
  getCubeFSHADER() {
    return `
            #ifdef GL_ES
            precision mediump float;
            #endif
            varying vec4 v_Color;
            void main(){
                gl_FragColor = v_Color;
                // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;
  }
}
