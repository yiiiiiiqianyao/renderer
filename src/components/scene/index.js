
import Group from '../group'
// 场景类 主要是管理场景中所有的网格
export default class Scene extends Group{
    constructor(props) {
        super(props)
        this.type = 'Scene'

    }

    /**
     * 增加子对象
     * @param {*} mesh 
     */
     add(mesh) {
        // TODO: 判断当前对象的子节点中不存在 mesh
        if(!this.hasChildren(mesh)) {
            mesh.parent && mesh.parent.remove(mesh)
            mesh.setParent(this)
            this.childrens.push(mesh)

            // 复写 add 方法
            mesh.scene = this
        }
    }

    renderScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)
        this.childrens.map(mesh => mesh.draw())
    }
}