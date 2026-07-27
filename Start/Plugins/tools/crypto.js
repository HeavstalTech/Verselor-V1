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
        name: 'crypto',
        aliases: ['coin', 'cryptoprice', 'market'],
        category: 'tools',
        description: 'Returns live cryptocurrency prices. Get top 10, search by symbol, or get a random coin.',
        usage: '%prefix%crypto [symbol|random]',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, mess, footer } = context;            
            let payload = {};
            let isRandom = false
            let isSingleView = false
            if (text) {
                const arg = text.trim().toLowerCase();
                if (arg === 'random') {
                    payload = { limit: 20 }
                    isRandom = true;
                    isSingleView = true;
                } else {
                    payload = { symbol: arg.toUpperCase() }
                    isSingleView = true;
                }
            } else {
                payload = { limit: 10 }
            }
            Vreply(mess.wait);      
            try {
                const apiKey = global.HT_API_KEY;
                if (!(apiKey || apiKey === "")) return Vreply(ApiMsg.replace(/%prefix%/g, prefix));
                
                const response = await fetch('https://heavstal.com.ng/api/v1/crypto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify(payload)
                });
                const res = await response.json();          
                if (res.status === 'success' && res.data && res.data.length > 0) {
                    let coinsToProcess = res.data;
                    if (isRandom) {
                        const randomCoin = coinsToProcess[Math.floor(Math.random() * coinsToProcess.length)];
                        coinsToProcess = [randomCoin];
                    }
                    let msg = `🪙 *LIVE CRYPTO MARKET* 🪙\n\n`;
                    
                    coinsToProcess.forEach(coin => {
                        const change = parseFloat(coin.change_24h_percent || 0);
                        const trend = change >= 0 ? '📈' : '📉';
                        const formattedPrice = Number(coin.price_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                        
                        msg += `*${coin.name} (${coin.symbol})*\n`;
                        msg += `🏆 *Rank:* #${coin.rank}\n`;
                        msg += `💲 *Price:* $${formattedPrice}\n`;
                        msg += `${trend} *24h Change:* ${coin.change_24h_percent}%\n`;
                        if (isSingleView) {
                            const formattedCap = Number(coin.market_cap_usd).toLocaleString('en-US');
                            const formattedVol = Number(coin.volume_24h_usd).toLocaleString('en-US');
                            msg += `🏦 *Market Cap:* $${formattedCap}\n`;
                            msg += `🔄 *Volume (24h):* $${formattedVol}\n`;
                        }        
                        msg += `\n`;
                    });
                    msg += `Data Provider ${res.providerr}`
                    if (res.cached) msg += ` _[Cached]_`;
                    msg += `\n${footer}`          
                    await Vreply(msg)
                } else {
                    await Vreply(`*Fetch Failed*\n\nCould not retrieve crypto data. If you searched a symbol, make sure it is correct (e.g., BTC, ETH).`);
                }
            } catch (e) {
                console.error("Crypto Command Error:", e);
                Vreply(`*Error:* An unexpected network error occurred while reaching the Heavstal API.`);
            }
        }
    }
];
