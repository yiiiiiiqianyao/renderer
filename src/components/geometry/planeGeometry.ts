import * as glUtils from '../../utils/gl';
import Geometry from './geometry';
import {
  initPlaneGeometryVertices,
  initPlaneGeometryUvs,
} from '../utils/geoVertices';
import { IMesh } from '../object/Mesh';
export default class PlaneGeometry extends Geometry {
  public type: string = 'PlaneMesh';

  public width: number = 1;
  public height: number = 1;

  public shaderAttributes: any[];

  constructor(props: any) {
    super(props);

    props.width !== undefined && (this.width = props.width);
    props.height !== undefined && (this.height = props.height);

    // 当前对象的 shader 变量参数列表
    this.shaderAttributes = [];

    this.vertices = initPlaneGeometryVertices(this.width, this.height);
    this.uvs = initPlaneGeometryUvs();
  }

  setAttributes(gl: WebGLRenderingContext, program: WebGLProgram) {
    let vertices = this.vertices;
    let uvs = this.uvs;

    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(gl, 'a_Position', vertices, 2, program),
    );
    this.shaderAttributes.push(
      glUtils.bindAttriBuffer(gl, 'a_TextCoord', uvs, 2, program),
    );
  }

  drawCommand({ gl }: IMesh) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
