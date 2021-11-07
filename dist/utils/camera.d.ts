import { mat4 } from 'gl-matrix';
import { Point } from './interface';
export interface ICamera {
  position: Point;
  getViewMatrix(): mat4;
  getPerspectiveMatrix(): mat4;
}
export default class Camera implements ICamera {
  position: number[];
  aspect: number;
  constructor(props: any);
  /**
   * 初始化透视矩阵
   */
  initPerspectiveMatrix(): void;
  resize(width: number, height: number): void;
  /**
   * 更新透视矩阵
   */
  updatePerspectiveMatrix(): void;
  getPerspectiveMatrix(): any;
  getViewMatrix(): any;
}
