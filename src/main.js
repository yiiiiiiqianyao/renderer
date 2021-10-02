
import Scene from './components/scene'
import Plane from './components/plane'
import Camera from './utils/camera'

import BasicMaterial from './components/material/BasicMaterial'
import Img from './assets/pkq.png'
import Img2 from './assets/i.jpg'
import Img3 from './assets/baidu.png'
import Img4 from './assets/img1.jpg'
// 目前需要只支持图片大小为 2 的倍数


// 测试的入口

export function init(gl) {
 
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.enable(gl.DEPTH_TEST)        // 开启深度检测
    gl.clear(gl.DEPTH_BUFFER_BIT)   // 清除深度缓存


    gl.enable(gl.BLEND) // 开启混合
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // 指定混合函数

    gl.enable(gl.CULL_FACE) // 开启背面剔除
    gl.disable(gl.CULL_FACE) // 关闭背面剔除

    let mat1 = new BasicMaterial({
        gl,
        color: 'blue',
        map: Img
    })

    let mat2 = new BasicMaterial({
        gl,
        color: 'blue',
        map: Img4
    })

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
        material: mat1
    })

    let plane2 = new Plane({ 
        gl, 
        camera,
        position: [0.3, 0, 0.4],
        material: mat2
    })

    let plane3 = new Plane({ 
        gl, 
        camera,
        position: [0.3, 0, -0.4]
    })

    scene.add(plane)
    scene.add(plane2)
    scene.add(plane3)

    // scene.renderScene()

    let r = 0
    animate()
    function animate() {
        r += 0.01
        // plane.setRotationY(r)           // 通过设置网格角度来更新旋转角度
        plane && plane.rotate([0, 0.02, 0])         // 通过旋转网格来更新旋转角度

        // scene.rotate([0, -0.01, 0])
        // plane.setTranslete([-Math.sin(r)/2, 0, -Math.cos(r)/2])

        // scene.setTranslete([Math.sin(r), 0, Math.cos(r)])
        scene.rotate([0, 0.02, 0])
        // scene.updateModelMatrix()

        scene.renderScene()

        // plane.draw()
        requestAnimationFrame(animate)
    }
}



