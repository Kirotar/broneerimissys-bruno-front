const fs = require('fs');
const packageJson = require('./package.json');

const version = packageJson.version;
const timestamp = new Date().toISOString();

const versionTs = `export const VERSION = '${version}';
export const BUILD_TIMESTAMP = '${timestamp}';
`;

fs.writeFileSync('./src/version.ts', versionTs);
console.log('✔ version.ts updated');
