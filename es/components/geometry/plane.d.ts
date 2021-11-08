import { ICamera } from '@/utils/camera';
import Group from '../group';
import { IScene } from '../scene';
import { IColor } from '../object/Color';
import { IBasicMaterial } from '../material/BasicMaterial';
export default class Plane extends Group {
  type: string;
  scene: IScene;
  camera: ICamera;
  color: IColor;
  material: IBasicMaterial;
  width: number;
  height: number;
  imgLoading: boolean;
  shaderUnifroms: any[];
  shaderAttributes: any[];
  program: WebGLProgram;
  texture: WebGLTexture;
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
  getRectVSHADER(): string;
  /**
   * 返回片元着色器代码
   * @returns
   */
  getRectFSHADER(): string;
}
