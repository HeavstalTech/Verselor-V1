// settings/config.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const footer = `> \`© A Product Of Heavstal Tech™\``;

global.usePairingCode = true // True For Pair Code // False For Qr Code
global.phoneNumber = "" // Add your phone number here (Optional)
global.MONGODB_URI = "" // Add your MONOGOSE URI here 
global.packname = "Sticker By\n\n"
global.developer = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
global.ownername = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
global.botname = "𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏"
global.author = "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
global.CAPTION = `𝗩𝗘𝗥𝗦𝗘𝗟𝗢𝗥 𝗩𝟭 ²⁶`

const dbMap = {
            prefix: "prefix",
            timezone:  "timezone",
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


let version = '1.0.0'; // Defult to 1
try {
    const versionPath = path.join(__dirname, '..', 'lib', 'Default', 'Verselor-Version.json');
    if (fs.existsSync(versionPath)) {
        const vData = JSON.parse(fs.readFileSync(versionPath, 'utf-8'));
        if (Array.isArray(vData)) version = vData.join('.');
    }
} catch (e) {
    console.error(chalk.red('Failed to load version file: ' + e.message));
}


global.version = version
global.footer = footer
global.owner = ['2348137256404', '2348166546725'];

const dbMess = global.db?.data?.settings?.mess || {};

global.mess = {
wait: dbMess.wait ||  `ᴘʀᴏᴄᴇssɪɴɢ...\n\n${footer}`,
   success: dbMess.success || `ᴅᴏɴᴇ!\n\n${footer}`,
   on: dbMess.on || `ʙᴏᴛ ɪs ᴏɴʟɪɴᴇ\n\n${footer}`, 
   owner: dbMess.owner || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴏɴʟʏ ᴏᴡɴᴇʀ ᴀɴᴅ sᴜᴅᴏ ᴜsᴇʀs ᴄᴀɴ ᴀᴄᴄᴇss ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ\n\n${footer}`,
   prem: dbMess.prem || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀs ᴏɴʟʏ\n\n${footer}`, 
   deployer: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nThis command can only be accessed by the actual Deployer to prevent server conflicts.\n\nIf you want full access to the bot, type *${global.prefix}repo* to get information on how to deploy your own instance.\n\n${footer}`,
   off: dbMess.off || `ʙᴏᴛ ɪs ɴᴏᴡ ᴏғғʟɪɴᴇ\n\n${footer}`,
   nsfw: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\n*ɴsғᴡ* ʜᴀs ɴᴏᴛ ʙᴇᴇɴ ᴀᴄᴛɪᴠᴇᴅ ɪɴ ᴛʜɪs ᴄʜᴀᴛ, ᴜsᴇ \`${global.prefix}nsfw on\` ᴛᴏ ᴀᴄᴛɪᴠᴀᴛᴇ it\n\n*ɴᴏᴛᴇ/ᴅɪsᴄʟᴀᴍᴇʀ:* ᴀᴄᴛɪᴠᴀᴛɪɴɢ *ɴsғᴡ* ᴡɪʟʟ ᴏᴘᴇɴ ᴀᴄᴄᴇss ᴛᴏ ᴀɢᴇ ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴄᴏɴᴛᴇɴᴛs & ɪᴛ ᴀʟsᴏ ɪɴᴄʀᴇᴀsᴇs ᴛʜᴇ ᴄʜᴀɴᴄᴇs ᴏғ ɢᴇᴛᴛɪɴɢ ʙᴀɴɴᴇᴅ, ᴡʜᴀᴛsᴀᴘᴘ *ᴇxᴘʟɪᴄɪᴛʟʏ* ᴅᴏᴇs ɴᴏᴛ sᴜᴘᴘᴏʀᴛ ᴀɢᴇ ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴄᴏɴᴛᴇɴᴛs\n\n${footer}`,
   sleep: dbMess.sleep || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ʙᴏᴛ ɪs ᴄᴜʀʀᴇɴᴛʟʏ ᴏɴ sʟᴇᴇᴘ ᴍᴏᴅᴇ.\nᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴛʜᴇ sʟᴇᴇᴘ ᴍᴏᴅᴇ ᴡɪᴛʜ *${global.prefix}sleep off* ᴛᴏ ᴀᴄᴄᴇss ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅs\n\n${footer}`,
   query: {
       text: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜᴇʀᴇ ɪs ɴᴏᴛ ᴛᴇxᴛ, ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛᴇxᴛ ᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ\n\n${footer}`,
       link: `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴘʀᴏᴠɪᴅᴇ ᴀ ʟɪɴᴋ ᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ\n\n${footer}`,
       footer: footer,
   },
   error: {
       fitur: `*𝐀𝐍 𝐔𝐍𝐄𝐗𝐏𝐄𝐂𝐓𝐄𝐃 𝐄𝐑𝐑𝐎𝐑 𝐇𝐀𝐒 𝐎𝐂𝐂𝐔𝐑𝐄𝐃*\nᴡᴇ ᴇɴᴄᴏᴜɴᴛᴇʀᴇᴅ ᴀɴ ᴇʀʀᴏʀ ᴡʜɪʟᴇ ᴛʀʏɪɴɢ ᴛᴏ ʀᴜɴ/ᴇxᴄᴇᴄᴜᴛᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ, ᴜsᴇ ᴛʜᴇ ${global.prefix}support ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ɢᴇᴛ ᴛʜᴇ ʙᴏᴛ’s ɢᴄ ᴀɴᴅ sᴜʙᴍɪᴛ ᴛʜᴇ ᴇʀʀᴏʀ ʙᴇʟᴏᴡ:\n`,
       feature: `*𝐀𝐍 𝐔𝐍𝐄𝐗𝐏𝐄𝐂𝐓𝐄𝐃 𝐄𝐑𝐑𝐎𝐑 𝐇𝐀𝐒 𝐎𝐂𝐂𝐔𝐑𝐄𝐃*\nᴡᴇ ᴇɴᴄᴏᴜɴᴛᴇʀᴇᴅ ᴀɴ ᴇʀʀᴏʀ ᴡʜɪʟᴇ ᴛʀʏɪɴɢ ᴛᴏ ʀᴜɴ/ᴇxᴄᴇᴄᴜᴛᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ, ᴜsᴇ ᴛʜᴇ ${global.prefix}support ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ɢᴇᴛ ᴛʜᴇ ʙᴏᴛ’s ɢᴄ ᴀɴᴅ sᴜʙᴍɪᴛ ᴛʜᴇ ᴇʀʀᴏʀ ʙᴇʟᴏᴡ:\n`,
       body: `*𝐔𝐍𝐄𝐗𝐏𝐄𝐂𝐓𝐄𝐃 𝐄𝐑𝐑𝐎𝐑*\n\nᴀɴ ᴜɴᴇxᴘᴇᴄᴛᴇᴅ ᴇʀʀᴏʀ ʜᴀs ᴏᴄᴄᴜʀʀᴇᴅ, ᴋɪɴᴅʟʏ ᴄᴏɴᴛᴀᴄᴛ ᴛʜᴇ ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ ᴡɪᴛʜ ᴛʜᴇ ᴇʀʀᴏʀ ᴍᴇssᴀɢᴇ ʙᴇʟᴏᴡ ᴀɴᴅ ᴀ sᴄʀᴇᴇɴsʜᴏᴛ ᴏғ ᴛʜᴇ ᴘʀᴏᴄᴇss\n\n${footer}`,
   },
   only: {
       group: dbMess.group || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ғᴇᴀᴛᴜʀᴇ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs ᴄʜᴀᴛs\n\n${footer}`,
       private: dbMess.private || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴛʜɪs ғᴇᴀᴛᴜʀᴇ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛs\n\n${footer}`,
       owner: dbMess.owner || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\nᴏᴡɴᴇʀ ᴏɴʟʏ ʜᴀs ᴀᴜᴛʜᴏʀɪᴢᴀᴛɪᴏɴ ᴛᴏ ᴜsᴇ ᴛʜɪs ʙᴏᴛ\n\n${footer}`,
       admin: dbMess.admin || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nᴏɴʟʏ ᴀᴅᴍɪɴs ᴄᴀɴ ᴀᴄᴄᴇss ᴛʜɪs ғᴇᴀᴛᴜʀᴇ\n\n${footer}`,
       ban: dbMess.ban || `*𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃*\n\nʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ʙᴀɴɴᴇᴅ ғʀᴏᴍ ᴜsɪɴɢ ᴛʜɪs ʙᴏᴛ!\n\n${footer}`,
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
