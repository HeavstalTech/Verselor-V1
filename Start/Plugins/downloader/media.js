import { ytSearch, ytMp4, ytMp3 } from "#System/Data3.js";
import btchPkg from 'btch-downloader';
const { igdl, fbdl } = btchPkg;
import { downloader } from '@heavstaltech/api';
import { someResponseCollector } from "#System/Data1.js";

const ApiMsg = `*NO API KEY DETECTED*

The command requires an *Heavstal Tech* Api Key to run and it seems yours isn't set yet.

> If you don't have an api key, please follow the steps bellow to to get one.
1. Visit "https://heavstal.com.ng/credentials"
2. Sign In
3. Click The "Generate Secret Key" button and copy the generated key
4. Type ${prefix}setapikey <Api Key>
5. Re-run this command 

Note: If you receive this message again after seting the api key, type *"${prefix}restart"* 
`

export default [
    {
        name: 'play',
        aliases: [],
        category: 'downloader',
        description: 'Downloads a song as an audio file from YouTube.',
        usage: '%prefix%play <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, mess, prefix, command, MenuStyle, footer } = context;
            if (!text) return Vreply(`Usage : *${prefix + command}* past lives`);
            
            try {
                await HeavstalTech.sendMessage(m.chat, {react: {text: '🎥', key: m.key}});
                Vreply(mess.wait);
                
                const res = await ytSearch(text);
                if (!res) return Vreply("Error! Result Not Found");
                
                let detailsMsg = `*🎵 VERSELOR-V1 AUDIO DOWNLOADER 🎵*\n\n`;
                detailsMsg += `┃━ ${MenuStyle} *Title:* ${res.title}\n`;
                detailsMsg += `┃━ ${MenuStyle} *Channel:* ${res.author.name || res.author}\n`;
                detailsMsg += `┃━ ${MenuStyle} *Duration:* ${res.timestamp || res.duration?.timestamp || 'N/A'}\n`;
                detailsMsg += `┃━ ${MenuStyle} *Views:* ${res.views ? res.views.toLocaleString() : 'N/A'}\n`;
                detailsMsg += `┃━ ${MenuStyle} *Uploaded:* ${res.ago || 'N/A'}\n\n`;
                detailsMsg += `_⏳ Fetching Audio..._\n\n${footer}`;
                
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: res.thumbnail || res.image },
                    caption: detailsMsg
                }, { quoted: m });

                try {
                    const anu = await downloader.ytmp3(res.url);
                    if (anu && anu.url) {
                        let urlMp3 = anu.url;
                        await HeavstalTech.sendMessage(m.chat, {
                            audio: { url: urlMp3 }, 
                            mimetype: "audio/mpeg", 
                            contextInfo: { 
                                externalAdReply: {
                                    thumbnailUrl: res.thumbnail || res.image, 
                                    title: res.title, 
                                    body: `Author: ${res.author.name || res.author} || Duration: ${res.timestamp || 'N/A'}`, 
                                    sourceUrl: res.url, 
                                    renderLargerThumbnail: true, 
                                    mediaType: 1
                                }
                            }
                        }, { quoted: m });
                        await HeavstalTech.sendMessage(m.chat, {react: {text: '✅', key: m.key}});
                    } else {
                        await HeavstalTech.sendMessage(m.chat, {react: {text: '❌', key: m.key}});
                        return Vreply("Error! Failed to fetch audio download link from the server.");
                    }
                } catch (downloadError) {
                    console.error("Audio Download Error:", downloadError);
                    await HeavstalTech.sendMessage(m.chat, {react: {text: '❌', key: m.key}});
                    Vreply(`*Failed to download audio.*\n_Details: ${downloadError.message || "Unknown API Error"}_`);
                }

            } catch (e) {
                console.error("Play Command Error:", e);
                Vreply("Something Went Wrong during the search process.");
            }
        }
    },
    {
        name: 'play2',
        aliases: ['song'],
        category: 'downloader',
        description: 'Interactive YouTube downloader. Lets you choose Audio, Video, or Document.',
        usage: '%prefix%iplay <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer, MenuStyle } = context;
            if (!text) return Vreply(`*INCORRECT USAGE*\n\n*Example:* ${prefix + command} faded alan walker`);

            await HeavstalTech.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });
            Vreply(mess.wait);

            try {
                const videoResult = await ytSearch(text);
                if (!videoResult) return Vreply(`*${MenuStyle} No results found for "${text}".*\n\n${footer}`);
                const displayMsg = `*${MenuStyle} YOUTUBE DOWNLOADER ${MenuStyle}*\n\n` +
                                   `*TITLE* : ${videoResult.title}\n` +
                                   `*AUTHOR* : ${videoResult.author.name || videoResult.author}\n` +
                                   `*DURATION* : ${videoResult.timestamp || videoResult.duration?.timestamp || 'N/A'}\n\n` +
                                   `➠ *Please reply to this message with your choice:*\n\n` +
                                   `1- *Audio* 🎵\n` +
                                   `2- *Video* 🎥\n` +
                                   `3- *Document* 📄\n\n` +
                                   `_You have 60 seconds to reply._\n\n${footer}`;

                const sentMsg = await HeavstalTech.sendMessage(m.chat, {
                    image: { url: videoResult.thumbnail || videoResult.image },
                    caption: displayMsg
                }, { quoted: m });

                try {
                    const rMsg = await someResponseCollector(m.chat, m.sender, 60000);
                    await HeavstalTech.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
                    const choice = rMsg.text.trim();
                    if (choice === '1' || choice.toLowerCase() === 'audio') {
                        await HeavstalTech.sendMessage(m.chat, { text: "⏳ _Downloading Audio..._" }, { quoted: rMsg });
                        const mp3Link = await downloader.ytmp3(videoResult.url);
                        await HeavstalTech.sendMessage(m.chat, { audio: { url: mp3Link.url }, mimetype: 'audio/mpeg' }, { quoted: rMsg });
                    } 
                    else if (choice === '2' || choice.toLowerCase() === 'video') {
                        await HeavstalTech.sendMessage(m.chat, { text: "⏳ _Downloading Video..._" }, { quoted: rMsg });
                        const mp4Link = await downloader.ytmp4(videoResult.url);
                        await HeavstalTech.sendMessage(m.chat, { video: { url: mp4Link.url }, caption: `*${videoResult.title}*` }, { quoted: rMsg });
                    } 
                    else if (choice === '3' || choice.toLowerCase() === 'document' || choice.toLowerCase() === 'doc') {
                        await HeavstalTech.sendMessage(m.chat, { text: "⏳ _Downloading Audio Document..._" }, { quoted: rMsg });
                        const mp3Doc = await downloader.ytmp3(videoResult.url);
                        await HeavstalTech.sendMessage(m.chat, { 
                            document: { url: mp3Doc.url }, 
                            mimetype: 'audio/mpeg', 
                            fileName: `${videoResult.title}.mp3`,
                            caption: `*${videoResult.title}*`
                        }, { quoted: rMsg });
                    } 
                    else {
                        Vreply("❌ Invalid choice. Session closed. Please run the command again.");
                    }
                    
                    await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

                } catch (timeoutErr) {
                    Vreply("⏳ You took too long to reply. Interactive session closed.");
                }

            } catch (e) {
                console.error("iPlay Error:", e);
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                Vreply(mess.error.fitur);
            }
        }
    },
    {
        name: 'video',
        aliases: ['ytvideo'],
        category: 'downloader',
        description: 'Downloads a video from YouTube.',
        usage: '%prefix%video <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, mess, prefix, command, MenuStyle, footer, pushname } = context;
            if (!text) return Vreply(`*${MenuStyle} Please provide a video title to search for.*\n_Example: ${prefix}${command} cats funny moments_\n\n${footer}`);

            await Vreply(mess.wait);
            
            try {
                const videoResult = await ytSearch(text);
                if (!videoResult) return Vreply(`*${MenuStyle} No video results found for "${text}".*\n\n${footer}`);

                const videoData = await ytMp4(videoResult.url);
                if (!videoData || !videoData.result) return Vreply(`*${MenuStyle} Could not process the video for download.*\nPlease try a different video.\n\n${footer}`);

                const caption = `*${MenuStyle} Title:* ${videoResult.title}\n` +
                                `*${MenuStyle} Duration:* ${videoResult.duration.timestamp}\n` +
                                `*${MenuStyle} Views:* ${videoResult.views.toLocaleString()}\n` +
                                `*${MenuStyle} Uploaded:* ${videoResult.ago}\n\n` +
                                `${global.CAPTION}\n\n${footer}`;

                await HeavstalTech.sendMessage(m.chat, {
                    video: { url: videoData.result },
                    caption: caption
                }, { quoted: m });

            } catch (e) {
                console.error("Video command error:", e);
                return Vreply(`${mess.error.fitur}\n_Details: ${e.message}_`);
            }
        }
    },
    {
        name: 'tiktok',
        aliases: ['tt', 'ttsearch', 'tiktoksearch', 'ttvid', 'ttdl'],
        category: 'downloader',
        description: 'Downloads a TikTok video without watermark.',
        usage: '%prefix%tiktok <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, mess, prefix, command } = context;
            if (!text) return Vreply(`*Please Provide a TikTok Link or Search Query*\n\nExample Download: ${prefix}${command} https://vm.tiktok.com/xxxx\nExample Search: ${prefix}${command} funny cat videos`);
            Vreply(mess.wait);

            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg);
                
                const response = await fetch('https://heavstal.com.ng/api/v1/tiktok', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ query: text.trim() })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    const { title, author, video_nowm, stats } = res.data;
                    const caption = `*🎥 TikTok Downloader*\n\n` +
                                    `📌 *Title:* ${title || 'No Title'}\n` +
                                    `👤 *Author:* ${author || 'Unknown'}\n` +
                                    `👁️ *Views:* ${stats?.views || 0}\n` +
                                    `❤️ *Likes:* ${stats?.likes || 0}\n\n`;
                    
                    await HeavstalTech.sendMessage(m.chat, {
                        video: { url: video_nowm },
                        caption: caption
                    }, { quoted: m });
                } else {
                    await Vreply(`*Request Failed*\n\nCould not find any video. Please check your link or try a different search query.`);
                }
            } catch (e) {
                console.error("TikTok Downloder Error:", e);
                Vreply(`*Error:* An unexpected error occurred while connecting to TikTok.`);
            }
        }
    },
    {
        name: 'instagram',
        aliases: ['ig'],
        category: 'downloader',
        description: 'Downloads Instagram reels/videos.',
        usage: '%prefix%instagram <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command } = context;
            if (!text) return Vreply(`Usage : *${prefix}${command}* <input ig link>`);
            if (!(text.includes('instagram.com') || text.includes('instagr.am') || text.includes('igtv'))) {
                return Vreply('Input a valid Instagram link!');
            }
            try {
                const result = await igdl(text);
                if (!result || result.length === 0) return Vreply('Failed to get video. Make sure the URL entered is correct.');
                for (let video of result) {
                    await HeavstalTech.sendFile(m.chat, video.url, 'instagram.mp4', '𝐕𝐄𝐑𝐒𝐄𝐋𝐎𝐑 𝐕𝟏 ²⁶.', m);
                }
            } catch (err) {
                console.error(err);
                Vreply('An error occurred while trying to download the video.');
            }
        }
    },
    {
        name: 'facebook',
        aliases: ['fb', 'fbdl', 'fbvideo'],
        category: 'downloader',
        description: 'Downloads Facebook videos.',
        usage: '%prefix%facebook <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, MenuStyle, pushname, footer } = context;
            if (!text) return Vreply(`Usage : *${prefix}${command}* <facebook media link>`);
            if (!(text.includes('facebook.com') || text.includes('fb.watch'))) return Vreply('Please provide a valid Facebook link!');
            
            await HeavstalTech.sendMessage(m.chat, { react: { text: '🎬', key: m.key } });

            try {
                const result = await fbdl(text);
                if (!result) return Vreply("Process Failed: Could not fetch video. The link might be private or the video was deleted.");
                
                await HeavstalTech.sendMessage(m.chat, { 
                    video: { url: result }, 
                    caption: `*🎬 FACEBOOK DOWNLOADER*\n\n┃━ ${MenuStyle} *Status:* Success\n┃━ ${MenuStyle} *Requested By:* ${pushname}\n\n${global.CAPTION}\n${footer}` 
                }, { quoted: m });
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } catch (error) {
                console.error("[FB DOWNLOAD ERROR]", error);
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                Vreply(`An error occurred while processing the Facebook video. Ensure the link is public.`);
            }
        }
    },
    {
        name: 'twitter',
        aliases: ['twitterdl', 'x', 'xdl'],
        category: 'downloader',
        description: 'Downloads videos/images from X (Twitter).',
        usage: '%prefix%twitter <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, footer, mess } = context;
            if (!text) return Vreply(`*Please Provide a Twitter/X Link*\n\nExample: ${prefix}${command} https://x.com/user/status/123456...`);
            if (!text.match(/(twitter\.com|x\.com)/gi)) return Vreply("Please provide a valid Twitter or X URL.");
            
            Vreply(mess.wait);
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg);
                
                const response = await fetch('https://heavstal.com.ng/api/v1/twitter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ url: text.trim() })
                });
                const res = await response.json();
                
                if (res.status === 'success' && res.data) {
                    const { description, video_hd, video_sd, thumbnail } = res.data;
                    const mediaUrl = video_hd || video_sd;
                    
                    if (!mediaUrl) {
                        if (thumbnail) {
                            await HeavstalTech.sendMessage(m.chat, {
                                image: { url: thumbnail },
                                caption: `*🐦 X / Twitter Image*\n\n📝 *Desc:* ${description || 'No description'}\n\n${footer}`
                            }, { quoted: m });
                            return;
                        }
                        return await Vreply(`*Download Failed*\n\nNo downloadable media found in this tweet.`);
                    }

                    const caption = `*🐦 X / Twitter Downloader*\n\n📝 *Desc:* ${description || 'No description'}\n\n${footer}`;
                    await HeavstalTech.sendMessage(m.chat, {
                        video: { url: mediaUrl },
                        caption: caption
                    }, { quoted: m });
                } else {
                    await Vreply(`*Request Failed*\n\nCould not fetch tweet. Make sure the link is correct and the account is public.`);
                }
            } catch (e) {
                console.error("Twitter Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred while connecting to Heavstal Tech.`);
            }
        }
    },
    {
        name: 'mediafire',
        aliases: ['mediafiredl'],
        category: 'downloader',
        description: 'Downloads a file from MediaFire.',
        usage: '%prefix%mediafire <url>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            if (!text) return Vreply(`*Provide A MediaFire Link*\n\nExample: ${prefix}${command} https://www.mediafire.com/file/xxxx`);
            if (!text.includes("mediafire.com")) return Vreply("*Invalid Link!* Please provide a valid MediaFire URL.");
            
            Vreply(mess.wait);
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg);
                
                const response = await fetch('https://heavstal.com.ng/api/v1/mediafire', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ url: text.trim() })
                });

                const res = await response.json();
                if (res.status === 'success' && res.data && res.data.link) {
                    const { filename, filetype, filesize, link } = res.data;
                    const caption = `*📦 MediaFire Downloader*\n\n📄 *Name:* ${filename}\n📊 *Size:* ${filesize}\n📂 *Type:* ${filetype}\n\n`;

                    await HeavstalTech.sendMessage(m.chat, {
                        document: { url: link },
                        fileName: filename,
                        mimetype: 'application/octet-stream',
                        caption: caption
                    }, { quoted: m });
                } else {
                    await Vreply(`*Download Failed*\n\nUnable to fetch file details. Make sure the link is valid.`);
                }
            } catch (e) {
                console.error("MediaFire Error:", e);
                Vreply(`*Error:* An unexpected error occurred while processing the download.`);
            }
        }
    },
    {
        name: 'spotify',
        aliases: ['spot', 'spotifydl'],
        category: 'downloader',
        description: 'Downloads a track directly from Spotify.',
        usage: '%prefix%spotify <url>',
        execute: async (HeavstalTech, m, context) => {
            const { args, Vreply, prefix, command, mess, footer, MenuStyle } = context;
            const url = args[0];
            
            if (!url) return Vreply(`*INCORRECT USAGE*\n\nPlease provide a Spotify URL.\n*Example:* ${prefix + command} https://open.spotify.com/track/...`);
            if (!url.includes('spotify.com')) return Vreply('❌ Invalid link. Please provide a valid Spotify track link.');

            await HeavstalTech.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });
            Vreply(mess.wait);

            try {
                const response = await fetch(`https://api.giftedtech.co.ke/api/download/spotifydl?apikey=gifted&url=${encodeURIComponent(url)}`);
                const data = await response.json();
                
                if (data.success && data.result) {
                    const info = `*${MenuStyle} SPOTIFY DOWNLOADER ${MenuStyle}*\n\n┃━ *Title:* ${data.result.title}\n┃━ *Duration:* ${data.result.duration}\n\n${footer}`;
                    await HeavstalTech.sendMessage(m.chat, { 
                        audio: { url: data.result.download_url }, 
                        mimetype: 'audio/mpeg',
                        contextInfo: {
                            externalAdReply: {
                                title: data.result.title,
                                body: "Spotify Music",
                                thumbnailUrl: data.result.thumbnail,
                                sourceUrl: url,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, { quoted: m });
                    
                    await HeavstalTech.sendMessage(m.chat, { text: info }, { quoted: m });
                    await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
                } else {
                    throw new Error('API returned false');
                }
            } catch (e) {
                console.error("Spotify Error:", e);
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                Vreply(`${mess.error.fitur}\n_Details: Failed to fetch Spotify track._`);
            }
        }
    }
];
