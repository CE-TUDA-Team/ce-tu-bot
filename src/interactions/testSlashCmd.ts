import {CommandInterface} from "./interactionInterfaces";
import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';

export class TestSlashCmd implements CommandInterface {
    name = 'echo';
    isPrivateCommand = false;
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true));

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        const wait = require('util').promisify(setTimeout);
        let input = await interaction.options.get('input', true);
        await interaction.reply('ok, give me a second');
        await wait(2000);
        await interaction.editReply('Pong! ' + input.value);
    }



}