// @ts-nocheck
import Group from '../group';
// 场景类 主要是管理场景中所有的网格
export default class Scene extends Group {
  constructor(props) {
    super(props);
    this.type = 'Scene';
    this.gl = props.gl;

    // pass manager - for now
    this.passList = [];
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

      // 复写 add 方法
      mesh.scene = this;
    }
  }

  /**
   * 增加后处理 pass
   * @param {*} pass
   */
  addPass(pass) {
    this.passList.push(pass);
  }

  renderScene() {
    if (this.passList.length > 0) {
      for (let i = 0; i < this.passList.length; i++) {
        let pass = this.passList[i];
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, pass.framebuffer);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        if (i === 0) {
          // 将场景内容绘制到 pass framebuffer
          this.childrens.map(mesh => mesh.draw());
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
      this.childrens.map(mesh => mesh.draw());
    }
  }
}
