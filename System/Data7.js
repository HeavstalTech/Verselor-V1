// System/Data7.js
// © Heavstal Tech 
// Modify before re-use - bugs may occur 
// you can add other cdn api by simply adding it to the iterable list on line 120 of this file.
import { fileTypeFromBuffer } from 'file-type';

/** 
 * Upload to ImgBB storage (Images only, Permanent)
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {Promise<string|string[]>}
 */
async function imgbb(inp) {
    if (Array.isArray(inp)) return Promise.all(inp.map(b => imgbb(b)));
    
    const form = new FormData();
    form.append('image', inp.toString('base64'));
    
    const res = await fetch('https://api.imgbb.com/1/upload?key=254b685aea07ed364f7091dee628d26b', {
        method: 'POST',
        body: form
    });
    const json = await res.json();
    if (json.data && json.data.url) return json.data.url;
    throw new Error('ImgBB Failed');
}

/**
 * Upload to Catbox.moe (Files & Videos, max 200MB, Permanent)
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {Promise<string|string[]>}
 */
const catbox = async (inp) => {
    if (Array.isArray(inp)) return Promise.all(inp.map(b => catbox(b)));
    
    const fileInfo = await fileTypeFromBuffer(inp) || { ext: 'bin', mime: 'application/octet-stream' };
    const { ext, mime } = fileInfo;
    
    const form = new FormData();
    const blob = new Blob([inp], { type: mime });
    
    form.append('reqtype', 'fileupload');
    form.append('userhash', ''); // Optional anonymous hash
    form.append('fileToUpload', blob, `file.${ext}`);
    
    const res = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: form
    });
    
    const text = await res.text();
    if (!text.startsWith('http')) throw new Error(`Catbox upload failed: ${text}`);
    return text.trim();
}

/**
 * Upload file to storage.restfulapi.my.id (Permanent)
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {Promise<string|string[]>}
 */
const RESTfulAPI = async (inp) => {
    const form = new FormData();
    const buffers = Array.isArray(inp) ? inp : [inp];
    
    for (let i = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        const fileInfo = await fileTypeFromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' };
        const blob = new Blob([buffer], { type: fileInfo.mime });
        form.append('file', blob, `file${i}.${fileInfo.ext}`);
    }
    
    const res = await fetch('https://storage.restfulapi.my.id/upload', {
        method: 'POST',
        body: form
    });
    
    const jsonText = await res.text();
    try {
        const json = JSON.parse(jsonText);
        if (!Array.isArray(inp)) return json.files[0].url;
        return json.files.map(res => res.url);
    } catch (e) {
        throw new Error(`RESTfulAPI Error: ${jsonText}`);
    }
}

/**
 * Upload ephemeral file to file.io (Expires in 1 day)
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {Promise<string|string[]>}
 */
const fileIO = async (inp) => {
    if (Array.isArray(inp)) return Promise.all(inp.map(b => fileIO(b)));
    
    const fileInfo = await fileTypeFromBuffer(inp) || { ext: 'bin', mime: 'application/octet-stream' };
    const { ext, mime } = fileInfo; 
    
    const form = new FormData();
    const blob = new Blob([inp], { type: mime });
    
    form.append('file', blob, `tmp.${ext}`);
    
    const res = await fetch('https://file.io/?expires=1d', {
        method: 'POST',
        body: form
    });
    
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'file.io upload failed');
    return json.link;
}

/**
 * Main Export - Ultimate Fallback Uploader
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {Promise<string|string[]>}
 */
export default async function upload(inp) {
    let err = false;
    
    for (const uploader of [imgbb, catbox, RESTfulAPI, fileIO]) {
        try {
            return await uploader(inp);
        } catch (e) {
            err = e;
        }
    }
    if (err) throw err;
}
