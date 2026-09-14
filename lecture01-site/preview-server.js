// Tiny dependency-free local server for previewing this static site.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = { '.css': 'text/css', '.js': 'application/javascript', '.html': 'text/html' };

http.createServer((request, response) => {
  const url = request.url === '/' ? '/index.html' : request.url;
  const file = path.join(root, path.basename(url));
  fs.readFile(file, (error, data) => {
    response.writeHead(error ? 404 : 200, { 'Content-Type': `${types[path.extname(file)] || 'text/plain'}; charset=utf-8` });
    response.end(error ? 'Not found' : data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
