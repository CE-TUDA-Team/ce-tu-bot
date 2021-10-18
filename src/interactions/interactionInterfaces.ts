import {SlashCommandBuilder} from '@discordjs/builders'
import {ButtonInteraction, CommandInteraction, SelectMenuInteraction} from 'discord.js'
import Helper from "../helpers/helper";

export abstract class InteractionSubHandler {
    helper : Helper;
    constructor(channelHelper :Helper) {
        this.helper = channelHelper;
    }
}

export interface CommandInterface {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    checkCommand(interaction: CommandInteraction): boolean;

    runCommand(interaction: CommandInteraction): Promise<void>;
}

export interface ButtonInterface {
    checkButton(interaction: ButtonInteraction): boolean;

    runButton(interaction: ButtonInteraction): Promise<void>;
}

export interface SelectMenuInterface {
    checkSelect(interaction: SelectMenuInteraction): boolean;

    runSelect(interaction: SelectMenuInteraction): Promise<void>
}