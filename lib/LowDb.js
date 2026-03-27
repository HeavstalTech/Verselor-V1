// lib/LowDb.js

import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFolder = path.join(__dirname, '..', 'Start', 'database');
const dbFile = path.join(dbFolder, 'database_main.json');
const footer = `> \`© A Product Of Heavstal Tech™\``;

if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, {});
const parseEnvArray = (envVar, defaultArr) => {
    let userNumbers =[];
    if (envVar && envVar.trim() !== '') {
        userNumbers = envVar.split(',')
            .map(v => v.trim())
            .filter(v => v !== '')
            .map(num => {
                return num.includes('@s.whatsapp.net') ? num : num + '@s.whatsapp.net';
            });
    }
    const combined =[...defaultArr, ...userNumbers];
    return[...new Set(combined)];
};

const parseEnvBool = (envVar, defaultBool) => {
    if (envVar === undefined) return defaultBool;
    return envVar === 'true';
};

async function loadDatabase() {
    await db.read();
    db.data ||= {};
    db.data.users ||= {};
    db.data.chats ||= {};
    db.data.mess ||= {};
    db.data.sticker_cmd ||= {};
    db.data.economy ||= {};
    db.data.bankData ||= {};
    db.data.others ||= {};
    if (!db.data.settings) {
        db.data.settings = {
            owners: parseEnvArray(process.env.OWNERS,["2348137256404@s.whatsapp.net", "2348166546725@s.whatsapp.net"]),
            premium: parseEnvArray(process.env.PREMIUM,["2348137256404@s.whatsapp.net", "2348166546725@s.whatsapp.net"]),
            sudo: parseEnvArray(process.env.SUDO,["2348137256404@s.whatsapp.net", "2348166546725@s.whatsapp.net"]),
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
        };
    }

    await db.write();
    global.db = db;
}

export { 
    loadDatabase,
    db
};

fs.watchFile(__filename, async () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    await import(`${import.meta.url}?update=${Date.now()}`);
});