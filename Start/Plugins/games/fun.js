// Start/Plugins/games/fun.js
// © Heavstal Tech™
export default [
    {
        name: '8ball',
        aliases: [],
        category: 'games',
        description: 'Answers a yes/no question.',
        usage: '%prefix%8ball <question>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            const answers = [
                "It is certain ✅", "Without a doubt ✅", "You may rely on it ✅", "There's a good chance ✅", "In due time, *Yes* ✅", "It's a sight for sore eyes 🌹👌", "👑 As I predicted: YES. (Now bow.)",
                "Ask again later 🤔", "Cannot predict now 🤷", "We never can tell now, can we? 😅🥀", "Lol, I'd rather not say 🗿", "Damn, it's foggy, even for me 😶‍🌫️",
                "Don't count on it ❌", "My sources say no ❌", "Very doubtful ❌", "Lol 😂, Keep Hoping", "Nah, Find something better to do ❌", "You can keep going, but it's a giant maze, I'd say No 🥀",
                "It's a complicated situation 🥲", "odds are 20 - 100, seems they're not in your favor kid", "Maybe in the afterlife 😂", "🙅‍♀️ Absolutely not. (Try again in 5 business years.)", "🤡 Maybe, if clowns ran the world. (Oh wait…)", "💀 My sources say *you don’t wanna know.*"
            ];
            if (!text) return Vreply(`❌ Ask me a question! Example: ${prefix}8ball Will I get rich?`);
            const answer = answers[Math.floor(Math.random() * answers.length)];
            await HeavstalTech.sendMessage(m.chat, { text: `🎱 Question: ${text}\n📑 Answer: ${answer}` }, { quoted: m });
        }
    },
    {
        name: 'coin',
        aliases: [],
        category: 'games',
        description: 'Flips a coin (Heads/Tails).',
        usage: '%prefix%coin',
        execute: async (HeavstalTech, m) => {
            const result = Math.random() < 0.5 ? "🪙 Heads" : "🪙 Tails";
            await HeavstalTech.sendMessage(m.chat, { text: `🎲 Coin Flip Result: ${result}` }, { quoted: m });
        }
    },
    {
        name: 'dice',
        aliases: [],
        category: 'games',
        description: 'Rolls a 6-sided die.',
        usage: '%prefix%dice',
        execute: async (HeavstalTech, m) => {
            const roll = Math.floor(Math.random() * 6) + 1;
            await HeavstalTech.sendMessage(m.chat, { text: `🎲 You rolled a ${roll}!` }, { quoted: m });
        }
    },
    {
        name: 'rps',
        aliases: [],
        category: 'games',
        description: 'Plays Rock-Paper-Scissors.',
        usage: '%prefix%rps <rock/paper/scissors>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`❌ Choose rock, paper, or scissors. Example: ${prefix}rps rock`);
            const choices = ["rock", "paper", "scissors"];
            const userChoice = text.toLowerCase();
            if (!choices.includes(userChoice)) return Vreply("❌ Invalid choice! Use rock, paper, or scissors.");
            const botChoice = choices[Math.floor(Math.random() * choices.length)];
            let result = "";
            if (userChoice === botChoice) result = "🤝 It's a tie!";
            else if ((userChoice === "rock" && botChoice === "scissors") || (userChoice === "paper" && botChoice === "rock") || (userChoice === "scissors" && botChoice === "paper")) result = "🎉 You win!";
            else result = "😢 You lose!";
            await HeavstalTech.sendMessage(m.chat, { text: `🪨 You chose: ${userChoice}\n🤖 Bot chose: ${botChoice}\n\n${result}` }, { quoted: m });
        }
    },
    {
        name: 'rpsls',
        aliases: [],
        category: 'games',
        description: 'Plays the Lizard-Spock variant of Rock-Paper-Scissors.',
        usage: '%prefix%rpsls <rock/paper/scissors/lizard/spock>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix } = context;
            if (!text) return Vreply(`❌ Choose rock, paper, scissors, lizard, or spock. Example: ${prefix}rpsls spock`);
            const choices = ["rock", "paper", "scissors", "lizard", "spock"];
            const userChoice = text.toLowerCase();
            if (!choices.includes(userChoice)) return Vreply("❌ Invalid choice! Use rock, paper, scissors, lizard, or spock.");

            const botChoice = choices[Math.floor(Math.random() * choices.length)];
            const winMap = {
                rock: ["scissors", "lizard"],
                paper: ["rock", "spock"],
                scissors: ["paper", "lizard"],
                lizard: ["spock", "paper"],
                spock: ["scissors", "rock"]
            };

            let result = "";
            if (userChoice === botChoice) result = "🤝 It's a tie!";
            else if (winMap[userChoice].includes(botChoice)) result = "🎉 You win!";
            else result = "😢 You lose!";

            await HeavstalTech.sendMessage(m.chat, { text: `🪨 You chose: ${userChoice}\n🤖 Bot chose: ${botChoice}\n\n${result}` }, { quoted: m });
        }
    },
    {
        name: 'guess',
        aliases: [],
        category: 'games',
        description: 'Guess a number between 1 and 10 against the bot.',
        usage: '%prefix%guess <number>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply } = context;
            const number = Math.floor(Math.random() * 10) + 1;
            if (!text) return Vreply("❌ Guess a number between 1 and 10. Example: guess 7");
            const guess = parseInt(text);
            if (isNaN(guess) || guess < 1 || guess > 10) return Vreply("❌ Invalid number! Choose 1–10.");
            
            let msg = `*🎯 You guessed:* ${guess}\n*🤖 Bot chose:* ${number}\n`;
            msg += guess === number ? "🎉 You guessed it! Congrats!" : "😢 Wrong guess! Try again.";
            await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
        }
    },
    {
        name: 'coinbattle',
        aliases: ['coin-battle'],
        category: 'games',
        description: 'Flips a coin against the bot.',
        usage: '%prefix%coinbattle',
        execute: async (HeavstalTech, m) => {
            const userFlip = Math.random() < 0.5 ? "Heads" : "Tails";
            const botFlip = Math.random() < 0.5 ? "Heads" : "Tails";
            let msg = `🪙 You flipped: ${userFlip}\n🤖 Bot flipped: ${botFlip}\n`;
            msg += userFlip === botFlip ? "🎉 You win!" : "😢 You lose!";
            await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
        }
    },
    {
        name: 'numberbattle',
        aliases: ['numbattle', 'number-battle'],
        category: 'games',
        description: 'Guess a number between 1 and 50.',
        usage: '%prefix%numberbattle <number>',
        execute: async (HeavstalTech, m, context) => {
            const { text, prefix, command, Vreply } = context;
            const number = Math.floor(Math.random() * 50) + 1;
            if (!text) return Vreply(`❌ Guess a number between 1 and 50. Example: ${prefix}${command} 10`);
            const guess = parseInt(text);
            let msg = `🎯 Your guess: ${guess}\n🎲 Target number: ${number}\n`;
            msg += guess === number ? "🎉 Perfect guess!" : guess > number ? "⬇️ Too high!" : "⬆️ Too low!";
            await HeavstalTech.sendMessage(m.chat, { text: msg }, { quoted: m });
        }
    },
    {
        name: 'math',
        aliases: [],
        category: 'games',
        description: 'Starts a quick math challenge in the chat.',
        usage: '%prefix%math',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum } = context;
            if (!global.game) global.game = {};
            if (!global.game[BotNum]) global.game[BotNum] = {};
            
            if (global.game[BotNum][m.chat]) return Vreply("⚠️ A game is already running in this chat!");

            const a = Math.floor(Math.random() * 100) + 1;
            const b = Math.floor(Math.random() * 100) + 1;
            const operators = ['+', '-', '*'];
            const op = operators[Math.floor(Math.random() * operators.length)];
            
            let result;
            if (op === '+') result = a + b;
            if (op === '-') result = a - b;
            if (op === '*') result = a * b;

            Vreply(`*🔢 MATH CHALLENGE*\n\nSolve: *${a} ${op} ${b}*\n\n⏱️ *Time Limit:* 15 Seconds\n💰 *Reward:* ₹250\n\n_Type the answer directly!_`);

            global.game[BotNum][m.chat] = {
                type: 'math',
                answer: result,
                timeout: setTimeout(() => {
                    if (global.game[BotNum]?.[m.chat]) {
                        HeavstalTech.sendMessage(m.chat, { text: `⏰ *TIME'S UP!*\n\nThe correct answer was *${result}*.\nBetter luck next time!` });
                        delete global.game[BotNum][m.chat];
                    }
                }, 15000)
            };
        }
    },
    {
        name: 'emojiquiz',
        aliases: [],
        category: 'games',
        description: 'Starts a quiz to guess the word for an emoji.',
        usage: '%prefix%emojiquiz',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum } = context;
            if (!global.game) global.game = {};
            if (!global.game[BotNum]) global.game[BotNum] = {};
            
            if (global.game[BotNum][m.chat]) return Vreply("⚠️ A game is already running in this chat!");

            const quizzes = [
                { emoji: "🐍", answer: "snake" }, { emoji: "🍎", answer: "apple" }, { emoji: "🏎️", answer: "car" },
                { emoji: "🎸", answer: "guitar" }, { emoji: "🏠", answer: "house" }, { emoji: "🦠", answer: "bug" },
                { emoji: "🐌", answer: "snail" }, { emoji: "🦓", answer: "zebra" }, { emoji: "🎁", answer: "gift" },
                { emoji: "🐒", answer: "monkey" }, { emoji: "🧊", answer: "ice" }, { emoji: "🍿", answer: "popcorn" },
                { emoji: "👻", answer: "ghost" }, { emoji: "🧽", answer: "sponge" }, { emoji: "🧲", answer: "magnet" },
                { emoji: "🔔", answer: "bell" }, { emoji: "🇳🇬", answer: "nigeria" }, { emoji: "🇮🇱", answer: "israel" },
                { emoji: "🍪", answer: "cookie" }, { emoji: "🍔", answer: "hamburger" }, { emoji: "🍕", answer: "pizza" },
                { emoji: "🧀", answer: "cheese" }, { emoji: "🥚", answer: "egg" }, { emoji: "🥜", answer: "grandnut" },
                { emoji: "🍞", answer: "bread" }, { emoji: "🥑", answer: "avocado" }, { emoji: "🥦", answer: "mushroom" },
                { emoji: "🌽", answer: "corn" }, { emoji: "🧅", answer: "onion" }, { emoji: "🥕", answer: "carrot" },
                { emoji: "🌶️", answer: "peppe" }, { emoji: "🍅", answer: "tomato" }, { emoji: "🍇", answer: "grape" },
                { emoji: "🍌", answer: "banana" }, { emoji: "🍍", answer: "pineapple" }, { emoji: "🍉", answer: "watermelon" },
                { emoji: "🦁", answer: "lion"}, { emoji: "🐬", answer: "dolphin"}, { emoji: "🦉", answer: "owl"},
                { emoji: "🐘", answer: "elephant"}, { emoji: "🐼", answer: "panda"}, { emoji: "🦋", answer: "butterfly"},
                { emoji: "🐝", answer: "bee"}, { emoji: "🦖", answer: "dinosaur"}, { emoji: "🚀", answer: "rocket"},
                { emoji: "🛸", answer: "ufo"}, { emoji: "🧸", answer: "teddy"}, { emoji: "🎮", answer: "game"},
                { emoji: "📱", answer: "phone"}, { emoji: "💡", answer: "light"}, { emoji: "🕯️", answer: "candle"},
                { emoji: "🛏️", answer: "bed"}, { emoji: "🪑", answer: "chair"}, { emoji: "🧼", answer: "soap"},
                { emoji: "🪞", answer: "mirror"}, { emoji: "🪜", answer: "ladder"}, { emoji: "🧹", answer: "broom"},
                { emoji: "🪠", answer: "plunger"}, { emoji: "🧻", answer: "tissue"}, { emoji: "🪤", answer: "trap"},
                { emoji: "🧯", answer: "extinguisher"}, { emoji: "🪓", answer: "axe"}, { emoji: "🪙", answer: "coin"},
                { emoji: "🧭", answer: "compass"}, { emoji: "🪁", answer: "kite"}, { emoji: "🪃", answer: "boomerang"}
            ];

            const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

            Vreply(`*🧩 EMOJI QUIZ*\n\nGuess the name of this object:\n${quiz.emoji}\n\n⏱️ *Time Limit:* 15 Seconds\n💰 *Reward:* ₹500\n\n_Type the answer directly!_`);

            global.game[BotNum][m.chat] = {
                type: 'emojiquiz',
                answer: quiz.answer,
                timeout: setTimeout(() => {
                    if (global.game[BotNum]?.[m.chat]) {
                        HeavstalTech.sendMessage(m.chat, { text: `⏰ *TIME'S UP!*\n\nThe correct answer was *${quiz.answer}*.\nNo rewards this time!` });
                        delete global.game[BotNum][m.chat];
                    }
                }, 15000)
            };
        }
    },
    {
        name: 'trivia',
        aliases: [],
        category: 'games',
        description: 'Plays a multiple-choice trivia question.',
        usage: '%prefix%trivia',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, BotNum } = context;
            if (!global.game) global.game = {};
            if (!global.game[BotNum]) global.game[BotNum] = {};
            
            if (global.game[BotNum][m.chat]) return Vreply("⚠️ A game is already running!");

            try {
                const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
                const data = await response.json();
                const trivia = data.results[0];
                
                const options = [...trivia.incorrect_answers, trivia.correct_answer].sort(() => Math.random() - 0.5);
                
                let questionText = `*🎯 SOTA TRIVIA CHALLENGE*\n\n*Category:* ${trivia.category}\n*Difficulty:* ${trivia.difficulty.toUpperCase()}\n\n❓ ${trivia.question}\n\n`;
                options.forEach((opt, i) => { questionText += `${i + 1}. ${opt}\n`; });
                questionText += `\n⏱️ *Time:* 20 Seconds\n💡 Reply with the *Number* (1-${options.length}) of the correct answer!`;

                Vreply(questionText);

                global.game[BotNum][m.chat] = {
                    type: 'trivia',
                    correct: trivia.correct_answer,
                    options: options,
                    timeout: setTimeout(() => {
                        if (global.game[BotNum]?.[m.chat]) {
                            HeavstalTech.sendMessage(m.chat, { text: `⏰ *TIME'S UP!*\n\nThe correct answer was: *${trivia.correct_answer}*` });
                            delete global.game[BotNum][m.chat];
                        }
                    }, 20000)
                };
            } catch (e) {
                console.error(e);
                Vreply("❌ Failed to start trivia.");
            }
        }
    }
];
