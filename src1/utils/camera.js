import { mat4 } from 'gl-matrix';
import { ViewPort } from './viewport';
// 简单的相机
export default class Camera {
  constructor(props) {
    this.fov = props?.fov || 40;
    this.aspect = props?.aspect || 1;
    this.near = props?.near || 0.01;
    this.far = props?.far || 100;

    this.position = props?.position || [1, 1, 1];
    this.target = props?.target || [0, 0, 0];
    this.up = props?.up || [0, 1, 0];

    this.viewPort = new ViewPort({
      eye: this.position,
      target: this.target,
      up: this.up,
    });

    // 初始化透视矩阵
    this.initPerspectiveMatrix();
  }

  /**
   * 初始化透视矩阵
   */
  initPerspectiveMatrix() {
    this.perspectiveMatrix = mat4.create();
    mat4.perspective(
      this.perspectiveMatrix,
      (this.fov * Math.PI) / 180,
      this.aspect,
      this.near,
      this.far,
    );
  }

  /**
   * 更新透视矩阵
   */
  updatePerspectiveMatrix() {
    this.initPerspectiveMatrix();
  }

  getPerspectiveMatrix() {
    return this.perspectiveMatrix;
  }

  getViewMatrix() {
    return this.viewPort.getViewMatrix();
  }
}
