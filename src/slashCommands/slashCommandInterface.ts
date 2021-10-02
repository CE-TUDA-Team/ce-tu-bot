import { SlashCommandBuilder } from '@discordjs/builders'
import {Interaction} from 'discord.js'

export default interface SlashCommandInterface {
    name : string;
    data :  Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run(interaction : Interaction): Promise<void>;

}