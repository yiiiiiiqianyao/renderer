import Scene from './components/scene';
import Plane from './components/plane';
import Camera from './utils/camera';

import BasicMaterial from './components/material/BasicMaterial';

import GrayPass from './components/pass/gray';

const Img = require('./assets/pkq.png');
// import Img2 from './assets/i.jpg';
// import Img3 from './assets/baidu.png';
const Img4 = require('./assets/img1.jpg');

export const initGL = function(id: string) {
  let wrap = document.getElementById(id);
  if (wrap) {
    let { clientWidth, clientHeight } = wrap;
    let canvas = document.createElement('canvas');
    let width = clientWidth * window.devicePixelRatio;
    let height = clientHeight * window.devicePixelRatio;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${clientWidth}px`;
    canvas.style.height = `${clientHeight}px`;
    wrap.appendChild(canvas);

    let gl = canvas.getContext('webgl') as WebGLRenderingContext;

    gl.clearColor(1.0, 0.0, 0.0, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST); // 开启深度检测
    gl.clear(gl.DEPTH_BUFFER_BIT); // 清除深度缓存

    gl.enable(gl.BLEND); // 开启混合
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // 指定混合函数

    gl.enable(gl.CULL_FACE); // 开启背面剔除
    gl.disable(gl.CULL_FACE); // 关闭背面剔除

    let mat1 = new BasicMaterial({
      gl,
      color: 'blue',
      map: Img,
    });

    let mat2 = new BasicMaterial({
      gl,
      color: 'blue',
      map: Img4,
    });

    let scene = new Scene({
      gl,
      position: [1, 0, 0],
    });

    let camera = new Camera({
      position: [4, 4, 4],
    });

    let plane = new Plane({
      gl,
      camera,
      width: 1,
      height: 1,
      position: [2, 0, 0],
      rotation: [0, 0.3, 0],
      material: mat1,
    });

    let plane2 = new Plane({
      gl,
      camera,
      width: 0.5,
      height: 0.5,
      position: [0.3, 0, 0.4],
      material: mat2,
    });

    let plane3 = new Plane({
      gl,
      camera,
      position: [0.3, 0, -0.4],
      rotation: [Math.PI / 2, 0, 0],
    });

    scene.add(plane);
    scene.add(plane2);
    scene.add(plane3);

    scene.renderScene();
    // scene.setTranslete([1, 0, 0])

    // add test pass - webgl1
    const grayPass = new GrayPass({ gl });
    scene.addPass(grayPass);

    let r = 0;
    animate();
    function animate() {
      r += 0.01;
      plane && plane.setRotate([0, r, 0]); // 通过设置网格角度来更新旋转角度
      plane2 && plane2.setRotate([r, 0, 0]); // 通过设置网格角度来更新旋转角度
      plane && plane.rotate([0, 0.02, 0]); // 通过旋转网格来更新旋转角度

      // scene.rotate([0, -0.01, 0])
      // plane && plane.setTranslete([-Math.sin(r)/2, 0, -Math.cos(r)/2])

      scene.setTranslete([Math.sin(r) * 1, 0, Math.cos(r) * 1]);

      scene.renderScene();

      requestAnimationFrame(animate);
    }
  }
};
