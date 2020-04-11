const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: './src/image-picker.js',
    mulimage: './src/multiple-image.js',
    jsoninput: './src/jsoninput.js'
  },
  output: {
    path: path.resolve('./static/juss/'),
    filename: '[name].bundle.js'
  },
  plugins: [
    //new CleanWebpackPlugin(['./static/dashboards/'])
  ],
  module: {
    rules: [
      {test:/\.js$/, exclude:/node_modules/, use:{
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {'targets':{'node':10}}], '@babel/preset-react']
        }
      }}
    ]
  },
}
