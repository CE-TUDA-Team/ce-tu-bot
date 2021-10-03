import {SlashCommandBuilder} from "@discordjs/builders";
import {
    ButtonInteraction,
    CommandInteraction,
    GuildChannel, Interaction, Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js';
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
        //await interaction.deferReply({ephemeral: true}); // now we need to editreply not just reply
        const message = interaction.options.getString('message', true);
        const channel= interaction.options.getChannel('channel', false);


        const row1 = new MessageActionRow()
            .addComponents(new MessageButton().setLabel('Channel: ' + (channel ? channel.name : 'this')));
        const row2 = new MessageActionRow()
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
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setDescription(message);

        await interaction.reply({content: 'Pong!', embeds: [embed], components: [row2], ephemeral: true});
    }

    checkButton(interaction: ButtonInteraction): boolean {
        const buttonsIds = ['announcement_BTN_send', 'announcement_BTN_notsend']
        return !!buttonsIds.find((id) => id === interaction.customId);
    }

    runButton(interaction: ButtonInteraction): Promise<void> {
        if(interaction.customId === 'announcement_BTN_notsend'){
            const prevMessage : Message =  <Message> interaction.message;
            interaction.reply({content: 'Not send!', ephemeral: true});
            return Promise.resolve()
        }
        if(interaction.customId === 'announcement_BTN_send'){
            const prevMessage : Message =  <Message> interaction.message;
            const channel = interaction.channel;
            channel?.send({ embeds: [prevMessage.embeds[0]]});
            interaction.reply({content: 'Send', ephemeral: true});
            return Promise.resolve()
        }
        return Promise.reject("Can't handle")
    }

}