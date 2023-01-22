'use strict';

import fs from 'fs';
import readline from 'readline';

const readStream = fs.createReadStream('./logFile.log', 'utf-8');
const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';
const WriteStream1 = fs.createWriteStream(`${ip1}`);
const writeStream2 = fs.createWriteStream(`${ip2}`);

const rl = readline.createInterface({
    input: readStream
});

rl.on('line', (line) => {
    if (line.includes(ip1)) {
        WriteStream1.write(line + '\n');
    }

    if (line.includes(ip2)) {
        writeStream2.write(line + '\m');
    }
});