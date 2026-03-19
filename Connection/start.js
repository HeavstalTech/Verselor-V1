// Connection/start.js AKA source of Truth file
// Incase of any unexpected errors
process.on('uncaughtException', (err) => {
    console.error('[Error] An uncaught exception occurred:', err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error('[Error] Unhandled Rejection at:', err);
    process.exit(1);
});
const path = require('path');
require(path.join(__dirname, '..', 'settings', 'config'));

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    jidDecode,
    proto,
    getAggregateVotesInPollMessage,
    PHONENUMBER_MCC
} = require("@heavstaltech/baileys");

const chalk = require('chalk');
const pino = require('pino');
const fs = require('fs');
const os = require('os');
const FileType = require('file-type');
const readline = require("readline");
const util = require('util');
const { Boom } = require('@hapi/boom');
const NodeCache = require("node-cache");
const qrcode = require('qrcode-terminal');
const resolveMsgBuffer = new NodeCache();
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep, runtime, formatp } = require(path.join(__dirname, '..', 'System', 'Data1.js'));
const { loadDatabase } = require(path.join(__dirname, '..', 'lib', 'LowDb.js'));
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require(path.join(__dirname, '..', 'System', 'Data2.js'));
const { bindSocketUtils } = require(path.join(__dirname, '..', 'System', 'Data5.js'));
const attachEvents = require(path.join(__dirname, '..', 'System', 'Data8.js'));
const { color, bgcolor, Lognyong } = require(path.join(__dirname, '..', 'System', 'color.js'));
const checkUpdate = require(path.join(__dirname, '..', 'lib', 'Default', 'UpdateChecker.js'));

// Set this here for connecting to bots whole commands
const handleMessages = require(path.join(__dirname, '..', 'Start', 'LordPromise.js'));

// Use this for pair code or qr
const usePairingCode = global.usePairingCode; 

// Console Input & Output (I/O) with IPC Question Handler
const question = (text) => {
    return new Promise((resolve) => {
        console.log(chalk.greenBright(text));
        if (process.send) process.send({ type: 'waiting_for_phone' });
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const ipcListener = (msg) => {
            if (msg && msg.type === 'submit_phone') {
                cleanup();
                resolve(msg.phone.trim());
            }
        };
        if (process.send) process.on('message', ipcListener);
        rl.question('', (answer) => {
            const ans = answer.trim();
            if (ans.length > 0) {
                cleanup();
                resolve(ans);
            }
        });
        function cleanup() {
            if (process.send) process.removeListener('message', ipcListener);
            rl.close();
        }
    });
};
        
const footer = global.footer

// Helper to Save creds of tenants if any is available 
global.tenantSaveCreds = new Map(); 
require(path.join(__dirname, 'rentbot.js'));

// =========================================================================
//  SESSION MANAGEMENT & AUTO-CLEANUP (Multi-Tenant Supported)
// =========================================================================

/**
 * Helper function to clean specific file types from a directory.
 * Used for both Main Session and Rented/Paired Sessions.
 */
function cleanSingleDir(dirPath, label, isShutdown) {
    try {
        if (!fs.existsSync(dirPath)) return;

        const files = fs.readdirSync(dirPath);
        if (files.length === 0) return;

        const filesToDelete = files.filter(file =>
            file.endsWith('.tmp') ||
            file.endsWith('.log') ||
            file.startsWith('cache-') ||
            file.startsWith('debug-') ||
            file.startsWith('pre-key') ||
            file.startsWith('sender-key') ||
            file.startsWith('session-') ||
            file.startsWith('app-state')
        );

        if (filesToDelete.length === 0) return;

        const logType = isShutdown ? 'SHUTDOWN CLEAN' : 'AUTO CLEAN';
        
        // Only log if we are deleting a significant amount to reduce console spam for 1-2 files
        if (filesToDelete.length > 5 || isShutdown) {
            console.log(chalk.yellow.bold(`📂 [${logType}] Cleaning ${filesToDelete.length} files in: ${label}`));
        }

        filesToDelete.forEach(file => {
            const filePath = path.join(dirPath, file);
            try {
                fs.unlinkSync(filePath);
            } catch (error) {
                // Silently ignore individual file delete errors to prevent crashing the loop
                // console.error(chalk.red.bold(`❌ Failed to delete ${file}: ${error.message}`));
            }
        });
    } catch (error) {
        console.error(chalk.red.bold(`❌ [CLEAN ERROR] Failed to access ${label}: ${error.message}`));
    }
}

/**
 * Main function called by the interval.
 * Cleans the Host Session AND loops through all Rented Bot Sessions.
 */
function clearSessionFiles(isShutdown = false) {
    // 1. Clean Main Host Session
    const mainSessionDir = path.join(__dirname, 'session');
    cleanSingleDir(mainSessionDir, 'HOST SESSION', isShutdown);

    // 2. Clean Rented/Paired Sessions
    const pairingBaseDir = path.join(__dirname, 'pairing');
    
    try {
        if (fs.existsSync(pairingBaseDir)) {
            // Get all subdirectories (each represents a connected user number)
            const rentSessions = fs.readdirSync(pairingBaseDir, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            if (rentSessions.length > 0) {
                if (isShutdown) console.log(chalk.cyan(`🔄 [MULTI-TENANT] Cleaning sessions for ${rentSessions.length} rented bots...`));
                
                rentSessions.forEach(userFolder => {
                    const userSessionPath = path.join(pairingBaseDir, userFolder);
                    cleanSingleDir(userSessionPath, `RENTED: ${userFolder}`, isShutdown);
                });
            }
        }
    } catch (error) {
        console.error(chalk.red(`⚠️ Error reading pairing directory: ${error.message}`));
    }
    
    if (isShutdown) console.log(chalk.green.bold(`✅ [SYSTEM] All session files cleanup completed.`));
}

// Function to terminate session Incase of logout error (prevents bot from crashing Incase of bad session)
function nukeSession() {
    const sessionDir = path.join(__dirname, 'session');
    try {
        if (!fs.existsSync(sessionDir)) return;
        fs.rmSync(sessionDir, { recursive: true, force: true });
        console.log(chalk.green.bold('[SESSION MANAGER] Host session files successfully nuked. Restart required.'));
    } catch (error) {
        console.error(chalk.red.bold(`[SESSION MANAGER ERROR] Failed to nuke session: ${error.message}`));
    }
}

// declaration 
let saveCreds;
let shuttingDown = false;    

// Function to save session before crash Incase of unexpected and uncontrolled crashes.
async function saveSessionBeforeExit() {
    try {
        console.log(chalk.yellow('💾 [LANDLORD] Saving Host session...'));
        if (typeof saveCreds === 'function') {
            await saveCreds();
            console.log(chalk.green('✅ Host Session saved.'));
        }

        if (global.tenantSaveCreds && global.tenantSaveCreds.size > 0) {
            console.log(chalk.cyan(`💾 [LANDLORD] Saving ${global.tenantSaveCreds.size} tenant sessions...`));
            const savePromises = Array.from(global.tenantSaveCreds.values()).map(async (tenantSave) => {
                if (typeof tenantSave === 'function') {
                    try {
                        await tenantSave();
                    } catch (err) {
                        console.error('⚠️ Failed to save a tenant session:', err.message);
                    }
                }
            });

            await Promise.all(savePromises);
            console.log(chalk.green(`✅ All ${global.tenantSaveCreds.size} tenant sessions saved.`));
        }
    } catch (err) {
        console.error(chalk.red('❌ Failed to save session before exit:'), err && err.message ? err.message : err);
    }
}

    
// Function To Shutdown the bot smoothly (controlled crash)
async function gracefulShutdown(event = 'unknown') {
    if (shuttingDown) return; 
    shuttingDown = true;
    try {
        console.log(chalk.red.bold(`\n🚨 [SHUTDOWN] Bot is shutting down due to ${event}...`));
        await saveSessionBeforeExit();
        await new Promise(r => setTimeout(r, 1000));
        clearSessionFiles(true);
        await new Promise(r => setTimeout(r, 500));
    } catch (err) {
        console.error(chalk.red('❌ Error during gracefulShutdown:'), err && err.message ? err.message : err);
    } finally {
        process.exit(0);
    }
}

// Function to connect user to WhatsApp (main)
async function connectToWhatsApp() { 
         // Firstly Load Database 
         await loadDatabase();
       // Firstly check for updates from GitHub....
    const isUpdating = await checkUpdate();
    if (isUpdating) {
        return;
    }

    // basic declaration (used below)
    let isNewRegistration = false; 
    const usedRam = formatp(os.totalmem() - os.freemem());
    const totalRam = formatp(os.totalmem());
    const todayDateWIB = new Date().toLocaleDateString('id-ID', { timeZone: `${global.timezone || Africa/Lagos}`, year: 'numeric', month: 'long', day: 'numeric' });
    const time = new Intl.DateTimeFormat('en-GB', {
        timeZone: `${global.timezone || Africa/Lagos}`,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date());
       // Declaration to create user session 
    const { state, saveCreds: saveCredsLocal } = await useMultiFileAuthState(path.join(__dirname, 'session'));
    saveCreds = saveCredsLocal;
     
     // safety protocol (almost never happens unless you're using a very older version of baileys)
    if (!saveCreds || typeof saveCreds !== 'function') {
        console.log(chalk.red.bold('❌ saveCreds is undefined — Baileys did not return valid auth state.'));
        console.log(chalk.yellow('➡ Try deleting the "session" folder and restart to re-initialize.'));
        return;
    }

      // Multiple browser poll (to try and bypass WhatsApp's rate Limit Incase of unexpected spam (almost never happens)
    const browserPool = [
        ["Windows", "Chrome", "118.0.5993.90"],
        ["Android", "Firefox", "117.0"],
        ["macOS", "Safari", "16.5"],
        ["Linux", "Edge", "115.0"],
        ["iOS", "Chrome", "117.0"]
    ];
    const browser = browserPool[Math.floor(Math.random() * browserPool.length)];
     
     // Basic declaration to featch the latest baileys version
    const { version, isLatest } = await fetchLatestBaileysVersion();
   // console.log(chalk.cyan(`[CONNECTION] Using Baileys version: ${version.join('.')}, isLatest: ${isLatest}`));
    
    // connection details that's sent to baileys 
    const HeavstalTech = makeWASocket({
        connectTimeoutMs: 60000, // 6 second max timeout
        defaultQueryTimeoutMs: 0, // at to undefined at will
        keepAliveIntervalMs: 30000, // 3 seconds alive time on connection 
        emitOwnEvents: false, // trust me you don't want to enable it
        fireInitQueries: true, // nube
        generateHighQualityLinkPreview: true, // to generate quality link preview (it basically describes itself)
        syncFullHistory: true, // set to false if your server ram is really low or your presume you're in tons of group chats
        markOnlineOnConnect: true, // keep this true
        logger: pino({ level: "fatal" }), // set to "silent" during development
        printQRInTerminal: false, // we'll handle this manually below
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino().child({
                level: 'fatal', // set to "silent" during development
                stream: 'store' // stores all your messages
            })),
        },
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }

            return message;
        }, // Edit at will
        version: version, // as we declared above 
        browser: browser, // our browser poll (bypass WhatsApp's rate limiting)
        resolveMsgBuffer // recommended to leave as it is
    });
    
    HeavstalTech.isRentBot = false;
    
    // Our pairing code system
    if (usePairingCode && !HeavstalTech.authState.creds.registered) {
        let phoneNumber = global.phoneNumber;

        if (!phoneNumber || phoneNumber.trim() === '') {
            console.log(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number with country code\nExample: 23481xxxx  : : `)));
            // Keep asking until dey drop a valid number.....
            while (true) {
                phoneNumber = await question(chalk.yellow("Number > : "));
                phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

                if (!phoneNumber) {
                    console.log(chalk.red("❌ Input cannot be empty."));
                    continue;
                }

                // 1. Check for leading Zero (Common mistake)
                if (phoneNumber.startsWith('0')) {
                    let err = "⚠️ Invalid Format: Do not start with '0'. Use your Country Code (e.g. 234...)";
                    console.log(chalk.bgBlack(chalk.redBright(err)));
                    if (process.send) process.send({ type: 'invalid_phone', message: err });
                    continue;
                }

                // 0. Check length against regex
                if (!/^\d{7,15}$/.test(phoneNumber)) {
                    let err = "❌ Invalid Number Length! A valid international number must be between 7 and 15 digits.";
                    console.log(chalk.bgBlack(chalk.redBright(err)));
                    if (process.send) process.send({ type: 'invalid_phone', message: err });
                    continue;
                }

                // 2. Check against Baileys MCC List
                if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
                    let err = "❌ Invalid Country Code! Please start with your country code (e.g. 234, 91, 1).";
                    console.log(chalk.bgBlack(chalk.redBright(err)));
                    if (process.send) process.send({ type: 'invalid_phone', message: err });
                    continue;
                }

               // if they eventually get here then the num5is valid.....
                break;
            }
        } else {
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        }

        setTimeout(async () => {
            try {
                console.log(chalk.bgBlack(chalk.greenBright(`Requesting Pairing Code for: ${phoneNumber}`)));
                const code = await HeavstalTech.requestPairingCode(phoneNumber);
             //   const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
                if (process.send) {
                    process.send({ type: 'pairing_code', code: code });
                }
                console.log(chalk.black(chalk.bgGreen(` Your Pairing Code `)), chalk.black(chalk.white(code)));
                console.log(chalk.cyan(`Go to WhatsApp > Linked Devices > Link with Phone Number`));
            } catch (error) {
                if (process.send) process.send({ type: 'pairing_error', message: error.message });
                console.error(chalk.red('Failed to request pairing code.'), error.message);
                process.exit(1);
            }
        }, 3000);
    }
    
    
    // if connection via pair code is successful then we graceful proceed
    const store = makeInMemoryStore({
        logger: pino().child({
            level: 'fatal',
            stream: 'store'
        })
    }); // store all your WhatsApp messages (recommended to toggle "syncFullHistory" to "false")

    store.bind(HeavstalTech.ev);

    // =========================================================================
    //  UTILITIES & BINDINGS
    // =========================================================================

    // Load all "HeavstalTech." from System/Data5 (as declared above)
    bindSocketUtils(HeavstalTech, store);

    // conversion of lid to jid (dummy function)
    HeavstalTech.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    // decided wether or not the bot is public
    HeavstalTech.public = global.publicX;

    // =========================================================================
    //  CONNECTION EVENTS
    // =========================================================================

    // Our "connection.update" handler
    HeavstalTech.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update; // we now listen for qr too from baileys
        
        try {
            if (qr && !usePairingCode) {
                console.log(chalk.yellow("Scan The QR Code Below:\n"));
                qrcode.generate(qr, { small: true });
                if (process.send) process.send({ type: 'qr', qr: qr });
            } // if qr is available and usePairingCode is set to false, generate a small qr code
              
              // basic declarations
            const todayDateWIB = new Date().toLocaleDateString('id-ID', { timeZone: `${global.timezone}`, year: 'numeric', month: 'long', day: 'numeric' });
            const time = new Intl.DateTimeFormat('en-GB', {
                timeZone: `${global.timezone}`,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date());
            const usedRam = formatp(os.totalmem() - os.freemem());
            const totalRam = formatp(os.totalmem());
            
            if (connection === 'connecting') {
                console.log(chalk.yellow('Connecting to WhatsApp...'));
            } // this runs after this user has entered their pair code or scanned the qr code
         
              // self healing logic
            if (connection === 'close') {
                const reasonCode = new Boom(lastDisconnect?.error)?.output.statusCode;
                const reasonText = DisconnectReason[reasonCode] || 'Unknown';
                console.log(chalk.red(`Connection closed. Reason: ${reasonText} (${reasonCode})`));

                if (reasonCode === DisconnectReason.restartRequired) {
                    console.log(chalk.yellow.bold(`[RESTART REQUIRED] WhatsApp requires a restart. Shutting down gracefully...`));
                    await gracefulShutdown('restartRequired');
                
                } else if (reasonCode === DisconnectReason.loggedOut) {
                    console.log(chalk.red.bold(`🚫 Device Logged Out! Deleting session and restarting for re-pairing...`));
                    nukeSession();
                    await gracefulShutdown('loggedOut');

                } else {
                    console.log(chalk.yellow(`Temporary disconnect (${reasonText}). Baileys will attempt to reconnect automatically.`));
                }
            } else if (connection === 'open') {
                if (process.send) process.send({ type: 'bot_running' });
                console.log(chalk.green('Connection opened! Displaying status...'));
                if (isNewRegistration) {
                    console.log(chalk.yellow('Saving new session credentials...'));
                    await saveCreds();
                    console.log(chalk.yellow('Configuring SessionId & Setting Up WhatsApp Servers - This May Take A Few Seconds'));
                    await sleep(5000);
                }
                console.log(color(`\nWelcome To Verselor-V1 WhatsApp Bot By HEAVSTAL TECH`));
                await sleep(5000);
                
                // this runs if startup message is enabled (recommended to toggle if off to prevent spam)
                if (global.startup) {
                    const formatState = (value) => value ? 'ON ✅' : 'OFF ❌';
                    // ... (Your startup message string here - shortened for brevity in display, kept full in logic) ...
                    const settingsMessage = `*✅ VERSELOR-V1 SUCCESSFULLY CONNECTED ✅*
━━━━━━━━━━━━━━━━━━━━━━

> *DEFAULT SETTINGS*

🔹  *Prefix:*                     [ ${global.prefix} ]
🔹  *Public:*                    [ ${global.publicX} ]
🔹  *Sleep Mode:*              [  ${formatState(global.sleep)} ]
🔹  *Warn Limit:*                [ ${global.warnLimit} ]
🔹  *Only Group Chat:*         [ ${formatState(global.onlygroup)} ]
🔹  *Only Private Chat:*        [ ${formatState(global.onlyprivate)} ]
🔹  *Connect Via Pair Code:*    [ ${formatState(global.usePairingCode)} ]
🔹  *StartUp Message:*          [ ${formatState(global.startup)} ]
🔹  *Time-Zone:*                [ ${global.timezone} ]
🔹  *Auto-Typing:*              [ ${formatState(global.autoTyping)} ]
🔹  *Auto-Recording:*           [ ${formatState(global.autoRecord)} ]
🔹  *Auto-RecordType:*          [ ${global.autoRecordtype || 'Default'} ]
🔹  *Auto-Read:*                [ ${formatState(global.autoRead)} ]
🔹  *Auto-ViewStatus:*          [ ${formatState(global.autoViewStatus)} ]
🔹  *Auto-Bio:*                 [ ${formatState(global.autobio)} ]


━━━━━━━━━━━━━━━━━━━━━━
*🌐 OFFICIAL CHANNELS & SUPPORT*

> *Website:* https://heavstal-tech.vercel.app
> *WhatsApp Channel:* https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D
> *Telegram Channel:* https://t.me/promisemdv1
> *YouTube Channel:* https://www.youtube.com/@Heavstal_Tech
> *Telegram Group:* https://t.me/+OXpT1vvQ5K81MmVk
> *WhatsApp Group:* ttps://chat.whatsapp.com/HlfH698T5LAICbpQV5A5ku?mode=wwt
> More Channels At: https://heavstal-tech.vercel.app/community


━━━━━━━━━━━━━━━━━━━━━━━

*⚠️ Note:*  
If the bot doesn’t respond, kindly restart it from the host or control panel.

To avoid a potential WhatsApp ban, it is recommended to turn off the startup message using:  
*${global.prefix}startupmsg off*

Stay updated with the latest releases from Heavstal Tech™

---
${footer}
`;    
                    HeavstalTech.sendMessage(HeavstalTech.user.id.split(":")[0] + "@s.whatsapp.net", { text: settingsMessage })
                }       
                
                console.log(`\n\n
╭━━〔 𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑      𝐕𝟏 〕━━╮
┃ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦: 𝗔𝗖𝗧𝗜𝗩𝗘
┃─────────────────────────
┃ Prefix      : [ ${global.prefix} ]
┃ Version     : ${global.version}
┃ Developer  : ${global.developer}
┃ Runtime     : ${runtime(process.uptime())}
┃ ʜᴏsᴛ         : ${os.hostname()}
┃ ᴘʟᴀᴛғᴏʀᴍ    : ${os.platform()}
┃ Time-Zone   : ${global.timezone}
┃ Date/Time   : ${todayDateWIB} / ${time}
┃ Server Ram  : ${usedRam} / ${totalRam}
╰═「 Powered By Heavstal Tech 」

${footer}
`);
                HeavstalTech.setStatus(`VERSELOR V1 BY HEAVSTAL TECH`);
            }
        } catch (e) {
            console.error('⚠️ Error showing banner:', e);
        }
    });

    HeavstalTech.ev.on('creds.update', saveCreds); // update creds.json

    // =========================================================================
    //  MESSAGE EVENTS
    // =========================================================================

    // handle message Status (I/O)
    HeavstalTech.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
            if (!HeavstalTech.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
             if (mek.key.id.startsWith('Raol')) return;
            const m = smsg(HeavstalTech, mek, store);
            // we now use out declared "handleMessages" above here
            await handleMessages(HeavstalTech, m, chatUpdate, store);

        } catch (error) {
            console.error(chalk.red.bold("CRITICAL ERROR in messages.upsert:"), error);
        }
    });

     await attachEvents(HeavstalTech, store);

    // log unexpected errors
    HeavstalTech.ev.on('error', (err) => {
        console.error(chalk.red("Error: "), err.message || err);
    });
}

// function to call the "clearSessionFiles" function Above, (the auto clear session function - runs every 2 hours so your low end host won't crash on our of memory - note: after clearing session, the bot may behave abnormal "temporarily" but that's fine - it's a controlled abnormally)
function autoClearSession() {
    const clearInterval = 2 * 60 * 60 * 1000;
    setInterval(() => clearSessionFiles(false), clearInterval);
    console.log(chalk.yellow.bold(`🔄 [AUTO CLEAN] Auto clear session is running every 2 hours.`));
}


['SIGINT', 'SIGTERM', 'SIGTSTP', 'beforeExit', 'exit'].forEach((ev) => {
    process.on(ev, () => {
        try {
            gracefulShutdown(ev);
        } catch (e) {
            console.error('Error invoking gracefulShutdown:', e && e.message ? e.message : e);
            process.exit(0);
        }
    });
});

// captures uncaught exceptions and gracefully shut down 
process.on('uncaughtException', async (err) => {
    console.error(chalk.red('Uncaught Exception:'), err && err.stack ? err.stack : err);
    await gracefulShutdown('uncaughtException');
});

// captures unhandled rejections and gracefully (mostly missing modules) shuts down 
process.on('unhandledRejection', async (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
    await gracefulShutdown('unhandledRejection');
});

// detects process.exits from anywhere in the whole bot codebase and gracefully Shutdown
process.on('message', (msg) => {
    if (msg === 'shutdown' || msg === 'SIGINT' || msg === 'SIGTERM') {
        gracefulShutdown('message:' + msg);
    }
});

// save session before exit declaration (to be used anywhere in tbe whole codebase)
global.saveSessionNow = async () => {
    console.log(chalk.yellow('Manual session save requested.'));
    await saveSessionBeforeExit();
};

// function to auto save session running every 1 hour
const autosaveIntervalMs = 30 * 1000;
setInterval(async () => {
    try {
        // Save Host
        if (typeof saveCreds === 'function') {
            await saveCreds();
        }
        // Save Tenants
        if (global.tenantSaveCreds && global.tenantSaveCreds.size > 0) {
            for (const [user, tenantSave] of global.tenantSaveCreds) {
                if (typeof tenantSave === 'function') {
                    await tenantSave(); // Sequential save to avoid I/O spike
                }
            }
        }
    } catch (e) {
        console.error(chalk.red('Auto-save error:'), e && e.message ? e.message : e);
    }
}, autosaveIntervalMs);


autoClearSession(); // call the auto clear session function here to run every 2 hours automatically 
connectToWhatsApp().catch(err => console.error("FATAL ERROR during initial connection:", err)); // and finally call the "connectToWhatsApp" function to get the whole bot started.
