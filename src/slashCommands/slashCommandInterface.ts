import {SlashCommandBuilder} from '@discordjs/builders'
import {CommandInteraction} from 'discord.js'


export default interface SlashCommandInterface {
    name: string;
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    isPrivateCommand: boolean;

    run(interaction: CommandInteraction): Promise<void>;
}