// @ts-nocheck
import { ICamera } from '../../utils/camera';
import { IPass } from '../pass/gray';
import Group from '../group';
import { distance } from '@/utils/math';
// 场景类 主要是管理场景中所有的网格
export interface IScene {
  renderScene(): void;
}

interface ISceneProps {}
export default class Scene extends Group implements IScene {
  public type: string = 'Scene';
  public gl: WebGLRenderingContext;
  public camera: ICamera;
  public passList: IPass[];
  public children: any[] = [];

  constructor(props) {
    super(props);

    this.renderer = props.renderer;
    this.gl = this.renderer.gl;
    this.camera = props.camera;

    // pass manager - for now
    this.passList = [];
  }

  /**
   * 增加子对象
   * @param {*} mesh
   */
  add(mesh) {
    mesh.init(this.gl, this.camera, this);

    // TODO: 判断当前对象的子节点中不存在 mesh
    if (!this.hasChildren(mesh)) {
      mesh.parent && mesh.parent.remove(mesh);
      mesh.setParent(this);
      this.children.push(mesh);

      // 复写 add 方法
      mesh.scene = this;
    }
  }

  setCamera(camera: ICamera) {
    this.camera = camera;
  }

  setRenderer() {}

  /**
   * 增加后处理 pass
   * @param {*} pass
   */
  addPass(pass: IPass) {
    pass.init(this.gl);
    this.passList.push(pass);
  }

  /**
   * 绘制场景中所有的对象
   */
  drawElements() {
    // 绘制透明物体 - 简单的透明绘制排序
    let unTransparentMeshes = []; // 不透明 mesh
    let transparentMeshes = []; // 透明 mesh

    this.children.forEach(mesh => {
      mesh.cameraDistance = distance(mesh.position, this.camera.position);

      if (mesh?.material?.transparent) {
        transparentMeshes.push(mesh);
      } else {
        unTransparentMeshes.push(mesh);
      }
    });

    unTransparentMeshes.sort((a, b) => a.cameraDistance - b.cameraDistance);

    unTransparentMeshes.map(mesh => mesh.draw(this.camera));

    this.gl.depthMask(false);

    transparentMeshes.map(mesh => mesh.draw(this.camera));

    this.gl.depthMask(true);
  }

  renderScene() {
    if (this.passList.length > 0) {
      for (let i = 0; i < this.passList.length; i++) {
        let pass = this.passList[i];
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, pass.framebuffer);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        if (i === 0) {
          // 将场景内容绘制到 pass framebuffer
          this.drawElements();
        } else {
          // 将场景内容会到链接的 pass framebuffer
          // Tip: 还未完善
        }

        // 将 pass 中的结果绘制到 default framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        pass.drawPass();
      }
    } else {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.drawElements();
    }
  }
}
