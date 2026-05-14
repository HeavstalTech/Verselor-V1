// System/Data2.js
// © Heavstal Tech 
// modify before re-use - bugs may occur (actually it won't)

import fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import Crypto from 'node:crypto';
import webp from 'node-webpmux';
import { spawn } from 'node:child_process';


export function ffmpeg(buffer, args =[], ext = '', ext2 = '') {
    return new Promise(async (resolve, reject) => {
        try {
            const randomId = Crypto.randomBytes(6).toString('36');
            const fileName = `heavstal-${Date.now()}-${randomId}.${ext}`;
            let tmp = path.join(tmpdir(), fileName);
            let out = tmp + '.' + ext2;
            
            await fs.promises.writeFile(tmp, buffer);

            const process = spawn('ffmpeg', [
                '-y',
                '-i', tmp,
                ...args,
                out
            ]);

            process.on('error', async (err) => {
                if (fs.existsSync(tmp)) await fs.promises.unlink(tmp).catch(() => {});
                reject(err);
            });

            process.on('close', async (code) => {
                try {
                    await fs.promises.unlink(tmp).catch(() => {}); // Clean input
                    if (code !== 0) return reject(new Error(`FFmpeg exited with code ${code}`));
                    
                    const result = await fs.promises.readFile(out);
                    await fs.promises.unlink(out).catch(() => {}); // Clean output
                    
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

export const toAudio = (buffer, ext) => ffmpeg(buffer,['-vn', '-ac', '2', '-b:a', '128k', '-ar', '44100', '-f', 'mp3'], ext, 'mp3');

export const toPTT = (buffer, ext) => ffmpeg(buffer,['-vn', '-c:a', 'libopus', '-b:a', '128k', '-vbr', 'on', '-compression_level', '10'], ext, 'opus');

export const toVideo = (buffer, ext) => ffmpeg(buffer,['-c:v', 'libx264', '-c:a', 'aac', '-ab', '128k', '-ar', '44100', '-crf', '32', '-preset', 'slow'], ext, 'mp4');

export async function imageToWebp(media) {
    const args =[
        "-vcodec", "libwebp",
        "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
    ];
    return await ffmpeg(media, args, 'jpg', 'webp');
}

export async function videoToWebp(media) {
    const args =[
        "-vcodec", "libwebp",
        "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff[p]; [b][p] paletteuse",
        "-loop", "0",
        "-ss", "00:00:00",
        "-t", "00:00:05",
        "-preset", "default",
        "-an",
        "-vsync", "0"
    ];
    return await ffmpeg(media, args, 'mp4', 'webp');
}

export const webp2mp4 = (buffer) => ffmpeg(buffer,['-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'none'], 'webp', 'mp4');

export async function writeExifImg(media, metadata) {
    let wMedia = await imageToWebp(media);
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    await fs.promises.writeFile(tmpFileIn, wMedia);

    if (metadata.packname || metadata.author) {
        const img = new webp.Image();
        const json = { "sticker-pack-id": `https://github.com/HeavstalTech`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] };
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
        const exif = Buffer.concat([exifAttr, jsonBuff]);
        exif.writeUIntLE(jsonBuff.length, 14, 4);
        await img.load(tmpFileIn);
        await fs.promises.unlink(tmpFileIn).catch(() => {})
        img.exif = exif;
        await img.save(tmpFileOut);
        return tmpFileOut;
    }
}

export async function writeExifVid(media, metadata) {
    let wMedia = await videoToWebp(media);
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    await fs.promises.writeFile(tmpFileIn, wMedia);

    if (metadata.packname || metadata.author) {
        const img = new webp.Image();
        const json = { "sticker-pack-id": `https://github.com/HeavstalTech`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] };
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
        const exif = Buffer.concat([exifAttr, jsonBuff]);
        exif.writeUIntLE(jsonBuff.length, 14, 4);
        await img.load(tmpFileIn);
        await fs.promises.unlink(tmpFileIn).catch(() => {})
        img.exif = exif;
        await img.save(tmpFileOut);
        return tmpFileOut;
    }
}

export async function writeExif(media, metadata) {
    let wMedia = /webp/.test(media.mimetype) ? media.data : /image/.test(media.mimetype) ? await imageToWebp(media.data) : /video/.test(media.mimetype) ? await videoToWebp(media.data) : "";
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    await fs.promises.writeFile(tmpFileIn, wMedia);

    if (metadata.packname || metadata.author) {
        const img = new webp.Image();
        const json = { "sticker-pack-id": `https://github.com/HeavstalTech`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] };
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
        const exif = Buffer.concat([exifAttr, jsonBuff]);
        exif.writeUIntLE(jsonBuff.length, 14, 4);
        await img.load(tmpFileIn);
        await fs.promises.unlink(tmpFileIn).catch(() => {})
        img.exif = exif;
        await img.save(tmpFileOut);
        return tmpFileOut;
    }
}

export async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
    const img = new webp.Image();
    const stickerPackId = Crypto.randomBytes(32).toString('hex');
    const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, ...extra };
    let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
    let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
    let exif = Buffer.concat([exifAttr, jsonBuffer]);
    exif.writeUIntLE(jsonBuffer.length, 14, 4);
    await img.load(webpSticker);
    img.exif = exif;
    return await img.save(null);
}

export const audioCut = (buffer, startTime, duration) => ffmpeg(buffer, ['-ss', startTime.toString(), '-t', duration.toString(), '-f', 'mp3'], 'mp3', 'mp3');
