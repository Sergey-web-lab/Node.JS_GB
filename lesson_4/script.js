'use strict';

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter the path to the file: ", function (inputedPath) {
    const filePath = path.join(__dirname, inputedPath);
    fs.readFile(filePath, 'utf8', (err, data) => {
        const fileName = data;
        const isFile = fileName => {
            return fs.lstatSync(fileName).isFile();
        }
        const list = fs.readdirSync(__dirname).filter(isFile);
        inquirer
            .prompt([{
                name: "fileName",
                type: "list",
                message: "Choose file:",
                choices: list,
            }])
            .then((answer) => {
                console.log(answer.fileName);
                const filePath = path.join(__dirname, answer.fileName);
                findData(filePath);
            });
    });

});

function findData(data) {
    const readStream = fs.createReadStream(data, 'utf-8');
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
}

