// Start/Plugins/ai/image_gen.js

const commands = [
    {
        name: 'imagine',
        aliases: ['flux', 'gptimage', 'gimage', 'deepimg', 'sora', 'magicstudio', 'generate', 'txt2img'],
        category: 'ai',
        description: 'Generate high-quality images from text using Heavstal AI',
        usage: `%prefix%imagine <prompt>`,
        premiumOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer, MenuStyle } = context;
            
            if (!text) return Vreply(`*INCORRECT USAGE*\n\n*Example:* ${prefix + command} A futuristic cyberpunk city in neon lights`);

            await HeavstalTech.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
            Vreply(mess.wait);

            try {
                const apiKey = process.env.HT_API_KEY

                const response = await fetch('https://heavstal.com.ng/api/v1/image', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey 
                    },
                    body: JSON.stringify({
                        prompt: text
                    })
                });

                const resData = await response.json();

                if (resData.status !== 'success' || !resData.data || !resData.data.url) {
                    throw new Error(resData.error || 'Failed to generate image from API.');
                }

                const imageUrl = resData.data.url;
                const modelUsed = resData.data.model || 'FLUX';

                await HeavstalTech.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: `*${MenuStyle} VERSELOR AI IMAGE ${MenuStyle}*\n\n┃━ *Model:* ${modelUsed.toUpperCase()}\n┃━ *Prompt:* ${text}\n\n${footer}`
                }, { quoted: m });

                await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

            } catch (error) {
                console.error(`AI Image Gen Error:`, error);
                await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                Vreply(`${mess.error.fitur}\n_Details: Image generation failed or timed out._`);
            }
        }
    }
];

export default commands
