const path = require('path');
const fs = require('fs-extra');
const config = require('./config');

const copy = (path, dest) => {
  fs.copySync(config.resolveApp(path), config.resolveApp(dest), {
    dereference: true
  });
};

copy('public', 'dist');
copy(
  'node_modules/@webcomponents/webcomponentsjs',
  'dist/node_assets/@webcomponents/webcomponentsjs'
);
