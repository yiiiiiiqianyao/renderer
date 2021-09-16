
// 场景类 主要是管理场景中所有的网格
export default class Scene {
    constructor(gl) {
        this.gl = gl
        this.meshList = []
    }

    addMesh(mesh) {
        this.meshList.push(mesh)
    }

    removeMesh(meshId) {
        // this.meshList.
    } 

    renderScene() {
        this.meshList.map(mesh => mesh.draw())
    }
}