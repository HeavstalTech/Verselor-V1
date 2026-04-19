export default [
    {
        name: 'addowner',
        aliases: ['addown'],
        category: 'owner',
        description: 'Adds a new bot owner.',
        usage: '%prefix%addowner <number/tag/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;
            
            let numero = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!numero || numero === '@s.whatsapp.net') return Vreply(usageMessage);
            
            if (global.db.data.settings.owners.includes(numero)) return Vreply("Already an owner.");
            
            let loadnum = await HeavstalTech.onWhatsApp(numero);
            if (loadnum.length == 0) return Vreply(`Number Invalid or not registered on WhatsApp!!!`);
            
            global.db.data.settings.owners.push(numero);
            if (!global.db.data.settings.premium) global.db.data.settings.premium = [];
            global.db.data.settings.premium.push(numero); 
            
            await global.db.write();
            Vreply(`Successfully added @${numero.split('@')[0]} as an owner!`, { mentions: [numero] });
        }
    },
    {
        name: 'delowner',
        aliases: ['delown'],
        category: 'owner',
        description: 'Removes a bot owner.',
        usage: '%prefix%delowner <number/tag/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;

            let targetNumber = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!targetNumber || targetNumber === '@s.whatsapp.net') return Vreply(usageMessage);
          
            let ownerIndex = global.db.data.settings.owners.indexOf(targetNumber);
            let premIndex = global.db.data.settings.premium ? global.db.data.settings.premium.indexOf(targetNumber) : -1;
            
            if (ownerIndex === -1) {
                return Vreply(`*Process Failed*\n\nUser @${targetNumber.split('@')[0]} is not in the owner list.`, { mentions: [targetNumber] });
            }
            
            global.db.data.settings.owners.splice(ownerIndex, 1);
            if (premIndex !== -1) {
                global.db.data.settings.premium.splice(premIndex, 1);
            }
            await global.db.write();
            
            Vreply(`Successfully removed @${targetNumber.split('@')[0]} from the owner and premium lists!`, { mentions: [targetNumber] });
        }
    },
    {
        name: 'addsudo',
        aliases: ['setsudo'],
        category: 'owner',
        description: 'Grants sudo privileges to a user.',
        usage: '%prefix%addsudo <number/tag/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;

            let orang = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!orang || orang === '@s.whatsapp.net') return Vreply(usageMessage);

            if (global.db.data.settings.sudo.includes(orang)) return Vreply(`*User @${orang.split('@')[0]} Already Existed As A Sudo User...*`, { mentions: [orang] });
            
            global.db.data.settings.sudo.push(orang);
            await global.db.write();
            Vreply(`*Successfully Added @${orang.split('@')[0]} To Sudo List*`, { mentions: [orang] });
        }
    },
    {
        name: 'delsudo',
        aliases: ['removesudo'],
        category: 'owner',
        description: 'Removes sudo privileges.',
        usage: '%prefix%delsudo <number/tag/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;

            let orang = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!orang || orang === '@s.whatsapp.net') return Vreply(usageMessage);

            if (!global.db.data.settings.sudo.includes(orang)) return Vreply(`*User @${orang.split('@')[0]} Does Not Exist In Sudo List...*`, { mentions: [orang] });
            
            let indx = global.db.data.settings.sudo.indexOf(orang);
            global.db.data.settings.sudo.splice(indx, 1);
            await global.db.write();
            Vreply(`Successfully Deleted @${orang.split('@')[0]} From Sudo List`, { mentions: [orang] });
        }
    },
    {
        name: 'listsudo',
        aliases: ['getsudo'],
        category: 'owner',
        description: 'Lists all users with sudo access.',
        usage: '%prefix%listsudo',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, setsudo } = context;
            if (!m.isGroup) return Vreply(global.mess.only.group);
            if (setsudo.length < 1) return Vreply("*No Sudo Users Found Here*");
            
            let teksnya = `*Total Sudo Users Found Here Are:*\n`;
            setsudo.forEach(e => teksnya += `* @${e.split("@")[0]}\n`);
            await HeavstalTech.sendMessage(m.chat, { text: teksnya, mentions: [...setsudo] }, { quoted: m });
        }
    },
    {
        name: 'premium',
        aliases: ['buyprem'],
        category: 'core',
        description: 'Fetchs Latest info on how user can purchase bot premiumship.',
        usage: '%prefix%premium',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, prefix, footer } = context;
            const premText = `*UPGRADE TO PREMIUM*\n    \nUnlock the full power of Verselor-V1! Premium grants you access to heavy-duty commands like the WABan & Unban suite, advanced NSFW tools, and more.\n\n*How to Upgrade:*\n1. Go to the Heavstal Bots Dashboard: https://heavstal-bots.vercel.app/dashboard/manager\n2. Select your currently active AuthCode.\n3. Click on the *Premium* tab (⚡ icon).\n4. Select your desired duration (3 Days, 7 Days, 30 Days, etc.) and pay with Coins.\n5. Restart your bot here using *${prefix}restart* so it fetches your new Premium Status!\n\n_Need Coins? Buy them here: https://heavstal-bots.vercel.app/dashboard/pricing_\n\n${footer}`;
            return Vreply(premText);
        }
    },
    {
        name: 'ban',
        aliases: ['banuser'],
        category: 'owner',
        description: 'Bans a user from using the bot.',
        usage: '%prefix%ban <@user/number/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, BotNum, ban, footer } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;
            let PromiseArr = ['2348137256404', '2348166546725'];

            let orang = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!orang || orang === '@s.whatsapp.net') return Vreply(usageMessage);

            if (orang === BotNum) return Vreply('*I Cannot Ban Myself*');
            if (PromiseArr.map(n => n + "@s.whatsapp.net").includes(orang)) return Vreply('*ACCESS DENIED*\n\nBot Developers Cannot Be Banned');
            if (ban.includes(orang)) return Vreply(`*@${orang.split('@')[0]} Has Already Been Banned\n\n${footer}*`, { mentions: [orang] });
            
            ban.push(orang);
            await global.db.write();
            Vreply(`*Successfully Banned @${orang.split('@')[0]} From Using This Bot*\n\n${footer}`, { mentions: [orang] });
        }
    },
    {
        name: 'unban',
        aliases: ['unbanuser'],
        category: 'owner',
        description: 'Unbans a user.',
        usage: '%prefix%unban <@user/number/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, BotNum, ban, footer } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;
            let PromiseArr = ['2348137256404', '2348166546725'];

            let orang = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!orang || orang === '@s.whatsapp.net') return Vreply(usageMessage);

            if (orang === BotNum) return Vreply('*I Was Never Banned*');
            if (PromiseArr.map(n => n + "@s.whatsapp.net").includes(orang)) return Vreply('*ACCESS DENIED*\n\nBot Developers Were Never Banned');
            if (!ban.includes(orang)) return Vreply(`*@${orang.split('@')[0]} is not among the banned users*`, { mentions: [orang] });
            
            let indx = ban.indexOf(orang);
            ban.splice(indx, 1); 
            await global.db.write();
            Vreply(`*@${orang.split('@')[0]} has been unbanned, user can now use this bot*\n\n${footer}`, { mentions: [orang] });
        }
    },
    {
        name: 'listban',
        aliases: ['listbanuser'],
        category: 'owner',
        description: 'Lists all banned users.',
        usage: '%prefix%listban',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, ban } = context;
            if (ban.length < 1) return Vreply("Couldn't Find Any Banned Users Yet");
            let teksnya = `List Of Banned Users Here\n`;
            ban.forEach(e => teksnya += `* @${e.split("@")[0]}\n`);
            await HeavstalTech.sendMessage(m.chat, { text: teksnya, mentions: [...ban] }, { quoted: m });
        }
    },
    {
        name: 'banchat',
        aliases: ['bangc', 'ban-chat', 'ban-gc'],
        category: 'owner',
        description: 'Bans the current group chat from using the bot.',
        usage: '%prefix%banchat',
        groupOnly: true,
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BANNED_GROUP, footer } = context;
            let BOT_GROUP_ID = '120363421697115707@g.us';
            let GROUP = m.chat;
            
            if (GROUP === BOT_GROUP_ID) return Vreply('*ACCESS DENIED*\n\nBot Group Cannot Be Banned.');
            if (BANNED_GROUP.includes(GROUP)) return Vreply(`*PROCESS STOPPED*\n\nThis Group Has Already Been Banned\n\n${footer}`);
            
            BANNED_GROUP.push(GROUP);
            await global.db.write();
            Vreply(`*Successfully Banned This Group From Using This Bot*\nThis Bot Will No Longer Carry On Activities Here\n\n${footer}`);
        }
    },
    {
        name: 'unbanchat',
        aliases: ['unbangc', 'unban-chat', 'unban-gc'],
        category: 'owner',
        description: 'Unbans the current group chat.',
        usage: '%prefix%unbanchat',
        groupOnly: true,
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BANNED_GROUP, footer } = context;
            let BOT_GROUP_ID = '120363421697115707@g.us';
            let GROUP = m.chat;
            
            if (GROUP === BOT_GROUP_ID) return Vreply('*PROCESS STOPPED*\n\nBot Group Was Never Banned.');
            let indx = BANNED_GROUP.indexOf(GROUP);
            if (indx > -1) {
                BANNED_GROUP.splice(indx, 1);
                await global.db.write();
            }
            Vreply(`*Successfully Unbanned This Group*\nThis Bot Can Now Carry On Activities Here\n\n${footer}`);
        }
    },
    {
        name: 'block',
        aliases: ['blocked'],
        category: 'owner',
        description: 'Blocks a user on WhatsApp.',
        usage: '%prefix%block <number/tag/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;

            let targetJid = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!targetJid || targetJid === '@s.whatsapp.net') return Vreply(usageMessage);

            await HeavstalTech.updateBlockStatus(targetJid, 'block');
            await Vreply(`*Done*`);
        }
    },
    {
        name: 'unblock',
        aliases: ['unblocked'],
        category: 'owner',
        description: 'Unblocks a user.',
        usage: '%prefix%unblock <number/tag/reply>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, BotNum, prefix, command } = context;
            const usageMessage = `*ᴘʀᴏᴄᴇss ғᴀɪʟᴇᴅ*\nᴛʜᴇ ᴘʀᴏᴄᴇss ʜᴀs ғᴀɪʟᴇᴅ ᴅᴜᴇ ᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛ ᴜsᴀɢᴇ.\nPlease tag, reply to, or provide a number.\n*ᴇxᴀᴍᴘʟᴇ:* ${prefix + command} 234xxxxxxx`;
            const ownernumber = '2348137256404';
            const ownernumber2 = '2348166546725';

            let targetJid = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!targetJid || targetJid === '@s.whatsapp.net') return Vreply(usageMessage);
            
            if (targetJid === ownernumber + "@s.whatsapp.net" || targetJid === ownernumber2 + "@s.whatsapp.net" || targetJid === BotNum + "@s.whatsapp.net") {
                return Vreply("*ACCESS DENIED*\nYou Cannot Initiate This Command On This User. Try Another User!");
            }

            await HeavstalTech.updateBlockStatus(targetJid, 'unblock');
            await Vreply(`*Done*`);
        }
    },
    {
        name: 'listblock',
        aliases: ['listblocked'],
        category: 'owner',
        description: 'Lists blocked numbers.',
        usage: '%prefix%listblock',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply } = context;
            let listblok = await HeavstalTech.fetchBlocklist();
            
            if (listblok.length === 0) {
                Vreply('No blocked users found.');
            } else {
                // Safely decode the JID to bypass @lid issues
                let blockedList = listblok.map((v, i) => {
                    let decodedUser = HeavstalTech.decodeJid(v);
                    return `${i + 1}. @${decodedUser.replace(/@.+/, '')}`;
                }).join('\n');
                
                await Vreply(`Blocked contact\nTotal: ${listblok.length} blocked\n\n` + blockedList);
            }
        }
    }
];
