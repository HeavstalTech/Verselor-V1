import fs from 'node:fs';
import { exec } from 'node:child_process';
import { fetchJson, getRandom } from '#System/Data1.js';
import { toAudio } from '#System/Data2.js';
import pkg from '@heavstaltech/baileys';
const { getDevice } = pkg;

const ApiMsg = `*NO API KEY DETECTED*

The command requires an *Heavstal Tech* Api Key to run and it seems yours isn't set yet.

> If you don't have an api key, please follow the steps bellow to to get one.
1. Visit "https://heavstal.com.ng/credentials"
2. Sign In
3. Click The "Generate Secret Key" button and copy the generated key
4. Type ${prefix}setapikey <Api Key>
5. Re-run this command 

Note: If you receive this message again after seting the api key, type *"${prefix}restart"* 
`

export default [
    {
        name: 'get',
        aliases: ['g', 'fetch'],
        category: 'tools',
        description: 'Fetches raw JSON or text from a URL.',
        usage: '%prefix%get <url>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`Usage: *${prefix + command}* https://example.com`);
            try {
                let data = await fetchJson(text);
                Vreply(JSON.stringify(data, null, 2));
            } catch (e) {
                Vreply(`Error fetching data: ${e.message}`);
            }
        }
    },
    {
        name: 'shorturl',
        aliases: ['tinyurl'],
        category: 'tools',
        description: 'Shrinks a long URL into a short tinyurl.com link.',
        usage: '%prefix%shorturl <link>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, footer } = context;
            if (!text) return Vreply('❌ *Please provide a valid URL to shorten.*\n\nExample: `.shorturl https://example.com`');

            try {
                const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`)).text();
                if (!shortUrl || shortUrl.includes("Error")) {
                    return Vreply(`⚠️ *Error: Failed to generate a short URL. Please check the link.*`);
                }

                let replyMsg = `🔗 *URL Shortener by Verselor-V1*\n\n📎 *Original Link:*\n${text}\n\n🔀 *Shortened:*\n${shortUrl}\n\n${footer}`;
                Vreply(replyMsg);
            } catch (err) {
                console.error('ShortURL Error:', err.message);
                Vreply('❌ *Server error. Please try again later.*');
            }
        }
    },
    {
        name: 'qrcode',
        aliases: ['qr', 'generateqr'],
        category: 'tools',
        description: 'Generates a QR Code for the given text.',
        usage: '%prefix%qrcode <text/link>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            if (!text) return Vreply(`*Please Provide Text or URL to Encode*\n\nExample: ${prefix + command} https://google.com`);
            
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY; 
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg);
                
                const response = await fetch('https://heavstal.com.ng/api/v1/qrcode', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ text: text.trim() })
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
    },
    {
        name: 'pdftotext',
        aliases: [],
        category: 'tools',
        description: 'Extracts and reads all the text inside a PDF document.',
        usage: '%prefix%pdftotext <reply pdf>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, quoted, mess } = context;
            if (!m.quoted || !m.quoted.fileName?.endsWith(".pdf")) return Vreply("❌ Reply to a PDF file.");
            
            try {
                const pdfBuffer = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
                if (typeof pdfParse !== "function") return Vreply(mess.error.fitur);
                const pdf = await pdfParse(pdfBuffer);
                await HeavstalTech.sendMessage(m.chat, { text: `📄 PDF Text:\n\n${pdf.text}` }, { quoted: m });
            } catch (e) {
                Vreply(`Error: ${e.message}`);
            }
        }
    },
    {
        name: 'charge',
        aliases: [],
        category: 'tools',
        description: 'Sends an animated text sequence showing a battery charging up to 100%.',
        usage: '%prefix%charge',
        execute: async (HeavstalTech, m, context) => {
            const { footer } = context;
            
            let initialMessage = 
 `battery 🪫 low
╔═══════════╗
║░░░░░░░░░░░╚╗
║░░░░░1%░░░░░░║
║░░░░░░░░░░░╔╝
╚═══════════╝

${footer}`;

            try {
                let sentMessage = await HeavstalTech.sendMessage(m.chat, { text: initialMessage });
                let initialMessageId = sentMessage.key.id; 

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
                    } catch (error) {}
                }, 2000); 

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
                    } catch (error) {}
                }, 4000); 

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
                    } catch (error) {}
                }, 6000); 

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
                    } catch (error) {}
                }, 8000); 

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
                    } catch (error) {}
                }, 10000); 

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
                    } catch (error) {}
                }, 12000); 

            } catch (error) {
                console.error('Error sending initial message:', error);
            }
        }
    },
    {
        name: 'volaudio',
        aliases: ['audiovolume'],
        category: 'tools',
        description: 'Increases or decreases the volume of an audio file.',
        usage: '%prefix%volaudio <amount> <reply audio>',
        execute: async (HeavstalTech, m, context) => {
            const { args, quoted, Vreply, prefix, command, mess, footer } = context;
            if (!(m.quoted && m.quoted.audio)) return Vreply(`Reply to the audio that you want to increase its volume\n\n${footer}`);
            if (!args[0]) return Vreply(`Provide amount of volume you want the audio to be increased to\n*Example:* ${prefix + command} 10\n\n${footer}`);
            
            Vreply(mess.wait);
            try {
                let media = await HeavstalTech.downloadAndSaveMediaMessage(quoted, "volume");
                let rname = getRandom('.mp3');
                exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err) => {
                    fs.unlinkSync(media);
                    if (err) return Vreply(`${mess.error.feature}\n\n_Details:_ ${err}`);
                    let buffer = fs.readFileSync(rname);
                    HeavstalTech.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
                    fs.unlinkSync(rname);
                });
            } catch (e) {
                Vreply(`Error: ${e.message}`);
            }
        }
    },
    {
        name: 'volvideo',
        aliases: ['videovolume'],
        category: 'tools',
        description: 'Increases or decreases the volume of a video file.',
        usage: '%prefix%volvideo <amount> <reply video>',
        execute: async (HeavstalTech, m, context) => {
            const { args, quoted, Vreply, prefix, command, mess, footer } = context;
            if (!(m.quoted && m.quoted.video)) return Vreply(`Reply to the video that you want to increase its volume\n\n${footer}`);
            if (!args[0]) return Vreply(`Provide amount of volume you want the video to be increased to\n*Example:* ${prefix + command} 10\n\n${footer}`);
            
            Vreply(mess.wait);
            try {
                let media = await HeavstalTech.downloadAndSaveMediaMessage(quoted, "volume");
                let rname = getRandom('.mp4');
                exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err) => {
                    fs.unlinkSync(media);
                    if (err) return Vreply(`${mess.error.feature}\n\n_Details:_ ${err}`);
                    let buffer = fs.readFileSync(rname);
                    HeavstalTech.sendMessage(m.chat, { video: buffer, mimetype: 'video/mp4' }, { quoted: m });
                    fs.unlinkSync(rname);
                });
            } catch (e) {
                Vreply(`Error: ${e.message}`);
            }
        }
    },
    {
        name: 'toaudio',
        aliases: ['toaud', 'tomp3'],
        category: 'tools',
        description: 'Extracts MP3 audio from a video.',
        usage: '%prefix%toaudio <reply video>',
        execute: async (HeavstalTech, m, context) => {
            const { mime, quoted, Vreply, prefix, command } = context;
            if (!/video/.test(mime) && !/audio/.test(mime)) return await Vreply(`Usage: ${prefix + command} <reply to a video>`);
            if (!quoted) return Vreply(`Reply to a video`);
            
            try {
                let media = await quoted.download();
                let audio = await toAudio(media, 'mp4');
                await HeavstalTech.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg', caption: ''}, { quoted : m });
            } catch (e) {
                Vreply(`Conversion failed: ${e.message}`);
            }
        }
    },
    {
        name: 'audiofilter',
        aliases: ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'squirrel'],
        category: 'tools',
        description: 'Applies a specific audio manipulation filter to an audio file via FFmpeg.',
        usage: '%prefix%<filter> <reply audio>',
        execute: async (HeavstalTech, m, context) => {
            const { command, mime, quoted, Vreply } = context;
            
            if (!/audio/.test(mime)) return Vreply(`Please reply to an audio file to apply the ${command} filter.`);
            
            let set = '';
            if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
            if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
            if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
            if (/earrape/.test(command)) set = '-af volume=12';
            if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
            if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
            if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
            if (/reverse/.test(command)) set = '-filter_complex "areverse"';
            if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
            if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
            if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
            if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';

            try {
                let media = await HeavstalTech.downloadAndSaveMediaMessage(quoted);
                let ran = getRandom('.mp3');
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err) => {
                    fs.unlinkSync(media);
                    if (err) return Vreply(String(err));
                    let buff = fs.readFileSync(ran);
                    HeavstalTech.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                    fs.unlinkSync(ran);
                });
            } catch (e) {
                console.log(`Error In ${command} command: ${e}`);
                Vreply(`Error In ${command} command: ${e}`);
            }
        }
    },
    {
        name: 'encrypt',
        aliases: ['obfuscate', 'enc', 'obf'],
        category: 'tools',
        description: 'Obfuscates JavaScript/Python/Java code.',
        usage: '%prefix%encrypt <reply file / code>',
        execute: async (HeavstalTech, m, context) => {
            const { text, quoted, prefix, command, Vreply, mess, footer } = context;
            
            let codeContent = '';
            let language = 'js';
            let outputFileName = 'encrypted_script.js';
            let isFile = false;
            
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
            
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY; 
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg);
                
                const response = await fetch('https://heavstal.com.ng/api/v1/codex', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ code: codeContent, lang: language })
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
                        await HeavstalTech.sendMessage(m.chat, { text: encryptedResult }, { quoted: m });
                    }
                } else {
                    await Vreply(`*Encryption Failed*\n\nError: ${res.message || "Unknown API Error"}`);
                }
            } catch (e) {
                console.error("API Error:", e);
                Vreply(`*Error:* An unexpected error occurred while processing the code.`);
            }
        }
    },
    {
        name: 'getdevice',
        aliases: ['device', 'phone'],
        category: 'tools',
        description: 'Detects what device (iOS, Android, Web) sent the replied message.',
        usage: '%prefix%getdevice <reply>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, footer } = context;
            if (!m.quoted) return Vreply(`*Process Failed*\n\n*Error:* No Mention Message Detected.\nPlease Reply To A Message Or Tag A User\n\n${footer}`);
            try {
                const device = await getDevice(m.quoted.id);
                await HeavstalTech.sendMessage(m.chat, {text: `@${m.quoted.sender.split('@')[0]} is using ${device}`}, {quoted: m});
            } catch (e) {
                Vreply(`Failed to fetch device: ${e.message}`);
            }
        }
    },
    {
        name: 'myjid',
        aliases: ['my-jid'],
        category: 'tools',
        description: 'Shows the internal WhatsApp JID of the current chat.',
        usage: '%prefix%myjid',
        execute: async (HeavstalTech, m, context) => {
            context.Vreply(context.from);
        }
    },
    {
        name: 'getname',
        aliases: ['get-name'],
        category: 'tools',
        description: 'Fetches the WhatsApp name of the replied user.',
        usage: '%prefix%getname <reply>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, MenuStyle, footer } = context;
            if (!m.quoted) return Vreply(`Reply To A Message To Continue\n\n${footer}`);
            
            Vreply(context.mess.wait);
            try {
                const name = await HeavstalTech.getName(m.quoted.sender);
                Vreply(`*SUCCESSFULLY GOTTEN USERNAME*\n\n┃━ ${MenuStyle} *Name:* ${name}\n\n${footer}`);
            } catch (e) {
                Vreply("Failed to fetch name.");
            }
        }
    },
    {
        name: 'q',
        aliases: ['quoted'],
        category: 'tools',
        description: 'Copies and forwards the exact message you are replying to.',
        usage: '%prefix%q <reply>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            if (!m.quoted) return Vreply('Reply the Message!!');
            try {
                let isQuoted = await HeavstalTech.serializeM(await m.quoted.getQuotedMessage());
                if (!isQuoted) return Vreply('The message you are replying to is not sent by the bot');
                await isQuoted.copyNForward(m.chat, true);
            } catch (e) {
                console.log(e);
                Vreply(`Failed to forward quoted message. Reason: ${e.message}`);
            }
        }
    },
    {
        name: 'delete',
        aliases: ['del'],
        category: 'tools',
        description: 'Deletes a message.',
        usage: '%prefix%delete <reply>',
        execute: async (HeavstalTech, m, context) => {
            const { isGroup, isBotAdmin, isAdmin, isOwner, Vreply } = context;
            if (!m.quoted) return Vreply("⚠️ Please reply to the message you want to delete.");
            
            if (isGroup) {
                if (!isBotAdmin) return Vreply(context.mess.badmin); 
                if (!(isAdmin || isOwner)) return Vreply("⚠️ Only group admins or the bot owner can delete messages.");
            } else {
                if (!isOwner) return Vreply("⚠️ Only the bot owner can delete messages in private chats.");
            }

            try {
                await HeavstalTech.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } });
                Vreply("✅ Message deleted successfully.");
            } catch (e) {
                Vreply("❌ Failed to delete the message.");
            }
        }
    },
    {
        name: 'forward',
        aliases: ['fwrd'],
        category: 'tools',
        description: 'Forwards a replied message to a specific JID/Number.',
        usage: '%prefix%forward <jid>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, store } = context;
            if ((!text || m.quoted)) return Vreply(`*INCORRECT USAGE*\n\n_Provide a number or jid!_\n*Example:* ${prefix + command} 234xxxxxx`);

            let jidd = (text.includes("@g.us") || text.includes("@s.whatsapp.net") || text.includes("newsletter")) ? text : `${text}@s.whatsapp.net`;
            try {
                await m.forwardMessage(jidd, await store.loadMessage(m.chat, m.quoted.id));
            } catch (e) {
                Vreply(String(e));
            }
        }
    },
    {
        name: 'setcmd',
        aliases: [],
        category: 'tools',
        description: 'Binds a command to a specific sticker.',
        usage: '%prefix%setcmd <cmd> <reply sticker>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!m.quoted || !m.quoted.sticker) return Vreply(`_Reply to a sticker with ${prefix}setcmd <command>_`);
            if (!text) return Vreply(`_Provide a command also.._`);

            const f = text.trim().split(/\s+/)[0];
            const hash = m.quoted.fileSha256 ? Buffer.from(m.quoted.fileSha256).toString('hex') : null;
            if (!hash) return Vreply("*Couldn't get sticker hash*");
            
            global.db.data.sticker_cmd[hash] = text;
            await global.db.write();
            Vreply(`❏ Sticker set to *${f}*`);
        }
    },
    {
        name: 'delcmd',
        aliases: [],
        category: 'tools',
        description: 'Removes a command bound to a sticker.',
        usage: '%prefix%delcmd <reply sticker>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            if (!m.quoted || !m.quoted.sticker) return Vreply(`_Reply to a sticker to delete its command_`);
            
            const hash = m.quoted.fileSha256 ? Buffer.from(m.quoted.fileSha256).toString("hex") : null;
            if (!hash) return Vreply(`_hash not found_`);
            if (!global.db.data.sticker_cmd[hash]) return Vreply(`_no cmd found for that sticker.._`);
            
            const oldCmd = global.db.data.sticker_cmd[hash];
            delete global.db.data.sticker_cmd[hash];
            await global.db.write();
            Vreply(`*cmd deleted!*\n_from:_ *${oldCmd}*`);
        }
    },
    {
        name: 'listcmd',
        aliases: ['listcmds'],
        category: 'tools',
        description: 'Lists all bound sticker commands.',
        usage: '%prefix%listcmd',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const stk_cmd = global.db.data.sticker_cmd || {};
            const entries = Object.entries(stk_cmd);
            if (entries.length === 0) return context.Vreply(`_No sticker commands have been set yet._`);
            
            let responseText = `❏ *Sticker Commands:*\n\n`;
            for (const [hash, command] of entries) {
                responseText += `❏ *${command}*\n_↳ hash:_ \`${hash.slice(0, 16)}...\`\n\n`;
            }
            context.Vreply(responseText.trim());
        }
    },
    {
        name: 'time',
        aliases: ['date'],
        category: 'tools',
        description: 'Displays the current Time, Day, and Date.',
        usage: '%prefix%time',
        execute: async (HeavstalTech, m, context) => {
            let currentDate = new Date();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes().toString().padStart(2, '0');
            let seconds = currentDate.getSeconds().toString().padStart(2, '0');
            let day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            let date = currentDate.toLocaleDateString();
            context.Vreply(`🌟 *Current Time* 🌟\n====================\n⏰ *Time:* ${hours}:${minutes}:${seconds}\n📅 *Day:* ${day}\n🗓️ *Date:* ${date}\n====================\n${context.footer}`);
        }
    },
    {
        name: 'learn_coding',
        aliases: ['coding'],
        category: 'tools',
        description: 'Provides beginner resources for learning to code.',
        usage: '%prefix%coding',
        execute: async (HeavstalTech, m, context) => {
            context.Vreply(`❏━『 𝗟𝗘𝗔𝗥𝗡 𝗖𝗢𝗗𝗜𝗡𝗚 』━❏\n📚 Want to start coding? Here are some sources to get started with:\n\n🔹 *Python:* https://www.w3schools.com/python\n🔹 *JavaScript:* https://www.w3schools.com/js\n🔹 *HTML & CSS:* https://www.w3schools.com/html\n🔹 *FreeCodeCamp:* https://www.freecodecamp.org\n\n🚀 Start your journey today & Good Luck!\n\n${context.footer}`);
        }
    }
];
