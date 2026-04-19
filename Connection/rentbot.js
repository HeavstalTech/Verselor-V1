// Connection/rentbot.js
process.on('uncaughtException', (err) => {
    console.error('An uncaught exception occurred:', err);
    process.exit(1); // Exit with a failure code
});

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import "#settings/config.js"
import pkg from "@heavstaltech/baileys";

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
    proto,
    getAggregateVotesInPollMessage,
    PHONENUMBER_MCC,
    jidNormalizedUser,
    globalLidMapping
} = pkg;
import _ from 'lodash';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import chalk from 'chalk';
import { imageToWebp, videoToWebp, writeExifImg, writeExifVid } from "#System/Data2.js";
import { smsg, getBuffer, sleep } from "#System/Data1.js";
import { makeInMemoryStore } from "#System/Data4.js";
import { bindSocketUtils } from "#System/Data5.js";
import attachEvents from "#System/Data8.js"
import handleMessages from "#Start/LordPromise.js";
const footer = global.footer


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

export default async function startpairing(userNumber) {
    const sessionPath = path.join(__dirname, 'pairing/', userNumber);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    
    if (global.tenantSaveCreds) {
        global.tenantSaveCreds.set(userNumber, saveCreds);
    }
    
    const store = makeInMemoryStore({
        logger: pino().child({
            level: 'fatal',
            stream: 'store'
        }),
        maxMessagesPerChat: 50,
    });

    const { version, isLatest } = await fetchLatestBaileysVersion();
    const browserPool = [["Windows", "Chrome", "122.0.6261.112"],["Windows", "Edge", "122.0.2365.92"],["Windows", "Firefox", "123.0"],["macOS", "Chrome", "122.0.6261.112"],
        ["macOS", "Safari", "17.3"],["macOS", "Firefox", "123.0"],["Linux", "Chrome", "122.0.6261.112"],["Linux", "Firefox", "123.0"]
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
        console.log(chalk.yellow(`[PAIRING] New registration for ${userNumber}. Ensuring stable connection...`));
        
        await sleep(5000);

        if (HeavstalTech.ws?.readyState !== "open") {
            console.log(chalk.red("[PAIRING] ⚠️ WebSocket not ready after initial wait, waiting 3 more seconds and attempting anyway..."));
            await sleep(3000);
        }
        try { 
            let phoneNumber = userNumber.replace(/[^0-9]/g, '');
            const code = await HeavstalTech.requestPairingCode(phoneNumber);
            console.log(chalk.green.bold(`[PAIRING] VALID Pairing Code for ${userNumber} is: ${code}`));

            fs.writeFileSync(
                path.join(__dirname, 'pairing', 'pairing.json'),
                JSON.stringify({ "code": code }, null, 2),
                'utf8'
            );
        } catch (error) {
            console.error(chalk.red(`[PAIRING] CRITICAL: Failed to request pairing code for ${userNumber}.`), error);
            deleteFolderRecursive(sessionPath);
            throw new Error('Pairing code request failed.');
        }
    }

    HeavstalTech.decodeJid = (jid) => {
        if (!jid) return jid;
        let normalized = jidNormalizedUser(jid);
        if (normalized.endsWith('@lid')) {
            let realNumber = globalLidMapping.getPnFromLid(normalized);
            if (realNumber) return realNumber;
        }
        return normalized;
    };

    HeavstalTech.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (chatUpdate.type !== 'notify') return;
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

    HeavstalTech.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'connecting') {
            console.log(chalk.yellow('[PAIRING] Connecting to WhatsApp...'));
        }
        if (connection === 'open') {
            console.log(chalk.green.bold(`[PAIRING] Connection successfully established for ${userNumber}. Bot is active.`));
            await sleep(5000);
                
                if (global.startup) {
                    const formatState = (value) => value ? 'ON ✅' : 'OFF ❌';
                    const settingsMessage = `*✅ VERSELOR-V1 SUCCESSFULLY CONNECTED ✅*
━━━━━━━━━━━━━━━━━━━━━━

> *DEFAULT SETTINGS*
> Type *${global.prefix}menu* to proceed

${HeavstalTech.isRentBot ? `YOU ARE A PAIRED USER AND YOU HAVE LIMITED ACCESS TO MULTIPLE COMMANDS, Type ${global.prefix}repo to see hoe to deploy your own version of this bot.` : `> Read:`}

🔹  *Prefix:*               [ ${global.prefix} ]
🔹  *Public:*               [ ${global.publicX} ]
🔹  *Sleep Mode:*           [  ${formatState(global.sleep)} ]
🔹  *Warn Limit:*           [ ${global.warnLimit} ]
🔹  *Only Group Chat:*      [ ${formatState(global.onlygroup)} ]
🔹  *Only Private Chat:*    [ ${formatState(global.onlyprivate)} ]
🔹  *Connect Via Pair Code:* [ ${formatState(global.usePairingCode)} ]
🔹  *StartUp Message:*      [ ${formatState(global.startup)} ]
🔹  *Time-Zone:*            [ ${global.timezone} ]
🔹  *Auto-Typing:*          [ ${formatState(global.autoTyping)} ]
🔹  *Auto-Recording:*       [ ${formatState(global.autoRecord)} ]
🔹  *Auto-RecordType:*      [ ${global.autoRecordtype || 'Default'} ]
🔹  *Auto-Read:*            [ ${formatState(global.autoRead)} ]
🔹  *Auto-ViewStatus:*      [ ${formatState(global.autoViewStatus)} ]
🔹  *Auto-Bio:*             [ ${formatState(global.autobio)} ]


━━━━━━━━━━━━━━━━━━━━━━
*🌐 OFFICIAL CHANNELS & SUPPORT*

> *Website:* https://heavstal.com.ng
> *WhatsApp Channel:* https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D
> *Telegram Channel:* https://t.me/promisemdv1
> *YouTube Channel:* https://www.youtube.com/@Heavstal_Tech
> *Telegram Group:* https://t.me/+OXpT1vvQ5K81MmVk
> *WhatsApp Group:* ttps://chat.whatsapp.com/HlfH698T5LAICbpQV5A5ku?mode=wwt
> More Channels At: https://heavstal.com.ng/community


━━━━━━━━━━━━━━━━━━━━━━━

*⚠️ Note:*  
If the bot doesn’t respond, kindly restart it from the host or control panel.

To avoid a potential WhatsApp ban, it is recommended to turn off the startup message using:  
*${global.prefix}startupmsg off*

Stay updated with the latest releases from Heavstal Tech™

---
${footer}
`;
                try {
                    const targetJid = HeavstalTech.user.id.split(":")[0] + "@s.whatsapp.net";
                    await HeavstalTech.sendMessage(targetJid, { text: settingsMessage });
                    if (!global.db.data.users[targetJid]) global.db.data.users[targetJid] = {};
                    if (!global.db.data.users[targetJid].hasBeenWelcomedByAI) {
                        console.log(chalk.cyan(`Generating AI Welcome for Tenant: ${targetJid}`));
                        
                        const aiPersona = `You are Verselor AI. The user has JUST rented/paired to your multi-tenant system for the first time.
Your task:
1. Give a mind-blowing, welcoming introduction. (Use your South London persona).
2. Tell them they are currently running on a shared "RentBot" instance but have access to powerful tools.
3. Tell them to summon you anytime by including 'Verselor', 'botai', 'bai', or 'askai' in their text.
4. Ask them: "Would you like me to pull up the bot's menu for you?"`;

                        const response = await fetch('https://heavstal.com.ng/api/v1/jeden', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'x-api-key': "ht_live_master-key" },
                            body: JSON.stringify({ 
                                prompt: "I just paired to the bot. What's next?", 
                                persona: aiPersona 
                            })
                        });
                    
  const res = await response.json();
   if (res.status === 'success' && res.data && res.data.response) {
    const aiText = res.data.response.trim();
    await sleep(4000); 
    await HeavstalTech.sendMessage(targetJid, { text: aiText });
    const aiMemoryPath = path.join(__dirname, '..', 'Start', 'database', 'ai_memory.json');
    
    if (!global.aiMemory) {
        global.aiMemory = fs.existsSync(aiMemoryPath) 
            ? JSON.parse(fs.readFileSync(aiMemoryPath, 'utf8')) 
            : {};
    }
    if (!global.aiMemory[targetJid]) global.aiMemory[targetJid] = [];
    global.aiMemory[targetJid].push({ role: "ai", text: aiText });
    fs.writeFileSync(aiMemoryPath, JSON.stringify(global.aiMemory, null, 2));
    global.db.data.users[targetJid].hasBeenWelcomedByAI = true;
    await global.db.write();
                       }
                    }

                } catch (e) {
                    console.log(`Failed To Send StartUp Message To ${userNumber}:\n${e}`);
                }
            }
        }

        if (connection === "close") {
            const reasonCode = new Boom(lastDisconnect?.error)?.output.statusCode;
            const reasonText = DisconnectReason[reasonCode] || `Unknown (${reasonCode})`;
            console.log(chalk.red(`[PAIRING] Connection closed for ${userNumber}. Reason: ${reasonText}`));

            if (reasonCode === DisconnectReason.badSession || reasonCode === 405) {
                console.log(chalk.red.bold(`[FATAL] Bad session file for ${userNumber}. Deleting session. Please try pairing again.`));
                 if (global.tenantSaveCreds) global.tenantSaveCreds.delete(userNumber);
                deleteFolderRecursive(sessionPath);
            } else if (reasonCode === DisconnectReason.restartRequired) {
                console.log("[RESTART REQUIRED] Reconnecting...")
                await startpairing(userNumber);
            } else if (reasonCode === DisconnectReason.loggedOut) {
                console.log(chalk.red.bold(`[LOGGED OUT] Device logged out for ${userNumber}. Deleting session.`));
                   if (global.tenantSaveCreds) global.tenantSaveCreds.delete(userNumber);
                deleteFolderRecursive(sessionPath);
            }
        }
    });
    
    HeavstalTech.ev.on('creds.update', saveCreds);
    bindSocketUtils(HeavstalTech, store);
}

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

fs.watchFile(__filename, async () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    await import(`${import.meta.url}?update=${Date.now()}`);
});
