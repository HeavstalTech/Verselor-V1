// System/Data4.js
// © Heavstal Tech 
// Modify before re-use - bugs may occur
// makeInMemoryStore function Replacement
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { fileURLToPath } from 'node:url';
var __filename = fileURLToPath(import.meta.url);

export function makeInMemoryStore({ logger, maxMessagesPerChat = 50, saveFilePath = null, saveIntervalMs = 300000 }) {
    var store = {
        chats: {},
        contacts: {},
        messages: {},
        presences: {},
        groupMetadata: {}, 
        labels: {},

        bind: (ev) => {
            ev.on('connection.update', (update) => {
                var { connection } = update;
                if (connection === 'open') {
                    setTimeout(() => {
                        store.writeToFile();
                        // console.log('💾 [STORE] Startup sync securely saved to JSON!');
                    }, 10000);
                }
            });

            ev.on('chats.set', ({ chats, isLatest }) => { 
                if (isLatest) store.chats = {};
                for (const chat of chats) store.chats[chat.id] = chat;
            });
            ev.on('chats.upsert', (chats) => { for (const chat of chats) store.chats[chat.id] = chat; });
            ev.on('chats.update', (updates) => {
                for (const update of updates) {
                    if (store.chats[update.id]) Object.assign(store.chats[update.id], update);
                }
            });
            ev.on('chats.delete', (ids) => { for (const id of ids) delete store.chats[id]; });
            ev.on('contacts.set', ({ contacts, isLatest }) => { 
                if (isLatest) store.contacts = {};
                for (const contact of contacts) store.contacts[contact.id] = contact; 
            });
            ev.on('contacts.upsert', (contacts) => { for (const contact of contacts) store.contacts[contact.id] = contact; });
            ev.on('contacts.update', (updates) => {
                for (const update of updates) {
                    if (store.contacts[update.id]) Object.assign(store.contacts[update.id], update);
                    else store.contacts[update.id] = update;
                }
            });

            ev.on('presence.update', ({ id, presences }) => {
                if (!store.presences[id]) store.presences[id] = {};
                Object.assign(store.presences[id], presences);
            });

            ev.on('groups.upsert', (groups) => {
                for (const group of groups) store.groupMetadata[group.id] = group;
            });
            ev.on('groups.update', (updates) => {
                for (const update of updates) {
                    if (store.groupMetadata[update.id]) Object.assign(store.groupMetadata[update.id], update);
                    else store.groupMetadata[update.id] = update;
                }
            });

            ev.on('messages.upsert', ({ messages }) => {
                for (const msg of messages) {
                    const jid = msg.key.remoteJid;
                    if (!store.messages[jid]) store.messages[jid] = [];
                    
                    store.messages[jid].push(msg);
                    store.messages[jid].sort((a, b) => (a.messageTimestamp || 0) - (b.messageTimestamp || 0));
                    if (store.messages[jid].length > maxMessagesPerChat) {
                        store.messages[jid].splice(0, store.messages[jid].length - maxMessagesPerChat);
                    }
                }
            });

            ev.on('messages.update', (updates) => {
                for (const { key, update } of updates) {
                    const jid = key.remoteJid;
                    if (store.messages[jid]) {
                        const msgIndex = store.messages[jid].findIndex(m => m.key.id === key.id);
                        if (msgIndex !== -1) {
                            Object.assign(store.messages[jid][msgIndex], update);
                        }
                    }
                }
            });

            ev.on('messages.delete', (item) => {
                if ('all' in item) {
                    delete store.messages[item.jid];
                } else {
                    const jid = item.keys[0].remoteJid;
                    if (store.messages[jid]) {
                        const idsToRemove = item.keys.map(k => k.id);
                        store.messages[jid] = store.messages[jid].filter(m => !idsToRemove.includes(m.key.id));
                    }
                }
            });
        },

        loadMessage: async (jid, id) => {
            var msgs = store.messages[jid];
            return msgs ? msgs.find(m => m.key.id === id) : null;
        },

        writeToFile: async () => {
            if (!saveFilePath) return;
            try { 
                var dirPath = path.dirname(saveFilePath);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }

                var dataToSave = JSON.stringify({
                    chats: store.chats,
                    contacts: store.contacts,
                    messages: store.messages,
                    groupMetadata: store.groupMetadata,
                    labels: store.labels
                });

                await fs.promises.writeFile(saveFilePath, dataToSave, 'utf-8');
            } catch (e) {
                console.error('❌ [STORE] Failed to save state to JSON:', e.message);
            }
        },
        
        readFromFile: () => {
            if (!saveFilePath) return; 
            
            try { 
                if (fs.existsSync(saveFilePath)) {
                    var data = JSON.parse(fs.readFileSync(saveFilePath, 'utf-8'));
                    store.chats = data.chats || {};
                    store.contacts = data.contacts || {};
                    store.messages = data.messages || {};
                    store.presences = {};
                    store.groupMetadata = data.groupMetadata || {};
                    store.labels = data.labels || {};
                   // console.log('📂 [STORE] Full State Loaded from JSON!');
                } else {
                    var dirPath = path.dirname(saveFilePath);
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath, { recursive: true });
                     //   console.log(`📁 [STORE] Created missing directory path: ${dirPath}`);
                    }
                    var defaultData = {
                        chats: {}, contacts: {}, messages: {}, groupMetadata: {}, labels: {}
                    };
                    fs.writeFileSync(saveFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
                  //  console.log('📝 [STORE] Created new empty store file!');
                }
            } catch (e) {
                console.error('❌ [STORE] Error reading/creating store file:', e.message);
            }
        }
    };

    if (saveFilePath) {
        store.readFromFile();
        setInterval(() => store.writeToFile(), saveIntervalMs);
    }

    setInterval(() => {
        store.presences = {};

        for (const jid in store.messages) {
            if (store.messages[jid].length > maxMessagesPerChat) {
                store.messages[jid].splice(0, store.messages[jid].length - maxMessagesPerChat);
            }
            if (store.messages[jid].length === 0) {
                delete store.messages[jid];
            }
        }
        
        if (logger) logger.debug('🧹 [MEMORY SWEEPER] RAM cleared successfully.');
    }, 10 * 60 * 1000);

    return store;
}

fs.watchFile(__filename, async () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    await import(`${import.meta.url}?update=${Date.now()}`);
});
