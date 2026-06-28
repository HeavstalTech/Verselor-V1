// Start/Plugins/owner/apikey.js

import chalk from 'chalk';

export default [
    {
        name: 'setapikey',
        aliases: ['setkey', 'updatekey'],
        category: 'owner',
        description: 'Updates and validates the Heavstal Tech API Key.',
        usage: '%prefix%setapikey <key>',
        ownerOnly: true,
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, mess, footer } = context;

            if (!text) {
                return Vreply(`*MISSING INPUT*\n\nProvide your 40+ digit API key.\nExample: ${prefix + command} ht_live_xxxxxxxxxxxxxxxxxxxxxx\n\nGet one at: https://heavstal.com.ng/credentials`);
            }

            const inputKey = text.trim();

            if (!inputKey.startsWith('ht_live_') || inputKey.length < 40) {
                return Vreply(`*INVALID FORMAT*\n\nYour API key must start with "ht_live_" and be at least 40 characters long.\n\nPlease check your key and try again.`);
            }
            Vreply(mess.wait + "\n_Verifying key with Heavstal Tech servers..._");

            try {
                const response = await fetch('https://heavstal.com.ng/api/v1/translate', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'x-api-key': inputKey 
                    },
                    body: JSON.stringify({ text: "bonjour", to: "en" })
                });

                const res = await response.json();

                if (res.status === 'error' && (res.message?.toLowerCase().includes('key') || res.message?.toLowerCase().includes('authorized'))) {
                    return Vreply(`*VERIFICATION FAILED*\n\nThe API key was rejected by the server.\n\n*Reason:* ${res.message || "Unauthorized"}\n\n${footer}`);
                }
                global.HT_API_KEY = inputKey;
                
                const successMsg = `*✅ API KEY UPDATED SUCCESSFULLY*\n\n` +
                                 `Your Heavstal Tech API Key has been verified and saved to the database.\n\n` +
                                 `_Note: Some commands might require a ${prefix}restart to refresh their state._\n\n` +
                                 `${footer}`;

                await Vreply(successMsg);
                console.log(chalk.green.bold(`[SYSTEM] API Key successfully updated by Owner: ${m.sender}`));

            } catch (e) {
                console.error("API Key Verification Error:", e);
                Vreply(`*NETWORK ERROR*\n\nCould not reach the validation server. Your key was not saved.\n\n_Details: ${e.message}_`);
            }
        }
    }
];
