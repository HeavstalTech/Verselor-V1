# Security Policy

At Heavstal Tech, we take the security of Verselor V1 and our users very seriously. We appreciate your help in keeping our community and this software safe.

## Supported Versions

Currently, we only provide security updates and patches for the latest active branch of Verselor V1. If you are using an older fork or release, we highly recommend using the `.update` command or pulling the latest changes from the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| v1.3.x (Latest) | :white_check_mark: |
| < v1.3.0        | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.** 

If you discover a security vulnerability within Verselor V1, please send an e-mail to **heavstaltech@gmail.com**. 

Please include the following information in your report:
* A description of the vulnerability and its impact.
* The version of Verselor V1 you are using.
* Detailed steps to reproduce the vulnerability.
* Any relevant logs, screenshots, or code snippets.

We will acknowledge receipt of your vulnerability report within 48 hours and strive to send you regular updates about our progress. If the vulnerability is accepted, we will issue a patch as quickly as possible.

## Out of Scope

Please note that the following issues are considered **out of scope** and are not classified as security vulnerabilities of the bot itself:
* **WhatsApp Account Bans:** Using third-party clients (like Baileys) inherently carries a risk of account suspension by WhatsApp Inc. This is a known risk and not a fixable code vulnerability.
* **Exposed Environment Variables:** If a user accidentally uploads their `.env` file, `backup_config.json`, or `Connection/session` folder to a public GitHub repository, that is user error, not a flaw in the bot's architecture. 
* **Host/Panel Security:** Vulnerabilities stemming from poorly secured deployment environments (e.g., weak passwords on a VPS, Pterodactyl, or Katabump panel).

## Safe Deployment Reminders

To ensure your instance of Verselor V1 remains secure:
1. **Never** commit your `Connection/session` or `Connection/pairing` folders to a public repository.
2. Ensure your `.gitignore` is properly configured before pushing any code.
3. Keep your `HT_API_KEY` and Dashboard Password private. 

Thank you for helping us keep Verselor V1 secure!
