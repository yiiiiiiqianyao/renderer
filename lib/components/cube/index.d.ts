import Group from '../group';
export default class Cube extends Group {
  type: string;
  constructor(props: any);
  init(): void;
  /**
   * 设置当前网格的矩阵、同时将矩阵传递给着色器
   */
  setMatrixs(): void;
  /**
   * 更新 shader 的 uniform 变量的值
   */
  updateShaderUnifroms(): void;
  /**
   * 存储当前网格对象的 unifrom 变量
   * @param {*} location
   * @param {*} type
   * @param {*} currentDataLocation
   */
  addShaderUnifroms(
    location: any,
    type: any,
    currentDataLocation: any,
    vec: any,
  ): void;
  /**
   * 绘制当前的网格对象
   */
  draw(): void;
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
