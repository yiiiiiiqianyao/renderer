import React from 'react';
import * as SR from '@yiqianyao/renderer';

export default () => {
  React.useEffect(() => {
    let renderer = new SR.Renderer({
      wrap: 'wrap',
      clearColor: new SR.Color([0, 0, 0, 1]),
    });

    let camera = new SR.Camera({
      target: [0, 0, 0],
      position: [5, 2, 5],
      aspect: renderer.renderPixelWidth / renderer.renderPixelHeight,
    });

    let scene = new SR.Scene({
      position: [0, 0, 0],
      camera,
      renderer,
    });

    let box = new SR.BoxGeometry({});
    let material = new SR.BoxMaterial({});

    let mesh = new SR.Mesh({
      geometry: box,
      material,
    });
    scene.add(mesh);

    scene.renderScene();

    window.addEventListener('resize', () => {
      renderer.resize();
      camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);

      scene.renderScene();
    });
    // scene.setTranslete([1, 0, 0])

    // add test pass - webgl1
    // const grayPass = new SR.GrayPass({  });
    // scene.addPass(grayPass);

    let r = 0;
    animate();
    function animate() {
      r += 0.01;
      mesh && mesh.setRotate([0, r, 0]);

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
