import React from 'react';
import * as SR from '@yiqianyao/renderer';

export default () => {
  React.useEffect(() => {
    let renderer = new SR.Renderer({
      wrap: 'wrap',
      clearColor: new SR.Color([0, 0, 0, 1]),
    });

    let camera = new SR.Camera({
      // target: [0, 0, 0],
      // position: [2, 2, 3],
      position: [0, 0, 3],
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

    let mat1 = new SR.PlaneMaterial({
      color: 'green',
    });

    let wind = new SR.Wind({
      gl: renderer.gl,
      geometry: plane,
      material: mat1,
    });
    // wind png
    // https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*wcU8S5xMEDYAAAAAAAAAAAAAARQnAQ

    // wind data
    // https://gw.alipayobjects.com/os/bmw-prod/6221fac6-4658-4e02-92a3-8625b35cdca9.json

    const windData = {
      source: 'http://nomads.ncep.noaa.gov',
      date: '2016-11-20T00:00Z',
      width: 360,
      height: 180,
      uMin: -21.32,
      uMax: 26.8,
      vMin: -21.57,
      vMax: 21.42,
    };

    const windImage = new Image();
    windImage.crossOrigin = '';
    windData.image = windImage;
    windImage.src =
      'https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*wcU8S5xMEDYAAAAAAAAAAAAAARQnAQ';
    windImage.onload = function() {
      wind.setWind(windData);
      scene.add(wind);
      scene.renderScene();
      scene.renderScene();
    };

    scene.renderScene();

    window.addEventListener('resize', () => {
      renderer.resize();

      camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);

      scene.renderScene();

      wind.reload();
    });
    setTimeout(() => {
      renderer.resize();
      camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);
    });
    renderer.resize();
    camera.resize(renderer.renderPixelWidth, renderer.renderPixelHeight);

    animate();
    function animate() {
      scene.renderScene();

      wind && wind.rotate([0, 0.005, 0]);

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
