import DiscordJS, { Intents, Message } from 'discord.js'

import { DISCORD_TOKEN } from './config/secrets';
import CommandHandler from './commandHandler';
import config from './config/botConfig';

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
})


const commandHandler = new CommandHandler(config.prefix);

//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////


client.on('ready', () => { console.log("CE_Bot has started"); });
client.on("messageCreate", (message: Message) => { commandHandler.handleMessage(message); });
client.on("error", e => { console.error("Discord client error!", e); });

client.login(DISCORD_TOKEN);

