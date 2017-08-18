var path = require('path');
const glob = require('glob');

/**
 * 读取dev目录下的js文件列表
 */
let webpack_entry = {}
glob.sync('./dev/js/*.js').forEach(v => {
  let filename = path.basename(v, '.js')
  webpack_entry[filename] = v
})

module.exports = {
  entry: webpack_entry,
  output: {
    path: path.join(__dirname, './public/js'),
    filename: '[name].js'
  },
  module: {
    rules: [

    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'dev', 'modules')
    ]
  }
};
