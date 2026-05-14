import { sleep } from "#System/Data1.js";
import chalk from "chalk";

export default [
    {
        name: 'add',
        aliases: [],
        category: 'group',
        description: 'Adds a user to the group.',
        usage: '%prefix%add <number>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true, // We added this flag to our executor earlier!
        execute: async (HeavstalTech, m, context) => {
            const { text, from, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`Provide The Number You Want To Add\nExample: ${prefix}${command} 23481xxxx`);
            let users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            await HeavstalTech.groupParticipantsUpdate(from, [users], 'add');
            Vreply(mess.done || "*Done*...");
        }
    },
    {
        name: 'kick',
        aliases: ['fling'],
        category: 'group',
        description: 'Removes a user from the group or mass kicks by country code.',
        usage: '%prefix%kick <@user/number/country code>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, from, Vreply, prefix, command, mess, BotNum, isOwner } = context;
            
            if (m.mentionedJid && m.mentionedJid.length > 0) {
                await HeavstalTech.groupParticipantsUpdate(from, m.mentionedJid, 'remove');
                return Vreply(mess.done || "*Done*...");
            }
            
            if (!text) return Vreply(`*System: Kick Manager*\n\nUsage:\n1. *${prefix}${command} <@user>*\n2. *${prefix}${command} <number>*\n_Example:_ ${prefix}${command} 23481xxxx\n3. *${prefix}${command} <country code>* (Auto-kick ALL members with country code)\n_Example:_ ${prefix}${command} +91`);

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
            } else {
                let user = cleanNumber + '@s.whatsapp.net';
                await HeavstalTech.groupParticipantsUpdate(from, [user], 'remove');
                return Vreply(mess.done || "*Done*...");
            }
        }
    },
    {
        name: 'promote',
        aliases: [],
        category: 'group',
        description: 'Makes a user a group admin.',
        usage: '%prefix%promote <@user>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, from, Vreply } = context;
            let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
            if (!users || users === '@s.whatsapp.net') return Vreply("Please mention or reply to a user.");
            await HeavstalTech.groupParticipantsUpdate(from, [users], 'promote');
            Vreply("*Done*...");
        }
    },
    {
        name: 'demote',
        aliases: [],
        category: 'group',
        description: 'Removes admin rights from a user.',
        usage: '%prefix%demote <@user>',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, from, Vreply } = context;
            let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
            if (!users || users === '@s.whatsapp.net') return Vreply("Please mention or reply to a user.");
            await HeavstalTech.groupParticipantsUpdate(from, [users], 'demote');
            Vreply("*Done*....");
        }
    },
    {
        name: 'tagall',
        aliases: [],
        category: 'group',
        description: 'Mentions every member in the group.',
        usage: '%prefix%tagall [text]',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { q, participants, Vreply } = context;
            let teks = `══✪〘 *Tag All* 〙✪══\n ➲ *Message : ${q ? q : '𝐇𝐄𝐀𝐕𝐒𝐓𝐀𝐋 𝐇𝐄𝐑𝐄 𝐈𝐒 𝐇𝐄𝐑𝐄'}*\n\n`;
            for (let mem of participants) {
                teks += `⭔ @${mem.id.split('@')[0]}\n`;
            }
            HeavstalTech.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });
        }
    },
    {
        name: 'hidetag',
        aliases: [],
        category: 'group',
        description: 'Sends a message that ghost-pings all members.',
        usage: '%prefix%hidetag [text]',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { q, from, footer, participants } = context;
            HeavstalTech.sendMessage(from, { text: q ? q : `*Verselor V1 Is Here*\n\n${footer}`, mentions: participants.map(a => a.id) }, { quoted: m });
        }
    },
    {
        name: 'linkgroup',
        aliases: ['linkgc', 'gclink'],
        category: 'group',
        description: 'Fetches the group invite link.',
        usage: '%prefix%linkgroup',
        groupOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { from, Vreply, MenuStyle, groupMetadata } = context;
            try {
                let response = await HeavstalTech.groupInviteCode(from);
                HeavstalTech.sendText(from, `*Successfully Fetched Group Link*\n\n┃━ ${MenuStyle} *Group Link:* https://chat.whatsapp.com/${response}\n┃━\n┃━ ${MenuStyle} *Group Name:* ${groupMetadata.subject}\n`, m, { detectLink: true });
            } catch (e) {
                console.log("Error Fetching Group Link:", e);
                Vreply(`An Error Occurred\n\n${e}`);
            }
        }
    },
    {
        name: 'resetgclink',
        aliases: ['revoke', 'resetlinkgc'],
        category: 'group',
        description: 'Revokes and resets the group invite link.',
        usage: '%prefix%resetgclink',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { from, Vreply, prefix } = context;
            Vreply(`You Are About To Reset This Group Link!. You Have 5 seconds to restart bot to stop this process. Use ${prefix}restart to stop this process`);
            await sleep(5000); 
            await HeavstalTech.groupRevokeInvite(from);
            Vreply("Successfully Reset Group Link");
        }
    },
    {
        name: 'kickall',
        aliases: [],
        category: 'group',
        description: 'Removes all non-admin members.',
        usage: '%prefix%kickall',
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
                    if (member.admin === "superadmin" || member.admin === "admin") continue; 
                    await HeavstalTech.groupParticipantsUpdate(m.chat, [member.id], 'remove');
                    await sleep(1000);
                }
                Vreply("✅ All members have been removed (except admins & bot).");
            } catch (e) {
                console.log(chalk.redBright(`[KICK-ALL CMD ERROR]: ${e}`));
                Vreply(`${mess.error.fitur}\n${e}`);
            }
        }
    },
    {
        name: 'nsfw',
        aliases: [],
        category: 'group',
        description: 'Enables or disables NSFW commands in the group.',
        usage: '%prefix%nsfw <on/off>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix, command, footer } = context;
            if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

            if (args[0] === 'on') {
                if (global.db.data.chats[m.chat].nsfw) return Vreply('*Nsfw Is Already Activated In This Chat*');
                global.db.data.chats[m.chat].nsfw = true;
                await global.db.write();
                Vreply(`*Successfully Activated Nsfw In This Chat*\n\n${footer}`);
            } else if (args[0] === 'off') {
                if (!global.db.data.chats[m.chat].nsfw) return Vreply('*Nsfw Is Already Deactivated In This Group Chat*');
                global.db.data.chats[m.chat].nsfw = false;
                await global.db.write();
                Vreply(`*Successfully Deactivated Nsfw In This Chat*\n\n${footer}`);
            } else {
                Vreply(`*INCORRECT USAGE*\n\nPlease select on/off\n*Example:* ${prefix + command} off`);
            }
        }
    },
    {
        name: 'gcstatus',
        aliases: ['upswgc', 'usg'],
        category: 'group',
        description: 'Posts a status update directly from the group.',
        usage: '%prefix%gcstatus <text/reply media>',
        groupOnly: true,
        adminOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, quoted, mime, Vreply, prefix, command } = context;
            const isImage = /image/.test(mime);
            const isVideo = /video/.test(mime);
            const isAudio = /audio/.test(mime);

            if (!isImage && !isVideo && !isAudio && !text) {
                return Vreply(`*Usage:* Reply to media or type text.\n\n*Example:* ${prefix + command} Hello Group`);
            }

            if (quoted && (isVideo || isAudio || isImage)) {
                const mediaMsg = quoted.msg || quoted.message || quoted; 
                const fileSize = mediaMsg?.fileLength || mediaMsg?.videoMessage?.fileLength || mediaMsg?.audioMessage?.fileLength || 0;
                const sizeInMB = fileSize / (1024 * 1024);
                const MAX_VIDEO_MB = 15;
                const MAX_IMAGE_MB = 5;

                if (isVideo && sizeInMB > MAX_VIDEO_MB) {
                    return Vreply(`*Error:* Video is too large! (${sizeInMB.toFixed(1)}MB). Max allowed is ${MAX_VIDEO_MB}MB.`);
                }
                if (isImage && sizeInMB > MAX_IMAGE_MB) {
                    return Vreply(`*Error:* Image is too large! (${sizeInMB.toFixed(1)}MB). Max allowed is ${MAX_IMAGE_MB}MB.`);
                }
            }

            await HeavstalTech.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
            let mediaBuffer = null;

            try {
                if (isImage || isVideo || isAudio) {
                    mediaBuffer = await HeavstalTech.downloadMediaMessage(quoted);
                    if (!mediaBuffer) throw new Error("Failed to download media buffer.");
                    let statusOptions = {};
                    if (isImage) statusOptions = { image: mediaBuffer, caption: text };
                    else if (isVideo) statusOptions = { video: mediaBuffer, caption: text };
                    else if (isAudio) statusOptions = { audio: mediaBuffer, mimetype: 'audio/mp4' };
                    await HeavstalTech.sendGroupStatus(m.chat, statusOptions, { quoted: m });
                } else {
                    await HeavstalTech.sendGroupStatus(m.chat, { text: text }, { quoted: m });
                }
                
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } catch (e) {
                console.error("[GC STATUS ERROR]", e);
                Vreply(`*Failed to post group status.*\n_Error: ${e.message}_`);
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            } finally {
                if (mediaBuffer) {
                    mediaBuffer = null;
                }
            }
        }
    }
];
