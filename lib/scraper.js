//=================================================//
process.on('uncaughtException', (err) => {
    console.error('An uncaught exception occurred:', err);
    process.exit(1); // Exit with a failure code
});


//=================================================//
const FormData = require("form-data");
const https = require('https');
const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
//=================================================//


//=================================================//

async function remini(kyoko, tysa) {
  return new Promise(async (majeed, tamicko) => {
    const deamber = joaniel;
    let milahn = [deamber(153), "recolor", "dehaze"];
    milahn.includes(tysa) ? tysa = tysa : tysa = milahn[0];
    let kymire, nazar = new FormData, lennel = deamber(149) + "://" + deamber(128) + deamber(151) + deamber(142) + tysa;
    nazar[deamber(146)](deamber(136), 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=uttf-8"}), nazar[deamber(146)](deamber(150), Buffer[deamber(144)](kyoko), {filename: deamber(143), contentType: deamber(152)}), nazar[deamber(148)]({url: lennel, host: deamber(128) + deamber(151) + ".ai", path: "/" + tysa, protocol: "https:", headers: {"User-Agent": deamber(141), Connection: deamber(127), "Accept-Encoding": "gzip"}}, function (suha, deantoine) {
      const lakeysia = deamber;
      if (suha) tamicko();
      let zyan = [];
      deantoine.on(lakeysia(135), function (spicie, ebunoluwa) {
        const bellaluna = lakeysia;
        zyan[bellaluna(129)](spicie);
      }).on("end", () => {
        const camden = lakeysia;
        majeed(Buffer[camden(132)](zyan));
      }), deantoine.on(lakeysia(139), shady => {
        tamicko();
      });
    });
  });
}
//=================================================//


//=================================================//
async function upscaleImage(imageBuffer, task = 'enhance') {
    return new Promise((resolve, reject) => {
        const validTasks = ['enhance', 'recolor', 'dehaze'];
        const selectedTask = validTasks.includes(task) ? task : 'enhance';
        const apiUrl = `https://inferenceengine.vyro.ai/${selectedTask}`;
        const url = new URL(apiUrl);
        const form = new FormData();
        form.append('model_version', '1', {
            "Content-Transfer-Encoding": "binary",
            contentType: "multipart/form-data; charset=utf-8"
        });
        form.append('image', imageBuffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg'
        });
        const request = https.request({
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            protocol: 'https:',
            headers: {
                ...form.getHeaders(),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Connection': 'keep-alive'
            }
        }, (response) => {
            const chunks = [];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            });
            response.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            response.on('error', (err) => {
                console.error("Error during API response:", err);
                reject(new Error("API response error."));
            });
        });
        request.on('error', (err) => {
            console.error("Error sending API request:", err);
            reject(new Error("Failed to send request to enhancement API."));
        });
        form.pipe(request);
    });
}
//=================================================//


//=================================================//
async function ytMp4(url) {
    return new Promise(async(resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        video: item.url,
                        quality: qualityLabel,
                        size: bytes
                    };
                };
            };
            let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined)
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = getUrl.videoDetails.viewCount;
            let likes = getUrl.videoDetails.likes;
            let dislike = getUrl.videoDetails.dislikes;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({
                title,
                result: resultFix[0].video,
                quality: resultFix[0].quality,
                size: resultFix[0].size,
                thumb,
                views,
                likes,
                dislike,
                channel,
                uploadDate,
                desc
            });
        }).catch(reject);
    });
};

//=================================================//


//=================================================//
async function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
                    let { contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        audio: item.url,
                        size: bytes
                    };
                };
            };
            let resultFix = result.filter(x => x.audio != undefined && x.size != undefined)
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = getUrl.videoDetails.viewCount;
            let likes = getUrl.videoDetails.likes;
            let dislike = getUrl.videoDetails.dislikes;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({
                title,
                result: resultFix[0].audio,
                size: resultFix[0].size,
                thumb,
                views,
                likes,
                dislike,
                channel,
                uploadDate,
                desc
            });
        }).catch(reject);
    });
}
//=================================================//


//=================================================//
module.exports = { pinterest, pinterest2, remini, tiktokDl, upscaleImage, ytMp4, ytMp3 }
//=================================================//