const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the public directory
const publicDir = path.join(__dirname, 'public');

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Determine the requested file path
  let filePath = path.join(req.url === '/' ? 'index.html' : req.url);

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found - return 404 error
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
      } else {
        // Other server error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // File found - serve it
      res.writeHead(200);
      res.end(content);
    }
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
