import SlashCommandInterface, {ButtonInterface} from "./slashCommandInterface";
import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, MessageActionRow, MessageButton} from 'discord.js';


export class AnnouncementSlashCommand implements SlashCommandInterface, ButtonInterface {
    name = 'announcement';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('todo')
        .addStringOption(option => option.setName('message').setDescription('todo').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('todo').setRequired(false))

    async run(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply({ephemeral: true}); // now we need to editreply not just reply
        let message = interaction.options.getString('message', true);
        let channel = interaction.options.getChannel('channel',false);


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('send')
                    .setLabel('Senden')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('notsend')
                    .setLabel('Nicht senden')
                    .setStyle('DANGER'),
            );

    }
}