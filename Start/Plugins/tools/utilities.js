import fs from 'node:fs';
import { exec } from 'node:child_process';
import { fileTypeFromBuffer } from 'file-type';
import { getBuffer, rand, extractUrlsFromString } from '#System/Data1.js';
import { webp2mp4 } from '#System/Data2.js';

const ApiMsg = `*NO API KEY DETECTED*

The command requires a *Heavstal Tech* Api Key to run and it seems yours isn't set yet.

> If you don't have an api key, please follow the steps bellow to to get one.
1. Visit "https://heavstal.com.ng/credentials"
2. Sign In
3. Click The "Generate Secret Key" button and copy the generated key
4. Type %prefix%setapikey <Api Key>
5. Re-run this command 

Note: If you receive this message again after setting the api key, type *"%prefix%restart"*`;

export default [
    {
        name: 'tts',
        aliases: ['say', 'speak'],
        category: 'tools',
        description: 'Converts text to speech.',
        usage: '%prefix%tts <[lang]> <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`*Please Provide Text*\n\nExample: ${prefix + command} Hello World\nExample with Lang: ${prefix + command} fr Bonjour`);
            
            let lang = 'en';
            let content = text.trim();
            const argsList = text.split(' ');
            if (argsList[0].length === 2) {
                lang = argsList[0];
                content = argsList.slice(1).join(' ');
            }

            if (!content) return Vreply(`*Please provide text after the language code.*`);
            Vreply(context.mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/tts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ text: content, lang: lang })
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
    },
    {
        name: 'tr',
        aliases: ['translate'],
        category: 'tools',
        description: 'Translates text to English.',
        usage: '%prefix%tr <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            const content = text || m.quoted?.text;
            
            if (!content) return Vreply(`*Please Provide Text to Translate*\n\nExample: ${prefix + command} Bonjour\nOr reply to a message.`);
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
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
    },
    {
        name: 'toimage',
        aliases: ['toimg'],
        category: 'tools',
        description: 'Converts a sticker back into a standard image.',
        usage: '%prefix%toimage <reply sticker>',
        execute: async (HeavstalTech, m, context) => {
            const { quoted, mime, Vreply } = context;
            try {
                if (!quoted) return Vreply('Reply to a sticker');
                if (!/webp/.test(mime)) return Vreply('Reply to a sticker');
                
                let media = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
                let ran = 'tempImg.png';
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media);
                    if (err) return Vreply(err.message || String(err));
                    let buffer = fs.readFileSync(ran);
                    HeavstalTech.sendMessage(m.chat, { image: buffer }, { quoted: m });
                    fs.unlinkSync(ran);
                });
            } catch (e) {
                console.log("Error In ToImage Command:", e);
                Vreply("Error processing image.");
            }
        }
    },
    {
        name: 'tomp4',
        aliases: ['tovideo'],
        category: 'tools',
        description: 'Converts an animated sticker to an MP4 video.',
        usage: '%prefix%tomp4 <reply animated sticker>',
        execute: async (HeavstalTech, m, context) => {
            const { quoted, mime, prefix, command, Vreply } = context;
            if (!/webp/.test(mime)) return Vreply(`Reply to an animated sticker with caption *${prefix + command}*`);   
            
            await HeavstalTech.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
            try {
                let mediaBuffer = await HeavstalTech.downloadMediaMessage(quoted);
                let videoBuffer = await webp2mp4(mediaBuffer);
                await HeavstalTech.sendMessage(m.chat, {
                    video: videoBuffer,
                    caption: 'Convert Webp To Video'
                }, { quoted: m });
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } catch (err) {
                Vreply("Failed to convert to video.");
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            }
        }
    },
    {
        name: 'togif',
        aliases: [],
        category: 'tools',
        description: 'Converts an animated sticker to a looping GIF.',
        usage: '%prefix%togif <reply animated sticker>',
        execute: async (HeavstalTech, m, context) => {
            const { quoted, mess, Vreply, MenuStyle, footer } = context;
            try {
                if (!quoted || !quoted.sticker) {
                    return Vreply(`*${MenuStyle} Please reply to a sticker to convert it to a GIF.*\n\n${footer}`);
                }
                
                if (!quoted.isAnimated) {
                    return Vreply(`*${MenuStyle} This command only works on animated stickers.*\nPlease reply to an animated (video) sticker.\n\n${footer}`);
                }

                Vreply(mess.wait);

                const stickerBuffer = await HeavstalTech.downloadMediaMessage(quoted);
                const videoBuffer = await webp2mp4(stickerBuffer);

                if (!videoBuffer) {
                     return Vreply(`*${MenuStyle} Conversion Failed.*\nCould not convert the sticker to a GIF.\n\n${footer}`);
                }

                await HeavstalTech.sendMessage(m.chat, {
                    video: videoBuffer,
                    gifPlayback: true,
                    caption: `${global.CAPTION}\n\n${footer}`
                }, { quoted: m });

            } catch (e) {
                console.error("Togif command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'todoc',
        aliases: ['todocument'],
        category: 'tools',
        description: 'Converts media into a document file.',
        usage: '%prefix%todoc <reply media>',
        execute: async (HeavstalTech, m, context) => {
            const { text, quoted, mess, Vreply, MenuStyle, footer } = context;
            try {
                if (!quoted || !(quoted.image || quoted.video || quoted.audio)) {
                    return Vreply(`*${MenuStyle} Please reply to an image, video, or audio message to convert it to a document.*\n\n${footer}`);
                }

                Vreply(mess.wait);
                     
                const fileName = (text ? text.replace(/[^A-Za-z0-9-_\s]/g, '') : rand(10)).trim();
                const mediaBuffer = await HeavstalTech.downloadMediaMessage(quoted);

                if (!mediaBuffer) {
                    return Vreply(`*${MenuStyle} Failed to download the media. Please try again.*\n\n${footer}`);
                }
                
                const fileInfo = await fileTypeFromBuffer(mediaBuffer);
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
    },
    {
        name: 'tovv',
        aliases: ['toviewonce'],
        category: 'tools',
        description: 'Converts media to a "View Once" message.',
        usage: '%prefix%tovv <reply media>',
        execute: async (HeavstalTech, m, context) => {
            const { quoted, mime, Vreply } = context;
            if (!quoted) return Vreply(`Reply Image/Video`);
            
            if (/image/.test(mime)) {
                let anuan = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: anuan }, 
                    caption: `ʏᴏᴜʀ ᴠɪᴇᴡ ᴏɴᴄᴇ ᴍᴇssᴀɢᴇ ʙʏ ᴠᴏɪᴅ\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ`,
                    fileLength: "999", 
                    viewOnce: true
                }, { quoted: m });
                fs.unlinkSync(anuan);
            } else if (/video/.test(mime)) {
                let anuanuan = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
                await HeavstalTech.sendMessage(m.chat, {
                    video: { url: anuanuan }, 
                    caption: `ʏᴏᴜʀ ᴠɪᴇᴡ ᴏɴᴄᴇ ᴍᴇssᴀɢᴇ ʙʏ ᴠᴏɪᴅ\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ`, 
                    fileLength: "99999999", 
                    viewOnce: true
                }, { quoted: m });
                fs.unlinkSync(anuanuan);
            } else {
                Vreply("Unsupported media type for View Once.");
            }
        }
    },
    {
        name: 'vv',
        aliases: [],
        category: 'tools',
        description: 'Saves and exposes a View Once image/video/audio.',
        usage: '%prefix%vv <reply viewonce>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            if (!m.quoted) return Vreply('Please reply to an image, video, or voice note (View Once included).');
            
            try {
                const mediaBuffer = await HeavstalTech.downloadMediaMessage(m.quoted);
                if (!mediaBuffer) return Vreply('⚠️ Failed to download media. Try again.'); 
                
                const mediaType = m.quoted.mtype; 
                if (mediaType === 'imageMessage') { 
                    await HeavstalTech.sendMessage(m.chat, { image: mediaBuffer, caption: "*SUCCESS!* HERE IS YOUR VIEW ONCES IMAGE" }, { quoted: m });
                } else if (mediaType === 'videoMessage') { 
                    await HeavstalTech.sendMessage(m.chat, { video: mediaBuffer, caption: "*SUCCESS!* HERE IS YOUR VIEW ONCES VIDEO" }, { quoted: m });
                } else if (mediaType === 'audioMessage') { 
                    await HeavstalTech.sendMessage(m.chat, { audio: mediaBuffer, mimetype: 'audio/ogg', ptt: true, caption: "*SUCCESS!* HERE IS YOUR VIEW ONCES AUDIO" }, { quoted: m });
                } else { 
                    return Vreply('⚠️ Unsupported format. Please reply to an image, video, or voice note.'); 
                }
            } catch (error) {
                console.error('Error:', error);
                await Vreply('⚠️ An error occurred. Try again.');
            }
        }
    },
    {
        name: 'hmp',
        aliases: ['vv2', 'readviewonce2', '👀'],
        category: 'tools',
        description: 'Saves a View Once message and sends it directly to the Bot Owner\'s DMs.',
        usage: '%prefix%hmp <reply viewonce>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, prefix, command, BotNum } = context;
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
                    await HeavstalTech.sendMessage(BotNum, { image: media, caption: " " }, { quoted: m });
                } else if (/video/.test(mime)) {
                    let media = await m.quoted.download();
                    await HeavstalTech.sendMessage(BotNum, { video: media, caption: "" }, { quoted: m });
                } else if (/audio/.test(mime)) {
                    let media = await m.quoted.download();
                    await HeavstalTech.sendMessage(BotNum, { audio: media, mimetype: 'audio/mpeg', caption: '', ptt: true }, { quoted: m });
                } else {
                    Vreply(`❌ Unsupported media type!\nReply to an image, video, or audio with *${prefix + command}*`);
                }
                Vreply("Sent to your DM!");
            } catch (err) {
                console.error('Error processing media:', err);
                Vreply(`❌ Failed to process media. Please try again.`);
            }
        }
    },
    {
        name: 'readmore',
        aliases: [],
        category: 'tools',
        description: 'Creates a "Read more..." text separator.',
        usage: '%prefix%readmore <text1>|<text2>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply } = context;
            if (!text) return Vreply("*Where is the message?*\n\nExample: .readmore Verselor V1 Created By Heavstal Tech");
            
            const more = String.fromCharCode(8206);
            const readmoreText = more.repeat(4001);
            let [l, r] = text.split`|`;
            
            if (!l) l = '';
            if (!r) r = '';
            
            await HeavstalTech.sendMessage(m.chat, { text: l + readmoreText + r }, { quoted: m });
        }
    },
    {
        name: 'checkmail',
        aliases: [],
        category: 'tools',
        description: 'Checks if an email is valid or from a disposable/spam domain.',
        usage: '%prefix%checkmail <email>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, footer } = context;
            const email = text?.trim();

            if (!email) {
                return Vreply(`❓ Please provide an email address.\nExample:\n${prefix}checkmail example@gmail.com\n\n${footer}`);
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return Vreply(`🚫 The email address ${email} is invalid.\n\n${footer}`);
            }

            const domain = email.split("@")[1].toLowerCase();
            const advancedBlacklistedDomains = [
                "example.com", "tempmail.com", "10minutemail.com", "mailinator.com", "guerrillamail.com",
                "yopmail.com", "dispostable.com", "maildrop.cc", "fakeinbox.com", "trashmail.com",
                "throwawaymail.com", "getnada.com", "mintemail.com", "sharklasers.com", "mailcatch.com",
                "spamgourmet.com", "disposablemail.com", "fakemail.net", "temporarymail.com", "mailtemp.net",
                "mail.ru", "qq.com", "163.com", "hotmail.co.uk", "live.com", "inbox.com",
                "rocketmail.com", "aol.com", "zoho.com", "fastmail.com"
            ];

            if (advancedBlacklistedDomains.includes(domain)) {
                return Vreply(`🚫 The email domain ${domain} is blacklisted. ❌ This may be disposable, risky, or often used for spam/phishing.`);
            }

            return Vreply(`✅ The email address ${email} is valid and safe to use.\n\n${footer}`);
        }
    },
    {
        name: 'ss',
        aliases: ['ssweb', 'screenshot'],
        category: 'tools',
        description: 'Captures a screenshot of a webpage (supports --phone flag).',
        usage: '%prefix%ss <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
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
            if (!targetUrl.startsWith("http")) targetUrl = "https://" + targetUrl;
            
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY;      
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/screenshot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ url: targetUrl, type: deviceType })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data && res.data.link) { 
                    await HeavstalTech.sendMessage(m.chat, {
                        image: { url: res.data.link },
                        caption: `*📸 Website Screenshot*\n\n🔗 *Target:* ${res.data.url}\n📱 *Device:* ${res.data.device}\n⚡ *Provider:* ${res.data.provider || 'Heavstal API'}`
                    }, { quoted: m });
                } else {
                    await Vreply(`*Screenshot Failed*\n\n${res.error || 'The URL may be invalid or the site refused connection.'}`);
                }
            } catch (e) {
                console.error("Screenshot Error:", e);
                Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
            }
        }
    },
    {
        name: 'checksite',
        aliases: ['checkweb', 'httpstatus', 'statuscheck', 'http'],
        category: 'tools',
        description: 'Checks the HTTP status and latency of a website.',
        usage: '%prefix%checksite <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Please Provide A URL to Inspect*\n\nExample: ${prefix + command} https://google.com`);
            
            let targetUrl = text.trim();
            if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
                targetUrl = "https://" + targetUrl;
            }
            
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY; 
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/http-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ url: targetUrl })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { url, status, code, latency, ip } = res.data;
                    const statusIcon = status === 'UP' ? '🟢' : '🔴';
                    const statusReport = `*📡 HTTP Status Monitor*\n\n🔗 *Target:* ${url}\n📊 *Status:* ${status} ${statusIcon}\n🔢 *Code:* ${code}\n⚡ *Latency:* ${latency}\n🌐 *IP:* ${ip}`;

                    await HeavstalTech.sendMessage(m.chat, { text: statusReport }, { quoted: m });
                } else {
                    await Vreply(`*Check Failed*\n\nCould not inspect "${targetUrl}". The site might be down or unreachable.`);
                }
            } catch (e) {
                console.error("HTTP Status Error:", e);
                Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
            }
        }
    },
    {
        name: 'style',
        aliases: ['fancy'],
        category: 'tools',
        description: 'Converts text into various stylish fonts.',
        usage: '%prefix%style <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            
            if (!text) {
                return Vreply(`*Please Provide Text*\n\nExample: ${prefix + command} Hello World`);
            }
            
            const apiKey = global.HT_API_KEY;
            if (!(apiKey || apiKey === "")) {
                return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
            }
            
            Vreply(mess.wait);
            
            try {
                const response = await fetch('https://heavstal.com.ng/api/v1/style-text', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey 
                    },
                    body: JSON.stringify({ text: text.trim() })
                });
                
                const res = await response.json();
                
                if (res.status === 'success' && res.data && res.data.length > 0) {
                    let styledText = `*✨ Fancy Text Generator ✨*\n\n`;
                    
                    res.data.forEach((style, index) => {
                        styledText += `*${index + 1}.* _${style.name}_\n${style.result}\n\n`;
                    });
                    
                    styledText += footer;
                    await Vreply(styledText);
                } else {
                    await Vreply(`*Generation Failed*\n\n${res.message || 'Could not generate stylish text.'}`);
                }
            } catch (e) {
                console.error("Style Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred while connecting to the API.`);
            }
        }
    },
    {
        name: 'calculator',
        aliases: ['calc', 'calculate'],
        category: 'tools',
        description: 'Solves a mathematical expression.',
        usage: '%prefix%calculator <expression>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Please Provide an Expression*\n\nExample: ${prefix + command} 50 + 20\nExample: ${prefix + command} 10 km to miles`);
            
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/calc', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ expr: text.trim() })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { expression, result } = res.data;
                    await Vreply(`*🔢 Heavstal Calculator*\n\n*Input:* ${expression}\n*Result:* ${result}`);
                } else {
                    await Vreply(`*Calculation Failed*\n\n${res.error || 'Invalid expression or syntax error.'}`);
                }
            } catch (e) {
                console.error("Calculator Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    },
    {
        name: 'morse',
        aliases: [],
        category: 'tools',
        description: 'Translates text to/from Morse code.',
        usage: '%prefix%morse <encode/decode> | <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            if (!text.includes('|')) {
                return Vreply(`*Invalid Format*\n\nPlease use the separator *"|"*\nExample: ${prefix + command} encode | Hello World\nExample: ${prefix + command} decode | ... --- ...`);
            }
            
            let [mode, content] = text.split('|');
            mode = mode.trim().toLowerCase();
            content = content ? content.trim() : '';
            
            if (!['encode', 'decode'].includes(mode)) return Vreply(`*Invalid Mode*\n\nPlease use 'encode' or 'decode'.`);
            if (!content) return Vreply(`*Please provide text to ${mode}*`);
            
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/morse', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ text: content, mode: mode })
                });
                
                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { input, output } = res.data;
                    await Vreply(`*📟 Morse Code Converter*\n\n📥 *Input:* ${input}\n📤 *Output:* \`\`\`${output}\`\`\`\n\n${footer}`);
                } else {
                    await Vreply(`*Conversion Failed*\n\n${res.error || 'Could not process the request.'}`);
                }
            } catch (e) {
                console.error("Morse Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    },
    {
        name: 'markdown',
        aliases: ['mdtohtml', 'md'],
        category: 'tools',
        description: 'Converts Markdown syntax to HTML.',
        usage: '%prefix%markdown <markdown>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Please Provide Markdown Text*\n\nExample: ${prefix + command} # Title\n**Bold** text`);
            
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/markdown', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ markdown: text })
                });
                
                const res = await response.json();
                if (res.status === 'success' && res.data && res.data.html) {
                    await Vreply(`*📝 Markdown to HTML*\n\n\`\`\`html\n${res.data.html}\n\`\`\``);
                } else {
                    await Vreply(`*Conversion Failed*\n\n${res.error || 'Could not convert markdown.'}`);
                }
            } catch (e) {
                console.error("Markdown Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    },
    {
        name: 'metadata',
        aliases: ['linkinfo', 'urlinfo'],
        category: 'tools',
        description: 'Fetches SEO metadata (Title, description, image) of a link.',
        usage: '%prefix%metadata <link>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            const content = text || m.quoted?.text;
            
            if (!content) return Vreply(`*Please Provide a URL*\n\nExample: ${prefix + command} https://youtube.com\nOr reply to a message containing a link.`);
            
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = content.match(urlRegex);
            if (!match) return Vreply(`*Invalid Input*\n\nNo valid URL found in the provided text.`);
            
            const targetUrl = match[0];
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/metadata', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ url: targetUrl })
                });
                
                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { title, description, image, site_name, url } = res.data;
                    const caption = `*🔗 Link Metadata Inspector*\n\n📌 *Title:* ${title || 'N/A'}\n🏢 *Site Name:* ${site_name || 'N/A'}\n📝 *Description:* ${description || 'No description available.'}\n🔗 *URL:* ${url}\n\n${footer}`;
                    
                    if (image) {
                        await HeavstalTech.sendMessage(m.chat, { image: { url: image }, caption: caption }, { quoted: m });
                    } else {
                        await HeavstalTech.sendMessage(m.chat, { text: caption }, { quoted: m });
                    }
                } else {
                    await Vreply(`*Metadata Fetch Failed*\n\n${res.error || 'Could not extract data from this link.'}`);
                }
            } catch (e) {
                console.error("Metadata Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    },
    {
        name: 'ps',
        aliases: ['pstrength', 'passcheck', 'passwordcheck'],
        category: 'tools',
        description: 'Audits a password for strength and estimated crack time.',
        usage: '%prefix%ps <password>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            if (!text) return Vreply(`*Please Provide a Password to Audit*\n\nExample: ${prefix + command} mySecretPass123`);
            
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/password-strength', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ password: text.trim() })
                });
                
                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { score, verdict, crack_time, feedback } = res.data;
                    const scoreIcons = ['🔴', '🔴', '🟠', '🟡', '🟢'];
                    const icon = scoreIcons[score] || '❓';
                    let msg = `*🔐 Password Security Auditor*\n\n📊 *Score:* ${score}/4 ${icon}\n⚖️ *Verdict:* ${verdict}\n⏱️ *Crack Time:* ${crack_time}\n\n`;
                    
                    if (feedback.warning) msg += `⚠️ *Warning:* ${feedback.warning}\n\n`;
                    if (feedback.suggestions && feedback.suggestions.length > 0) msg += `💡 *Suggestions:*\n- ${feedback.suggestions.join('\n- ')}\n`;
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
    },
    {
        name: 'readqr',
        aliases: [],
        category: 'tools',
        description: 'Reads the data from a QR code image.',
        usage: '%prefix%readqr <reply image>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            if (!m.quoted || !m.quoted.imageMessage && m.quoted.mtype !== 'imageMessage') {
                return Vreply("Reply to an image containing a QR code.");
            }
            
            try {
                const buffer = await HeavstalTech.downloadMediaMessage(m.quoted);
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
                console.error("ReadQR Error:", e);
                Vreply("Failed to read QR code.");
            }
        }
    }
];
