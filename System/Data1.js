const path = require('path');
require(path.join(__dirname, '..', 'settings', 'config'));

// ============= { END } ========= \\

const { proto, delay, getContentType, areJidsSameUser, generateWAMessage } = require("@heavstaltech/baileys")
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const { defaultMaxListeners } = require('stream')


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
    // timestamp is usually in seconds (from Baileys), 'now' is in milliseconds
    return (now - (timestamp * 1000)) / 1000;
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options = {}) => {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'DNT': '1',
                'Upgrade-Insecure-Request': '1',
                ...(options.headers || {}) // Merge any additional headers passed in options
            },
            ...options
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const arrayBuffer = await res.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (err) {
        return err;
    }
}

exports.fetchJson = async (url, options = {}) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                ...(options.headers || {})
            },
            ...options
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        return await res.json();
    } catch (err) {
        return err;
    }
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.isLooseUrl = (text) => {
  const pattern = /\b((https?:\/\/|www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/\S*)?\b/gi;
  return pattern.test(text);
}

/**
 * Detects if the bot is running on a Cloud Platform (PaaS/SaaS)
 * @returns {boolean}
 */
exports.isCloud = () => {
    return !!(
        process.env.PORT ||  
        process.env.REPL_ID ||                // Replit
        process.env.RENDER ||                 // Render
        process.env.DYNO ||                   // Heroku
        process.env.RAILWAY_STATIC_URL ||     // Railway
        process.env.KOYEB_SERVICE_NAME ||     // Koyeb
        process.env.FLY_APP_NAME ||           // Fly.io
        process.env.PROJECT_DOMAIN ||         // Glitch
        process.env.NORTHFLANK_SERVICE_NAME   // Northflank
    );
};

exports.getTime = (date) => {
    const d = date ? new Date(date) : new Date();
    
    // Returns something like "17.21.05" (Indonesian locale)
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: global.timezone, // e.g., 'Asia/Jakarta' or 'Africa/Lagos'
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Force 24-hour format
    }).format(d);
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
  const date = new Date(numer || Date.now());
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: global.timezone, // E.g., 'Africa/Lagos'
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const dayName = parts.find(p => p.type === 'weekday').value;
  const day = parts.find(p => p.type === 'day').value;
  const monthName = parts.find(p => p.type === 'month').value;
  const monthNum = parts.find(p => p.type === 'month').value;
  const numericMonthFormatter = new Intl.DateTimeFormat('en-GB', { timeZone: global.timezone, month: '2-digit' });
  const monthDigit = numericMonthFormatter.format(date);
  const year = parts.find(p => p.type === 'year').value;
  const hour = parts.find(p => p.type === 'hour').value;
  const min = parts.find(p => p.type === 'minute').value;
  const sec = parts.find(p => p.type === 'second').value;
  const time = `${day}/${monthDigit} ${hour}:${min}:${sec}`;
  return `${dayName}, ${day} -${monthName} - ${year}`;
};

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.generateProfilePicture = async (buffer) => {
    const { spawn } = require('child_process');
    const { tmpdir } = require('os');
    const path = require('path');
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);
    await fs.promises.writeFile(tmpFileIn, buffer);
    await new Promise((resolve, reject) => {
        spawn('ffmpeg', [
            '-y',
            '-i', tmpFileIn,
            '-vf', 'crop=min(iw\\,ih):min(iw\\,ih),scale=720:720',
            '-vframes', '1',
            tmpFileOut
        ])
        .on('error', reject)
        .on('close', async (code) => {
            if (code !== 0) return reject(new Error('FFmpeg conversion failed'));
            resolve();
        });
    });
    const img = await fs.promises.readFile(tmpFileOut);
    Promise.all([fs.promises.unlink(tmpFileIn), fs.promises.unlink(tmpFileOut)]).catch(() => {});
    return {
        img: img,
        preview: img
    };
}

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            // Using HEAD method is much faster as it only fetches headers, not the entire file
            fetch(path, { method: 'HEAD' })
            .then((res) => {
                let length = parseInt(res.headers.get('content-length'));
                let size = exports.bytesToSize(length, 3);
                if (!isNaN(length)) resolve(size);
                else reject('Content-Length not found');
            }).catch(reject);
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path);
            let size = exports.bytesToSize(length, 3);
            if (!isNaN(length)) resolve(size);
        } else {
            reject('An error Occured');
        }
    })
}

exports.buildStringToSign = (method, uri, accessKey, dataType, signatureVersion, timestamp) => {
    return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
};

exports.sign = (stringToSign, accessSecret) => {
    return Crypto.createHmac('sha1', accessSecret)
        .update(Buffer.from(stringToSign, 'utf-8'))
        .digest().toString('base64');
};

exports.extractUrlsFromString = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || []; 
};

const responseCollectors = new Map();
exports.responseCollectors = responseCollectors;
exports.someResponseCollector = (chatId, userId, timeout = 60000) => {
    const collectorKey = `${chatId}:${userId}`;
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            responseCollectors.delete(collectorKey);
            reject(new Error('Response collector timed out'));
        }, timeout);

        responseCollectors.set(collectorKey, {
            resolve,
            reject,
            timeoutId,
        });
    });
};

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdm = (participants) => {
        let admins = []
        for (let i of participants) {
            i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins || []
     }

/**
 * Serialize Message
 * @param {WAconnction} conn
 * @param {Object} m 
 * @param {store} store 
 */

exports.smsg = (HeavstalTech, m, store) => {
    if (!m) return m;

    const M = proto.WebMessageInfo;

    // ====== Helper Functions ======
    const decodeSender = () => {
        return HeavstalTech.decodeJid(
            (m.fromMe && HeavstalTech.user.id) ||
            m.participant ||
            m.key?.participant ||
            m.chat ||
            ''
        );
    };

    const extractMsg = (message) => {
        const mtype = getContentType(message);
        const msgContent = mtype === 'viewOnceMessage'
            ? message[mtype].message[getContentType(message[mtype].message)]
            : message[mtype];

        return { mtype, msgContent };
    };

    // ====== Base Message Properties ======
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id?.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat?.endsWith('@g.us') || false;
        m.sender = decodeSender();
        if (m.isGroup) m.participant = HeavstalTech.decodeJid(m.key.participant);
    }

    if (m.message) {
        const { mtype, msgContent } = extractMsg(m.message);
        m.mtype = mtype;
        m.msg = msgContent;

        // ====== Extract text/body ======
        m.body = m.message.conversation
            ?? m.msg?.caption
            ?? m.msg?.text
            ?? (m.mtype === 'listResponseMessage' ? m.msg?.singleSelectReply?.selectedRowId : undefined)
            ?? (m.mtype === 'buttonsResponseMessage' ? m.msg?.selectedButtonId : undefined)
            ?? (m.mtype === 'viewOnceMessage' ? m.msg?.caption : undefined)
            ?? '';

        // ====== Quoted message ======
        const quotedMessage = m.msg?.contextInfo?.quotedMessage;
        m.quoted = quotedMessage ? (() => {
            const type = Object.keys(quotedMessage)[0];
            let q = quotedMessage[type];

            if (['productMessage'].includes(type)) {
                const innerType = Object.keys(q)[0];
                q = q[innerType];
            }

            if (typeof q === 'string') q = { text: q };

            const quotedObj = {
                ...q,
                mtype: type,
                id: m.msg.contextInfo?.stanzaId,
                chat: m.msg.contextInfo?.remoteJid || m.chat,
                isBaileys: m.msg.contextInfo?.stanzaId?.startsWith('BAE5') && m.msg.contextInfo?.stanzaId.length === 16,
                sender: HeavstalTech.decodeJid(m.msg.contextInfo?.participant),
                fromMe: HeavstalTech.decodeJid(m.msg.contextInfo?.participant) === HeavstalTech.decodeJid(HeavstalTech.user.id),
                mentionedJid: m.msg.contextInfo?.mentionedJid || [],
                text: q.text ?? q.caption ?? q.conversation ?? q.contentText ?? q.selectedDisplayText ?? q.title ?? ''
            };

            // ====== Quoted Helper Methods ======
            const fakeObj = M.fromObject({
                key: {
                    remoteJid: quotedObj.chat,
                    fromMe: quotedObj.fromMe,
                    id: quotedObj.id
                },
                message: quotedMessage,
                ...(m.isGroup ? { participant: quotedObj.sender } : {})
            });

            quotedObj.delete = () => HeavstalTech.sendMessage(quotedObj.chat, { delete: fakeObj.key });
            quotedObj.copyNForward = (jid, forceForward = false, options = {}) => HeavstalTech.copyNForward(jid, fakeObj, forceForward, options);
            quotedObj.download = () => HeavstalTech.downloadMediaMessage(quotedObj);

            quotedObj.fakeObj = fakeObj;

            quotedObj.getQuotedMessage = async () => {
                if (!quotedObj.id) return false;
                const qMsg = await store.loadMessage(m.chat, quotedObj.id, HeavstalTech);
                return exports.smsg(HeavstalTech, qMsg, store);
            };

            return quotedObj;
        })() : null;
    }

    if (m.msg?.url) m.download = () => HeavstalTech.downloadMediaMessage(m.msg);

    m.text = m.msg?.text
        ?? m.msg?.caption
        ?? m.message?.conversation
        ?? m.msg?.contentText
        ?? m.msg?.selectedDisplayText
        ?? m.msg?.title
        ?? '';

    // ====== Reply Helper ======
    m.reply = (text, chatId = m.chat, options = {}) => {
        return Buffer.isBuffer(text)
            ? HeavstalTech.sendMedia(chatId, text, 'file', '', m, { ...options })
            : HeavstalTech.sendText(chatId, text, m, { ...options });
    };

    m.copy = () => exports.smsg(HeavstalTech, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => HeavstalTech.copyNForward(jid, m, forceForward, options);

    // ====== Append Text Message ======
    HeavstalTech.appendTextMessage = async (text, chatUpdate) => {
        const messages = await generateWAMessage(m.chat, { text, mentions: m.mentionedJid }, {
            userJid: HeavstalTech.user.id,
            quoted: m.quoted?.fakeObj
        });

        messages.key.fromMe = areJidsSameUser(m.sender, HeavstalTech.user.id);
        messages.key.id = m.key.id;
        messages.pushName = m.pushName;
        if (m.isGroup) messages.participant = m.sender;

        const msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        };

        HeavstalTech.ev.emit('messages.upsert', msg);
    };

    return m;
};


let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
