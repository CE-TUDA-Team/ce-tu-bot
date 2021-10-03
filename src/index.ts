import {Client, Intents, Message} from 'discord.js'

import {DISCORD_TOKEN} from './config/envConfig';
import CommandHandler from './commandHandler';
import InteractionHandler from "./interactionHandler";
import config from './config/botConfig';
import {registerSlashCommands, unregisterSlashCommands} from "./registerSlashCommands";


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,

  ],
})


const commandHandler = new CommandHandler(config.prefix);
const interactionHandler = new InteractionHandler();

// do this only if slash cmd data has changed
if (false) {
  registerSlashCommands();
}
if (false) {
  unregisterSlashCommands();
}


//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////

client.on('ready', () => {
  console.log("CE_Bot has started");
});

client.on("messageCreate", (message: Message) => {
  commandHandler.handleMessage(message).then();
});

client.on('interactionCreate', interaction => {
  interactionHandler.handleInteraction(interaction).then();
});

client.on("error", e => {
  console.error("Discord client error!", e);
});

client.login(DISCORD_TOKEN);

