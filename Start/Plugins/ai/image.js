import fs from 'fs'
import path from 'path'
import { getImageUrl, upscaleImage, ephoto } from "#System/Data3.js";
import { fetchJson } from "#System/Data1.js"

export default [
    {
        name: 'gimage',
        aliases: ['gptimage'],
        category: 'ai',
        description: 'Generates an image from text using AI.',
        usage: '%prefix%gimage <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess } = context;
            
            if (!text) return Vreply(`Provide an image description\n\nExample: ${prefix}gptimage A futuristic logo with the name HEAVSTAL TECH`);
            Vreply(mess.wait);

            const gpt1image = async (yourImagination) => {
                const headers = {
                    "content-type": "application/json",
                    "referer": "https://gpt1image.exomlapi.com/",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
                };
                const body2 = JSON.stringify({
                    "prompt": yourImagination,
                    "n": 1,
                    "size": "1024x1024",
                    "is_enhance": true,
                    "response_format": "url"
                });
                const response = await fetch("https://gpt1image.exomlapi.com/v1/images/generations", { headers, body: body2, method: "POST" });
                if (!response.ok) throw Error(`fetch failed at address ${response.url} ${response.status} ${response.statusText}.`);
                const json = await response.json();
                const url = json?.data?.[0]?.url;
                if (!url) throw Error(" fetch successful but result url is empty" + (json.error ? ", error from server : " + json.error : "."));
                return url;
            };

            try {
                const imageUrl = await gpt1image(text);
                await HeavstalTech.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
            } catch (error) {
                Vreply(`${error.message}`);
            }
        }
    },
    {
        name: 'remini',
        aliases: ['upscale', 'hd', 'tohd'],
        category: 'ai',
        description: 'Enhances and upscales an image using AI.',
        usage: '%prefix%remini <reply image>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, mess, footer, MenuStyle } = context;
            
            if (!m.quoted || !m.quoted.imageMessage && m.quoted.mtype !== 'imageMessage') {
                return Vreply(`*${MenuStyle} Please reply to an image to enhance its quality.*\n\n${footer}`);
            }
            
            Vreply(mess.wait);
            
            if (typeof upscaleImage !== 'function') {
                return Vreply(`*${MenuStyle} Feature Incomplete.*\nThe 'upscaleImage' function has not been defined. Please contact the developer to set up the image enhancement API.\n\n${footer}`);
            }
            
            try {
                const mediaBuffer = await HeavstalTech.downloadMediaMessage(m.quoted);
                const enhancedImageBuffer = await upscaleImage(mediaBuffer, 'enhance');
                
                await HeavstalTech.sendMessage(m.chat, {
                    image: enhancedImageBuffer,
                    caption: `*${MenuStyle} Here is your upscaled image.*\n\n${footer}`
                }, { quoted: m });

                await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
            } catch (err) {
                console.error("Upscale command error:", err);
                return Vreply(`${mess.error.fitur}\n_Details: ${err.message}_`);
            }
        }
    },
    {
        name: 'carbon',
        aliases: [],
        category: 'ai',
        description: 'Turns code snippets into beautiful Carbon code images.',
        usage: '%prefix%carbon <text / reply code>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess, footer, MenuStyle } = context;
            const codeText = m.quoted?.text || text;        
            
            if (!codeText) {
                return Vreply(`*${MenuStyle} Provide code or reply to a message with code.*\n_Example: ${prefix}carbon console.log("Hello World")_\n\n${footer}`);
            }       
            
            Vreply(mess.wait);
            try {
                const apiUrl = `https://api.nexoracle.com/image-creating/carbon-img?apikey=free_key@maher_apis&text=${encodeURIComponent(codeText)}`;
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: `${global.CAPTION}\n\n${footer}`
                }, { quoted: m });
                await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
            } catch (err) {
                console.error(err);
                return Vreply(`${mess.error.fitur}\n_Details: ${err.message}_`);
            }
        }
    },
    {
        name: 'wanted',
        aliases: ['wasted', 'rainbow', 'trigger-meme', 'rip-meme', 'mnm', 'jail', 'invert'],
        category: 'ai',
        description: 'Applies the specified visual effect/filter to an image.',
        usage: '%prefix%wanted <reply image>',
        execute: async (HeavstalTech, m, context) => {
            const { mime, command, Vreply, mess, footer, MenuStyle } = context;
            
            if (!m.quoted && !/image/.test(mime)) {
                return Vreply(`*${MenuStyle} Please reply to a user or an image to use this command.*\n\n${footer}`);
            }
            
            Vreply(mess.wait);
            const effect = command.replace('-meme', '');
            
            try {
                const imgUrl = await getImageUrl(m, HeavstalTech);
                const apiUrl = `https://api.nexoracle.com/image-processing/${effect}?apikey=free_key@maher_apis&img=${encodeURIComponent(imgUrl)}`;
                
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: `${global.CAPTION}\n\n${footer}`
                }, { quoted: m });
                await HeavstalTech.sendMessage(m.chat, {react: {text: "✅", key: m.key}});
            } catch (err) {
                console.error(err);
                return Vreply(`${mess.error.fitur}\n_Details: ${err.message}_`);
            }
        }
    },
    {
        name: 'glitchtext',
        aliases: [
            'writetext', 'advancedglow', 'typographytext', 'pixelglitch', 'neonglitch', 'flagtext', 
            'flag3dtext', 'deletingtext', 'blackpinkstyle', 'glowingtext', 'underwatertext', 'logomaker', 
            'cartoonstyle', 'papercutstyle', 'watercolortext', 'effectclouds', 'blackpinklogo', 'gradienttext', 
            'summerbeach', 'luxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper', '1917style', 
            'makingneon', 'royaltext', 'freecreate', 'galaxystyle', 'lighteffects'
        ],
        category: 'ai',
        description: 'Advanced text logo generators using ephoto360 styles.',
        usage: '%prefix%glitchtext <text>',
        execute: async (HeavstalTech, m, context) => {
            const { q, command, prefix, Vreply, mess } = context;
            
            if (!q) return Vreply(`Example: ${prefix}${command} Heavstal Tech`);
            Vreply("Processing...");

            const styleLinks = {
                glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
                writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
                advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
                typographytext: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
                pixelglitch: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
                neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
                flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
                flag3dtext: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
                deletingtext: 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
                blackpinkstyle: 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
                glowingtext: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
                underwatertext: 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html',
                logomaker: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
                cartoonstyle: 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html',
                papercutstyle: 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
                watercolortext: 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html',
                effectclouds: 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html',
                blackpinklogo: 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
                gradienttext: 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
                summerbeach: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html',
                luxurygold: 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
                multicoloredneon: 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html',
                sandsummer: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html',
                galaxywallpaper: 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html',
                '1917style': 'https://en.ephoto360.com/1917-style-text-effect-523.html',
                makingneon: 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html',
                royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html',
                freecreate: 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html',
                galaxystyle: 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html',
                lighteffects: 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
            };

            const link = styleLinks[command];
            if (!link) return Vreply('Invalid style link.');
            
            try {
                const result = await ephoto(link, q);
                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: result },
                    caption: mess.success
                }, { quoted: m });
            } catch (e) {
                console.log(e);
                Vreply(String(e));
            }
        }
    },
    {
        name: 'gfx',
        aliases: ['gfx2', 'gfx3', 'gfx4', 'gfx5', 'gfx6', 'gfx7', 'gfx8', 'gfx9', 'gfx10', 'gfx11', 'gfx12'],
        category: 'ai',
        description: 'Generates various text graphic logos.',
        usage: '%prefix%gfx <text1> | <text2>',
        execute: async (HeavstalTech, m, context) => {
            const { text, command, prefix, Vreply, sendImage, MenuStyle, pushname, footer } = context;
            const [t1, t2] = text.split('|').map(v => v.trim());
            if (!t1 || !t2) return Vreply(`*${global.botname} - ɢғx*\n\n*Example:* ${prefix + command} HEAVSTAL | TECH`);

            await HeavstalTech.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
            Vreply(context.mess.wait);

            try {
                const apiUrl = `https://api.nexoracle.com/image-creating/${command}?apikey=d0634e61e8789b051e&text1=${encodeURIComponent(t1)}&text2=${encodeURIComponent(t2)}`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error();

                await sendImage(apiUrl, `*🎨 GFX GENERATED*\n\n┃━ ${MenuStyle} *Style:* ${command.toUpperCase()}\n┃━ ${MenuStyle} *Requested By:* ${pushname}\n\n${footer}`);
                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } catch (err) {
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                Vreply(`❌ API Error.`);
            }
        }
    },
    {
        name: 'emojimix',
        aliases: [],
        category: 'ai',
        description: 'Merges two emojis into a custom sticker.',
        usage: '%prefix%emojimix <emoji>+<emoji>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, footer } = context;
            let [emoji1, emoji2] = text.split('+');
            if (!emoji1 || !emoji2) return Vreply(`*INCORRECT USAGE*\nExample : ${prefix + command} 😅+🤔\n\n${footer}`);
            
            Vreply(context.mess.wait);
            try {
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
                
                for (let res of anu.results) {
                    let encmedia = await HeavstalTech.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags });
                    await fs.promises.unlink(encmedia).catch(()=>{});
                }
            } catch (e) {
                Vreply("Failed to mix emojis.");
            }
        }
    },
    {
        name: 'brat',
        aliases: [],
        category: 'ai',
        description: 'Generates a Brat style text sticker.',
        usage: '%prefix%brat <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`Provide text to turn into a Brat sticker!\nExample: ${prefix}brat HEAVSTAL TECH`);
            
            const imageUrl = `https://www.laurine.site/api/generator/brat?text=${encodeURIComponent(text.trim())}`;
            let mediaBuffer = null
            try {
               mediaBuffer = await HeavstalTech.sendImageAsSticker(m.chat, imageUrl, m, { packname: global.packname, author: global.author });
            } catch (err) {
                Vreply(context.mess.error.feature);
            } finally {
                if (typeof mediaBuffer === 'string' && fs.existsSync(mediaBuffer)) fs.unlinkSync(mediaBuffer)
                mediaBuffer = null
            }
        }
    }
];
