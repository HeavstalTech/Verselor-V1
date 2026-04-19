// Start/Plugins/games/multiplayer.js
import { TicTacToe, WordChain } from "#lib/game.js";
import { parseMention } from "#System/Data1.js";

const initGameSpace = (BotNum) => {
    if (!global.game) global.game = {};
    if (!global.game[BotNum]) global.game[BotNum] = {};
    if (!global.wordChainGames) global.wordChainGames = new Map();
};

export default [
    {
        name: 'ttc',
        aliases: ['ttt', 'tictactoe'],
        category: 'games',
        description: 'Starts a game of Tic-Tac-Toe.',
        usage: '%prefix%ttc',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, BotNum } = context;
            initGameSpace(BotNum);
            
            let myGames = global.game[BotNum];
            
            if (Object.values(myGames).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
                return Vreply('⚠️ You are already in an ongoing game of TicTacToe!');
            }
            
            let room = Object.values(myGames).find(room => room.state === 'WAITING' && (text ? room.name === text : true));
            
            if (room) {
                Vreply('🎮 Partner found! Game starting...');
                room.o = m.chat;
                room.game.playerO = m.sender;
                room.state = 'PLAYING';
                
                clearTimeout(room.timeout);
                room.timeout = setTimeout(async () => {
                    if (global.game[BotNum]?.[room.id]) {
                        await HeavstalTech.sendMessage(room.x, { text: '⏳ TicTacToe timed out due to 5 minutes of inactivity.' });
                        if (room.x !== room.o) {
                            await HeavstalTech.sendMessage(room.o, { text: '⏳ TicTacToe timed out due to 5 minutes of inactivity.' });
                        }
                        delete global.game[BotNum][room.id];
                    }
                }, 5 * 60 * 1000);

                let arr = room.game.render().map(v => {
                    return { X: '❌', O: '⭕', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣' }[v];
                });
                
                let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

First ✅: @${room.game.currentTurn.split('@')[0]}

Type *surrender* to give up and admit defeat`;
                
                if (room.x !== room.o) await HeavstalTech.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m });
                await HeavstalTech.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m });
            } else {
                room = {
                    id: 'tictactoe-' + (+new Date),
                    x: m.chat,
                    o: '',
                    game: new TicTacToe(m.sender, 'o'),
                    state: 'WAITING'
                };
                if (text) room.name = text;

                room.timeout = setTimeout(async () => {
                    if (global.game[BotNum]?.[room.id]) {
                        await HeavstalTech.sendMessage(room.x, { text: '⏳ TicTacToe room expired (nobody joined within 5 minutes).' });
                        delete global.game[BotNum][room.id];
                    }
                }, 5 * 60 * 1000);

                Vreply(`Waiting for a partner... type *${prefix}${command}* to join!` + (text ? ` (Room: ${text})` : ''));
                myGames[room.id] = room;
            }
        }
    },
    {
        name: 'delttc',
        aliases: ['delttt', 'delete-tictactoe'],
        category: 'games',
        description: 'Deletes an ongoing Tic-Tac-Toe session.',
        usage: '%prefix%delttc',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum } = context;
            initGameSpace(BotNum);
            
            let room = Object.values(global.game[BotNum]).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender));
            
            if (room) {
                clearTimeout(room.timeout);
                delete global.game[BotNum][room.id];
                await HeavstalTech.sendMessage(m.chat, { text: '✅ Successfully deleted your TicTacToe session.' }, { quoted: m });
            } else {
                Vreply('❌ You are not in any active TicTacToe session.');
            }
        }
    },
    {
        name: 'wordchain',
        aliases: ['wchain', 'chainword', 'wcg'],
        category: 'games',
        description: 'Plays a hardcore word chain game with the group.',
        usage: '%prefix%wordchain <start/stop>',
        groupOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { args, from, Vreply, prefix, command, isAdmin, isCreator, footer, BotNum } = context;
            const action = args[0] ? args[0].toLowerCase() : '';
            initGameSpace(BotNum);
            
            const wcgKey = `${BotNum}_${from}`;

            if (action === 'start' || action === 'on') {
                if (global.wordChainGames.has(wcgKey)) return Vreply(`⚠️ A Word Chain game is already running! Use *${prefix + command} stop* to end it.`);
                
                const game = new WordChain(m.sender);
                global.wordChainGames.set(wcgKey, game);
                
                const startMsg = `╭━━━━━━━━━━━━━━━╮
│ 🔗 *HARDCORE WORD CHAIN*
├━━━━━━━━━━━━━━━┤
│ @${m.sender.split("@")[0]} started a game!
│
│ 📜 *RULES:*
│ • Must start with the last 
│   letter of the previous word.
│ • No repeated words.
│ • Must be valid English.
│ • *WARNING:* Time limits
│   and Min-Length requirements
│   get harder as you play!
│
│ ⏱️ 30 seconds to join
│ 👥 Type *join* to play!
│ Use *${prefix + command} stop* to end the game!
╰━━━━━━━━━━━━━━━╯`;

                await HeavstalTech.sendMessage(from, {
                    text: startMsg,
                    mentions: [m.sender]
                }, { quoted: m });
                
                // Join phase timer
                setTimeout(async () => {
                    const g = global.wordChainGames.get(wcgKey);
                    if (!g || !g.joinPhase) return;
                    
                    if (g.players.length < 2) {
                        global.wordChainGames.delete(wcgKey);
                        return HeavstalTech.sendMessage(from, { text: "❌ Word Chain cancelled - need at least 2 players to start!" });
                    }
                    
                    const firstPlayer = g.startGame();
                    const playerList = g.players.map((p, i) => `${i + 1}. @${p.id.split("@")[0]}`).join("\n");
                    
                    const beginsMsg = `╭━━━━━━━━━━━━━━━╮
│ 🔗 *WORD CHAIN STARTS!*
├━━━━━━━━━━━━━━━┤
│ 👥 *Players:*
${playerList}
├━━━━━━━━━━━━━━━┤
│ 🎮 @${firstPlayer.id.split("@")[0]} goes first!
│ 🔤 Start with ANY word
│ 📏 Min Length: *${g.minWordLength} letters*
│ ⏱️ ${g.timeLimit} seconds
╰━━━━━━━━━━━━━━━╯`;

                    await HeavstalTech.sendMessage(from, {
                        text: beginsMsg,
                        mentions: g.players.map(p => p.id)
                    });
                    
                    if (typeof startWordChainTimer === 'function') {
                        startWordChainTimer(HeavstalTech, from, g, wcgKey); // Pass the unique namespaced key!
                    }
                }, 30000);

            } else if (action === 'stop' || action === 'off') {
                const game = global.wordChainGames.get(wcgKey);
                if (!game) return Vreply("❌ No Word Chain game is running.");
                
                if (game.host !== m.sender && !isAdmin && !isCreator) {
                    return Vreply("❌ Only the host or an Admin can stop the game!");
                }
                
                if (game.turnTimeout) clearTimeout(game.turnTimeout);
                
                const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
                let scoresText = "";
                const mentions = [];
                
                sortedPlayers.forEach((p, i) => {
                    mentions.push(p.id);
                    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "▪️";
                    scoresText += `${medal} @${p.id.split("@")[0]} → ${p.score} pts\n`;
                });
                
                const stopMsg = `╭━━━━━━━━━━━━━━━╮
│ 🔗 *WORD CHAIN - STOPPED*
├━━━━━━━━━━━━━━━┤
│ 🛑 Game force-stopped.
├━━━━━━━━━━━━━━━┤
│ 📊 *FINAL SCORES:*
${scoresText}│ 📝 Total chain: ${game.chainLength} words
╰━━━━━━━━━━━━━━━╯`;

                await HeavstalTech.sendMessage(from, {
                    text: stopMsg,
                    mentions
                });
                
                global.wordChainGames.delete(wcgKey);

            } else {
                const usageMsg = `*🕹️ Word Chain Game*

*Usage:*
${prefix + command} start - Starts a new game
${prefix + command} stop - Ends the current game

${footer}`;

                return Vreply(usageMsg);
            }
        }
    }
];
