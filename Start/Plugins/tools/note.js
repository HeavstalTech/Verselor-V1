export default [
    {
        name: 'note',
        aliases: ['addnote', 'savenote'],
        category: 'tools',
        description: 'Stores a personalized message/note in the database.',
        usage: '%prefix%note <Name> | <Content>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, MenuStyle, footer } = context;
            
            if (!text || !text.includes('|')) {
                return Vreply(`*INCORRECT USAGE*\n\n*Format:* ${prefix + command} Note Name | Note Content\n*Example:* ${prefix + command} How To Call Heavstal Tech | To call Heavstal Tech I will search the web...\n\n${footer}`);
            }

            const parts = text.split('|');
            const noteName = parts[0].trim();
            const noteContent = parts.slice(1).join('|').trim();

            if (!noteName) return Vreply(`*Please provide a name for your note before the "|" separator.*`);
            if (!noteContent) return Vreply(`*Please provide the content for your note after the "|" separator.*`);
            if (!global.db.data.users) global.db.data.users = {};
            if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
            if (!global.db.data.users[m.sender].notes) global.db.data.users[m.sender].notes = [];

            const userNotes = global.db.data.users[m.sender].notes;
            const exists = userNotes.find(n => n.name.toLowerCase() === noteName.toLowerCase());
            if (exists) {
                return Vreply(`*PROCESS FAILED*\n\nYou already have a note saved with the name *"${noteName}"*.\nPlease choose a different name or use *${prefix}deletenote ${noteName}* first.`);
            }

            const now = new Date();
            const dateOpts = { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric', timeZone: global.timezone || 'Africa/Lagos' };
            const timeOpts = { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZone: global.timezone || 'Africa/Lagos' };
            
            let dateStr = "";
            try {
                const d = new Intl.DateTimeFormat('en-US', dateOpts).format(now);
                const t = new Intl.DateTimeFormat('en-US', timeOpts).format(now);
                dateStr = `${d} - ${t}`;
            } catch (e) {
                dateStr = now.toLocaleString();
            }

            userNotes.push({
                name: noteName,
                content: noteContent,
                date: dateStr
            });

            await global.db.write();

            Vreply(`*✅ Note Successfully Saved!*\n\n┃━ ${MenuStyle} *Name:* ${noteName}\n┃━ ${MenuStyle} *Saved On:* ${dateStr}\n\n_Use *${prefix}listnote* to view your notes._\n\n${footer}`);
        }
    },
    {
        name: 'listnote',
        aliases: ['notes', 'mynotes'],
        category: 'tools',
        description: 'Lists all your saved notes.',
        usage: '%prefix%listnote',
        execute: async (HeavstalTech, m, context) => {
            const { Vreply, prefix, MenuStyle, footer, pushname } = context;

            const userNotes = global.db.data.users?.[m.sender]?.notes || [];

            if (userNotes.length === 0) {
                return Vreply(`You don't have any notes saved yet, ${pushname}.\n_Use *${prefix}note* to create one._\n\n${footer}`);
            }

            let replyText = `*📝 ${pushname}'s Saved Notes*\n\n`;
            
            userNotes.forEach((note, index) => {
                replyText += `*${index + 1}.* ${note.name}\n`;
                replyText += `   🕒 _${note.date}_\n\n`;
            });

            replyText += `_Use *${prefix}getnote <Name>* to read a note._\n${footer}`;

            Vreply(replyText);
        }
    },
    {
        name: 'getnote',
        aliases: ['readnote'],
        category: 'tools',
        description: 'Reads the content of a specific note.',
        usage: '%prefix%getnote <Name>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, MenuStyle, footer } = context;

            if (!text) return Vreply(`*INCORRECT USAGE*\n\nPlease provide the name of the note you want to read.\n*Example:* ${prefix + command} How To Call Heavstal Tech\n\n${footer}`);

            const userNotes = global.db.data.users?.[m.sender]?.notes || [];
            
            if (userNotes.length === 0) {
                return Vreply(`You don't have any notes saved yet.`);
            }

            const note = userNotes.find(n => n.name.toLowerCase() === text.toLowerCase().trim());

            if (!note) {
                return Vreply(`*NOTE NOT FOUND*\n\nCould not find a note named *"${text}"*.\n_Use *${prefix}listnote* to see your exact note names._\n\n${footer}`);
            }

            const replyText = `*📝 ${note.name}*\n🕒 _${note.date}_\n\n${note.content}\n\n${footer}`;
            
            Vreply(replyText);
        }
    },
    {
        name: 'deletenote',
        aliases: ['delnote', 'removenote'],
        category: 'tools',
        description: 'Deletes a specific saved note from user database.',
        usage: '%prefix%deletenote <Name>',
        execute: async (HeavstalTech, m, context) => {
            const { text, Vreply, prefix, command, footer } = context;

            if (!text) return Vreply(`*INCORRECT USAGE*\n\nPlease provide the name of the note you want to delete.\n*Example:* ${prefix + command} How To Call Heavstal Tech\n\n${footer}`);

            const userNotes = global.db.data.users?.[m.sender]?.notes || [];

            if (userNotes.length === 0) {
                return Vreply(`You don't have any notes saved yet.`);
            }

            const noteIndex = userNotes.findIndex(n => n.name.toLowerCase() === text.toLowerCase().trim());

            if (noteIndex === -1) {
                return Vreply(`*DELETE FAILED*\n\nCould not find a note named *"${text}"* to delete.\n_Use *${prefix}listnote* to check your existing notes._\n\n${footer}`);
            }

            const deletedName = userNotes[noteIndex].name;
        
            userNotes.splice(noteIndex, 1);
            await global.db.write();

            Vreply(`*✅ Note Deleted Successfully!*\n\nThe note *"${deletedName}"* has been permanently removed from your database.\n\n${footer}`);
        }
    }
];