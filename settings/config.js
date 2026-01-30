// settings/config.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const backupPath = path.join(__dirname, 'config_backup.json');
const footer = `> \`© A Product Of Heavstal Tech™\``

global.usePairingCode = true // True For Pair Code // False For Qr Code
global.phoneNumber = "" // Add your phone number here (Optional)

const defaults = {
prefix: ".",
timezone:  "Africa/Lagos",
menu: 'v1',
thumbnail: "https://files.catbox.moe/g8pxls.png",
HT_API_KEY: "",
MONGODB_URI: "",
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
warnLimit: 3,
AiName: "VERSELOR AI",
AiOwner: "HEAVSTAL TECH",
ai_persona: "You are a helpful assistant named Verselor V1 created by Heavstal Tech. You answer questions concisely.",
ai2_mode: "neutral", 
onlypc: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛs ᴅᴜᴇ ᴛᴏ ᴏᴡɴᴇʀ sᴇᴛᴛɪɴɢsn\n\n${footer}`,
onlygc: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ᴅᴜᴇ ᴛᴏ ᴏᴡɴᴇʀ sᴇᴛᴛɪɴɢsn\n\n${footer}`,
AliveMsg: "*ʜᴇʟʟᴏ*\n\nVERSELOR V1 IS ALIVE"
};

var runtimeData = {};
for (var key in defaults) {
    runtimeData[key] = defaults[key];
}

try {
    if (fs.existsSync(backupPath)) {
        var backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
        for (var key in backupData) {
            if (runtimeData.hasOwnProperty(key)) {
                runtimeData[key] = backupData[key];
            }
        }
        console.log(chalk.yellow("System: Settings restored from backup."));
    } else {
        fs.writeFileSync(backupPath, JSON.stringify(runtimeData, null, 2));
    }
} catch (err) {
    console.error(chalk.red("System Error: Could not load config backup.", err));
}

function saveConfig() {
    fs.writeFile(backupPath, JSON.stringify(runtimeData, null, 2), (err) => {
        if (err) console.error(chalk.red("Error auto-saving config:", err));
    });
}

for (var key in runtimeData) {
    (function(k) {
        Object.defineProperty(global, k, {
            get: function() {
                return runtimeData[k];
            },
            set: function(newValue) {
                runtimeData[k] = newValue;
                saveConfig(); 
            },
            configurable: true,
            enumerable: true
        });
    })(key);
}

global.packname = "Sticker By\n\n"
global.developer = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
global.ownername = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
global.botname = "𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏"
global.version = "1.0.0";
global.owner = ['2348137256404', '2348166546725']
global.author = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
global.CAPTION = `𝗩𝗘𝗥𝗦𝗘𝗟𝗢𝗥 𝗩𝟭 ²⁶`
global.mess = {
wait: `ᴘʀᴏᴄᴇssɪɴɢ...\n\n${footer}`,
   success: `ᴅᴏɴᴇ!\n\n${footer}`,
   on: `ʙᴏᴛ ɪs ᴏɴʟɪɴᴇ\n\n${footer}`, 
   owner: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴏɴʟʏ ᴏᴡɴᴇʀ ᴀɴᴅ sᴜᴅᴏ ᴜsᴇʀs ᴄᴀɴ ᴀᴄᴄᴇss ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ\n\n${footer}`,
   prem: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀs ᴏɴʟʏ\n\n${footer}`, 
   off: `ʙᴏᴛ ɪs ɴᴏᴡ ᴏғғʟɪɴᴇ\n\n${footer}`,
   nsfw: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\n*ɴsғᴡ* ʜᴀs ɴᴏᴛ ʙᴇᴇɴ ᴀᴄᴛɪᴠᴇᴅ ɪɴ ᴛʜɪs ᴄʜᴀᴛ, ᴜsᴇ \`${global.prefix}nsfw on\` ᴛᴏ ᴀᴄᴛɪᴠᴀᴛᴇ it\n\n*ɴᴏᴛᴇ/ᴅɪsᴄʟᴀᴍᴇʀ:* ᴀᴄᴛɪᴠᴀᴛɪɴɢ *ɴsғᴡ* ᴡɪʟʟ ᴏᴘᴇɴ ᴀᴄᴄᴇss ᴛᴏ ᴀɢᴇ ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴄᴏɴᴛᴇɴᴛs & ɪᴛ ᴀʟsᴏ ɪɴᴄʀᴇᴀsᴇs ᴛʜᴇ ᴄʜᴀɴᴄᴇs ᴏғ ɢᴇᴛᴛɪɴɢ ʙᴀɴɴᴇᴅ, ᴡʜᴀᴛsᴀᴘᴘ *ᴇxᴘʟɪᴄɪᴛʟʏ* ᴅᴏᴇs ɴᴏᴛ sᴜᴘᴘᴏʀᴛ ᴀɢᴇ ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴄᴏɴᴛᴇɴᴛs\n\n${footer}`,
   sleep: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴏɴ sʟᴇᴇᴘ ᴍᴏᴅᴇ.\nᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴛʜᴇ sʟᴇᴇᴘ ᴍᴏᴅᴇ ᴡɪᴛʜ *${global.prefix}sleep off* ᴛᴏ ᴀᴄᴄᴇss ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅs\n\n${footer}`,
   query: {
       text: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜᴇʀᴇ ɪs ɴᴏᴛ ᴛᴇxᴛ, ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛᴇxᴛ ᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ\n\n${footer}`,
       link: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴘʀᴏᴠɪᴅᴇ ᴀ ʟɪɴᴋ ᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ\n\n${footer}`,
       footer: footer,
   },
   error: {
       fitur: `*𝐄𝐑𝐑𝐎𝐑 𝐃𝐄𝐓𝐄𝐂𝐓𝐄𝐃*\nᴛʜᴇ ғᴇᴀᴛᴜʀᴇ ʜᴀs ᴇʀʀᴏʀ. ᴘʟᴇᴀsᴇ ᴄᴏɴᴛᴀᴄᴛ ᴛʜᴇ ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ ғᴏʀ ɪᴍᴍᴇᴅɪᴀᴛᴇ ғɪx\n\n${footer}`,
       feature: `*𝐄𝐑𝐑𝐎𝐑 𝐃𝐄𝐓𝐄𝐂𝐓𝐄𝐃*\nᴛʜᴇ ғᴇᴀᴛᴜʀᴇ ʜᴀs ᴇʀʀᴏʀ. ᴘʟᴇᴀsᴇ ᴄᴏɴᴛᴀᴄᴛ ᴛʜᴇ ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ ғᴏʀ ɪᴍᴍᴇᴅɪᴀᴛᴇ ғɪx`,
       body: `*𝐔𝐍𝐄𝐗𝐏𝐄𝐂𝐓𝐄𝐃 𝐄𝐑𝐑𝐎𝐑*\n\nᴀɴ ᴜɴᴇxᴘᴇᴄᴛᴇᴅ ᴇʀʀᴏʀ ʜᴀs ᴏᴄᴄᴜʀʀᴇᴅ, ᴋɪɴᴅʟʏ ᴄᴏɴᴛᴀᴄᴛ ᴛʜᴇ ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ ᴡɪᴛʜ ᴛʜᴇ ᴇʀʀᴏʀ ᴍᴇssᴀɢᴇ ʙᴇʟᴏᴡ ᴀɴᴅ ᴀ sᴄʀᴇᴇɴsʜᴏᴛ ᴏғ ᴛʜᴇ ᴘʀᴏᴄᴇss\n\n${footer}`,
   },
   only: {
       group: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ғᴇᴀᴛᴜʀᴇ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs ᴄʜᴀᴛs\n\n${footer}`,
private: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ғᴇᴀᴛᴜʀᴇ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛs\n\n${footer}`,
       owner: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\nᴏᴡɴᴇʀ ᴏɴʟʏ ʜᴀs ᴀᴜᴛʜᴏʀɪᴢᴀᴛɪᴏɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ʙᴏᴛ\n\n${footer}`,
       admin: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴏɴʟʏ ᴀᴅᴍɪɴs ᴄᴀɴ ᴀᴄᴄᴇss ᴛʜɪs ғᴇᴀᴛᴜʀᴇ\n\n${footer}`,
       ban: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ʙᴀɴɴᴇᴅ ғʀᴏᴍ ᴜsɪɴɢ ᴛʜɪs ʙᴏᴛ!\n\n${footer}`,
       badmin: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nʙᴏᴛ ɪs ɴᴏᴛ ʏᴇᴛ ᴀᴅᴍɪɴ, ᴛᴏ ᴜsᴇ ᴛʜɪs ғᴇᴀᴛᴜʀᴇ ᴍᴀᴋᴇ ᴛʜᴇ ʙᴏᴛ ᴀɴ ᴀᴅᴍɪɴ${footer}`,
       premium: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀs ᴄᴀɴ ᴀᴄᴄᴇss ᴛʜɪs ғᴇᴀᴛᴜʀᴇ\n\n${footer}`,
   }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
});
