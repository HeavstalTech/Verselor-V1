// System/uploader.js
const { fromBuffer } = require('file-type');

/**
 * Upload ephemeral file to file.io
 * `Expired in 1 day`
 * `100MB Max Filesize`
 * @param {Buffer} buffer File Buffer
 */
const fileIO = async buffer => {
  const { ext } = (await fromBuffer(buffer)) || { ext: 'bin' };  
  const form = new FormData();
  const blob = new Blob([buffer]);
  form.append('file', blob, `tmp.${ext}`);
  
  const res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
    method: 'POST',
    body: form
  });
  
  const json = await res.json();
  if (!json.success) throw json;
  return json.link;
};

/**
 * Upload file to storage.restfulapi.my.id
 * @param {Buffer|Buffer[]} inp File Buffer or Array of them
 * @returns {string|null|(string|null)[]}
 */
const RESTfulAPI = async inp => {
  const form = new FormData();
  const buffers = Array.isArray(inp) ? inp : [inp];
  
  for (const buffer of buffers) {
    const blob = new Blob([buffer]);
    form.append('file', blob);
  }
  
  const res = await fetch('https://storage.restfulapi.my.id/upload', {
    method: 'POST',
    body: form
  });
  
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!Array.isArray(inp)) return json.files[0].url;
    return json.files.map(file => file.url);
  } catch (e) {
    throw text;
  }
};

/**
 * Main upload function. Tries RESTfulAPI first, falls back to fileIO.
 * @param {Buffer} inp The file buffer to upload.
 * @returns {Promise<string>} A promise that resolves with the public URL of the uploaded file.
 */
module.exports = async function (inp) {
  let err;
  for (const upload of [RESTfulAPI, fileIO]) {
    try {
      return await upload(inp);
    } catch (e) {
      err = e;
    }
  }
  throw err;
};
