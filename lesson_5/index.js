const http = require('http');
const url = require("url");
const path = require("path");

const {
    isFile,
    getDirectoryFilename,
    showFileContents,
} = require("./func");

http.createServer(async (request, response) => {
    const queryParams = url.parse(request.url, true).query;
    const queryPath = queryParams.path ?? process.cwd();
    const queryTarget = queryParams.target ?? "";
    const navPath = path.join(queryPath, queryTarget);

    if (isFile(navPath)) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        await showFileContents(navPath, response)
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const res = await getDirectoryFilename(navPath)
        res.forEach(item => {
            response.write(`<p><a href="?target=${item}&path=${navPath}">${item}</a></p>`)
        })
    }
    response.end()

}).listen(3000, "localhost", () => {
    console.log(`Server running at http://localhost:3000`)
});
