import { ICamera } from '../../utils/camera';
import { IPass } from '../pass/gray';
import Group from '../group';
export interface IScene {
  renderScene(): void;
}
export default class Scene extends Group implements IScene {
  type: string;
  gl: WebGLRenderingContext;
  camera: ICamera;
  passList: IPass[];
  children: any[];
  constructor(props: any);
  /**
   * 增加子对象
   * @param {*} mesh
   */
  add(mesh: any): void;
  setCamera(camera: ICamera): void;
  setRenderer(): void;
  /**
   * 增加后处理 pass
   * @param {*} pass
   */
  addPass(pass: IPass): void;
  /**
   * 绘制场景中所有的对象
   */
  drawElements(): void;
  renderScene(): void;
}
