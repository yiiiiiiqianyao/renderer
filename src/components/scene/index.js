
import Group from '../group'
// 场景类 主要是管理场景中所有的网格
export default class Scene extends Group{
    constructor(props) {
        super(props)
        this.type = 'Scene'
    }

    renderScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        this.childrens.map(mesh => mesh.draw())
    }
}