// Start/help.js
// © HEAVSTAL TECH
// Modify before re-use - bugs may occur 

// ai helper.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { commands } from '#System/Data9.js';
import NodeCache from 'node-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 15 mins cache - check every 2 mins
const aiCache = new NodeCache({ stdTTL: 900, checkperiod: 120 });

const getReadmeInfo = () => {
    // use cache
    const cachedDocs = aiCache.get("system_docs_info");
    if (cachedDocs) return cachedDocs;

    try {
        const filesToRead = ['README.md', 'CONTRIBUTING.md', 'CONTRIBUTORS.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md'];
        let combinedContent = "";
        for (const file of filesToRead) {
            const filePath = path.join(__dirname, '..', file);
            if (fs.existsSync(filePath)) {
                let rawText = fs.readFileSync(filePath, 'utf8');
                // regex for the md files.
                let cleanedText = rawText
                    .replace(/<[^>]*>?/gm, '')                     
                    .replace(/!\[.*?\]\(.*?\)/g, '')               
                    .replace(/#{1,6}\s?/g, '')                     
                    .replace(/\*\*/g, '')                          
                    .replace(/_/g, '')                             
                    .replace(/^\s*[\r\n]/gm, '\n')                 
                    .trim();
                combinedContent += `\n\n=== [ SOURCE FILE: ${file} ] ===\n${cleanedText}`;
            }
        }
        if (!combinedContent.trim()) {
            combinedContent = "Verselor-V1 is a powerful WhatsApp bot by Heavstal Tech.";
        }
        // save cache if it ain't available for the next 15 mins
        aiCache.set("system_docs_info", combinedContent.trim());
        return combinedContent.trim();
    } catch (e) {
        console.error("Failed to read/clean system documentation files:", e);
        return "Verselor-V1 is a powerful WhatsApp bot by Heavstal Tech.";
    }
};

// plugins fetcher (dynamic - error fixed)
const getBotDocs = (prefix) => {
    const docs = [];
    for (const [name, cmd] of commands.entries()) {
        const usage = cmd.usage ? cmd.usage.replace(/%prefix%/g, prefix) : `${prefix}${name}`;
        docs.push({
            name: name,
            triggers: [name, ...(cmd.aliases || [])],
            description: cmd.description || "No description provided.",
            usage: usage
        });
    }
    return docs;
};

// for ai using Heavstal Tech api
const getAiTriggerList = (prefix) => {
    const cacheKey = `ai_trigger_list_${prefix}`;
    const cachedList = aiCache.get(cacheKey);
    if (cachedList) return cachedList;
    const allDocs = getBotDocs(prefix);
    const result = allDocs.map(cmd => `[Command: ${cmd.name}] | Aliases: ${cmd.triggers.join(', ')} | Desc: ${cmd.description} | Usage: ${cmd.usage}`).join('\n');
    // save to cache 
    aiCache.set(cacheKey, result);
    return result;
};

// exports 🧏
export { getBotDocs, getReadmeInfo, getAiTriggerList };
