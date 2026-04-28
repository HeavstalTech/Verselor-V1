// index.js
// © HEAVSTAL TECH
// modify & check for errors if you're using for your own project after forking.
import { fork } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

let botState = 'starting'; 
let child = null;
let pendingCodeResponse = null;
let currentQR = null;
let currentPairCode = null;

// cache recent logs so UI refresh doesn't look dead
const logHistory = [];
const MAX_LOGS = 50;

const backupFile = path.join(__dirname, 'settings', 'backup_config.json');

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

let sseClients = [];

function broadcastToUI(event, data) {
    if (event === 'log') {
        logHistory.push(data);
        if (logHistory.length > MAX_LOGS) logHistory.shift();
    }
    
    sseClients.forEach(client => {
        client.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        // Force flush if compression middleware is blocking somehow
        if (typeof client.flush === 'function') client.flush();
    });
}

// IP File Path
const ipWhitelistFile = path.join(__dirname, 'settings', 'whitelisted_ips.json');
let whitelistedIps = [];

if (fs.existsSync(ipWhitelistFile)) {
    try {
        const data = fs.readFileSync(ipWhitelistFile, 'utf8');
        whitelistedIps = JSON.parse(data);
    } catch (e) {
        whitelistedIps = [];
    }
} else {
    fs.writeFileSync(ipWhitelistFile, JSON.stringify(whitelistedIps, null, 2));
}

const saveIps = () => {
    fs.writeFileSync(ipWhitelistFile, JSON.stringify(whitelistedIps, null, 2));
};

const getIp = (req) => {
    // Fetch the real IP even if behind Render/Replit/VPS Proxies (hehe 🥀)
    const forwarded = req.headers['x-forwarded-for'];
    return forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
};

function getPanelPassword() {
    if (fs.existsSync(backupFile)) {
        try { 
            return JSON.parse(fs.readFileSync(backupFile, 'utf8')).Password || ""; 
        } catch(e) {
            console.error("Failed to read panel password", e);
        }
    }
    return "";
}

function setPanelPassword(pass) {
    let backup = {};
    if (fs.existsSync(backupFile)) {
        try { 
            backup = JSON.parse(fs.readFileSync(backupFile, 'utf8')); 
        } catch(e) {
            console.error("Failed to read backup config during password set", e);
        }
    }
    backup.Password = pass;
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
}

// WEB SERVER (cloud deployment...)
if (isCloud) {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        next();
    });

    // IP Whitelist Check Middleware for API routes
    const authMiddleware = (req, res, next) => {
        const ip = getIp(req);
        const pass = getPanelPassword();
        const isApiRoute = req.path.startsWith('/api/');
        const isAuthRoute = req.path.startsWith('/api/auth/');

        // Block ALL API requests if IP is not whitelisted
        if (isApiRoute && !isAuthRoute && pass && !whitelistedIps.includes(ip)) {
            return res.status(401).json({ error: 'Unauthorized Access. Invalid IP.' });
        }
        next();
    };

    app.use(authMiddleware);

    // Serve HTML
    app.get('/', (req, res) => {
        const htmlPath = path.join(__dirname, 'Connection', 'index.html');
        if (fs.existsSync(htmlPath)) {
            res.sendFile(htmlPath);
        } else {
            res.status(404).send('UI File Not Found. Please ensure Connection/index.html exists.');
        }
    });

    // Serve CSS To HTML
    app.get('/style.css', (req, res) => {
        const cssPath = path.join(__dirname, 'Connection', 'style.css');
        if (fs.existsSync(cssPath)) {
            res.sendFile(cssPath);
        } else {
            res.status(404).send('CSS File Not Found.');
        }
    });

    app.get('/api/auth/status', (req, res) => {
        const ip = getIp(req);
        const pass = getPanelPassword();

        if (!pass) {
            return res.json({ status: 'setup' });
        }
        if (whitelistedIps.includes(ip)) {
            return res.json({ status: 'authenticated' });
        }
        return res.json({ status: 'login' });
    });

    app.post('/api/auth/setup', (req, res) => {
        try {
            const payload = req.body;
            const pass = getPanelPassword();
            const ip = getIp(req);

            if (pass) {
                return res.status(400).json({ success: false, message: 'Password already set' });
            }
            
            setPanelPassword(payload.password);
            whitelistedIps.push(ip);
            saveIps();
            
            res.json({ success: true });
        } catch (e) {
            console.error("Setup error:", e);
            res.status(500).json({ success: false });
        }
    });

    app.post('/api/auth/login', (req, res) => {
        try {
            const payload = req.body;
            const pass = getPanelPassword();
            const ip = getIp(req);

            if (pass === payload.password) {
                if (!whitelistedIps.includes(ip)) { 
                    whitelistedIps.push(ip); 
                    saveIps(); 
                }
                res.json({ success: true });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (e) {
            console.error("Login error:", e);
            res.status(500).json({ success: false });
        }
    });

    app.post('/api/auth/change', (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const currentPass = getPanelPassword();

            if (currentPass !== oldPassword) {
                return res.status(401).json({ success: false, message: 'Incorrect current password.' });
            }

            if (!newPassword || newPassword.trim() === '') {
                return res.status(400).json({ success: false, message: 'New password cannot be empty.' });
            }

            setPanelPassword(newPassword);
            res.json({ success: true });
        } catch (e) {
            console.error("Password change error:", e);
            res.status(500).json({ success: false, message: 'Server error changing password.' });
        }
    });

    // Console logs api use sse (server sent events) - still don't understand? it's the web terminal helper function werey.
    app.get('/api/logs', (req, res) => {
        // kill socket timeouts so reverse proxies don't kill the connection
        req.socket.setTimeout(0);
        req.socket.setNoDelay(true);
        req.socket.setKeepAlive(true);

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform', // stops Nginx/Express buffering
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'
        });
        res.flushHeaders();

        // show existing logs immediately on refresh so it ain't empty
        logHistory.forEach(log => {
            res.write(`event: log\ndata: ${JSON.stringify(log)}\n\n`);
        });
        
        sseClients.push(res);
        
        req.on('close', () => {
            sseClients = sseClients.filter(c => c !== res);
        });
    });

    // control panel apis
    app.get('/api/status', (req, res) => {
        res.json({ 
            status: botState, 
            uptime: process.uptime(), 
            qr: currentQR,
            code: currentPairCode
        });
    });

    app.post('/api/pair', (req, res) => {
        try {
            const payload = req.body;
            let backup = { usePairingCode: true };
            
            if (fs.existsSync(backupFile)) {
                try { 
                    backup = JSON.parse(fs.readFileSync(backupFile, 'utf8')); 
                } catch(e) {
                    console.error("Backup parse error:", e);
                }
            }
            
            backup.phoneNumber = payload.phone;
            backup.AuthCode = payload.authCode;
            fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));

            botState = 'processing';
            pendingCodeResponse = res; 
            
            if (!child) {
                startBot();
            } else {
                child.send({ type: 'submit_phone', phone: payload.phone });
            }

        } catch (e) {
            console.error("Pairing API error:", e);
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: "Server Error" });
            }
        }
    });

    app.post('/api/control/start', (req, res) => {
        if (!child && botState !== 'running') {
            botState = 'starting';
            startBot();
            res.json({ success: true, message: 'Bot starting' });
        } else {
            res.status(400).json({ success: false, message: 'Bot already running' });
        }
    });

    app.post('/api/control/stop', (req, res) => {
        if (child) {
            botState = 'stopped';
            child.kill('SIGTERM');
            res.json({ success: true, message: 'Bot stopped' });
        } else {
            res.status(400).json({ success: false, message: 'Bot not running' });
        }
    });

    app.post('/api/control/restart', (req, res) => {
        botState = 'restarting';
        if (child) {
            child.kill('SIGTERM');
        } else {
            startBot();
        }
        res.json({ success: true, message: 'Bot restarting' });
    });

    app.post('/api/control/disconnect', (req, res) => {
        botState = 'disconnecting';
        currentPairCode = null;
        if (child) child.kill('SIGTERM');
        
        const sessionPath = path.join(__dirname, 'Connection', 'session');
        if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
        }
        
        if (fs.existsSync(backupFile)) {
            try {
                let backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
                backup.phoneNumber = "";
                backup.AuthCode = "";
                fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
            } catch(e) {
                console.error("Disconnect wipe error:", e);
            }
        }
        
        res.json({ success: true, message: 'Disconnected' });
    });

    // rentbot (pair) apis
    app.get('/api/rentbot/list', (req, res) => {
        const pairingDir = path.join(__dirname, 'Connection', 'pairing');
        let users = [];
        
        if (fs.existsSync(pairingDir)) {
            users = fs.readdirSync(pairingDir, { withFileTypes: true })
                .filter(d => d.isDirectory() && d.name.endsWith('@s.whatsapp.net'))
                .map(d => d.name.replace('@s.whatsapp.net', ''));
        }
        
        res.json({ users });
    });

    app.post('/api/rentbot/pair', (req, res) => {
        try {
            const payload = req.body;
            if (child) {
                child.send({ type: 'rentbot_pair', phone: payload.phone });
            }
            res.json({ success: true });
        } catch (e) {
            console.error("Rentbot pair error:", e);
            res.status(500).json({ success: false });
        }
    });

    app.delete('/api/rentbot/:phone', (req, res) => {
        const phone = req.params.phone;
        const dir = path.join(__dirname, 'Connection', 'pairing', phone + '@s.whatsapp.net');
        
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
        }
        
        res.json({ success: true });
    });

    // config apis 🤦 (try not to break anything.)
    app.get('/api/config', (req, res) => {
        const dbPath = path.join(__dirname, 'Start', 'database', 'database_main.json');
        const configPath = path.join(__dirname, 'settings', 'config.js');
        
        let configData = {};
        
        if (fs.existsSync(dbPath)) {
            try { 
                configData = JSON.parse(fs.readFileSync(dbPath, 'utf8')).settings || {}; 
            } catch(e) {
                console.error("Config DB read error:", e);
            }
        }
        
        if (fs.existsSync(configPath)) {
            const cStr = fs.readFileSync(configPath, 'utf8');
            const pairMatch = cStr.match(/global\.usePairingCode\s*=\s*(true|false)/);
            const mongoMatch = cStr.match(/global\.MONGODB_URI\s*=\s*["'](.*?)["']/);
            configData.usePairingCode = pairMatch ? pairMatch[1] === 'true' : true;
            configData.MONGODB_URI = mongoMatch ? mongoMatch[1] : '';
        }
        
        if (fs.existsSync(backupFile)) {
            try { 
                const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
                configData.phoneNumber = backup.phoneNumber || "";
                configData.AuthCode = backup.AuthCode || "";
            } catch(e) {}
        }

        res.json(configData);
    });

    app.post('/api/config', (req, res) => {
        try {
            const newConfig = req.body;
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

            res.json({ success: true });

        } catch(e) {
            console.error("Config save error:", e);
            res.status(500).json({ success: false, message: 'Failed to save config.' });
        }
    });

    // Start the Express server
    app.listen(port, () => {
        console.log(`💨🧏 Cloud Web Server & Pairing Portal running on Port: ${port}`);

        // Auto Pinger To Prevent Suspension After A Period of inactivity (ping every 8 mins)
        const getPublicUrl = () => {
            if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL;
            if (process.env.PROJECT_DOMAIN) return `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
            if (process.env.REPL_SLUG && process.env.REPL_OWNER) return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
            if (process.env.RAILWAY_STATIC_URL) return `https://${process.env.RAILWAY_STATIC_URL}`;
            if (process.env.FLY_APP_NAME) return `https://${process.env.FLY_APP_NAME}.fly.dev`;
            return null;
        };

        const publicUrl = getPublicUrl();
        if (publicUrl) {
            console.log(`📡 [KEEP-ALIVE] Initialized. Self-pinging every 8 minutes.`);
            
            const performPing = async () => {
                try {
                    await fetch(publicUrl, { method: 'GET', headers: { 'User-Agent': 'Bot-KeepAlive' } });
                } catch (err) {
                    // silent fail, no need to spam logs if internal ping drops
                }
            };

            setInterval(performPing, 8 * 60 * 1000);
            performPing(); 
        } else {
            console.log(`⚠️ [KEEP-ALIVE] Public URL not auto-detected. Use UptimeRobot if on a free-tier host.`);
        }
    });
} 

// Process Manager (pm - Runs the Bot - modify at will - try not to break it alright..?)
const CHILD_PATH = path.join(__dirname, 'Connection', 'start.js');

function startBot() {
    console.log('[SYSTEM] Forking child process...');
    child = fork(CHILD_PATH, [], {
        cwd: __dirname,
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'], 
        env: process.env
    });
    
    child.on('message', (msg) => {
        if (msg.type === 'log') {
            broadcastToUI('log', msg);
        }
        else if (msg.type === 'rentbot_code') {
            broadcastToUI('rentbot_code', { code: msg.code, phone: msg.phone });
        }
        else if (msg.type === 'rentbot_error') {
            broadcastToUI('rentbot_error', { message: msg.message });
        }
        else if (msg === 'reset') {
            console.log('[CHILD] Bot requested restart...');
            botState = 'restarting';
            child.kill('SIGTERM'); 
        } 
        else if (msg.type === 'waiting_for_phone') {
            botState = 'waiting';
            currentQR = null;
            currentPairCode = null;
        } 
        else if (msg.type === 'qr') {
            botState = 'waiting_qr';
            currentQR = msg.qr;
            currentPairCode = null;
            broadcastToUI('qr', { qr: msg.qr });
        }
        else if (msg.type === 'bot_running') {
            botState = 'running';
            currentQR = null;
            currentPairCode = null;
            broadcastToUI('status_update', { status: 'running' });
        } 
        else if (msg.type === 'pairing_code') {
            botState = 'paired_wait';
            currentPairCode = msg.code;
            broadcastToUI('pairing_code', { code: msg.code });
            
            if (pendingCodeResponse) {
                pendingCodeResponse.json({ success: true, code: msg.code });
                pendingCodeResponse = null;
            }
        } 
        else if (msg.type === 'invalid_phone' || msg.type === 'pairing_error') {
            botState = 'waiting_setup';
            currentPairCode = null;
            if (pendingCodeResponse) {
                pendingCodeResponse.status(400).json({ success: false, message: msg.message });
                pendingCodeResponse = null;
            }
        }
        else if (msg.type === 'fatal_error') {
            botState = 'waiting_setup';
            currentPairCode = null;
            broadcastToUI('fatal_error', { message: msg.message });
            broadcastToUI('status_update', { status: 'waiting_setup' });
        }
    });

    child.on('error', (err) => {
        console.error('[CHILD-ERROR] Failed to spawn or communicate with child:', err);
    });

    child.on('exit', (code, signal) => {
        console.log(`\n[CHILD-EXIT] Child process exited with Code: ${code} | Signal: ${signal}`);
        child = null;
        
        if (botState === 'restarting') {
            console.log('[SYSTEM] Restarting bot as requested by Control Panel...');
            botState = 'starting';
            setTimeout(startBot, 2000);
        } 
        else if (botState === 'disconnecting') {
            console.log('[SYSTEM] Bot disconnected. Session wiped.');
            botState = 'waiting_setup';
            broadcastToUI('status_update', { status: 'waiting_setup' });
        } 
        else if (botState === 'stopped') {
            console.log('[SYSTEM] Bot stopped manually via Control Panel.');
            broadcastToUI('status_update', { status: 'stopped' });
        } 
        else if (botState === 'waiting_setup') {
            console.log('[SYSTEM] Waiting for user setup inputs...');
            broadcastToUI('status_update', { status: 'waiting_setup' });
        } 
        else {
            console.error(`[SYSTEM] Bot crashed unexpectedly. Auto-restarting in 3 seconds...`);
            botState = 'starting';
            setTimeout(startBot, 3000);
        }
    });
}

// booting logic
let hasSetup = false;
if (fs.existsSync(backupFile)) {
    try {
        const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
        if (backup.phoneNumber && backup.AuthCode) {
            hasSetup = true;
        }
    } catch (e) {
        console.error("Error reading backup file during boot:", e);
    }
}

if (!isCloud || hasSetup) {
    startBot();
} else {
    botState = 'waiting_setup';
    console.log('[SYSTEM] Cloud deployment detected. Waiting for setup via Web UI...');
}

// Crash and error handling.
process.on("exit", code => {
    console.log("[PARENT-EXIT] Process manager exiting with code:", code);
});

process.on("SIGINT", () => {
    if (botState === 'waiting' || botState === 'waiting_setup' || botState === 'starting') {
        console.log("[PARENT-SIGNAL] Ignored SIGINT from panel during startup/pairing.");
        return; 
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
