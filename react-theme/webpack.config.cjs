/* eslint-disable no-undef */

const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/main.jsx", // Update to the correct entry point
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "../extensions/theme-extension/assets"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: ".",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
