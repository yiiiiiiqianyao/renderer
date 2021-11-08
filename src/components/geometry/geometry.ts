import Group from '../group';

interface IGeometryProps {}

export interface IGeometry {
  indices: Uint8Array;
  indicesBuffer: WebGLBuffer | null;
  vertices: Float32Array;
  colors: Float32Array;
  uvs: Float32Array;
}

export default class Geometry extends Group {
  public indices: Uint8Array | null;
  public indicesBuffer: WebGLBuffer | null;
  public vertices: Float32Array;
  public colors: Float32Array | null;
  public uvs: Float32Array;

  constructor(props: IGeometryProps) {
    super(props);
  }
}
