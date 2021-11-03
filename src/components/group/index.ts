// @ts-nocheck
import { mat4, vec3 } from 'gl-matrix';
import { generateUUID } from '../../utils/math';
export default class Group {
  constructor(props) {
    this.uuid = generateUUID();

    this.gl = props.gl;
    this.position = props?.position || [0, 0, 0];
    this.rotation = props?.rotation || [0, 0, 0];
    this.scale = props?.scale || [1, 1, 1];

    // 存储子对象
    this.childrens = [];

    this.setMeshMatrixs();
    this.modelMatrix = this.initModelMatrix();
  }

  /**
   * 设置网格的矩阵
   */
  setMeshMatrixs() {
    this.setTranslete(this.position);
    this.setRotate();
    this.setScaleMatrix();
  }

  /**
   * 设置移动
   * @param {*} position
   */
  setTranslete(position) {
    this.translateMatrix = mat4.create();
    mat4.translate(this.translateMatrix, this.translateMatrix, position);

    if (this.rotateMatrix && this.scaleMatrix) {
      this.updateModelMatrix();
    }
  }

  /**
   * 设置旋转矩阵
   */
  setRotate(rotation) {
    if (rotation) {
      this.rotation = [...rotation];
    }
    this.rotateMatrix = mat4.create();

    mat4.rotate(
      this.rotateMatrix,
      this.rotateMatrix,
      this.rotation[0],
      vec3.fromValues(1, 0, 0),
    );
    mat4.rotate(
      this.rotateMatrix,
      this.rotateMatrix,
      this.rotation[1],
      vec3.fromValues(0, 1, 0),
    );
    mat4.rotate(
      this.rotateMatrix,
      this.rotateMatrix,
      this.rotation[2],
      vec3.fromValues(0, 0, 1),
    );

    if (this.translateMatrix && this.scaleMatrix) {
      this.updateModelMatrix();
    }
  }

  /**
   * 设置缩放矩阵
   */
  setScaleMatrix() {
    this.scaleMatrix = mat4.create();
  }

  /**
   * 初始化模型矩阵
   * @returns
   */
  initModelMatrix() {
    return mat4.multiply(
      mat4.create(),
      this.scaleMatrix,
      mat4.multiply(mat4.create(), this.translateMatrix, this.rotateMatrix),
    );
  }

  /**
   * 更新模型网格本身的模型矩阵、同时应用父级的模型矩阵
   */
  updateModelMatrix() {
    mat4.multiply(
      this.modelMatrix,
      this.scaleMatrix,
      mat4.multiply(mat4.create(), this.translateMatrix, this.rotateMatrix),
    );
    let parentMatrix = this?.parent?.modelMatrix || mat4.create();
    mat4.multiply(this.modelMatrix, parentMatrix, this.modelMatrix);

    // 更新子节点的矩阵
    this.childrens.map(child => child.updateModelMatrix());
  }

  /**
   * 设置网格绕轴旋转
   * @param {*} rotateValues
   */
  rotate(rotateValues) {
    // 更新网格本身记录的旋转角度
    this.rotation[0] += rotateValues[0];
    this.rotation[1] += rotateValues[1];
    this.rotation[2] += rotateValues[2];

    // 更新旋转矩阵
    mat4.rotateX(this.rotateMatrix, this.rotateMatrix, rotateValues[0]);
    mat4.rotateY(this.rotateMatrix, this.rotateMatrix, rotateValues[1]);
    mat4.rotateZ(this.rotateMatrix, this.rotateMatrix, rotateValues[2]);

    // 更新模型矩阵
    this.updateModelMatrix();
  }

  /**
   * 增加子对象
   * @param {*} mesh
   */
  add(mesh) {
    // TODO: 判断当前对象的子节点中不存在 mesh
    if (!this.hasChildren(mesh)) {
      mesh.parent && mesh.parent.remove(mesh);
      mesh.setParent(this);
      this.childrens.push(mesh);
    }
  }

  /**
   * 判断当前对象的子节点中是否存在对象 object
   * @param {*} object
   * @returns
   */
  hasChildren(object) {
    if (object.uuid) {
      return (
        this.childrens.filter(child => child.uuid === object.uuid).length > 0
      );
    }
    return false;
  }

  /**
   * 设置 parent 节点
   * @param {*} parent | undefined
   */
  setParent(parent) {
    this.parent = parent;
  }

  /**
   * 移除子对象
   * @param {*} uuid
   */
  remove(uuid) {
    this.childrens = this.childrens.filter(child => {
      if (child.uuid === uuid) {
        child.setParent(undefined);
      }
      return child.uuid !== uuid;
    });
  }
}
