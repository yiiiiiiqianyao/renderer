// @ts-nocheck
import { mat4 } from 'gl-matrix';
/**
 * 视图
 */
export class ViewPort {
  constructor(props) {
    this.eye = props?.eye || [1, 1, 1];
    this.target = props?.target || [0, 0, 0];
    this.up = props?.up || [0, 1, 0];

    this.viewMatrix = mat4.create();
    this.initViewMatrix();
  }

  initViewMatrix() {
    mat4.lookAt(this.viewMatrix, this.eye, this.target, this.up);
  }

  getViewMatrix() {
    return this.viewMatrix;
  }
}
