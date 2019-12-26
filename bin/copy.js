const fs = require('fs');
const path = require('path');

function copy(src, dest) {
    fs.writeFileSync(dest, fs.readFileSync(src));
}

copy(
    path.resolve(__dirname, '../src/ErrorInfo.proto'),
    path.resolve(__dirname, '../build/ErrorInfo.proto')
)