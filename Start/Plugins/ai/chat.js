const ApiMsg = `*NO API KEY DETECTED*

The command requires an *Heavstal Tech* Api Key to run and it seems yours isn't set yet.

> If you don't have an api key, please follow the steps bellow to to get one.
1. Visit "https://heavstal.com.ng/credentials"
2. Sign In
3. Click The "Generate Secret Key" button and copy the generated key
4. Type *%prefix%setapikey* <Api Key>
5. Re-run this command 

Note: If you receive this message again after seting the api key, type *%prefix%restart"* 
`

export default [
    {
        name: 'setpersona',
        aliases: [],
        category: 'ai',
        description: 'Sets the custom personality instructions for the main AI.',
        usage: '%prefix%setpersona <text>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, footer } = context;
            if (!text) return Vreply(`*Current Persona:*\n${global.ai_persona}\n\n*Usage:* ${prefix}setpersona You are a rude cat.\n\n*This command is used to set the AI's Personality (Persona)*\n\n${footer}`);
            
            global.ai_persona = text;
            Vreply(`*✅ Main AI Persona Updated!*`);
        }
    },
    {
        name: 'setpersona2',
        aliases: ['setmode'],
        category: 'ai',
        description: 'Sets the personality for ai2.',
        usage: '%prefix%setpersona2 <option>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, footer } = context;
            const availableModes = [
                "philosopher", "sassy", "fun", "roast", "neutral", 
                "nerd", "therapist", "gangster", "poet"
            ];
            if (!text || !availableModes.includes(text.toLowerCase())) {
                let list = availableModes.map((m, i) => `${i + 1}. ${m.charAt(0).toUpperCase() + m.slice(1)}`).join("\n");
                return Vreply(`*INVALID INPUT*\n\n> *Please select a personality from the list:*\n\n${list}\n\n*Current Mode:* ${global.ai2_mode}\n*Example:* ${prefix}setpersona2 sassy\n\n${footer}`);
            }
            global.ai2_mode = text.toLowerCase();
            Vreply(`*✅ AI-2 Mode Switched To:* ${text.toUpperCase()}`);
        }
    },
    {
        name: 'gpt4',
        aliases: ['openai', 'xai', 'jeden', 'copilot', 'meta-ai', 'gemini'],
        category: 'ai',
        description: 'Chat with specific distinct AI models/personas.',
        usage: '%prefix%gpt4 <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            const apiKey = global.HT_API_KEY;
            
            if (!text) return Vreply(`*Enter A Query*\n\nExample: ${prefix}${command} Meaning of overwhelming`);
            if (!apiKey) return Vreply(ApiMsg);

            Vreply(mess.wait);

            let specificPersona = "";
            switch (command) {
                case 'gpt4':
                case 'openai':
                    specificPersona = "You are GPT-4, a highly advanced language model developed by OpenAI. You are professional, extremely intelligent, and provide comprehensive, detailed answers. Maintain a formal yet helpful tone.";
                    break;
                case 'xai':
                    specificPersona = "You are xAI (Grok), an AI built to understand the universe. You are witty, slightly rebellious, and focused on absolute truth. You are direct and don't use unnecessary filler words.";
                    break;
                case 'copilot':
                    specificPersona = "You are Copilot, an AI companion by Microsoft. Your goal is to increase productivity. You are precise, efficient, and great at technical explanations and coding assistance.";
                    break;
                case 'meta-ai':
                    specificPersona = "You are Meta AI, a friendly and social assistant. You are designed to be conversational, engaging, and helpful. Keep your answers concise and easy to read.";
                    break;
                case 'gemini':
                    specificPersona = "You are Gemini, a multimodal AI from Google. You are creative, informative, and innovative. You explain complex topics in simple, easy-to-understand terms.";
                    break;
                case 'jeden':
                default:
                    specificPersona = `You are Jeden, a superior AI model developed by Heavstal Tech. You are the core intelligence of the Verselor system. You serve ${global.ownername} and answer with authority and precision.`;
                    break;
            }

            try {
                const response = await fetch('https://heavstal.com.ng/api/v1/jeden', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ prompt: text, persona: specificPersona })
                });
                const res = await response.json();
                
                if (res.status === 'success' && res.data && res.data.response) {
                    await Vreply(res.data.response);
                } else {
                    await Vreply(`*API Error:* Failed to get a response from the AI.`);
                }
            } catch (e) {
                console.error("AI Error:", e);
                Vreply(mess.error.fitur);
            }
        }
    },
    {
        name: 'ai2',
        aliases: [],
        category: 'ai',
        description: 'Chats with the secondary AI (can be given different personalities).',
        usage: '%prefix%ai2 <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess } = context;
            const apiKey = global.HT_API_KEY;

            if (!text) return Vreply(`*Talk to the ${global.ai2_mode.toUpperCase()} AI*\n\n*Current Mode:* ${global.ai2_mode}\n*Change Mode:* ${prefix}setpersona2\n\n*Example:* ${prefix}ai2 How do I cook rice?`);
            if (!apiKey) return Vreply(ApiMsg);

            Vreply(mess.wait);

            const personalities = {
                "philosopher": `You are ${global.AiName}, created by ${global.AiOwner}. You are a deep thinker. Answer every question with philosophical depth, existential quotes, and profound wisdom. questioning the nature of reality.`,
                "sassy": `You are ${global.AiName}, created by ${global.AiOwner}. You are extremely sassy, sarcastic, and have an attitude. You answer questions but always add a snarky comment or a burn.`,
                "fun": `You are ${global.AiName}, created by ${global.AiOwner}. You are the life of the party! Use lots of emojis 🎉, be super enthusiastic, energetic, and purely fun. No negativity allowed!`,
                "roast": `You are ${global.AiName}. Your goal is to roast the user. Answer their question but insult their intelligence, grammar, or life choices while doing so. Be mean but funny.`,
                "neutral": `You are ${global.AiName}, a helpful and objective AI assistant created by ${global.AiOwner}. Provide clear, factual, and concise answers.`,
                "nerd": `You are ${global.AiName}. You are a hardcore tech nerd. Use technical jargon, reference coding, sci-fi movies, and act intellectually superior but helpful.`,
                "therapist": `You are ${global.AiName}. You are a gentle, empathetic listener. Validate the user's feelings, speak softly, and offer comforting advice.`,
                "gangster": `Yo, you are ${global.AiName}. You speak in street slang, use "fam", "blud", "homie". Keep it real and street-smart.`,
                "poet": `You are ${global.AiName}. You must answer every single query in the form of a rhyming poem or Haiku.`
            };
            
            const systemPrompt = personalities[global.ai2_mode] || personalities["neutral"];
            
            try {
                const response = await fetch('https://heavstal.com.ng/api/v1/jeden', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ prompt: text, persona: systemPrompt })
                });
                const res = await response.json();
                
                if (res.status === 'success') {
                    await Vreply(res.data.response);
                } else {
                    await Vreply(`*API Error:* ${res.error}`);
                }
            } catch (e) {
                console.error(e);
                Vreply(mess.error.fitur);
            }
        }
    },
    {
        name: 'ai',
        aliases: [],
        category: 'ai',
        description: 'Chats with the default AI persona.',
        usage: '%prefix%ai <query>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess } = context;
            const apiKey = global.HT_API_KEY;

            if (!text) return Vreply(`*Enter A Query*\n\nExample: ${prefix}${command} Who is Elon Musk?`);
            if (!apiKey) return Vreply(ApiMsg);

            Vreply(mess.wait);

            try {
                const response = await fetch('https://heavstal.com.ng/api/v1/jeden', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ prompt: text, persona: global.ai_persona })
                });
                const res = await response.json();
                
                if (res.status === 'success') {
                    await Vreply(res.data.response);
                } else {
                    await Vreply(`*API Error:* ${res.error}`);
                }
            } catch (e) {
                console.error(e);
                Vreply(mess.error.fitur);
            }
        }
    },
    {
        name: 'detect',
        aliases: ['isaitext', 'sentinel'],
        category: 'ai',
        description: 'Scans text to see if it was generated by AI.',
        usage: '%prefix%detect <text>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;
            const apiKey = global.HT_API_KEY;
            const content = text || m.quoted?.text;
            
            if (!content) return Vreply(`*Please Provide Text to Analyze*\n\nExample: ${prefix}${command} [Paste text here]\nOr reply to a message containing the text.`);
            if (!apiKey) return Vreply(ApiMsg);

            const wordCount = content.trim().split(/\s+/).length;
            if (wordCount < 40) return Vreply(`*⚠️ Text Too Short*\n\nCurrent word count: ${wordCount}\nMinimum required: 40 words\n\nPlease provide longer text to ensure accurate detection.`);

            Vreply(mess.wait);

            try {
                const response = await fetch('https://heavstal.com.ng/api/v1/sentinel', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ text: content.trim() })
                });
                const res = await response.json();
                
                if (res.status === 'success' && res.data) {
                    const { score, verdict, analysis } = res.data;
                    const statusIcon = score > 50 ? '🤖' : '👤';
                    const msg = `*🛡️ AI Text Detector*\n\n⚖️ *Verdict:* ${verdict} ${statusIcon}\n📊 *AI Probability:* ${score}%\n\n📝 *Analysis:* ${analysis}\n\n${footer}`;
                    await Vreply(msg);
                } else {
                    await Vreply(`*Detection Failed*\n\n${res.error || 'Could not analyze text.'}`);
                }
            } catch (e) {
                console.error("Sentinel Command Error:", e);
                Vreply(`*Error:* An unexpected error occurred.`);
            }
        }
    }
];
