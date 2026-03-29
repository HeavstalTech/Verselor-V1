// settings/config.js
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const footer = `> \`© A Product Of Heavstal Tech™\``;
const backupFile = path.join(__dirname, 'backup_config.json');

// Default Values
let _usePairingCode = process.env.USE_PAIR_CODE !== undefined ? (process.env.USE_PAIR_CODE === 'true') : true; // True For Pair Code // False For Qr Code
let _phoneNumber = process.env.WHATSAPP_NUMBER || "";      // Enter your WhatsApp number here (Optional) // Fixed: proces.env -> process.env
let _MONGODB_URI = process.env.MONGODB_URI || "";      // Enter your MONOGOSE URI here (Optional)
let _AuthCode = process.env.AUTH_CODE || "";         // Enter AuthCode From The Heavstal Bots Website Here (Optional)

if (fs.existsSync(backupFile)) {
    try {
        const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
        if (backup.usePairingCode !== undefined) _usePairingCode = backup.usePairingCode;
        if (backup.phoneNumber) _phoneNumber = backup.phoneNumber;
        if (backup.MONGODB_URI) _MONGODB_URI = backup.MONGODB_URI;
        if (backup.AuthCode) _AuthCode = backup.AuthCode;
    } catch (e) {
        console.error(chalk.red('Failed to parse backup_config.json: ' + e.message));
    }
}

const saveBackup = () => {
    const data = {
        usePairingCode: _usePairingCode,
        phoneNumber: _phoneNumber,
        MONGODB_URI: _MONGODB_URI,
        AuthCode: _AuthCode
    };
    fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
};
saveBackup();

Object.defineProperties(global, {
    usePairingCode: { get: () => _usePairingCode, set: (val) => { _usePairingCode = val; saveBackup(); } },
    phoneNumber: { get: () => _phoneNumber, set: (val) => { _phoneNumber = val; saveBackup(); } },
    MONGODB_URI: { get: () => _MONGODB_URI, set: (val) => { _MONGODB_URI = val; saveBackup(); } },
    AuthCode: { get: () => _AuthCode, set: (val) => { _AuthCode = val; saveBackup(); } }
});

global.packname = "Sticker By\n\n";
global.developer = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇";
global.ownername = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇";
global.botname = "𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏";
global.author = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇";
global.CAPTION = `𝗩𝗘𝗥𝗦𝗘𝗟𝗢𝗥 𝗩𝟭 ²⁶`;

const dbMap = {
    prefix: "prefix",
    timezone:  "timezone",
    language: "language",
    menu: 'menu',
    thumbnail: "thumbnail",
    HT_API_KEY: "HT_API_KEY",
    publicX: "publicX",
    sleep: "sleep",
    onlyprivate: "onlyprivate",
    onlygroup: "onlygroup",
    startup: "startup",
    Areact: "Areact",
    autoRecord: "autoRecord",
    autoTyping: "autoTyping",
    autoRecordtype: "autoRecordtype",
    autoRead: "autoRead",
    autobio: "autobio",
    autoViewStatus: "autoViewStatus",
    warnLimit: "warnLimit",
    AiName: "AiName",
    AiOwner: "AiOwner",
    ai_persona: "ai_persona",
    ai2_mode: "ai2_mode",
    onlypc: "onlypc",
    onlygc: "onlygc",
    AliveMsg: "AliveMsg"
};

for (const [globalKey, dbKey] of Object.entries(dbMap)) {
    Object.defineProperty(global, globalKey, {
        get: function() {
            // if DB isn't loaded yet, return undefined or false or smt.....
            return global.db?.data?.settings?.[dbKey];
        },
        set: function(newValue) {
            if (global.db?.data?.settings) {
                global.db.data.settings[dbKey] = newValue;
                global.db.write();
            }
        },
        configurable: true,
        enumerable: true
    });
}

let version = '1.0.0'; // Default to 1
try {
    const versionPath = path.join(__dirname, '..', 'lib', 'Default', 'Verselor-Version.json');
    if (fs.existsSync(versionPath)) {
        const vData = JSON.parse(fs.readFileSync(versionPath, 'utf-8'));
        if (vData && vData.version) version = vData.version;
    }
} catch (e) {
    console.error(chalk.red('Failed to load version file: ' + e.message));
}

global.version = version;
global.footer = footer;
global.owner =['2348137256404', '2348166546725'];

const dbMess = global.db?.data?.settings?.mess || {};

global.mess = {
   wait: dbMess.wait || `Processing...\n\n${footer}`,
   success: dbMess.success || `Done!\n\n${footer}`,
   on: dbMess.on || `Bot is online\n\n${footer}`, 
   owner: dbMess.owner || `*ACCESS DENIED*\n\nOnly owner and sudo users can access this command\n\n${footer}`,
   prem: dbMess.prem || `*ACCESS DENIED*\n\nPremium users only\n\n${footer}`, 
   deployer: `*ACCESS DENIED*\n\nThis command can only be accessed by the actual Deployer to prevent server conflicts.\n\nIf you want full access to the bot, type *${global.prefix}repo* to get information on how to deploy your own instance.\n\n${footer}`,
   off: dbMess.off || `Bot is now offline\n\n${footer}`,
   nsfw: `*ACCESS DENIED*\n\n*NSFW* has not been activated in this chat, use \`${global.prefix}nsfw on\` to activate it\n\n*Note/Disclaimer:* Activating *NSFW* will open access to age restricted contents & it also increases the chances of getting banned, WhatsApp *explicitly* does not support age restricted contents\n\n${footer}`,
   sleep: dbMess.sleep || `*ACCESS DENIED*\n\nThis bot is currently on sleep mode.\nDeactivate the sleep mode with *${global.prefix}sleep off* to access all commands\n\n${footer}`,
   query: {
       text: `*ACCESS DENIED*\n\nThere is no text, provide a text to continue\n\n${footer}`,
       link: `*ACCESS DENIED*\n\nProvide a link to continue\n\n${footer}`,
       footer: footer,
   },
   error: {
       fitur: `*AN UNEXPECTED ERROR HAS OCCURRED*\nWe encountered an error while trying to run/execute this command, use the ${global.prefix}support command to get the bot's gc and submit the error below:\n`,
       feature: `*AN UNEXPECTED ERROR HAS OCCURRED*\nWe encountered an error while trying to run/execute this command, use the ${global.prefix}support command to get the bot's gc and submit the error below:\n`,
       body: `*UNEXPECTED ERROR*\n\nAn unexpected error has occurred, kindly contact the bot developer with the error message below and a screenshot of the process\n\n${footer}`,
   },
   only: {
       group: dbMess.group || `*ACCESS DENIED*\n\nThis feature can only be used in group chats\n\n${footer}`,
       private: dbMess.private || `*ACCESS DENIED*\n\nThis feature can only be used in private chats\n\n${footer}`,
       owner: dbMess.owner || `*ACCESS DENIED*\nOwner only has authorization to use this bot\n\n${footer}`,
       admin: dbMess.admin || `*ACCESS DENIED*\n\nOnly admins can access this feature\n\n${footer}`,
       ban: dbMess.ban || `*ACCESS DENIED*\n\nYou have been banned from using this bot!\n\n${footer}`,
       badmin: `*ACCESS DENIED*\n\nBot is not yet admin, to use this feature make the bot an admin\n\n${footer}`,
       premium: `*ACCESS DENIED*\n\nOnly premium users can access this feature\n\n${footer}`,
   }
};

fs.watchFile(__filename, async () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    await import(`${import.meta.url}?update=${Date.now()}`);
});
