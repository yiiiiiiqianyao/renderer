// @ts-nocheck
import * as glUtils from '../../utils/gl';
import Geometry from './geometry';
import { distance } from '../../utils/math';
import { ICamera } from '../../utils/camera';
import BasicMaterial, { IBasicMaterial } from '../material/BasicMaterial';
import {
  initBoxGeometryVertices,
  initBoxGeometryColors,
  initBoxGeometryIndices,
} from '../utils/geoVertices';
import { IMesh } from '../object/Mesh';
export default class BoxGeometry extends Geometry {
  public type: string = 'CubeMesh';

  public material: IBasicMaterial = new BasicMaterial({});

  public shaderAttributes: any[];
  public indices: Uint8Array | null;
  public indicesBuffer: WebGLBuffer | null;
  constructor(props) {
    super(props);

    props.material !== undefined && (this.material = props.material);

    // 当前对象的 shader 变量参数列表
    this.shaderAttributes = [];

    this.vertices = initBoxGeometryVertices();

    this.colors = initBoxGeometryColors();

    this.indices = initBoxGeometryIndices();
  }

  init(gl: WebGLRenderingContext, camera: ICamera) {
    this.gl = gl;
    this.camera = camera;

    this.cameraDistance = distance(camera.position, this.position);
    this.material?.init(this.gl, this.scene);

    this.program = glUtils.createProgram(
      this.gl,
      this.getCubeVSHADER(),
      this.getCubeFSHADER(),
    );
    this.gl.useProgram(this.program);

    this.setAttributes(this.gl, this.program);
    this.setUnifroms();
  }

  /**
   * @param camera
   */
  setCamera(camera: ICamera) {
    this.camera = camera;
  }

  setAttributes(gl: WebGLRenderingContext, program: WebGLProgram) {
    // console.log(this.vertices)
    // console.log(this.colors)
    // console.log(this.indices)
    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(gl, 'a_Position', this.vertices, 3, program),
    );

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(gl, 'a_Color', this.colors, 3, program),
    );

    this.indicesBuffer = glUtils.bindAttriIndicesBuffer(gl, this.indices);
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

    // TODO: 每次渲染的时候重新为纹理分配纹理空间
    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      var u_Sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
      this.gl.uniform1i(u_Sampler, 0);
    }
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
  }

  drawCommand({ gl, geometry }) {
    gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_BYTE, 0);
  }

  /**
   * 绘制当前的网格对象
   */
  draw(camera: ICamera) {
    if (this.imgLoading || !camera) return;

    // TODO:  切换程序对象
    this.gl.useProgram(this.program);

    // TODO: reset camera
    this.setCamera(camera);

    // update unifrom
    this.updateAttributeUnifroms();

    // reBindUnifrom
    this.setUnifroms();

    // this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    this.drawCommand({ gl: this.gl, geometry: this });
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
