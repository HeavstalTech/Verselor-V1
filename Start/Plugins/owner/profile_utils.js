import fs from 'node:fs';
import util from 'node:util';
import { sleep, generateProfilePicture, jsonformat } from '#System/Data1.js';

export default [
    {
        name: 'setpp',
        aliases: ['setppbot'],
        category: 'owner',
        description: 'Sets the bot\'s profile picture.',
        usage: '%prefix%setpp <reply image>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum } = context;
            if (!m.quoted) return Vreply("Reply to an image with this command to set profile picture!");
            
            try {
                // Download the media to a temporary file
                const mediaPath = await HeavstalTech.downloadAndSaveMediaMessage(m.quoted, "temp_pp");
                const buffer = fs.readFileSync(mediaPath);
                
                // Process the image for WhatsApp PP format
                const { img } = await generateProfilePicture(buffer);

                await HeavstalTech.query({
                    tag: "iq",
                    attrs: {
                        to: BotNum,
                        type: "set",
                        xmlns: "w:profile:picture"
                    },
                    content: [{
                        tag: "picture",
                        attrs: { type: "image" },
                        content: img
                    }]
                });

                fs.unlinkSync(mediaPath); // Clean up
                await Vreply("Profile picture set successfully!");
            } catch (error) {
                console.error(error);
                await Vreply("Failed to set profile picture. Make sure you replied to an image and try again.");
            }
        }
    },
    {
        name: 'deletepp',
        aliases: ['delpp', 'deleteppbot', 'delppbot'],
        category: 'owner',
        description: 'Removes the bot\'s profile picture.',
        usage: '%prefix%deletepp',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess, footer } = context;
            try {
                Vreply(mess.wait);
                await HeavstalTech.removeProfilePicture(HeavstalTech.user.id);
                Vreply(`*SUCCESFULLY DELETED PROFILE PICTURE*\n\n${footer}`);
            } catch (error) {
                console.error(error);
                await Vreply(`*Failed To Delete Profile Picture.*\n\n${footer}`);
            }
        }
    },
    {
        name: 'setname',
        aliases: [],
        category: 'owner',
        description: 'Changes the bot\'s WhatsApp display name.',
        usage: '%prefix%setname <text>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { q, prefix, Vreply } = context;
            try {
                if (!q) return Vreply(`_*provide a name to set!*_\n_Example: ${prefix}setname Heavstal Tech_`);
                await HeavstalTech.updateProfileName(q);
                return Vreply(`_Profile name updated to ${q}_`);
            } catch (e) {
                return Vreply(String(e));
            }
        }
    },
    {
        name: 'bio',
        aliases: ['setbio'],
        category: 'owner',
        description: 'Changes the bot\'s WhatsApp "About" text.',
        usage: '%prefix%bio <text>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, prefix, Vreply } = context;
            try {
                if (!text) return Vreply(`*_Provide A Text*_\n_example: ${prefix}setbio urgent calls only._`);
                await HeavstalTech.updateProfileStatus(text);
                return Vreply('_Bio updated_');
            } catch (e) {
                return Vreply(String(e));
            }
        }
    },
    {
        name: 'join',
        aliases: [],
        category: 'owner',
        description: 'Makes the bot join a WhatsApp group via link.',
        usage: '%prefix%join <link>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply } = context;
            if (!args[0]) return Vreply('Enter the group link!');
            if (!args[0].includes('whatsapp.com')) return Vreply('Link Invalid!');
            
            Vreply("Joining Group Chat");
            let result = args[0].split('https://chat.whatsapp.com/')[1];
            await HeavstalTech.groupAcceptInvite(result).then((res) => Vreply(jsonformat(res))).catch((err) => Vreply(jsonformat(err)));
        }
    },
    {
        name: 'joinch',
        aliases: ['joinchannel'],
        category: 'owner',
        description: 'Makes the bot follow a WhatsApp Channel.',
        usage: '%prefix%joinch <link>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, footer } = context;
            if (!text && !m.quoted) return Vreply(`*Process Failed*\n\n*Error:* No Channel Link Dected.\nPlease Provide A Valid Channel Link\n\n${footer}`);
            
            let source = m.quoted ? m.quoted.text : text;
            if (!source.includes("https://whatsapp.com/channel/")) return Vreply(`*Process Failed*\n\n*Error:* Invalid Channel Link.\nPlease Provide A Valid Channel Link\n\n${footer}`);
            
            let result = source.split('https://whatsapp.com/channel/')[1];
            let res = await HeavstalTech.newsletterMetadata("invite", result);
            await HeavstalTech.newsletterFollow(res.id);
            Vreply(`* Channel followed successfully ✅*\n* Channel name : *${res.name}*\n* Total followers : *${res.subscribers + 1}*`);
        }
    },
    {
        name: 'left',
        aliases: ['leave'],
        category: 'owner',
        description: 'Makes the bot leave the current group.',
        usage: '%prefix%left',
        groupOnly: true,
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            try {
                await HeavstalTech.groupLeave(m.chat);
                await Vreply('✅ Left the group.');
            } catch (error) {
                console.error(error);
                Vreply('❌ Failed to leave the group.');
            }
        }
    },
    {
        name: 'advertise',
        aliases: ['broadcast'],
        category: 'owner',
        description: 'Sends a broadcast message to all groups the bot is in.',
        usage: '%prefix%advertise <text>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, pushname, prefix, command } = context;
            if (!text) return Vreply(`Usage : *${prefix + command}* text to advertise`);
            
            let getGroups = await HeavstalTech.groupFetchAllParticipating();
            let groups = Object.values(getGroups);
            let anu = groups.map(v => v.id);
            
            Vreply(`Sending Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} seconds`);
            
            for (let i of anu) {
                await sleep(4000);
                let a = `\n\n\`\`\`Message: ${text}\n\n\`\`\`\n𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶`;
                HeavstalTech.sendMessage(i, {
                    text: a,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: pushname,
                            body: `Sending msg to ${anu.length} Groups`,
                            thumbnailUrl: 'https://files.catbox.moe/g8pxls.png',
                            sourceUrl: 'https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D',
                            mediaType: 1,
                            renderLargerThumbnail: false
                        }
                    }
                });
            }
            Vreply(`Successful in sending Broadcast To ${anu.length} Groups`);
        }
    },
    {
        name: 'download',
        aliases: ['save'],
        category: 'owner',
        description: 'Saves the replied media to the bot\'s system.',
        usage: '%prefix%download <reply media>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum, command } = context;
            try {
                const quotedMessage = m.msg.contextInfo?.quotedMessage;
                if (quotedMessage) {
                    if (quotedMessage.imageMessage) {
                        let imageCaption = quotedMessage.imageMessage.caption;
                        let imageUrl = await HeavstalTech.downloadAndSaveMediaMessage(quotedMessage.imageMessage, "saved_image");
                        let buffer = fs.readFileSync(imageUrl);
                        HeavstalTech.sendMessage(BotNum, { image: buffer, caption: imageCaption });
                        fs.unlinkSync(imageUrl);
                    }
                    if (quotedMessage.videoMessage) {
                        let videoCaption = quotedMessage.videoMessage.caption;
                        let videoUrl = await HeavstalTech.downloadAndSaveMediaMessage(quotedMessage.videoMessage, "saved_video");
                        let buffer = fs.readFileSync(videoUrl);
                        HeavstalTech.sendMessage(BotNum, { video: buffer, caption: videoCaption });
                        fs.unlinkSync(videoUrl);
                    }
                    Vreply("Media saved and forwarded to Owner's DM.");
                } else {
                    Vreply("Please reply to a media message.");
                }
            } catch (e) {
                console.log(`Error in ${command} command: ${e}`);
                Vreply(`Error in ${command} command: ${e}`);
            }
        }
    },
    {
        name: 'upsw',
        aliases: ['up-status', 'status'],
        category: 'owner',
        description: 'Uploads a status/story to the bot\'s WhatsApp account.',
        usage: '%prefix%upsw <reply media/text>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { q, text, quoted, mime, Vreply, prefix, command, store } = context;
            
            if (!text && !m.quoted) {
                return Vreply(`Please send/reply to a message with the caption ${prefix + command}`);
            }
            
            const statusJids = Object.keys(store.contacts).filter(jid => jid.endsWith('@s.whatsapp.net'));
            if (statusJids.length === 0) {
                return Vreply("⚠️ Could not find any contacts in the bot's memory to send the status to.");
            }

            try {
                if (/image/.test(mime)) {
                    let imgSwPath = await HeavstalTech.downloadAndSaveMediaMessage(quoted, "status_img");
                    let buffer = fs.readFileSync(imgSwPath);
                    await HeavstalTech.sendMessage(
                        "status@broadcast",
                        { image: buffer, caption: q },
                        { statusJidList: statusJids } 
                    );
                    fs.unlinkSync(imgSwPath);
                    Vreply('*Done...*');

                } else if (/video/.test(mime)) {
                    let VidSwPath = await HeavstalTech.downloadAndSaveMediaMessage(quoted, "status_vid");
                    let buffer = fs.readFileSync(VidSwPath);
                    await HeavstalTech.sendMessage(
                        "status@broadcast",
                        { video: buffer, caption: q },
                        { statusJidList: statusJids } 
                    );
                    fs.unlinkSync(VidSwPath);
                    Vreply('*Done...*');

                } else if (/audio/.test(mime)) {
                    let VnSwPath = await HeavstalTech.downloadAndSaveMediaMessage(quoted, "status_aud");
                    let buffer = fs.readFileSync(VnSwPath);
                    await HeavstalTech.sendMessage(
                        "status@broadcast",
                        { audio: buffer, mimetype: "audio/mp4", ptt: true },
                        { backgroundColor: "#FF000000", statusJidList: statusJids } 
                    );
                    fs.unlinkSync(VnSwPath);
                    Vreply('*Done...*');

                } else if (q) {
                    await HeavstalTech.sendMessage(
                        "status@broadcast",
                        { text: q },
                        { backgroundColor: "#FF000000", font: 3, statusJidList: statusJids } 
                    );
                    Vreply('*Done...*');

                } else {
                    Vreply(`Please send/reply to a message with the caption ${prefix + command}`);
                }
            } catch (e) {
                Vreply(`Error uploading status: ${e.message}`);
            }
        }
    },
    {
        name: 'delchat',
        aliases: ['clearchat'],
        category: 'owner',
        description: 'Clears the current chat history.',
        usage: '%prefix%delchat',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { from, reply, footer } = context;
            await HeavstalTech.chatModify({delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]}, from);
            reply(`*Successfully Cleared Chat*\n\n${footer}`);
        }
    },
    {
        name: 'aza',
        aliases: [],
        category: 'owner',
        description: 'Retrieves the owner\'s bank/payment details.',
        usage: '%prefix%aza',
        ownerOnly: true,
        execute: async (HeavstalTech, m) => {
            let sender = m.key.participant || m.key.remoteJid;
            let data = global.db.data.bankData[sender];

            if (!data) {
                await HeavstalTech.sendMessage(m.chat, { text: `\`No bank info found.\nUse\` \`setaza owner | bank name | bank acct\`.`, quoted: m });
                return;
            }

            const replyText = `\`🏦 BANK DETAILS\` \n*Bank Owner:* _${data.owner}_\n*Bank Name:* _${data.bankName}_\n*Account Number:* _${data.bankCode}_\n`;
            await HeavstalTech.sendMessage(m.chat, { text: replyText, quoted: m });
        }
    },
    {
        name: 'setaza',
        aliases: [],
        category: 'owner',
        description: 'Stores the owner\'s bank/payment details.',
        usage: '%prefix%setaza <account-name> | <bank-name> | <account-number>',
        ownerOnly: true,
        execute: async (HeavstalTech, m) => {
            const text2 = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
            const args = text2.split(' ').slice(1).join(' ').split('|');

            if (args.length < 3) {
                await HeavstalTech.sendMessage(m.chat, { text: `\`Wrong format!\nUse:\` *.setaza account-name| bank-name | bank-number*` });
                return;
            }

            const [owner, bankName, bankCode] = args.map(a => a.trim());
            global.db.data.bankData[m.sender] = { owner, bankName, bankCode };
            await global.db.write();

            await HeavstalTech.sendMessage(m.chat, {
                text: `\`BANK DATA SAVED\`\nType .aza if you want to see the saved details \nBank Owner: ${owner}, Bank Name: ${bankName},\nBank Number: ${bankCode}`,
            });
        }
    },
    {
        name: 'delaza',
        aliases: [],
        category: 'owner',
        description: 'Deletes the stored bank/payment details.',
        usage: '%prefix%delaza',
        ownerOnly: true,
        execute: async (HeavstalTech, m) => {
            if (!global.db.data.bankData[m.sender]) {
                await HeavstalTech.sendMessage(m.chat, { text: `*You don't have any saved bank details.*`, quoted: m });
                return;
            }

            delete global.db.data.bankData[m.sender];
            await global.db.write();

            await HeavstalTech.sendMessage(m.chat, {
                text: "*Your bank info has been Deleted*\nAdd New Bank Deltails With .setaza <info>\n\n> `© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ`",
                quoted: m
            });
        }
    },
    {
        name: 'eval',
        aliases: [],
        category: 'owner',
        description: 'Evaluates JavaScript code.',
        usage: '%prefix%eval <code>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply } = context;
            try {
                let evaled = await eval(`(async () => { ${text} })()`);
                if (typeof evaled !== 'string') evaled = util.inspect(evaled);
                Vreply(evaled);
            } catch (err) {
                Vreply(`Error:\n${err}`);
            }
        }
    },
    {
        name: 'runcode',
        aliases: [],
        category: 'owner',
        description: 'Evaluates JavaScript code natively (outputs console.log results).',
        usage: '%prefix%runcode <javascript>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`Please provide a javascript code to execute\n*Example 1:* ${prefix + command} <JavaScript code>\n*Example 2:* ${prefix + command} console.log("Heavstal Tech");`);
            
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
    },
    {
        name: 'getpp',
        aliases: ['getpic'],
        category: 'owner',
        description: 'Fetches User Profile Picture',
        usage: '%prefix%getpp <@user>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, from } = context;
            Vreply("Fetching User Profile Picture...");
            
            let targetJid = m.quoted ? m.quoted.sender : from;
            let ppUrl;
            
            try {
                ppUrl = await HeavstalTech.profilePictureUrl(targetJid, 'image');
            } catch {
                ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';
            }
            
            await HeavstalTech.sendMessage(from, { image: { url: ppUrl }, caption: `Done` }, { quoted: m });
        }
    },
    {
        name: 'profile',
        aliases: ['me'],
        category: 'owner',
        description: 'Displays your WhatsApp profile picture, name, and number.',
        usage: '%prefix%profile',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { pushname } = context;
            let ppUrl;
            try {
                ppUrl = await HeavstalTech.profilePictureUrl(m.sender, 'image');
            } catch {
                ppUrl = "https://telegra.ph/file/34d343582a1cf8f830a28.jpg";
            }

            let OwnerInfo = `—  *P R O F I L E*\n\n┌  \n│  ◦  *Name* : ${pushname}\n│  ◦  *Number* : @${m.sender.split('@')[0]}\n└`;

            await HeavstalTech.sendMessage(m.chat, {
                text: OwnerInfo,
                contextInfo: {
                    externalAdReply: {  
                        title: global.developer,
                        body: global.developer,
                        thumbnailUrl: ppUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        }
    }
];
