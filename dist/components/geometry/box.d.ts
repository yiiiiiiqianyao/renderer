import Group from '../group';
import { ICamera } from '../../utils/camera';
export default class Box extends Group {
  type: string;
  shaderAttributes: any[];
  indices: Uint8Array | null;
  indicesBuffer: WebGLBuffer | null;
  constructor(props: any);
  init(gl: WebGLRenderingContext, camera: ICamera): void;
  /**
   * @param camera
   */
  setCamera(camera: ICamera): void;
  /**
   * 设置当前着色器的 uniform 变量
   */
  setUnifroms(): void;
  /**
   * 更新 shader 的 attribute/uniform 变量的值
   */
  updateAttributeUnifroms(): void;
  /**
   * 存储当前网格对象的 unifrom 变量
   */
  addShaderUnifroms(uniformName: string, data: any, vec: string): void;
  /**
   * 绘制当前的网格对象
   */
  draw(camera: ICamera): void;
  /**
   * 返回顶点着色器代码
   * @returns
   */
  getCubeVSHADER(): string;
  /**
   * 返回片元着色器代码
   * @returns
   */
  getCubeFSHADER(): string;
}
