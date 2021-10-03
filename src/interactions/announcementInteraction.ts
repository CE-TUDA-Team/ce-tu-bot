import {SlashCommandBuilder} from "@discordjs/builders";
import {ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton} from 'discord.js';
import {ButtonInterface, CommandInterface} from "./interactionInterfaces";


export class AnnouncementInteraction implements CommandInterface, ButtonInterface {
    data = new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('todo')
        .addStringOption(option => option.setName('message').setDescription('todo').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('todo').setRequired(false));

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === 'announcement';
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply({ephemeral: true}); // now we need to editreply not just reply
        let message = interaction.options.getString('message', true);
        let channel = interaction.options.getChannel('channel', false);


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('announcement_BTN_send')
                    .setLabel('Senden')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('announcement_BTN_notsend')
                    .setLabel('Nicht senden')
                    .setStyle('DANGER'),
            );

    }

    checkButton(interaction: ButtonInteraction): boolean {
        return false;
    }

    runButton(interaction: ButtonInteraction): Promise<void> {
        return Promise.resolve(undefined);
    }

}