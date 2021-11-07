import { ICamera } from '@/utils/camera';
import { mat4 } from 'gl-matrix';
import * as glUtils from '../../utils/gl';
import Group from '../group';
import { IScene } from '../scene';
import Color, { IColor } from '../object/Color';
export default class Plane extends Group {
  public type: string = 'PlaneMesh';
  public scene: IScene;
  public camera: ICamera;
  public color: IColor;

  public material: any;
  public width: number = 1;
  public height: number = 1;

  public imgLoading: boolean = false;

  public shaderUnifroms: any[];
  public shaderAttributes: any[];

  public program: WebGLProgram;
  public texture: WebGLTexture;

  constructor(props: any) {
    super(props);

    this.material = props?.material;
    props.width !== undefined && (this.width = props.width);
    props.height !== undefined && (this.height = props.height);

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
    this.color = new Color(this?.material?.color);

    this.setUnifroms();

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
   * 设置当前着色器的 uniform 变量
   */
  setUnifroms() {
    this.projMatrix = this.camera.getPerspectiveMatrix();
    glUtils.bindUnifrom(
      this.gl,
      'u_projMatrix',
      this.projMatrix,
      this.program,
      'mat4',
    );

    this.viewMatrix = this.camera.getViewMatrix();
    glUtils.bindUnifrom(
      this.gl,
      'u_viewMatrix',
      this.viewMatrix,
      this.program,
      'mat4',
    );

    glUtils.bindUnifrom(
      this.gl,
      'u_modelMatrix',
      this.modelMatrix,
      this.program,
      'mat4',
    );

    glUtils.bindUnifrom(
      this.gl,
      'u_opacity',
      this?.material?.opacity !== undefined ? this?.material?.opacity : 1.0,
      this.program,
      'float',
    );

    glUtils.bindUnifrom(
      this.gl,
      'u_color',
      this.color.getRGB(),
      this.program,
      'vec3',
    );

    // uniformName, data, vec
  }

  /**
   * 更新 shader 的 uniform 变量的值
   */
  updateShaderUnifroms() {
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
    let gl_FragColorLine = 'gl_FragColor = vec4(u_color, u_opacity);\n';

    let unifromLines = ['uniform float u_opacity;\n', 'uniform vec3 u_color;'];

    if (this?.material?.map) {
      this.imgLoading = true;
      unifromLines.push('uniform sampler2D u_Sampler;\n');
      // @ts-ignore
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

        this.scene && this.scene.renderScene();
      });
      gl_FragColorLine = 'gl_FragColor = texture2D(u_Sampler, v_uv);\n';
    }
    // TODO: 拼装 shader
    const shader =
      firstLine +
      unifromLines.join('') +
      `
      varying vec2 v_uv;
      void main(){
        ${gl_FragColorLine}
        gl_FragColor.a *= u_opacity;
      }
      `;
    return shader;
  }
}
