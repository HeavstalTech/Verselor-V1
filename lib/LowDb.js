// lib/LowDb.js

const path = require('path');
const fs = require('fs');

const { Low, JSONFile } = require(path.join(__dirname, '..', 'lib', 'lowdb'));
const dbFolder = path.join(__dirname, '..', 'Start', 'database');
const dbFile = path.join(dbFolder, 'database_main.json');
const footer = `> \`© A Product Of Heavstal Tech™\``;

// Create The folder....
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// 2. Initialize the Adapter
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// Helpers to safely parse arrays & booleans from Env Variables
const parseEnvArray = (envVar, defaultArr) => {
    if (!envVar) return defaultArr;
    return envVar.split(',').map(v => {
        let num = v.trim();
        return num.includes('@s.whatsapp.net') ? num : num + '@s.whatsapp.net';
    });
};

const parseEnvBool = (envVar, defaultBool) => {
    if (envVar === undefined) return defaultBool;
    return envVar === 'true'; // Checks string matches
};

// 3. Define the Loader (Updated to load from process.env with fallbacks)
async function loadDatabase() {
    await db.read();
    db.data ||= {
        users: {},     
        chats: {},     
        settings: {
            owners: parseEnvArray(process.env.OWNERS,["2348137256404@s.whatsapp.net","2348166546725@s.whatsapp.net"]),
            premium: parseEnvArray(process.env.PREMIUM,["2348137256404@s.whatsapp.net","2348166546725@s.whatsapp.net"]),
            sudo: parseEnvArray(process.env.SUDO,["2348137256404@s.whatsapp.net","2348166546725@s.whatsapp.net"]),
            banned: [],
            bannedChats: [],
            blocklist:[],
            anticall: process.env.ANTICALL || 'off',
            prefix: process.env.PREFIX || ".",
            timezone: process.env.TIMEZONE || "Africa/Lagos",
            menu: process.env.MENU_STYLE || 'v1',
            thumbnail: process.env.THUMBNAIL || "https://files.catbox.moe/g8pxls.png",
            HT_API_KEY: process.env.HT_API_KEY || "",
            publicX: parseEnvBool(process.env.PUBLIC_MODE, true),
            sleep: parseEnvBool(process.env.SLEEP_MODE, false),
            onlyprivate: parseEnvBool(process.env.ONLY_PRIVATE, false),
            onlygroup: parseEnvBool(process.env.ONLY_GROUP, false),
            startup: parseEnvBool(process.env.STARTUP_MESSAGE, true),
            Areact: parseEnvBool(process.env.AUTO_REACT, false),
            autoRecord: parseEnvBool(process.env.AUTO_RECORD, false),
            autoTyping: parseEnvBool(process.env.AUTO_TYPING, false),
            autoRecordtype: parseEnvBool(process.env.AUTO_RECORD_TYPE, false),
            autoRead: parseEnvBool(process.env.AUTO_READ, false),
            autobio: parseEnvBool(process.env.AUTO_BIO, false),
            autoViewStatus: parseEnvBool(process.env.AUTO_VIEW_STATUS, false),
            language: process.env.LANGUAGE || "en",
            warnLimit: parseInt(process.env.WARN_LIMIT) || 3,
            AiName: process.env.AI_NAME || "VERSELOR AI",
            AiOwner: process.env.AI_OWNER || "HEAVSTAL TECH",
            ai_persona: process.env.AI_PERSONA || "You are a helpful assistant named Verselor V1 created by Heavstal Tech. You answer questions concisely.",
            ai2_mode: process.env.AI2_MODE || "neutral", 
            onlypc: process.env.ONLY_PC_MSG || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛs ᴅᴜᴇ ᴛᴏ ᴏᴡɴᴇʀ sᴇᴛᴛɪɴɢs\n\n${footer}`,
            onlygc: process.env.ONLY_GC_MSG || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ᴅᴜᴇ ᴛᴏ ᴏᴡɴᴇʀ sᴇᴛᴛɪɴɢs\n\n${footer}`,
            AliveMsg: process.env.ALIVE_MSG || "*ʜᴇʟʟᴏ*\n\nVERSELOR V1 IS ALIVE",
            badwords:["porn", "xnxx", "sex", "tities", "boobie", "titties", "nude", "nsfw", "hentai", "erotic", "pornography", "sexy", "fuck", "dick", "cock", "pussy", "ass", "boobs", "tits", "naked", "nudes", "blowjob", "cum", "suck", "fucking", "anal", "vagina", "penis", "bdsm", "boobie", "fetish", "hardcore", "masturbation"]
        },
        mess: {},
        sticker_cmd: {}, 
        economy: {},   
        bankData: {},
        others: {}
    };
    await db.write();
    global.db = db;
}

module.exports = { 
    loadDatabase,
    db
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(require('chalk').redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});process.env
