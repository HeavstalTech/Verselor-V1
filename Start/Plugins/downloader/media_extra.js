import fgPkg from 'api-dylux';
const fg = fgPkg
import { getBuffer, extractUrlsFromString } from '#System/Data1.js';
import { ytSearch, ytMp4, ytMp3 } from '#System/Data3.js';

const ApiMsg = `*NO API KEY DETECTED*\n\nThe command requires an *Heavstal Tech* Api Key to run and it seems yours isn't set yet.\n\n> If you don't have an api key, please follow the steps bellow to to get one.\n1. Visit "https://heavstal.com.ng/credentials"\n2. Sign In\n3. Click The "Generate Secret Key" button and copy the generated key\n4. Type %prefix%setapikey <Api Key>\n5. Re-run this command \n\nNote: If you receive this message again after seting the api key, type *"%prefix%restart"*`;

export default [
    {
        name: 'playdoc',
        aliases: ['musicdoc'],
        category: 'downloader',
        description: 'Downloads a song as a document.',
        usage: '%prefix%playdoc <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, MenuStyle, footer, mess } = context;
            try {        
                if (!text) {
                    return Vreply(`*${MenuStyle} Please provide a song title to search for.*\n_Example: ${prefix}playdoc Unstoppable Sia_\n\n${footer}`);
                }

                await Vreply(mess.wait);
                const videoResult = await ytSearch(text);
                if (!videoResult) {
                    return Vreply(`*${MenuStyle} No audio results found for "${text}".*\n\n${footer}`);
                }

                const audioData = await ytMp3(videoResult.url);
                if (!audioData || !audioData.result) {
                    return Vreply(`*${MenuStyle} Could not process the audio for download.*\nPlease try a different song.\n\n${footer}`);
                }

                const audioBuffer = await getBuffer(audioData.result);
                const adReplyCaption = `00:00 ───○─────── ${videoResult.duration.timestamp}`;

                await HeavstalTech.sendMessage(m.chat, {
                    document: audioBuffer,
                    mimetype: 'audio/mpeg',
                    fileName: `${videoResult.title}.mp3`,
                    caption: `*${MenuStyle} Now Playing:* ${videoResult.title}\n\n${footer}`,
                    contextInfo: {
                        externalAdReply: {
                            title: videoResult.title,
                            body: adReplyCaption,
                            mediaType: 2, 
                            renderLargerThumbnail: true,
                            thumbnailUrl: videoResult.thumbnail,
                            sourceUrl: videoResult.url
                        }
                    }
                }, { quoted: m });
            } catch (e) {
                console.error("Playdoc command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'ytvdoc',
        aliases: ['ytmp4doc'],
        category: 'downloader',
        description: 'Downloads a YouTube video as a document.',
        usage: '%prefix%ytvdoc <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, MenuStyle, footer, mess } = context;
            try {
                const source = text || m.quoted?.text;
                if (!source) {
                    return Vreply(`*${MenuStyle} Please provide a YouTube link or a video title.*\n_You can also reply to a message containing a link._\n\n${footer}`);
                }

                await Vreply(mess.wait);
                const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
                const urlsInText = extractUrlsFromString(source);
                let link = urlsInText.find(url => ytRegex.test(url));
                
                if (!link) {
                    const searchResult = await ytSearch(source);
                    if (searchResult) {
                        link = searchResult.url;
                    } else {
                        return Vreply(`*${MenuStyle} No results found for your query: "${source}".*\n\n${footer}`);
                    }
                }
                
                if (!link || !ytRegex.test(link)) {
                     return Vreply(`*${MenuStyle} Invalid input. Could not find a valid YouTube link or search result.*\n\n${footer}`);
                }

                const videoData = await ytMp4(link);
                if (!videoData || !videoData.result) {
                    return Vreply(`*${MenuStyle} Could not process the video for download.*\nPlease try a different video or link.\n\n${footer}`);
                }
                
                const videoBuffer = await getBuffer(videoData.result);
                const caption = `*${MenuStyle} Title:* ${videoData.title}\n\n${global.CAPTION}\n\n${footer}`;
                await HeavstalTech.sendMessage(m.chat, {
                    document: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `${videoData.title}.mp4`,
                    caption: caption
                }, { quoted: m });
            } catch (e) {
                console.error("YTVdoc command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'ytadoc',
        aliases: ['ytmp3doc'],
        category: 'downloader',
        description: 'Downloads YouTube audio as a document.',
        usage: '%prefix%ytadoc <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, MenuStyle, footer, mess } = context;
            try {
                const source = text || m.quoted?.text;
                if (!source) {
                    return Vreply(`*${MenuStyle} Please provide a YouTube link or a song title.*\n_You can also reply to a message containing a link._\n\n${footer}`);
                }

                await Vreply(mess.wait);
                const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
                const urlsInText = extractUrlsFromString(source);
                let link = urlsInText.find(url => ytRegex.test(url));
                
                if (!link) {
                    const searchResult = await ytSearch(source);
                    if (searchResult) {
                        link = searchResult.url;
                    } else {
                        return Vreply(`*${MenuStyle} No results found for your query: "${source}".*\n\n${footer}`);
                    }
                }
                
                if (!link || !ytRegex.test(link)) {
                     return Vreply(`*${MenuStyle} Invalid input. Could not find a valid YouTube link or search result.*\n\n${footer}`);
                }

                const audioData = await ytMp3(link);
                if (!audioData || !audioData.result) {
                    return Vreply(`*${MenuStyle} Could not process the audio for download.*\nPlease try a different song or link.\n\n${footer}`);
                }
                
                const audioBuffer = await getBuffer(audioData.result);
                const caption = `*${MenuStyle} Title:* ${audioData.title}\n\n${global.CAPTION}\n\n${footer}`;
                await HeavstalTech.sendMessage(m.chat, {
                    document: audioBuffer,
                    mimetype: 'audio/mpeg',
                    fileName: `${audioData.title}.mp3`,
                    caption: caption
                }, { quoted: m });
            } catch (e) {
                console.error("YTAdoc command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'ytmp3',
        aliases: ['ytaudio', 'ytplayaudio'],
        category: 'downloader',
        description: 'Downloads a YouTube link as MP3 audio.',
        usage: '%prefix%ytmp3 <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            if (!text) return Vreply(`📌 *Example:* ${prefix + command} <youtube_url>`);
            if (!text.includes('youtu')) return Vreply('❌ *The URL does not contain results from YouTube!*');
            
            try {
                const hasil = await ytMp3(text);
                Vreply(mess.wait);
                
                await HeavstalTech.sendMessage(m.chat, {
                    audio: { url: hasil.result },
                    mimetype: 'audio/mpeg',
                    contextInfo: {
                        externalAdReply: {
                            title: hasil.title,
                            body: hasil.channel,
                            previewType: 'PHOTO',
                            thumbnailUrl: hasil.thumb,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            sourceUrl: text
                        }
                    }
                }, { quoted: m });

                Vreply(`🎧 *Now Playing:* ${hasil.title}\n` +
                       `🎬 *Channel:* ${hasil.channel}\n` +
                       `📅 *Uploaded On:* ${hasil.uploadDate}\n` +
                       `💾 *Size:* ${hasil.size}\n\n` +
                       `${footer}`);
            } catch (err) {
                console.error('❌ Error downloading audio:', err);
                Vreply(`${mess.error.feature}\n_Details:_${err}`);
            }
        }
    },
    {
        name: 'tik-img',
        aliases: ['tt-img', 'ttimg'],
        category: 'downloader',
        description: 'Downloads a TikTok photo slideshow.',
        usage: '%prefix%tik-img <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, MenuStyle, footer, mess } = context;
            try {
                const source = text || m.quoted?.text;
                if (!source) {
                    return Vreply(`*${MenuStyle} Please provide a TikTok link to download images from.*\n_You can also reply to a message containing a link._\n\n${footer}`);
                }

                const ttRegex = /https:\/\/(?:www\.|vm\.|m\.|vt\.)?tiktok\.com\/.+/;
                const urlsInText = extractUrlsFromString(source);
                const link = urlsInText.find(url => ttRegex.test(url));

                if (!link) {
                    return Vreply(`*${MenuStyle} No valid TikTok URL found in the provided text.*\nPlease make sure it's a full TikTok link.\n\n${footer}`);
                }
                
                await Vreply(mess.wait);
                const apiUrl = `https://api.kord.live/api/tik-img?url=${encodeURIComponent(link)}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (!data || !data.downloadableImages || data.downloadableImages.length === 0) {
                    return Vreply(`*${MenuStyle} No images found at that link.*\nThis command is for TikTok photo slideshows, not videos.\n\n${footer}`);
                }

                await Vreply(`*${MenuStyle} Found ${data.downloadableImages.length} images. Sending them now...*`);
                for (const imageUrl of data.downloadableImages) {
                    try {
                        await HeavstalTech.sendMessage(m.chat, {
                            image: { url: imageUrl },
                            caption: `${global.CAPTION}\n\n${footer}`
                        }, { quoted: m });
                    } catch (imgError) {
                        console.error(`TikTok image download error: ${imgError.message}`);
                    }
                }
                
                return await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});

            } catch (e) {
                console.error("TikTok Image command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: Could not connect to the TikTok download service._`);
            }
        }
    },
    {
        name: 'ttmp3',
        aliases: ['tiktokmp3', 'ttaudio'],
        category: 'downloader',
        description: 'Downloads the audio track of a TikTok video.',
        usage: '%prefix%ttmp3 <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Please Provide a TikTok Link or Query*\n\nExample: ${prefix + command} https://vm.tiktok.com/xxxx`);
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));

                const response = await fetch('https://heavstal.com.ng/api/v1/tiktok', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ query: text.trim() })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data && res.data.audio) {
                    const { title, author, audio, cover } = res.data;
                    await HeavstalTech.sendMessage(m.chat, {
                        audio: { url: audio },
                        mimetype: 'audio/mpeg',
                        fileName: `${title}.mp3`,
                        contextInfo: {
                            externalAdReply: {
                                title: title,
                                body: `Audio by ${author}`,
                                thumbnailUrl: cover || global.thumbnail,
                                mediaType: 1,
                                renderLargerThumbnail: true,
                                sourceUrl: audio
                            }
                        }
                    }, { quoted: m });
                } else {
                    await Vreply(`*Request Failed*\n\nCould not fetch audio. Please check the link.`);
                }
            } catch (e) {
                console.error("TikTok MP3 Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    },
    {
        name: 'lyrics',
        aliases: ['lyric'],
        category: 'search',
        description: 'Fetches the lyrics of a song.',
        usage: '%prefix%lyrics <song>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Please provide a song name*\n\nExample: ${prefix + command} Mockingbird Eminem`);
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));

                const response = await fetch('https://heavstal.com.ng/api/v1/lyrics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ query: text.trim() })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { title, artist, image, lyrics, url } = res.data;
                    const caption = `*🎵 Lyrics Search*\n\n` +
                                    `📌 *Title:* ${title}\n` +
                                    `👤 *Artist:* ${artist}\n` +
                                    `🔗 *Source:* ${url}\n\n` +
                                    `*📝 Lyrics:*\n${lyrics}`;
                    if (image) {
                        await HeavstalTech.sendMessage(m.chat, {
                            image: { url: image },
                            caption: caption
                        }, { quoted: m });
                    } else {
                        await Vreply(caption);
                    }
                } else {
                    await Vreply(`*Lyrics Not Found*\n\n${res.error || 'Could not find lyrics for this song.'}`);
                }
            } catch (e) {
                console.error("Lyrics Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    },
    {
        name: 'gdrive',
        aliases: [],
        category: 'downloader',
        description: 'Downloads a file from Google Drive.',
        usage: '%prefix%gdrive <url>',
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, mess, footer } = context;
            if (!args[0]) return Vreply(`Enter a Google Drive link`);
            Vreply(mess.wait);

            try {
                let res = await fg.GDriveDl(args[0]);
                await Vreply(`≡ *Google Drive DL*\n▢ *Name:* ${res.fileName}\n▢ *Size:* ${res.fileSize}\n▢ *Type:* ${res.mimetype}`);
                HeavstalTech.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
            } catch (e) {
                console.log(e);
                Vreply(`${mess.error.feature}\n_Details:_ ${e}\n\n${footer}`);
            }
        }
    },
    {
        name: 'apk',
        aliases: ['app', 'apkdl'],
        category: 'downloader',
        description: 'Searches and downloads an APK file.',
        usage: '%prefix%apk <app name>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Please provide an app name*\n\nExample: ${prefix + command} Facebook Lite`);
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));

                const response = await fetch('https://heavstal.com.ng/api/v1/apk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ query: text.trim() })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { name, version, size, download_link, icon, package: pkg } = res.data;
                    const info = `*📲 APK Downloader*\n\n` +
                                 `📌 *Name:* ${name}\n` +
                                 `🆔 *Package:* ${pkg}\n` +
                                 `🆚 *Version:* ${version}\n` +
                                 `📦 *Size:* ${size}\n\n` +
                                 `_Sending file..._`;

                    await HeavstalTech.sendMessage(m.chat, { image: { url: icon }, caption: info }, { quoted: m });
                    await HeavstalTech.sendMessage(m.chat, {
                        document: { url: download_link },
                        mimetype: 'application/vnd.android.package-archive',
                        fileName: `${name}_${version}.apk`
                    }, { quoted: m });
                } else {
                    await Vreply(`*App Not Found*`);
                }
            } catch (e) {
                console.error("APK Command Error:", e);
                Vreply(`*Error:* Fetch failed.`);
            }
        }
    },
    {
        name: 'subtitlesh',
        aliases: ['subtitlesearch'],
        category: 'search',
        description: 'Searches for English subtitles for movies.',
        usage: '%prefix%subtitlesh <movie name>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess, MenuStyle, footer } = context;
            try { 
                if (!text) {
                    return Vreply(`*${MenuStyle} Please provide a movie name to search for subtitles.*\n_Example: ${prefix}subtitle The Matrix_\n\n${footer}`);
                }

                Vreply(mess.wait);
                const apiUrl = `https://api.kord.live/api/subtitle?q=${encodeURIComponent(text)}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                if (!data || !data.downloadLinks || data.downloadLinks.length === 0) {
                    return Vreply(`*${MenuStyle} No subtitles found for "${text}".*\nPlease check the movie title and try again.\n\n${footer}`);
                }
                
                if (data.title && data.title.toLowerCase().includes("tempête dans une tasse de thé")) {
                    return Vreply(`*${MenuStyle} The subtitle service is currently busy or returned an invalid result.*\nPlease try again in a few moments.\n\n${footer}`);
                }

                const englishSub = data.downloadLinks.find(sub => sub.language.toLowerCase().includes("english"));

                if (!englishSub) {
                    return Vreply(`*${MenuStyle} An English subtitle could not be found for "${data.title}".*\n\n${footer}`);
                }

                const caption = `*${MenuStyle} Title:* ${data.title}\n` +
                                `*${MenuStyle} Language:* English\n\n` +
                                `${global.CAPTION}\n\n${footer}`;

                const subtitleBuffer = await getBuffer(englishSub.url);
                
                await HeavstalTech.sendMessage(m.chat, {
                    document: subtitleBuffer,
                    mimetype: "application/x-subrip",
                    fileName: `${data.title} [English].srt`,
                    caption: caption
                }, { quoted: m });

                await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});

            } catch (e) {
                console.error("Subtitle command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'subtitledl',
        aliases: ['subtitlesearchdl'],
        category: 'search',
        description: 'Downloads the specified English subtitle.',
        usage: '%prefix%subtitledl <dl--link>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess, MenuStyle, footer } = context;
            try {
                if (!text) {
                    return Vreply(`*${MenuStyle} Please provide a movie name to search.*\n_Example: ${prefix}subtitlesearch Inception_\n\n${footer}`);
                }
                Vreply(mess.wait);
                
                if (text.startsWith("dl--")) {
                    const pageUrl = decodeURIComponent(text.replace("dl--", ""));
                    if (pageUrl.toLowerCase().includes("tempête dans une tasse de thé")) {
                        return Vreply(`*${MenuStyle} The subtitle service is busy or returned an invalid result.*\nPlease try again later.\n\n${footer}`);
                    }
                    await Vreply(`*${MenuStyle} Fetching available languages for your selection...*`);
                    const dlApiUrl = `https://api.kord.live/api/subtiledl?q=${encodeURIComponent(pageUrl)}`;
                    const dlResponse = await fetch(dlApiUrl);
                    const availableLanguages = await dlResponse.json();
                    
                    if (!Array.isArray(availableLanguages) || availableLanguages.length === 0) {
                        return Vreply(`*${MenuStyle} No downloadable subtitles found for this selection.*\n\n${footer}`);
                    }
                    const englishSub = availableLanguages.find(sub => sub.language.toLowerCase().includes("english"));
                    if (!englishSub) {
                        return Vreply(`*${MenuStyle} An English subtitle is not available for this selection.*\n\n${footer}`);
                    }
                    const fileName = decodeURIComponent(pageUrl.split("/").pop().replace(".html", "-en.srt"));
                    const subtitleBuffer = await getBuffer(englishSub.url);
                    await HeavstalTech.sendMessage(m.chat, {
                        document: subtitleBuffer,
                        mimetype: "application/x-subrip",
                        fileName: fileName,
                        caption: `*${MenuStyle} Subtitle Language:* English\n\n${global.CAPTION}\n\n${footer}`
                    }, { quoted: m });
                    
                    return await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}}); 
                } else {
                    const searchApiUrl = `https://api.kord.live/api/subtitlepage?q=${encodeURIComponent(text)}`;
                    const searchResponse = await fetch(searchApiUrl);
                    const searchResults = await searchResponse.json();
                    if (!Array.isArray(searchResults) || searchResults.length === 0) {
                        return Vreply(`*${MenuStyle} No subtitle results found for "${text}".*\n\n${footer}`);
                    }
                    const formattedResults = searchResults.slice(0, 10).map(res => ({
                        name: `${res.title}`,
                        id: `${prefix}subtitlesearch dl--${encodeURIComponent(res.pageUrl)}`
                    }));
                    await HeavstalTech.sendMessage(m.chat, {
                        poll: {
                            name: `*${MenuStyle} Subtitle Search Results for "${text}"*`,
                            values: formattedResults.map(r => r.name),
                            selectableCount: 1
                        }
                    }, { quoted: m });
                    await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
                }
            } catch (e) {
                console.error("Subtitle Search command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'reactch',
        aliases: ['react-ch'],
        category: 'tools',
        description: 'Reacts to a WhatsApp channel message using its link.',
        usage: '%prefix%reactch <link> <emoji>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { q, args, Vreply, prefix, command, footer } = context;
            if (!q) {
                return Vreply(`Provide A Channel Link And Message Id\n\nExample 1: ${prefix}channel-link/message-id (message) \n\nExample 2: ${prefix + command} https://whatsapp.com/channel/XXXXXXXXXXXXX/234 Hello`);
            }
            if (!q.startsWith("https://whatsapp.com/channel/")) {
                return Vreply("Link invalid!");
            }

            const Reaction = {
                a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
                h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
                o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
                v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
                '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
                '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒' 
            };

            const emojiInput = args.slice(1).join(' ').toLowerCase();
            const emoji = emojiInput.split('').map(c => {
                if (c === ' ') return '―';
                return Reaction[c] || c;
            }).join('');

            try {
                const link = args[0];
                const channelId = link.split('/')[4];
                const messageId = link.split('/')[5];
                const res = await HeavstalTech.newsletterMetadata("invite", channelId);
                await HeavstalTech.newsletterReactMessage(res.id, messageId, emoji);
                return Vreply(`Successfully sent *${emoji}* to the message in the channel *${res.name}*.\n\nIt is important that you know whatsapp has patched the glitch that made this command functional, so therefore the reaction may not stay in the channel message for more then 1-2 seconds\n\n${footer}`);
            } catch (e) {
                console.error(e);
                return Vreply("Failed to send reaction. Please make sure the link and emoji are valid.");
            }
        }
    }
];
