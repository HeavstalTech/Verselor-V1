const path = require('path');
const http = require('http');

// --- CLOUD PLATFORM DETECTION ---
// We check for specific variables injected by these platforms.
const isCloud = 
    process.env.PORT ||               // Heroku, Railway, Koyeb, most generic clouds
    process.env.REPL_ID ||            // Replit
    process.env.RENDER ||             // Render
    process.env.DYNO ||               // Heroku
    process.env.RAILWAY_STATIC_URL || // Railway
    process.env.KOYEB_SERVICE_NAME || // Koyeb
    process.env.FLY_APP_NAME ||       // Fly.io
    process.env.PROJECT_DOMAIN ||     // Glitch
    process.env.NORTHFLANK_SERVICE_NAME; // Northflank

if (isCloud) {
    // If on cloud, we MUST bind to a port or the container dies.
    const port = process.env.PORT || 3000;
    
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'Online', 
            bot: 'Verselor-V1', 
            platform: 'Cloud' 
        }));
    }).listen(port, () => {
        console.log(`Cloud Environment Detected. Keep-Alive Server listening on Port: ${port}`);
    });
} else {
    // console.log('VPS/Panel Detected. No Web Server required (PM2 managing process).');
}

// --- START THE BOT ---
// PM2 is wrapping this file. If the bot logic crashes, PM2 restarts this index.js.
console.log('Starting Verselor-V1...');
require(path.join(__dirname, 'Connection', 'start.js'));
