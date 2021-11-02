import commonjs from '@rollup/plugin-commonjs';
export default {
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'renderer',
    file: 'renderer',
    sourcemap: true,
  },
  extraRollupPlugins: [
    commonjs({
      namedExports: {
        eventemitter3: ['EventEmitter'],
      },
    }),
  ],
};
