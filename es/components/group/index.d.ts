import { Point } from '@/utils/interface';
import { mat4 } from 'gl-matrix';
export default class Group {
  uuid: string;
  gl: WebGLRenderingContext;
  projMatrix: mat4;
  viewMatrix: mat4;
  modelMatrix: mat4;
  position: Point;
  cameraDistance: number;
  constructor(props: any);
  /**
   * 设置网格的矩阵
   */
  setMeshMatrixs(): void;
  /**
   * 设置移动
   * @param {*} position
   */
  setTranslete(position: any): void;
  /**
   * 设置旋转矩阵
   */
  setRotate(rotation: any): void;
  /**
   * 设置缩放矩阵
   */
  setScaleMatrix(): void;
  /**
   * 初始化模型矩阵
   * @returns
   */
  initModelMatrix(): mat4;
  /**
   * 更新模型网格本身的模型矩阵、同时应用父级的模型矩阵
   */
  updateModelMatrix(): void;
  /**
   * 设置网格绕轴旋转
   * @param {*} rotateValues
   */
  rotate(rotateValues: any): void;
  /**
   * 增加子对象
   * @param {*} mesh
   */
  add(mesh: any): void;
  /**
   * 判断当前对象的子节点中是否存在对象 object
   * @param {*} object
   * @returns
   */
  hasChildren(object: any): boolean;
  /**
   * 设置 parent 节点
   * @param {*} parent | undefined
   */
  setParent(parent: any): void;
  /**
   * 移除子对象
   * @param {*} uuid
   */
  remove(uuid: any): void;
}
