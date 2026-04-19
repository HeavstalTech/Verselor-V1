// lib/Anti.js
// © Heavstal Tech™
// Modify before re-use - bugs may occur 🧏

import { sleep } from '#System/Data1.js';

export const handleAntiFeatures = async (HeavstalTech, m, params) => {
    const { isGroup, isBotAdmin, isAdmin, isCreator, body, from, Vreply } = params;
    
    if (!isGroup) return false; // Anti-features only apply in groups
    
    const chatData = global.db.data.chats[from] || {};
    let violationDetected = false;

    // 1. star5 security help
    const triggerSecurity = async (violationType, culprit) => {
        violationDetected = true;
        
        // if an old setting is "true", default it to "kick"
        let mode = chatData[violationType];
        if (mode === true) mode = 'kick'; 
        
        if (!mode || mode === 'off') return;

        // for just delete of message 
        if (isBotAdmin) {
            await HeavstalTech.sendMessage(from, { delete: m.key });
        }

        // for deleting and kicking 
        if (mode === 'kick') {
            if (!isBotAdmin) {
                Vreply(`*Security Alert:* I need Admin privileges to kick @${culprit.split('@')[0]}!`, { mentions: [culprit] });
                return;
            }
            await HeavstalTech.groupParticipantsUpdate(from, [culprit], 'remove');
            await HeavstalTech.sendMessage(from, { text: `*🚫 ${violationType.toUpperCase()} DETECTED*\n@${culprit.split('@')[0]} has been removed.`, mentions: [culprit] });
        }

        // fro just deleting ans warning
        if (mode === 'warn') {
            if (!chatData.warnings) chatData.warnings = {};
            const currentWarns = (chatData.warnings[culprit] || 0) + 1;
            const maxWarns = global.warnLimit || 3;

            if (currentWarns >= maxWarns) {
                delete chatData.warnings[culprit]; 
                if (isBotAdmin) {
                    await HeavstalTech.groupParticipantsUpdate(from, [culprit], 'remove');
                    await HeavstalTech.sendMessage(from, { text: `*🚫 WARNING LIMIT REACHED*\n@${culprit.split('@')[0]} has been kicked for repeated ${violationType} violations.`, mentions: [culprit] });
                } else {
                    await HeavstalTech.sendMessage(from, { text: `*🚫 WARNING LIMIT REACHED*\n@${culprit.split('@')[0]} should be kicked, but I am not Admin.`, mentions: [culprit] });
                }
            } else {
                chatData.warnings[culprit] = currentWarns;
                await HeavstalTech.sendMessage(from, { text: `*⚠️ WARNING [${currentWarns}/${maxWarns}]*\n@${culprit.split('@')[0]}, stop triggering the ${violationType} filter!`, mentions: [culprit] });
            }
        }
    };

    // 2. check
    if (!isAdmin && !isCreator && !m.key.fromMe && typeof body === 'string') {
        
        // Anti-Tag (Checks if mentions exceed 7 - modify to higher or lower)
        if (chatData.antitag && chatData.antitag !== 'off') {
            if (m.mentionedJid && m.mentionedJid.length > 7) {
                await triggerSecurity('antitag', m.sender);
            }
        }

        // Anti-Link
        if (!violationDetected && chatData.antilink && chatData.antilink !== 'off') {
            const isLooseUrl = (text) => /\b((https?:\/\/|www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/\S*)?\b/gi.test(text);
            if (isLooseUrl(body) || body.includes('http') || body.includes('chat.whatsapp.com')) {
                await triggerSecurity('antilink', m.sender);
            }
        }
        
        // Anti-Badword
        if (!violationDetected && chatData.antibadword && chatData.antibadword !== 'off') {
            const badWords = global.db.data.settings?.badwords || [];
            const wordsInMessage = body.toLowerCase().split(/\s+/);
            if (wordsInMessage.some(w => badWords.includes(w))) {
                await triggerSecurity('antibadword', m.sender);
            }
        }
        
        // Anti-Bot
        if (!violationDetected && chatData.antibot && chatData.antibot !== 'off') {
            if (m.key.id.startsWith('BAE5') || m.key.id.length > 21) {
                await triggerSecurity('antibot', m.sender);
            }
        }
    }

    if (violationDetected) {
        await global.db.write();
    }

    return violationDetected; // true if any stuff got caught/seen.
};