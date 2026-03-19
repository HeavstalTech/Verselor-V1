process.on('uncaughtException', (err) => {
    console.error('An uncaught exception occurred:', err);
    process.exit(1); // Exit with a failure code
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
    Browsers,
    getContentType,
    getAggregateVotesInPollMessage,
    PHONENUMBER_MCC
} = require("@heavstaltech/baileys");
const NodeCache = require("node-cache");
const _ = require('lodash');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const chalk = require('chalk');
const FileType = require('file-type');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require(path.join(__dirname, '..', 'System', 'Data2.js'));
const { smsg, getBuffer, sleep } = require(path.join(__dirname, '..', 'System', 'Data1.js'));
const { bindSocketUtils } = require(path.join(__dirname, '..', 'System', 'Data5.js'));
const attachEvents = require(path.join(__dirname, '..', 'System', 'Data8.js'));
const handleMessages = require(path.join(__dirname, '..', 'Start', 'LordPromise.js'));

// Function to clean up session files on fatal errors
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        try {
            fs.rmSync(folderPath, { recursive: true, force: true });
            console.log(chalk.green(`[SESSION MANAGER] Successfully deleted invalid session folder: ${folderPath}`));
        } catch (e) {
            console.error(chalk.red(`[SESSION MANAGER] Error deleting session folder ${folderPath}:`), e);
        }
    }
}

let msgRetryCounterCache;
const autoLoadPairs = async () => {
  console.log(chalk.yellow('🔄 Auto-loading all paired users...'));

  const pairingDir = path.join(__dirname, 'pairing');
  if (!fs.existsSync(pairingDir)) {
    console.log(chalk.red('❌ Pairing directory not found.'));
    return;
  }

  const pairUsers = fs.readdirSync(pairingDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name.endsWith('@s.whatsapp.net'));

  if (pairUsers.length === 0) {
    console.log(chalk.yellow('No paired users found.'));
    return;
  }

  console.log(chalk.green(`✅ Found ${pairUsers.length} users. Starting connections...`));

  for (const user of pairUsers) {
    try {
      await startpairing(user);
      console.log(chalk.green(`✅ Connected: ${user}`));
    } catch (e) {
      console.log(chalk.red(`❌ Failed for ${user}: ${e.message}`));
    }
  }

  console.log(chalk.green('✅ All paired users processed.'));
};

autoLoadPairs(); 
function deleteFolderRecursive(folderPath) {
if (fs.existsSync(folderPath)) {
fs.readdirSync(folderPath).forEach(file => {
const curPath = path.join(folderPath, file);
fs.lstatSync(curPath).isDirectory() ? deleteFolderRecursive(curPath) : fs.unlinkSync(curPath);
});
fs.rmdirSync(folderPath);
}
}


async function startpairing(xeonNumber) {
    const sessionPath = path.join(__dirname, 'pairing/', xeonNumber);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    
    if (global.tenantSaveCreds) {
        global.tenantSaveCreds.set(xeonNumber, saveCreds);
    }
    
    const store = makeInMemoryStore({
    logger: pino().child({
        level: 'fatal',
        stream: 'store'
      })
  });

    // --- START: NEW, ROBUST CONNECTION LOGIC ---
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.cyan(`[PAIRING] Using Baileys version: ${version.join('.')}, isLatest: ${isLatest}`));

    const browserPool = [
        ["Windows", "Chrome", "118.0.5993.90"],
        ["Android", "Firefox", "117.0"],
        ["macOS", "Safari", "16.5"],
    ];
    const browser = browserPool[Math.floor(Math.random() * browserPool.length)];

    const HeavstalTech = makeWASocket({
        logger: pino({ level: "fatal" }),
        printQRInTerminal: false,
        auth: state,
        browser: browser,
        version: version,
        getMessage: async key => {
            if (store) {
         const msg = await store.loadMessage(key.remoteJid, key.id);
         return msg?.message || undefined;
        }
         return { conversation: 'Hello' };
       },
        shouldSyncHistoryMessage: msg => {
            console.log(`\x1b[32m[PAIRING] Loading Chat [${msg.progress}%]\x1b[39m`);
            return !!msg.syncType;
        },
    });
    HeavstalTech.isRentBot = true; 

    store.bind(HeavstalTech.ev);

    if (!state.creds.registered) {
        console.log(chalk.yellow(`[PAIRING] New registration for ${xeonNumber}. Ensuring stable connection...`));
        
        await sleep(5000);

        if (HeavstalTech.ws?.readyState !== "open") {
            console.log(chalk.red("[PAIRING] ⚠️ WebSocket not ready after initial wait, waiting 3 more seconds and attempting anyway..."));
            await sleep(3000);
        }
        try { 
            let phoneNumber = xeonNumber.replace(/[^0-9]/g, '');
            const code = await HeavstalTech.requestPairingCode(phoneNumber);
            console.log(chalk.green.bold(`[PAIRING] VALID Pairing Code for ${xeonNumber} is: ${code}`));

            fs.writeFileSync(
                path.join(__dirname, 'pairing', 'pairing.json'),
                JSON.stringify({ "code": code }, null, 2),
                'utf8'
            );
        } catch (error) {
            console.error(chalk.red(`[PAIRING] CRITICAL: Failed to request pairing code for ${xeonNumber}.`), error);
            deleteFolderRecursive(sessionPath);
            throw new Error('Pairing code request failed.');
        }
    }
    // --- END: NEW, ROBUST CONNECTION LOGIC ---

    HeavstalTech.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
        } else {
            return jid;
        }
    };

    HeavstalTech.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message || mek.key.remoteJid === 'status@broadcast') return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
            if (mek.key.id.startsWith('Raol')) return;
            
            const m = smsg(HeavstalTech, mek, store);
            await handleMessages(HeavstalTech, m, chatUpdate, store);
            } catch (error) {
            console.error(chalk.red.bold("CRITICAL ERROR in messages.upsert:"), error);
        }
    });
    
       await attachEvents(HeavstalTech, store);

    // --- REFINED CONNECTION HANDLER ---
    HeavstalTech.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'connecting') {
            console.log(chalk.yellow('[PAIRING] Connecting to WhatsApp...'));
        }
        if (connection === 'open') {
            console.log(chalk.green.bold(`[PAIRING] Connection successfully established for ${xeonNumber}. Bot is active.`));
        }

        if (connection === "close") {
            const reasonCode = new Boom(lastDisconnect?.error)?.output.statusCode;
            const reasonText = DisconnectReason[reasonCode] || `Unknown (${reasonCode})`;
            console.log(chalk.red(`[PAIRING] Connection closed for ${xeonNumber}. Reason: ${reasonText}`));

            if (reasonCode === DisconnectReason.badSession || reasonCode === 405) {
                console.log(chalk.red.bold(`[FATAL] Bad session file for ${xeonNumber}. Deleting session. Please try pairing again.`));
                 if (global.tenantSaveCreds) global.tenantSaveCreds.delete(xeonNumber);
                deleteFolderRecursive(sessionPath);
            } else if (reasonCode === DisconnectReason.loggedOut) {
                console.log(chalk.red.bold(`[LOGGED OUT] Device logged out for ${xeonNumber}. Deleting session.`));
                   if (global.tenantSaveCreds) global.tenantSaveCreds.delete(xeonNumber);
                deleteFolderRecursive(sessionPath);
            }
        }
    });
    
    HeavstalTech.ev.on('creds.update', saveCreds);
    bindSocketUtils(Heavstaltech, store);
    HeavstalTech.ev.on('creds.update', saveCreds);
    }
    
module.exports = startpairing

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update= '${__filename}'`))
delete require.cache[file]
require(file)

})
