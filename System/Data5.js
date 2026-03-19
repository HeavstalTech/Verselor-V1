// System/Data5.js

const fs = require('fs');
const path = require('path');
require(path.join(__dirname, '..', 'settings', 'config'));
const FileType = require('file-type');
const { downloadContentFromMessage, generateWAMessageFromContent, generateForwardMessageContent, prepareWAMessageMedia } = require("@heavstaltech/baileys");
const { getBuffer, getSizeMedia, sleep } = require('./Data1.js'); 
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./Data2.js');
const botname = global.botname

// Helper to quickly format phone numbers without bloat packages
const formatPhone = (jid) => '+' + jid.replace('@s.whatsapp.net', '');

// This function receives the socket (HeavstalTech) and attaches methods to it
const bindSocketUtils = (HeavstalTech, store) => {

    // 0. Quoted messages
    HeavstalTech.serializeM = (m) => smsg(HeavstalTech, m, store);
      
    // 1. Send Text
    HeavstalTech.sendText = (jid, text, quoted = '', options) => {
        return HeavstalTech.sendMessage(jid, { text: text || '', ...options }, { quoted });
    };

    // 2. Get File (Buffer/Stream handling)
    HeavstalTech.getFile = async (PATH, save) => {
        let res;
        let data = Buffer.isBuffer(PATH) ? PATH : 
                   /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : 
                   /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : 
                   fs.existsSync(PATH) ? (filename = PATH, await fs.promises.readFile(PATH)) : // <-- Changed to non-blocking readFile
                   typeof PATH === 'string' ? PATH : Buffer.alloc(0);
        
        let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' };
        let filename = path.join(__dirname, '../src/' + new Date * 1 + '.' + type.ext);
        
        if (data && save) await fs.promises.writeFile(filename, data);
        return { res, filename, size: await getSizeMedia(data), ...type, data };
    };

    // 3. Download Media Message
    HeavstalTech.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    };
    
    // 0. Send File Url (Replaced axios with native fetch)
    HeavstalTech.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        // Use native fetch to get headers (Node 18+)
        let response = await fetch(url, { method: 'HEAD' });
        let mime = response.headers.get('content-type') || '';
        
        if (mime.includes("gif")) {
            return HeavstalTech.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options});
        }
        if (mime === "application/pdf") {
            return HeavstalTech.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options });
        }
        if (mime.includes("image")) {
            return HeavstalTech.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options});
        }
        if (mime.includes("video")) {
            return HeavstalTech.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options });
        }
        if (mime.includes("audio")) {
            return HeavstalTech.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options });
        }
    }

    // 4. Download and Save
    HeavstalTech.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
        await fs.promises.writeFile(trueFileName, buffer); 
        return trueFileName;
    };

    // 5. Send Image as Sticker
    HeavstalTech.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? await fs.promises.readFile(path) : Buffer.alloc(0);
        let buffer = options && (options.packname || options.author) ? await writeExifImg(buff, options) : await imageToWebp(buff);
        await HeavstalTech.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };
         
    // 0. Send Audio 
    HeavstalTech.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? await fs.promises.readFile(path) : Buffer.alloc(0)
        return await HeavstalTech.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    // 0. Send Video 
    HeavstalTech.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? await fs.promises.readFile(path) : Buffer.alloc(0)
        return await HeavstalTech.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    // 6. Send Video as Sticker
    HeavstalTech.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? await fs.promises.readFile(path) : Buffer.alloc(0);
        let buffer = options && (options.packname || options.author) ? await writeExifVid(buff, options) : await videoToWebp(buff);
        await HeavstalTech.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };
	
    // 7. Send Media (Generic)
    HeavstalTech.sendMedia = async (jid, path, caption = '', quoted = '', options = {}) => {
        let { mime, data } = await HeavstalTech.getFile(path, true);
        let messageType = mime.split('/')[0];
        let messageContent = {};
        
        if (messageType === 'image') {
            messageContent = { image: data, caption: caption, ...options };
        } else if (messageType === 'video') {
            messageContent = { video: data, caption: caption, ...options };
        } else if (messageType === 'audio') {
            messageContent = { audio: data, ptt: options.ptt || false, ...options };
        } else {
            messageContent = { document: data, mimetype: mime, fileName: options.fileName || 'file' };
        }

        await HeavstalTech.sendMessage(jid, messageContent, { quoted });
    };

    // 0. cMod
    HeavstalTech.cMod = (jid, copy, text = '', sender = HeavstalTech.user.id, options = {}) => {
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = { ...content, ...options }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = sender === HeavstalTech.user.id
        return proto.WebMessageInfo.fromObject(copy)
    }

    // 0. Copy And Forward
    HeavstalTech.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = { ...message.message.viewOnceMessage.message }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = { ...context, ...content[ctype].contextInfo }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? { ...content[ctype], ...options, ...(options.contextInfo ? { contextInfo: { ...content[ctype].contextInfo, ...options.contextInfo } } : {}) } : {})
        await HeavstalTech.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    // 7.5 Alias for sendFile
    HeavstalTech.sendFile = HeavstalTech.sendMedia;

    // 8. Send Poll
    HeavstalTech.sendPoll = async (jid, question, options) => {
        const pollMessage = {
            pollCreationMessage: {
                name: question,
                options: options.map(option => ({ optionName: option })),
                selectableCount: 1,
            },
        };
        await HeavstalTech.sendMessage(jid, pollMessage);
    };
    
    // 9. Send Text with Mentions
    HeavstalTech.sendTextWithMentions = async (jid, text, quoted, options = {}) => {
        const mentions =[...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net');
        return HeavstalTech.sendMessage(jid, { text: text, mentions, ...options }, { quoted });
    };

    // 10. Set Status (Bio)
    HeavstalTech.setStatus = async (status) => {
        await HeavstalTech.query({
            tag: 'iq',
            attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status' },
            content:[{ tag: 'status', attrs: {}, content: Buffer.from(status, 'utf-8') }],
        });
        return status;
    };
    
    // 11. GetName (Replaced awesome-phonenumber with simple Regex/String manipulation)
    HeavstalTech.getName = (jid, withoutContact = false) => {
        let id = HeavstalTech.decodeJid(jid);
        withoutContact = HeavstalTech.withoutContact || withoutContact;
        let v;
        
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            // Added await here to ensure it properly fetches if not in store
            if (!(v.name || v.subject)) v = await HeavstalTech.groupMetadata(id).catch(() => ({})) || {};
            resolve(v.name || v.subject || formatPhone(id));
        });
        else {
            v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' } 
              : id === HeavstalTech.decodeJid(HeavstalTech.user.id) ? HeavstalTech.user 
              : (store.contacts[id] || {});
        }
        
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || formatPhone(id);
    };

    // 12. Send Contact
    HeavstalTech.sendContact = async (jid, kon, desk = "Contact Owner", quoted = '', opts = {}) => {
        let list =[]
        for (let i of kon) {
            list.push({
                displayName: botname,
                vcard: 'BEGIN:VCARD\n' +
                'VERSION:3.0\n' +
                `N:;${botname};;;\n` +
                `FN:${botname}\n` +
                'ORG:null\n' +
                'TITLE:\n' +
                `item1.TEL;waid=${i}:${i}\n` +
                'item1.X-ABLabel:Ponsel\n' +
                `X-WA-BIZ-DESCRIPTION:${desk}\n` +
                `X-WA-BIZ-NAME:${botname}\n` +
                'END:VCARD'
            })
        }
        HeavstalTech.sendMessage(jid, { contacts: { displayName: `${list.length} contact`, contacts: list }, ...opts }, { quoted })
    };

	// 13. Send Group Status
    HeavstalTech.sendGroupStatus = async (jid, content, options = {}) => {
        let innerMessage = {};
        if (content.image || content.video || content.audio) {
            const prepared = await prepareWAMessageMedia(content, { upload: HeavstalTech.waUploadToServer });
            innerMessage = prepared;
        } 
			
        else if (content.text) {
            const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
            innerMessage = {
                extendedTextMessage: {
                    text: content.text,
                    backgroundArgb: options.backgroundColor || (0xFF000000 + parseInt(randomHex, 16)),
                    font: options.font || 2
                }
            };
        }

        const msg = generateWAMessageFromContent(jid, {
            groupStatusMessageV2: {
                message: innerMessage
            }
        }, { 
            userJid: HeavstalTech.user.id, 
            quoted: options.quoted 
        });

        await HeavstalTech.relayMessage(jid, msg.message, { messageId: msg.key.id });
        return msg;
    }
	
    return HeavstalTech;
};

module.exports = { bindSocketUtils };
