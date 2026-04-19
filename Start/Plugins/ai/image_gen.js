// Start/Plugins/ai/image_gen.js

const imageModels = [
    { name: 'deepimg', endpoint: 'deepimg', desc: 'Generate image using DeepAI', format: 'json_result', extraParam: '' },
    { name: 'flux', endpoint: 'fluximg', desc: 'Generate image using Flux', format: 'json_result_url', extraParam: '&ratio=1:1' },
    { name: 'sora', endpoint: 'txt2img', desc: 'Generate image using Sora', format: 'json_result_url', extraParam: '' },
    { name: 'magicstudio', endpoint: 'magicstudio', desc: 'Generate image using MagicStudio', format: 'buffer', extraParam: '' }
];

export default imageModels.map(model => ({
    name: model.name,
    aliases: [],
    category: 'ai',
    description: model.desc,
    usage: `%prefix%${model.name} <prompt>`,
    premiumOnly: true,
    execute: async (HeavstalTech, m, context) => {
        const { text, Vreply, prefix, command, mess, footer, MenuStyle } = context;
        
        if (!text) return Vreply(`*INCORRECT USAGE*\n\n*Example:* ${prefix + command} A futuristic cyberpunk city in neon lights`);

        await HeavstalTech.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
        Vreply(mess.wait);

        try {
            const url = `https://api.giftedtech.co.ke/api/ai/${model.endpoint}?apikey=gifted&prompt=${encodeURIComponent(text)}${model.extraParam}`;
            let imageUrl;

            if (model.format === 'buffer') {
                // For endpoints that return the image buffer directly as the response
                imageUrl = url;
            } else {
                // For endpoints that return a JSON object with the URL
                const response = await fetch(url);
                const data = await response.json();
                
                if (!data.success) throw new Error('API returned false');

                if (model.format === 'json_result') {
                    imageUrl = data.result;
                } else if (model.format === 'json_result_url') {
                    imageUrl = data.result.url;
                }
            }

            if (!imageUrl) throw new Error('No image returned');

            await HeavstalTech.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption: `*${MenuStyle} VERSELOR AI IMAGE ${MenuStyle}*\n\n┃━ *Model:* ${model.name.toUpperCase()}\n┃━ *Prompt:* ${text}\n\n${footer}`
            }, { quoted: m });

            await HeavstalTech.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        } catch (error) {
            console.error(`AI Image Gen (${model.name}) Error:`, error);
            await HeavstalTech.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            Vreply(`${mess.error.fitur}\n_Details: Image generation failed or timed out._`);
        }
    }
}));