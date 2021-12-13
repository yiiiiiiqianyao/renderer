import React from 'react';
import * as SR from '@yiqianyao/renderer';
const Img = require('./assets/pkq.png');
const Img4 = require('./assets/img1.jpg');

export default () => {
  React.useEffect(() => {
    let renderer = new SR.Renderer({
      wrap: 'wrap',
      clearColor: new SR.Color([1, 0, 0, 1]),
    });

    let mat1 = new SR.PlaneMaterial({
      color: 'blue',
      map: Img,
    });

    let mat2 = new SR.PlaneMaterial({
      color: 'blue',
      map: Img4,
    });

    let mat3 = new SR.PlaneMaterial({
      color: 'blue',
      transparent: true,
      opacity: 0.6,
    });

    let camera = new SR.Camera({
      target: [2, 1, 0],
      position: [5, 2, 5],
      aspect: renderer.renderPixelWidth / renderer.renderPixelHeight,
    });

    let scene = new SR.Scene({
      position: [0, 0, 0],
      camera,
      renderer,
    });

    let plane = new SR.PlaneGeometry({
      width: 1,
      height: 1,
    });

    let plane2 = new SR.PlaneGeometry({
      width: 0.5,
      height: 0.5,
    });

    let plane3 = new SR.PlaneGeometry({});

    let mesh1 = new SR.Mesh({
      geometry: plane,
      material: mat1,
      position: [-1, 0, 0],
      rotation: [0, 0.3, 0],
    });
    scene.add(mesh1);

    let mesh2 = new SR.Mesh({
      geometry: plane2,
      material: mat2,
      position: [-0.3, 0, 2],
    });
    scene.add(mesh2);

    let mesh3 = new SR.Mesh({
      geometry: plane3,
      material: mat3,
      position: [1, 0, 0.4],
      rotation: [Math.PI / 2, 0, 0],
    });
    scene.add(mesh3);

    scene.renderScene();

    window.addEventListener('resize', () => {
      renderer.resize();
      camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);

      scene.renderScene();
    });
    setTimeout(() => {
      renderer.resize();
      camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);
    });
    renderer.resize();
    camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);

    // scene.setTranslete([1, 0, 0])

    // add test pass - webgl1
    const bloomPass = new SR.BloomPass({});
    scene.addPass(bloomPass);

    let r = 0;
    animate();
    function animate() {
      r += 0.01;
      mesh1 && mesh1.setRotate([0, r, 0]); // 通过设置网格角度来更新旋转角度
      mesh2 && mesh2.setRotate([r, 0, 0]); // 通过设置网格角度来更新旋转角度
      mesh3 && mesh3.rotate([0, 0.02, 0]); // 通过旋转网格来更新旋转角度

      scene.rotate([0, 0.01, 0]);
      // plane && plane.setTranslete([-Math.sin(r)/2, 0, -Math.cos(r)/2])

      // scene.setTranslete([Math.sin(r) * 1, 0, Math.cos(r) * 1]);

      scene.renderScene();

      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <div
      style={{
        height: '400px',
        position: 'relative',
      }}
      id="wrap"
    ></div>
  );
};
