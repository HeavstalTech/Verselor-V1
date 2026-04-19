# Changelog
All notable changes to **Verselor V1** are documented here

---

## [1.3.8] - 2026-04-19

### Added
- Added `sporify` plugin.
- Added `song/play2` plugins which is ofc better than the normal `play` command.
- Added `komiku`, `kusonime`, & `animequote` plugins
- Added new Premium Only Ai image generator plugins: `flux`, `deepimg`, `sora`, `magicstudio`

### Updated
- Update Start/help.js to include CONTRIBUTING.md & CONTRIBUTORS.md
- Replaced Bot's Catbox images to a custom version

### Fixed
- Resolved makeInMemoryStore function cause SIGKILL (out of memory) error on katabump and made Open-Source.

---
    
## [1.3.7] - 2026-04-15

### Updated
- Updated AI said of in the README.md to use cached data therefore making the Ai significantly faster than ever as seen in Start/help.js  section of this repository 
- Updated all commands in Start/Plugins/owner/privilege.js to drop old strictnees and use jid probably as it was fixed in version 1.3.5
- Update Anti-Tag command to include `warn, delete, kick & off` as seen in lib/Anti.js file of this repo
- Update Readme with more information

### Fixed
- Resolved undefined variables (e.g prefix) issue on global.mess using JavaScript's `get key(){}` feature as seen in settings/config.js of this repo
- Multi-Tenant Game Collisions: Completely isolated all interactive game sessions (`TicTacToe`, `WordChain`, `Trivia`, `Math`, `EmojiQuiz`) per bot instance using `BotNum`. RentBots and Host Bots can now seamlessly run games in the exact same group chat without state-bleeding or overriding each other's data.
- Game Memory Leaks (OOM Protection): Implemented a strict 5-minute inactivity auto-destruct timer for abandoned `TicTacToe` waiting rooms and active matches to prevent permanent RAM bloat.

### Added 
- Anti.js file which contains almost all of Verselor-V1's anti features
- Added CONRIBUTORS and CONTRIBUTION files

---
    
## [1.3.6] - 2026-04-14

### Updated
- Update user message settings to prevent OOM spikes due to high baileys events
- Granted Developer full time access to the bot (Development: Temporal Test)

---

## [1.3.5] - 2026-04-13

### Fixed
- Resolved Jid vs Lid issues via baileys built-in functions

---

## [1.3.4] - 2026-04-13

### Updated
* **Make the bot bulletproof towards outage on third party apis**

### Fixed
* **Resolved issue whereby ai command execution always fails**


## [1.3.3] - 2026-04-13

---

### Web Panel (HTML, CSS, JS)

### Added
* **Mobile Sidebar:** Implemented a proper off-canvas drawer with a hamburger toggle. Fixes the issue where modals and tabs were overlapping into oblivion on phones.
* **Copy Pair Code:** Added a quick-copy button next to the pairing code output.
* **Password Rotation:** Added a "Change Password" section in the settings tab and wired up the `/api/auth/change` endpoint to handle it.

### Changed
* **Deployment UI:** Stacked the Phone Number and AuthCode inputs vertically instead of trying to flex them on one line.
* **Navigation:** Cleaned up tab names (`RentBot` -> `Pair User`) and added proper font-awesome icons.
* **Button Copy:** Shortened the ungodly long "Wipe Session/Disconnect" button to just "Disconnect". 

### Fixed
* **Button State Lifecycle:** Strictly locked down the Start/Restart/Stop/Disconnect buttons depending on the current `botState`. Prevents users from spam-clicking and bricking the child process during boot/shutdown.
---
    
## [1.3.2] - 2026-04-12

### Web Panel (HTML & JS)

### Fixed

* **Startup State Leak:** “Online & Running” banner and Multi-Tenancy section now strictly depend on `status === 'running'`.
* **Pairing Code Visibility:** Pairing screen no longer disappears during transitional states (`starting`, `paired_wait`, etc.).
* **Refresh Desync:** UI now restores pairing state instantly if `currentPairCode` exists.
* **SSE Buffering Issue:** Enforced `Cache-Control: no-transform` to prevent proxy buffering (Express/Nginx).

### Added

* `currentPairCode` exposed via status endpoint to persist pairing sessions across refresh.
* `logHistory` support to stream last 50 logs immediately on reconnect.

### Updated

* `fetchStatus()` now handles transitional states more reliably.
* `makeInMemoryStore` now defers credential fetch (~10s after initial connection) to stabilize session handling and reduce unnecessary load.

---

## [1.3.1] — 2026-04-12

### Updated

* Refined CLI interaction (`readline`) for proper handling outside cloud environments.
* Added `.env` fallback for non-TTY deployments (Pterodactyl, Katabump).
* Improved `makeInMemoryStore` stability and reduced OOM risk under load.
* Enhanced multilingual system for better handling of styled/fancy text outputs.
* Updated README to reflect current deployment flow and feature set.

---

## [1.3.0] — 2026-04-10

### Added

* Note management system:

  * `addnote`
  * `getnote`
  * `deletenote`
  * `listnote`

### Updated

* Expanded control panel actions:

  * Start / Stop / Restart / Disconnect
* Improved multi-tenancy insights per user.
* `.play` now returns audio metadata before download.
* Dynamic menu system with caching.
* Version now centralized via `package.json`.
* License command now dynamically generated.

### Fixed

* Prevented crash when phone number is missing (Termux/Pterodactyl).
* Resolved TDZ initialization error.
* Fixed undefined `Admins` in anti-tag logic.
* Fixed potential startup crash.

### Removed

* Dropped Heroku buildpacks (migrated fully to Docker).

---

## [1.2.1] — 2026-04-06

### Added

* `.gpt4` command for advanced AI interaction.
* `llms.txt` for AI discoverability.

### Fixed

* `.play` audio download failures.
* Reduced RAM spikes during multi-tenancy pairing.

### Removed

* Deprecated `.efootball` command.
