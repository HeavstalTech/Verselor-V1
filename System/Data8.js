import fs from 'node:fs';
import { sleep } from "#System/Data1.js"

const getCurrentTime = () => {
    return new Intl.DateTimeFormat('en-GB', { 
        timeZone: global.timezone || 'Africa/Lagos', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
    }).format(new Date());
};

const getCurrentDate = () => {
    return new Intl.DateTimeFormat('en-GB', { 
        timeZone: global.timezone || 'Africa/Lagos', 
        day: '2-digit', month: '2-digit', year: 'numeric' 
    }).format(new Date());
};

export default async (HeavstalTech, store) => {

    // =========================================================================
    //  1. ANTI-DELETE
    // =========================================================================
    HeavstalTech.ev.on('messages.delete', async (m) => {
        try {
            if (!m.keys || m.keys.length === 0) return;
            const deletedKey = m.keys[0];
            if (!deletedKey.remoteJid.endsWith('@g.us')) return;
            
            const chatSettings = global.db.data.chats[deletedKey.remoteJid];
            if (!chatSettings || !chatSettings.antidelete) return;

            const deletedMessage = await store.loadMessage(deletedKey.remoteJid, deletedKey.id);
            if (deletedMessage && deletedMessage.message) {
                const participant = deletedKey.participant || deletedKey.remoteJid;
                
                const time = getCurrentTime();
                const date = getCurrentDate();

                const captionText = `🚨 *[ ANTI-DELETE DETECTED ]* 🚨\n\n` +
                    `👤 *Sender:* @${participant.split('@')[0]}\n` +
                    `📅 *Date:* ${date}\n` +
                    `🕒 *Time:* ${time}\n` +
                    `📝 *Content Recovered Below:*`;

                await HeavstalTech.copyNForward(deletedKey.remoteJid, deletedMessage, true, {
                    readViewOnce: true,
                    quoted: deletedMessage,
                    contextInfo: { mentionedJid: [participant] }
                }).catch(e => console.log("Failed to forward deleted msg:", e));

                if (!deletedMessage.message.conversation && !deletedMessage.message.extendedTextMessage) {
                     await HeavstalTech.sendMessage(deletedKey.remoteJid, { text: captionText, mentions: [participant] });
                }
            }
        } catch (err) {
            console.error("Anti-delete error:", err);
        }
    });

    // =========================================================================
    //  2. ANTI-CALL (Rejects/Blocks calls)
    // =========================================================================
    HeavstalTech.ev.on('call', async (call) => {
        const anticallMode = global.db.data.settings.anticall || 'off';
        if (anticallMode === 'off') return;

        for (let c of call) {
            if (c.status === 'offer') {
                const callerId = c.from;
                const callId = c.id;
                
                 if (global.db.data.settings.owners.includes(callerId)) return;
                 
                 if (anticallMode === 'reject') {
                    await HeavstalTech.rejectCall(callId, callerId);
                    await HeavstalTech.sendMessage(callerId, { text: `*📵 Auto-Reject Active*\n\nCalls are not accepted on this bot.` });
                } 
                else if (anticallMode === 'block') {
                    await HeavstalTech.rejectCall(callId, callerId);
                    await HeavstalTech.sendMessage(callerId, { text: `*🚫 Auto-Block Active*\n\nYou have been blocked for calling the bot.` });
                    await sleep(2000);
                    await HeavstalTech.updateBlockStatus(callerId, "block");
                }
            }
        }
    });

    // =========================================================================
    //  3. GROUP PARTICIPANTS (Welcome, Leave, Remove, Promote, Demote)
    // =========================================================================
    HeavstalTech.ev.on('group-participants.update', async (anu) => {
        try {
            const groupSettings = global.db.data.chats[anu.id] || {};
            
            // Get Group Metadata for Name and Member Count
            const metadata = await HeavstalTech.groupMetadata(anu.id);
            const participants = anu.participants;
            const groupName = metadata.subject;
            const groupDesc = metadata.desc || 'No Description';
            const memberCount = metadata.participants.length;
            
            const time = getCurrentTime();
            const date = getCurrentDate();

            for (let num of participants) {
                // Get Profile Picture
                let ppuser;
                try {
                    ppuser = await HeavstalTech.profilePictureUrl(num, 'image');
                } catch {
                    ppuser = 'https://heavstal-bots.vercel.app/bot-images/verselor-img-one.png'; 
                }

                // WELCOME
                if (groupSettings.welcome && anu.action === 'add') {
                    const welText = `Hello @${num.split("@")[0]}\n\n👋 *Welcome to ${groupName}*\n\n` +
                    `👥 *Member Count:* ${memberCount}\n` +
                    `🕒 *Joined:* ${time} on ${date}\n\n` +
                    `_Do Well To Read The Group Description Below_\n📜 *Description:*\n${groupDesc}\n\n*Enjoy your stay!*`;
                    
                    await HeavstalTech.sendMessage(anu.id, { 
                        image: { url: ppuser }, 
                        caption: welText, 
                        contextInfo: { mentionedJid: [num] } 
                    });
                }

                // LEAVE (User left voluntarily)
                if (groupSettings.goodbye && anu.action === 'leave') {
                    const leaveText = `👋 *Goodbye @${num.split("@")[0]}*\n\n` + 
                    `Has voluntarily left ${groupName}.\n` +
                    `👥 *Remaining Members:* ${memberCount}\n` +
                    `🕒 *Left At:* ${time} on ${date}\n\n` +
                    `We hope to see you again soon!`;
                    
                    await HeavstalTech.sendMessage(anu.id, { 
                        image: { url: ppuser }, 
                        caption: leaveText, 
                        contextInfo: { mentionedJid:[num] } 
                    });
                }

                // REMOVE (User was kicked by an Admin)
                if (groupSettings.goodbye && anu.action === 'remove') {
                    const actor = anu.author || anu.actor || "Unknown"; // Grab the admin who kicked them
                    const mentions = [num];
                    if (actor !== "Unknown") mentions.push(actor); // Add actor to mentions if known
                    
                    const kickText = `👢 *USER REMOVED*\n\n` + 
                    `👤 *User:* @${num.split("@")[0]}\n` +
                    `👮‍♂️ *Removed By:* @${actor.split("@")[0]}\n` +
                    `👥 *Remaining Members:* ${memberCount}\n` +
                    `🕒 *Time:* ${time} on ${date}\n\n` +
                    `Good riddance!`;
                    
                    await HeavstalTech.sendMessage(anu.id, { 
                        image: { url: ppuser }, 
                        caption: kickText, 
                        contextInfo: { mentionedJid: mentions } 
                    });
                }

                // PROMOTE
                if (groupSettings.events && anu.action === 'promote') {
                    const actor = anu.author || anu.actor || "Unknown"; 
                    const mentions = [num];
                    if (actor !== "Unknown") mentions.push(actor);

                    await HeavstalTech.sendMessage(anu.id, { 
                        text: `*🆙 USER PROMOTED*\n\n` +
                              `👤 *User:* @${num.split('@')[0]}\n` +
                              `👮‍♂️ *Promoted By:* @${actor.split('@')[0]}\n` +
                              `🕒 *Time:* ${time} | ${date}\n\n` +
                              `Congratulations! 👮‍♂️`,
                        contextInfo: { mentionedJid: mentions }
                    });
                }

                // DEMOTE
                if (groupSettings.events && anu.action === 'demote') {
                    const actor = anu.author || anu.actor || "Unknown";
                    const mentions = [num];
                    if (actor !== "Unknown") mentions.push(actor);

                    await HeavstalTech.sendMessage(anu.id, { 
                        text: `*⬇️ USER DEMOTED*\n\n` +
                              `👤 *User:* @${num.split('@')[0]}\n` +
                              `👮‍♂️ *Demoted By:* @${actor.split('@')[0]}\n` +
                              `🕒 *Time:* ${time} | ${date}\n\n` +
                              `Better luck next time.`,
                        contextInfo: { mentionedJid: mentions }
                    });
                }
            }
        } catch (err) {
            console.log("Error in group-participants.update:", err);
        }
    });

    // =========================================================================
    //  4. GROUP UPDATE (Settings, Name, Description)
    // =========================================================================
    HeavstalTech.ev.on('groups.update', async (updates) => {
        try {
            for (const update of updates) {
                const id = update.id;
                const groupSettings = global.db.data.chats[id] || {};
                
                if (!groupSettings || !groupSettings.events) continue;

                // Subject Change
                if (update.subject) {
                    await HeavstalTech.sendMessage(id, { 
                        text: `*✏️ GROUP NAME CHANGED*\n\nNew Name: *${update.subject}*` 
                    });
                }

                // Description Change
                if (update.desc) {
                    await HeavstalTech.sendMessage(id, { 
                        text: `*📝 GROUP DESCRIPTION CHANGED*\n\nNew Description:\n${update.desc}` 
                    });
                }

                // Settings Change (Announce/Locked)
                if (update.announce === true) {
                    await HeavstalTech.sendMessage(id, { text: `*🔒 GROUP CLOSED*\n\nOnly Admins can send messages.` });
                } else if (update.announce === false) {
                    await HeavstalTech.sendMessage(id, { text: `*🔓 GROUP OPENED*\n\nAll participants can send messages.` });
                }

                if (update.restrict === true) {
                    await HeavstalTech.sendMessage(id, { text: `*🔒 INFO LOCKED*\n\nOnly Admins can edit group info.` });
                } else if (update.restrict === false) {
                    await HeavstalTech.sendMessage(id, { text: `*🔓 INFO UNLOCKED*\n\nAll participants can edit group info.` });
                }
            }
        } catch (err) {
            console.log("Error in groups.update:", err);
        }
    });
};
