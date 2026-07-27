const ApiMsg = `*NO API KEY DETECTED*

The command requires a *Heavstal Tech* Api Key to run and it seems yours isn't set yet.

> If you don't have an api key, please follow the steps bellow to to get one.
1. Visit "https://heavstal.com.ng/credentials"
2. Sign In
3. Click The "Generate Secret Key" button and copy the generated key
4. Type %prefix%setapikey <Api Key>
5. Re-run this command 

Note: If you receive this message again after setting the api key, type *"%prefix%restart"*`;

export default [
    {
        name: 'hackernews',
        aliases: ['hn', 'technews', 'toptech'],
        category: 'tools',
        description: 'Retrieves the top 10 trending stories currently on the front page of Hacker News.',
        usage: '%prefix%hackernews',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, prefix, mess, footer } = context
            Vreply(mess.wait);
            
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                const response = await fetch('https://heavstal.com.ng/api/v1/hacker-news', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({})
                })
                const res = await response.json();
                if (res.status === 'success' && res.data) {
                    let msg = `📰 *TOP 10 HACKER NEWS STORIES* 📰\n\n`;
                    const stories = res.data.slice(0, 10);
                    
                    stories.forEach((story, index) => {
                        msg += `*${index + 1}. ${story.title}*\n`;
                        msg += `👤 *By:* ${story.author}\n⬆️ *Score:* ${story.score}\n💬 *Comments:* ${story.comments_count}\n`;
                        msg += `🔗 *Link:* ${story.url}\n`;
                        if (story.content) {
                            const snippet = story.content.length > 80 ? story.content.substring(0, 80) + '...' : story.content;
                            msg += `📝 *Snippet:* _${snippet}_\n`;
                        }                   
                        msg += `\n`;
                    });
                   
                    msg += `${footer}`                
                    await Vreply(msg);
                } else {
                    await Vreply(`*Fetch Failed*\n\n${res.error || 'Could not retrieve Hacker News stories at this time.'}`);
                }
            } catch (e) {
                console.error("Hacker News Command Error:", e);
                Vreply(`*Error:* An unexpected network error occurred while reaching the Heavstal API.`);
            }
        }
    }
];
