const fs = require('fs');
const packageJson = require('./package.json');

const versionTs = `export const VERSION = '${packageJson.version}';\n`;
fs.writeFileSync('./src/version.ts', versionTs);
