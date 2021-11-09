// @ts-nocheck
import * as glUtils from '../../utils/gl';
import Geometry from './geometry';
import { ICamera } from '../../utils/camera';
import BasicMaterial, { IBasicMaterial } from '../material/BasicMaterial';
import {
  initBoxGeometryVertices,
  initBoxGeometryColors,
  initBoxGeometryIndices,
} from '../utils/geoVertices';
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

  setAttributes(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(gl, 'a_Position', this.vertices, 3, program),
    );

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(gl, 'a_Color', this.colors, 3, program),
    );

    this.indicesBuffer = glUtils.bindAttriIndicesBuffer(gl, this.indices);
  }

  drawCommand({ gl, geometry }) {
    gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_BYTE, 0);
  }
}
