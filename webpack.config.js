const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './lib/fuzzyjava.js',
  output: {
    filename: 'docs/fuzzyjava.js',
    library: 'fuzzyjava'
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
