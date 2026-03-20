const fs = require('fs');
const path = require('path');

const getReadmeInfo = () => {
    try {
        const readmePath = path.join(__dirname, '..', 'README.md');
        if (!fs.existsSync(readmePath)) return "No README file found.";
        let readmeRaw = fs.promises.readFile(readmePath, 'utf8');
        let cleanedReadme = readmeRaw
            .replace(/<[^>]*>?/gm, '')                     // Remove all HTML tags (<h1>, <p>, <img>, <a>)
            .replace(/!\[.*?\]\(.*?\)/g, '')               // Remove Markdown images/badges (![Alt](link))
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')      // Remove Markdown links but keep the text ([Text](link) -> Text)
            .replace(/#{1,6}\s?/g, '')                     // Remove Markdown headers (#, ##, ###)
            .replace(/\*\*/g, '')                          // Remove bold markdown (**)
            .replace(/_/g, '')                             // Remove italic markdown (_)
            .replace(/^\s*[\r\n]/gm, '\n')                 // Remove excessive empty lines
            .trim();
        return cleanedReadme;
    } catch (e) {
        console.error("Failed to read/clean README.md:", e);
        return "Verselor-V1 is a powerful WhatsApp bot by Heavstal Tech.";
    }
};

const getBotDocs = (prefix) => {
  
    return `
🌟 Main & Menu

Command Name: allmenu / menu / listmenu / mainmenu
Command Description: Displays the full list of bot commands.
Command Usage: ${prefix + command}

Command Name: owner / creator
Command Description: Sends the bot owner's contact info.
Command Usage: ${prefix + command}

Command Name: owner2 / creator2
Command Description: Sends the secondary owner's contact info.
Command Usage: ${prefix + command}

Command Name: script / sc / repo / repository
Command Description: Fetches the bot's GitHub repository info and script file.
Command Usage: ${prefix + command}

Command Name: ping / speed
Command Description: Checks the bot's response time/latency.
Command Usage: ${prefix + command}

Command Name: alive / Alive
Command Description: Displays the bot's uptime and alive status.
Command Usage: ${prefix + command}

Command Name: runtime
Command Description: Shows how long the bot has been running.
Command Usage: ${prefix + command}

Command Name: support / social-media / channels
Command Description: Shows the developer's community links.
Command Usage: ${prefix + command}

Command Name: botgroup / gcbot / botgc
Command Description: Sends the official Verselor V1 group chat link.
Command Usage: ${prefix + command}

⚙️ Bot Config & Settings

Command Name: shutdown
Command Description: Turns off the bot process (Owner only).
Command Usage: ${prefix}shutdown

Command Name: restart / reboot
Command Description: Restarts the bot process (Owner only).
Command Usage: ${prefix + command}

Command Name: logout
Command Description: Logs out the current WhatsApp session (Owner only).
Command Usage: ${prefix}logout

Command Name: setprefix / set-prefix
Command Description: Changes the bot's command prefix.
Command Usage: ${prefix + command} <symbol>

Command Name: setbotimg / setbotimage / set-botimage / set-botimg
Command Description: Updates the bot's thumbnail image in menus.
Command Usage: ${prefix + command} <url>

Command Name: setmenustyle / setms / setmenus
Command Description: Changes the visual layout/style of the main menu (v1, v2, v3).
Command Usage: ${prefix + command} <v1/v2/v3>

Command Name: setalive / set-alive
Command Description: Sets a custom message for the alive command.
Command Usage: ${prefix + command} <text>

Command Name: startupmsg / startup-msg
Command Description: Toggles the startup message sent when the bot boots.
Command Usage: ${prefix + command} <on/off>

Command Name: settimezone / set-timezone / set-time-zone
Command Description: Sets the bot's time zone.
Command Usage: ${prefix + command} <zone>

Command Name: public
Command Description: Makes the bot respond to everyone.
Command Usage: ${prefix}public

Command Name: self / private
Command Description: Restricts the bot to only respond to the owner.
Command Usage: ${prefix + command}

Command Name: mode
Command Description: Restricts bot usage to exclusively Group Chats (group) or Private Chats (pc).
Command Usage: ${prefix}mode <group/pc/off>

Command Name: auto-typing / autotyping
Command Description: Toggles fake typing presence.
Command Usage: ${prefix + command} <on/off>

Command Name: auto-recording / autorecording
Command Description: Toggles fake recording presence.
Command Usage: ${prefix + command} <on/off>

Command Name: auto-recordtype / autorecordtype
Command Description: Toggles alternating typing/recording presence.
Command Usage: ${prefix + command} <on/off>

Command Name: auto-read / autoread
Command Description: Toggles automatically marking incoming messages as read.
Command Usage: ${prefix + command} <on/off>

Command Name: auto-statusview / autoswview
Command Description: Toggles automatically viewing status updates.
Command Usage: ${prefix + command} <on/off>

Command Name: autoreact / auto-react / areact
Command Description: Toggles automatic emoji reactions to messages.
Command Usage: ${prefix + command} <on/off>

🛡️ Owner & Admin Privileges

Command Name: addowner / addown
Command Description: Adds a new bot owner.
Command Usage: ${prefix + command} <number>

Command Name: delowner / delown
Command Description: Removes a bot owner.
Command Usage: ${prefix + command} <number>

Command Name: addsudo / setsudo
Command Description: Grants sudo privileges to a user.
Command Usage: ${prefix + command} <number>

Command Name: delsudo / removesudo
Command Description: Removes sudo privileges.
Command Usage: ${prefix + command} <number>

Command Name: listsudo / getsudo
Command Description: Lists all users with sudo access.
Command Usage: ${prefix + command}

Command Name: addpremium / addprem
Command Description: Grants premium status to a user.
Command Usage: ${prefix + command} <number>

Command Name: delpremium / delprem
Command Description: Removes premium status.
Command Usage: ${prefix + command} <number>

Command Name: ban / banuser
Command Description: Bans a user from using the bot.
Command Usage: ${prefix + command} <@user/number>

Command Name: unban / unbanuser
Command Description: Unbans a user.
Command Usage: ${prefix + command} <@user/number>

Command Name: listban / listbanuser
Command Description: Lists all banned users.
Command Usage: ${prefix + command}

Command Name: banchat / bangc / ban-chat / ban-gc
Command Description: Bans the current group chat from using the bot.
Command Usage: ${prefix + command}

Command Name: unbanchat / unbangc / unban-chat / unban-gc
Command Description: Unbans the current group chat.
Command Usage: ${prefix + command}

Command Name: block / blocked
Command Description: Blocks a user on WhatsApp.
Command Usage: ${prefix + command} <number>

Command Name: unblock / unblocked
Command Description: Unblocks a user.
Command Usage: ${prefix + command} <number>

Command Name: listblock / listblocked
Command Description: Lists blocked numbers.
Command Usage: ${prefix + command}

Command Name: setpp / setppbot
Command Description: Sets the bot's profile picture.
Command Usage: ${prefix + command} <reply image>

Command Name: deletepp / delpp / deleteppbot / delppbot
Command Description: Removes the bot's profile picture.
Command Usage: ${prefix + command}

Command Name: setname
Command Description: Changes the bot's WhatsApp display name.
Command Usage: ${prefix}setname <text>

Command Name: bio / setbio
Command Description: Changes the bot's WhatsApp "About" text.
Command Usage: ${prefix + command} <text>

Command Name: join
Command Description: Makes the bot join a WhatsApp group via link.
Command Usage: ${prefix}join <link>

Command Name: joinch / joinchannel
Command Description: Makes the bot follow a WhatsApp Channel.
Command Usage: ${prefix + command} <link>

Command Name: left / leave
Command Description: Makes the bot leave the current group.
Command Usage: ${prefix + command}

Command Name: advertise / broadcast
Command Description: Sends a broadcast message to all groups the bot is in.
Command Usage: ${prefix + command} <text>

Command Name: download / save
Command Description: Saves the replied media to the bot's system.
Command Usage: ${prefix + command} <reply media>

Command Name: upsw / up-status / status
Command Description: Uploads a status/story to the bot's WhatsApp account.
Command Usage: ${prefix + command} <reply media/text>

Command Name: update
Command Description: Pulls the latest code from GitHub and restarts.
Command Usage: ${prefix}update

Command Name: pair
Command Description: Generates a pairing code to host another bot session.
Command Usage: ${prefix}pair <number>

Command Name: delpair
Command Description: Deletes a rented/paired bot session.
Command Usage: ${prefix}delpair <number>

Command Name: eval / > / =>
Command Description: Evaluates JavaScript code (Owner only).
Command Usage: ${prefix + command} <code>

Command Name: test / status
Command Description: A quick ping alternative to check if the bot is online and processing messages.
Command Usage: ${prefix + command}

Command Name: reactch / react-ch
Command Description: Reacts to a WhatsApp channel message using its link.
Command Usage: ${prefix + command} <link> <emoji>

👥 Group Management

Command Name: gcstatus / upswgc
Command Description: Posts a status update directly from the group.
Command Usage: ${prefix + command} <text/reply media>

Command Name: add
Command Description: Adds a user to the group.
Command Usage: ${prefix}add <number>

Command Name: kick / fling
Command Description: Removes a user from the group or mass kicks by country code.
Command Usage: ${prefix + command} <@user/number/country code>

Command Name: promote
Command Description: Makes a user a group admin.
Command Usage: ${prefix}promote <@user>

Command Name: demote
Command Description: Removes admin rights from a user.
Command Usage: ${prefix}demote <@user>

Command Name: kickall
Command Description: Removes all non-admin members.
Command Usage: ${prefix}kickall

Command Name: kickadmins
Command Description: Removes all admins (except the bot and the commander).
Command Usage: ${prefix}kickadmins

Command Name: promoteall
Command Description: Promotes all regular members to admin.
Command Usage: ${prefix}promoteall

Command Name: demoteall
Command Description: Demotes all admins to regular members.
Command Usage: ${prefix}demoteall

Command Name: approveall
Command Description: Approves all pending join requests.
Command Usage: ${prefix}approveall

Command Name: tagall
Command Description: Mentions every member in the group.
Command Usage: ${prefix}tagall [text]

Command Name: hidetag
Command Description: Sends a message that ghost-pings all members.
Command Usage: ${prefix}hidetag [text]

Command Name: tagadmin / listadmin / admin
Command Description: Mentions all group admins.
Command Usage: ${prefix + command}

Command Name: welcome
Command Description: Toggles welcome messages for new members.
Command Usage: ${prefix}welcome <on/off>

Command Name: goodbye
Command Description: Toggles goodbye messages for leaving members.
Command Usage: ${prefix}goodbye <on/off>

Command Name: group-events
Command Description: Toggles notifications for promote/demote/name changes.
Command Usage: ${prefix}group-events <on/off>

Command Name: listonline / list-online
Command Description: Lists currently online members in the group.
Command Usage: ${prefix + command}

Command Name: linkgroup / linkgc / gclink
Command Description: Fetches the group invite link.
Command Usage: ${prefix + command}

Command Name: resetgclink / revoke
Command Description: Revokes and resets the group invite link.
Command Usage: ${prefix + command}

Command Name: groupid / group-id / gcid / id-gc / idgc / checkidgc
Command Description: Displays the internal JID of the group.
Command Usage: ${prefix + command}

Command Name: setppgroup / setppgrup / setppgc
Command Description: Changes the group icon.
Command Usage: ${prefix + command} <reply image>

Command Name: deleteppgroup / delppgroup
Command Description: Removes the group icon.
Command Usage: ${prefix + command}

Command Name: creategc / create-group / create-gc / creategroup
Command Description: Creates a new group and returns the invite link.
Command Usage: ${prefix + command} <name>

Command Name: checkgc / getgcinfo / infogc / info-gc / get-gc-info / check-gc
Command Description: Fetches group metadata using an invite link.
Command Usage: ${prefix + command} <link>

Command Name: listgc / listgroup / list-gc / list-group
Command Description: Lists all the groups the bot is currently in (Owner only).
Command Usage: ${prefix + command}

Command Name: sendlinkgc / sendgclink / send-gc-link
Command Description: Sends the invite link of the current group directly to a specific user.
Command Usage: ${prefix + command} <number>

Command Name: mute
Command Description: Locks the group so only admins can send messages.
Command Usage: ${prefix}mute

Command Name: unmute
Command Description: Unlocks the group so all members can send messages.
Command Usage: ${prefix}unmute

Command Name: closetime
Command Description: Mutes the group after a set time.
Command Usage: ${prefix}closetime <number> <unit>

Command Name: opentime
Command Description: Unmutes the group after a set time.
Command Usage: ${prefix}opentime <number> <unit>

Command Name: setwarn
Command Description: Sets the maximum warning limit before kicking.
Command Usage: ${prefix}setwarn <number>

Command Name: checkwarn / warns
Command Description: Checks a user's current warning count.
Command Usage: ${prefix + command} [@user]

Command Name: resetwarn / delwarn
Command Description: Resets a user's warning count.
Command Usage: ${prefix + command} [@user]

Command Name: antilink
Command Description: Configures action against WhatsApp links.
Command Usage: ${prefix}antilink <delete/warn/kick/off>

Command Name: antitag / anti-tag
Command Description: Prevents mass-tagging by non-admins.
Command Usage: ${prefix + command} <on/off>

Command Name: antibot
Command Description: Configures action against other bots.
Command Usage: ${prefix}antibot <delete/warn/kick/off>

Command Name: antibadword
Command Description: Configures action against profanity.
Command Usage: ${prefix}antibadword <delete/warn/kick/off>

Command Name: antidelete
Command Description: Automatically recovers and resends deleted messages.
Command Usage: ${prefix}antidelete <on/off>

Command Name: addbadword
Command Description: Adds a word to the profanity filter.
Command Usage: ${prefix}addbadword <word>

Command Name: delbadword
Command Description: Removes a word from the profanity filter.
Command Usage: ${prefix}delbadword <word>

Command Name: listbadword
Command Description: Lists all filtered bad words.
Command Usage: ${prefix}listbadword

Command Name: anticall
Command Description: Sets the bot's behavior when it receives a voice/video call.
Command Usage: ${prefix}anticall <off/reject/block>

📥 Downloader & Media Fetchers

Command Name: play
Command Description: Downloads a song as an audio file from YouTube.
Command Usage: ${prefix}play <query>

Command Name: playdoc / musicdoc
Command Description: Downloads a song as a document.
Command Usage: ${prefix + command} <query>

Command Name: video / ytvideo
Command Description: Downloads a video from YouTube.
Command Usage: ${prefix + command} <query>

Command Name: ytmp3 / ytaudio / ytplayaudio
Command Description: Converts a YouTube link to MP3.
Command Usage: ${prefix + command} <url>

Command Name: ytmp4 / ytvideo / ytplayvideo
Command Description: Downloads a YouTube link as MP4.
Command Usage: ${prefix + command} <url>

Command Name: ytadoc / ytmp3doc / ytvdoc / ytmp4doc
Command Description: Downloads YouTube audio/video as a document.
Command Usage: ${prefix + command} <url>

Command Name: yts / ytsearch
Command Description: Searches YouTube and returns results.
Command Usage: ${prefix + command} <query>

Command Name: lyrics / lyric
Command Description: Fetches the lyrics of a song.
Command Usage: ${prefix + command} <song>

Command Name: tiktok / tt / ttdl / ttvid
Command Description: Downloads a TikTok video without watermark.
Command Usage: ${prefix + command} <url>

Command Name: ttmp3 / tiktokmp3 / ttaudio
Command Description: Downloads the audio track of a TikTok video.
Command Usage: ${prefix + command} <url>

Command Name: tik-img / tt-img / ttimg
Command Description: Downloads a TikTok photo slideshow.
Command Usage: ${prefix + command} <url>

Command Name: instagram / ig
Command Description: Downloads Instagram reels/videos.
Command Usage: ${prefix + command} <url>

Command Name: facebook / fb / fbdl / fbvideo
Command Description: Downloads Facebook videos.
Command Usage: ${prefix + command} <url>

Command Name: twitter / twitterdl / x / xdl
Command Description: Downloads videos/images from X (Twitter).
Command Usage: ${prefix + command} <url>

Command Name: git / gitclone
Command Description: Downloads a GitHub repository as a ZIP file.
Command Usage: ${prefix + command} <github link>

Command Name: mediafire / mediafiredl
Command Description: Downloads a file from MediaFire.
Command Usage: ${prefix + command} <url>

Command Name: pin / pinterest
Command Description: Fetches random images from Pinterest based on a query.
Command Usage: ${prefix + command} <query>

Command Name: apk / app / apkdl
Command Description: Searches and downloads an APK file.
Command Usage: ${prefix + command} <app name>

Command Name: gdrive
Command Description: Downloads a file from Google Drive.
Command Usage: ${prefix}gdrive <url>

Command Name: subtitlesh / subtitlesearch / subtitlesearchdl / subtitledl
Command Description: Searches and downloads English subtitles for movies.
Command Usage: ${prefix + command} <movie>

🤖 AI & Image Generation

Command Name: ai
Command Description: Chats with the default AI persona.
Command Usage: ${prefix}ai <query>

Command Name: ai2
Command Description: Chats with the secondary AI (can be given different personalities).
Command Usage: ${prefix}ai2 <query>

Command Name: gpt4 / openai / xai / gemini / meta-ai / copilot / jeden
Command Description: Chat with specific distinct AI models/personas.
Command Usage: ${prefix + command} <query>

Command Name: setpersona
Command Description: Sets the custom personality instructions for the main AI.
Command Usage: ${prefix}setpersona <text>

Command Name: setpersona2 / setmode
Command Description: Sets the personality for ai2.
Command Usage: ${prefix + command} <option>

Command Name: gimage / gptimage
Command Description: Generates an image from text using AI.
Command Usage: ${prefix + command} <query>

Command Name: remini / upscale / hd / tohd
Command Description: Enhances and upscales an image using AI.
Command Usage: ${prefix + command} <reply image>

Command Name: sticker / s
Command Description: Converts media into a WhatsApp sticker.
Command Usage: ${prefix + command} <reply image/video>

Command Name: emojimix
Command Description: Merges two emojis into a custom sticker.
Command Usage: ${prefix}emojimix <emoji>+<emoji>

Command Name: steal / stickerwm / take / wm
Command Description: Changes the watermark/author name of a sticker.
Command Usage: ${prefix + command} <pack|author> <reply sticker>

Command Name: brat
Command Description: Generates a "Brat" style text sticker.
Command Usage: ${prefix}brat <text>

Command Name: qc
Command Description: Generates a quote bubble sticker mimicking your profile.
Command Usage: ${prefix}qc <text>

🛠️ Utilities & Tools

Command Name: tts / say / speak
Command Description: Converts text to speech.
Command Usage: ${prefix + command} <[lang]> <text>

Command Name: tr / translate
Command Description: Translates text to English.
Command Usage: ${prefix + command} <text>

Command Name: tourl
Command Description: Uploads media to the cloud and returns a URL.
Command Usage: ${prefix}tourl <reply media>

Command Name: toimage / toimg
Command Description: Converts a sticker back into a standard image.
Command Usage: ${prefix + command} <reply sticker>

Command Name: toaud / tomp3 / toaudio
Command Description: Extracts MP3 audio from a video.
Command Usage: ${prefix + command} <reply video>

Command Name: tomp4 / tovideo
Command Description: Converts an animated sticker to an MP4 video.
Command Usage: ${prefix + command} <reply animated sticker>

Command Name: togif
Command Description: Converts an animated sticker to a looping GIF.
Command Usage: ${prefix}togif <reply animated sticker>

Command Name: todoc / todocument
Command Description: Converts media into a document file.
Command Usage: ${prefix + command} <reply media>

Command Name: tovn
Command Description: Converts media to a playable Voice Note.
Command Usage: ${prefix}tovn <reply video/audio>

Command Name: tovv / toviewonce
Command Description: Converts media to a "View Once" message.
Command Usage: ${prefix + command} <reply media>

Command Name: vv / readviewonce
Command Description: Saves and exposes a View Once image/video/audio.
Command Usage: ${prefix + command} <reply viewonce>

Command Name: hmp / vv2 / readviewonce2
Command Description: Saves a View Once message and sends it directly to the Bot Owner's DMs.
Command Usage: ${prefix + command} <reply viewonce>

Command Name: volaudio / audiovolume
Command Description: Increases or decreases the volume of an audio file.
Command Usage: ${prefix + command} <amount> <reply audio>

Command Name: volvideo / videovolume
Command Description: Increases or decreases the volume of a video file.
Command Usage: ${prefix + command} <amount> <reply video>

Command Name: runcode
Command Description: Evaluates JavaScript code natively (outputs console.log results).
Command Usage: ${prefix}runcode <javascript>

Command Name: readmore
Command Description: Creates a "Read more..." text separator.
Command Usage: ${prefix}readmore <text1>|<text2>

Command Name: checkmail
Command Description: Checks if an email is valid or from a disposable/spam domain.
Command Usage: ${prefix}checkmail <email>

Command Name: ss / ssweb / screenshot
Command Description: Captures a screenshot of a webpage (supports --phone flag).
Command Usage: ${prefix + command} <url>

Command Name: get / g
Command Description: Fetches raw JSON or text from a URL.
Command Usage: ${prefix + command} <url>

Command Name: qrcode / qr / generateqr
Command Description: Generates a QR Code for the given text.
Command Usage: ${prefix + command} <text/link>

Command Name: readqr
Command Description: Reads the data from a QR code image.
Command Usage: ${prefix}readqr <reply image>

Command Name: checksite / checkweb / httpstatus / statuscheck / http
Command Description: Checks the HTTP status and latency of a website.
Command Usage: ${prefix + command} <url>

Command Name: style / fancy
Command Description: Converts text into various stylish fonts.
Command Usage: ${prefix + command} <text>

Command Name: calculator / calc / calculate
Command Description: Solves a mathematical expression.
Command Usage: ${prefix + command} <expression>

Command Name: morse
Command Description: Translates text to/from Morse code.
Command Usage: ${prefix}morse <encode/decode> | <text>

Command Name: markdown / mdtohtml / md
Command Description: Converts Markdown syntax to HTML.
Command Usage: ${prefix + command} <markdown>

Command Name: metadata / linkinfo / urlinfo
Command Description: Fetches SEO metadata (Title, description, image) of a link.
Command Usage: ${prefix + command} <link>

Command Name: detect / isaitext / sentinel
Command Description: Scans text to see if it was generated by AI.
Command Usage: ${prefix + command} <text>

Command Name: ps / pstrength / passcheck / passwordcheck
Command Description: Audits a password for strength and estimated crack time.
Command Usage: ${prefix + command} <password>

Command Name: myjid / my-jid
Command Description: Shows the internal WhatsApp JID of the current chat.
Command Usage: ${prefix + command}

Command Name: getname / get-name
Command Description: Fetches the WhatsApp name of the replied user.
Command Usage: ${prefix + command} <reply>

Command Name: getdevice / device / phone
Command Description: Detects what device (iOS, Android, Web) sent the replied message.
Command Usage: ${prefix + command} <reply>

Command Name: delete / del
Command Description: Deletes the replied message.
Command Usage: ${prefix + command} <reply>

Command Name: forward / fwrd
Command Description: Forwards a replied message to a specific JID/Number.
Command Usage: ${prefix + command} <jid>

Command Name: archive
Command Description: Archives the current chat.
Command Usage: ${prefix}archive

Command Name: unarchive
Command Description: Unarchives the current chat.
Command Usage: ${prefix}unarchive

Command Name: pinchat / chatpin
Command Description: Pins the current chat.
Command Usage: ${prefix + command}

Command Name: unpinchat / unchatpin
Command Description: Unpins the current chat.
Command Usage: ${prefix + command}

Command Name: setcmd
Command Description: Binds a command to a specific sticker.
Command Usage: ${prefix}setcmd <cmd> <reply sticker>

Command Name: delcmd
Command Description: Removes a command bound to a sticker.
Command Usage: ${prefix}delcmd <reply sticker>

Command Name: listcmd / listcmds
Command Description: Lists all bound sticker commands.
Command Usage: ${prefix + command}

Command Name: encrypt / obfuscate / enc / obf
Command Description: Obfuscates JavaScript/Python/Java code.
Command Usage: ${prefix + command} <reply file / code>

Command Name: aza
Command Description: Retrieves the owner's bank/payment details.
Command Usage: ${prefix}aza

Command Name: setaza
Command Description: Stores the owner's bank/payment details.
Command Usage: ${prefix}setaza <account-name> | <bank-name> | <account-number>

Command Name: delaza
Command Description: Deletes the stored bank/payment details.
Command Usage: ${prefix}delaza

Command Name: delchat / clearchat
Command Description: Clears the current chat history.
Command Usage: ${prefix + command}

Command Name: shorturl / tinyurl
Command Description: Shrinks a long URL into a short tinyurl.com link.
Command Usage: ${prefix + command} <link>

Command Name: pdftotext
Command Description: Extracts and reads all the text inside a PDF document.
Command Usage: ${prefix}pdftotext <reply pdf>

Command Name: q / quoted
Command Description: Copies and forwards the exact message you are replying to.
Command Usage: ${prefix + command} <reply>

Command Name: profile / me
Command Description: Displays your WhatsApp profile picture, name, and number in a customized ID card format.
Command Usage: ${prefix + command}

Command Name: time
Command Description: Displays the current Time, Day, and Date based on the bot's timezone.
Command Usage: ${prefix}time

Command Name: morning / afternoon / evening
Command Description: Context-aware greeting commands.
Command Usage: ${prefix + command}

Command Name: learn_coding / coding
Command Description: Provides beginner resources and links for learning to code.
Command Usage: ${prefix + command}

Command Name: charge
Command Description: Sends an animated text sequence showing a battery charging up to 100%.
Command Usage: ${prefix}charge

💰 Economy

(Requires a connected MongoDB database)

Command Name: economy / econ
Command Description: Toggles the economy system in the group.
Command Usage: ${prefix + command} <on/off>

Command Name: bal / wallet
Command Description: Checks your current wallet and bank balance.
Command Usage: ${prefix + command}

Command Name: daily
Command Description: Claims a daily money reward.
Command Usage: ${prefix}daily

Command Name: work
Command Description: Works a random job to earn money (1-hour cooldown).
Command Usage: ${prefix}work

Command Name: dep / deposit
Command Description: Moves money from the wallet to the bank.
Command Usage: ${prefix + command} <amount/all>

Command Name: withdraw
Command Description: Moves money from the bank to the wallet.
Command Usage: ${prefix}withdraw <amount/all>

Command Name: give / pay
Command Description: Transfers money to another user.
Command Usage: ${prefix + command} <@user> <amount>

Command Name: rob
Command Description: Attempts to steal money from someone else (Risks a fine if caught).
Command Usage: ${prefix}rob <@user>

Command Name: gamble / bet
Command Description: Bets money with a 50/50 chance to win or lose.
Command Usage: ${prefix + command} <amount>

Command Name: lb / leaderboard / top
Command Description: Shows the richest users leaderboard.
Command Usage: ${prefix + command} <limit>

Command Name: shop
Command Description: Displays items available for purchase.
Command Usage: ${prefix}shop

Command Name: buy
Command Description: Buys an item from the shop.
Command Usage: ${prefix}buy <item id/name>

Command Name: inv / inventory
Command Description: Shows the items you own.
Command Usage: ${prefix + command}

🔎 Search & Information

Command Name: google / search
Command Description: Performs a Google search.
Command Usage: ${prefix + command} <query>

Command Name: wiki / wikipedia
Command Description: Searches Wikipedia and returns a summary.
Command Usage: ${prefix + command} <query>

Command Name: npmsearch
Command Description: Searches the NPM registry for a package.
Command Usage: ${prefix}npmsearch <package>

Command Name: npmstalk
Command Description: Fetches detailed info (version, downloads, deps) about an NPM package.
Command Usage: ${prefix}npmstalk <package>

Command Name: pixabay
Command Description: Searches Pixabay for stock images.
Command Usage: ${prefix}pixabay <query>

Command Name: dictionary / define
Command Description: Fetches the definition of an English word.
Command Usage: ${prefix + command} <word>

Command Name: movie / imdb / movieinfo
Command Description: Fetches movie details (plot, ratings, actors) from OMDB.
Command Usage: ${prefix + command} <title>

Command Name: book
Command Description: Searches OpenLibrary for books.
Command Usage: ${prefix}book <title>

Command Name: recipe
Command Description: Fetches a recipe and instructions.
Command Usage: ${prefix}recipe <dish>

Command Name: recipe-ingredient
Command Description: Finds dishes containing a specific ingredient.
Command Usage: ${prefix}recipe-ingredient <ingredient>

Command Name: weather / forecast / temp
Command Description: Gets the current weather forecast for a location.
Command Usage: ${prefix + command} <city>

Command Name: ip / ipinfo / track-ip / trackip
Command Description: Retrieves Geo-Location info for an IP Address.
Command Usage: ${prefix + command} <ip>

Command Name: myip
Command Description: Displays the bot host's IP Address.
Command Usage: ${prefix}myip

Command Name: bible / verse
Command Description: Fetches a Bible verse.
Command Usage: ${prefix + command} <reference>

Command Name: quran / surah
Command Description: Fetches a Quran verse with Arabic, translation, and audio.
Command Usage: ${prefix + command} <reference>

Command Name: element
Command Description: Provides chemical details of an element from the periodic table.
Command Usage: ${prefix}element <name>

Command Name: tiktokstalk / tiktok-info / tiktok-stalk / tt-stalk
Command Description: Fetches TikTok profile stats (followers, following, bio).
Command Usage: ${prefix + command} <username>

Command Name: shazam / findaudio / find / identifyaudio
Command Description: Identifies a song from an audio/video snippet.
Command Usage: ${prefix + command} <reply audio/video>

Command Name: checkidch / idch
Command Description: Retrieves the ID and metadata of a WhatsApp Channel.
Command Usage: ${prefix + command} <channel link>

Command Name: ngl
Command Description: Sends an anonymous message to an NGL.link user.
Command Usage: ${prefix}ngl <username>:<message>

🎮 Fun & Games

Command Name: meme
Command Description: Sends a random meme from Reddit.
Command Usage: ${prefix}meme

Command Name: joke
Command Description: Sends a random joke.
Command Usage: ${prefix}joke

Command Name: dadjoke / dad-joke
Command Description: Sends a random dad joke.
Command Usage: ${prefix + command}

Command Name: prog / dev-joke
Command Description: Sends a random programming joke.
Command Usage: ${prefix + command}

Command Name: fact / funfact / fact2 / sciencefact / science-fact / mathfact / gamefact / game-fact / triviafact / trivia-fact
Command Description: Sends a random fact based on the category.
Command Usage: ${prefix + command}

Command Name: kaomoji / specialemoji / semoji
Command Description: Sends a Japanese text emoticon (e.g., kaomoji love).
Command Usage: ${prefix + command} <category>

Command Name: when / where / what / how
Command Description: Answers silly randomized questions.
Command Usage: ${prefix + command} <question>

Command Name: rate
Command Description: Rates something out of 100%.
Command Usage: ${prefix}rate <text>

Command Name: couple
Command Description: Ships two random members in the group.
Command Usage: ${prefix}couple

Command Name: soulmate
Command Description: Matches you with a random "soulmate" in the group.
Command Usage: ${prefix}soulmate

Command Name: truth / dare / tod
Command Description: Plays Truth or Dare.
Command Usage: ${prefix + command}

Command Name: quote / inspire / progquote / dev-quote / moviequote / movie-quote
Command Description: Sends an inspirational or themed quote.
Command Usage: ${prefix + command}

Command Name: pickupline / rizz
Command Description: Sends a random cheesy pickup line.
Command Usage: ${prefix + command}

Command Name: insult / roast
Command Description: Generates an insult aimed at a user.
Command Usage: ${prefix + command} <@user>

Command Name: breakupl / breakupline
Command Description: Sends a random breakup line.
Command Usage: ${prefix + command}

Command Name: compliment
Command Description: Gives a random compliment.
Command Usage: ${prefix}compliment

Command Name: checkme
Command Description: Generates a fake "personality check" profile for you.
Command Usage: ${prefix}checkme

Command Name: horoscope
Command Description: Fetches the daily horoscope for a zodiac sign.
Command Usage: ${prefix}horoscope <sign>

Command Name: 8ball
Command Description: Answers a yes/no question.
Command Usage: ${prefix}8ball <question>

Command Name: prohecy / fortune
Command Description: Tells a cryptic fortune.
Command Usage: ${prefix + command}

Command Name: ttc / ttt / tictactoe
Command Description: Starts a game of Tic-Tac-Toe.
Command Usage: ${prefix + command}

Command Name: delttc / delttt / delete-tictactoe
Command Description: Deletes an ongoing Tic-Tac-Toe session.
Command Usage: ${prefix + command}

Command Name: wordchain / wchain / chainword / wcg
Command Description: Plays a hardcore word chain game with the group.
Command Usage: ${prefix + command} <start/stop>

Command Name: rps
Command Description: Plays Rock-Paper-Scissors.
Command Usage: ${prefix}rps <rock/paper/scissors>

Command Name: rpsls
Command Description: Plays the Lizard-Spock variant of Rock-Paper-Scissors.
Command Usage: ${prefix}rpsls <rock/paper/scissors/lizard/spock>

Command Name: dice
Command Description: Rolls a 6-sided die.
Command Usage: ${prefix}dice

Command Name: coin
Command Description: Flips a coin (Heads/Tails).
Command Usage: ${prefix}coin

Command Name: guess
Command Description: Guess a number between 1 and 10 against the bot.
Command Usage: ${prefix}guess <number>

Command Name: math
Command Description: Starts a quick math challenge in the chat.
Command Usage: ${prefix}math

Command Name: emojiquiz
Command Description: Starts a quiz to guess the word for an emoji.
Command Usage: ${prefix}emojiquiz

Command Name: coinbattle / coin-battle
Command Description: Flips a coin against the bot.
Command Usage: ${prefix + command}

Command Name: numberbattle / numbattle / number-battle
Command Description: Guess a number between 1 and 50.
Command Usage: ${prefix + command} <number>

Command Name: trivia
Command Description: Plays a multiple-choice trivia question.
Command Usage: ${prefix}trivia

Command Name: ascii
Command Description: Creates ASCII text art.
Command Usage: ${prefix}ascii <text>

Command Name: coffee
Command Description: Sends a random aesthetic picture of a coffee cup.
Command Usage: ${prefix}coffee

🎨 Image Effects (Filters) & Text Logos

Command Name: carbon
Command Description: Turns code snippets into beautiful Carbon code images.
Command Usage: ${prefix}carbon <text / reply code>

Command Name: wanted / wasted / rainbow / trigger-meme / rip-meme / mnm / jail / invert
Command Description: Applies the specified visual effect/filter to an image.
Command Usage: ${prefix + command} <reply image>

Command Name: gfx / gfx2 -> gfx12
Command Description: Generates various text graphic logos (requires two texts separated by |).
Command Usage: ${prefix}gfx <text1> | <text2>

Command Name: glitchtext / writetext / advancedglow / typographytext / pixelglitch / neonglitch / flagtext / flag3dtext / deletingtext / blackpinkstyle / glowingtext / underwatertext / logomaker / cartoonstyle / papercutstyle / watercolortext / effectclouds / blackpinklogo / gradienttext / summerbeach / luxurygold / multicoloredneon / sandsummer / galaxywallpaper / 1917style / makingneon / royaltext / freecreate / galaxystyle / lighteffects
Command Description: Advanced text logo generators using ephoto360 styles.
Command Usage: ${prefix + command} <text>

🌸 Anime & Reactions

Command Name: animenews
Command Description: Fetches the top 5 currently airing/trending anime.
Command Usage: ${prefix}animenews

Command Name: character / animechar
Command Description: Looks up an anime character's bio and image.
Command Usage: ${prefix + command} <name>

Command Name: animerec / recommend
Command Description: Recommends anime globally, or based on a title provided.
Command Usage: ${prefix + command} [title]

Command Name: animesearch / anime-search
Command Description: Looks up information, scores, and synopsis for an anime.
Command Usage: ${prefix + command} <title>

Command Name: animewlp / anime-wallpaper / naturewlp
Command Description: Retrieves anime or nature wallpapers.
Command Usage: ${prefix + command}

Command Name: cry / kill / hug / pat / lick / kiss / bite / yeet / bully / bonk / wink / poke / nom / slap / smile / wave / awoo / blush / smug / glomp / happy / dance / cringe / cuddle / highfive / shinobu / handhold
Command Description: Sends an animated anime reaction GIF.
Command Usage: ${prefix + command}

Command Name: fox / koala / bird / panda / dog / cat
Command Description: Sends a random image of the specified animal.
Command Usage: ${prefix + command}

🔊 Audio Manipulation

(Reply to an audio file with these to apply sound filters)

Command Name: bass / blown / deep / earrape / fast / fat / nightcore / reverse / robot / slow / smooth / squirrel
Command Description: Applies a specific audio manipulation filter to an audio file via FFmpeg.
Command Usage: ${prefix + command} <reply audio>

🔞 NSFW (18+)

(Requires the nsfw on toggle to be active in the chat)

Command Name: nsfw
Command Description: Enables or disables NSFW commands in the group.
Command Usage: ${prefix}nsfw <on/off>

Command Name: waifu / waifu2 / rwaifu
Command Description: Sends random SFW/NSFW anime waifu images.
Command Usage: ${prefix + command}

Command Name: hentai
Command Description: Sends a short anime hentai video snippet.
Command Usage: ${prefix}hentai

Command Name: xnxxsearch / xvideosearch / pornsearch
Command Description: Searches adult sites for videos.
Command Usage: ${prefix + command} <query>

Command Name: xnxxdl / xvideodl
Command Description: Downloads a video from adult sites.
Command Usage: ${prefix + command} <link>

Command Name: paptt
Command Description: Sends random adult video/image snippets.
Command Usage: ${prefix}paptt

🚫 WhatsApp Ban/Unban Utilities

(For Educational Purposes)

Command Name: wabanv1 / wabanv2 / wabanv3 / wabanv4 / wabanv5 / wabanv6
Command Description: Attempts to submit automated suspension reports for a WhatsApp number.
Command Usage: ${prefix + command} <number>

Command Name: waunbanv1 / waunbanv2 / waunbanv3 / waunbanv4 / waunbanv5
Command Description: Attempts to submit automated unban appeals for a blocked number.
Command Usage: ${prefix + command} <number>
`;
};

module.exports = { getBotDocs, getReadmeInfo };
