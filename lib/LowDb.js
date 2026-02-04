// lib/LowDb.js

const path = require('path');
const fs = require('fs');

const { Low, JSONFile } = require(path.join(__dirname, '..', 'lib', 'lowdb'));
const dbFolder = path.join(__dirname, '..', 'Start', 'database');
const dbFile = path.join(dbFolder, 'database_main.json');

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
    db.data || = {
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
            badwords: ["porn", "xnxx", "sex", "tities", "boobie", "titties", "nude", "nsfw", "hentai", "erotic", "pornography", "sexy", "fuck", "dick", "cock", "pussy", "ass", "boobs", "tits", "naked", "nudes", "blowjob", "cum", "suck", "fucking", "anal", "vagina", "penis", "bdsm", "boobie", "fetish", "hardcore", "masturbation"];
        },
        sticker_cmd: {}, 
        economy: {},   
        bankData: {}
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
