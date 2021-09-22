
import Scene from './components/scene'
import Plane from './components/plane'
import Camera from './utils/camera'
// 测试的入口

export function init(gl) {
 
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.enable(gl.DEPTH_TEST)        // 开启深度检测
    gl.clear(gl.DEPTH_BUFFER_BIT)   // 清除深度缓存

    // gl.enable(gl.CULL_FACE) // 开启背面剔除
    // gl.disable(gl.CULL_FACE) // 关闭背面剔除

    let scene = new Scene({
        gl,
        position: [1, 0, 0],
    })

    let camera = new Camera({
        position: [4, 4, 4]
    })

    let plane = new Plane({ 
        gl, 
        camera,
        position: [2, 0, 0],
        rotation: [0, 0.3, 0],
        // angle: [0, 90, 0]
    })

    let plane2 = new Plane({ 
        gl, 
        camera,
        position: [0.3, 0, 0.4]
    })

    let plane3 = new Plane({ 
        gl, 
        camera,
        position: [0.3, 0, -0.4]
    })

    scene.addChildren(plane)
    // scene.addChildren(plane2)
    // scene.addChildren(plane3)

    // scene.renderScene()

    // scene.rotate([0, 0.02, 0])
    // scene.updateModelMatrix()

    scene.renderScene()

    let r = 0
    animate()
    function animate() {
        r += 0.01
        // plane.setRotationY(r)           // 通过设置网格角度来更新旋转角度
        // plane.rotate([0, 0.02, 0])         // 通过旋转网格来更新旋转角度

        // scene.rotate([0, -0.01, 0])
        // plane.setTranslete([-Math.sin(r)/2, 0, -Math.cos(r)/2])

        // scene.setTranslete([Math.sin(r), 0, Math.cos(r)])
        scene.rotate([0, 0.02, 0])
        // scene.updateModelMatrix()

        scene.renderScene()
        requestAnimationFrame(animate)
    }
}



