// --- START OF FILE index.js ---
console.log('Starting Verselor-V1 Process Manager...');

const { fork } = require('child_process');
const path = require('path');
const http = require('http');

// --- CLOUD PLATFORM KEEP-ALIVE ---
const isCloud = 
    process.env.PORT ||               
    process.env.REPL_ID ||            
    process.env.RENDER ||             
    process.env.DYNO ||               
    process.env.RAILWAY_STATIC_URL || 
    process.env.KOYEB_SERVICE_NAME || 
    process.env.FLY_APP_NAME ||       
    process.env.PROJECT_DOMAIN ||     
    process.env.NORTHFLANK_SERVICE_NAME; 

if (isCloud) {
    const port = process.env.PORT || 3000;
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'Online', 
            service: 'Verselor-V1-Parent', 
            uptime: process.uptime() 
        }));
    }).listen(port, () => {
        console.log(`🌍 Cloud Web Server running on Port: ${port}`);
    });
}

// --- CHILD PROCESS MANAGEMENT ---
const CHILD_PATH = path.join(__dirname, 'Connection', 'start.js');
let child = null;

function startBot() {
    child = fork(CHILD_PATH, [], {
        cwd: __dirname,
        stdio: 'inherit',
        env: process.env
    });

    child.on('message', (data) => {
        if (data === 'reset') {
            console.log('Bot requested restart...');
            child.kill(); 
        }
    });

    child.on('exit', (code, signal) => {
        if (code === 0) {
            console.log('Bot stopped manually. Exiting process.');
            process.exit(0);
        }

        console.error(`Bot crashed or closed (Code: ${code}). Restarting in 2 seconds...`);
        setTimeout(() => {
            startBot();
        }, 2000);
    });
}

const handleExit = () => {
    if (child) child.kill();
    process.exit(0);
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

// Start the Bot
startBot();
