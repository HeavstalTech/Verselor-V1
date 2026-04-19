export default [
    {
        name: 'animenews',
        aliases: [],
        category: 'anime',
        description: 'Fetches the top 5 currently airing/trending anime.',
        usage: '%prefix%animenews',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess, MenuStyle, footer } = context;
            try {
                Vreply(mess.wait);
                const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing&limit=5");
                const json = await response.json();
                const animeList = json.data;

                if (!animeList || animeList.length === 0) {
                    return Vreply(`*${MenuStyle} Could not fetch trending anime news at this time.*\n\n${footer}`);
                }

                let replyText = `*${MenuStyle} TOP 5 TRENDING ANIME RIGHT NOW ${MenuStyle}*\n\n`;
                animeList.forEach(anime => {
                    replyText += `*${MenuStyle} Title:* ${anime.title}\n` +
                                 `*${MenuStyle} Score:* ${anime.score} ⭐\n` +
                                 `*${MenuStyle} Episodes:* ${anime.episodes || 'Airing'}\n` +
                                 `*${MenuStyle} More Info:* ${anime.url}\n\n`;
                });
                replyText += `${footer}`;

                await HeavstalTech.sendMessage(m.chat, { react: { text: "📰", key: m.key } });
                return Vreply(replyText);
            } catch (e) {
                console.error(e);
                Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'character',
        aliases: ['animechar'],
        category: 'anime',
        description: 'Looks up an anime character\'s bio and image.',
        usage: '%prefix%character <name>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess, MenuStyle, footer } = context;
            try {
                if (!text) {
                    return Vreply(`*${MenuStyle} Please provide a character's name to search for.*\n_Example: ${prefix}character Naruto Uzumaki_\n\n${footer}`);
                }

                Vreply(mess.wait);

                const apiUrl = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(text)}&limit=1`;
                const response = await fetch(apiUrl);
                const resJson = await response.json();
                const characterData = resJson.data;

                if (!characterData || characterData.length === 0) {
                    return Vreply(`*${MenuStyle} No character found with the name "${text}".*\nPlease check the spelling.\n\n${footer}`);
                }

                const char = characterData[0];
                
                const aboutText = char.about ? (char.about.length > 500 ? char.about.substring(0, 500) + '...' : char.about) : "No information available.";

                let caption = `*${MenuStyle} Name:* ${char.name}\n`;
                if (char.name_kanji) caption += `*${MenuStyle} Kanji:* ${char.name_kanji}\n`;
                if (char.nicknames && char.nicknames.length > 0) {
                    caption += `*${MenuStyle} Nicknames:* ${char.nicknames.join(", ")}\n`;
                }
                caption += `\n*${MenuStyle} About:*\n${aboutText}\n\n` +
                           `*${MenuStyle} Favorites:* ${char.favorites.toLocaleString()} users\n`+
                           `*${MenuStyle} More Info:* ${char.url}\n\n` +
                           `${footer}`;

                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: char.images.jpg.image_url },
                    caption: caption
                }, { quoted: m });
                
                await HeavstalTech.sendMessage(m.chat, {react: {text: "🥷", key: m.key}});

            } catch (e) {
                console.error("Character command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: The Anime API is currently unavailable._`);
            }
        }
    },
    {
        name: 'animerec',
        aliases: ['recommend'],
        category: 'anime',
        description: 'Recommends anime globally, or based on a title provided.',
        usage: '%prefix%animerec [title]',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, mess, MenuStyle, footer } = context;
            try {
               Vreply(mess.wait);
                let apiUrl = "https://api.jikan.moe/v4/recommendations/anime";
                let headerText = `*${MenuStyle} GENERAL ANIME RECOMMENDATIONS ${MenuStyle}*\n\n`;
                let isSpecificSearch = false;

                if (text) {
                    const searchResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`);
                    const searchJson = await searchResponse.json();
                    const searchData = searchJson.data;

                    if (searchData && searchData.length > 0) {
                        const animeId = searchData[0].mal_id;
                        const animeTitle = searchData[0].title;
                        apiUrl = `https://api.jikan.moe/v4/anime/${animeId}/recommendations`;
                        headerText = `*${MenuStyle} BECAUSE YOU LIKE ${animeTitle.toUpperCase()} ${MenuStyle}*\n\n`;
                        isSpecificSearch = true;
                    }
                }

                const recResponse = await fetch(apiUrl);
                const recJson = await recResponse.json();
                const recommendations = recJson.data;
                const limit = 5;

                if (!recommendations || recommendations.length === 0) {
                    return Vreply(`*${MenuStyle} No recommendations found.${isSpecificSearch ? ` for "${text}"` : "" }*\n\n${footer}`);
                }

                let replyText = headerText;

                recommendations.slice(0, limit).forEach((rec, index) => {
                    const entry = isSpecificSearch ? rec.entry : rec.entry[0];
                    replyText += `*${index + 1}.* ${entry.title}\n`;
                    if (isSpecificSearch) {
                        replyText += `   *Votes:* ${rec.votes}\n\n`;
                    } else {
                        replyText += `   *Info:* ${entry.url}\n\n`;
                    }
                });

                replyText += `${footer}`;

                await HeavstalTech.sendMessage(m.chat, {react: {text: "🎯", key: m.key}});
                return Vreply(replyText);

            } catch (e) {
                console.error("Anime Recommendation command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: The Anime API is currently unavailable._`);
            }
        }
    },
    {
        name: 'paptt',
        aliases: [],
        category: 'nsfw',
        description: 'Sends random adult video/image snippets.',
        usage: '%prefix%paptt',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess } = context;
            if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
            
            const papttList = [
                "https://telegra.ph/file/5c62d66881100db561c9f.mp4",
                "https://telegra.ph/file/a5730f376956d82f9689c.jpg",
                "https://telegra.ph/file/8fb304f891b9827fa88a5.jpg",
                "https://telegra.ph/file/0c8d173a9cb44fe54f3d3.mp4",
                "https://telegra.ph/file/b58a5b8177521565c503b.mp4",
                "https://telegra.ph/file/34d9348cd0b420eca47e5.jpg",
                "https://telegra.ph/file/73c0fecd276c19560133e.jpg",
                "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
                "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
                "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
                "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
                "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
                "https://telegra.ph/file/267744a1a8c897b1636b9.jpg"
            ];
            let url = papttList[Math.floor(Math.random() * papttList.length)];
            HeavstalTech.sendFile(m.chat, url, null, 'Aww..umm💦, am so horny come ride my pu**y anyhow u want🤤🍑🍆', m);
        }
    },
    {
        name: 'coffee',
        aliases: [],
        category: 'fun',
        description: 'Sends a random aesthetic picture of a coffee cup.',
        usage: '%prefix%coffee',
        execute: async (HeavstalTech, m, context) => {
            const { mess } = context;
            HeavstalTech.sendMessage(m.chat, { caption: mess.success, image: { url: 'https://coffee.alexflipnote.dev/random' } }, { quoted: m });
        }
    },
    {
        name: 'checkme',
        aliases: [],
        category: 'fun',
        description: 'Generates a fake personality check profile for you.',
        usage: '%prefix%checkme',
        execute: async (HeavstalTech, m, context) => {
            const { sender } = context;
            const bet = `${sender}`;
            const sifat = ['🤔 Fine','😡 Unfriendly','👎 Chapri','💔 Nibba/nibbi','😤 Annoying','💀 Dilapidated','😡 Angry person','😊 Polite','🙄 Burden','💯 Great','🤮 Cringe','🤥 Liar'];
            const hoby = ['🍳 Cooking','💃 Dancing','🎮 Playing','🎮 Gaming','🎨 Painting','🤝 Helping Others','🍿 Watching anime','📚 Reading','🚴‍♂️ Riding Bike','🎤 Singing','💬 Chatting','😂 Sharing Memes','✍️ Drawing','💸 Eating Parents Money','🎲 Playing Truth or Dare','🤫 Staying Alone'];
            const bukcin = Array.from({ length: 100 }, (_, i) => String(i + 1));
            const arp = bukcin.slice();
            const cakep = ['✅ Yes','❌ No','😖 Very Ugly','😍 Very Handsome'];
            const wetak = ['💖 Caring','💎 Generous','😡 Angry person','😔 Sorry','🤲 Submissive','😊 Fine','🙇‍♂️ Im sorry','🧡 Kind Hearted','😌 Patient','🥰 UwU','🔥 Top','🤗 Helpful'];
            const sipat = sifat[Math.floor(Math.random() * sifat.length)];
            const biho = hoby[Math.floor(Math.random() * hoby.length)];
            const bhucin = bukcin[Math.floor(Math.random() * bukcin.length)];
            const senga = arp[Math.floor(Math.random() * arp.length)];
            const chakep = cakep[Math.floor(Math.random() * cakep.length)];
            const watak = wetak[Math.floor(Math.random() * wetak.length)];
            const baik = bukcin[Math.floor(Math.random() * bukcin.length)];
            const burug = bukcin[Math.floor(Math.random() * bukcin.length)];
            const cerdas = bukcin[Math.floor(Math.random() * bukcin.length)];
            const berani = bukcin[Math.floor(Math.random() * bukcin.length)];
            const takut = bukcin[Math.floor(Math.random() * bukcin.length)];

            const profile = `*≡══《 Check @${bet.split('@')[0]} 》══≡*\n*🤖 Bot Name: ${global.botname}*\n*🧑‍🤝‍🧑 𝗡𝗮𝗺𝗲:* ${m.pushName}\n*⚡ 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝗶𝘀𝘁𝗶𝗰:* ${sipat}\n*🎨 𝗛𝗼𝗯𝗯𝘆:* ${biho}\n*💖 𝗦𝗶𝗺𝗽𝗹𝗲𝗻𝗲𝘀𝘀 (Simp):* ${bhucin}%\n*💥 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀:* ${senga}%\n*🌟 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲:* ${chakep}\n*💬 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿:* ${watak}\n*🌱 𝗚𝗼𝗼𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${baik}%\n*😈 𝗕𝗮𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${burug}%\n*🧠 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲:* ${cerdas}%\n*🔥 𝗖𝗼𝘂𝗿𝗮𝗴𝗲:* ${berani}%\n*😱 𝗔𝗳𝗿𝗮𝗶𝗱:* ${takut}%\n\n*≡═《𝗖𝗵𝗲𝗰𝗸 𝗽𝗿𝗼𝗽𝗲𝗿𝘁𝗶𝗲𝘀》═≡*`;
            
            await HeavstalTech.sendMessage(m.chat, {
                image: { url: 'https://files.catbox.moe/tpm9o7.jpg' }, 
                caption: profile, 
                mentions: [bet] 
            });
        }
    },
    {
        name: 'prohecy',
        aliases: ['fortune'],
        category: 'fun',
        description: 'Tells a cryptic fortune.',
        usage: '%prefix%prohecy',
        execute: async (HeavstalTech, m, context) => {
            const { from } = context;
            const prophecies = [
                "🔥 You will rise as a leader... only to be betrayed by those closest to you.",
                "🌑 Darkness follows you. Within 7 days, misfortune will strike.",
                "⚡ A great victory awaits you—but beware, it comes at a cost.",
                "💀 Someone in this group will turn against you soon.",
                "🔮 Your fate is intertwined with chaos itself. Nothing is certain.",
                "👑 You will be crowned victorious. But the price? Isolation.",
                "⚠️ Beware of your next decision—it holds the key to your downfall.",
                "💡 You will unlock forbidden knowledge, but it may change you forever.",
                "🌪️ A storm is coming—whether it is physical or emotional is unknown.",
                "🌀 The universe has chosen you for something greater. Are you ready?",
                "🚀 Something big will happen in your life soon—but will it be good or bad?",
                "💀 You are being watched. By whom? That remains a mystery.",
                "🔥 The next person to message will alter your fate in ways you don’t expect.",
                "🎭 Someone in this group is not who they claim to be.",
                "⚡ A revelation will shake your reality. You must decide how to handle it.",
                "🕰️ In time, all secrets come to light. Be careful what you hide.",
                "☠️ You will lose something important. It may be an object… or a person.",
                "🩸 You have a hidden enemy. Soon, they will reveal themselves.",
                "👀 Someone in this group thinks about you more than you realize.",
                "🌓 A choice is coming. The path you take will determine your destiny.",
                "🔥 You will hear unexpected news in the next 48 hours—be ready.",
                "🚷 Do not send your next message. It may lead to consequences.",
                "🎭 The truth has been hidden from you. Soon, you will uncover it.",
                "🛑 Your journey will soon take an unexpected turn. Brace yourself.",
                "🌑 You have crossed paths with fate. Now, there is no turning back.",
                "⚠️ Beware of an offer coming your way. It may not be what it seems.",
                "🔥 You are closer to achieving greatness than you realize.",
                "🕵️ Someone is keeping a secret from you. Will you uncover it?",
                "💀 Today, luck is against you. Be cautious in your actions.",
                "💔 A betrayal is coming. From friend or foe, time will tell.",
                "🌊 Your emotions are stronger than you know. They will shape your next move.",
                "🔑 The key to your success lies where you least expect it.",
                "⚡ You will gain something valuable soon. Will you use it wisely?",
                "🌟 A moment of glory awaits you—but beware the consequences.",
                "🌑 You have attracted the attention of forces beyond your control.",
                "🛡️ Someone is protecting you, even though you cannot see them.",
                "💬 A conversation soon will change your perspective entirely.",
                "🔥 You will receive something unexpected—how you react will define you.",
                "📜 You will hear words today that will echo for years to come.",
                "☠️ Someone will challenge you. Are you prepared for the fight?",
                "🚪 A door will open soon—but stepping through it may change everything.",
                "💭 You dream of something often… it may manifest in reality.",
                "⚖️ A decision approaches. It will weigh heavily on your future.",
                "🐍 Be wary of deception. Someone is not telling the full truth.",
                "🌀 You are at a crossroads. Your next move will determine your fate.",
                "⚡ Power is within your grasp. But can you handle it?",
                "🕰️ Time moves differently for you today. Pay close attention.",
                "🕊️ You will find peace soon—but it may not come the way you expect.",
                "🔥 A fire will burn within you, igniting your next ambition.",
                "🔄 An event from your past will resurface. Will you face it?",
                "💎 Something priceless will soon be within reach.",
                "⚠️ Someone is watching your actions. Choose wisely.",
                "🌑 A familiar face will return, but they will not be as they once were.",
                "🔮 The future shifts with every choice. What will you decide?",
                "🎭 A masked truth will be revealed in the coming days.",
                "💔 Someone is holding onto something they need to let go of.",
                "🚀 Your next move will define your legacy.",
                "📖 A story is being written about you. What role will you play?",
                "🔪 You must cut ties with something before it consumes you.",
                "☀️ A new light will shine on your path.",
                "🌀 Chaos is brewing—but you may thrive within it.",
                "🛑 You will be forced to stop and rethink everything.",
                "🔁 A cycle you thought was finished will begin again.",
                "🎯 Fate will test your patience soon.",
                "💭 You will learn something today that shakes you to the core.",
                "🦉 Wisdom comes from experience. You are about to gain some.",
                "🔑 A puzzle you’ve struggled with will finally make sense.",
                "🌪️ A whirlwind of events approaches—brace yourself.",
                "🔥 Someone will challenge your beliefs. How will you respond?",
                "⚡ A spark of genius is coming—don't ignore it.",
                "🕊️ A moment of tranquility is approaching—enjoy it while it lasts.",
                "🎭 The truth is closer than you think. Look carefully.",
                "💀 A shift in the balance will occur soon—who will come out stronger?",
                "☠️ Something in your life is ending—but with every end comes a new beginning."
            ];

            const NanoProphecy = prophecies[Math.floor(Math.random() * prophecies.length)];
            
            try {
                // To avoid needing getBuffer inside LordPromise.js scope later
                await HeavstalTech.sendMessage(from, { 
                    image: { url: `https://files.catbox.moe/g3b32g.jpg` }, 
                    caption: `_Your Prophecy:_\n${NanoProphecy}` 
                }, { quoted: m });
            } catch (e) {
                console.error(e);
            }
        }
    },
    {
        name: 'breakupl',
        aliases: ['breakupline'],
        category: 'fun',
        description: 'Sends a random breakup line.',
        usage: '%prefix%breakupl',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess, MenuStyle, footer } = context;
            try {             
                Vreply(mess.wait);
                const response = await fetch("https://api.jcwyt.com/breakup");
                const breakupLine = await response.text();
                if (!breakupLine) {
                    return Vreply(`*${MenuStyle} Couldn't think of a breakup line right now. Maybe you should stay together?*\n\n${footer}`);
                }
                const replyText = `\`\`\`${MenuStyle} BREAKUP LINE ${MenuStyle}\`\`\`\n_${breakupLine}_\n\n${footer}`;
                
                await HeavstalTech.sendMessage(m.chat, {react: {text: "💔", key: m.key}});
                return Vreply(replyText);
            } catch (e) {
                console.error("Breakup Line command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: The breakup line API seems to be heartbroken and is not responding._`);
            }
        }
    },
    {
        name: 'insult',
        aliases: ['roast'],
        category: 'fun',
        description: 'Generates an insult aimed at a user.',
        usage: '%prefix%insult <@user>',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess, MenuStyle, footer } = context;
            try {       
                const target = m.quoted?.sender || m.mentionedJid?.[0] || null;

                if (!target) {
                    return Vreply(`*${MenuStyle} Who should I roast?*\nPlease reply to a user or mention them.\n\n${footer}`);
                }
                Vreply(mess.wait);
                const response = await fetch("https://insult.mattbas.org/api/insult.json?who=youuu");
                const data = await response.json();
                const insult = data.insult;

                if (!insult) {
                    return Vreply(`*${MenuStyle} I'm out of insults right now. Lucky them.*\n\n${footer}`);
                }
                const mentionTag = `@${target.split("@")[0]}`;
                const finalMessage = insult.replace("youuu", mentionTag);
                await HeavstalTech.sendMessage(m.chat, {
                    text: finalMessage,
                    mentions: [target]
                }, { quoted: m });

                await HeavstalTech.sendMessage(m.chat, {react: {text: "😈", key: m.key}});

            } catch (e) {
                console.error("Insult command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: The insult API seems too offended to respond._`);
            }
        }
    },
    {
        name: 'hentai',
        aliases: [],
        category: 'nsfw',
        description: 'Sends a short anime hentai video snippet.',
        usage: '%prefix%hentai',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess } = context;
            
            if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
            Vreply(mess.wait);
            
            try {
                // Import the exact helper from Data3.js that uses cheerio
                const { hentai } = await import('#System/Data3.js');
                
                let sbe = await hentai();
                let cejd = sbe[Math.floor(Math.random() * sbe.length)]; 
                
                HeavstalTech.sendMessage(m.chat, { 
                    video: { url: cejd.video_1 }, 
                    caption: `⭔ Title : ${cejd.title}
⭔ Category : ${cejd.category}
⭔ Mimetype : ${cejd.type}
⭔ Views : ${cejd.views_count}
⭔ Shares : ${cejd.share_count}
⭔ Source : ${cejd.link}
⭔ Media Url : ${cejd.video_1}` 
                }, { quoted: m });
            } catch (e) {
                console.log(e);
                Vreply(String(e));
            }
        }
    },
    {
        name: 'xnxxsearch',
        aliases: [],
        category: 'nsfw',
        description: 'Searches adult sites for videos.',
        usage: '%prefix%xnxxsearch <query>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess, footer } = context;
            if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
            if (!text) return Vreply(`*Enter Query*\n\nExample ${prefix}xnxxsearch Stepmom`);
            
            Vreply(mess.wait);
            try {
                const { default: fg } = await import('api-dylux');
                let res = await fg.xnxxSearch(text);
                let ff = res.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n\n${footer}`).join('\n'); 
                if (res.status) return Vreply(ff);
            } catch (e) {
                Vreply("Search failed.");
            }
        }
    },
    {
        name: 'xnxxdl',
        aliases: [],
        category: 'nsfw',
        description: 'Downloads a video from adult sites.',
        usage: '%prefix%xnxxdl <link>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, MenuStyle, mess, footer } = context;
            if (!global.db.data.chats[m.chat]?.nsfw) return Vreply(mess.nsfw);
            if (!text) return Vreply(`Provide an xnxx link to download\n\n${footer}`);
            if (!text.includes('xnxx.com')) return Vreply(`Enter an xnxx link`);
            
            Vreply(mess.wait);
            try {
                const { default: fg } = await import('api-dylux');
                let xn = await fg.xnxxdl(text);
                HeavstalTech.sendMessage(m.chat, { 
                    caption: `${MenuStyle}  *XNXX DL*\n\n▢ *📌Title*: ${xn.result.title}\n▢ *⌚Duration* ${xn.result.duration}\n▢ *🎞️Quality:* ${xn.result.quality}`, 
                    video: { url: xn.result.files.high } 
                }, { quoted: m });
            } catch (e) {
                Vreply("Download failed.");
            }
        }
    },
    {
        name: 'naturewlp',
        aliases: [],
        category: 'fun',
        description: 'Retrieves nature wallpapers.',
        usage: '%prefix%naturewlp',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, mess, MenuStyle, footer } = context;
            try {
                Vreply(mess.wait);
                const query = text || 'nature';
                const response = await fetch(`https://api.kord.live/api/lumina/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                const wallpapers = data.wallpapers;

                if (!wallpapers || wallpapers.length === 0) return Vreply(`*${MenuStyle} No wallpapers found for "${query}".*\n\n${footer}`);

                const { proto, prepareWAMessageMedia, generateWAMessageFromContent } = await import('@heavstaltech/baileys');

                const cards = await Promise.all(wallpapers.slice(0, 5).map(async (wallpaper) => {
                    const stats = `❐ ${wallpaper.downloads} | ♥ ${wallpaper.likes} | 👁 ${wallpaper.views}`;
                    const details = `Res: ${wallpaper.resolution}`;
                    return {
                        body: proto.Message.InteractiveMessage.Body.fromObject({ text: details }),
                        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: wallpaper.tags.slice(0, 3).join(', ') }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            title: stats,
                            hasMediaAttachment: true,
                            ...(await prepareWAMessageMedia({ image: { url: wallpaper.thumbnail } }, { upload: HeavstalTech.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                            buttons: [{
                                name: 'cta_url',
                                buttonParamsJson: JSON.stringify({
                                    display_text: 'Download',
                                    url: wallpaper.image,
                                    merchant_url: wallpaper.image
                                })
                            }]
                        })
                    };
                }));

                const interactiveMessage = proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.fromObject({ text: `*Explore Stunning Wallpapers*\n${footer}` }),
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: `*${query.charAt(0).toUpperCase() + query.slice(1)} Wallpapers*`,
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
                });

                const msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { interactiveMessage } } }, { quoted: m });
                await HeavstalTech.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
                await HeavstalTech.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (error) {
                console.error(error);
                Vreply(`${mess.error.fitur}\n_Details: ${error.message}_`);
            }
        }
    }
];
