// lib/Defult/UpdateChecker.js
// © Copyright HEAVSTAL TECH™

const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');
const readline = require('readline');
const { isCloud } = require(path.join(__dirname, '..', '..', 'System', 'Data1.js'));

require(path.join(__dirname, '..', '..', 'settings', 'config'));

const tokenPart1 = 'github_pat_';
const tokenPart2 = 'YOUR_NEW_TOKEN_HERE'; 
const REPO_AUTH = tokenPart1 + tokenPart2;
const REPO_URL = "github.com/HeavstalTech/Verselor-V1.git";

const question = (text) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(text, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

const formatVersion = (versionArray) => {
    if (Array.isArray(versionArray)) {
        return versionArray.join('.');
    }
    return versionArray;
};

const runUpdate = async () => {
    console.log(chalk.cyan('🔄 Initializing update process...'));
    
    const gitCommand = `git pull https://${REPO_AUTH}@${REPO_URL}`;

    exec(gitCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(chalk.red('\n❌ Update Failed!'));
            console.error(chalk.yellow(`Error: ${err.message}`));
            
            if (stderr.includes('Conflict')) {
                console.log(chalk.red('⚠️ Merge Conflict detected. You may need to reset your code.'));
            }
            if (stderr.includes('Authentication') || stderr.includes('403')) {
                console.log(chalk.red('⚠️ Authentication failed. Check your GitHub PAT.'));
            }
            
            process.exit(1);
        } else {
            console.log(chalk.green('\n✅ Update Successful!'));
            console.log(stdout);
            console.log(chalk.cyan('🔄 Restarting Bot to apply changes...'));
            process.exit(1); 
        }
    });
};

const checkUpdate = async () => {
    const localVersion = global.version || "1.0.0"; 
    const remoteUrl = "https://raw.githubusercontent.com/HeavstalTech/Verselor-V1/main/lib/Default/Verselor-Version.json";
    
    try {
        const response = await fetch(remoteUrl);
        
        if (!response.ok) {
            if (response.status === 404) throw new Error("404_NOT_FOUND");
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const remoteData = await response.json();
        const remoteVersion = formatVersion(remoteData);

        if (remoteVersion !== localVersion) {
            if (isCloud()) {
            console.log(chalk.cyan('[CLOUD DETECTED] Auto-handling update to prevent terminal hang.'));
            console.log(chalk.green(`Initializing Silent Auto-Update to v${remoteVersion}...`));
            await runUpdate(); 
            return true; 
            }
            const updatePref = global.db?.data?.settings?.askForUpdates;

            if (updatePref === 'N') {
                console.log(chalk.yellow(`\n⚠️ Update to v${remoteVersion} is available. (Terminal prompts muted)`));
                console.log(chalk.gray(`   (Use the .update command manually in chat)\n`));
                return false; 
            }

            if (updatePref === 'Y') {
                console.log(chalk.green(`\n🚀 Auto-updating to v${remoteVersion} based on your saved preference...`));
                await runUpdate();
                return true;
            }

            console.clear();
            console.log(chalk.bold.yellow('\n📦 UPDATE AVAILABLE'));
            console.log(`----------------------------------------`);
            console.log(`🔹 Current Version : ${chalk.red(localVersion)}`);
            console.log(`🔹 Latest Version  : ${chalk.green(remoteVersion)}`);
            console.log(`----------------------------------------`);

            const answer = await question(chalk.greenBright(`\n❓ You are using an outdated version of Verselor-V1.\n   Would you like to update to the Latest version?\n\n   Reply with ${chalk.bold.white('Y')} (Yes) or ${chalk.bold.white('N')} (No)\n   > `));

            if (answer.toLowerCase() === 'y') {
                if (global.db) {
                    global.db.data.settings.askForUpdates = 'Y';
                    await global.db.write();
                    console.log(chalk.green(`\n✅ Saved! Future updates will install automatically without terminal prompts.`));
                }
                await runUpdate();
                return true; 
            } else {
                if (global.db) {
                    global.db.data.settings.askForUpdates = 'N';
                    await global.db.write();
                    console.log(chalk.green(`\n✅ Saved! The bot will NEVER interrupt your startup for updates again.`));
                }
                console.log(chalk.yellow(`\n⚠️ Proceeding With The Outdated Version Of Verselor-V1`));
                console.log(`   Version: ${localVersion}\n`);
                return false; 
            }

        } else {
            console.log(chalk.green(`Running Verselor-V1 on Latest Version (${localVersion})`));
            return false;
        }

    } catch (error) {
        console.log(chalk.red(`⚠️ Could not check for updates.`));
        
        if (error.message === "404_NOT_FOUND") {
             console.log(chalk.yellow("Hint: Version file not found on remote repo."));
        } else {
             console.log(chalk.gray(`Reason: ${error.message}`));
        }
        return false;
    }
};

module.exports = checkUpdate;
