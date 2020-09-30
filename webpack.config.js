const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const METADATA = `// ==UserScript==
// @name        AWSAccountSwitch
// @namespace   https://enfo.se
// @version     1.0.1
// @description GM/TM Script that allows you to easily switch between AWS accounts.
// @author      Alexander Karlsson <alexander.karlsson@enfogroup.com>
// @match       https://*.aws.amazon.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @grant       unsafeWindow
// ==/UserScript==

var tampermonkey = {
  // API Endpoint for the accounts API. If you don't have this at hand contact the COPS AWS team on Slack or through cops-aws@enfogroup.com
  apiURL: "",

  // API Key for contacting the accounts API. If you don't already have one contact the COPS AWS team on Slack or through cops-aws@enfogroup.com
  apiKey: "",

  // Allows you to manually add a list of accounts to be used within the account switcher. This is here for legacy and customization reasons.
  manualAccounts: [
  //  {
  //    Id: "aws-account-id",
  //    Name: "aws-account-name",
  //    Role: "aws-caa-role"
  //  }
  ]
};
`

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].user.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.coffee', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            beautify: false,
            preamble: METADATA,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
}
