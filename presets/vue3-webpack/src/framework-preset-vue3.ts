import { VueLoaderPlugin } from 'vue-loader';
import { DefinePlugin } from 'webpack';
import type { StorybookConfig } from '@storybook/core-webpack';

export const webpack: StorybookConfig['webpack'] = (config) => {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new VueLoaderPlugin(),
      new DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
      }),
    ],
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
          options: {},
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.vue'],
      alias: {
        ...config.resolve.alias,
        vue$: require.resolve('vue/dist/vue.esm-bundler.js'),
      },
    },
  };
};