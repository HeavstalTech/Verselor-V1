// lib/LowDb.js

const path = require('path');
const fs = require('fs');

const { Low, JSONFile } = require(path.join(__dirname, '..', 'lib', 'lowdb'));
const dbFolder = path.join(__dirname, '..', 'Start', 'database');
const dbFile = path.join(dbFolder, 'database_main.json');
const footer = `> \`© A Product Of Heavstal Tech™\``

// Create The folder....
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// 2. Initialize the Adapter
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// 3. Define the Loader
async function loadDatabase() {
    await db.read();
    db.data ||= {
        users: {},     
        chats: {},     
        settings: {
            owners: ["2348137256404@s.whatsapp.net","2348166546725@s.whatsapp.net"],
            premium: ["2348137256404@s.whatsapp.net","2348166546725@s.whatsapp.net"],
            sudo: ["2348137256404@s.whatsapp.net","2348166546725@s.whatsapp.net"],
            banned: [],
            bannedChats: [],
            blocklist: [],
            anticall: 'off',
            prefix: ".",
            timezone:  "Africa/Lagos",
            menu: 'v1',
            thumbnail: "https://files.catbox.moe/g8pxls.png",
            HT_API_KEY: "",
            publicX: true,
            sleep: false,
            onlyprivate: false,
            onlygroup: false,
            startup: true,
            Areact: false,
            autoRecord: false,
            autoTyping: false,
            autoRecordtype: false,
            autoRead: false,
            autobio: false,
            autoViewStatus: false,
            language: "en",
            warnLimit: 3,
            AiName: "VERSELOR AI",
            AiOwner: "HEAVSTAL TECH",
            ai_persona: "You are a helpful assistant named Verselor V1 created by Heavstal Tech. You answer questions concisely.",
            ai2_mode: "neutral", 
            onlypc: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛs ᴅᴜᴇ ᴛᴏ ᴏᴡɴᴇʀ sᴇᴛᴛɪɴɢsn\n\n${footer}`,
            onlygc: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ᴅᴜᴇ ᴛᴏ ᴏᴡɴᴇʀ sᴇᴛᴛɪɴɢsn\n\n${footer}`,
            AliveMsg: "*ʜᴇʟʟᴏ*\n\nVERSELOR V1 IS ALIVE",
            badwords: ["porn", "xnxx", "sex", "tities", "boobie", "titties", "nude", "nsfw", "hentai", "erotic", "pornography", "sexy", "fuck", "dick", "cock", "pussy", "ass", "boobs", "tits", "naked", "nudes", "blowjob", "cum", "suck", "fucking", "anal", "vagina", "penis", "bdsm", "boobie", "fetish", "hardcore", "masturbation"]
        },
        mess: {},
        sticker_cmd: {}, 
        economy: {},   
        bankData: {},
        others: {}
    };
    await db.write();
    global.db = db;
    
   // console.log('[SYSTEM] Lowdb Engine Initialized & Loaded to RAM');
}

// Export It All
module.exports = { 
    loadDatabase,
    db
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
