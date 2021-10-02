import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } from './config/envConfig'
import slashCommands from './slashCommands'
import {SlashCommandBuilder} from "@discordjs/builders";

export function registerSlashCommands() {
    if (!DISCORD_TOKEN || !CLIENT_ID ||  !GUILD_ID ) {
        console.log('Unable to refresh application (/) commands.');
    }else {
        const rest = new REST({version: '9'}).setToken(DISCORD_TOKEN);

        let cmddatas: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">[] = [];
        slashCommands.forEach((cmd) => cmddatas.push(cmd.data));

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                    { body: cmddatas },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}
