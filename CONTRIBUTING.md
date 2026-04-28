# Contributing to Verselor V1

First off, thank you for considering contributing to Verselor V1. As an almost completely open-source project, community contributions are essential to expanding the bot's capabilities, fixing bugs, and optimizing performance.

## Code of Conduct
By participating in this project, you agree to maintain a professional, respectful, and collaborative environment for all developers and users.

## How to Contribute

### 1. Fork and Clone
1. Fork the repository by clicking the **Fork** button at the top right of the GitHub page.
2. Clone your fork locally to your development environment:
   ```bash
   git clone https://github.com/HeavstalTech/Verselor-V1.git
   cd Verselor-V1-main
   ```

### 2. Create a Branch
Create a new branch specific to your feature or bug fix:
```bash
git checkout -b feature/custom-plugin-name
# or
git checkout -b fix/issue-description
```

### 3. Make Your Changes
Verselor V1 utilizes a modular ECMAScript Module (ESM) architecture. 

**Adding a Plugin?**
To add a new command, create a new `.js` file inside the appropriate category folder within `Start/Plugins/` (e.g., `Start/Plugins/custom/mycmd.js`). Use the following template:

```javascript
export default [
    {
        name: 'mycmd',
        aliases: ['cmd1', 'cmd2'],
        category: 'misc',
        description: 'A simple custom command',
        usage: '%prefix%mycmd',
        ownerOnly: false, // "true" to restrict to owners and sudos only
        groupOnly: false, // "true" to set to group only command 
        privateOnly: false, // "true" to set to private chat only (non groups) command
        adminOnly: false, // "true" to set to admin only command in groups
        botAdminOnly: false, // "true" to make only useable if bot is admin in group
        premiumOnly: false, // "true" to set to premium users only command.

        execute: async (HeavstalTech, m, context) => {
            // The context object provides easy access to variables and helper functions
            const { Vreply, pushname, prefix } = context;
        /** 
        `context` provides you with the following:
        see other open plugins to know how to use them properly
    
        text, q, args, prefix, command, budy,
        isOwner, isCreator, isAdmin, isBotAdmin, isGroup, isPremium,
        pushname, BotNum, sender, from,
        quoted, mime, isMedia, fatkuns,
        Vreply, reply, sendImage,
        participants, groupName, groupMetadata,
        MenuStyle, time, todayDateWIB,
        Owner, setsudo, ban, BANNED_GROUP,
        store, chatUpdate,
        loading, sendMenu, followNewsletter, autoJoinGroup, Styles,
        channelIds, ReplyImageUrls, promiseplay_url
        **/     
            // Your command logic here
            await Vreply(`Hello ${pushname}! You just used the ${prefix}mycmd command.`);
           // Alternatively use `HeavstalTech.sendMessage()`
        }
    }
];
```

### 4. Commit and Push
Commit your changes with a clear, descriptive commit message explaining what was modified or added:
```bash
git add .
git commit -m "Added a new custom AI image generator plugin"
git push origin feature/custom-plugin-name
```

### 5. Open a Pull Request (PR)
1. Navigate back to the original **HeavstalTech/Verselor-V1** repository.
2. Click **Compare & pull request**.
3. Provide a clear description of your Pull Request, referencing any related issue numbers.
4. Submit the PR for review.

## Bug Reports
If you encounter a bug, please check the [Issues](https://github.com/HeavstalTech/Verselor-V1/issues) tab to ensure it has not already been reported. If it is a new issue, please provide:
* A clear description of the bug.
* Steps to reproduce the issue.
* The error log from your console.

---
*By contributing to Verselor V1, you agree that your contributions will be licensed under the project's End User License Agreement (EULA).*
