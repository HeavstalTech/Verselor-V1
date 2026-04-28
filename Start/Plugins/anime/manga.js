// Start/Plugins/anime/manga.js
export default [
    {
        name: 'komiku',
        aliases: ['manga', 'komik'],
        category: 'anime',
        description: 'Search manga from Komiku.',
        usage: '%prefix%komiku <search>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer, MenuStyle } = context;
            
            if (!text) return Vreply(`*INCORRECT USAGE*\n\nExample: ${prefix + command} One Piece`);
            await HeavstalTech.sendMessage(m.chat, { react: { text: '📚', key: m.key } });
            Vreply(mess.wait);

            try {
                const response = await fetch(`https://api.giftedtech.co.ke/api/anime/komiku?apikey=gifted&query=${encodeURIComponent(text)}&type=manga`);
                const data = await response.json();

                if (!data.success || !data.result || data.result.length === 0) throw new Error('Not found');
                const mangas = data.result.slice(0, 2);

                for (const manga of mangas) {
                    let caption = `*${MenuStyle} KOMIKU MANGA SEARCH ${MenuStyle}*\n\n` +
                                  `┃━ *Title:* ${manga.title}\n` +
                                  `┃━ *Genre:* ${manga.genre}\n\n` +
                                  `📝 *Description:*\n${manga.description}\n\n` +
                                  `🔗 *Link:* ${manga.url}\n\n${footer}`;

                    await HeavstalTech.sendMessage(m.chat, { image: { url: manga.img }, caption }, { quoted: m });
                }
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } catch (error) {
                console.error("Komiku Error:", error);
                Vreply(`${mess.error.fitur}\n_Details: Manga not found or API is down._`);
            }
        }
    },
    {
        name: 'kusonime',
        aliases: ['kuso'],
        category: 'anime',
        description: 'Search or get the latest Kusonime anime.',
        usage: '%prefix%kusonime [search]',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, mess, footer, MenuStyle } = context;
            await HeavstalTech.sendMessage(m.chat, { react: { text: '📺', key: m.key } });
            Vreply(mess.wait);

            try {
                let apiUrl = `https://api.giftedtech.co.ke/api/anime/kusonime-info?apikey=gifted`;
                if (text) {
                    apiUrl = `https://api.giftedtech.co.ke/api/anime/kusonime-search?apikey=gifted&query=${encodeURIComponent(text)}`;
                }

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (!data.success || !data.result || data.result.length === 0) throw new Error('Not found');

                const animes = data.result.slice(0, 2);

                for (const anime of animes) {
                    let caption = `*${MenuStyle} KUSONIME ${text ? 'SEARCH' : 'LATEST'} ${MenuStyle}*\n\n` +
                                  `┃━ *Title:* ${anime.title}\n` +
                                  `┃━ *Genres:* ${anime.genres.join(', ')}\n` +
                                  `┃━ *Release:* ${anime.releaseTime}\n\n` +
                                  `🔗 *Link:* ${anime.url}\n\n${footer}`;

                    await HeavstalTech.sendMessage(m.chat, { image: { url: anime.thumbnail }, caption }, { quoted: m });
                }
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } catch (error) {
                console.error("Kusonime Error:", error);
                Vreply(`${mess.error.fitur}\n_Details: Anime info not found._`);
            }
        }
    },
    {
        name: 'animequote',
        aliases: ['quoteanime', 'aq'],
        category: 'anime',
        description: 'Sends a random anime quote.',
        usage: '%prefix%animequote',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, footer, MenuStyle } = context;
            try {
                const response = await fetch(`https://api.giftedtech.co.ke/api/anime/quotes?apikey=gifted`);
                const data = await response.json();

                if (!data.success || !data.result) throw new Error('API Error');

                const { character, show, quote } = data.result;
                const text = `*${MenuStyle} ANIME QUOTE ${MenuStyle}*\n\n_"${quote}"_\n\n— *${character}*\n( Anime: _${show}_ )\n\n${footer}`;

                await Vreply(text);
            } catch (error) {
                console.error("AnimeQuote Error:", error);
                Vreply("❌ Failed to fetch quote.");
            }
        }
    }
];