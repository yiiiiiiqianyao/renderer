// @ts-nocheck
import { ICamera } from '@/utils/camera';
import * as glUtils from '../../utils/gl';
import { SHADER_PARAMS } from '../../utils/name';
import Group from '../group';
export default class Plane extends Group {
  public gl: WebGLRenderingContext;
  public camera: ICamera;

  constructor(props) {
    super(props);
    this.type = 'PlaneMesh';

    this.material = props?.material;

    this.width = props.width || 1;
    this.height = props.height || 0.5;

    this.imgLoading = false;

    // 当前对象的 shader 变量参数列表
    this.shaderUnifroms = [];
    this.shaderAttributes = [];
  }

  init(gl: WebGLRenderingContext, camera: ICamera) {
    this.gl = gl;
    this.camera = camera;
    this.material?.init(this.gl);

    this.program = glUtils.createProgram(
      this.gl,
      this.getRectVSHADER(),
      this.getRectFSHADER(),
    );
    this.gl.useProgram(this.program);

    var rectVertices = new Float32Array([
      // 将纹理 st/uv 映射到顶点坐标
      -this.width / 2,
      this.height / 2, //左上角
      -this.width / 2,
      -this.height / 2, //左下角
      this.width / 2,
      this.height / 2, //右上角
      this.width / 2,
      -this.height / 2, //右下角
    ]);

    var rectUvs = new Float32Array([
      // rect uvs
      0.0,
      1.0,
      0.0,
      0.0,
      1.0,
      1.0,
      1.0,
      0.0,
    ]);
    var FSIZE = rectVertices.BYTES_PER_ELEMENT;

    this.setMatrixs();

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(
        this.gl,
        'a_Position',
        rectVertices,
        2,
        this.program,
      ),
    );
    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(this.gl, 'a_TextCoord', rectUvs, 2, this.program),
    );

    this.gl.useProgram(null);
  }

  /**
   * @param camera
   */
  setCamera(camera: ICamera) {
    this.camera = camera;
  }

  /**
   * 设置当前网格的矩阵、同时将矩阵传递给着色器
   */
  setMatrixs() {
    this.projMatrix = this.camera.getPerspectiveMatrix();
    let u_projMatrixLocaion = glUtils.bindUnifrom4fv(
      this.gl,
      'u_projMatrix',
      this.projMatrix,
      this.program,
    );
    this.addShaderUnifroms(
      u_projMatrixLocaion,
      SHADER_PARAMS.UNIFROM,
      this.projMatrix,
    );

    this.viewMatrix = this.camera.getViewMatrix();
    let u_viewMatrixLocation = glUtils.bindUnifrom4fv(
      this.gl,
      'u_viewMatrix',
      this.viewMatrix,
      this.program,
    );
    this.addShaderUnifroms(
      u_viewMatrixLocation,
      SHADER_PARAMS.UNIFROM,
      this.viewMatrix,
    );

    let u_modelMatrixLocation = glUtils.bindUnifrom4fv(
      this.gl,
      'u_modelMatrix',
      this.modelMatrix,
      this.program,
    );
    this.addShaderUnifroms(
      u_modelMatrixLocation,
      SHADER_PARAMS.UNIFROM,
      this.modelMatrix,
    );
  }

  /**
   * 更新 shader 的 uniform 变量的值
   */
  updateShaderUnifroms() {
    // reSetUnifrom
    this.shaderUnifroms.map(({ location, currentDataLocation }) => {
      glUtils.setUnifrom4fv(this.gl, location, currentDataLocation);
    });

    // reBindBuffer
    this.shaderAttributes.map(({ buffer, attr, count }) => {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer); // 将缓冲区对象绑定到目标
      this.gl.vertexAttribPointer(attr, count, this.gl.FLOAT, false, 0, 0);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    });

    // reBindMatrix
    this.setMatrixs();

    // TODO: 每次渲染的时候重新为纹理分配纹理空间
    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
      this.gl.uniform1i(u_Sampler, 0);
    }
  }

  /**
   * 存储当前网格对象的 unifrom 变量
   * @param {*} location
   * @param {*} type
   * @param {*} currentDataLocation
   */
  addShaderUnifroms(location, type, currentDataLocation) {
    this.shaderUnifroms.push({
      location,
      type,
      currentDataLocation,
    });
  }

  /**
   * 绘制当前的网格对象
   */
  draw(camera: ICamera) {
    // TODO: 在纹理加载过程中或相机不存在时不渲染
    if (this.imgLoading || !camera) return;

    // TODO:  切换程序对象
    this.gl.useProgram(this.program);

    // TODO: reset camera
    this.setCamera(camera);

    // update unifrom
    this.updateShaderUnifroms();

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

  /**
   * 返回顶点着色器代码
   * @returns
   */
  getRectVSHADER() {
    return `
            uniform mat4 u_projMatrix;
            uniform mat4 u_viewMatrix;
            uniform mat4 u_modelMatrix;

            attribute vec4 a_Position;
            attribute vec2 a_TextCoord;
            varying vec2 v_uv;
            void main(){
                v_uv = a_TextCoord;

                gl_Position = u_projMatrix * u_viewMatrix *  u_modelMatrix * a_Position;
           
            }
        `;
  }

  /**
   * 返回片元着色器代码
   * @returns
   */
  getRectFSHADER() {
    let firstLine = 'precision mediump float;\n';
    let gl_FragColorLine = 'gl_FragColor = vec4(v_uv, 1.0, 1.0);\n';
    let unifromLines = [];
    if (this?.material?.map) {
      this.imgLoading = true;

      this.material?.on('loadImage', ({ texture, img }) => {
        this.gl.useProgram(this.program);

        // TODO: cache texture
        this.texture = texture;

        this.gl.activeTexture(this.gl.TEXTURE0); // 激活0号纹理单元
        this.material.texture &&
          this.gl.bindTexture(this.gl.TEXTURE_2D, texture); // 绑定纹理单元

        var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
        this.gl.uniform1i(u_Sampler, 0);

        this.imgLoading = false;

        // setTimeout(() => {
        //     this.scene && this.scene.renderScene()
        // }, 300)
        this.scene && this.scene.renderScene();
      });
      gl_FragColorLine = 'gl_FragColor = texture2D(u_Sampler, v_uv);\n';
    }
    const shader =
      firstLine +
      unifromLines.join('') +
      `
            uniform sampler2D u_Sampler;
            varying vec2 v_uv;
            void main(){
                ` +
      gl_FragColorLine +
      `
            }
        `;
    return shader;
  }
}
