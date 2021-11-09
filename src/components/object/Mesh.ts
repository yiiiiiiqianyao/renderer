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

export interface IMesh {
  gl: WebGLRenderingContext;
  geometry: IGeometry;
}
interface IMeshProps {
  geometry: IGeometry;
  material: IMaterial;
}

export default class Mesh extends Group implements IMesh {
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

  init(gl: WebGLRenderingContext, camera: ICamera, scene: IScene) {
    this.gl = gl;
    this.camera = camera;
    this.scene = scene;

    this.cameraDistance = distance(camera.position, this.position);
    this.material.init(this.gl, this.scene);

    this.program = glUtils.createProgram(
      this.gl,
      this.material.getVShader(),
      this.material.getFShader(),
    );
    this.gl.useProgram(this.program);

    this.setUnifroms();

    this.geometry.setAttributes(this.gl, this.program);

    this.gl.useProgram(null);
  }

  draw(camera: ICamera) {
    // TODO: 在纹理加载过程中或相机不存在时不渲染
    if (this.material.imgLoading || !camera) return;

    // TODO:  切换程序对象
    this.gl.useProgram(this.program);

    // TODO: reset camera
    this.setCamera(camera);

    // update unifrom
    this.geometry.updateAttribute(this.gl);

    // reBindUnifrom
    this.setUnifroms();

    this.geometry.drawCommand(this);
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

    if (this.material.color) {
      glUtils.bindUnifrom(
        this.gl,
        'u_color',
        this.material.color.getRGB(),
        this.program,
        'vec3',
      );
    }

    // TODO: 每次渲染的时候重新为纹理分配纹理空间
    if (this.material.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.material.texture);
      var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
      this.gl.uniform1i(u_Sampler, 0);
    }

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
