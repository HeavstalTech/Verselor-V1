const { fromBuffer } = require('file-type');

/**
 * Upload image/video/document to catbox.moe
 * @param {Buffer} buffer File Buffer
 * @returns {Promise<string>} Uploaded file URL
 */
module.exports = async (buffer) => {
    const fileInfo = await fromBuffer(buffer);
    const ext = fileInfo ? fileInfo.ext : 'bin';
    const mime = fileInfo ? fileInfo.mime : 'application/octet-stream';
    const bodyForm = new FormData();
    const blob = new Blob([buffer], { type: mime });

    bodyForm.append("reqtype", "fileupload");
    bodyForm.append("fileToUpload", blob, `file.${ext}`);
    
    const res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: bodyForm,
    });

    if (!res.ok) {
        throw new Error(`Catbox upload failed with status ${res.status}`);
    }

    const data = await res.text();
    return data; 
}
