const path = require('path')

const ROOT = path.resolve(__dirname, '../')

const paths = {
  root: ROOT,
  entry: path.join(ROOT, 'src'),
  output: path.join(ROOT, 'dist'),
  outputGithubPages: path.join(ROOT, 'docs'),
  template: path.join(ROOT, 'src', 'index.html'),
  public: path.join(ROOT, 'public')
}

module.exports = paths