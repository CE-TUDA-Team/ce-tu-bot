import {Client, Intents} from 'discord.js'

import {BOT_NAME, DISCORD_TOKEN, GUILD_ID, REGISTER_CMDS} from './config/envConfig';
import CommandHandler from './handlers/commandHandler';
import InteractionHandler from "./handlers/interactionHandler";
import config from './config/botConfig';
import {registerSlashCommands, unregisterSlashCommands} from "./scripts/registerSlashCommands";
import Helper from "./helpers/helper";
import {cleanupLogs} from "./scripts/cleanupLogs";
import {prepareRolecallChannel} from "./scripts/prepareRolecallChannel";


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

  const guild = client.guilds.cache.find(g => g.id == GUILD_ID);
  if (!guild) {
    client.destroy();
    return;
  }
  helper = new Helper(guild);
  helper.channelHelper.sendLogMessage('CE_Bot ist am Starten. `Type=' + BOT_NAME + '`');

  commandHandler = new CommandHandler(config.prefix);
  interactionHandler = new InteractionHandler(helper);


  await cleanupLogs(helper);
  await prepareRolecallChannel(helper);


  //check the env
  if (REGISTER_CMDS) {
    await registerSlashCommands(helper);
  }
// do this only if slash cmd data has changed
  if (false) {
    // noinspection UnreachableCodeJS
    await unregisterSlashCommands();
  }
  helper.channelHelper.sendLogMessage('CE_Bot ist online.');

});

client.on("messageCreate", (message) => {
  commandHandler.handleMessage(message).then();
});

client.on('interactionCreate', interaction => {
  interactionHandler.handleInteraction(interaction).then();
});

client.on('warn', (info) => {
  helper.channelHelper.findTextChannelViaId("777301412882939915")?.send({content: '`*Warn:*` ' + info});
})

client.on("error", (e)=> {
  console.error("Discord client error!", e);
  helper.channelHelper.findTextChannelViaId("777301412882939915")?.send({content: '`*Error:*` ' + e.message});
});

client.login(DISCORD_TOKEN).then();

