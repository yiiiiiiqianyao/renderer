import React from 'react';
import { initGL } from 'renderer';

export default () => {
  React.useEffect(() => {
    initGL('wrap');
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
