import SlashCommandInterface from "./slashCommandInterface";
import {SlashCommandBuilder} from "@discordjs/builders";
import {Interaction, Message} from "discord.js";

export class TestSlashCmd implements SlashCommandInterface {
    name = 'echo'
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true));

    async run(interaction: Interaction): Promise<void> {
        console.log(interaction.user);
    }

}