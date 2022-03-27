import dotenv from "dotenv";

dotenv.config({ path: ".env" });


export const DISCORD_TOKEN = process.env["token"];
if(!DISCORD_TOKEN) console.error('Missing token. Check .env');

export const CLIENT_ID = process.env["client_id"];
if(!CLIENT_ID) console.error('Missing client_id. Check .env');

export const GUILD_ID = process.env["guild_id"];
if(!GUILD_ID) console.error('Missing guild_id. Check .env');

export const REGISTER_CMDS = process.env['register_cmds'] === 'true';

export const PRINT_ROLECALL = process.env['print_rolecall'] === 'true';

export const BOT_NAME = process.env['bot_name'] ? process.env['bot_name'] : 'name_not_set';
