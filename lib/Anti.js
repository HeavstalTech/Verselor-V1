// lib/Anti.js
// © Heavstal Tech™
// Modify before re-use - bugs may occur 🧏

import { sleep, isLooseUrl } from '#System/Data1.js'

export const handleAntiFeatures = async (HeavstalTech, m, params) => {
    var { isGroup, isBotAdmin, isAdmin, isCreator, body, from, Vreply } = params
    
    if (!isGroup) return false
    
    var chatData = global.db.data.chats[from] || {};
    var violationDetected = false;
    var triggerSecurity = async (violationType, culprit) => {
        violationDetected = true;
        var mode = chatData[violationType];
        if (mode === true) mode = 'kick'; 
        if (!mode || mode === 'off') return;
        if (isBotAdmin) {
            await HeavstalTech.sendMessage(from, { delete: m.key });
        }

        if (mode === 'kick') {
            if (!isBotAdmin) {
                Vreply(`*Security Alert:* I need Admin privileges to kick @${culprit.split('@')[0]}!`, { mentions: [culprit] });
                return;
            }
            await HeavstalTech.groupParticipantsUpdate(from, [culprit], 'remove');
            await HeavstalTech.sendMessage(from, { text: `*🚫 ${violationType.toUpperCase()} DETECTED*\n@${culprit.split('@')[0]} has been removed.`, mentions: [culprit] });
        }

        if (mode === 'warn') {
            if (!chatData.warnings) chatData.warnings = {}
            var currentWarns = (chatData.warnings[culprit] || 0) + 1
            var maxWarns = global.warnLimit || 3

            if (currentWarns >= maxWarns) {
                delete chatData.warnings[culprit]
                if (isBotAdmin) {
                    await HeavstalTech.groupParticipantsUpdate(from, [culprit], 'remove');
                    await HeavstalTech.sendMessage(from, { text: `*🚫 WARNING LIMIT REACHED*\n@${culprit.split('@')[0]} has been kicked for repeated ${violationType} violations.`, mentions: [culprit] })
                } else {
                    await HeavstalTech.sendMessage(from, { text: `*🚫 WARNING LIMIT REACHED*\n@${culprit.split('@')[0]} should be kicked, but I am not Admin.`, mentions: [culprit] })
                }
            } else {
                chatData.warnings[culprit] = currentWarns;
                await HeavstalTech.sendMessage(from, { text: `*⚠️ WARNING [${currentWarns}/${maxWarns}]*\n@${culprit.split('@')[0]}, stop triggering the ${violationType} filter!`, mentions: [culprit] })
            }
        }
    };

    if (!isAdmin && !isCreator && !m.key.fromMe && typeof body === 'string') {
        
        if (chatData.antitag && chatData.antitag !== 'off') {
            if (m.mentionedJid && m.mentionedJid.length > 7) {
                await triggerSecurity('antitag', m.sender);
            }
        }

        if (!violationDetected && chatData.antilink && chatData.antilink !== 'off') {
            if (isLooseUrl(body) || body.includes('http') || body.includes('chat.whatsapp.com')) {
                await triggerSecurity('antilink', m.sender);
            }
        }
        
        if (!violationDetected && chatData.antibadword && chatData.antibadword !== 'off') {
            var badWords = global.db.data.settings?.badwords || [];
            var wordsInMessage = body.toLowerCase().split(/\s+/);
            if (wordsInMessage.some(w => badWords.includes(w))) {
                await triggerSecurity('antibadword', m.sender);
            }
        }
        
        if (!violationDetected && chatData.antibot && chatData.antibot !== 'off') {
            if (m.key.id.startsWith('BAE5') || m.key.id.length > 21) {
                await triggerSecurity('antibot', m.sender);
            }
        }
    }

    if (violationDetected) {
        await global.db.write();
    }

    return violationDetected
}
