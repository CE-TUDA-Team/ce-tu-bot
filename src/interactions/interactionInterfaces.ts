import {SlashCommandBuilder} from '@discordjs/builders'
import {ButtonInteraction, CommandInteraction} from 'discord.js'


export interface CommandInterface {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    checkCommand(interaction: CommandInteraction): boolean;

    runCommand(interaction: CommandInteraction): Promise<void>;
}

export interface ButtonInterface {
    checkButton(interaction: ButtonInteraction): boolean;

    runButton(interaction: ButtonInteraction): Promise<void>;
}