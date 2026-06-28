import fs from 'node:fs'
const fsp = fs.promises
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import PKG from '@heavstaltech/baileys'
const { downloadContentFromMessage } = PKG

const MEDIA_BASE_DIR = path.join(__dirname, '..', '..', 'database', 'user_media');
const ensureDir = async (m, HeavstalTech) => {
try {
const cleanId = HeavstalTech.decodeJid(m.sender || HeavstalTech.user.id)
const userDir = path.join(MEDIA_BASE_DIR, cleanId)
await fsp.mkdir(userDir, { recursive: true })
return userDir
  } catch (e) {
  console.log(e)
  HeavstalTech.sendMessage(m.chat, { text: e })
  }
}

export default [

{
name: 'store',
aliases:[],
category: 'media',
description: 'Save a media files (vids, audio, imgs) to disk for user later',
usage: '%prefix%store <name>',
ownerOnly: true,
execute: async(HeavstalTech, m, context) => {
const { footer, Vreply, text, prefix } = context
const quoted = m.quoted
if (!quoted || (!quoted.audioMessage || !quoted.videoMessage || !quoted.imageMessage)) return Vreply(`Reply to an image, video or audio to store`) // since this isn't working, I'm thinking of using the one below 
/* if (!quoted || !(quoted.image || quoted.video || quoted.audio))
or
let qMime = m.quoted.mtype || (m.quoted.msg && m.quoted.msg.mimetype) || "text/conversation";
if (m.mtype !== "imageMessage" || m.mtype !== "videoMessage" || m.mtype !== "documentMessage" || m.mtype !== "audioMessage")
*/
if (!text) return Vreply(`Provide a name to store the media with`)
const SymbolRegex = /[^a-z0-9]/g;
const SymbolisHere = SymbolRegex.test(text.toLowerCase())
if (SymbolisHere) return Vreply("Media name cannot contain symbols or Unicode characters in order to prevent future conflict")
await HeavstalTech.sendMessage(m.chat, { react: { text: '💾', key: m.key} });
const userDir = await ensureDir(m, HeavstalTech);
const existingFiles = await fsp.readdir(userDir);
const conflict = existingFiles.find(file => path.parse(file).name === text.toLowerCase())
if (conflict) {
const ext = path.extname(conflict);
return Vreply(`❌ The name "${text.toLowerCase()}" is already reserved for a ${ext} file. Please use a different name or delete the existing one using ${prefix}delmedia ${text.toLowerCase()}`);
 }
 const isVvMsg = m.quoted?.msg?.viewOnceMessage?.message || m.quoted?.viewOnceMessageV2 || m.quoted?.viewOnceMessage || m.quoted?.msg?.viewOnceMessage
 if (isVvMsg) return Vreply(`You can't store a view onces message, please use ${prefix}vv or vv2 then type ${prefix}store on the result`)
const isVideo = quoted.videoMessage
const isAudio = quoted.audioMessage
const isImage = quoted.imageMessage
let ext;
try {
if (isVideo) { 
ext = ".mp4"
} else if (isAudio) {
ext = ".mp3"
} else if (isImage) {
ext = ".png"
  }
} catch (e) {
console.log(e)
return Vreply(e)
}
const filePath = path.join(userDir, text.toLowerCase() + ext);
let type;
try {
if (isVideo) { 
type = "video"
} else if (isAudio) {
type  = "audio"
} else if (isImage) {
type = "image"
  }
} catch (e) {
console.log(e)
Vreply(e)
}
const writeStream = fs.createWriteStream(filePath);
const stream = await downloadContentFromMessage(quoted[type + 'Message'], type);
for await (const chunk of stream) {
    writeStream.write(chunk);
}
writeStream.end();
await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
});
Vreply(`Media Saved Successfully: ${text}${ext}`)
  }
},

{
name: 'saudio',
aliases: ['saud'],
category: 'media',
description: 'Play saved audio from the store',
usage: '%prefix%saudio <name>',
ownerOnly: true,
execute: async(HeavstalTech, m, context) => {
const { footer, Vreply, text, prefix } = context
if (!text) return Vreply("Provide the name of the audio you want to retrieve from store")
const userDir = await ensureDir(m, HeavstalTech);
const mp3Path = path.join(userDir,text.toLowerCase() + '.mp3');
if (!fs.existsSync(mp3Path)) return Vreply(`Audio not available in store, make sure the name is correct or use ${prefix}listmedia to see all items in store`)
await HeavstalTech.sendMessage(m.chat, { react: { text: '🎵', key: m.key }})
const buffer = await fsp.readFile(mp3Path);
await HeavstalTech.sendMessage(m.chat, {
audio: buffer,
mimetype: 'audio/mpeg',
ptt: false
}, { quoted: m });
  }
},

{
name: 'svideo',
aliases: ['svid'],
category: 'media',
description: 'Play saved video from the store',
usage: '%prerix%svideo <name>',
ownerOnly: true,
execute: async(HeavstalTech, m, context) => {
const { footer, Vreply, text, prefix } = context
if (!text) return Vreply("Provide the name of video you want to retrieve from store")
const userDir = await ensureDir(m, HeavstalTech);
const mp4Path = path.join(userDir, text.toLowerCase()+ '.mp4');
if (!fs.existsSync(mp4Path)) return Vreply(`Video not available in store, make sure the name is correct or use ${prefix}listmedia to see all items in store`)
await HeavstalTech.sendMessage(m.chat, { react: { text: '🎬', key: m.key}
});
const buffer = await fsp.readFile(mp4Path);
await HeavstalTech.sendMessage(m.chat,{
video: buffer,
caption: `𝐕𝐢𝐝𝐞𝐨 : ${text}\n\n${global.CAPTION}`,
gifPlayback: false
}, { quoted: m });
   }
},

{
name: 'simage',
aliases: ['simg'],
category: 'media',
description: 'Returns Saved Images from the store',
useage: '%prefix%simage <name>',
ownerOnly: true,
execute: async(HeavstalTech, m, context) => {
const { footer, Vreply, text, prefix } = context
if (!text) return Vreply("Provide the name of image you want to retrieve from store")
const userDir = await ensureDir(m, HeavstalTech);
const imgPath = path.join(userDir, text.toLowerCase()+ '.png')
if (!fs.existsSync(imgPath)) return Vreply(`Image not available in store, make sure the name is correct or use ${prefix}listmedia to see all items in store`)
await HeavstalTech.sendMessage(m.chat, { react: { text:' 🖼️', key: m.key}
});
const buffer = await fsp.readFile(imgPath);
await HeavstalTech.sendMessage(m.chat,{
image: buffer,
caption: `Image : ${text}\n\n${global.CAPTION}`,
gifPlayback: false
}, { quoted: m });
   }
},

{
name: 'listmedia',
aliases: ['medialist'],
category: 'media',
description: 'List saved media in store',
usage: '%prefix%listmedia',
ownerOnly: true,
execute: async(HeavstalTech, m, context)=>{
const { footer, Vreply, text } = context
const userDir = await ensureDir(m, HeavstalTech);
const files = await fsp.readdir(userDir);
if (files.length === 0) return Vreply('Your Store is Empty')
let textList = `𝐌𝐞𝐝𝐢𝐚 𝐋𝐢𝐬𝐭 (${files.length})\n\n`;
files.forEach((f, i) => {
textList += `${i+1}. ${f}\n`;
});
await HeavstalTech.sendMessage(m.chat, { text: textList }, { quoted: m });
  }
},

{
name: 'delmedia',
aliases: ['deletemedia'],
category: 'media',
description: 'Deletes a  media file from store',
usage: '%prefix%delmedia <name>',
ownerOnly: true,
execute: async(HeavstalTech, m, context) => {
let { footer, Vreply, text, prefix } = context
if (!text) return Vreply(`Provide the name of the media you want to delete from store, type ${prefix}listmedia to see all items in your store`)
const userDir = await ensureDir(m, HeavstalTech);
text = text.toLowerCase()
try {
if (fs.existsSync(path.join(userDir, text + '.mp3'))) {
await fsp.unlink(path.join(userDir, text + '.mp3'))
return Vreply(`Media Deleted: ${text}`)
 } else if (fs.existsSync(path.join(userDir, text + '.mp4'))) {
await fsp.unlink(path.join(userDir, text + '.mp4'));
return Vreply(`Media Deleted: ${text}`)
 } else if (fs.existsSync(path.join(userDir, text + '.png'))) {
await fsp.unlink(path.join(userDir, text + '.png'));
return Vreply(`Media Deleted: ${text}`)
 } else {
 return Vreply(`Media not found, please make sure the name is correct, type ${prefix}listmedia to see media in your store`)
 }
} catch (e) {
console.log(`Failed to delete some files: ${e}`)
  }
 }
}
];
