import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the root plugins directory
const pluginsDir = path.join(__dirname, '..', 'Start', 'Plugins');

// In-memory storage for commands and aliases
export const commands = new Map();
export const aliases = new Map();

export async function loadPlugins() {
    commands.clear();
    aliases.clear();
    
    if (!fs.existsSync(pluginsDir)) {
        fs.mkdirSync(pluginsDir, { recursive: true });
    }

    let pluginCount = 0;

    const readDirRecursive = async (dir) => {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            
            if (file.isDirectory()) {
                await readDirRecursive(fullPath);
            } else if (file.name.endsWith('.js')) {
                try {
                    // Cache busting for ESM hot-reloading
                    const fileUrl = `${pathToFileURL(fullPath).href}?update=${Date.now()}`;
                    const module = await import(fileUrl);
                    
                    // Support single object export or array of objects
                    const pluginExports = module.default || module;
                    const pluginArray = Array.isArray(pluginExports) ? pluginExports : [pluginExports];

                    for (const plugin of pluginArray) {
                        if (plugin && plugin.name) {
                            commands.set(plugin.name, plugin);
                            if (plugin.aliases && Array.isArray(plugin.aliases)) {
                                plugin.aliases.forEach(alias => aliases.set(alias, plugin.name));
                            }
                            pluginCount++;
                        }
                    }
                } catch (e) {
                    console.error(chalk.red(`[PLUGIN ERROR] Failed to load ${file.name}:`), e.message);
                }
            }
        }
    };

    await readDirRecursive(pluginsDir);
    const totalCallable = commands.size + aliases.size;
    console.log(chalk.green.bold(`[SYSTEM] Successfully loaded ${pluginCount} average modular plugins.\n Total Plugins Count: ${totalCallable} 🧩`));
}
