import Object from './Object';
import { IGeometry } from '../geometry/geometry';
import * as glUtils from '../../utils/gl';
import Group from '../group';
import { IScene } from '../scene';
import { ICamera } from '@/utils/camera';
import { distance } from '../../utils/math';
import { Point } from '@/utils/interface';

import BasicMaterial, { IMaterial } from '../material/BasicMaterial';
import Color, { IColor } from '../object/Color';

interface IMeshProps {
  geometry: IGeometry;
  material: IMaterial;
}

export default class Mesh extends Group {
  public scene: IScene;
  public camera: ICamera;

  public imgLoading: boolean = false;
  public texture: WebGLTexture;

  public material: IMaterial = new BasicMaterial({});
  public geometry: IGeometry;

  public shaderAttributes: any[] = [];

  public color: IColor;

  constructor(props: IMeshProps) {
    super(props);
    props.material !== undefined && (this.material = props.material);
    this.geometry = props.geometry;
  }

  init(gl: WebGLRenderingContext, camera: ICamera) {
    this.gl = gl;
    this.camera = camera;

    this.cameraDistance = distance(camera.position, this.position);
    this.material.init(this.gl);

    this.program = glUtils.createProgram(
      this.gl,
      this.getRectVSHADER(),
      this.getRectFSHADER(),
    );
    this.gl.useProgram(this.program);

    let vertices = this.geometry.vertices;

    let uvs = this.geometry.uvs;

    this.color = new Color(this?.material?.color);

    this.setUnifroms();

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(this.gl, 'a_Position', vertices, 2, this.program),
    );
    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(this.gl, 'a_TextCoord', uvs, 2, this.program),
    );

    this.gl.useProgram(null);
  }

  draw(camera: ICamera) {
    console.log('draw1');
    // TODO: 在纹理加载过程中或相机不存在时不渲染
    if (this.imgLoading || !camera) return;

    // TODO:  切换程序对象
    this.gl.useProgram(this.program);
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
