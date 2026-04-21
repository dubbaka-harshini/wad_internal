// Import core modules
const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// Create custom event emitter
const eventEmitter = new EventEmitter();

// General request event
eventEmitter.on('request_received', (url) => {
    console.log(`Request received for: ${url}`);
});

// Specific event for /event route
eventEmitter.on('event_page_visited', (time) => {
    console.log(`Event page visited at ${time}`);
});

// Create server
const server = http.createServer((req, res) => {

    // Trigger general event
    eventEmitter.emit('request_received', req.url);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        res.write("<h1>Welcome to Node.js Server</h1>");
    }

    else if (req.url === '/os') {
        res.write("<h2>OS Module Info</h2>");
        res.write(`Platform: ${os.platform()}<br>`);
        res.write(`CPU Architecture: ${os.arch()}<br>`);
        res.write(`Free Memory: ${os.freemem()}<br>`);
        res.write(`Total Memory: ${os.totalmem()}<br>`);
    }

    else if (req.url === '/path') {
        res.write("<h2>Path Module Info</h2>");
        const filePath = __filename;

        res.write(`File Name: ${path.basename(filePath)}<br>`);
        res.write(`Directory: ${path.dirname(filePath)}<br>`);
        res.write(`Extension: ${path.extname(filePath)}<br>`);
    }

    else if (req.url === '/event') {

        
        eventEmitter.emit('event_page_visited', new Date().toLocaleString());

        res.write("<h2>Event Module Demo</h2>");
        res.write("Check console for event message!");
    }

    else {
        res.write("<h2>404 - Page Not Found</h2>");
    }

    res.end();
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});