import {SlashCommandBuilder} from "@discordjs/builders";
import {
    ButtonInteraction,
    CommandInteraction,
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js';
import {ButtonInterface, CommandInterface} from "./interactionInterfaces";


export class AnnouncementInteraction implements CommandInterface, ButtonInterface {
    data = new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Command nur für Nudeln. Du kannst vorher nochmal checken was du da fabriziert hast.')
        .addStringOption(option => option.setName('title').setDescription('Der Titel').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Die Massage (äh warte).').setRequired(true))
        .addStringOption(option => option.setName('url').setDescription('Ne ordendliche URL (http://....)').setRequired(false))
        .addChannelOption(option => option.setName('channel').setDescription('Chantal wähle eine Channel.').setRequired(false));

    //.addBooleanOption(option => option.setName('fachschaft').setDescription('...').setRequired(false))

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === 'announcement';
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        //await interaction.deferReply({ephemeral: true}); // now we need to editreply not just reply
        const title = interaction.options.getString('title', true);
        const message = interaction.options.getString('message', true);
        const url = interaction.options.getString('url', false);
        const channel = interaction.options.getChannel('channel', false);
        const serverRoleManager = interaction.guild?.roles
        const hasRole = serverRoleManager?.cache?.find(r => (r.name === 'Team' || r.name === 'Fachschaft'));

        if(!hasRole){

        }

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
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(message);
        if (url) embed.setURL(url);
        if (channel) embed.setFooter('channel=' + channel.id)
        await interaction.reply({content: 'Bidde eimal checken, ob das WIRKLICH so senden soll.', embeds: [embed], components: [row], ephemeral: true});
    }

    checkButton(interaction: ButtonInteraction): boolean {
        const buttonsIds = ['announcement_BTN_send', 'announcement_BTN_notsend']
        return !!buttonsIds.find((id) => id === interaction.customId);
    }

    async runButton(interaction: ButtonInteraction): Promise<void> {
        if (interaction.customId === 'announcement_BTN_notsend') {
            const prevMessage: Message = <Message>interaction.message;
            await interaction.reply({content: 'Not send!', ephemeral: true});
            return;
        }
        if (interaction.customId === 'announcement_BTN_send') {
            const serverChannelManager = interaction.guild?.channels;
            const prevMessage: Message = <Message>interaction.message;
            let prevEmbed = prevMessage.embeds[0];
            const channel = prevEmbed.footer ? serverChannelManager?.cache.find(ch => ch.id === prevEmbed.footer?.text?.replace('Channel=', '')) : interaction.channel;
            prevEmbed = prevMessage.embeds[0].setFooter('');
            if (channel?.isText()) {
                channel?.send({embeds: [prevEmbed]});
                await interaction.reply({content: 'Ok dann habe ich die Brieftauben losgeschickt.', ephemeral: true});
            } else await interaction.reply({content: 'Chantal konnte den richtigen Channel nicht finden.', ephemeral: true});
            return;
        }
        return Promise.reject("Can't handle")
    }

}