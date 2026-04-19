import { getBuffer } from '#System/Data1.js';

export default [
    {
        name: 'qc',
        aliases: [],
        category: 'fun',
        description: 'Generates a quote bubble sticker mimicking your profile.',
        usage: '%prefix%qc <text>',
        execute: async (HeavstalTech, m, context) => {
            const { q, Vreply, prefix, command, pushname, mess } = context;
            
            if (!q) return Vreply(`Send command with text. ${prefix + command} Heavstal Tech`);
            
            try {
                const pp = await HeavstalTech.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
                const obj = {
                    type: 'quote',
                    format: 'png',
                    backgroundColor: '#ffffff',
                    width: 512,
                    height: 768,
                    scale: 2,
                    messages: [{
                        entities: [],
                        avatar: true,
                        from: {
                            id: 1,
                            name: pushname,
                            photo: { url: pp }
                        },
                        text: q,
                        replyMessage: {}
                    }]
                };

                const response = await fetch('https://bot.lyo.su/quote/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                });
                const data = await response.json();
                const buffer = Buffer.from(data.result.image, 'base64');
                
                await HeavstalTech.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author });
            } catch (e) {
                console.error(e);
                Vreply(mess.error.fitur);
            }
        }
    },
    {
        name: 'animereaction',
        aliases: [
            'cry', 'kill', 'hug', 'pat', 'lick', 'kiss', 'bite', 'yeet', 'bully', 
            'bonk', 'wink', 'poke', 'nom', 'slap', 'smile', 'wave', 'awoo', 'blush', 
            'smug', 'glomp', 'happy', 'dance', 'cringe', 'cuddle', 'highfive', 
            'shinobu', 'handhold'
        ],
        category: 'fun',
        description: 'Sends an animated anime reaction GIF.',
        usage: '%prefix%<reaction>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { command, Vreply, from } = context;
            
            try {
                const response = await fetch(`https://api.waifu.pics/sfw/${command}`);
                const { url } = await response.json();
                await HeavstalTech.sendVideoAsSticker(from, url, m, { packname: global.packname, author: global.author });
            } catch {
                Vreply('Error!');
            }
        }
    },
    {
        name: 'animal',
        aliases: ['fox', 'koala', 'bird', 'panda', 'dog', 'cat'],
        category: 'fun',
        description: 'Sends a random image of the specified animal.',
        usage: '%prefix%<animal>',
        execute: async (HeavstalTech, m, context) => {
            const { command, Vreply } = context;
            
            try {
                let api, key, emoji;
                
                if (command === "dog") {
                    api = "https://dog.ceo/api/breeds/image/random";
                    key = "message";
                    emoji = "🐶";
                } else if (command === "cat") {
                    api = "https://api.thecatapi.com/v1/images/search";
                    key = "url";
                    emoji = "🐱";
                } else {
                    switch (command) {
                        case "fox":
                            api = "https://randomfox.ca/floof/";
                            key = "image";
                            emoji = "🦊";
                            break;
                        case "koala":
                            api = "https://some-random-api.com/img/koala";
                            key = "link";
                            emoji = "🐨";
                            break;
                        case "bird":
                            api = "https://some-random-api.com/img/birb";
                            key = "link";
                            emoji = "🐦";
                            break;
                        case "panda":
                            api = "https://some-random-api.com/img/panda";
                            key = "link";
                            emoji = "🐼";
                            break;
                    }
                }

                const response = await fetch(api);
                const data = await response.json();
                
                // TheCatAPI returns an array, Dog API returns an object
                const img = command === "cat" ? data[0][key] : data[key];

                if (!img) return Vreply(`❌ Failed to fetch ${command} image.`);

                await HeavstalTech.sendMessage(m.chat, { 
                    image: { url: img }, 
                    caption: `*${emoji} Random ${command.charAt(0).toUpperCase() + command.slice(1)}!*` 
                }, { quoted: m });
            } catch (e) {
                console.error(`${command.toUpperCase()} ERROR:`, e);
                Vreply(`❌ An error occurred.`);
            }
        }
    },
    {
        name: 'quotesandjokes',
        aliases: [
            'quotememe', 'prog', 'dev-joke', 'dadjoke', 'dad-joke', 
            'progquote', 'dev-quote', 'ascii', 'advice', 'dictionary', 
            'moviequote', 'movie-quote', 'triviafact', 'trivia-fact', 
            'inspire', 'compliment', 'mathfact', 'sciencefact', 
            'science-fact', 'gamefact', 'game-fact'
        ],
        category: 'fun',
        description: 'Sends a random quote, joke, or fact.',
        usage: '%prefix%<command>',
        execute: async (HeavstalTech, m, context) => {
            const { command, text, Vreply, prefix } = context;
            
            try {
                let api, options = {}, isJson = true;
                let resultText = "";
                
                switch (command) {
                    case "quotememe":
                        api = "https://api.quotable.io/random";
                        break;
                    case "prog":
                    case "dev-joke":
                        api = "https://v2.jokeapi.dev/joke/Programming?type=single";
                        break;
                    case "dadjoke":
                    case "dad-joke":
                        api = "https://icanhazdadjoke.com/";
                        options = { headers: { 'Accept': 'application/json' } };
                        break;
                    case "progquote":
                    case "dev-quote":
                        api = "https://programming-quotes-api.herokuapp.com/quotes/random";
                        break;
                    case "ascii":
                        if (!text) return Vreply(`❌ Provide text. Example: ${prefix + command} Heavstal`);
                        api = `https://artii.herokuapp.com/make?text=${encodeURIComponent(text)}`;
                        isJson = false;
                        break;
                    case "advice":
                        api = "https://api.adviceslip.com/advice";
                        break;
                    case "moviequote":
                    case "movie-quote":
                        api = "https://movie-quote-api.herokuapp.com/v1/quote/";
                        break;
                    case "triviafact":
                    case "trivia-fact":
                    case "sciencefact":
                    case "science-fact":
                        api = "https://uselessfacts.jsph.pl/random.json?language=en";
                        break;
                    case "inspire":
                        api = "https://type.fit/api/quotes";
                        break;
                    case "compliment":
                        api = "https://complimentr.com/api";
                        break;
                    case "mathfact":
                        api = "http://numbersapi.com/random/math?json";
                        break;
                    case "gamefact":
                    case "game-fact":
                        api = "https://www.freetogame.com/api/games";
                        break;
                    case "dictionary":
                        if (!text) return Vreply(`❌ Provide a word to search. Example: ${prefix + command} Technology`);
                        api = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`;
                        break;
                }

                const response = await fetch(api, options);
                const data = isJson ? await response.json() : await response.text();

                if (command === "quotememe") resultText = `🖋️ "${data.content}"\n— ${data.author}`;
                else if (command === "prog" || command === "dev-joke") resultText = `💻 *Programming Joke:* ${data.joke}`;
                else if (command === "dadjoke" || command === "dad-joke") resultText = `🧔 *Dad Joke:* ${data.joke}`;
                else if (command === "progquote" || command === "dev-quote") resultText = `👨‍💻 "${data.en}"\n— ${data.author}`;
                else if (command === "ascii") resultText = `🎨 *ASCII Art:*\n\n\`\`\`${data}\`\`\``;
                else if (command === "advice") resultText = `💡 *Advice:* ${data.slip.advice}`;
                else if (command === "moviequote" || command === "movie-quote") resultText = `🎬 "${data.quote}"\n— ${data.show || "Unknown"}`;
                else if (command === "triviafact" || command === "trivia-fact" || command === "sciencefact" || command === "science-fact") resultText = `🧠 *Fact:* ${data.text}`;
                else if (command === "inspire") {
                    const q = data[Math.floor(Math.random() * data.length)];
                    resultText = `🌟 "${q.text}"\n— ${q.author?.split(',')[0] || "Unknown"}`;
                } 
                else if (command === "compliment") resultText = `💖 ${data.compliment}`;
                else if (command === "mathfact") resultText = `🔢 *Math Fact:*\n${data.text}`;
                else if (command === "gamefact" || command === "game-fact") {
                    const game = data[Math.floor(Math.random() * data.length)];
                    resultText = `*Game:* ${game.title}\nGenre: ${game.genre}\n*Platform:* ${game.platform}\n*More Info:* ${game.game_url}`;
                }
                else if (command === "dictionary") {
                    if (!data.list?.length) return Vreply("❌ No definition found.");
                    const top = data.list[0];
                    resultText = `📖 *Word:* ${top.word}\n\n*Definition:* ${top.definition}\n\n*Example:* ${top.example}`;
                }

                await HeavstalTech.sendMessage(m.chat, { text: resultText }, { quoted: m });
            } catch (e) {
                console.error(`${command.toUpperCase()} ERROR:`, e);
                Vreply(`❌ Failed to fetch ${command}.`);
            }
        }
    },
    {
        name: 'when',
        aliases: [],
        category: 'fun',
        description: 'Answers silly randomized questions.',
        usage: '%prefix%when <question>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} will I get married?`);

            let List = [
                '5 More Days ⏳', '10 More Days ⏳', '15 More Days ⏳', '20 More Days ⏳', '25 More Days ⏳', '30 More Days ⏳',
                '35 More Days ⏳', '40 More Days ⏳', '45 More Days ⏳', '50 More Days ⏳', '55 More Days ⏳', '60 More Days ⏳',
                '65 More Days ⏳', '70 More Days ⏳', '75 More Days ⏳', '80 More Days ⏳', '85 More Days ⏳', '90 More Days ⏳',
                '100 More Days ⏳', '5 Months More 🗓️', '10 Months More 🗓️', '15 Months More 🗓️', '20 Months More 🗓️',
                '25 Months More 🗓️', '30 Months More 🗓️', '35 Months More 🗓️', '40 Months More 🗓️', '45 Months More 🗓️',
                '50 Months More 🗓️', '55 Months More 🗓️', '60 Months More 🗓️', '65 Months More 🗓️', '70 Months More 🗓️',
                '75 Months More 🗓️', '80 Months More 🗓️', '85 Months More 🗓️', '90 Months More 🗓️', '100 Months More 🗓️',
                '1 More Year 📅', '2 More Years 📅', '3 More Years 📅', '4 More Years 📅', '5 More Years 📅',
                'Tomorrow ⏰', 'The Day After Tomorrow ⏰', 'As The Case May be - NEVER'
            ];

            let when = List[Math.floor(Math.random() * List.length)];
            let finalreply = `*❓Question:* _When ${text}_\n*📨Answer:* _In ${when}_`;

            try {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: 'https://files.catbox.moe/g8pxls.png' },
                    caption: finalreply,
                    mentions: [m.sender]
                });
            } catch (error) {
                Vreply('❗ Failed to send image.');
            }
        }
    },
    {
        name: 'what',
        aliases: [],
        category: 'fun',
        description: 'Answers silly randomized questions.',
        usage: '%prefix%what <question>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} is your name?`);

            let answers = [
                '👩‍❤️‍👨 Ask Your GF',
                '🤷‍♂️ I Don’t Know',
                '👨‍👩‍👧 I Don’t Know, Ask Your Father'
            ];

            let RandomAnswer = answers[Math.floor(Math.random() * answers.length)];
            let jawab = `_❓What ${text}_\n_📨 Answer: ${RandomAnswer}_`;

            try {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: 'https://files.catbox.moe/g8pxls.png' },
                    caption: jawab,
                    mentions: [m.sender]
                });
            } catch (error) {
                Vreply('❗ Failed to send image.');
            }
        }
    },
    {
        name: 'where',
        aliases: [],
        category: 'fun',
        description: 'Answers silly randomized questions.',
        usage: '%prefix%where <question>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} is your ex?`);

            let places = [
                '🏞️ In the mountain', '🌕 On Mars', '🌙 On the moon', 
                '🌳 In the jungle', '👩‍👧 I don’t know, ask your mom', 
                '🤷‍♂️ It could be somewhere', '⚖️ In jail'
            ];

            let kah = places[Math.floor(Math.random() * places.length)];
            let jawab = `_❓Where ${text}_\n_📨 Answer: ${kah}_`;

            try {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: 'https://files.catbox.moe/g8pxls.png' },
                    caption: jawab,
                    mentions: [m.sender]
                });
            } catch (error) {
                Vreply('❗ Failed to send image.');
            }
        }
    },
    {
        name: 'how',
        aliases: [],
        category: 'fun',
        description: 'Answers silly randomized questions.',
        usage: '%prefix%how <question>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`❓ Ask a question\n\nExample: ${prefix + command} to date a girl?`);

            let gimana = [
                '🤔 Ummm...', '😅 It’s Difficult Bro', '🚫 Sorry, the bot can’t answer', 
                '🔍 Try searching on Google', '😱 Holy cow! Really?', '😴 I’m too dizzy to answer', 
                '🙁 Oh, I see :(', '⏳ Be patient, boss', '🙄 Really, dude?'
            ];

            let kah = gimana[Math.floor(Math.random() * gimana.length)];
            let jawab = `_❓How ${text}_\n_📨 Answer: ${kah}_`;

            try {
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: 'https://files.catbox.moe/g8pxls.png' },
                    caption: jawab,
                    mentions: [m.sender]
                });
            } catch (error) {
                Vreply('❗ Failed to send image.');
            }
        }
    },
    {
        name: 'rate',
        aliases: [],
        category: 'fun',
        description: 'Rates something out of 100%.',
        usage: '%prefix%rate <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`Example : ${prefix + command} my profile`);
            
            let ra = Array.from({ length: 100 }, (_, i) => String(i + 1));
            let kah = ra[Math.floor(Math.random() * ra.length)];
            let jawab = `_🕊️ Rate *${text}*\n_📨 Answer : ${kah}%_`;
            
            await Vreply(jawab);
        }
    },
    {
        name: 'soulmate',
        aliases: [],
        category: 'fun',
        description: 'Matches you with a random soulmate in the group.',
        usage: '%prefix%soulmate',
        groupOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { participants, Vreply } = context;
            let member = participants.map(u => u.id);
            let jodoh = member[Math.floor(Math.random() * member.length)];
            
            HeavstalTech.sendMessage(m.chat, { 
                text: `👫 Your Soulmate Is @${jodoh.split('@')[0]}`,
                mentions: [jodoh]
            }, { quoted: m });        
        }
    },
    {
        name: 'couple',
        aliases: [],
        category: 'fun',
        description: 'Ships two random members in the group.',
        usage: '%prefix%couple',
        groupOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { participants, Vreply } = context;
            let member = participants.map(u => u.id);
            let orang = member[Math.floor(Math.random() * member.length)];
            let jodoh = member[Math.floor(Math.random() * member.length)];
            
            HeavstalTech.sendMessage(m.chat, { 
                text: `*Successfully Found 2 compatible couples*\n @${orang.split('@')[0]} & @${jodoh.split('@')[0]} ❤️🥹❤️🌹`,
                mentions: [orang, jodoh]
            }, { quoted: m });        
        }
    },
    {
        name: 'remind',
        aliases: ['reminder'],
        category: 'tools',
        description: 'Sets a reminder.',
        usage: '%prefix%remind <seconds> <message>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`Usage: remind <seconds> <message>. Example: ${prefix}remind 60 Take a break`);
            
            const [sec, ...msgArr] = text.split(" ");
            const msgText = msgArr.join(" ");
            const delay = parseInt(sec) * 1000;
            
            if (isNaN(delay) || !msgText) return Vreply(" Invalid usage.");
            
            await Vreply(`⏰ Reminder set for ${sec} seconds.`);
            setTimeout(() => {
                HeavstalTech.sendMessage(m.chat, { text: `⏰ Reminder: ${msgText}` });
            }, delay);
        }
    },
    {
        name: 'currency',
        aliases: [],
        category: 'tools',
        description: 'Converts currency values.',
        usage: '%prefix%currency <amount> <from> <to>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`Usage: currency <amount> <from> <to>\nExample: ${prefix}currency 100 USD NGN`);
            
            const [amount, from, to] = text.split(" ");
            if (!amount || !from || !to) return Vreply(" Missing arguments!");

            try {
                const response = await fetch(`https://api.exchangerate.host/convert?from=${from.toUpperCase()}&to=${to.toUpperCase()}&amount=${amount}`);
                const data = await response.json();
                await HeavstalTech.sendMessage(m.chat, { text: `💱 ${amount} ${from.toUpperCase()} = ${data.result} ${to.toUpperCase()}` }, { quoted: m });
            } catch (e) {
                Vreply("Failed to convert currency.");
            }
        }
    }
];