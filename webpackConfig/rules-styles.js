import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { SRC } from './paths';

export default [
  {
    test: /\.scss$/,
    include: SRC,
    use: ExtractTextPlugin.extract({
      fallbackLoader: {
        loader: 'style-loader',
        options: {
          sourceMap: true
        },
      },
      loader: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            importLoaders: 1,
            sourceMap: true
          },
        },

        {
          loader: 'postcss-loader',
          options: {
            // pass loader options here
          },
        },

        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        },
      ],
    }),
  },
];
