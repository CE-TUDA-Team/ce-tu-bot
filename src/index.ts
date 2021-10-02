import DiscordJS, { Intents, Message } from 'discord.js'

import { DISCORD_TOKEN } from './config/envConfig';
import CommandHandler from './commandHandler';
import config from './config/botConfig';
import {registerSlashCommands} from "./registerSlashCommands";


const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
})


const commandHandler = new CommandHandler(config.prefix);

// do this only if slash cmd data has changed
if (false){
  registerSlashCommands();
}

//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////

client.on('ready', () => { console.log("CE_Bot has started"); });
client.on("messageCreate", (message: Message) => { commandHandler.handleMessage(message); });
client.on("error", e => { console.error("Discord client error!", e); });
client.on('interactionCreate', interaction => { console.log(interaction); });

client.login(DISCORD_TOKEN);

