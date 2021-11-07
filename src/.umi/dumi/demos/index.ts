// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';
import rawCode1 from '!!dumi-raw-code-loader!/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/examples/simple.jsx?dumi-raw-code';
import rawCode2 from '!!dumi-raw-code-loader!/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/examples/blend.jsx?dumi-raw-code';

export default {
  'docs-simple': {
    component: (require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/examples/simple.jsx')).default,
    previewerProps: {"sources":{"_":{"jsx":rawCode1}},"dependencies":{"react":{"version":"16.14.0"},"renderer":{"version":"1.0.0"}},"identifier":"docs-simple"},
  },
  'docs-blend': {
    component: (require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/examples/blend.jsx')).default,
    previewerProps: {"sources":{"_":{"jsx":rawCode2}},"dependencies":{"react":{"version":"16.14.0"},"renderer":{"version":"1.0.0"}},"identifier":"docs-blend"},
  },
};
