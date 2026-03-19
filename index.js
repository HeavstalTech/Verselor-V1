// --- START OF FILE index.js ---
// This is a copyright code, if you take it, please give credit to HEAVSTAL TECH, i spent a lot of time and dedication om this project 
console.log('Starting Verselor-V1 Process Manager...');

// Verselor-V1 requires node 20x but not node 24x ro run effectively 
const major = parseInt(process.versions.node.split('.')[0], 10);
if (major < 20) {
  console.error(
    `\n❌ [SYSTEM ERROR] Unsupported Node.js Version Detected.\n` +
    `   You are using Node.js ${process.versions.node}.\n` +
    `   Verselor-V1 requires Node.js v20, v22, or v23 to run reliably.\n` +
    `   Please change your Node.js version in your host panel to proceed.\n`
  );
  process.exit(0);
}

const { fork } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');

let botState = 'starting'; 
let child = null;
let pendingCodeResponse = null;
let currentQR = null;

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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            return res.end();
        }

        if (req.method === 'GET' && req.url === '/') {
            const htmlPath = path.join(__dirname, 'Connection', 'index.html');
            
            if (fs.existsSync(htmlPath)) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                fs.createReadStream(htmlPath).pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('UI File Not Found. Please ensure Connection/index.html exists.');
            }
        } 
        else if (req.method === 'GET' && req.url === '/api/status') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: botState, uptime: process.uptime(), qr: currentQR }));
        }
        else if (req.method === 'POST' && req.url === '/api/pair') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (botState !== 'waiting') {
                        res.writeHead(400);
                        return res.end(JSON.stringify({ success: false, message: "Bot is already paired or starting up." }));
                    }

                    botState = 'processing';
                    pendingCodeResponse = res; 
                    
                    child.send({ type: 'submit_phone', phone: data.phone });

                } catch (e) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ success: false, message: "Server Error" }));
                }
            });
        } 
        else if (req.method === 'GET' && req.url === '/api/config') {
            const dbPath = path.join(__dirname, 'Start', 'database', 'database_main.json');
            const configPath = path.join(__dirname, 'settings', 'config.js');
            
            let configData = {};
            if (fs.existsSync(dbPath)) {
                try { configData = JSON.parse(fs.readFileSync(dbPath, 'utf8')).settings || {}; } catch(e) {}
            }
            
            if (fs.existsSync(configPath)) {
                const cStr = fs.readFileSync(configPath, 'utf8');
                const pairMatch = cStr.match(/global\.usePairingCode\s*=\s*(true|false)/);
                const mongoMatch = cStr.match(/global\.MONGODB_URI\s*=\s*["'](.*?)["']/);
                configData.usePairingCode = pairMatch ? pairMatch[1] === 'true' : true;
                configData.MONGODB_URI = mongoMatch ? mongoMatch[1] : '';
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(configData));
        }
        else if (req.method === 'POST' && req.url === '/api/config') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                try {
                    const newConfig = JSON.parse(body);
                    const dbPath = path.join(__dirname, 'Start', 'database', 'database_main.json');
                    const configPath = path.join(__dirname, 'settings', 'config.js');

                    if (fs.existsSync(dbPath)) {
                        let fullDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
                        if (!fullDb.settings) fullDb.settings = {};
                        for (const key in newConfig) {
                            if (key !== 'usePairingCode' && key !== 'MONGODB_URI' && key !== 'mess') {
                                fullDb.settings[key] = newConfig[key];
                            }
                        }
                        if (newConfig.mess) {
                            if (!fullDb.settings.mess) fullDb.settings.mess = {};
                            for (const mKey in newConfig.mess) {
                                fullDb.settings.mess[mKey] = newConfig.mess[mKey];
                            }
                        }
                        fs.writeFileSync(dbPath, JSON.stringify(fullDb, null, 2));
                    }

                    if (fs.existsSync(configPath)) {
                        let cStr = fs.readFileSync(configPath, 'utf8');
                        if (newConfig.hasOwnProperty('usePairingCode')) {
                            cStr = cStr.replace(/global\.usePairingCode\s*=\s*(true|false)/, `global.usePairingCode = ${newConfig.usePairingCode}`);
                        }
                        if (newConfig.hasOwnProperty('MONGODB_URI')) {
                            cStr = cStr.replace(/global\.MONGODB_URI\s*=\s*["'].*?["']/, `global.MONGODB_URI = "${newConfig.MONGODB_URI}"`);
                        }
                        fs.writeFileSync(configPath, cStr);
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));

                    if (child) {
                        console.log("Config updated via Web. Restarting bot...");
                        child.kill();
                        botState = 'starting';
                        currentQR = null;
                        setTimeout(startBot, 2000);
                    }
                } catch(e) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ success: false, message: 'Failed to save config.' }));
                }
            });
        } 
        else {
            res.writeHead(404);
            res.end('Not Found');
        }
    }).listen(port, () => {
        console.log(`🌐 Cloud Web Server & Pairing Portal running on Port: ${port}`);
    });
} 

const CHILD_PATH = path.join(__dirname, 'Connection', 'start.js');

function startBot() {
    console.log('[SYSTEM] Forking child process...');
    child = fork(CHILD_PATH,[], {
        cwd: __dirname,
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'], 
        env: process.env
    });

    child.on('message', (msg) => {
        if (msg === 'reset') {
            console.log('[CHILD] Bot requested restart...');
            child.kill(); 
        } 
        else if (msg.type === 'waiting_for_phone') {
            botState = 'waiting';
            currentQR = null;
        } 
        else if (msg.type === 'qr') {
            botState = 'waiting_qr';
            currentQR = msg.qr;
        }
        else if (msg.type === 'bot_running') {
            botState = 'running';
            currentQR = null;
        } 
        else if (msg.type === 'pairing_code') {
            botState = 'paired_wait';
            if (pendingCodeResponse) {
                pendingCodeResponse.writeHead(200, { 'Content-Type': 'application/json' });
                pendingCodeResponse.end(JSON.stringify({ success: true, code: msg.code }));
                pendingCodeResponse = null;
            }
        } 
        else if (msg.type === 'invalid_phone' || msg.type === 'pairing_error') {
            botState = 'waiting';
            if (pendingCodeResponse) {
                pendingCodeResponse.writeHead(400, { 'Content-Type': 'application/json' });
                pendingCodeResponse.end(JSON.stringify({ success: false, message: msg.message }));
                pendingCodeResponse = null;
            }
        }
    });

    // --- CHILD PROCESS ERROR & EXIT TRACKING ---
    child.on('error', (err) => {
        console.error('[CHILD-ERROR] Failed to spawn or communicate with child:', err);
    });

    child.on('exit', (code, signal) => {
        console.log(`\n[CHILD-EXIT] Child process exited with Code: ${code} | Signal: ${signal}`);
        
        if (code === 0) {
            console.log('[SYSTEM] Bot stopped manually. Exiting process.');
            process.exit(0);
        }
        
        console.error(`[SYSTEM] Bot crashed or closed. Restarting in 2 seconds...`);
        botState = 'starting';
        setTimeout(startBot, 2000);
    });
}

// --- PARENT PROCESS LIFECYCLE & SIGNAL TRACKING ---
process.on("exit", code => {
    console.log("[PARENT-EXIT] Process manager exiting with code:", code);
});

process.on("SIGINT", () => {
    if (botState === 'waiting' || botState === 'starting') {
        console.log("[PARENT-SIGNAL] Ignored SIGINT from panel during startup/pairing.");
        return; // Don't exit!
    }
    console.log("[PARENT-SIGNAL] SIGINT (Ctrl+C) received. Killing child and exiting.");
    if (child) child.kill('SIGINT');
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("[PARENT-SIGNAL] SIGTERM (Termination request) received from OS/Panel. Killing child and exiting.");
    if (child) child.kill('SIGTERM');
    process.exit(0);
});

process.on("uncaughtException", err => {
    console.error("[PARENT-ERROR] Uncaught Exception in Process Manager:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("[PARENT-ERROR] Unhandled Rejection at:", promise, "reason:", reason);
});

// Start the bot initially
startBot();
