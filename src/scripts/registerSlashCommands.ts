import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";
import {CLIENT_ID, DISCORD_TOKEN, GUILD_ID} from '../config/envConfig'
import Interactions from '../interactions'
import {SlashCommandBuilder} from "@discordjs/builders";
import Helper from "../helpers/helper";

export function registerSlashCommands(helper: Helper) {
    if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {

        helper.channelHelper.sendLogMessage('Unable to refresh application (/) commands.');
    } else {
        const rest = new REST({version: '9'}).setToken(DISCORD_TOKEN);

        let cmddatas: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">[] = [];
        new Interactions(helper).commands.forEach((cmd) => cmddatas.push(cmd.data));

        (async () => {
            try {
                helper.channelHelper.sendLogMessage('Started refreshing application (/) commands.');
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                    {body: cmddatas},
                );
                helper.channelHelper.sendLogMessage('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}
export function unregisterSlashCommands() {
    if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
        console.log('Unable to delete application (/) commands.');
    } else {
        const rest = new REST({version: '9'}).setToken(DISCORD_TOKEN);

        (async () => {
            try {
                console.log('Started deleting application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                    {body: []},
                );

                console.log('Successfully deleted application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}