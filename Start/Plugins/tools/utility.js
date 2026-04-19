import fs from 'node:fs';
import path from 'node:path';
import upload from "#System/Data7.js";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    {
        name: 'sticker',
        aliases: ['s'],
        category: 'tools',
        description: 'Converts media into a WhatsApp sticker.',
        usage: '%prefix%sticker <reply image/video>',
        execute: async (HeavstalTech, m, context) => {
            const { quoted, mime, Vreply, prefix, command, from } = context;
            
            if (!quoted) return Vreply(`Reply Image or Video with command ${prefix}${command}`);
            
            if (/image/.test(mime)) {
                let media = await quoted.download();
                let encmedia = await HeavstalTech.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author });
                await fs.unlinkSync(encmedia);
            } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11) return Vreply('Max duration is 10s.');
                let media = await quoted.download();
                let encmedia = await HeavstalTech.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author });
                await fs.unlinkSync(encmedia);
            } else {
                return Vreply(`Send Image or Video with command ${prefix}${command}\nVideo duration max 1-9s.`);
            }
        }
    },
    {
        name: 'tourl',
        aliases: [],
        category: 'tools',
        description: 'Uploads media to the cloud and returns a URL.',
        usage: '%prefix%tourl <reply media>',
        execute: async (HeavstalTech, m, context) => {
            const { q, Vreply, prefix, command } = context;
            
            let quotedMedia = m.quoted ? m.quoted : m;
            if (!quotedMedia || !quotedMedia.download) return Vreply(`Reply to an Image or Video with command ${prefix}${command}`);
            
            let mime = quotedMedia.mimetype || '';
            if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
                return Vreply('Only images or MP4 videos are supported!');
            }

            let media;
            try {
                media = await quotedMedia.download();
            } catch (error) {
                return Vreply('Failed to download media!');
            }

            try {
                // System/uploader.js automatically handles Buffer to RESTfulAPI / File.io
                let link = await upload(media);
                HeavstalTech.sendMessage(m.chat, {
                    text: `*Successfully Converted To Media Url*\n\n${link}`
                }, { quoted: m });
            } catch (error) {
                return Vreply(`Failed to upload media! ${error}`);
            }
        }
    }
];
