const { fromBuffer } = require('file-type');

/**
 * Upload ephemeral file to file.io
 * `Expired in 1 day`
 * `100MB Max Filesize`
 * @param {Buffer} buffer File Buffer
 * @returns {Promise<string>} Uploaded file URL
 */
const fileIO = async (buffer) => {
    const fileInfo = await fromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' };
    const { ext, mime } = fileInfo; 
    const form = new FormData();
    const blob = new Blob([buffer], { type: mime });
    
    form.append('file', blob, 'tmp.' + ext);
    
    const res = await fetch('https://file.io/?expires=1d', {
        method: 'POST',
        body: form
    });
    
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'file.io upload failed');
    return json.link;
}

/**
 * Upload file to storage.restfulapi.my.id
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {Promise<string|string[]>}
 */
const RESTfulAPI = async (inp) => {
    const form = new FormData();
    const buffers = Array.isArray(inp) ? inp : [inp];
    
    for (let i = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        const fileInfo = await fromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' };
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
 * Main Export - Tries RESTfulAPI first, falls back to file.io
 */
module.exports = async function (inp) {
    let err = false;
    for (const upload of[RESTfulAPI, fileIO]) {
        try {
            return await upload(inp);
        } catch (e) {
            err = e;
        }
    }
    if (err) throw err;
}
