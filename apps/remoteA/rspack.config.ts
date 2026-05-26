import { NxAppRspackPlugin } from '@nx/rspack/app-plugin.js';
import { NxReactRspackPlugin } from '@nx/rspack/react-plugin.js';
import {
  NxModuleFederationPlugin,
  NxModuleFederationDevServerPlugin,
} from '@nx/module-federation/rspack.js';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Compiler } from '@rspack/core';

import config from './module-federation.config';

const logModuleFederationDtsEnvPlugin = {
  apply(compiler: Compiler) {
    const logEnv = () => {
      const env = {
        NODE_ENV: process.env['NODE_ENV'],
        WEBPACK_SERVE: process.env['WEBPACK_SERVE'],
      };

      console.log(
        `[${config.name}] NODE_ENV=${String(env.NODE_ENV)} WEBPACK_SERVE=${String(env.WEBPACK_SERVE)}`,
      );

      const outputDirectory = join(__dirname, '../../tmp/mf-env');
      mkdirSync(outputDirectory, { recursive: true });
      writeFileSync(
        join(outputDirectory, `${config.name}.json`),
        `${JSON.stringify(env, null, 2)}\n`,
      );
    };

    compiler.hooks.beforeRun.tap('LogModuleFederationDtsEnvPlugin', logEnv);
    compiler.hooks.watchRun.tap('LogModuleFederationDtsEnvPlugin', logEnv);
  },
};

export default {
  output: {
    path: join(__dirname, '../../dist/apps/remoteA'),
    publicPath: 'auto',
  },
  devServer: {
    port: 4201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    },
  },
  plugins: [
    logModuleFederationDtsEnvPlugin,
    new NxAppRspackPlugin({
      tsConfig: './tsconfig.app.json',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactRspackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
    new NxModuleFederationPlugin({ config }, { dts: true }),
    new NxModuleFederationDevServerPlugin({ config }),
  ],
};
