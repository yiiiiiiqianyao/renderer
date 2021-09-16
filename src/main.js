
import Plane from './components/plane'
import Camera from './utils/camera'
// 测试的入口
export function init(gl) {
 
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.disable(gl.CULL_FACE)

    let camera = new Camera({
        position: [2, 2, 2]
    })

    let plane = new Plane({ gl, camera })

    let scene = [plane]

    scene.map(mesh => mesh.draw())
}

