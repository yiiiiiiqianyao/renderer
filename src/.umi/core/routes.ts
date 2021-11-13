// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1636202777000,
          "title": "API",
          "order": 4,
          "slugs": [
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            }
          ]
        },
        "title": "API - renderer"
      },
      {
        "path": "/demo/blend",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/blend.zh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/blend.zh.md",
          "updatedTime": 1636390693000,
          "title": "blend demo",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "标准地图",
              "heading": "标准地图"
            },
            {
              "depth": 2,
              "value": "blend demo",
              "heading": "blend-demo"
            }
          ],
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "blend demo - renderer"
      },
      {
        "path": "/demo/box",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/box.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/box.md",
          "updatedTime": 1636429297000,
          "title": "box demo",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "标准地图",
              "heading": "标准地图"
            },
            {
              "depth": 2,
              "value": "box demo",
              "heading": "box-demo"
            }
          ],
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "box demo - renderer"
      },
      {
        "path": "/demo/mesh",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/mesh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/mesh.md",
          "updatedTime": 1636390693000,
          "title": "mesh demo",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "标准地图",
              "heading": "标准地图"
            },
            {
              "depth": 2,
              "value": "mesh plane demo",
              "heading": "mesh-plane-demo"
            }
          ],
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "mesh demo - renderer"
      },
      {
        "path": "/demo/simple",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/simple.zh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/simple.zh.md",
          "updatedTime": 1636390693000,
          "title": "simple demo",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "标准地图",
              "heading": "标准地图"
            },
            {
              "depth": 2,
              "value": "simple demo",
              "heading": "simple-demo"
            }
          ],
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "simple demo - renderer"
      },
      {
        "path": "/demo/simple-pass",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/simplePass.zh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/simplePass.zh.md",
          "updatedTime": 1636390693000,
          "title": "simple pass demo",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "标准地图",
              "heading": "标准地图"
            },
            {
              "depth": 2,
              "value": "simple pass demo",
              "heading": "simple-pass-demo"
            }
          ],
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "simple pass demo - renderer"
      },
      {
        "path": "/demo/wind",
        "component": require('/Users/yiqianyao/workspace/webGL-Three.js-CSS3/renderer/docs/demo/wind.zh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/wind.zh.md",
          "updatedTime": 1636790035717,
          "title": "wind demo",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "风场",
              "heading": "风场"
            },
            {
              "depth": 2,
              "value": "wind demo",
              "heading": "wind-demo"
            }
          ],
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "wind demo - renderer"
      },
      {
        "path": "/demo",
        "meta": {},
        "exact": true,
        "redirect": "/demo/blend"
      }
    ],
    "title": "renderer",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
