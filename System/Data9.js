// System/Data9.js
// © Heavstal Tech™
// Modify before re-use - bugs may occur (non seen yet)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import chalk from 'chalk';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var pluginsDir = path.join(__dirname, '..', 'Start', 'Plugins')

// Todo: in the far future, find an alternative method to prevent OOM/SIGKILL errors on low wen servers like katabump.
export const commands = new Map();
export const aliases = new Map();

export async function loadPlugins() {
    commands.clear()
    aliases.clear()
    if (!fs.existsSync(pluginsDir)) {
        fs.mkdirSync(pluginsDir, { recursive: true });
    }

    let pluginCount = 0

    var readDirRecursive = async (dir) => {
        var files = fs.readdirSync(dir, { withFileTypes: true })
        for (const file of files) {
            var fullPath = path.join(dir, file.name);
            
            if (file.isDirectory()) {
                await readDirRecursive(fullPath);
            } else if (file.name.endsWith('.js')) {
                try {
                    var fileUrl = `${pathToFileURL(fullPath).href}?update=${Date.now()}`;
                    var module = await import(fileUrl);
            
                    var pluginExports = module.default || module;
                    const pluginArray = Array.isArray(pluginExports) ? pluginExports : [pluginExports];

                    for (const plugin of pluginArray) {
                        if (plugin && plugin.name) {
                            commands.set(plugin.name, plugin);
                            if (plugin.aliases && Array.isArray(plugin.aliases)) {
                                plugin.aliases.forEach(alias => aliases.set(alias, plugin.name));
                            }
                            pluginCount++
                        }
                    }
                } catch (e) {
                    console.error(chalk.red(`[PLUGIN ERROR] Failed to load ${file.name}:`), e.message)
                }
            }
        }
    };

    await readDirRecursive(pluginsDir);
    var totalCallable = commands.size + aliases.size;
    console.log(chalk.green.bold(`[SYSTEM] Successfully loaded ${pluginCount} average modular plugins.\n Total Plugins Count: ${totalCallable} 🧩`));
}
