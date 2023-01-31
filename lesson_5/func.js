const fs = require("fs");

const isFile = (pathToFile) => {
    return fs.lstatSync(pathToFile).isFile();
}

const getDirectoryFilename = async (directory) => {
    return await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            if (directory !== "/") {
                data.unshift("..");
            }
            resolve(data);
        });
    });
}

const showFileContents = async (pathToFile, func) => {
    return new Promise((resolve) => {
        const stream = fs.createReadStream(pathToFile, 'utf-8');

        stream.on('end', resolve);
        stream.pipe(func);
    });
}

module.exports = {
    isFile,
    getDirectoryFilename,
    showFileContents,
}