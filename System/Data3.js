const cheerio = require('cheerio');
const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const upload = require(path.join(__dirname, 'uploader.js'));
//=================================================//


function pinterest(querry){
	return new Promise(async(resolve,reject) => {
        try {
            const res = await fetch('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
                headers: {
                    "cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
                }
            });
            const html = await res.text();
            const $ = cheerio.load(html);
            const result =[];
            const hasil =[];
            
            $('div > a').get().map(b => {
                const link = $(b).find('img').attr('src');
                result.push(link);
            });
            
            result.forEach(v => {
                if(v == undefined) return;
                hasil.push(v.replace(/236/g,'736'));
            });
            
            hasil.shift();
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
	})
}

function wallpaper(title, page = '1') {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`);
            const html = await res.text();
            let $ = cheerio.load(html);
            let hasil =[];
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image:[$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
                });
            });
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function wikimedia(title) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`);
            const html = await res.text();
            let $ = cheerio.load(html);
            let hasil =[];
            $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
                hasil.push({
                    title: $(b).find('img').attr('alt'),
                    source: $(b).attr('href'),
                    image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
                });
            });
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function porno() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('https://tikporntok.com/?random=1');
            const html = await res.text();
            const $ = cheerio.load(html);
            const hasil = {};
            hasil.title = $('article > h1').text();
            hasil.source = $('article > div.video-wrapper.vxplayer').attr('data-post') || 'Web Not Response';
            hasil.thumb = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-poster') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png';
            hasil.desc = $('article > div.intro').text();
            hasil.upload = $('article > div.single-pre-meta.ws.clearfix > time').text();
            hasil.like = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(1) > span').text();
            hasil.dislike = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(2) > span').text();
            hasil.favorite = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(3) > span').text();
            hasil.views = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(4) > span').text();
            hasil.tags = $('article > div.post-tags').text();
            hasil.video = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('src') || $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-src') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png';
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function hentai() {
    return new Promise(async (resolve, reject) => {
        try {
            const page = Math.floor(Math.random() * 1153);
            const res = await fetch('https://sfmcompile.club/page/'+page);
            const html = await res.text();
            const $ = cheerio.load(html);
            const hasil =[];
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                });
            });
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function quotesAnime() {
    return new Promise(async (resolve, reject) => {
        try {
            const page = Math.floor(Math.random() * 184);
            const res = await fetch('https://otakotaku.com/quote/feed/'+page);
            const html = await res.text();
            const $ = cheerio.load(html);
            const hasil =[];
            $('div.kotodama-list').each(function(l, h) {
                hasil.push({
                    link: $(h).find('a').attr('href'),
                    gambar: $(h).find('img').attr('data-src'),
                    karakter: $(h).find('div.char-name').text().trim(),
                    anime: $(h).find('div.anime-title').text().trim(),
                    episode: $(h).find('div.meta').text(),
                    up_at: $(h).find('small.meta').text(),
                    quotes: $(h).find('div.quote').text().trim()
                });
            });
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function igstalk(username){
	return new Promise(async (resolve,reject) => {
        try {
            const res = await fetch('https://www.instagram.com/'+ username +'/?__a=1', {
                method: 'GET',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
                    "cookie": "mid=XBXl1AALAAEbFoAEfNjZlMMG9dwX; ig_did=91E66A48-5AA2-445D-BFE6-84DC4456DE8F; fbm_124024574287414=base_domain=.instagram.com; ig_nrcb=1; shbid=\"12737\0544008624962\0541656157971:01f72a5102dc07af6845adf923ca70eb86e81ab95fa9dbfdaf157c9eef0e82fd1f10fe23\"; shbts=\"1624621971\0544008624962\0541656157971:01f74841fba8e77a0066b47ea891dec8fba6fdf9216c0816f9fb3532292f769828800ae2\"; fbsr_124024574287414=86D8femzH4_KFW4hd3Z6XFdowU6lG-uXsXRQDNl44VM.eyJ1c2VyX2lkIjoiMTAwMDA0Njc2MDc4Nzg5IiwiY29kZSI6IkFRQngzXzVOejdwVnBwby1LRGRUdEYxUFlzcUdDQXJjcmJfb05HaWFvYkNvOGtLN2paam50bHpvMTNOakFnTzVKOHQ5M0V3U3dvNkRtZ0RiY1l1Z3dQSTIybnExOUxLd3lpZTVfZll0bkNXZXBuM1hoYWFLX0w2R0pZaUpzaDBOTDBhb3pmTVBkRTVQRC12X3FnbUgxLXZYdGVmcHhfaFU0aUZNZVMxNHhFUk5OblJyMmxYTUpDa2RFYTdISXNCR2swdHhaaGF0NUt4UDR3cWZTamRwcVFfQ19sa1RUek5fU0taUTYtMjlzTkdnLUVWb3oxMUZWc3Q2OEx2ZnlIY0V0eFp0ZUxacXpiWmh6MzZrVl83VmFGd0FqVnVkTGFQN2VzT3ZRcmlTQ2pLUE5XbVcyNWhudzIzejJBSnVURW00YWR1cmN6a3ZLWU1icTd2SnN0SVdJV09RIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJBZmJuQ3haQzZMd3h4MDFJV2MyZ3dsQ3k3Qmp0b05UNUY0WDY2NHBrUzRQeERNVXRsdmhWWkI3SXE0MGsyZ2hJQm55RHRPcW5iVjlPbUNiWGhyTFBaQUhBQjFzVFpBdHF6RFEzVTROUkhOU1V6MFVXWkNtTEdLcDNNWDRoazVIOURLbERHN0QwUlhZNHY4dHBCdVNNYjN4dnBTRGtQcHdYRlBXVU82VCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjI0NjIxOTgxfQ; fbsr_124024574287414=86D8femzH4_KFW4hd3Z6XFdowU6lG-uXsXRQDNl44VM.eyJ1c2VyX2lkIjoiMTAwMDA0Njc2MDc4Nzg5IiwiY29kZSI6IkFRQngzXzVOejdwVnBwby1LRGRUdEYxUFlzcUdDQXJjcmJfb05HaWFvYkNvOGtLN2paam50bHpvMTNOakFnTzVKOHQ5M0V3U3dvNkRtZ0RiY1l1Z3dQSTIybnExOUxLd3lpZTVfZll0bkNXZXBuM1hoYWFLX0w2R0pZaUpzaDBOTDBhb3pmTVBkRTVQRC12X3FnbUgxLXZYdGVmcHhfaFU0aUZNZVMxNHhFUk5OblJyMmxYTUpDa2RFYTdISXNCR2swdHhaaGF0NUt4UDR3cWZTamRwcVFfQ19sa1RUek5fU0taUTYtMjlzTkdnLUVWb3oxMUZWc3Q2OEx2ZnlIY0V0eFp0ZUxacXpiWmh6MzZrVl83VmFGd0FqVnVkTGFQN2VzT3ZRcmlTQ2pLUE5XbVcyNWhudzIzejJBSnVURW00YWR1cmN6a3ZLWU1icTd2SnN0SVdJV09RIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJBZmJuQ3haQzZMd3h4MDFJV2MyZ3dsQ3k3Qmp0b05UNUY0WDY2NHBrUzRQeERNVXRsdmhWWkI3SXE0MGsyZ2hJQm55RHRPcW5iVjlPbUNiWGhyTFBaQUhBQjFzVFpBdHF6RFEzVTROUkhOU1V6MFVXWkNtTEdLcDNNWDRoazVIOURLbERHN0QwUlhZNHY4dHBCdVNNYjN4dnBTRGtQcHdYRlBXVU82VCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjI0NjIxOTgxfQ; csrftoken=PpiPMEl0R2pAwThsw4NXynO6cVIXHZDo; ds_user_id=38316792800; sessionid=38316792800:rQj5Tr3g5zkg7b:4; rur=\"RVA\05438316792800\0541656158332:01f759cf624bef147397144805bb4c26f6c8b36a232e0f5738c570ee492f6b629f84f6e5\""
                }
            });
            const data = await res.json();
            const user = data.graphql.user;
            let result = {
                message: 'By DidinBotz‡',
                id: user.id,
                biography: user.biography,
                followers: user.edge_followed_by.count,
                following: user.edge_follow.count,
                fullName: user.full_name,
                highlightCount: user.highlight_reel_count,
                isBusinessAccount: user.is_business_account,
                isRecentUser: user.is_joined_recently,
                accountCategory: user.business_category_name,
                linkedFacebookPage: user.connected_fb_page,
                isPrivate: user.is_private,
                isVerified: user.is_verified,
                profilePicHD: user.profile_pic_url_hd,
                username: user.username,
                postsCount: user.edge_owner_to_timeline_media.count
            };
            resolve(result);
        } catch (error) {
            reject(error);
        }
	})
}

function aiovideodl(link) {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. Get token
            const resToken = await fetch('https://aiovideodl.ml/', {
                method: 'GET',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
                }
            });
            const htmlToken = await resToken.text();
            let a = cheerio.load(htmlToken);
            let token = a('#token').attr('value');

            // 2. Fetch video data via POST
            const resData = await fetch('https://aiovideodl.ml/wp-json/aio-dl/video-data/', {
                method: 'POST',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({ 'url': link, 'token': token }).toString()
            });
            
            const data = await resData.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

function umma(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(url);
            const html = await res.text();
            let $ = cheerio.load(html);
            let image =[];
            $('#article-content > div').find('img').each(function (a, b) {
                image.push($(b).attr('src'));
            });
            let hasil = {
                title: $('#wrap > div.content-container.font-6-16 > h1').text().trim(),
                author: {
                    name: $('#wrap > div.content-container.font-6-16 > div.content-top > div > div.user-ame.font-6-16.fw').text().trim(),
                    profilePic: $('#wrap > div.content-container.font-6-16 > div.content-top > div > div.profile-photo > img.photo').attr('src')
                },
                caption: $('#article-content > div > p').text().trim(),
                media: $('#article-content > div > iframe').attr('src') ?[$('#article-content > div > iframe').attr('src')] : image,
                type: $('#article-content > div > iframe').attr('src') ? 'video' : 'image',
                like: $('#wrap > div.bottom-btns > div > button:nth-child(1) > div.text.font-6-12').text(),
            };
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function ringtone(title) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('https://meloboom.com/en/search/'+title);
            const html = await res.text();
            let $ = cheerio.load(html);
            let hasil =[];
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') });
            });
            resolve(hasil);
        } catch (error) {
            reject(error);
        }
    })
}

function styletext(teks) {
    return new Promise((resolve, reject) => {
        fetch('http://qaz.wtf/u/convert.cgi?text=' + teks)
            .then(res => res.text())
            .then(data => {
                let $ = cheerio.load(data)
                let hasil = []
                $('table > tbody > tr').each(function (a, b) {
                    hasil.push({ 
                        name: $(b).find('td:nth-child(1) > span').text(), 
                        result: $(b).find('td:nth-child(2)').text().trim() 
                    })
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

/**
 * Converts raw bytes into a human-readable file size.
 * @param {number|string} bytes The file size in bytes.
 * @returns {string} Formatted string (e.g., "4.2 MB")
 */
function bytesToSize(bytes) {
    const b = Number(bytes);

    if (!Number.isFinite(b) || b <= 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const i = Math.min(
        Math.floor(Math.log(b) / Math.log(k)),
        sizes.length - 1
    );

    const value = b / Math.pow(k, i);
    return `${value.toFixed(2)} ${sizes[i]}`;
}
//=================================================//

/**
 * Enhances, recolors, or dehazes an image using Vyro AI.
 * 
 * @param {Buffer} imageBuffer The image buffer to process
 * @param {string} task 'enhance', 'recolor', or 'dehaze'
 * @returns {Promise<Buffer>} The processed image buffer
 */
async function remini(imageBuffer, task = 'enhance') {
    const validTasks =['enhance', 'recolor', 'dehaze'];
    const selectedTask = validTasks.includes(task) ? task : 'enhance';
    const apiUrl = `https://inferenceengine.vyro.ai/${selectedTask}`;

    const form = new FormData();
    form.append('model_version', '1');
    form.append('image', new Blob([imageBuffer], { type: 'image/jpeg' }), 'image.jpg');

    const response = await fetch(apiUrl, {
        method: 'POST',
        body: form,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Connection': 'keep-alive'
        }
    });

    if (!response.ok) {
        throw new Error(`API response error: ${response.status} ${response.statusText}`);
    }
  
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

const upscaleImage = remini; 

//=================================================//
const getImageUrl = async (m, HeavstalTech) => {
    const msg = m.quoted ? m.quoted : m;
    const mime = (msg.msg || msg).mimetype || '';
    
    if (/image/.test(mime) || /webp/.test(mime)) {
        const mediaBuffer = await msg.download();
        return await upload(mediaBuffer); 
    } 
    else if (m.quoted) {
        try {
            return await HeavstalTech.profilePictureUrl(m.quoted.sender, 'image');
        } catch {
            return "https://files.catbox.moe/g8pxls.png";
        }
    } 
    else {
         try {
            return await HeavstalTech.profilePictureUrl(m.sender, 'image');
        } catch {
            return "https://files.catbox.moe/g8pxls.png";
        }
    }
};

//=================================================//
const npmstalk = async (packageName) => {
    try {
        const [regResponse, dlResponse] = await Promise.all([
            fetch(`https://registry.npmjs.org/${packageName}`),
            fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`)
        ]);

        if (regResponse.status === 404) {
            console.log(`Package "${packageName}" not found.`);
            return null;
        }

        if (!regResponse.ok) throw new Error(`NPM Registry error: ${regResponse.status}`);

        const data = await regResponse.json();
        let downloadsLastMonth = "Unavailable";
        if (dlResponse.ok) {
            const dlData = await dlResponse.json();
            downloadsLastMonth = dlData.downloads ? dlData.downloads.toLocaleString() : "0";
        }

        const latestVersion = data['dist-tags']?.latest;
        const latestVersionInfo = data.versions[latestVersion];
        const depsObj = latestVersionInfo?.dependencies || {};
        const dependenciesCount = Object.keys(depsObj).length;
        const dependencies = dependenciesCount > 0 ? Object.keys(depsObj).join(', ') : 'None';

        return {
            name: data.name,
            description: data.description || 'No description provided.',
            author: data.author?.name || data.publisher?.username || 'Unknown',
            license: data.license || 'None',
            latestVersion: latestVersion,
            publishTime: new Date(data.time?.created).toLocaleDateString(),
            latestPublishTime: new Date(data.time?.modified).toLocaleDateString(),
            downloadsLastMonth: downloadsLastMonth,
            maintainersCount: data.maintainers?.length || 1,
            dependenciesCount: dependenciesCount,
            dependenciesList: dependencies,
            homepage: data.homepage || `https://www.npmjs.com/package/${packageName}`
        };

    } catch (error) {
        console.error("Error in npmstalk function:", error.message);
        return null;
    }
};

//=================================================//

async function ytSearch(query) {
    try {
        const results = await yts(query);
        return results.videos.length > 0 ? results.videos[0] : null;
    } catch (e) {
        console.error("Error in ytSearch helper:", e);
        return null;
    }
}

//=================================================//

async function ytMp4(url) {
    const info = await ytdl.getInfo(url);
    const validFormat = info.formats.find(item => 
        item.container === 'mp4' && 
        item.hasVideo && 
        item.hasAudio && 
        item.url && 
        item.qualityLabel && 
        item.contentLength
    );

    if (!validFormat) throw new Error("No suitable mp4 format found.");

    const sizeInBytes = bytesToSize(validFormat.cotentLength);
    const details = info.videoDetails;

    return {
        title: details.title,
        result: validFormat.url,
        quality: validFormat.qualityLabel,
        size: sizeInBytes,
        thumb: info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url,
        views: details.viewCount,
        likes: details.likes,
        dislike: details.dislikes,
        channel: details.ownerChannelName,
        uploadDate: details.uploadDate,
        desc: details.description
    };
};

//=================================================//

async function ytMp3(url) {
    const info = await ytdl.getInfo(url);
    const validFormat = info.formats.find(item => 
        item.mimeType === 'audio/webm; codecs=\"opus\"' && 
        item.url && 
        item.contentLength
    );

    if (!validFormat) throw new Error("No suitable audio format found.");

    const sizeInBytes = bytesToSize(validFormat.contentLength);
    const details = info.videoDetails;

    return {
        title: details.title,
        result: validFormat.url,
        size: sizeInBytes,
        thumb: info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url,
        views: details.viewCount,
        likes: details.likes,
        dislike: details.dislikes,
        channel: details.ownerChannelName,
        uploadDate: details.uploadDate,
        desc: details.description
    };
}

async function searchVideo(query) {
    const url = `https://www.pornhub.com/video/search?search=${query}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const videoList = [];
    $('li[data-video-segment]').each((index, element) => {
        const $element = $(element);
        const link = $element.find('.title a').attr('href').trim();
        const title = $element.find('.title a').text().trim();
        const uploader = $element.find('.videoUploaderBlock a').text().trim();
        const views = $element.find('.views').text().trim();
        const duration = $element.find('.duration').text().trim();
        
        videoList.push({
            link: "https://www.pornhub.com" + link,
            title: title,
            uploader: uploader,
            views: views,
            duration: duration
        });
    }); 
    return videoList;
}

async function ephoto(url, texk) {
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";
    const gT = await fetch(url, { headers: { "user-agent": userAgent } });
    const html1 = await gT.text();
    const $ = cheerio.load(html1);
    const cookies = gT.headers.get("set-cookie") || "";
    let token = $("input[name=token]").val();
    let build_server = $("input[name=build_server]").val();
    let build_server_id = $("input[name=build_server_id]").val();
    const form = new FormData();
    form.append("text[]", texk);
    form.append("token", token);
    form.append("build_server", build_server);
    form.append("build_server_id", build_server_id);
    
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "user-agent": userAgent,
            "cookie": cookies
        },
        body: form
    });
    
    const html2 = await res.text();
    const $$ = cheerio.load(html2);
    let jsonStr = $$("input[name=form_value_input]").val();
    let json = JSON.parse(jsonStr);
    json["text[]"] = json.text;
    delete json.text;
    const finalParams = new URLSearchParams(json);
    const finalRes = await fetch("https://en.ephoto360.com/effect/create-image", {
        method: 'POST',
        headers: {
            "user-agent": userAgent,
            "cookie": cookies,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: finalParams.toString()
    });
    
    const finalData = await finalRes.json();
    return build_server + finalData.image;
}

module.exports = { 
	remini, upscaleImage, 
    ytMp4, ytMp3, ytSearch, 
    getImageUrl, npmstalk, pinterest, 
    wallpaper, wikimedia, porno, hentai, 
    quotesAnime, searchVideo, ephoto, igstalk, aiovideodl, umma, 
    ringtone, styletext }

