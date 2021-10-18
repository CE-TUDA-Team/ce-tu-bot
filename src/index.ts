import {Client, Intents, Message} from 'discord.js'

import {BOT_NAME, DISCORD_TOKEN, GUILD_ID, REGISTER_CMDS} from './config/envConfig';
import CommandHandler from './handlers/commandHandler';
import InteractionHandler from "./handlers/interactionHandler";
import config from './config/botConfig';
import {registerSlashCommands, unregisterSlashCommands} from "./scripts/registerSlashCommands";
import ChannelHelper from "./helpers/channelHelper";
import Helper from "./helpers/helper";
import {sayHi} from "./scripts/cleanupLogs";


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
})


let commandHandler: CommandHandler;
let interactionHandler: InteractionHandler;

let helper: Helper;

//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////

client.on('ready', async () => {
  console.log("CE_Bot has started");
  const guild = client.guilds.cache.find(g => g.id == GUILD_ID);
  if (!guild) {
    client.destroy();
    return;
  }
  helper = new Helper(guild);
  helper.channelHelper.findTextChannelViaId("777301412882939915")?.send({content: 'CE_Bot ist am Starten... `Type=' + BOT_NAME + '`'});

  commandHandler = new CommandHandler(config.prefix);
  interactionHandler = new InteractionHandler(helper);


  await sayHi(helper);


  //check the env
  if (REGISTER_CMDS) {
    await registerSlashCommands(helper);
  }
// do this only if slash cmd data has changed
  if (false) {
    // noinspection UnreachableCodeJS
    await unregisterSlashCommands();
  }

  helper.channelHelper.findTextChannelViaId("777301412882939915")?.send({content: 'CE_Bot ist online. `Type=' + BOT_NAME + '`'});
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

