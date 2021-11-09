import Group from '../group';
import { IMesh } from '../object/Mesh';

interface IGeometryProps {}

export interface IGeometry {
  indices: Uint8Array;
  indicesBuffer: WebGLBuffer | null;
  vertices: Float32Array;
  colors: Float32Array;
  uvs: Float32Array;

  updateAttribute(gl: WebGLRenderingContext): void;
  setAttributes(gl: WebGLRenderingContext, program: WebGLProgram): void;
  drawCommand(mesh: IMesh): void;
}

export default class Geometry extends Group {
  public indices: Uint8Array | null;
  public indicesBuffer: WebGLBuffer | null;
  public vertices: Float32Array;
  public colors: Float32Array | null;
  public uvs: Float32Array;

  public shaderAttributes: any[];

  constructor(props: IGeometryProps) {
    super(props);
  }

  /**
   * 更新 shader 的 attribute 变量的值
   */
  updateAttribute(gl: WebGLRenderingContext) {
    //  reBindIndices
    if (this.indices && this.indicesBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    }

    // reBindBuffer
    this.shaderAttributes.map(({ buffer, attr, count }) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 将缓冲区对象绑定到目标
      gl.vertexAttribPointer(attr, count, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    });
  }
}
