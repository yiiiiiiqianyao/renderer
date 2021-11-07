import React from 'react';
import * as SR from 'renderer';
const Img = require('./assets/pkq.png');
const Img4 = require('./assets/img1.jpg');

export default () => {
  React.useEffect(() => {
    let renderer = new SR.Renderer({
      wrap: 'wrap',
      clearColor: new SR.Color([0, 0, 0, 1]),
    });

    let mat1 = new SR.BasicMaterial({
      color: 'green',
    });

    let mat2 = new SR.BasicMaterial({
      transparent: true,
      opacity: 0.6,
    });

    let mat3 = new SR.BasicMaterial({
      color: 'blue',
      transparent: true,
      opacity: 0.6,
    });

    let camera = new SR.Camera({
      target: [0, 0, 0],
      position: [0, 1, 5],
      aspect: renderer.renderPixelWidth / renderer.renderPixelHeight,
    });

    let scene = new SR.Scene({
      position: [0, 0, 0],
      camera,
      renderer,
    });

    let plane = new SR.Plane({
      width: 1,
      height: 1,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      material: mat1,
    });

    let plane2 = new SR.Plane({
      width: 0.5,
      height: 0.5,
      position: [0, 0, 1],
      material: mat2,
    });

    let plane3 = new SR.Plane({
      height: 0.5,
      position: [0, 0, 2],
      rotation: [0, 0, 0],
      material: mat3,
    });

    scene.add(plane);

    // renderer.gl.depthMask(false);

    scene.add(plane3);
    scene.add(plane2);

    // renderer.gl.depthMask(true);

    scene.renderScene();

    window.addEventListener('resize', () => {
      renderer.resize();
      camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);

      scene.renderScene();
    });

    let r = 0;
    animate();
    function animate() {
      r += 0.01;
      plane && plane.setRotate([0, r, 0]); // 通过设置网格角度来更新旋转角度
      plane2 && plane2.setRotate([r, 0, 0]); // 通过设置网格角度来更新旋转角度
      plane3 && plane3.rotate([0, 0.02, 0]); // 通过旋转网格来更新旋转角度

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
