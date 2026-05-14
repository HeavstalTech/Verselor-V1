import chalk from 'chalk';
import { sleep, jsonformat } from '#System/Data1.js';

export default [
    {
        name: 'kickadmins',
        aliases: [],
        category: 'group',
        description: 'Removes all admins (except the bot and the commander).',
        usage: '%prefix%kickadmins',
        groupOnly: true,
        ownerOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum, mess } = context;
            try {
                let metadata = await HeavstalTech.groupMetadata(m.chat);
                let participants = metadata.participants;
                for (let member of participants) {
                    if (member.id === BotNum) continue;
                    if (member.id === m.sender) continue;
                    if (member.admin === "superadmin" || member.admin === "admin") {
                        await HeavstalTech.groupParticipantsUpdate(m.chat, [member.id], 'remove');
                        await sleep(1000);
                    }
                }
                Vreply("All admins kicked (except you and the bot)!");
            } catch (e) {
                console.log(chalk.redBright(`[KICK-ADMINS CMD ERROR]: ${e}`));
                Vreply(`${mess.error.fitur}\n${e}`);
            }
        }
    },
    {
        name: 'promoteall',
        aliases: [],
        category: 'group',
        description: 'Promotes all regular members to admin.',
        usage: '%prefix%promoteall',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            try {
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
        }
    },
    {
        name: 'demoteall',
        aliases: [],
        category: 'group',
        description: 'Demotes all admins to regular members.',
        usage: '%prefix%demoteall',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum } = context;
            try {      
                const groupMetadata = await HeavstalTech.groupMetadata(m.chat);
                const participants = groupMetadata.participants;
                // Original logic excluded 'ownernumber', we use context.Owner array to be safe
                const participantsToDemote = participants.filter(p => p.admin && p.id !== BotNum && !context.Owner.includes(p.id.replace('@s.whatsapp.net','')));

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
        }
    },
    {
        name: 'approveall',
        aliases: [],
        category: 'group',
        description: 'Approves all pending join requests.',
        usage: '%prefix%approveall',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            try {
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

                const requests = await HeavstalTech.groupRequestParticipantsList(m.chat);
                if (requests.length === 0) {
                    return await HeavstalTech.sendMessage(m.chat, { text: '*No Available Pending Requests*', react: { text: 'ℹ️', key: m.key } }, { quoted: m });
                }

                const requestIds = requests.map(r => r.jid);
                await HeavstalTech.groupRequestParticipantsUpdate(m.chat, requestIds, 'approve');

                const approvedText = `*Successfully Approved All Pending Requests*\n*Count*: ${requestIds.length}`;

                const message = {
                    text: approvedText,
                    contextInfo: {
                        forwardingScore: 9, isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363402853491560@newsletter",
                            newsletterName: "𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐓𝐄𝐂𝐇",
                            serverMessageId: 272,
                            newsletterThumbnail: { thumbnailUrl: global.thumbnail }
                        },
                        externalAdReply: {
                            title: '𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶', body: '𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶',
                            thumbnailUrl: global.thumbnail,
                            mediaType: 1, renderLargerThumbnail: true
                        }
                    }
                };

                await HeavstalTech.sendMessage(m.chat, message, { quoted: m });
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

            } catch (error) {
                console.error("ApproveAll Error:", error);
                await HeavstalTech.sendMessage(m.chat, { text: "*Failed To Approve Requests*!", react: { text: '❌', key: m.key } }, { quoted: m });
            }
        }
    },
    {
        name: 'tagadmin',
        aliases: ['listadmin', 'admin'],
        category: 'group',
        description: 'Mentions all group admins.',
        usage: '%prefix%tagadmin',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { groupMetadata } = context;
            const groupAdmins = groupMetadata.participants.filter(p => p.admin);
            const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
            const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

            let text = `*Group Admins:*\n${listAdmin}`;
            HeavstalTech.sendMessage(m.chat, { text: text, mentions: [...groupAdmins.map(v => v.id), owner] }, { quoted: m });
        }
    },
    {
        name: 'welcome',
        aliases: [],
        category: 'group',
        description: 'Toggles welcome messages for new members.',
        usage: '%prefix%welcome <on/off>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix } = context;
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

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
    },
    {
        name: 'goodbye',
        aliases: [],
        category: 'group',
        description: 'Toggles goodbye messages for leaving members.',
        usage: '%prefix%goodbye <on/off>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix } = context;
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

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
    },
    {
        name: 'group-events',
        aliases: [],
        category: 'group',
        description: 'Toggles notifications for promote/demote/name changes.',
        usage: '%prefix%group-events <on/off>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix } = context;
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

            if (args[0] === 'on') {
                global.db.data.chats[m.chat].events = true;
                await global.db.write();
                Vreply(`*✅ Group Events Enabled*\n(Promote, Demote, Settings Change, Name Change)`);
            } else if (args[0] === 'off') {
                global.db.data.chats[m.chat].events = false;
                await global.db.write();
                Vreply(`*❌ Group Events Disabled*`);
            } else {
                Vreply(`*Usage:* ${prefix}group-events on/off\n\n_Detects: Promote, Demote, Name Change, Description Change, Group Open/Close_`);
            }
        }
    },
    {
        name: 'listonline',
        aliases: ['list-online'],
        category: 'group',
        description: 'Lists currently online members in the group.',
        usage: '%prefix%listonline',
        groupOnly: true,
        ownerOnly: true, 
        execute: async (HeavstalTech, m, context) => {
            const { args, BotNum, store } = context;
            HeavstalTech.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
            
            // Checking presence memory safe from the injected context
            let presences = store.presences[id] || {};
            let online = [...Object.keys(presences), BotNum];
            let liston = 1;
            
            HeavstalTech.sendText(m.chat, ' 「Members Online」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online });
        }
    },
    {
        name: 'groupid',
        aliases: ['group-id', 'gcid', 'id-gc', 'idgc', 'checkidgc'],
        category: 'group',
        description: 'Displays the internal JID of the group.',
        usage: '%prefix%groupid',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, groupName } = context;
            Vreply(`*Successfully Fetched Group Id*\n\n> Group Details\n➭ *Group Name:* ${groupName}\n➭ *Group Id:* ${m.chat}\n`);
        }
    },
    {
        name: 'setppgroup',
        aliases: ['setppgrup', 'setppgc'],
        category: 'group',
        description: 'Changes the group icon.',
        usage: '%prefix%setppgroup <reply image>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { mime, command, prefix, Vreply } = context;
            let media = null;
            try {
            if (!/image/.test(mime) || /webp/.test(mime)) return Vreply(`Send/reply image with caption ${prefix + command}`);
            media = await HeavstalTech.downloadAndSaveMediaMessage(m);
            await HeavstalTech.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media));
            Vreply('*Successfully Updated Group Profile Picture*\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴇᴀᴠsᴛᴀʟ ᴛᴇᴄʜ');
            } catch (e) {
                console.log(e)
            Vreply(String(e))
            } finally {
            if (media && fs.existsSync(media)) fs.unlinkSync(media);
            }
        }
    },
    {
        name: 'deleteppgroup',
        aliases: ['delppgroup', 'delppgc'],
        category: 'group',
        description: 'Removes the group icon.',
        usage: '%prefix%deleteppgroup',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess, footer } = context;
            try {
                Vreply(mess.wait);
                await HeavstalTech.removeProfilePicture(m.chat);
                Vreply(`*SUCCESFULLY DELETED GROUP PROFILE PICTURE*\n\n${footer}`);
            } catch (error) {
                console.error(error);
                await Vreply(`*Failed To Delete Group Profile Picture.*\n\n${footer}`);
            }
        }
    },
    {
        name: 'creategc',
        aliases: ['create-group', 'create-gc', 'creategroup'],
        category: 'group',
        description: 'Creates a new group and returns the invite link.',
        usage: '%prefix%creategc <name>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix, command } = context;
            if (!args.join(" ")) return Vreply(`Provide A Group Name\n\nExample: ${prefix+command} <groupname>`);
            
            try {
                let cret = await HeavstalTech.groupCreate(args.join(" "), []);
                let response = await HeavstalTech.groupInviteCode(cret.id);
                let creationTimestamp = cret.creation ? (cret.creation * 1000) : Date.now();
                let creationDate = new Intl.DateTimeFormat('en-GB', {
                    timeZone: global.timezone || 'Africa/Lagos',
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                }).format(new Date(creationTimestamp)).replace(',', '');

                let teks2 = `[ ${cret.subject} ]\n\n▸ Name : ${cret.subject}\n▸ Owner : @${(cret.owner || m.sender).split("@")[0]}\n▸ Creation : ${creationDate}\n▸ Group Id : ${cret.id}\n▸ Join : https://chat.whatsapp.com/${response}`;
                
                Vreply(teks2);
            } catch (err) {
                console.error("Create GC Error:", err);
                Vreply("*Successfully Created Group Chat!* (But failed to fetch invite link)");
            }
        }
    },
    {
        name: 'checkgc',
        aliases: ['getgcinfo', 'infogc', 'info-gc', 'get-gc-info', 'check-gc'],
        category: 'group',
        description: 'Fetches group metadata using an invite link.',
        usage: '%prefix%checkgc <link>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix, command, mess, footer } = context;
            if (!args[0]) return Vreply(`*INCORRECT USAGE*\n\nProvide a WhatsApp Group Link To Continue\n*Example:* ${prefix + command} https://chat.whatsapp.com/GROUP-ID\n\n${footer}`);
            
            let linkRegex = args.join(" ");
            let coded = linkRegex.split("https://chat.whatsapp.com/")[1];
            if (coded) coded = coded.split("?")[0].trim(); 
            if (!coded) return Vreply(`*Invalid Link*\n\nProvide a WhatsApp Group Link To Continue\n*Example:* ${prefix + command} https://chat.whatsapp.com/GROUP-ID\n\n${footer}`);

            await Vreply(mess.wait);

            try {
                const res = await HeavstalTech.query({
                    tag: "iq",
                    attrs: { type: "get", xmlns: "w:g2", to: "@g.us" },
                    content: [{ tag: "invite", attrs: { code: coded } }]
                });

                if (!res || !res.content || !res.content[0]) {
                    return Vreply("*Failed to fetch group info. The link might be revoked or invalid.*");
                }

                const attrs = res.content[0].attrs;
                const formatUnixDate = (unix) => {
                    if (!unix) return "Not Set / Could Not Fetch";
                    let dateStr = new Intl.DateTimeFormat('en-GB', {
                        timeZone: global.timezone || 'Africa/Lagos',
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
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
                    pp = global.thumbnail;
                }

                await HeavstalTech.sendMessage(m.chat, { 
                    image: { url: pp }, 
                    caption: GROUP_INFO, 
                    mentions: attrs.creator ? [attrs.creator] : [] 
                }, { quoted: m });
            } catch (error) {
                console.error("CheckGC Error:", error);
                Vreply(`*Error:* Failed to fetch group info. Ensure the link is valid and the group still exists.`);
            }
        }
    },
    {
        name: 'listgc',
        aliases: ['listgroup', 'list-gc', 'list-group'],
        category: 'owner',
        description: 'Lists all the groups the bot is currently in.',
        usage: '%prefix%listgc',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            try {
                let getGroups = await HeavstalTech.groupFetchAllParticipating();
                let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
                let anu = groups.map((v) => v.id);
                let hituet = 0;
                let teks = `⬣ *LIST OF ALL THE GROUPS*\n*Total Groups:* ${anu.length} Groups\n\n`;
                for (let x of anu) {
                    let metadata2 = await HeavstalTech.groupMetadata(x);
                    teks += `❏ Group List ${hituet += 1}\n│⭔ *NAME :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBERS :* ${metadata2.participants.length}\n╰────|\n\n`;
                }
                Vreply(teks);
            } catch (e) {
                console.log(e);
                Vreply(String(e));
            }
        }
    },
    {
        name: 'sendlinkgc',
        aliases: ['sendgclink', 'send-gc-link'],
        category: 'group',
        description: 'Sends the invite link of the current group directly to a specific user.',
        usage: '%prefix%sendlinkgc <number>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, text, from, Vreply, prefix, command, mess, groupMetadata } = context;
            try {
                if (!args[0]) return Vreply(`*INCORRECT USAGE*\n*Exmaple 1:* ${prefix + command} number\n*Example 2:* ${prefix + command} 234xxx`);
                Vreply(mess.wait);
                let bnnd = text.split("|")[0] + '@s.whatsapp.net';
                let response = await HeavstalTech.groupInviteCode(from);
                HeavstalTech.sendText(bnnd, `Hello\n*Click This Link To Join My WhatsApp Group*\n\n*LINK:* https://chat.whatsapp.com/${response}\n\n*Group Link:* ${groupMetadata.subject}`, m, { detectLink: true });
            } catch (e) {
                console.log(e);
                Vreply(String(e));
            }
        }
    },
    {
        name: 'mute',
        aliases: [],
        category: 'group',
        description: 'Locks the group so only admins can send messages.',
        usage: '%prefix%mute',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            try {
                await HeavstalTech.groupSettingUpdate(m.chat, 'announcement');
                Vreply('🔇 *Group muted.* Only admins can send messages.');
            } catch (error) {
                console.error(error);
                Vreply('❌ Failed to mute the group.');
            }
        }
    },
    {
        name: 'unmute',
        aliases: [],
        category: 'group',
        description: 'Unlocks the group so all members can send messages.',
        usage: '%prefix%unmute',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            try {
                await HeavstalTech.groupSettingUpdate(m.chat, 'not_announcement');
                Vreply('🔊 *Group unmuted.* Everyone can send messages.');
            } catch (error) {
                console.error(error);
                Vreply('❌ Failed to unmute the group.');
            }
        }
    },
    {
        name: 'closetime',
        aliases: [],
        category: 'group',
        description: 'Mutes the group after a set time.',
        usage: '%prefix%closetime <number> <unit>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply } = context;
            let unit = args[1];
            let value = Number(args[0]);
            if (!value) return Vreply("*Usage:* closetime <number> <second/minute/hour/day>\n\n*Example:* 10 minute");
            
            let timer;
            if (unit === 'second') timer = value * 1000;
            else if (unit === 'minute') timer = value * 60000;
            else if (unit === 'hour') timer = value * 3600000;
            else if (unit === 'day') timer = value * 86400000;
            else return Vreply('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example:*\n10 minute');
            
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
    },
    {
        name: 'opentime',
        aliases: [],
        category: 'group',
        description: 'Unmutes the group after a set time.',
        usage: '%prefix%opentime <number> <unit>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply } = context;
            let unit = args[1];
            let value = Number(args[0]);
            if (!value) return Vreply('*Usage:* opentime <number> <second/minute/hour/day>\n\n*Example:* 5 second');
            
            let timer;
            if (unit === 'second') timer = value * 1000;
            else if (unit === 'minute') timer = value * 60000;
            else if (unit === 'hour') timer = value * 3600000;
            else if (unit === 'day') timer = value * 86400000;
            else return Vreply('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example:*\n5 second');

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
    },
    {
        name: 'setwarn',
        aliases: [],
        category: 'group',
        description: 'Sets the maximum warning limit before kicking.',
        usage: '%prefix%setwarn <number>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`*Current Limit:* ${global.warnLimit}\n\n*Usage:* ${prefix}setwarn 5`);
            if (isNaN(text)) return Vreply("Please enter a valid number.");
            global.warnLimit = parseInt(text);
            Vreply(`*✅ Warning limit updated to ${text}*`);
        }
    },
    {
        name: 'checkwarn',
        aliases: ['warns'],
        category: 'group',
        description: 'Checks a user\'s current warning count.',
        usage: '%prefix%checkwarn [@user]',
        groupOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
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
    },
    {
        name: 'resetwarn',
        aliases: ['delwarn'],
        category: 'group',
        description: 'Resets a user\'s warning count.',
        usage: '%prefix%resetwarn [@user]',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
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
    },
   {
        name: 'antilink',
        aliases: ['antibot', 'antibadword', 'antitag'],
        category: 'group',
        description: 'Configures action against links, bots, bad words, or mass tagging.',
        usage: '%prefix%antilink <delete/warn/kick/off>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix, command } = context;
            const mode = args[0] ? args[0].toLowerCase() : '';
            const allowedModes = ['delete', 'warn', 'kick', 'off'];
            
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

            if (!allowedModes.includes(mode)) {
                const current = global.db.data.chats[m.chat][command] || 'off';
                return Vreply(`*🛡️ ${command.toUpperCase()} Configuration*\n\n*Current Mode:* ${current}\n\n*Available Modes:*\n- ${prefix}${command} delete\n- ${prefix}${command} warn\n- ${prefix}${command} kick\n- ${prefix}${command} off`);
            }

            global.db.data.chats[m.chat][command] = mode;
            await global.db.write();
            Vreply(`*✅ ${command.toUpperCase()} set to:* ${mode.toUpperCase()}`);
        }
    },
    {
        name: 'antidelete',
        aliases: [],
        category: 'group',
        description: 'Automatically recovers and resends deleted messages.',
        usage: '%prefix%antidelete <on/off>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix, command } = context;
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
    },
    {
        name: 'addbadword',
        aliases: [],
        category: 'owner',
        description: 'Adds a word to the profanity filter.',
        usage: '%prefix%addbadword <word>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`*Usage:* ${prefix}addbadword stupid`);
            if (!global.db.data.settings) global.db.data.settings = {};
            if (!global.db.data.settings.badwords) global.db.data.settings.badwords = [];
            
            const word = text.toLowerCase().trim();
            if (global.db.data.settings.badwords.includes(word)) return Vreply("❌ Word is already in the list.");
            global.db.data.settings.badwords.push(word);
            await global.db.write();
            Vreply(`*✅ Added "${word}" to bad words list.*`);
        }
    },
    {
        name: 'delbadword',
        aliases: [],
        category: 'owner',
        description: 'Removes a word from the profanity filter.',
        usage: '%prefix%delbadword <word>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`*Usage:* ${prefix}delbadword stupid`);
            if (!global.db.data.settings.badwords) global.db.data.settings.badwords = [];
            if (global.db.data.settings.badwords.length === 0) return Vreply("❌ List is empty.");
            
            const word = text.toLowerCase().trim();
            const index = global.db.data.settings.badwords.indexOf(word);
            if (index === -1) return Vreply("❌ Word not found in list.");
            global.db.data.settings.badwords.splice(index, 1);
            await global.db.write();
            Vreply(`*✅ Removed "${word}" from bad words list.*`);
        }
    },
    {
        name: 'listbadword',
        aliases: [],
        category: 'owner',
        description: 'Lists all filtered bad words.',
        usage: '%prefix%listbadword',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            const list = global.db.data.settings?.badwords || [];
            if (list.length === 0) return Vreply("No bad words set.");
            let msg = `*🤬 Bad Words List:*\n\n` + list.map((w, i) => `${i+1}. ${w}`).join('\n');
            Vreply(msg);
        }
    },
    {
        name: 'anticall',
        aliases: [],
        category: 'owner',
        description: 'Sets the bot\'s behavior when it receives a voice/video call.',
        usage: '%prefix%anticall <off/reject/block>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, text, Vreply, prefix } = context;
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
    }
];
