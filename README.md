<h1 align="center">VERSELOR-V1 BY HEAVSTAL TECH™<br></h1>
<p align="center">
 <a><img src='https://i.imgur.com/LyHic3i.gif'/></a><a><img src='https://i.imgur.com/LyHic3i.gif'/></a>
<img src="https://files.catbox.moe/g8pxls.png" width="300" height="300"/>
</p>

<p align="center">
<a href="https://github.com/HeavstalTech/Verselor-V1/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/HeavstalTech/Verselor-V1?color=blue&style=flat-square"></a>
<a href="https://github.com/HeavstalTech/Verselor-V1/network/members"><img title="Forks" src="https://img.shields.io/github/forks/HeavstalTech/Verselor-V1?color=red&style=flat-square"></a>
<a href="https://github.com/HeavstalTech/Verselor-V1/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/HeavstalTech/Verselor-V1?label=Watchers&color=blue&style=flat-square"></a>
<a href="https://github.com/HeavstalTech/Verselor-V1"><img title="Open Source" src="https://img.shields.io/badge/Author-Heavstal%20Tech-red?v=103"></a>
<a href="https://github.com/HeavstalTech/Verselor-V1/"><img title="Size" src="https://img.shields.io/github/repo-size/HeavstalTech/Verselor-V1?style=flat-square&color=green"></a>
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FHeavstalTech%2FVerselor-V1&count_bg=%2379C83D&title_bg=%23555555&icon=probot.svg&icon_color=%2300FF6D&title=hits&edge_flat=false"/></a>
<a href="https://github.com/HeavstalTech/Verselor-V1/graphs/commit-activity"><img height="20" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"></a>&nbsp;&nbsp;
</p>
 
## BOT INFO
 
**┣ Name:** _Verselor V1_<br>
**┣ Description:** _A Powerful, Lightweight, Multi-Device, Multifunctional, Multi-Purpose, & Multi-Tenant WhatsApp bot, built by Heavstal Tech. 2026_<br>
**┣ Version:** _1.0.0 (Latest)_<br>
**┣ Maintained:**  _[ YES ]_<br>
**┣ Developer:** _HEAVSTAL TECH_<br>
**┣ Total Commands:** _570 (as of Thur 19, March, 2026)_<br>
**┣ Created On:** _January 10th, 2026_<br>


## BOT SETTINGS (Default)

**┣ Prefix:** _[ . ]_<br>
**┣ Menu Style:** _v1_<br>
**┣ Thumbnail:** _[HERE](https://files.catbox.moe/a2ullf.jpg)_<br>
**┣ HT API KEY:** _[GET HERE](https://heavstal-tech.vercel.app/credentials)_<br>
**┣ Public Mode:** _On_<br>
**┣ Sleep Mode:** _Off_<br>
**┣ Group Only:** _Off_<br>
**┣ Private Only:** _Off_<br>
**┣ StartUp Message:** _On_<br>
**┣ Auto React:** _Off_<br>
**┣ Auto Record:** _Off_<br>
**┣ Auto Typing:** _Off_<br>
**┣ Auto Read:** _Off_<br>
**┣ Auto RecordType:** _Off_<br>
**┣ AutoView Status:** _Off_<br>
**┣ Auto Bio:** _Off_<br>
**┣ Warn Limit:** _3_<br>
**┣ Time Zone:** _Africa/Lagos_<br>

---

### ☁️ CLOUD DEPLOYMENT

# While Using Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/HeavstalTech/Verselor-V1)<br>
**Important Note:** _When deploying to Render, make sure to add your `MONGODB_URI` in the Environment Variables._

# While Using Replit
[![Run on Replit](https://replit.com/badge/github/HeavstalTech/Verselor-V1)](https://replit.com/new/github/HeavstalTech/Verselor-V1)<br>
**Note:** _Click "Run", wait for dependencies to install, and follow the instructions in the console._

# While Using Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/HeavstalTech/Verselor-V1)<br>
<br>
**BUILDPACKS:**
1. `heroku/nodejs`
2. `https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git`
3. `https://github.com/clhuang/heroku-buildpack-webp-binaries.git`

---

### 📂 WEB PANEL DEPLOYMENT (Upload Method)
*For users using panels like Pterodactyl, Discord Hosting Sites, or cPanel.*

# Method 1: Using Pair Code
> 1. Download the complete code as a ZIP file.
> 2. Upload the file to your Node.js server/panel.
> 3. Unzip & Enter The "Verselor-V1-main" folder, select all files and move them to the root directory `../`.
> 4. Set the Node version of your hosting environment to version **20x** or later (Recommended).
> 5. Navigate to your server console and start the deployment (Click Start or run `npm install && npm start`).
> 6. Wait approximately 2 minutes for dependencies to install.
> 7. When prompted in the console, **input your WhatsApp number** (Country Code + Number).
> 8. A Code will appear. Go to WhatsApp → Linked Devices → Link a Device → Link with phone number & Enter the code.

# Method 2: Using QR Code
> 1. Open `settings/config.js` and set `usePairingCode` to `false`.
> 2. Follow steps 1-5 from above (Upload, Unzip, Start).
> 3. A QR Code will appear in the console.
> 4. Go to WhatsApp → Linked Devices → Link a Device and scan the QR code.

---

### 💻 COMMAND LINE INSTALLATION (Termux/VPS)

## `Requirements`
* [Node.js](https://nodejs.org/en/) (Version 20+)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://ffmpeg.org/download.html)
* Any text editor (VS Code, Notepad, etc)

## `For Termux Users`
**Note:** Do not download Termux from the Play Store. Download it from [F-Droid Here](https://f-droid.org/en/packages/com.termux/).

1. **Update System & Install Dependencies:**
```bash
apt update && apt upgrade -y
pkg install git nodejs ffmpeg imagemagick libwebp -y
pkg install yarn
```

2. **Clone Repository:**
```bash
git clone https://github.com/HeavstalTech/Verselor-V1.git
cd Verselor-V1-main
```

3. **Install & Start:**
```bash
npm install
npm start
```
*Follow the prompts in the terminal to enter your number and get the Pairing Code.*

## `For VPS / Ubuntu / Linux`
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git nodejs ffmpeg imagemagick libwebp -y
git clone https://github.com/HeavstalTech/Verselor-V1.git
cd Verselor-V1-main
npm install
npm start
```

---


## Join Our Channels To Stay Updated
<p align="center">
<a href="https://youtube.com/@Heavstal_Tech"><img src="https://img.shields.io/badge/YouTube-ff0000?style=for-the-badge&logo=youtube&logoColor=ff000000&link=https://youtube.com/@Heavstal_Tech" /></a><br>
<a href="https://whatsapp.com/channel/0029VbBcg80KwqSR7dr7do1D"><img src="https://img.shields.io/badge/WhatsApp Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&link=https://whatsapp.com/channel/0029VaG9VfPKWEKk1rxTQD20" /></a><br>
<a href="https://t.me/promisemdv1"><img src="https://img.shields.io/badge/Telegram-00FFFF?style=for-the-badge&logo=telegram&logoColor=white" /></a>
<a href="https://chat.whatsapp.com/F0gAKf6g7a18sY5WqtWxVt?mode=ems_copy_t"><img src="https://img.shields.io/badge/WhatsApp Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" /></a>
</p>


## Buy Me A Coffee / Donate

- [Bank Transfer](https://heavstal-tech.vercel.app/buy-me-a-coffee)
- [Paystack](https://heavstal-tech.vercel.app/buy-me-a-coffee)

## Bot Support & Group Chats

- [WhatsApp GC](https://chat.whatsapp.com/F0gAKf6g7a18sY5WqtWxVt?mode=ems_copy_t)
- [Telegram GC](https://t.me/+OXpT1vvQ5K81MmVk)


## ⚠️ Disclaimers

1.
**This bot is designed to help reduce spam**, but it’s still important to note the following:

- This project uses the **Baileys** library, which is **unofficial**.
- WhatsApp does **not support third-party bots**.

Excessive use, mass messaging, or repeated automated actions **may trigger WhatsApp’s anti-spam system** and could lead to account restrictions or bans.

🔧 **To reduce the risk of this slightly:**
- Consider turning **off startup messages** in with the command after deployment....

## Note: 

**This bot is still under development and it's provided files here are incomplete, trying to deploy this current script as it is will cause a deployment/build failure...**


## License

This project is licensed under the **MIT License**.

## Copyright Notice:

You may obtain a copy of this file by any means, most part of this file is open source any you may copy this parts for personal use but you must give credit to **Heavstal Tech** but trying to de-obfuscated the obfuscated part of this file, re-brand or do any unauthorized activity with this file is strictly prohibited and may lead to legal issues.


<h2 align="center">© A Product Of Heavstal Tech™<br></h2>
<a><img src='https://i.imgur.com/LyHic3i.gif'/></a><a><img src='https://i.imgur.com/LyHic3i.gif'/></a>
